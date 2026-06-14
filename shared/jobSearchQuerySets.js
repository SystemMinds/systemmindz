/**
 * Job-search keywords — teams-style combined queries (role + top skills).
 * One search per platform, not one search per skill.
 */

const { resolveIndeedJobTitle } = require('./indeedSearchTitle');

const DEFAULT_TARGET = 15;
const MAX_TARGET = 25;
const MAX_QUERY_SETS = 2;
const MAX_SKILLS_IN_QUERIES = 3;

function normalizeSkillList(skills) {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.map((s) => String(s).trim()).filter(Boolean);
  return String(skills)
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Merge resume skills + optional preference string; resume list wins ordering. */
function mergeResumeSearchSkills(skills, skillsStr) {
  const out = [];
  const seen = new Set();
  const add = (list) => {
    for (const raw of normalizeSkillList(list)) {
      const key = raw.toLowerCase();
      if (!key || key.length < 2 || seen.has(key)) continue;
      seen.add(key);
      out.push(raw);
    }
  };
  add(skills);
  add(skillsStr);
  return out.slice(0, MAX_SKILLS_IN_QUERIES);
}

function resolvePrimaryTitle(input = {}) {
  const targetRole = String(input.targetRole || '').trim();
  const prefTitle = String(input.jobTitle || '').trim();
  const keywords = String(input.keywords || '').trim();
  if (targetRole) return targetRole;
  return prefTitle || keywords.split(/\s+/).slice(0, 6).join(' ') || '';
}

function filterSkillsNotInTitle(roleTitle, skills = []) {
  const title = String(roleTitle || '').trim().toLowerCase();
  if (!title) return normalizeSkillList(skills);
  const titleTokens = new Set(title.split(/\s+/).filter((t) => t.length > 1));
  return normalizeSkillList(skills).filter((skill) => {
    const sk = String(skill || '').trim().toLowerCase();
    if (!sk || sk.length < 2) return false;
    if (titleTokens.has(sk)) return false;
    if (title.includes(sk)) return false;
    return true;
  });
}

/**
 * Teams composeJobHuntSearchQuery — role + top skill(s) in one string.
 * @param {string} roleTitle
 * @param {string[]|string} skills
 * @param {{ maxSkills?: number }} [opts]
 */
function composeJobHuntSearchQuery(roleTitle, skills = [], { maxSkills = 2 } = {}) {
  const role = String(roleTitle || '').trim();
  const topSkills = filterSkillsNotInTitle(role, skills).slice(0, Math.max(0, Number(maxSkills) || 0));
  const core = [role, ...topSkills].filter(Boolean).join(' ').trim();
  return core || 'software engineer';
}

function buildTeamsStyleQuerySets(platform, input = {}) {
  const skills = mergeResumeSearchSkills(input.skills, input.skillsStr);
  let role = resolvePrimaryTitle(input);

  if (platform === 'indeed' || platform === 'naukri' || platform === 'monster') {
    role =
      resolveIndeedJobTitle({
        jobTitle: input.jobTitle,
        keywords: input.keywords,
        targetRole: input.targetRole,
        skills: skills.length ? skills : input.skills || input.skillsStr,
        combinedKeywords: input.combinedKeywords,
      }) || role;
  }

  const queries = [];
  const seen = new Set();
  const add = (q) => {
    const text = String(q || '').trim();
    const key = text.toLowerCase();
    if (!text || seen.has(key)) return;
    seen.add(key);
    queries.push(text);
  };

  if (platform === 'monster') {
    add(composeJobHuntSearchQuery(role, skills, { maxSkills: 0 }));
  } else if (platform === 'naukri' || platform === 'indeed') {
    add(composeJobHuntSearchQuery(role, skills, { maxSkills: 1 }));
  } else {
    add(composeJobHuntSearchQuery(role, skills, { maxSkills: 2 }));
  }

  const experienceTitles = normalizeSkillList(input.experienceTitles).slice(0, 2);
  for (const expTitle of experienceTitles) {
    if (!expTitle || expTitle.toLowerCase() === role.toLowerCase()) continue;
    const cleanedExp = resolveIndeedJobTitle({
      jobTitle: expTitle,
      targetRole: input.targetRole,
      skills,
      combinedKeywords: input.combinedKeywords,
    }) || expTitle;
    const altMax = platform === 'monster' ? 0 : platform === 'naukri' || platform === 'indeed' ? 1 : 2;
    add(composeJobHuntSearchQuery(cleanedExp, skills, { maxSkills: altMax }));
    if (queries.length >= MAX_QUERY_SETS) break;
  }

  if (!queries.length) {
    const rawFallback = String(input.combinedKeywords || input.keywords || '').trim();
    const fallback =
      platform === 'monster'
        ? resolveIndeedJobTitle({
            jobTitle: rawFallback,
            keywords: input.keywords,
            targetRole: input.targetRole,
            skills,
            combinedKeywords: input.combinedKeywords,
          }) || rawFallback
        : rawFallback;
    add(fallback || 'software engineer');
  }

  return queries.slice(0, MAX_QUERY_SETS);
}

/**
 * @param {'linkedin'|'indeed'|'naukri'|'monster'} platform
 * @param {{ jobTitle?: string, targetRole?: string, skills?: string[]|string, skillsStr?: string, keywords?: string, combinedKeywords?: string, experienceTitles?: string[]|string }} input
 * @returns {string[]}
 */
function buildJobSearchQuerySets(platform, input = {}) {
  return buildTeamsStyleQuerySets(platform, input);
}

/** Jobs to collect per keyword query (teams uses one combined query — full target). */
function resolvePerQueryJobBudget(targetCount, queryCount) {
  const target = Math.max(5, Number(targetCount) || DEFAULT_TARGET);
  const queries = Math.max(1, Number(queryCount) || 1);
  return Math.ceil(target / queries);
}

function resolveJobSearchTarget(raw, fallback = DEFAULT_TARGET) {
  const n = parseInt(String(raw ?? ''), 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(MAX_TARGET, Math.max(5, n));
}

/** Jobs to request per search API call (Naukri/Indeed/LinkedIn pagination). */
function resolveJobsPerApiRequest(raw) {
  const n = parseInt(String(raw ?? ''), 10);
  if (!Number.isFinite(n) || n < 1) return DEFAULT_TARGET;
  return Math.min(20, Math.max(10, n));
}

module.exports = {
  buildJobSearchQuerySets,
  composeJobHuntSearchQuery,
  filterSkillsNotInTitle,
  mergeResumeSearchSkills,
  resolvePerQueryJobBudget,
  resolveJobSearchTarget,
  resolveJobsPerApiRequest,
  DEFAULT_JOB_SEARCH_TARGET: DEFAULT_TARGET,
  MAX_JOB_SEARCH_TARGET: MAX_TARGET,
  MAX_QUERY_SETS,
  MAX_SKILLS_IN_QUERIES,
};
