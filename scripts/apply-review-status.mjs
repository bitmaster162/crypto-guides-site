import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifestPath = join(root, 'dist/guides-index.json');
const overridePath = join(root, 'src/data/public-review-overrides.json');
const rulesPath = join(root, 'src/data/public-review-rules.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const overrideConfig = JSON.parse(await readFile(overridePath, 'utf8'));
const rulesConfig = JSON.parse(await readFile(rulesPath, 'utf8'));
const overrides = overrideConfig.records || {};
const rules = Array.isArray(rulesConfig.rules) ? rulesConfig.rules : [];
const defaultStatus = overrideConfig.defaultStatus || 'RESTORED_UNREVIEWED';

if (!Array.isArray(manifest.records)) throw new Error('guides-index.json records are missing');

const builtSlugs = new Set(manifest.records.map((record) => record.slug));
const missing = Object.keys(overrides).filter((slug) => !builtSlugs.has(slug));
if (missing.length) throw new Error(`Review overrides reference missing routes: ${missing.join(', ')}`);

const compiledRules = rules.map((rule) => {
  if (!rule?.id || !rule?.pattern || !rule?.status) throw new Error(`Invalid review rule: ${JSON.stringify(rule)}`);
  return { ...rule, regex: new RegExp(rule.pattern, 'i') };
});

const ruleMatches = {};
const allRuleMatches = {};
let routedByRule = 0;
let explicitCount = 0;
let defaultCount = 0;
let multiRuleRoutes = 0;
let ymylRoutes = 0;
let ymylFromSecondaryEvidence = 0;
let taxonomyPoisoningAvoided = 0;

manifest.reviewSources = [
  'src/data/public-review-overrides.json',
  'src/data/public-review-rules.json'
];
manifest.reviewSource = 'explicit override > first conservative topic rule > RESTORED_UNREVIEWED; YMYL is conservative OR across explicit + every matching topic rule; trading-YMYL matches slug+title only because restored category labels are known stale/unreliable';
manifest.records = manifest.records.map((record) => {
  const explicit = overrides[record.slug] || null;
  const contentHaystack = `${record.slug || ''} ${record.title || ''}`;
  const fullHaystack = `${contentHaystack} ${record.category || ''}`;
  const matchedRules = compiledRules.filter((rule) => {
    const input = rule.id === 'trading-ymyl' ? contentHaystack : fullHaystack;
    return rule.regex.test(input);
  });
  const matched = explicit ? null : matchedRules[0] || null;

  const tradingRule = compiledRules.find((rule) => rule.id === 'trading-ymyl');
  if (tradingRule && tradingRule.regex.test(fullHaystack) && !tradingRule.regex.test(contentHaystack)) {
    taxonomyPoisoningAvoided += 1;
  }

  for (const rule of matchedRules) {
    allRuleMatches[rule.id] = (allRuleMatches[rule.id] || 0) + 1;
  }
  if (matchedRules.length > 1) multiRuleRoutes += 1;

  if (explicit) explicitCount += 1;
  else if (matched) {
    routedByRule += 1;
    ruleMatches[matched.id] = (ruleMatches[matched.id] || 0) + 1;
  } else defaultCount += 1;

  const review = explicit || matched || {};
  const ymylEvidenceRules = matchedRules.filter((rule) => rule.ymyl === true).map((rule) => rule.id);
  const ymyl = explicit?.ymyl === true || ymylEvidenceRules.length > 0;
  const primaryYmyl = review.ymyl === true;
  if (ymyl) ymylRoutes += 1;
  if (ymyl && !primaryYmyl) ymylFromSecondaryEvidence += 1;

  return {
    ...record,
    reviewStatus: review.status || defaultStatus,
    currentness: review.currentness || 'UNREVIEWED',
    ymyl,
    pair: review.pair || null,
    reviewRule: explicit ? 'EXPLICIT_OVERRIDE' : matched?.id || null,
    reviewRuleEvidence: matchedRules.map((rule) => rule.id),
    ymylEvidenceRules,
    reviewNote: review.note || null
  };
});

const requiredYmylOverlapSlugs = [
  'bybit-uta-defensive-veto',
  'execution-drift-daemon',
  'hyperliquid-l1-tokyo-deploy',
  'pnl-protection-daemons'
];
const recordsBySlug = new Map(manifest.records.map((record) => [record.slug, record]));
for (const slug of requiredYmylOverlapSlugs) {
  const record = recordsBySlug.get(slug);
  if (!record) throw new Error(`Required YMYL overlap control route missing: ${slug}`);
  if (record.ymyl !== true) throw new Error(`Cross-category trading route lost YMYL flag: ${slug}`);
  if (!record.reviewRuleEvidence.includes('trading-ymyl')) throw new Error(`Cross-category trading route lacks trading YMYL evidence: ${slug}`);
  if (record.reviewRuleEvidence.length < 2) throw new Error(`Expected cross-category overlap not detected: ${slug}`);
}

const requiredStandaloneTradingYmylSlugs = ['risk-freymvork-dlya-kripto-botov'];
for (const slug of requiredStandaloneTradingYmylSlugs) {
  const record = recordsBySlug.get(slug);
  if (!record) throw new Error(`Required standalone trading-YMYL route missing: ${slug}`);
  if (record.ymyl !== true || !record.reviewRuleEvidence.includes('trading-ymyl')) {
    throw new Error(`Standalone trading route lost YMYL evidence: ${slug}`);
  }
}

manifest.reviewCounts = manifest.records.reduce((acc, record) => {
  acc[record.reviewStatus] = (acc[record.reviewStatus] || 0) + 1;
  return acc;
}, {});
const unrouted = manifest.records.filter((record) => !record.reviewRule).map((record) => record.slug);
manifest.reviewRouting = {
  explicitOverrides: explicitCount,
  ruleRouted: routedByRule,
  restoredUnreviewed: defaultCount,
  ruleMatches,
  allRuleMatches,
  multiRuleRoutes,
  ymylRoutes,
  ymylFromSecondaryEvidence,
  taxonomyPoisoningAvoided,
  tradingYmylMatchFields: ['slug', 'title'],
  requiredYmylOverlapSlugs,
  requiredStandaloneTradingYmylSlugs,
  unrouted
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`REVIEW_STATUS_GATE=PASS guides=${manifest.records.length} explicit_overrides=${explicitCount} rule_routed=${routedByRule} restored_unreviewed=${defaultCount} rules=${compiledRules.length} ymyl=${ymylRoutes} multi_rule=${multiRuleRoutes} ymyl_secondary=${ymylFromSecondaryEvidence} taxonomy_poisoning_avoided=${taxonomyPoisoningAvoided}`);
console.log(`YMYL_OVERLAP_GATE=PASS routes=${requiredYmylOverlapSlugs.length} standalone=${requiredStandaloneTradingYmylSlugs.length}`);
console.log(`REVIEW_RULE_COUNTS=${JSON.stringify(ruleMatches)}`);
console.log(`REVIEW_RULE_EVIDENCE_COUNTS=${JSON.stringify(allRuleMatches)}`);
console.log(`REVIEW_UNROUTED=${JSON.stringify(unrouted)}`);
