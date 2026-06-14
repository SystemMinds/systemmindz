/** Canonical Naukri job URLs — prefer SEO jdURL from API, else job-listings-{id}. */

const NAUKRI_ORIGIN = 'https://www.naukri.com';

function extractNaukriJobIdFromUrl(raw) {
  const url = String(raw || '').trim();
  if (!url) return '';
  try {
    const u = new URL(url);
    const path = u.pathname || '';
    const jobMatch = path.match(/\/job\/(\d{8,15})\/?$/i);
    if (jobMatch) return jobMatch[1];
    const listingsMatch = path.match(/job-listings-(\d{8,15})\/?$/i);
    if (listingsMatch) return listingsMatch[1];
    const slugMatch = path.match(/-(\d{8,15})\/?$/);
    if (slugMatch) return slugMatch[1];
  } catch {
    const listingsMatch = url.match(/job-listings-(\d{8,15})\/?(?:\?|$)/i);
    if (listingsMatch) return listingsMatch[1];
    const slugMatch = url.match(/-(\d{8,15})\/?(?:\?|$)/);
    if (slugMatch) return slugMatch[1];
  }
  return '';
}

/** Build a working Naukri job page URL (teams extension pattern). */
function buildNaukriJobUrl(jobId, jdPathOrUrl = '') {
  const raw = String(jdPathOrUrl || '').trim();
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    if (/\/job\/\d{8,15}\/?$/i.test(raw)) {
      const id = extractNaukriJobIdFromUrl(raw) || String(jobId || '').trim();
      return id ? `${NAUKRI_ORIGIN}/job-listings-${id}` : raw;
    }
    return raw;
  }
  if (raw.startsWith('/')) {
    return `${NAUKRI_ORIGIN}${raw}`;
  }
  if (raw) {
    return `${NAUKRI_ORIGIN}/${raw.replace(/^\//, '')}`;
  }
  const id = String(jobId || '').trim();
  return id ? `${NAUKRI_ORIGIN}/job-listings-${id}` : '';
}

function canonicalNaukriJobUrl(jobId, fallbackUrl = '') {
  return buildNaukriJobUrl(jobId, fallbackUrl);
}

module.exports = {
  NAUKRI_ORIGIN,
  extractNaukriJobIdFromUrl,
  buildNaukriJobUrl,
  canonicalNaukriJobUrl,
};
