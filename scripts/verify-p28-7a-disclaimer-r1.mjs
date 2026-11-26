import {isExactGuide5Successor} from './guide5-route-successor-r1.mjs';
import {isExactGuide6Successor} from './guide6-route-successor-r1.mjs';
import {isExactGuide7Successor} from './guide7-route-successor-r1.mjs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { readContract } from './r3-learning-contract.mjs';

const root = new URL('../', import.meta.url);
const disclaimer = 'Здесь — личная практика и исследования автора. Это не инвестиционный совет и не предложение управлять чужими средствами. Торговля криптоактивами может привести к потере всех вложенных денег; прошлые результаты не гарантируют будущих.';
const enDisclaimer = "This is the author's own practice and research. It is not investment advice or an offer to manage anyone's funds. Trading crypto-assets can lose all the money you put in; past results do not predict future ones.";
const digest = (value) => createHash('sha256').update(value, 'utf8').digest('hex');
assert.equal(digest(disclaimer), '6dd6a7500f9265a42e1f35bf0981cfdf1da0217bffcd0e01dc8af5e6d7b232dc', 'approved RU disclaimer hash');
assert.equal(digest(enDisclaimer), '9900d9e98fc20ec130e5b2f71b3bbf7a6fff014bb382e4767dd42d621689ee24', 'approved EN P28.7 disclaimer hash');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
    if (entry.isDirectory()) out.push(...await walk(url));
    else if (entry.name.endsWith('.html')) out.push(url);
  }
  return out;
}

const source = await readFile(new URL('src/layouts/Layout.astro', root), 'utf8');
assert.equal(source.split(disclaimer).length - 1, 1, 'shared layout carries exact RU disclaimer once');
assert.equal(source.split(enDisclaimer).length - 1, 1, 'shared layout carries exact EN disclaimer once');

const htmlFiles = await walk(new URL('dist/', root));
assert.ok(htmlFiles.length > 0, 'rendered HTML exists');
let checks = 4;
const r3Expected = new Set((await readContract()).map(row => row.route + '/index.html'));
const r3Seen = new Set();
let enPages = 0;
let ruPages = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const isEn = file.pathname.replace(/\\/g, '/').includes('/dist/en/');
  const selected = isEn ? enDisclaimer : disclaimer;
  const other = isEn ? disclaimer : enDisclaimer;
  assert.equal(html.split(selected).length - 1, 1, `${file.pathname}: approved localized disclaimer exactly once`);
  assert.equal(html.split(other).length - 1, 0, `${file.pathname}: wrong language disclaimer absent`);
  const route = file.pathname.replace(/\\/g, '/').split('/dist/').at(-1);
  const r3Path = '/' + route;
  if (r3Expected.has(r3Path)) {
    assert.ok(!r3Seen.has(r3Path), 'duplicate R3 page');
    r3Seen.add(r3Path);
  } else if (isEn) enPages += 1;
  else ruPages += 1;
  checks += 2;
}
assert.deepEqual([...r3Seen].sort(), [...r3Expected].sort(), 'exact 18 separately enumerated R3 pages');
assert.equal(enPages, (isExactGuide5Successor()?3:2)+(isExactGuide6Successor()?1:0)+(isExactGuide7Successor()?1:0), 'T1.3 adds exactly one reviewed EN guide, plus the EN index');
assert.equal(ruPages, (isExactGuide5Successor()?169:168)+(isExactGuide6Successor()?1:0)+(isExactGuide7Successor()?1:0), 'P31.5 RU/static HTML page census preserved');
console.log(`P28_7A_CRYPTO_GUIDES_DISCLAIMER_GATE=PASS checks=${checks} html=${htmlFiles.length} en_html=${enPages} ru_html=${ruPages} static_html=PASS js_required=0`);
