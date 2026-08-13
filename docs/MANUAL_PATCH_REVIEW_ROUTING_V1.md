# Manual patch — typed review routing v1

Status: `MANUAL_APPLY_REQUIRED`

Reason: the GitHub connector safety interlock blocked the direct replacement of `scripts/apply-review-status.mjs` after `src/data/public-review-rules.json` was added successfully. Do not treat the rules file as active until this patch is applied and CI passes.

Branch: `feat/v2-content-truth-quality-r2`

Observed target blob before blocked write: `scripts/apply-review-status.mjs` SHA `b94346c65490e739f16325106ef371498fc16e3a`.

## Required replacement

Replace the complete contents of `scripts/apply-review-status.mjs` with:

```js
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifestPath = join(root, 'dist/guides-index.json');
const overridePath = join(root, 'src/data/public-review-overrides.json');
const rulePath = join(root, 'src/data/public-review-rules.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const reviewConfig = JSON.parse(await readFile(overridePath, 'utf8'));
const ruleConfig = JSON.parse(await readFile(rulePath, 'utf8'));
const overrides = reviewConfig.records || {};
const defaultStatus = reviewConfig.defaultStatus || 'RESTORED_UNREVIEWED';
const rules = Array.isArray(ruleConfig.rules) ? ruleConfig.rules : [];

if (!Array.isArray(manifest.records)) throw new Error('guides-index.json records are missing');
if (!rules.length) throw new Error('public review rules are missing');

const compiledRules = rules.map((rule) => {
  if (!rule.id || !rule.pattern || !rule.status || !rule.currentness) {
    throw new Error(`Invalid review rule: ${JSON.stringify(rule)}`);
  }
  return { ...rule, regex: new RegExp(rule.pattern, 'i') };
});

const builtSlugs = new Set(manifest.records.map((record) => record.slug));
const missing = Object.keys(overrides).filter((slug) => !builtSlugs.has(slug));
if (missing.length) throw new Error(`Review overrides reference missing routes: ${missing.join(', ')}`);

manifest.reviewSources = [
  'src/data/public-review-overrides.json',
  'src/data/public-review-rules.json'
];
manifest.reviewPolicy = 'EXPLICIT_OVERRIDE_THEN_CONSERVATIVE_TOPIC_ROUTING_THEN_RESTORED_UNREVIEWED';
manifest.records = manifest.records.map((record) => {
  const explicit = overrides[record.slug] || null;
  const haystack = [record.slug, record.title, record.category].filter(Boolean).join(' ');
  const matchedRule = explicit ? null : compiledRules.find((rule) => rule.regex.test(haystack)) || null;
  const review = explicit || matchedRule || {};
  const reviewBasis = explicit
    ? `explicit:${record.slug}`
    : matchedRule
      ? `rule:${matchedRule.id}`
      : 'default:restored-unreviewed';

  return {
    ...record,
    reviewStatus: review.status || defaultStatus,
    currentness: review.currentness || 'UNREVIEWED',
    ymyl: review.ymyl === true,
    pair: review.pair || null,
    reviewNote: review.note || null,
    reviewBasis,
    reviewRuleId: matchedRule?.id || null
  };
});
manifest.reviewCounts = manifest.records.reduce((acc, record) => {
  acc[record.reviewStatus] = (acc[record.reviewStatus] || 0) + 1;
  return acc;
}, {});
manifest.reviewRuleCounts = manifest.records.reduce((acc, record) => {
  const key = record.reviewBasis.startsWith('rule:')
    ? record.reviewBasis.slice(5)
    : record.reviewBasis.startsWith('explicit:')
      ? 'explicit'
      : 'default';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`REVIEW_STATUS_GATE=PASS guides=${manifest.records.length} explicit_overrides=${Object.keys(overrides).length} rules=${compiledRules.length} default_status=${defaultStatus} routed=${manifest.records.length - (manifest.reviewRuleCounts.default || 0)}`);
```

## Validation

Run on the same branch:

```bash
npm ci
npm run build
```

Required receipts:

```text
DISCOVERY_GENERATION=PASS built_guides=162 sitemap_urls=166 source=dist
REVIEW_STATUS_GATE=PASS guides=162 explicit_overrides=8 rules=5 default_status=RESTORED_UNREVIEWED routed=<nonzero>
PUBLIC_CONTRACT_GATE=PASS guides=162 sha=<exact-head-sha> required_artifacts=9
```

Then inspect `dist/guides-index.json` and require:

- `reviewSources` contains both review JSON files;
- `reviewPolicy` equals `EXPLICIT_OVERRIDE_THEN_CONSERVATIVE_TOPIC_ROUTING_THEN_RESTORED_UNREVIEWED`;
- every record has `reviewBasis`;
- explicit overrides still win over topic rules;
- `ymyl=true` is assigned only by an explicit override or the conservative trading/YMYL rule;
- no record is promoted to `CURRENT` or `VERIFIED` by these rules.

No merge or production promotion is implied by applying this patch.
