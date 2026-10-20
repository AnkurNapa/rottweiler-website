// Fails if the menu order drifts from the order the sections appear on the home page.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const nav = [...readFileSync('src/data/site.js', 'utf8').matchAll(/id: '(\w+)'/g)].map((m) => m[1]);
const page = readFileSync('src/pages/index.astro', 'utf8');
const tag = { story: '<Story', finder: '<Finder', pack: '<Pack', taste: '<TasteMap', find: '<FindUs', trade: '<Trade' };
const positions = nav.map((id) => page.indexOf(tag[id]));
assert.ok(positions.every((p) => p >= 0), 'every menu item has a section');
assert.deepEqual(positions, [...positions].sort((a, b) => a - b), 'menu order matches page order');
console.log('nav order ok');
