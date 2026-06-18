#!/bin/bash

# ==============================================================================
# Start all frontend/backend services with HTTP only (no SSL certificates).
# LAN IP is detected automatically (override with API_HOST=x.x.x.x if needed).
# ==============================================================================

BASE_DIR=$(cd "$(dirname "$0")" && pwd)

PORTS=(4000 4001 4002 4003 8001 8002 8003 9000)

log() {
    printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

# Only kill real process IDs — never 0/1 or non-numeric values.
safe_kill_pid() {
    local pid="$1"
    local label="${2:-process}"
    case "$pid" in
        ''|*[!0-9]*) return 0 ;;
    esac
    if [ "$pid" -le 1 ] 2>/dev/null; then
        log "Skipping invalid $label pid: $pid"
        return 0
    fi
    if kill -0 "$pid" 2>/dev/null; then
        log "Killing old $label (pid $pid)"
        kill -9 "$pid" 2>/dev/null || true
    fi
}

kill_port() {
    local port="$1"
    local pids
    pids=$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null || lsof -ti :"$port" 2>/dev/null || true)
    if [ -n "$pids" ]; then
        log "Killing port $port (pids: $pids)"
        kill -9 $pids 2>/dev/null || true
    fi
}

kill_all_service_ports() {
    log "Stopping any existing services on frontend/API ports..."
    for pidfile in superadmin_frontend.pid admin_frontend.pid candidatetest_frontend.pid candidate_frontend.pid superadmin_backend.pid admin_backend.pid candidate_backend.pid streaming_ai.pid; do
        if [ -f "$BASE_DIR/$pidfile" ]; then
            old_pid=$(tr -d '[:space:]' < "$BASE_DIR/$pidfile")
            safe_kill_pid "$old_pid" "$pidfile"
            rm -f "$BASE_DIR/$pidfile"
        fi
    done
    for port in "${PORTS[@]}"; do
        kill_port "$port"
    done
    sleep 2
    for port in "${PORTS[@]}"; do
        if lsof -ti :"$port" >/dev/null 2>&1; then
            log "Port $port still in use — force killing again"
            kill_port "$port"
        fi
    done
    sleep 1
}

detect_lan_ip() {
  if [ -n "${API_HOST:-}" ] && [ "${API_HOST}" != "auto" ]; then
    echo "$API_HOST"
    return
  fi
  local ip=""
  for iface in en0 en1 en2 en3; do
    ip="$(ipconfig getifaddr "$iface" 2>/dev/null || true)"
    [ -n "$ip" ] && echo "$ip" && return
  done
  ip="$(ifconfig 2>/dev/null | awk '/inet / && $2 != "127.0.0.1" { print $2; exit }')"
  echo "${ip:-127.0.0.1}"
}

API_HOST="$(detect_lan_ip)"
LAN_IP="$API_HOST"
HTTP_BASE="http://${LAN_IP}"

echo "Detected LAN IP: $LAN_IP (override with API_HOST=x.x.x.x)"

COMMON_CORS="${HTTP_BASE}:4000,http://127.0.0.1:4000,http://localhost:4000,${HTTP_BASE}:4001,http://127.0.0.1:4001,http://localhost:4001,${HTTP_BASE}:4002,http://127.0.0.1:4002,http://localhost:4002,${HTTP_BASE}:4003,http://127.0.0.1:4003,http://localhost:4003"

kill_all_service_ports

log_header() {
    local file="$1"
    local name="$2"
    {
        echo ""
        echo "========== $(date '+%Y-%m-%d %H:%M:%S') — $name =========="
    } >>"$file"
}

# Truncate old log files
> "$BASE_DIR/superadmin_frontend.log"
> "$BASE_DIR/admin_frontend.log"
> "$BASE_DIR/candidatetest_frontend.log"
> "$BASE_DIR/candidate_frontend.log"
> "$BASE_DIR/superadmin_backend.log"
> "$BASE_DIR/admin_backend.log"
> "$BASE_DIR/candidate_backend.log"
> "$BASE_DIR/streaming_ai.log"


# ── SuperadminFrontend ─ HTTP :4000 ───────────────────────────────────────────
log "Starting SuperadminFrontend (HTTP 4000)..."
log_header "$BASE_DIR/superadmin_frontend.log" "SuperadminFrontend"
(
    cd "$BASE_DIR/SuperadminFrontend" || exit 1
    VITE_API_BASE_URL="http://localhost:8001" \
    REACT_APP_API_URL="http://localhost:8001" \
    REACT_APP_SUPERADMIN_API_URL="http://localhost:8001/superadmin" \
    VITE_CANDIDATE_API_URL="http://localhost:8003" \
    VITE_AUTH_JAVA_BASE_URL="http://localhost:8001" \
    npm run dev -- --host 0.0.0.0 --port 4000
) >> "$BASE_DIR/superadmin_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/superadmin_frontend.pid"
sleep 1

# ── AdminFrontend ─ HTTP :4001 ──────────────────────────────────────────────────
log "Starting AdminFrontend (HTTP 4001)..."
log_header "$BASE_DIR/admin_frontend.log" "AdminFrontend"
(
    cd "$BASE_DIR/AdminFrontend" || exit 1
    VITE_AUTH_API_URL="/auth-api" \
    VITE_ADMIN_API_URL="/admin-api" \
    VITE_API_BASE_URL="/admin-api" \
    VITE_AI_SERVICE_URL="/ai-service" \
    VITE_AI_BACKEND_URL="/ai-service" \
    VITE_CANDIDATE_API_URL="/candidate-api" \
    DEV_ADMIN_API_TARGET="http://localhost:8002" \
    DEV_AUTH_API_TARGET="http://localhost:8001" \
    DEV_SUPERADMIN_API_TARGET="http://localhost:8001" \
    DEV_CANDIDATE_API_TARGET="http://localhost:8003" \
    DEV_AI_SERVICE_TARGET="http://localhost:9000" \
    npm run dev -- --host 0.0.0.0 --port 4001
) >> "$BASE_DIR/admin_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/admin_frontend.pid"
sleep 1

# ── CandidateTest Frontend ─ HTTP :4002 ─────────────────────────────────────────
log "Starting CandidateTest Frontend (HTTP 4002)..."
log_header "$BASE_DIR/candidatetest_frontend.log" "CandidateTest Frontend"
(
    cd "$BASE_DIR/CandidateTest" || exit 1
    VITE_AUTH_API_URL="http://localhost:8001" \
    VITE_ADMIN_API_URL="http://localhost:8002" \
    VITE_API_BASE_URL="http://localhost:8003" \
    VITE_AI_BACKEND_URL="http://localhost:9000" \
    VITE_AI_WS_URL="http://localhost:4002/ai-ws" \
    AI_WS_PROXY_TARGET="http://localhost:9000" \
    DEV_ADMIN_API_TARGET="http://localhost:8002" \
    DEV_AUTH_API_TARGET="http://localhost:8001" \
    DEV_CANDIDATE_API_TARGET="http://localhost:8003" \
    DEV_AI_API_TARGET="http://localhost:9000" \
    npm run dev -- --host 0.0.0.0 --port 4002
) >> "$BASE_DIR/candidatetest_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/candidatetest_frontend.pid"
sleep 1

# ── CandidateFrontend ─ HTTP :4003 ──────────────────────────────────────────────
log "Starting CandidateFrontend (HTTP 4003)..."
log_header "$BASE_DIR/candidate_frontend.log" "CandidateFrontend"
(
    cd "$BASE_DIR/CandidateFrontend" || exit 1
    VITE_AUTH_API_URL="http://localhost:8001" \
    VITE_ADMIN_API_URL="http://localhost:8002" \
    VITE_API_BASE_URL="http://localhost:8003" \
    VITE_AI_BACKEND_URL="http://localhost:9000" \
    VITE_AI_WS_URL="http://localhost:4003/ai-ws" \
    AI_WS_PROXY_TARGET="http://localhost:9000" \
    npm run dev -- --host 0.0.0.0 --port 4003
) >> "$BASE_DIR/candidate_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/candidate_frontend.pid"
sleep 1

# ── Show URLs ───────────────────────────────────────────────────────────────────
echo ""
echo "Service URLs (localhost + LAN $LAN_IP):"
echo "  SuperadminFrontend : http://localhost:4000  |  ${HTTP_BASE}:4000"
echo "  AdminFrontend      : http://localhost:4001  |  ${HTTP_BASE}:4001"
echo "  CandidateTest      : http://localhost:4002  |  ${HTTP_BASE}:4002"
echo "  CandidateFrontend  : http://localhost:4003  |  ${HTTP_BASE}:4003"
echo "  Superadmin/Auth API: http://localhost:8001  |  ${HTTP_BASE}:8001"
echo "  Admin API          : http://localhost:8002  |  ${HTTP_BASE}:8002"
echo "  Candidate API      : http://localhost:8003  |  ${HTTP_BASE}:8003"
echo "  Streaming AI       : http://localhost:9000  |  ${HTTP_BASE}:9000"
echo ""

# ── SuperadminBackend ─ HTTP :8001 ────────────────────────────────────────────
log "Starting Superadmin+Auth Backend (HTTP 8001)..."
log_header "$BASE_DIR/superadmin_backend.log" "Superadmin+Auth Backend"
(
    cd "$BASE_DIR/SuperadminBackend" || exit 1
    export CORS_ORIGINS="$COMMON_CORS"
    export ENABLE_HTTP=true
    export ADMIN_BACKEND_URL="http://localhost:8002"
    export AUTH_SERVICE_URL="http://localhost:8001"
    export CANDIDATE_SERVICE_URL="http://localhost:8003"
    export AI_SERVICE_URL="http://localhost:9000"
    export GITHUB_CALLBACK_URL="http://localhost:8001/auth-session/github/callback"
    export GOOGLE_CALLBACK_URL="http://localhost:8001/auth-session/google/callback"
    export MICROSOFT_CALLBACK_URL="http://localhost:8001/auth-session/microsoft/callback"
    export LINKEDIN_CALLBACK_URL="http://localhost:8001/auth-session/linkedin/callback"
    export CANDIDATE_FRONTEND_URL="http://localhost:4003"
    npm run dev
) >> "$BASE_DIR/superadmin_backend.log" 2>&1 &
echo $! > "$BASE_DIR/superadmin_backend.pid"
sleep 1

# ── AdminBackend ─ HTTP :8002 ───────────────────────────────────────────────────
log "Starting AdminBackend (HTTP 8002)..."
log_header "$BASE_DIR/admin_backend.log" "AdminBackend"
(
    cd "$BASE_DIR/AdminBackend" || exit 1
    export CORS_ORIGINS="$COMMON_CORS"
    export ENABLE_HTTP=true
    export AUTH_SERVICE_URL="http://localhost:8001"
    export CANDIDATE_SERVICE_URL="http://localhost:8003"
    export STREAMING_SERVICE_URL="http://localhost:9000"
    export AI_SERVICE_URL="http://localhost:9000"
    export FRONTEND_URL="http://localhost:4001"
    export CANDIDATE_LINK_BASE_URL="http://localhost:4002"
    npm run dev
) >> "$BASE_DIR/admin_backend.log" 2>&1 &
echo $! > "$BASE_DIR/admin_backend.pid"
sleep 1

# ── CandidateBackend ─ HTTP :8003 ───────────────────────────────────────────────
log "Starting CandidateBackend (HTTP 8003)..."
log_header "$BASE_DIR/candidate_backend.log" "CandidateBackend"
(
    cd "$BASE_DIR/CandidateBackend" || exit 1
    if [ -f "$BASE_DIR/CandidateBackend/.env.local" ]; then
        set -a
        # shellcheck disable=SC1091
        source "$BASE_DIR/CandidateBackend/.env.local"
        set +a
    elif [ -f "$BASE_DIR/CandidateBackend/.env" ]; then
        set -a
        # shellcheck disable=SC1091
        source "$BASE_DIR/CandidateBackend/.env"
        set +a
    fi
    export CORS_ORIGINS="${CORS_ORIGINS:-$COMMON_CORS}"
    export ENABLE_HTTP=true
    export SUPERADMIN_BACKEND_URL="http://localhost:8001"
    export STREAMING_AI_URL="http://localhost:9000"
    export STREAMING_SERVICE_URL="http://localhost:9000"
    export GITHUB_CALLBACK_URL="http://localhost:8003/api/auth/github/callback"
    export FRONTEND_URL="http://localhost:4003"
    npm run dev
) >> "$BASE_DIR/candidate_backend.log" 2>&1 &
echo $! > "$BASE_DIR/candidate_backend.pid"
sleep 1

# ── Streaming AI ─ HTTP :9000 ───────────────────────────────────────────────────
log "Starting Streaming AI (HTTP 9000)..."
log_header "$BASE_DIR/streaming_ai.log" "Streaming AI"
(
    cd "$BASE_DIR/StreamingAi" || exit 1
    export HOST=0.0.0.0
    export PORT=9000
    export CORS_ORIGINS="$COMMON_CORS"
    export SUPERADMIN_BACKEND_URL="http://localhost:8001"
    export ADMIN_BACKEND_URL="http://localhost:8002"
    export CANDIDATE_BACKEND_URL="http://localhost:8003"
    python3 main.py
) >> "$BASE_DIR/streaming_ai.log" 2>&1 &
echo $! > "$BASE_DIR/streaming_ai.pid"
sleep 1

log "All services started."
echo ""
echo "PIDs:"
echo "  SuperadminFrontend : $(cat "$BASE_DIR/superadmin_frontend.pid")"
echo "  AdminFrontend      : $(cat "$BASE_DIR/admin_frontend.pid")"
echo "  CandidateTest      : $(cat "$BASE_DIR/candidatetest_frontend.pid")"
echo "  CandidateFrontend  : $(cat "$BASE_DIR/candidate_frontend.pid")"
echo "  SuperadminBackend  : $(cat "$BASE_DIR/superadmin_backend.pid")"
echo "  AdminBackend       : $(cat "$BASE_DIR/admin_backend.pid")"
echo "  CandidateBackend   : $(cat "$BASE_DIR/candidate_backend.pid")"
echo "  StreamingAI        : $(cat "$BASE_DIR/streaming_ai.pid")"
echo ""
echo "Press Ctrl+C to stop following logs (services keep running)."
echo "Stop everything: ./stop.sh"
echo ""

tail -f "$BASE_DIR/superadmin_frontend.log" "$BASE_DIR/admin_frontend.log" "$BASE_DIR/candidatetest_frontend.log" "$BASE_DIR/candidate_frontend.log" "$BASE_DIR/superadmin_backend.log" "$BASE_DIR/admin_backend.log" "$BASE_DIR/candidate_backend.log" "$BASE_DIR/streaming_ai.log"
