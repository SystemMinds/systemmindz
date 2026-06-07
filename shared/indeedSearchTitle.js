/**
 * Indeed job search `q` must be job title only — never title + skills combined.
 */

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeSkillList(skills) {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.map((s) => String(s).trim()).filter(Boolean);
  return String(skills)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function stripSkillsFromTitle(title, skills) {
  let out = String(title || '').trim();
  if (!out) return '';
  for (const skill of normalizeSkillList(skills)) {
    const re = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'gi');
    out = out.replace(re, ' ');
  }
  return out.replace(/\s+/g, ' ').trim();
}

/**
 * @param {{ jobTitle?: string, keywords?: string, targetRole?: string, skills?: string[]|string, combinedKeywords?: string }} input
 * @returns {string}
 */
function resolveIndeedJobTitle(input = {}) {
  const role = String(input.targetRole || '').trim();
  const combined = String(input.combinedKeywords || '').trim();
  const rawTitle = String(input.jobTitle || '').trim();
  const rawKeywords = String(input.keywords || '').trim();
  const skills = input.skills;

  const clean = (raw) => {
    const stripped = stripSkillsFromTitle(raw, skills);
    if (!stripped) return '';
    if (role && stripped.toLowerCase() === role.toLowerCase()) return role;
    if (role && combined && raw === combined) return role;
    if (role && stripped.toLowerCase().startsWith(role.toLowerCase())) {
      const tail = stripSkillsFromTitle(stripped.slice(role.length), skills);
      if (!tail) return role;
    }
    return stripped;
  };

  if (rawTitle) {
    const t = clean(rawTitle);
    if (t) return t;
  }

  if (rawKeywords) {
    const t = clean(rawKeywords);
    if (t) return t;
  }

  return role;
}

export { resolveIndeedJobTitle, stripSkillsFromTitle };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { resolveIndeedJobTitle, stripSkillsFromTitle };
}
