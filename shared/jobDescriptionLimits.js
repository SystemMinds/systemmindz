/** Max stored job description length (aligned with Application Tracker). */
const MAX_JOB_DESCRIPTION_LEN = 50000;

/** Below this length we try platform detail APIs for a full JD. */
const MIN_FULL_DESCRIPTION_LEN = 300;

function capJobDescription(raw) {
  const text = String(raw || '').trim();
  if (!text) return '';
  return text.length > MAX_JOB_DESCRIPTION_LEN ? text.slice(0, MAX_JOB_DESCRIPTION_LEN) : text;
}

function needsDescriptionEnrichment(raw) {
  return String(raw || '').trim().length < MIN_FULL_DESCRIPTION_LEN;
}

module.exports = {
  MAX_JOB_DESCRIPTION_LEN,
  MIN_FULL_DESCRIPTION_LEN,
  capJobDescription,
  needsDescriptionEnrichment,
};
