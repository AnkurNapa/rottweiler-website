// Fails if the built site discloses confidential manual detail.
// The guarded words are stored as SHA-256 fingerprints so this public file does not reveal them.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BANNED = new Set(['0a7e65741d6f19be', '174d2ef545e194ae', '1d068693e577cc23', '2a0f3a0d09b63a5e', '375e22317bfcf5cc', '62eec64b921040cd', '7b41bea34113801b', '87e4571bc7b47363', 'a0ab1170e5d67f17', 'f0106182d053c23d']);
const fp = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');
assert.ok(files.length, 'run npm run build first');
for (const f of files) {
  const words = readFileSync(f, 'utf8').toLowerCase().replace(/<[^>]+>/g, ' ').match(/[a-z0-9-]+/g) || [];
  // Check single words and two-word phrases.
  words.forEach((w, i) => {
    assert.ok(!BANNED.has(fp(w)), `${f} contains a guarded term`);
    if (i) assert.ok(!BANNED.has(fp(`${words[i - 1]} ${w}`)), `${f} contains a guarded phrase`);
  });
}
console.log(`banned terms ok (${files.length} pages)`);
