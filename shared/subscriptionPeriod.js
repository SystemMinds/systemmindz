/**
 * Subscription billing period helpers (shared by Candidate + Superadmin backends).
 */

const DEFAULT_TZ = 'Asia/Kolkata';

function formatDateInTz(date = new Date(), timeZone = DEFAULT_TZ) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function addCalendarMonths(date, months) {
  const d = new Date(date.getTime());
  const expectedDay = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < expectedDay) {
    d.setDate(0);
  }
  return d;
}

/** Start of the current monthly billing window (anniversary of subscription_started_at). */
function getCurrentBillingPeriodStart(subscriptionStartedAt, now = new Date()) {
  if (!subscriptionStartedAt) return null;
  const start = new Date(subscriptionStartedAt);
  if (Number.isNaN(start.getTime())) return null;

  let periodStart = new Date(start);
  periodStart.setHours(0, 0, 0, 0);
  const nowEnd = new Date(now);
  nowEnd.setHours(23, 59, 59, 999);

  while (true) {
    const next = addCalendarMonths(periodStart, 1);
    if (next > nowEnd) break;
    periodStart = next;
  }
  return periodStart;
}

function computeSubscriptionExpiry(startedAt, durationMonths) {
  const start = new Date(startedAt);
  return addCalendarMonths(start, Math.max(1, Number(durationMonths) || 1));
}

function shouldResetMonthly(lastResetDate, periodStart) {
  if (!periodStart) return false;
  if (!lastResetDate) return true;
  const last = new Date(lastResetDate);
  last.setHours(0, 0, 0, 0);
  const period = new Date(periodStart);
  period.setHours(0, 0, 0, 0);
  return last < period;
}

module.exports = {
  DEFAULT_TZ,
  formatDateInTz,
  addCalendarMonths,
  getCurrentBillingPeriodStart,
  computeSubscriptionExpiry,
  shouldResetMonthly,
};
