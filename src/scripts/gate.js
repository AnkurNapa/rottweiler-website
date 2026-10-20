import { DEFAULT_MIN_AGE, PROHIBITION } from '../data/states.js';

// Whole years between a YYYY-MM-DD birth date and today.
export function ageOn(dob, today) {
  const [y, m, d] = dob.split('-').map(Number);
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age -= 1;
  return age;
}

// Returns '' when the visitor may enter, otherwise the message to show.
export function checkEntry(dob, state, today) {
  if (!dob || !state) return 'Please enter your date of birth and choose where you are.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || Number.isNaN(Date.parse(dob))) return 'Please enter a valid date of birth.';
  if (PROHIBITION.includes(state)) return `Sorry. Alcohol is not permitted in ${state}, so we cannot show you this site.`;
  if (ageOn(dob, today) < DEFAULT_MIN_AGE) return 'Sorry. This site is only for adults of legal drinking age.';
  return '';
}
