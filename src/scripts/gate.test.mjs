import assert from 'node:assert/strict';
import { ageOn, checkEntry } from './gate.js';

const today = new Date(2026, 9, 20); // 20 Oct 2026
assert.equal(ageOn('2001-10-20', today), 25, 'birthday today counts');
assert.equal(ageOn('2001-10-21', today), 24, 'birthday tomorrow does not');
assert.equal(checkEntry('2001-10-20', 'Maharashtra', today), '');
assert.match(checkEntry('2001-10-21', 'Maharashtra', today), /legal drinking age/);
assert.match(checkEntry('1980-01-01', 'Gujarat', today), /not permitted in Gujarat/);
assert.match(checkEntry('', 'Goa', today), /date of birth/);
assert.match(checkEntry('1980-01-01', '', today), /choose where/);
assert.match(checkEntry('19x0-01-01', 'Goa', today), /valid date/);
console.log('gate ok');
