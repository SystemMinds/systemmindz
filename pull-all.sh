#!/usr/bin/env bash
# ============================================================
#  Pull latest code for all KareerGrowth app repos (main1)
#
#  Each service folder is its own git repo. The Systemmindz root
#  repo stores a gitlink (submodule pointer) to a specific commit
#  in each folder. If you pull the child repos but the root pointer
#  is not updated, VS Code shows yellow "M" on those folders even
#  when you have no file edits — that is pointer drift, not changes.
#
#  This script pulls latest code, then syncs root gitlink pointers
#  so folders stop showing false "modified" status.
#
#  Usage:
#    ./pull-all.sh
#    ./pull-all.sh --commit-sync     # also commit pointer sync in root
#    ./pull-all.sh --match-root      # checkout children to root pointers (older)
#    ./pull-all.sh --status
# ============================================================

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

REMOTE="${REMOTE:-origin}"
BRANCH="main1"
DRY_RUN=0
STATUS_ONLY=0
ONLY_FILTER=""
PULL_ROOT=1
SYNC_POINTERS=1
COMMIT_SYNC=0
MATCH_ROOT=0

# App repos (each has its own GitHub remote)
REPOS=(
  AdminFrontend
  AdminBackend
  SuperadminFrontend
  SuperadminBackend
  CandidateFrontend
  CandidateBackend
  CandidateTest
  StreamingAi
)

# All gitlink folders tracked by the Systemmindz root repo
GITLINK_REPOS=(
  AdminFrontend
  AdminBackend
  SuperadminFrontend
  SuperadminBackend
  CandidateFrontend
  CandidateBackend
  CandidateTest
  StreamingAi
  KareerGrowth
  LinkedInExtension
  judge0
  systemmindz
  teams
)

log()  { echo "[*] $*"; }
ok()   { echo "[OK] $*"; }
warn() { echo "[WARN] $*"; }
err()  { echo "[ERROR] $*" >&2; }

usage() {
  cat <<'EOF'
Usage: ./pull-all.sh [options]

Pull latest main1 from origin in each repo, then sync root gitlink pointers.

Why folders look yellow (M) in VS Code:
  The root repo records which commit each service folder should be on.
  Pulling only the child repos updates them to newer commits while the
  root still points at older commits → false "modified" on folders.
  This script fixes that by syncing pointers after pull.

Options:
  --remote NAME      Git remote (default: origin)
  --branch NAME      Branch to pull (default: main1)
  --only LIST        Comma-separated repo folder names to pull
  --no-root          Skip pulling the monorepo root
  --no-sync          Skip syncing root gitlink pointers after pull
  --commit-sync      Commit pointer sync in root repo (removes yellow M)
  --match-root       Instead of latest: checkout each child to root pointer
  --dry-run          Show actions only
  --status           Show local vs remote status
  -h, --help         Show this help

Examples:
  ./pull-all.sh
  ./pull-all.sh --commit-sync
  ./pull-all.sh --status
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --remote)       REMOTE="${2:-}"; shift 2 ;;
    --branch)       BRANCH="${2:-}"; shift 2 ;;
    --only)         ONLY_FILTER="${2:-}"; shift 2 ;;
    --no-root)      PULL_ROOT=0; shift ;;
    --no-sync)      SYNC_POINTERS=0; shift ;;
    --commit-sync)  COMMIT_SYNC=1; SYNC_POINTERS=1; shift ;;
    --match-root)   MATCH_ROOT=1; SYNC_POINTERS=0; shift ;;
    --dry-run)      DRY_RUN=1; shift ;;
    --status)       STATUS_ONLY=1; shift ;;
    -h|--help)      usage; exit 0 ;;
    *)              err "Unknown option: $1"; usage; exit 1 ;;
  esac
done

should_pull_repo() {
  local name="$1"
  [[ -z "$ONLY_FILTER" ]] && return 0
  local item
  IFS=',' read -ra items <<< "$ONLY_FILTER"
  for item in "${items[@]}"; do
    item="$(echo "$item" | xargs)"
    [[ "$item" == "$name" ]] && return 0
  done
  return 1
}

is_gitlink_repo() {
  local name="$1"
  git -C "$ROOT_DIR" ls-tree "HEAD:$name" &>/dev/null
}

root_pointer_sha() {
  local name="$1"
  git -C "$ROOT_DIR" rev-parse "HEAD:$name" 2>/dev/null || echo ""
}

fetch_remote() {
  local dir="$1"
  git -C "$dir" fetch "$REMOTE" "$BRANCH" --quiet 2>/dev/null || \
    git -C "$dir" fetch "$REMOTE" --quiet 2>/dev/null || true
}

repo_sync_state() {
  local dir="$1"
  local local_sha remote_sha

  local_sha="$(git -C "$dir" rev-parse "$BRANCH" 2>/dev/null || echo "")"
  if [[ -z "$local_sha" ]]; then
    echo "missing_local"
    return
  fi

  if git -C "$dir" rev-parse --verify "${REMOTE}/${BRANCH}" &>/dev/null; then
    remote_sha="$(git -C "$dir" rev-parse "${REMOTE}/${BRANCH}")"
    if [[ "$local_sha" == "$remote_sha" ]]; then
      echo "synced"
      return
    fi
    if git -C "$dir" merge-base --is-ancestor "$remote_sha" "$local_sha" 2>/dev/null; then
      echo "ahead:$(git -C "$dir" rev-list --count "${remote_sha}..${local_sha}" 2>/dev/null || echo 0)"
      return
    fi
    if git -C "$dir" merge-base --is-ancestor "$local_sha" "$remote_sha" 2>/dev/null; then
      echo "behind:$(git -C "$dir" rev-list --count "${local_sha}..${remote_sha}" 2>/dev/null || echo 0)"
      return
    fi
    local ahead behind
    ahead="$(git -C "$dir" rev-list --count "${remote_sha}..${local_sha}" 2>/dev/null || echo 0)"
    behind="$(git -C "$dir" rev-list --count "${local_sha}..${remote_sha}" 2>/dev/null || echo 0)"
    echo "diverged:$ahead:$behind"
    return
  fi

  echo "no_remote"
}

print_pointer_status() {
  local name="$1"
  local dir="$ROOT_DIR/$name"
  local recorded local_sha dirty=""

  if ! is_gitlink_repo "$name"; then
    return 0
  fi

  recorded="$(root_pointer_sha "$name")"
  if [[ ! -d "$dir/.git" ]]; then
    echo "  $name — gitlink @ ${recorded:0:8} (folder missing)"
    return 0
  fi

  local_sha="$(git -C "$dir" rev-parse HEAD 2>/dev/null || echo "")"
  if [[ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]]; then
    dirty=" + uncommitted files"
  fi

  if [[ "$recorded" == "$local_sha" ]]; then
    echo "  $name — pointer OK (${local_sha:0:8})${dirty}"
  else
    echo "  $name — POINTER DRIFT root=${recorded:0:8} folder=${local_sha:0:8}${dirty}"
  fi
}

print_repo_status() {
  local name="$1"
  local dir="$2"

  if [[ ! -d "$dir/.git" ]]; then
    warn "$name — not a git repo (skip)"
    return 1
  fi

  fetch_remote "$dir"
  print_pointer_status "$name"

  if ! git -C "$dir" rev-parse --verify "$BRANCH" &>/dev/null; then
    warn "$name — branch '$BRANCH' missing"
    return 1
  fi

  local state dirty=""
  state="$(repo_sync_state "$dir")"
  [[ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]] && dirty=" dirty"

  case "$state" in
    synced)    echo "           remote: synced with $REMOTE/$BRANCH${dirty}" ;;
    ahead:*)   echo "           remote: ahead ${state#ahead:}${dirty}" ;;
    behind:*)  echo "           remote: behind ${state#behind:}${dirty}" ;;
    diverged:*) echo "           remote: diverged${dirty}" ;;
    *)         echo "           remote: $state${dirty}" ;;
  esac
}

ensure_local_branch() {
  local dir="$1"

  if git -C "$dir" rev-parse --verify "$BRANCH" &>/dev/null; then
    git -C "$dir" checkout "$BRANCH" --quiet 2>/dev/null || git -C "$dir" checkout "$BRANCH"
    return 0
  fi

  if git -C "$dir" rev-parse --verify "${REMOTE}/${BRANCH}" &>/dev/null; then
    log "Creating local $BRANCH from ${REMOTE}/${BRANCH}"
    git -C "$dir" checkout -B "$BRANCH" "${REMOTE}/${BRANCH}"
    return 0
  fi

  err "Branch '$BRANCH' not found locally or on $REMOTE"
  return 1
}

pull_repo() {
  local name="$1"
  local dir="$2"

  echo ""
  echo "------------------------------------------------------------"
  log "$name"

  if [[ ! -d "$dir/.git" ]]; then
    warn "$name — not a git repo (skip)"
    return 1
  fi

  if [[ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]]; then
    warn "$name — uncommitted changes present"
  fi

  fetch_remote "$dir"

  if ! ensure_local_branch "$dir"; then
    return 1
  fi

  local state
  state="$(repo_sync_state "$dir")"

  case "$state" in
    synced)
      ok "$name — already up to date ($BRANCH)"
      return 0
      ;;
    ahead:*)
      ok "$name — local ahead of $REMOTE/$BRANCH (nothing to pull)"
      return 0
      ;;
    behind:*)
      log "$name — fast-forwarding ${state#behind:} commit(s)"
      ;;
    diverged:*)
      warn "$name — diverged; fast-forward pull may fail"
      ;;
    no_remote)
      warn "$name — $REMOTE/$BRANCH not on remote (skip)"
      return 1
      ;;
  esac

  if [[ "$DRY_RUN" -eq 1 ]]; then
    ok "$name — dry-run (would pull $REMOTE $BRANCH)"
    return 0
  fi

  if git -C "$dir" pull --ff-only "$REMOTE" "$BRANCH"; then
    ok "$name — pulled latest $BRANCH"
    return 0
  fi

  err "$name — pull failed"
  return 1
}

checkout_to_root_pointer() {
  local name="$1"
  local dir="$ROOT_DIR/$name"
  local sha

  if ! is_gitlink_repo "$name"; then
    return 0
  fi

  sha="$(root_pointer_sha "$name")"
  [[ -z "$sha" ]] && return 0

  if [[ ! -d "$dir/.git" ]]; then
    warn "$name — gitlink exists but folder is not a git repo"
    return 1
  fi

  local current
  current="$(git -C "$dir" rev-parse HEAD 2>/dev/null || echo "")"
  if [[ "$current" == "$sha" ]]; then
    ok "$name — already at root pointer ${sha:0:8}"
    return 0
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    ok "$name — dry-run (would checkout ${sha:0:8})"
    return 0
  fi

  log "$name — checking out root pointer ${sha:0:8}"
  git -C "$dir" checkout --detach "$sha" --quiet 2>/dev/null || git -C "$dir" checkout "$sha"
  ok "$name — matches root pointer"
}

sync_root_pointers() {
  local name recorded local_sha synced=0

  echo ""
  echo "------------------------------------------------------------"
  log "Syncing root gitlink pointers (fixes yellow M on folders)"

  for name in "${GITLINK_REPOS[@]}"; do
    should_pull_repo "$name" && [[ -n "$ONLY_FILTER" ]] && continue
    is_gitlink_repo "$name" || continue
    [[ -d "$ROOT_DIR/$name/.git" ]] || continue

    recorded="$(root_pointer_sha "$name")"
    local_sha="$(git -C "$ROOT_DIR/$name" rev-parse HEAD 2>/dev/null || echo "")"
    [[ -z "$recorded" || -z "$local_sha" ]] && continue

    if [[ "$recorded" != "$local_sha" ]]; then
      if [[ "$DRY_RUN" -eq 1 ]]; then
        ok "$name — dry-run (would stage pointer ${local_sha:0:8})"
      else
        git -C "$ROOT_DIR" add "$name"
        ok "$name — staged pointer ${recorded:0:8} -> ${local_sha:0:8}"
      fi
      synced=1
    fi
  done

  if [[ "$synced" -eq 0 ]]; then
    ok "All gitlink pointers already match"
    return 0
  fi

  if [[ "$COMMIT_SYNC" -eq 1 && "$DRY_RUN" -eq 0 ]]; then
    if git -C "$ROOT_DIR" diff --cached --quiet; then
      ok "Nothing to commit"
      return 0
    fi
    git -C "$ROOT_DIR" commit -m "$(cat <<'EOF'
chore: sync repo pointers after pull

Update gitlink SHAs for service folders to match pulled main1 commits.
EOF
)"
    ok "Committed pointer sync in root repo"
  elif [[ "$synced" -eq 1 ]]; then
    warn "Pointers staged in root. Run: git commit -m 'chore: sync repo pointers'"
    warn "Or re-run: ./pull-all.sh --commit-sync"
  fi
}

main() {
  echo ""
  echo "============================================================"
  echo "  Pull all KareerGrowth repos ($REMOTE/$BRANCH)"
  echo "============================================================"
  echo "  Root:   $ROOT_DIR"
  echo "  Remote: $REMOTE"
  echo "  Branch: $BRANCH"
  [[ "$MATCH_ROOT" -eq 1 ]] && echo "  Mode:   match-root (children follow root pointers)"
  [[ "$COMMIT_SYNC" -eq 1 ]] && echo "  Sync:   commit pointers in root"
  [[ "$DRY_RUN" -eq 1 ]] && echo "  Dry-run: yes"
  echo ""

  if [[ "$STATUS_ONLY" -eq 1 ]]; then
    log "Status:"
    [[ "$PULL_ROOT" -eq 1 ]] && print_repo_status "Systemmindz (root)" "$ROOT_DIR" || true
    local name
    for name in "${REPOS[@]}"; do
      should_pull_repo "$name" || continue
      print_repo_status "$name" "$ROOT_DIR/$name" || true
    done
    echo ""
    log "Other gitlinks:"
    for name in KareerGrowth LinkedInExtension judge0 systemmindz teams; do
      print_pointer_status "$name"
    done
    exit 0
  fi

  local ok_count=0 fail_count=0 name

  if [[ "$MATCH_ROOT" -eq 1 ]]; then
    if [[ "$PULL_ROOT" -eq 1 ]] && [[ -z "$ONLY_FILTER" ]]; then
      pull_repo "Systemmindz (root)" "$ROOT_DIR" && ((ok_count++)) || ((fail_count++))
    fi
    for name in "${GITLINK_REPOS[@]}"; do
      should_pull_repo "$name" && [[ -n "$ONLY_FILTER" ]] && continue
      checkout_to_root_pointer "$name" && ((ok_count++)) || ((fail_count++))
    done
  else
    for name in "${REPOS[@]}"; do
      should_pull_repo "$name" || continue
      pull_repo "$name" "$ROOT_DIR/$name" && ((ok_count++)) || ((fail_count++))
    done

    if [[ "$PULL_ROOT" -eq 1 ]] && [[ -z "$ONLY_FILTER" ]]; then
      pull_repo "Systemmindz (root)" "$ROOT_DIR" && ((ok_count++)) || ((fail_count++))
    fi

    if [[ "$SYNC_POINTERS" -eq 1 ]]; then
      sync_root_pointers
    fi
  fi

  echo ""
  echo "============================================================"
  echo "  Summary"
  echo "============================================================"
  echo "  Pull steps OK: $ok_count"
  echo "  Pull steps failed: $fail_count"
  echo ""
  if [[ "$SYNC_POINTERS" -eq 1 && "$COMMIT_SYNC" -eq 0 && "$MATCH_ROOT" -eq 0 ]]; then
    echo "  Tip: yellow M on folders = root pointer drift."
    echo "       Run: ./pull-all.sh --commit-sync"
    echo "       Or:  git commit -m 'chore: sync repo pointers'"
    echo ""
  fi

  [[ "$fail_count" -gt 0 ]] && exit 1
}

main "$@"
