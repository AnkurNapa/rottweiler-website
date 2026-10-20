import assert from 'node:assert/strict';
import { pickBeer } from './finder.js';

const order = ['strong', 'dry', 'ipa', 'wit'];
assert.equal(pickBeer(['dry:2,wit:1', 'wit:2,dry:1', 'wit:4'], order), 'wit');
assert.equal(pickBeer(['strong:2,ipa:1', 'strong:2,dry:1', 'strong:4'], order), 'strong');
assert.equal(pickBeer(['ipa:2,strong:1', 'ipa:2,wit:1', 'dry:4'], order), 'dry', 'IPA and Dry tie on 4; Dry is listed first');
assert.equal(pickBeer(['ipa:2,strong:1', 'ipa:2,wit:1', 'ipa:4'], order), 'ipa');
assert.equal(pickBeer(['dry:2', 'strong:2'], order), 'strong', 'a tie goes to the first beer in the list');
assert.equal(pickBeer([], order), 'strong');
console.log('finder ok');
