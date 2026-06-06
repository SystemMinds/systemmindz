/**
 * Parse and normalize job salary text (LinkedIn, Indeed, JD paste).
 * Stores amounts in absolute currency units (INR rupees, USD dollars).
 */

function cleanAmount(raw) {
  if (raw == null || raw === '') return null;
  const n = parseFloat(String(raw).replace(/,/g, '').trim());
  return Number.isFinite(n) ? n : null;
}

const PERIOD_ALIASES = {
  YEARLY: 'yearly',
  YEAR: 'yearly',
  ANNUAL: 'yearly',
  ANNUM: 'yearly',
  MONTHLY: 'monthly',
  MONTH: 'monthly',
  HOURLY: 'hourly',
  HOUR: 'hourly',
  WEEKLY: 'weekly',
  WEEK: 'weekly',
};

function detectPeriodFromText(text) {
  const lower = String(text || '').toLowerCase();
  if (/\b(lpa|lakhs?\s*(per\s*)?(year|annum|pa)|per\s*annum|a\s*year|\/\s*yr|yearly|annually)\b/i.test(lower)) {
    return 'yearly';
  }
  if (/\b(a\s*month|per\s*month|monthly|\/\s*mo|p\.?m\.?)\b/i.test(lower)) {
    return 'monthly';
  }
  if (/\b(an?\s*hour|per\s*hour|hourly|\/\s*hr)\b/i.test(lower)) {
    return 'hourly';
  }
  if (/\b(a\s*week|per\s*week|weekly|\/\s*wk)\b/i.test(lower)) {
    return 'weekly';
  }
  return null;
}

function detectCurrency(text) {
  const s = String(text || '');
  if (/\$|usd/i.test(s)) return 'USD';
  if (/€|eur/i.test(s)) return 'EUR';
  if (/£|gbp/i.test(s)) return 'GBP';
  return 'INR';
}

function formatSalaryRange({ salaryMin, salaryMax, salaryCurrency, salaryPeriod, salaryText }) {
  if (salaryText) return salaryText;
  const cur = salaryCurrency || 'INR';
  const sym = cur === 'INR' ? '₹' : cur === 'USD' ? '$' : '';
  const fmt = (n) => {
    if (n == null) return '';
    if (cur === 'INR' && salaryPeriod === 'yearly' && n >= 100000) {
      const lpa = n / 100000;
      return `${lpa % 1 === 0 ? lpa.toFixed(0) : lpa.toFixed(1)} LPA`;
    }
    return `${sym}${Number(n).toLocaleString('en-IN')}`;
  };
  const periodLabel =
    salaryPeriod === 'monthly'
      ? ' a month'
      : salaryPeriod === 'hourly'
        ? ' an hour'
        : salaryPeriod === 'weekly'
          ? ' a week'
          : salaryPeriod === 'yearly'
            ? ' a year'
            : '';
  if (salaryMin != null && salaryMax != null && salaryMin !== salaryMax) {
    return `${fmt(salaryMin)} - ${fmt(salaryMax)}${periodLabel}`.trim();
  }
  if (salaryMin != null) return `${fmt(salaryMin)}${periodLabel}`.trim();
  return '';
}

function parseSalaryFromText(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;

  const result = {
    salaryText: raw,
    salaryMin: null,
    salaryMax: null,
    salaryCurrency: detectCurrency(raw),
    salaryPeriod: detectPeriodFromText(raw),
  };

  const lpaRange = raw.match(/(\d+(?:\.\d+)?)\s*(?:-|to|–)\s*(\d+(?:\.\d+)?)\s*(?:lpa|l\.?p\.?a\.?|lakhs?)/i);
  if (lpaRange) {
    const min = parseFloat(lpaRange[1]);
    const max = parseFloat(lpaRange[2]);
    result.salaryMin = min * 100000;
    result.salaryMax = max * 100000;
    result.salaryPeriod = 'yearly';
    result.salaryCurrency = 'INR';
    result.salaryText = formatSalaryRange(result);
    return result;
  }

  const lpaSingle = raw.match(/(\d+(?:\.\d+)?)\s*(?:lpa|l\.?p\.?a\.?|lakhs?)/i);
  if (lpaSingle) {
    const v = parseFloat(lpaSingle[1]) * 100000;
    result.salaryMin = v;
    result.salaryMax = v;
    result.salaryPeriod = 'yearly';
    result.salaryCurrency = 'INR';
    result.salaryText = formatSalaryRange(result);
    return result;
  }

  const rangeMatch = raw.match(
    /(?:₹|rs\.?\s*|inr\s*)?(\d[\d,]*(?:\.\d+)?)\s*(?:-|to|–)\s*(?:₹|rs\.?\s*|inr\s*)?(\d[\d,]*(?:\.\d+)?)/i
  );
  if (rangeMatch) {
    result.salaryMin = cleanAmount(rangeMatch[1]);
    result.salaryMax = cleanAmount(rangeMatch[2]);
  } else {
    const singleMatch = raw.match(/(?:₹|rs\.?\s*|inr\s*|\$)?(\d[\d,]*(?:\.\d+)?)/i);
    if (singleMatch) {
      const v = cleanAmount(singleMatch[1]);
      result.salaryMin = v;
      result.salaryMax = v;
    }
  }

  if (!result.salaryPeriod && (result.salaryMin != null || result.salaryMax != null)) {
    result.salaryPeriod = detectPeriodFromText(raw) || 'yearly';
  }

  return result;
}

function normalizeSalaryPeriod(period) {
  if (!period) return null;
  const key = String(period).toUpperCase().replace(/\s+/g, '_');
  return PERIOD_ALIASES[key] || String(period).toLowerCase();
}

function extractIndeedSalary(body = {}) {
  const sim = body.salaryInfoModel || {};
  const jmh = body.jobMetadataHeaderModel || {};
  const guide = body.salaryGuideModel?.estimatedSalaryModel || {};

  let text =
    sim.salaryText ||
    guide.formattedSalary ||
    guide.salaryText ||
    null;
  let min = sim.salaryMin ?? jmh.salaryMin ?? guide.salaryMin ?? null;
  let max = sim.salaryMax ?? jmh.salaryMax ?? guide.salaryMax ?? null;
  let currency = sim.salaryCurrency || jmh.salaryCurrency || guide.salaryCurrency || 'INR';
  const salaryType = sim.salaryType || jmh.salaryType || guide.salaryType || null;
  let period = normalizeSalaryPeriod(salaryType);

  if (text && (min == null && max == null)) {
    const parsed = parseSalaryFromText(text);
    if (parsed) return parsed;
  }

  const out = {
    salaryText: text || null,
    salaryMin: min != null ? Number(min) : null,
    salaryMax: max != null ? Number(max) : null,
    salaryCurrency: currency || 'INR',
    salaryPeriod: period,
  };

  if (!out.salaryText) {
    out.salaryText = formatSalaryRange(out) || null;
  }
  if (!out.salaryPeriod && out.salaryText) {
    out.salaryPeriod = detectPeriodFromText(out.salaryText);
  }
  return out.salaryText || out.salaryMin != null ? out : null;
}

function mergeSalaryFields(job = {}) {
  const existing = {
    salaryText: job.salaryText || job.salary_text || job.salary || null,
    salaryMin: job.salaryMin ?? job.salary_min ?? null,
    salaryMax: job.salaryMax ?? job.salary_max ?? null,
    salaryCurrency: job.salaryCurrency || job.salary_currency || null,
    salaryPeriod: job.salaryPeriod || job.salary_period || null,
  };

  if (existing.salaryMin != null || existing.salaryMax != null || existing.salaryText) {
    if (!existing.salaryText) {
      existing.salaryText = formatSalaryRange(existing);
    }
    return existing;
  }

  const parsed = parseSalaryFromText(job.salary || job.compensation || job.pay || '');
  if (!parsed) return existing;
  return { ...existing, ...parsed };
}

function salaryDbPayload(job = {}) {
  const s = mergeSalaryFields(job);
  return {
    salary: String(s.salaryText || '').slice(0, 255) || null,
    salary_text: String(s.salaryText || '').slice(0, 255) || null,
    salary_min: s.salaryMin != null ? s.salaryMin : null,
    salary_max: s.salaryMax != null ? s.salaryMax : null,
    salary_currency: s.salaryCurrency ? String(s.salaryCurrency).slice(0, 8) : null,
    salary_period: s.salaryPeriod ? String(s.salaryPeriod).slice(0, 16) : null,
  };
}

module.exports = {
  parseSalaryFromText,
  extractIndeedSalary,
  mergeSalaryFields,
  salaryDbPayload,
  formatSalaryRange,
  normalizeSalaryPeriod,
};
