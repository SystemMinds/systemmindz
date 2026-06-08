/**
 * Score and rank job listings against resume-extracted skills.
 */

function normalizeSkillList(skills) {
  if (!skills) return [];
  if (Array.isArray(skills)) {
    return skills
      .map((s) => {
        if (s && typeof s === 'object') {
          return String(s.skill_name || s.name || s.skill || s.title || s.text || '').trim();
        }
        return String(s).trim();
      })
      .filter(Boolean);
  }
  return String(skills)
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

function computeSkillMatchPercent(skills, job = {}) {
  const list = normalizeSkillList(skills).map((s) => s.toLowerCase());
  if (!list.length) return 0;
  const hay = [
    job.title,
    job.skills,
    job.tagsAndSkills,
    job.description,
    job.company,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  if (!hay) return 0;
  let hits = 0;
  for (const skill of list) {
    if (skill.length > 1 && hay.includes(skill)) hits += 1;
  }
  if (!hits) return 0;
  return Math.min(100, Math.round((hits / list.length) * 100));
}

function rankJobsByResumeSkills(jobs, skills) {
  const list = Array.isArray(jobs) ? jobs : [];
  const skillList = normalizeSkillList(skills);
  if (!skillList.length) return list;
  return [...list]
    .map((job) => ({
      ...job,
      matchPercent: job.matchPercent ?? computeSkillMatchPercent(skillList, job),
    }))
    .sort((a, b) => (b.matchPercent || 0) - (a.matchPercent || 0));
}

module.exports = {
  normalizeSkillList,
  computeSkillMatchPercent,
  rankJobsByResumeSkills,
};
