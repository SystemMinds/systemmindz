/**
 * Deduplicate job search results for display and import.
 * Uses platform job id, canonical URL, then title+company+location fingerprint.
 */

const { extractNaukriJobIdFromUrl } = require('./naukriJobUrl');

function normText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function stripUrlQuery(url) {
  const raw = String(url || '').trim();
  if (!raw) return '';
  try {
    const u = new URL(raw);
    return `${u.origin}${u.pathname}`.toLowerCase();
  } catch {
    return raw.split('?')[0].toLowerCase();
  }
}

function resolvePlatformJobId(job, source = '') {
  const src = String(source || job?.source || '').toLowerCase();
  let id = String(job?.jobId || job?.naukriJobId || job?.indeedJobId || job?.monsterJobId || job?.linkedinJobId || '').trim();

  if (src === 'naukri' || job?.jdURL || /naukri/i.test(String(job?.jobUrl || job?.staticUrl || ''))) {
    const fromUrl = extractNaukriJobIdFromUrl(job?.jobUrl || job?.jdURL || job?.staticUrl || '');
    if (fromUrl) return fromUrl;
  }

  return id;
}

function jobSearchDedupeKey(job, source = '') {
  const src = String(source || job?.source || 'job').toLowerCase();
  const id = resolvePlatformJobId(job, src);
  if (id) return `${src}:id:${id}`;

  const url = stripUrlQuery(job?.jobUrl || job?.canonicalUrl || job?.jdURL || job?.staticUrl || '');
  if (url) return `${src}:url:${url}`;

  const title = normText(job?.title);
  const company = normText(job?.company);
  const location = normText(job?.location);
  if (title && company) return `${src}:fp:${title}|${company}|${location}`;

  return '';
}

function jobFingerprintKey(job, source = '') {
  const src = String(source || job?.source || 'job').toLowerCase();
  const title = normText(job?.title);
  const company = normText(job?.company);
  const location = normText(job?.location);
  if (!title || !company) return '';
  return `${src}:fp:${title}|${company}|${location}`;
}

function dedupeSearchJobs(jobs, source = '') {
  const seenIds = new Set();
  const seenFingerprints = new Set();
  const out = [];
  for (const job of Array.isArray(jobs) ? jobs : []) {
    const src = String(source || job?.source || 'job').toLowerCase();
    const id = resolvePlatformJobId(job, src);
    const idKey = id ? `${src}:id:${id}` : '';
    const fpKey = jobFingerprintKey(job, src);
    const fallbackKey = jobSearchDedupeKey(job, src);

    if (idKey && seenIds.has(idKey)) continue;
    if (fpKey && seenFingerprints.has(fpKey)) continue;
    if (!idKey && !fpKey && fallbackKey && seenIds.has(fallbackKey)) continue;

    if (idKey) seenIds.add(idKey);
    if (fpKey) seenFingerprints.add(fpKey);
    if (fallbackKey) seenIds.add(fallbackKey);
    out.push(job);
  }
  return out;
}

module.exports = {
  dedupeSearchJobs,
  jobSearchDedupeKey,
  resolvePlatformJobId,
};
