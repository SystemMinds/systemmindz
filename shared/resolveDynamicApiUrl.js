/**
 * Resolve API base URLs for local dev: supports localhost and LAN IP access.
 * When the browser is opened via a LAN hostname, rewrite localhost/127.0.0.1 in
 * configured URLs to match window.location.hostname.
 */

function isPrivateLanHost(hostname) {
  const h = String(hostname || '').toLowerCase();
  if (!h || h === 'localhost' || h === '127.0.0.1') return false;
  return (
    /^192\.168\.\d{1,3}\.\d{1,3}$/.test(h) ||
    /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h) ||
    /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(h)
  );
}

function readEnvUrl(env, key) {
  const raw = env?.[key];
  if (raw == null || String(raw).trim() === '') return '';
  return String(raw).trim();
}

/**
 * Read a required Vite env URL. Throws if missing.
 */
export function requireDynamicEnvUrl(env, key) {
  const url = readEnvUrl(env, key);
  if (!url) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return resolveDynamicApiUrl(url);
}

/**
 * Rewrite localhost/127.0.0.1 hostnames to the current browser hostname when
 * accessing the app from a LAN IP (or any non-localhost host).
 */
export function resolveDynamicApiUrl(url) {
  const value = String(url || '').trim();
  if (!value) return value;

  if (typeof window === 'undefined' || !window.location?.hostname) {
    return value;
  }

  const browserHost = window.location.hostname;
  if (!isPrivateLanHost(browserHost)) {
    return value;
  }

  if (value.startsWith('/')) {
    return value;
  }

  try {
    const parsed = new URL(value);
    const localHosts = new Set(['localhost', '127.0.0.1']);
    if (localHosts.has(parsed.hostname.toLowerCase())) {
      parsed.hostname = browserHost;
      return parsed.toString();
    }
    return value;
  } catch {
    return value;
  }
}

export default resolveDynamicApiUrl;
