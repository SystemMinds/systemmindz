const EXPERIENCE_PRESET_CUSTOM = 'custom';

function experienceYearsFromPreset(preset, customYears = '') {
  const p = String(preset || '').trim();
  if (!p) return null;
  if (p === 'fresher') return 0;
  if (p === '1' || p === '2' || p === '3') return Number(p);
  if (p === EXPERIENCE_PRESET_CUSTOM) {
    const n = parseFloat(String(customYears || '').trim());
    return Number.isFinite(n) && n >= 0 ? n : null;
  }
  return null;
}

function resolveLinkedInExperienceLevelFromPreset(preset, customYears = '') {
  const years = experienceYearsFromPreset(preset, customYears);
  if (years == null) return '';
  if (years < 1) return '2';
  if (years < 3) return '3';
  if (years < 8) return '4';
  if (years < 12) return '5';
  return '6';
}

function resolveIndeedExplvlFromPreset(preset, customYears = '') {
  const years = experienceYearsFromPreset(preset, customYears);
  if (years == null) return '';
  if (years < 2) return 'entry_level';
  if (years < 6) return 'mid_level';
  return 'senior_level';
}

function resolveNaukriExperienceFromPreset(preset, customYears = '') {
  const years = experienceYearsFromPreset(preset, customYears);
  if (years == null) return '';
  if (years < 1) return '0';
  if (years < 3) return '2';
  if (years < 5) return '3';
  if (years < 10) return '5';
  return '10';
}

function inferExperiencePresetFromLegacy(platform, saved = {}) {
  if (saved.experiencePreset) return String(saved.experiencePreset);
  if (platform === 'linkedin') {
    const v = String(saved.experienceLevel || '');
    if (v === '1' || v === '2') return 'fresher';
    if (v === '3') return '2';
    if (v === '4' || v === '5' || v === '6') return EXPERIENCE_PRESET_CUSTOM;
  }
  if (platform === 'indeed' || platform === 'monster') {
    if (saved.explvl === 'entry_level') return 'fresher';
    if (saved.explvl === 'mid_level') return '2';
    if (saved.explvl === 'senior_level') return EXPERIENCE_PRESET_CUSTOM;
  }
  if (platform === 'naukri') {
    if (saved.experience === '0') return 'fresher';
    if (saved.experience === '2') return '2';
    if (saved.experience === '3') return '3';
    if (saved.experience === '5' || saved.experience === '10') return EXPERIENCE_PRESET_CUSTOM;
  }
  return '';
}

function resolvePlatformExperienceFilters(platform, saved = {}) {
  const preset = inferExperiencePresetFromLegacy(platform, saved);
  const custom = String(saved.experienceCustom || '').trim();
  if (platform === 'linkedin') {
    return {
      experiencePreset: preset,
      experienceCustom: custom,
      experienceLevel: resolveLinkedInExperienceLevelFromPreset(preset, custom),
    };
  }
  if (platform === 'indeed' || platform === 'monster') {
    return {
      experiencePreset: preset,
      experienceCustom: custom,
      explvl: resolveIndeedExplvlFromPreset(preset, custom),
    };
  }
  if (platform === 'naukri') {
    return {
      experiencePreset: preset,
      experienceCustom: custom,
      experience: resolveNaukriExperienceFromPreset(preset, custom),
    };
  }
  return { experiencePreset: preset, experienceCustom: custom };
}

function formatExperiencePresetLabel(preset, custom = '') {
  const p = String(preset || '').trim();
  if (!p) return '';
  if (p === EXPERIENCE_PRESET_CUSTOM) {
    const c = String(custom || '').trim();
    return c ? `${c} years` : 'Custom';
  }
  const labels = {
    fresher: 'Freshers',
    1: '1 year',
    2: '2 years',
    3: '3 years',
  };
  return labels[p] || p;
}

function buildSearchCriteriaSummary(platform, filters = {}, keywords = '') {
  const f = filters && typeof filters === 'object' ? filters : {};
  const lines = [];
  const title = String(keywords || f.jobTitle || '').trim();
  if (title) {
    lines.push({ label: platform === 'naukri' ? 'Job title' : 'Keywords', value: title });
  }
  const expLabel = formatExperiencePresetLabel(f.experiencePreset, f.experienceCustom);
  if (expLabel) lines.push({ label: 'Experience', value: expLabel });
  const location = String(f.location || '').trim();
  if (location) lines.push({ label: 'Location', value: location });
  const days = String(f.datePostedDays || '').trim();
  if (days) {
    lines.push({ label: 'Posted', value: days === '1' ? 'Last 1 day' : `Last ${days} days` });
  }
  return lines;
}

module.exports = {
  EXPERIENCE_PRESET_CUSTOM,
  experienceYearsFromPreset,
  resolveLinkedInExperienceLevelFromPreset,
  resolveIndeedExplvlFromPreset,
  resolveNaukriExperienceFromPreset,
  inferExperiencePresetFromLegacy,
  resolvePlatformExperienceFilters,
  formatExperiencePresetLabel,
  buildSearchCriteriaSummary,
};
