#!/bin/bash
# Stop all Systemmindz dev services and free ports 4000-4003, 8001-8003, 9000.

BASE_DIR=$(cd "$(dirname "$0")" && pwd)
PORTS=(4000 4001 4002 4003 8001 8002 8003 9000)

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

safe_kill_pid() {
    local pid="$1"
    local label="${2:-process}"
    case "$pid" in
        ''|*[!0-9]*) return 0 ;;
    esac
    [ "$pid" -le 1 ] 2>/dev/null && return 0
    if kill -0 "$pid" 2>/dev/null; then
        log "Killing $label (pid $pid)"
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

log "Stopping services..."

for pidfile in superadmin_frontend.pid admin_frontend.pid candidatetest_frontend.pid candidate_frontend.pid superadmin_backend.pid admin_backend.pid candidate_backend.pid streaming_ai.pid; do
    if [ -f "$BASE_DIR/$pidfile" ]; then
        safe_kill_pid "$(tr -d '[:space:]' < "$BASE_DIR/$pidfile")" "$pidfile"
        rm -f "$BASE_DIR/$pidfile"
    fi
done

for port in "${PORTS[@]}"; do
    kill_port "$port"
done

sleep 2

for port in "${PORTS[@]}"; do
    if lsof -ti :"$port" >/dev/null 2>&1; then
        log "Port $port still in use — retry"
        kill_port "$port"
    else
        log "Port $port free"
    fi
done

log "Done."
