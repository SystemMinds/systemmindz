#!/bin/bash

# ==============================================================================
# Start all frontend/backend services in separate Terminal windows with HTTPS.
# All inter-service URLs use LAN IP (192.168.1.65). localhost kept in certs/CORS for same-machine dev.
# ==============================================================================

BASE_DIR=$(cd "$(dirname "$0")" && pwd)

API_HOST="${API_HOST:-192.168.1.65}"
LAN_IP="$API_HOST"

CERT_DIR="$BASE_DIR/certs"
CERT_KEY="$CERT_DIR/local.key"
CERT_CRT="$CERT_DIR/local.crt"
mkdir -p "$CERT_DIR"

echo "Preparing local HTTPS certificates..."
if command -v mkcert >/dev/null 2>&1; then
    mkcert -install >/dev/null 2>&1
    mkcert -key-file "$CERT_KEY" -cert-file "$CERT_CRT" localhost 127.0.0.1 "$LAN_IP" >/dev/null 2>&1
else
    if [ ! -f "$CERT_KEY" ] || [ ! -f "$CERT_CRT" ]; then
        openssl req -x509 -nodes -newkey rsa:2048 -sha256 -days 825 \
            -keyout "$CERT_KEY" \
            -out "$CERT_CRT" \
            -subj "/CN=localhost" \
            -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:$LAN_IP" >/dev/null 2>&1
    fi
    security add-trusted-cert -d -r trustRoot -k "$HOME/Library/Keychains/login.keychain-db" "$CERT_CRT" >/dev/null 2>&1 || true
fi

if [ ! -f "$CERT_KEY" ] || [ ! -f "$CERT_CRT" ]; then
    echo "SSL certificate generation failed. Install mkcert or ensure openssl is available."
    exit 1
fi

COMMON_CORS="https://192.168.1.65:4000,https://127.0.0.1:4000,https://$LAN_IP:4000,https://192.168.1.65:4001,https://127.0.0.1:4001,https://$LAN_IP:4001,https://192.168.1.65:4002,https://127.0.0.1:4002,https://$LAN_IP:4002,https://192.168.1.65:4003,https://127.0.0.1:4003,https://$LAN_IP:4003,http://localhost:4000,http://127.0.0.1:4000,http://$LAN_IP:4000,http://localhost:4001,http://127.0.0.1:4001,http://$LAN_IP:4001,http://localhost:4002,http://127.0.0.1:4002,http://$LAN_IP:4002,http://localhost:4003,http://127.0.0.1:4003,http://$LAN_IP:4003"

echo "Stopping any existing services on frontend/API ports..."
for port in 4000 4001 4002 4003 8001 8002 8003 8441 8442 8443 9000; do
    pid=$(lsof -ti :$port 2>/dev/null)
    [ -n "$pid" ] && kill -9 $pid 2>/dev/null
done
sleep 1


log() {
    printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

log_header() {
    local file="$1"
    local name="$2"
    {
        echo ""
        echo "========== $(date '+%Y-%m-%d %H:%M:%S') — $name =========="
    } >>"$file"
}

# Clean up old pids and logs
for pidfile in superadmin_frontend.pid admin_frontend.pid candidatetest_frontend.pid candidate_frontend.pid superadmin_backend.pid admin_backend.pid candidate_backend.pid streaming_ai.pid; do
    if [ -f "$BASE_DIR/$pidfile" ]; then
        old_pid=$(cat "$BASE_DIR/$pidfile")
        if kill -0 "$old_pid" 2>/dev/null; then
            log "Killing old process $old_pid from $pidfile"
            kill -9 "$old_pid" || true
        fi
        rm -f "$BASE_DIR/$pidfile"
    fi
done

# Truncate old log files
> "$BASE_DIR/superadmin_frontend.log"
> "$BASE_DIR/admin_frontend.log"
> "$BASE_DIR/candidatetest_frontend.log"
> "$BASE_DIR/candidate_frontend.log"
> "$BASE_DIR/superadmin_backend.log"
> "$BASE_DIR/admin_backend.log"
> "$BASE_DIR/candidate_backend.log"
> "$BASE_DIR/streaming_ai.log"


# ── SuperadminFrontend ─ HTTPS :4000 ──────────────────────────────────────────
log "Starting SuperadminFrontend (HTTPS 4000)..."
log_header "$BASE_DIR/superadmin_frontend.log" "SuperadminFrontend"
(
    cd "$BASE_DIR/SuperadminFrontend" || exit 1
    SSL_KEY_PATH="$CERT_KEY" \
    SSL_CERT_PATH="$CERT_CRT" \
    VITE_API_BASE_URL="https://192.168.1.65:8441" \
    REACT_APP_API_URL="https://192.168.1.65:8441" \
    REACT_APP_SUPERADMIN_API_URL="https://192.168.1.65:8441/superadmin" \
    VITE_CANDIDATE_API_URL="https://192.168.1.65:8443" \
    VITE_AUTH_JAVA_BASE_URL="https://192.168.1.65:8441" \
    npm run dev -- --host 0.0.0.0 --port 4000
) >> "$BASE_DIR/superadmin_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/superadmin_frontend.pid"
sleep 1

# ── AdminFrontend ─ HTTPS :4001 ───────────────────────────────────────────────
log "Starting AdminFrontend (HTTPS 4001)..."
log_header "$BASE_DIR/admin_frontend.log" "AdminFrontend"
(
    cd "$BASE_DIR/AdminFrontend" || exit 1
    SSL_KEY_PATH="$CERT_KEY" \
    SSL_CERT_PATH="$CERT_CRT" \
    VITE_AUTH_API_URL="https://192.168.1.65:8441" \
    VITE_ADMIN_API_URL="https://192.168.1.65:8442" \
    VITE_API_BASE_URL="https://192.168.1.65:8442" \
    VITE_AI_SERVICE_URL="https://192.168.1.65:9000" \
    VITE_AI_BACKEND_URL="https://192.168.1.65:9000" \
    VITE_CANDIDATE_API_URL="https://192.168.1.65:8443" \
    npm run dev -- --host 0.0.0.0 --port 4001
) >> "$BASE_DIR/admin_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/admin_frontend.pid"
sleep 1

# ── CandidateTest Frontend ─ HTTPS :4002 ──────────────────────────────────────
log "Starting CandidateTest Frontend (HTTPS 4002)..."
log_header "$BASE_DIR/candidatetest_frontend.log" "CandidateTest Frontend"
(
    cd "$BASE_DIR/CandidateTest" || exit 1
    SSL_KEY_PATH="$CERT_KEY" \
    SSL_CERT_PATH="$CERT_CRT" \
    VITE_AUTH_API_URL="https://192.168.1.65:8441" \
    VITE_ADMIN_API_URL="https://192.168.1.65:8442" \
    VITE_API_BASE_URL="https://192.168.1.65:8443" \
    VITE_AI_BACKEND_URL="https://192.168.1.65:9000" \
    VITE_AI_WS_URL="https://192.168.1.65:4002/ai-ws" \
    AI_WS_PROXY_TARGET="https://192.168.1.65:9000" \
    npm run dev -- --host 0.0.0.0 --port 4002
) >> "$BASE_DIR/candidatetest_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/candidatetest_frontend.pid"
sleep 1

# ── CandidateFrontend ─ HTTPS :4003 ───────────────────────────────────────────
log "Starting CandidateFrontend (HTTPS 4003)..."
log_header "$BASE_DIR/candidate_frontend.log" "CandidateFrontend"
(
    cd "$BASE_DIR/CandidateFrontend" || exit 1
    SSL_KEY_PATH="$CERT_KEY" \
    SSL_CERT_PATH="$CERT_CRT" \
    VITE_AUTH_API_URL="https://192.168.1.65:8441" \
    VITE_ADMIN_API_URL="https://192.168.1.65:8442" \
    VITE_API_BASE_URL="https://192.168.1.65:8443" \
    VITE_AI_BACKEND_URL="https://192.168.1.65:9000" \
    VITE_AI_WS_URL="https://192.168.1.65:4003/ai-ws" \
    AI_WS_PROXY_TARGET="https://192.168.1.65:9000" \
    npm run dev -- --host 0.0.0.0 --port 4003
) >> "$BASE_DIR/candidate_frontend.log" 2>&1 &
echo $! > "$BASE_DIR/candidate_frontend.pid"
sleep 1

# ── Show URLs ──────────────────────────────────────────────────────────────────
echo ""
echo "Service URLs ($API_HOST):"
echo "  SuperadminFrontend : https://192.168.1.65:4000"
echo "  AdminFrontend      : https://192.168.1.65:4001"
echo "  CandidateTest      : https://192.168.1.65:4002"
echo "  CandidateFrontend  : https://192.168.1.65:4003"
echo "  Superadmin/Auth API: https://192.168.1.65:8441"
echo "  Admin API          : https://192.168.1.65:8442"
echo "  Candidate API      : https://192.168.1.65:8443"
echo "  Streaming AI       : https://192.168.1.65:9000"
echo ""
echo "LAN IP (for device access): $LAN_IP"
echo "  Certs: $CERT_KEY / $CERT_CRT"
echo ""

# ── SuperadminBackend ─ HTTP :8001 / HTTPS :8441 ──────────────────────────────
log "Starting Superadmin+Auth Backend (HTTP 8001 + HTTPS 8441)..."
log_header "$BASE_DIR/superadmin_backend.log" "Superadmin+Auth Backend"
(
    cd "$BASE_DIR/SuperadminBackend" || exit 1
    export NODE_EXTRA_CA_CERTS="$CERT_CRT"
    export CORS_ORIGINS="$COMMON_CORS"
    export SSL_KEY_PATH="$CERT_KEY"
    export SSL_CERT_PATH="$CERT_CRT"
    export SSL_PORT=8441
    export ENABLE_HTTP=true
    export ADMIN_BACKEND_URL="https://192.168.1.65:8442"
    export AUTH_SERVICE_URL="https://192.168.1.65:8441"
    export CANDIDATE_SERVICE_URL="https://192.168.1.65:8443"
    export AI_SERVICE_URL="https://192.168.1.65:9000"
    export GITHUB_CALLBACK_URL="https://192.168.1.65:8441/auth-session/github/callback"
    export GOOGLE_CALLBACK_URL="https://192.168.1.65:8441/auth-session/google/callback"
    export MICROSOFT_CALLBACK_URL="https://192.168.1.65:8441/auth-session/microsoft/callback"
    export LINKEDIN_CALLBACK_URL="https://192.168.1.65:8441/auth-session/linkedin/callback"
    export CANDIDATE_FRONTEND_URL="https://192.168.1.65:4003"
    npm run dev
) >> "$BASE_DIR/superadmin_backend.log" 2>&1 &
echo $! > "$BASE_DIR/superadmin_backend.pid"
sleep 1

# ── AdminBackend ─ HTTP :8002 / HTTPS :8442 ───────────────────────────────────
log "Starting AdminBackend (HTTP 8002 + HTTPS 8442)..."
log_header "$BASE_DIR/admin_backend.log" "AdminBackend"
(
    cd "$BASE_DIR/AdminBackend" || exit 1
    export NODE_EXTRA_CA_CERTS="$CERT_CRT"
    export CORS_ORIGINS="$COMMON_CORS"
    export SSL_KEY_PATH="$CERT_KEY"
    export SSL_CERT_PATH="$CERT_CRT"
    export SSL_PORT=8442
    export AUTH_SERVICE_URL="https://192.168.1.65:8441"
    export CANDIDATE_SERVICE_URL="https://192.168.1.65:8443"
    export STREAMING_SERVICE_URL="https://192.168.1.65:9000"
    export AI_SERVICE_URL="https://192.168.1.65:9000"
    export FRONTEND_URL="https://192.168.1.65:4001"
    export CANDIDATE_LINK_BASE_URL="https://192.168.1.65:4002"
    npm run dev
) >> "$BASE_DIR/admin_backend.log" 2>&1 &
echo $! > "$BASE_DIR/admin_backend.pid"
sleep 1

# ── CandidateBackend ─ HTTP :8003 / HTTPS :8443 ───────────────────────────────
log "Starting CandidateBackend (HTTP 8003 + HTTPS 8443)..."
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
    export NODE_EXTRA_CA_CERTS="$CERT_CRT"
    export CORS_ORIGINS="${CORS_ORIGINS:-$COMMON_CORS}"
    export SSL_KEY_PATH="$CERT_KEY"
    export SSL_CERT_PATH="$CERT_CRT"
    export SSL_PORT=8443
    export ENABLE_HTTP=true
    export SUPERADMIN_BACKEND_URL="https://192.168.1.65:8441"
    export STREAMING_AI_URL="https://192.168.1.65:9000"
    export STREAMING_SERVICE_URL="https://192.168.1.65:9000"
    export GITHUB_CALLBACK_URL="https://192.168.1.65:8443/api/auth/github/callback"
    export FRONTEND_URL="https://192.168.1.65:4003"
    npm run dev
) >> "$BASE_DIR/candidate_backend.log" 2>&1 &
echo $! > "$BASE_DIR/candidate_backend.pid"
sleep 1

# ── Streaming AI ─ HTTPS :9000 ────────────────────────────────────────────────
log "Starting Streaming AI (HTTPS 9000)..."
log_header "$BASE_DIR/streaming_ai.log" "Streaming AI"
(
    cd "$BASE_DIR/StreamingAi" || exit 1
    export NODE_EXTRA_CA_CERTS="$CERT_CRT"
    export HOST=0.0.0.0
    export PORT=9000
    export SSL_KEY_PATH="$CERT_KEY"
    export SSL_CERT_PATH="$CERT_CRT"
    export CORS_ORIGINS="$COMMON_CORS"
    export SUPERADMIN_BACKEND_URL="https://192.168.1.65:8441"
    export ADMIN_BACKEND_URL="https://192.168.1.65:8442"
    export CANDIDATE_BACKEND_URL="https://192.168.1.65:8443"
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
