import { access, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicGuideRepairs } from '../src/data/public-guide-repairs.mjs';
import { btcFuturesRepairs } from '../src/data/public-guide-repairs-btc-futures.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const repairs = [...publicGuideRepairs, ...btcFuturesRepairs];

if (!Array.isArray(repairs) || repairs.length === 0) {
  throw new Error('public guide repair registry is empty');
}

const seen = new Set();
for (const repair of repairs) {
  if (repair.schema !== 'crypto-guides.public-guide-repair.v1') throw new Error(`repair schema mismatch: ${repair.slug || '<unknown>'}`);
  if (!repair.slug || !repair.repairId || !repair.articleHtml || !repair.evidenceDoc) throw new Error(`repair record incomplete: ${JSON.stringify(repair)}`);
  if (seen.has(repair.slug)) throw new Error(`duplicate public guide repair slug: ${repair.slug}`);
  seen.add(repair.slug);

  await access(join(root, repair.evidenceDoc));
  const outPath = join(dist, 'guides', repair.slug, 'index.html');
  const html = await readFile(outPath, 'utf8');
  const articlePattern = /<article\b[^>]*class="article-page"[^>]*>[\s\S]*?<\/article>/iu;
  if (!articlePattern.test(html)) throw new Error(`public guide article boundary missing: ${repair.slug}`);
  if (html.includes(`data-public-guide-repair="${repair.repairId}"`)) throw new Error(`public guide repair already present before apply step: ${repair.slug}`);

  const repaired = html.replace(articlePattern, repair.articleHtml.trim());
  if (repaired === html) throw new Error(`public guide repair made no change: ${repair.slug}`);
  await writeFile(outPath, repaired, 'utf8');
  console.log(`PUBLIC_GUIDE_REPAIR_APPLY=PASS slug=${repair.slug} repair=${repair.repairId} state=${repair.state}`);
}

console.log(`PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=${repairs.length}`);
