import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const disclaimer = 'Здесь — личная практика и исследования автора. Это не инвестиционный совет и не предложение управлять чужими средствами. Торговля криптоактивами может привести к потере всех вложенных денег; прошлые результаты не гарантируют будущих.';
const sha = createHash('sha256').update(disclaimer, 'utf8').digest('hex');
assert.equal(sha, '6dd6a7500f9265a42e1f35bf0981cfdf1da0217bffcd0e01dc8af5e6d7b232dc', 'approved RU disclaimer hash');

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
assert.equal(source.split(disclaimer).length - 1, 1, 'shared layout carries exact disclaimer once');

const htmlFiles = await walk(new URL('dist/', root));
assert.ok(htmlFiles.length > 0, 'rendered HTML exists');
let checks = 2;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  assert.equal(html.split(disclaimer).length - 1, 1, `${file.pathname}: exact disclaimer once`);
  checks += 1;
}
console.log(`P28_7A_CRYPTO_GUIDES_DISCLAIMER_GATE=PASS checks=${checks} html=${htmlFiles.length} static_html=PASS js_required=0`);
