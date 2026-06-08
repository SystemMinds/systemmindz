#!/usr/bin/env bash
# ============================================================
#  Push all KareerGrowth app repos to GitHub
#
#  Repos (each has its own .git):
#    AdminFrontend, AdminBackend,
#    SuperadminFrontend, SuperadminBackend,
#    CandidateFrontend, CandidateBackend,
#    CandidateTest, StreamingAi
#
#  Usage:
#    ./push-all.sh
#    ./push-all.sh --branch indeed
#    ./push-all.sh --remote origin
#    ./push-all.sh --dry-run
#    ./push-all.sh --only CandidateBackend,StreamingAi
#    ./push-all.sh --status
# ============================================================

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

REMOTE="${REMOTE:-origin}"
BRANCH=""
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

Options:
  --branch NAME    Push this branch (default: current branch in each repo)
  --remote NAME    Git remote (default: origin)
  --only LIST      Comma-separated repo folder names to push
  --dry-run        Show what would be pushed, do not push
  --status         Show branch/ahead/behind/dirty status only
  -h, --help       Show this help

Examples:
  ./push-all.sh
  ./push-all.sh --branch indeed
  ./push-all.sh --only CandidateBackend,CandidateFrontend
  ./push-all.sh --dry-run
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch)   BRANCH="${2:-}"; shift 2 ;;
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

repo_branch() {
  local dir="$1"
  if [[ -n "$BRANCH" ]]; then
    echo "$BRANCH"
  else
    git -C "$dir" branch --show-current 2>/dev/null || echo ""
  fi
}

print_repo_status() {
  local name="$1"
  local dir="$ROOT_DIR/$name"

  if [[ ! -d "$dir/.git" ]]; then
    warn "$name — not a git repo (skip)"
    return 1
  fi

  local branch
  branch="$(repo_branch "$dir")"
  if [[ -z "$branch" ]]; then
    warn "$name — detached HEAD or no branch (skip)"
    return 1
  fi

  local dirty=""
  if [[ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]]; then
    dirty=" dirty"
  fi

  local ahead behind tracking
  tracking="$(git -C "$dir" rev-parse --abbrev-ref "${branch}@{upstream}" 2>/dev/null || echo "")"
  if [[ -n "$tracking" ]]; then
    ahead="$(git -C "$dir" rev-list --count "${tracking}..${branch}" 2>/dev/null || echo 0)"
    behind="$(git -C "$dir" rev-list --count "${branch}..${tracking}" 2>/dev/null || echo 0)"
    echo "  $name — branch=$branch remote=$REMOTE ahead=$ahead behind=$behind${dirty}"
  else
    echo "  $name — branch=$branch (no upstream for $branch)${dirty}"
  fi
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

  local branch
  branch="$(repo_branch "$dir")"
  if [[ -z "$branch" ]]; then
    warn "$name — no current branch (skip)"
    return 1
  fi

  if [[ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]]; then
    warn "$name — uncommitted changes (pushing existing commits only)"
  fi

  local upstream="${REMOTE}/${branch}"
  if ! git -C "$dir" rev-parse --verify "$branch" &>/dev/null; then
    err "$name — branch '$branch' does not exist locally"
    return 1
  fi

  local ahead=0
  if git -C "$dir" rev-parse --verify "@{upstream}" &>/dev/null 2>&1; then
    ahead="$(git -C "$dir" rev-list --count "@{upstream}..HEAD" 2>/dev/null || echo 0)"
  else
    ahead="$(git -C "$dir" rev-list --count "$branch" 2>/dev/null || echo 0)"
  fi

  if [[ "$ahead" -eq 0 ]] && git -C "$dir" rev-parse --verify "@{upstream}" &>/dev/null 2>&1; then
    ok "$name — already up to date ($branch -> $upstream)"
    return 0
  fi

  log "$name — pushing $branch -> $upstream ($ahead commit(s) ahead)"

  if [[ "$DRY_RUN" -eq 1 ]]; then
    ok "$name — dry-run (skipped actual push)"
    return 0
  fi

  if git -C "$dir" push -u "$REMOTE" "$branch"; then
    ok "$name — pushed"
    return 0
  fi

  err "$name — push failed"
  return 1
}

main() {
  echo ""
  echo "============================================================"
  echo "  Push all KareerGrowth repos"
  echo "============================================================"
  echo "  Root:   $ROOT_DIR"
  echo "  Remote: $REMOTE"
  [[ -n "$BRANCH" ]] && echo "  Branch: $BRANCH (forced)" || echo "  Branch: current branch per repo"
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
  local skip_count=0
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
