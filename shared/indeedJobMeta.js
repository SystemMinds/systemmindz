/**
 * Extract location, work mode, and job type from Indeed SERP cards and viewjob JSON.
 */

function textFrom(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'object' && value.text != null) return String(value.text).trim();
  if (typeof value === 'object' && value.label != null) return String(value.label).trim();
  return String(value).trim();
}

function parseJobTypesList(jobTypes) {
  if (!jobTypes) return '';
  const arr = Array.isArray(jobTypes) ? jobTypes : [jobTypes];
  const labels = arr
    .map((t) => {
      if (typeof t === 'string') return t.trim();
      return String(t?.label || t?.text || t?.name || '').trim();
    })
    .filter(Boolean);
  return labels[0] || '';
}

function tagLabels(tagModels) {
  if (!Array.isArray(tagModels)) return [];
  return tagModels
    .map((t) => textFrom(t?.label || t?.text || t?.name || t))
    .filter(Boolean)
    .map((s) => s.toLowerCase());
}

function parseEmploymentFromTags(tagModels) {
  const tags = tagLabels(tagModels);
  for (const t of tags) {
    if (/full[-\s]?time/i.test(t)) return 'Full-time';
    if (/part[-\s]?time/i.test(t)) return 'Part-time';
    if (/contract/i.test(t)) return 'Contract';
    if (/intern/i.test(t)) return 'Internship';
    if (/temporary|temp\b/i.test(t)) return 'Temporary';
  }
  return '';
}

function normalizeWorkplaceType({ remoteWorkModel, remoteLocation, location, tagModels } = {}) {
  const rwm = remoteWorkModel && typeof remoteWorkModel === 'object' ? remoteWorkModel : {};
  const type = String(rwm.type || rwm.remoteWorkType || rwm.workType || '').toUpperCase();

  if (type.includes('HYBRID')) return 'hybrid';
  if (type.includes('REMOTE') && !type.includes('DISABLED')) return 'remote';
  if (type.includes('ONSITE') || type.includes('ON_SITE') || type.includes('DISABLED')) return 'onsite';
  if (remoteLocation === true) return 'remote';

  const tags = tagLabels(tagModels);
  const loc = String(location || '').toLowerCase();
  const hay = [...tags, loc].join(' ');

  if (/\bhybrid\b/.test(hay)) return 'hybrid';
  if (/\bremote\b/.test(hay) && !/\bno remote\b/.test(hay)) return 'remote';
  if (/\bon[-\s]?site\b/.test(hay)) return 'onsite';

  return null;
}

function extractLocation({ body, header, card } = {}) {
  const h = header || {};
  const direct = [
    body?.jobLocation,
    body?.trueJobLocation,
    h.formattedLocation,
    h.location,
    card?.formattedLocation,
    card?.jobLocation,
    card?.location,
  ]
    .map(textFrom)
    .filter(Boolean);

  if (direct.length) return direct[0];

  const city = textFrom(card?.jobLocationCity || body?.jobLocationCity);
  const state = textFrom(card?.jobLocationState || body?.jobLocationState);
  if (city && state) return `${city}, ${state}`;
  if (city) return city;

  const sub = textFrom(h.subtitle);
  if (sub.includes(' - ')) {
    const loc = sub.split(' - ').slice(1).join(' - ').trim();
    if (loc) return loc;
  }

  return '';
}

function parseViewJobBody(body) {
  if (!body || typeof body !== 'object') {
    return { location: '', employmentType: '', workplaceType: null };
  }

  let jim = body.jobInfoWrapperModel?.jobInfoModel;
  if (typeof jim === 'string') {
    try {
      jim = JSON.parse(jim);
    } catch {
      jim = {};
    }
  }
  jim = jim || {};

  const header = jim.jobInfoHeaderModel || {};
  const detailsSection = jim.jobDescriptionSectionModel?.jobDetailsSection || {};
  const metaHeader = body.jobMetadataHeaderModel || jim.jobMetadataHeaderModel || {};

  const location = extractLocation({ body, header });
  const jobTypesRaw =
    header.jobTypes || detailsSection.jobTypes || jim.jobTypes || body.jobTypes || metaHeader.jobTypes;
  const employmentType =
    parseJobTypesList(jobTypesRaw) ||
    textFrom(metaHeader.jobType) ||
    textFrom(body.jobType) ||
    parseEmploymentFromTags(header.tagModels || body.tagModels);

  const workplaceType = normalizeWorkplaceType({
    remoteWorkModel: header.remoteWorkModel || body.remoteWorkModel,
    remoteLocation: header.remoteLocation ?? body.remoteLocation,
    location,
    tagModels: header.tagModels || body.tagModels || header.taxonomyAttributes,
  });

  return { location, employmentType, workplaceType };
}

function parseSerpCard(card) {
  if (!card || typeof card !== 'object') {
    return { location: '', employmentType: '', workplaceType: null };
  }

  const location = extractLocation({ card });
  const employmentType =
    parseJobTypesList(card.jobTypes) ||
    textFrom(card.jobType) ||
    parseEmploymentFromTags(card.taxonomyAttributes || card.tagModels);

  const workplaceType = normalizeWorkplaceType({
    remoteWorkModel: card.remoteWorkModel,
    remoteLocation: card.remoteLocation,
    location,
    tagModels: card.taxonomyAttributes || card.tagModels,
  });

  return { location, employmentType, workplaceType };
}

function mergeIndeedJobMeta(base, extra) {
  const out = { ...(base || {}) };
  const loc = textFrom(extra?.location);
  const emp = textFrom(extra?.employmentType);
  if (loc) out.location = loc;
  if (emp) {
    out.employmentType = emp;
    out.employment_type = emp;
  }
  if (extra?.workplaceType) {
    out.workplaceType = extra.workplaceType;
    out.workplace_type = extra.workplaceType;
  }
  return out;
}

function formatWorkplaceLabel(workplaceType) {
  const wt = String(workplaceType || '').toLowerCase();
  if (wt === 'remote') return 'Remote';
  if (wt === 'hybrid') return 'Hybrid';
  if (wt === 'onsite' || wt === 'on-site' || wt === 'on_site') return 'On-site';
  return '';
}

function formatEmploymentLabel(employmentType) {
  const et = String(employmentType || '').trim();
  if (!et) return '';
  const upper = et.toUpperCase();
  if (upper.includes('FULL')) return 'Full-time';
  if (upper.includes('PART')) return 'Part-time';
  if (upper.includes('CONTRACT') || upper.includes('FREELANCE')) return 'Contract';
  if (upper.includes('INTERN')) return 'Internship';
  if (upper.includes('TEMP')) return 'Temporary';
  return et;
}

module.exports = {
  textFrom,
  parseViewJobBody,
  parseSerpCard,
  mergeIndeedJobMeta,
  formatWorkplaceLabel,
  formatEmploymentLabel,
  normalizeWorkplaceType,
  extractLocation,
};
