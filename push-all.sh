#!/usr/bin/env bash
# ============================================================
#  Push all KareerGrowth app repos to GitHub (main only)
#
#  Local main is the source of truth — overwrites origin/main
#  when histories differ (git push --force).
#
#  Repos (each has its own .git):
#    AdminFrontend, AdminBackend,
#    SuperadminFrontend, SuperadminBackend,
#    CandidateFrontend, CandidateBackend,
#    CandidateTest, StreamingAi
#
#  Usage:
#    ./push-all.sh
#    ./push-all.sh --remote origin
#    ./push-all.sh --dry-run
#    ./push-all.sh --only CandidateBackend,StreamingAi
#    ./push-all.sh --status
# ============================================================

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

REMOTE="${REMOTE:-origin}"
BRANCH="main"
DRY_RUN=0
STATUS_ONLY=0
ONLY_FILTER=""

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

log()  { echo "[*] $*"; }
ok()   { echo "[OK] $*"; }
warn() { echo "[WARN] $*"; }
err()  { echo "[ERROR] $*" >&2; }

usage() {
  cat <<'EOF'
Usage: ./push-all.sh [options]

Force-pushes local main to origin/main in each repo.
Remote main is replaced with whatever is on your local main.

Options:
  --remote NAME    Git remote (default: origin)
  --only LIST      Comma-separated repo folder names to push
  --dry-run        Show what would be pushed, do not push
  --status         Show main vs origin/main status only
  -h, --help       Show this help

Examples:
  ./push-all.sh
  ./push-all.sh --only CandidateBackend,CandidateFrontend
  ./push-all.sh --dry-run
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch)
      warn "--branch is ignored; this script always pushes main"
      shift 2
      ;;
    --remote)   REMOTE="${2:-}"; shift 2 ;;
    --only)     ONLY_FILTER="${2:-}"; shift 2 ;;
    --dry-run)  DRY_RUN=1; shift ;;
    --status)   STATUS_ONLY=1; shift ;;
    -h|--help)  usage; exit 0 ;;
    *)          err "Unknown option: $1"; usage; exit 1 ;;
  esac
done

should_push_repo() {
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

fetch_remote_main() {
  local dir="$1"
  git -C "$dir" fetch "$REMOTE" "$BRANCH" --quiet 2>/dev/null || true
}

repo_sync_state() {
  local dir="$1"
  local local_sha remote_sha ahead=0 behind=0 diverged=0

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
      ahead="$(git -C "$dir" rev-list --count "${remote_sha}..${local_sha}" 2>/dev/null || echo 0)"
      echo "ahead:$ahead"
      return
    fi
    if git -C "$dir" merge-base --is-ancestor "$local_sha" "$remote_sha" 2>/dev/null; then
      behind="$(git -C "$dir" rev-list --count "${local_sha}..${remote_sha}" 2>/dev/null || echo 0)"
      echo "behind:$behind"
      return
    fi
    diverged=1
    ahead="$(git -C "$dir" rev-list --count "${remote_sha}..${local_sha}" 2>/dev/null || echo 0)"
    behind="$(git -C "$dir" rev-list --count "${local_sha}..${remote_sha}" 2>/dev/null || echo 0)"
    echo "diverged:$ahead:$behind"
    return
  fi

  echo "no_remote"
}

print_repo_status() {
  local name="$1"
  local dir="$ROOT_DIR/$name"

  if [[ ! -d "$dir/.git" ]]; then
    warn "$name — not a git repo (skip)"
    return 1
  fi

  if ! git -C "$dir" rev-parse --verify "$BRANCH" &>/dev/null; then
    warn "$name — local branch '$BRANCH' does not exist (skip)"
    return 1
  fi

  fetch_remote_main "$dir"

  local dirty=""
  if [[ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]]; then
    dirty=" dirty"
  fi

  local state
  state="$(repo_sync_state "$dir")"
  case "$state" in
    synced)       echo "  $name — $BRANCH synced with $REMOTE/$BRANCH${dirty}" ;;
    ahead:*)      echo "  $name — $BRANCH ahead of $REMOTE/$BRANCH by ${state#ahead:}${dirty}" ;;
    behind:*)     echo "  $name — $BRANCH behind $REMOTE/$BRANCH by ${state#behind:} (will overwrite on push)${dirty}" ;;
    diverged:*)
      IFS=':' read -r _ a b <<< "$state"
      echo "  $name — $BRANCH diverged (ahead $a, behind $b) — local wins on push${dirty}"
      ;;
    no_remote)    echo "  $name — $BRANCH has no $REMOTE/$BRANCH yet (will create)${dirty}" ;;
    *)            echo "  $name — $BRANCH status unknown${dirty}" ;;
  esac
}

push_repo() {
  local name="$1"
  local dir="$ROOT_DIR/$name"

  echo ""
  echo "------------------------------------------------------------"
  log "$name"

  if [[ ! -d "$dir/.git" ]]; then
    warn "$name — not a git repo (skip)"
    return 1
  fi

  if ! git -C "$dir" rev-parse --verify "$BRANCH" &>/dev/null; then
    err "$name — branch '$BRANCH' does not exist locally"
    return 1
  fi

  if [[ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]]; then
    warn "$name — uncommitted changes (only committed local main is pushed)"
  fi

  fetch_remote_main "$dir"

  local upstream="${REMOTE}/${BRANCH}"
  local state
  state="$(repo_sync_state "$dir")"

  case "$state" in
    synced)
      ok "$name — already up to date ($BRANCH == $upstream)"
      return 0
      ;;
    ahead:*)
      log "$name — pushing $BRANCH -> $upstream (${state#ahead:} commit(s) ahead)"
      ;;
    behind:*)
      warn "$name — remote is ${state#behind:} commit(s) ahead; overwriting with local $BRANCH"
      ;;
    diverged:*)
      IFS=':' read -r _ a b <<< "$state"
      warn "$name — histories diverged (local ahead $a, remote ahead $b); overwriting with local $BRANCH"
      ;;
    no_remote)
      log "$name — creating $upstream from local $BRANCH"
      ;;
    *)
      log "$name — force-pushing local $BRANCH -> $upstream"
      ;;
  esac

  if [[ "$DRY_RUN" -eq 1 ]]; then
    ok "$name — dry-run (would force-push $BRANCH -> $upstream)"
    return 0
  fi

  if git -C "$dir" push --force -u "$REMOTE" "$BRANCH"; then
    ok "$name — force-pushed local $BRANCH to $upstream"
    return 0
  fi

  err "$name — push failed"
  return 1
}

main() {
  echo ""
  echo "============================================================"
  echo "  Push all KareerGrowth repos (local main -> origin/main)"
  echo "============================================================"
  echo "  Root:   $ROOT_DIR"
  echo "  Remote: $REMOTE"
  echo "  Branch: $BRANCH (force — local wins)"
  [[ "$DRY_RUN" -eq 1 ]] && echo "  Mode:   dry-run"
  [[ -n "$ONLY_FILTER" ]] && echo "  Only:   $ONLY_FILTER"
  echo ""

  if [[ "$STATUS_ONLY" -eq 1 ]]; then
    log "Status:"
    local name
    for name in "${REPOS[@]}"; do
      should_push_repo "$name" || continue
      print_repo_status "$name" || true
    done
    exit 0
  fi

  local ok_count=0
  local fail_count=0
  local name

  for name in "${REPOS[@]}"; do
    should_push_repo "$name" || continue
    if push_repo "$name"; then
      ((ok_count++)) || true
    else
      ((fail_count++)) || true
    fi
  done

  echo ""
  echo "============================================================"
  echo "  Summary"
  echo "============================================================"
  echo "  Succeeded: $ok_count"
  echo "  Failed:    $fail_count"
  echo ""

  if [[ "$fail_count" -gt 0 ]]; then
    exit 1
  fi
}

main "$@"
