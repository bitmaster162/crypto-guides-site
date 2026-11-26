import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const sha256 = (b) => createHash('sha256').update(b).digest('hex');
const corpusDir = join(root, 'guides/crypto/drafts/r3');
const frozenHash = '30716bccad544e1b6da12ecc996dbe0352f2b935ceec7556d801f46881b54e5b';
export const moduleSlugs = [
  'spot-order-book-integrity',
  'spot-candle-temporal-integrity',
  'spot-order-filters',
  'spot-rate-limit-backoff',
  'order-cancellation-and-api-timeouts',
  'spot-stp-prevented-quantity',
  'spot-commission-accounting',
  'spot-account-reconciliation',
  'spot-order-list-lifecycle'
];
export const routeFor = (slug, lang) => (lang === 'en' ? '/en' : '') + '/learn/r3/' + slug;
export async function readContract() {
  const bytes = await readFile(join(corpusDir, 'manifest.json'));
  assert.equal(sha256(bytes), frozenHash, 'frozen R3 manifest');
  const manifest = JSON.parse(bytes);
  assert.equal(manifest.status, 'DRAFT_HOLD');
  assert.equal(manifest.routing_active, false, 'the frozen draft manifest is not publication authority');
  assert.equal(manifest.publication_authorized, false);
  assert.deepEqual(manifest.modules.map(m => m.slug_proposal), moduleSlugs);
  const rows = [], names = ['manifest.json'];
  for (const [i, m] of manifest.modules.entries()) {
    assert.equal(m.module, 'M' + (i+1));
    assert.equal(m.review_status, 'NOT_RUN');
    const { ru, en } = m.locales;
    assert.deepEqual(ru.sources, en.sources);
    for (const lang of ['ru','en']) {
      const v = m.locales[lang];
      assert.equal(v.lang, lang);
      assert.equal(v.slug, m.slug_proposal);
      for (const k of ['reviewed','modified','next_review']) assert.equal(v[k], null);
      assert.match(v.body_file, /^[0-9]{2}-[a-z0-9-]+\.(ru|en)\.md$/);
      const b = await readFile(join(corpusDir, v.body_file));
      assert.equal(b.length, v.bytes);
      assert.equal(sha256(b), v.body_sha256);
      names.push(v.body_file);
      rows.push({ module: m.module, slug: v.slug, lang, route: routeFor(v.slug, lang), ...v });
    }
  }
  assert.equal(new Set(names).size, 19);
  assert.deepEqual((await readdir(corpusDir)).sort(), names.sort());
  assert.equal(rows.length, 18);
  return rows;
}
