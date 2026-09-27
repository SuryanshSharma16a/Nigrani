// File: src/utils/helpers.js
import { COLOR_TOKENS, STATUS_CONFIG } from '../config/constants';

/**
 * Formats ISO date string to readable Indian standard date
 */
export function fmtDate(iso, includeTime = false) {
  if (!iso) return 'Never inspected';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return 'Invalid date';

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return date.toLocaleDateString('en-IN', options);
}

/**
 * Calculates how many days ago an ISO date occurred
 */
export function daysAgo(iso) {
  if (!iso) return null;
  const time = new Date(iso).getTime();
  if (isNaN(time)) return null;
  const diff = Date.now() - time;
  const days = Math.round(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 0) return `In ${Math.abs(days)} days`;
  return `${days} days ago`;
}

/**
 * Generates a month key for charting and grouping (e.g. "2026-09")
 */
export function monthKey(iso) {
  const d = iso ? new Date(iso) : new Date();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  return `${d.getFullYear()}-${month}`;
}

/**
 * Generates a collision-resistant unique identifier
 */
export function uid(prefix = 'id') {
  const randomStr = Math.random().toString(36).substring(2, 7);
  const timeStr = Date.now().toString(36);
  return `${prefix}-${timeStr}-${randomStr}`;
}

/**
 * Returns color styling object for a given status
 */
export function statusColors(status) {
  const key = (status || '').toLowerCase();
  return (
    STATUS_CONFIG[key] || {
      label: status || 'Unknown',
      bg: COLOR_TOKENS.indigoSoft,
      fg: COLOR_TOKENS.indigo,
      dot: COLOR_TOKENS.indigo,
    }
  );
}

/**
 * Calculates score and breakdown for inspection answers object
 */
export function calculateChecklistScore(answers = {}) {
  let totalYes = 0;
  let totalNo = 0;
  let totalNA = 0;

  Object.values(answers).forEach((item) => {
    if (!item || !item.value) return;
    if (item.value === 'yes') totalYes++;
    else if (item.value === 'no') totalNo++;
    else if (item.value === 'na') totalNA++;
  });

  const evaluableCount = totalYes + totalNo;
  const score = evaluableCount === 0 ? 100 : Math.round((totalYes / evaluableCount) * 100);

  let calculatedStatus = 'compliant';
  if (score < 60) calculatedStatus = 'non-compliant';
  else if (score < 80) calculatedStatus = 'minor deficit';

  return {
    score,
    totalYes,
    totalNo,
    totalNA,
    evaluableCount,
    status: calculatedStatus,
  };
}

/**
 * Returns badge configuration based on compliance percentage
 */
export function getRiskBadge(score) {
  if (score >= 85) {
    return { label: 'Low Risk / High Compliance', bg: COLOR_TOKENS.greenSoft, fg: COLOR_TOKENS.green };
  }
  if (score >= 70) {
    return { label: 'Moderate Risk', bg: COLOR_TOKENS.orangeSoft, fg: COLOR_TOKENS.orange };
  }
  return { label: 'High Risk / Severe Deficit', bg: COLOR_TOKENS.redSoft, fg: COLOR_TOKENS.red };
}

/**
 * Calculates distance between two coordinates in kilometers using Haversine formula
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // round to 2 decimal places
}
