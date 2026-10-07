import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const archiveCopy = 'Архив. Материал не проверялся на текущую дату: цифры, комиссии и правила бирж могли измениться.';

const expectedMachineArtifacts = new Map([
  ['guides-index.json', ['65FEAE1B042E8876E3DD38CD46C155701360819A041B5295C1AAD1171029BD42', 138170]],
  ['api/public-guides.json', ['0282B182AB768223E345A3A4AE2CB7926A807E3ED0AA3D13C6CCE5804EBE9F0F', 135504]],
  ['sitemap.xml', ['EE8260DD41D55FB8AE2387E81FECA37EF3F97B73F420D98473E0DEFFC5056E85', 390]],
  ['llms.txt', ['4F2552A19451A7569CEBC22826E3D6683782E2DCF07F9AC9F6105ACC9662C0CD', 1175]]
]);

const decode = (value = '') => String(value)
  .replace(/&nbsp;/giu, ' ')
  .replace(/&amp;/giu, '&')
  .replace(/&lt;/giu, '<')
  .replace(/&gt;/giu, '>')
  .replace(/&quot;/giu, '"')
  .replace(/&#39;/giu, "'");

const visibleText = (html = '') => decode(String(html)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim());

const forbiddenVisible = [
  /REVIEW_REQUIRED/u,
  /[A-Z0-9_]*REVERIFY_REQUIRED/u,
  /REVIEW_STATUS_LOADING/u,
  /CURRENTNESS_LOADING/u,
  /RESTORED CONTENT/u,
  /YMYL REVIEW/u,
  /Открыть review index/iu,
  /Это восстановленный исследовательский материал/iu,
  /Для этого материала установлен YMYL review boundary/iu,
  /Source-derived review metadata/iu
];

for (const [relative, [expectedSha, expectedBytes]] of expectedMachineArtifacts) {
  const bytes = await readFile(join(dist, relative));
  const actualSha = createHash('sha256').update(bytes).digest('hex').toUpperCase();
  assert.equal(actualSha, expectedSha, `${relative} SHA256 changed during reader-only P31.3`);
  assert.equal(bytes.length, expectedBytes, `${relative} byte length changed during reader-only P31.3`);
}

const manifest = JSON.parse(await readFile(join(dist, 'guides-index.json'), 'utf8'));
assert.equal(manifest.schema, 'crypto-guides.public-index.v1');
assert.equal(manifest.records?.length, 162);
assert.equal(manifest.uniqueGuides, 162);

const guideDirs = (await readdir(join(dist, 'guides'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
assert.equal(guideDirs.length, 162);

let archiveRoutes = 0;
let reviewedRoutes = 0;
for (const slug of guideDirs) {
  const html = await readFile(join(dist, 'guides', slug, 'index.html'), 'utf8');
  const text = visibleText(html);

  for (const pattern of forbiddenVisible) {
    assert.doesNotMatch(text, pattern, `${slug} exposes P31.3-forbidden reader status vocabulary`);
  }
  assert.equal((html.match(/data-guide-truth-boundary/gu) || []).length, 1, `${slug} reader boundary count`);

  const archiveCount = html.split(archiveCopy).length - 1;
  const reviewedCount = (html.match(/Проверено \d{4}-\d{2}-\d{2} · следующий пересмотр \d{4}-\d{2}-\d{2}/gu) || []).length;
  assert.equal(archiveCount + reviewedCount, 1, `${slug} must expose exactly one reader status line`);

  const statusPos = archiveCount === 1 ? html.indexOf(archiveCopy) : html.search(/Проверено \d{4}-\d{2}-\d{2} · следующий пересмотр \d{4}-\d{2}-\d{2}/u);
  const articlePos = html.indexOf('<article');
  assert.ok(statusPos >= 0 && articlePos > statusPos, `${slug} reader status must be above the article heading`);

  if (archiveCount === 1) archiveRoutes += 1;
  if (reviewedCount === 1) reviewedRoutes += 1;
  assert.equal((html.match(/class="public-repair-meta"/gu) || []).length, 0, `${slug} public repair service meta survived`);
}

const guideIndexHtml = await readFile(join(dist, 'guides', 'index.html'), 'utf8');
const guideIndexText = visibleText(guideIndexHtml);
for (const pattern of forbiddenVisible) {
  assert.doesNotMatch(guideIndexText, pattern, `/guides exposes P31.3-forbidden reader status vocabulary`);
}
assert.match(guideIndexText, /Архив/u);
assert.match(guideIndexText, /Материалы без даты проверки следует считать историческими/iu);

const guideIndexSource = await readFile(join(root, 'src/pages/guides/index.astro'), 'utf8');
for (const marker of ['reviewFilter', 'ymylFilter', 'canonicalBadge(record)', 'YMYL REVIEW']) {
  assert.ok(!guideIndexSource.includes(marker), `/guides source still renders service UI marker: ${marker}`);
}
assert.ok(!guideIndexSource.includes('${esc(record.reviewStatus'), '/guides cards still render reviewStatus');
assert.ok(!guideIndexSource.includes('${esc(record.currentness'), '/guides cards still render currentness');

const boundarySource = await readFile(join(root, 'src/components/GuideTruthBoundary.astro'), 'utf8');
assert.ok(boundarySource.includes(archiveCopy), 'archive reader copy missing from GuideTruthBoundary');
assert.ok(boundarySource.includes('Проверено ${reviewed} · следующий пересмотр ${nextReview}'), 'reviewed reader copy missing from GuideTruthBoundary');
for (const marker of ['REVIEW_STATUS_LOADING', 'CURRENTNESS_LOADING', 'RESTORED CONTENT · REVIEW REQUIRED', 'YMYL REVIEW', 'Открыть review index']) {
  assert.ok(!boundarySource.includes(marker), `GuideTruthBoundary still contains reader-visible service marker: ${marker}`);
}

const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
assert.equal(packageJson.scripts?.['apply:p31-reader-status'], 'node scripts/apply-p31-3-reader-status-r1.mjs');
assert.equal(packageJson.scripts?.['verify:p31-reader-status'], 'node scripts/verify-p31-3-reader-status-r1.mjs');
assert.ok(packageJson.scripts?.['build:site']?.includes('npm run apply:p31-reader-status'));
assert.ok(packageJson.scripts?.build?.includes('npm run verify:p31-reader-status'));

console.log(`P31_3_READER_STATUS_R1=PASS guides=162 archive_routes=${archiveRoutes} reviewed_routes=${reviewedRoutes} forbidden_visible_hits=0 public_repair_meta=0 machine_artifacts_byte_identical=4`);
