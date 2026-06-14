const { capJobDescription } = require('./jobDescriptionLimits');

function stripHtml(html) {
  if (!html) return '';
  let text = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return text
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function placeholderLabel(placeholders, type) {
  const list = Array.isArray(placeholders) ? placeholders : [];
  const hit = list.find((p) => String(p?.type || '').toLowerCase() === String(type).toLowerCase());
  return hit?.label ? String(hit.label).trim() : '';
}

function extractNaukriDetailRoot(data) {
  if (!data || typeof data !== 'object') return {};
  const jobDetails =
    data.jobDetails && typeof data.jobDetails === 'object' && !Array.isArray(data.jobDetails)
      ? data.jobDetails
      : null;
  const job = data.job && typeof data.job === 'object' && !Array.isArray(data.job) ? data.job : null;
  const shell = { ...data };
  delete shell.jobDetails;
  delete shell.job;
  delete shell.ambitionBoxDetails;
  delete shell.seo;
  delete shell.jdBrandingBanner;
  delete shell.jdBrandingDetails;
  return { ...shell, ...(jobDetails || {}), ...(job || {}) };
}

function extractMainDescriptionHtml(root) {
  const r = root && typeof root === 'object' ? root : {};
  const candidates = [
    r.description,
    r.jobDescription,
    r.jd,
    r.jobDesc,
    r.detailDescription,
    r.tupleDesc,
    r.shortDescription,
    typeof r.sanitizedJobDescription === 'string' ? r.sanitizedJobDescription : null,
    r.sanitizedJobDescription?.content,
    r.sanitizedJobDescription?.html,
  ];
  const parts = [];
  const seen = new Set();
  for (const raw of candidates) {
    const html = String(raw || '').trim();
    if (!html || html.length < 15) continue;
    const key = html.slice(0, 160).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    parts.push(html);
  }
  return parts.join('\n\n');
}

function formatLocations(locations, fallback = '') {
  const list = Array.isArray(locations) ? locations : [];
  const labels = list.map((loc) => String(loc?.label || loc?.city || '').trim()).filter(Boolean);
  if (labels.length) return labels.join(', ');
  return String(fallback || '').trim();
}

function formatEducation(education, root = {}) {
  const edu = education && typeof education === 'object' ? education : {};
  const joinList = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .map((item) => String(item?.label || item?.name || item || '').trim())
      .filter(Boolean)
      .join(', ');
  const ug = joinList(edu.ug) || String(edu.ugLabel || root.educationUG || root.ugEducation || '').trim();
  const pg = joinList(edu.pg) || String(edu.pgLabel || root.educationPG || root.pgEducation || '').trim();
  const label = String(edu.label || '').trim();
  return { ug, pg, label };
}

function formatKeySkills(keySkills, tagsAndSkills) {
  const parts = [];
  const ks = keySkills && typeof keySkills === 'object' ? keySkills : {};
  const preferred = (Array.isArray(ks.preferred) ? ks.preferred : [])
    .map((item) => String(item?.label || item?.clickable || item || '').trim())
    .filter(Boolean);
  const other = (Array.isArray(ks.other) ? ks.other : [])
    .map((item) => String(item?.label || item?.clickable || item || '').trim())
    .filter(Boolean);
  if (preferred.length) parts.push(`Preferred: ${preferred.join(', ')}`);
  if (other.length) parts.push(`Other: ${other.join(', ')}`);
  if (parts.length) return parts.join('\n');
  return String(tagsAndSkills || '').trim();
}

function formatSalary(salaryDetail, placeholderSalary) {
  const label = String(placeholderSalary || '').trim();
  if (label && !/^not disclosed$/i.test(label)) return label;
  if (!salaryDetail || salaryDetail.hideSalary) return label || '';
  const min = Number(salaryDetail.minimumSalary);
  const max = Number(salaryDetail.maximumSalary);
  if (Number.isFinite(min) && min > 0 && Number.isFinite(max) && max > 0 && min !== max) {
    const currency = salaryDetail.currency || 'INR';
    if (currency === 'INR') return `₹${(min / 100000).toFixed(1)} - ${(max / 100000).toFixed(1)} LPA`;
    return `${currency} ${min} - ${max}`;
  }
  if (Number.isFinite(min) && min > 0) {
    const currency = salaryDetail.currency || 'INR';
    if (currency === 'INR') return `₹${(min / 100000).toFixed(1)} LPA`;
    return `${currency} ${min}`;
  }
  return label || '';
}

function formatNoticePeriod(root) {
  const direct = root.noticePeriod || root.noticePeriodDetail || root.notice_period || root.np;
  if (direct) return String(direct).trim();
  if (Array.isArray(root.noticePeriods) && root.noticePeriods.length) {
    return root.noticePeriods
      .map((item) => String(item?.label || item?.name || item || '').trim())
      .filter(Boolean)
      .join(', ');
  }
  return '';
}

function formatWorkMode(root) {
  const wfh = String(root.wfhType ?? root.workMode ?? '').trim();
  if (wfh === '0') return 'Work from office';
  if (wfh === '2') return 'Remote';
  if (wfh === '3') return 'Hybrid';
  if (root.workModeLabel) return String(root.workModeLabel).trim();
  return '';
}

function isNaukriDescriptionComplete(raw) {
  const text = String(raw || '').trim();
  if (!text) return false;
  if (text.length >= 1500) return true;
  const hasRole = /role\s*(?:&|and)?\s*responsibilit/i.test(text);
  const hasPreferred = /preferred\s*candidate/i.test(text);
  const hasEducation = /education\s*\(?(?:ug|pg)\)?/i.test(text) || /\bB\.?\s*Tech\b/i.test(text);
  const bulletLines = text.split('\n').filter((l) => /^[-•*]|\d+\./.test(l.trim())).length;
  if (hasRole && hasPreferred && bulletLines >= 2) return true;
  if (hasRole && text.length >= 900) return true;
  if (hasRole && hasEducation && text.length >= 600) return true;
  return false;
}

function pickBestNaukriDescription(current, fetched) {
  const cur = String(current || '').trim();
  const full = String(fetched || '').trim();
  if (!full) return cur;
  if (!cur) return full;
  if (full.length > cur.length + 80) return full;
  if (!isNaukriDescriptionComplete(cur) && isNaukriDescriptionComplete(full)) return full;
  if (/role\s*(?:&|and)?\s*responsibilit/i.test(full) && !/role\s*(?:&|and)?\s*responsibilit/i.test(cur)) {
    return full;
  }
  return full.length >= cur.length ? full : cur;
}

function buildNaukriDetailApiUrls(jobId) {
  const id = String(jobId || '').trim();
  if (!id) return [];
  return [
    `https://www.naukri.com/jobapi/v4/job/${id}?src=jobsearchDesk`,
    `https://www.naukri.com/jobapi/v4/job/${id}`,
    `https://www.naukri.com/jobapi/v3/job/${id}`,
    `https://www.nma.mobi/post/v4/job/${id}?src=jobsearchios`,
  ];
}

function unescapeJsonString(raw) {
  return String(raw || '')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function extractNaukriJobJsonFromHtml(html) {
  const text = String(html || '');
  if (!text) return null;

  const jobDetailsIdx = text.indexOf('"jobDetails"');
  if (jobDetailsIdx >= 0) {
    const slice = text.slice(jobDetailsIdx, jobDetailsIdx + 120000);
    const descMatch = slice.match(/"description"\s*:\s*"((?:\\.|[^"\\])*)"/);
    if (descMatch && descMatch[1] && descMatch[1].length > 80) {
      return { jobDetails: { description: unescapeJsonString(descMatch[1]) } };
    }
  }

  for (const field of ['description', 'jobDescription']) {
    const re = new RegExp(`"${field}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`, 's');
    const match = text.match(re);
    if (match && match[1] && match[1].length > 120) {
      return { description: unescapeJsonString(match[1]) };
    }
  }
  return null;
}

function extractDescriptionFromNaukriHtml(html) {
  const embedded = extractNaukriJobJsonFromHtml(html);
  if (embedded) {
    const composed = composeNaukriFullDescription(extractNaukriDetailRoot(embedded), {});
    if (composed && composed.length > 200) return composed;
  }

  const text = String(html || '');
  const plainMarkers = [
    /Role\s*&\s*responsibilities[\s\S]{80,8000}/i,
    /Role\s*and\s*responsibilities[\s\S]{80,8000}/i,
  ];
  for (const re of plainMarkers) {
    const m = text.match(re);
    if (m && m[0]) {
      const chunk = stripHtml(m[0]);
      if (chunk.length > 200) return capJobDescription(chunk);
    }
  }
  return '';
}

function composeNaukriFullDescription(detailRoot, seedJob = {}) {
  const root = detailRoot && typeof detailRoot === 'object' ? detailRoot : {};
  const title = String(seedJob.title || root.title || '').trim();
  const company = String(seedJob.company || root.companyName || root.company || '').trim();
  const location = formatLocations(
    root.locations,
    seedJob.location || placeholderLabel(root.placeholders, 'location')
  );
  const experience = String(
    seedJob.experience || root.experienceText || placeholderLabel(root.placeholders, 'experience') || ''
  ).trim();
  const noticePeriod = formatNoticePeriod(root);
  const workMode = formatWorkMode(root);

  const mainHtml = extractMainDescriptionHtml(root);
  const mainText = stripHtml(mainHtml);
  const preferredProfile = stripHtml(
    root.preferredCandidateProfile || root.preferredCandidate || root.preferredProfile || ''
  );
  const skillsText = formatKeySkills(root.keySkills, root.tagsAndSkills || seedJob.skills);
  const salary = formatSalary(root.salaryDetail, placeholderLabel(root.placeholders, 'salary'));
  const education = formatEducation(root.education, root);

  const parts = [];
  if (title) parts.push(`Job Title: ${title}`);
  if (company) parts.push(`Company: ${company}`);
  if (location) parts.push(`Location: ${location}`);
  if (experience) parts.push(`Experience: ${experience}`);
  if (noticePeriod) parts.push(`Notice Period (NP): ${noticePeriod}`);
  if (salary) parts.push(`Salary: ${salary}`);
  if (workMode) parts.push(`Work Mode: ${workMode}`);
  if (parts.length) parts.push('');

  if (skillsText) {
    parts.push('Key Skills');
    parts.push(skillsText);
    parts.push('');
  }

  if (mainText) {
    parts.push('Job Description');
    parts.push(mainText);
    parts.push('');
  }

  if (preferredProfile && !mainText.toLowerCase().includes('preferred candidate')) {
    parts.push('Preferred Candidate Profile');
    parts.push(preferredProfile);
    parts.push('');
  }

  const meta = [];
  if (root.jobRole || root.role) meta.push(`Role: ${root.jobRole || root.role}`);
  if (root.industry) meta.push(`Industry Type: ${root.industry}`);
  if (root.functionalArea) meta.push(`Department: ${root.functionalArea}`);
  if (root.employmentType) meta.push(`Employment Type: ${root.employmentType}`);
  if (root.roleCategory) meta.push(`Role Category: ${root.roleCategory}`);
  if (education.ug) meta.push(`Education (UG): ${education.ug}`);
  if (education.pg) meta.push(`Education (PG): ${education.pg}`);
  else if (education.label) meta.push(`Education: ${education.label}`);
  if (root.vacancy) meta.push(`Vacancies: ${root.vacancy}`);

  if (meta.length) {
    parts.push('Additional Details');
    parts.push(meta.join('\n'));
  }

  const composed = parts.join('\n').trim();
  if (composed) return capJobDescription(composed);

  const fallback = stripHtml(mainHtml || seedJob.description || '');
  return capJobDescription(fallback);
}

function parseNaukriDetailDescription(data, seedJob = {}) {
  const root = extractNaukriDetailRoot(data);
  return composeNaukriFullDescription(root, seedJob);
}

module.exports = {
  stripHtml,
  extractNaukriDetailRoot,
  extractMainDescriptionHtml,
  composeNaukriFullDescription,
  parseNaukriDetailDescription,
  isNaukriDescriptionComplete,
  pickBestNaukriDescription,
  buildNaukriDetailApiUrls,
  extractDescriptionFromNaukriHtml,
  placeholderLabel,
};
