/**
 * Build multiple job-search keyword queries from job title + resume skills.
 * Skill-only queries run first so jobs are found even when the title does not match.
 */

const { resolveIndeedJobTitle } = require('./indeedSearchTitle');

const DEFAULT_TARGET = 15;
const MAX_TARGET = 25;
const MAX_QUERY_SETS = 12;

function normalizeSkillList(skills) {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.map((s) => String(s).trim()).filter(Boolean);
  return String(skills)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseSkills(input = {}) {
  const fromArray = normalizeSkillList(input.skills);
  if (fromArray.length) return fromArray.slice(0, 10);
  return normalizeSkillList(input.skillsStr).slice(0, 10);
}

function resolveTitle(input = {}) {
  const fromPrefs = String(input.jobTitle || '').trim();
  const role = String(input.targetRole || '').trim();
  const keywords = String(input.keywords || '').trim();
  return fromPrefs || role || keywords.split(/\s+/).slice(0, 5).join(' ') || '';
}

function addSkillFirstQueries(add, title, skills) {
  for (const skill of skills.slice(0, 8)) {
    add(skill);
    add(`${skill} developer`);
    add(`${skill} engineer`);
  }

  if (skills.length >= 2) {
    add(skills.slice(0, 2).join(' '));
    add(skills.slice(0, 3).join(' '));
  }

  if (title) {
    add(title);
    for (const skill of skills.slice(0, 6)) {
      add(`${title} ${skill}`);
    }
    if (skills.length) {
      add([title, ...skills.slice(0, 4)].join(' '));
    }
  }
}

/**
 * @param {'linkedin'|'indeed'|'naukri'|'monster'} platform
 * @param {{ jobTitle?: string, targetRole?: string, skills?: string[]|string, skillsStr?: string, keywords?: string, combinedKeywords?: string }} input
 * @returns {string[]}
 */
function buildJobSearchQuerySets(platform, input = {}) {
  const title = resolveTitle(input);
  const skills = parseSkills(input);
  const queries = [];
  const seen = new Set();

  const add = (q) => {
    const text = String(q || '').trim();
    const key = text.toLowerCase();
    if (!text || seen.has(key)) return;
    seen.add(key);
    queries.push(text);
  };

  if (platform === 'indeed') {
    const indeedTitle =
      resolveIndeedJobTitle({
        jobTitle: input.jobTitle,
        keywords: input.keywords,
        targetRole: input.targetRole,
        skills: input.skills || input.skillsStr,
        combinedKeywords: input.combinedKeywords,
      }) || title;

    addSkillFirstQueries(add, indeedTitle, skills);
    return queries.length ? queries.slice(0, MAX_QUERY_SETS) : ['software engineer'];
  }

  if (platform === 'naukri') {
    const naukriTitle =
      resolveIndeedJobTitle({
        jobTitle: input.jobTitle,
        keywords: input.keywords,
        targetRole: input.targetRole,
        skills: input.skills || input.skillsStr,
        combinedKeywords: input.combinedKeywords,
      }) || title;

    addSkillFirstQueries(add, naukriTitle, skills);
    return queries.length ? queries.slice(0, MAX_QUERY_SETS) : ['software engineer'];
  }

  if (platform === 'linkedin' || platform === 'monster') {
    addSkillFirstQueries(add, title, skills);
    if (!queries.length) {
      const fallback = String(input.keywords || input.combinedKeywords || '').trim();
      if (fallback) add(fallback);
    }
    return queries.length ? queries.slice(0, MAX_QUERY_SETS) : ['software engineer'];
  }

  addSkillFirstQueries(add, title, skills);
  if (!queries.length) {
    const fallback = String(input.keywords || input.combinedKeywords || '').trim();
    if (fallback) add(fallback);
  }
  return queries.length ? queries.slice(0, MAX_QUERY_SETS) : ['software engineer'];
}

function resolveJobSearchTarget(raw, fallback = DEFAULT_TARGET) {
  const n = parseInt(String(raw ?? ''), 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(MAX_TARGET, Math.max(5, n));
}

module.exports = {
  buildJobSearchQuerySets,
  resolveJobSearchTarget,
  DEFAULT_JOB_SEARCH_TARGET: DEFAULT_TARGET,
  MAX_JOB_SEARCH_TARGET: MAX_TARGET,
};
