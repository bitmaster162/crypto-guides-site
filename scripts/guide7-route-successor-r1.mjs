import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const slug = 'perpetual-funding-and-liquidation-risk';
const ruFile = fileURLToPath(new URL('../src/pages/guides/' + slug + '.md', import.meta.url));
const enFile = fileURLToPath(new URL('../src/pages/en/guides/' + slug + '.md', import.meta.url));

// Guide 7 is optional for legacy repository snapshots, but an incomplete or
// materially weakened RU/EN pair is a hard failure, not a silent no-op.
export function isExactGuide7Successor() {
  if (!existsSync(ruFile) && !existsSync(enFile)) return false;
  if (!existsSync(ruFile) || !existsSync(enFile)) {
    throw new Error('Guide 7 reviewed pages require both RU and EN files');
  }
  const ru = readFileSync(ruFile, 'utf8');
  const en = readFileSync(enFile, 'utf8');
  const shared = [
    'slug: ' + slug,
    'reviewed: "2026-11-19"',
    'next_review: "2027-02-19"',
    'category: Risk Management',
    'schema: [Article, BreadcrumbList]',
    'sources:',
    'https://bybit-exchange.github.io/docs/v5/market/history-fund-rate',
    'https://bybit-exchange.github.io/docs/v5/market/instrument',
    'https://help.coinbase.com/en/coinbase/derivatives/us-perpetual-futures-overview',
    'https://bybit-exchange.github.io/docs/v5/position',
    'https://www.cftc.gov/filings/orgrules/rules0617266784.pdf#page=8',
    'https://help.coinbase.com/en/derivatives/perpetual-style-futures/contract-specifications',
    '2026-42',
    '1129',
    'BIP',
    '2026-11-20',
    'https://www.bybit.com/en/help-center/article/Understanding-the-Adjustment-and-Impact-of-the-New-Margin-Calculation',
    'UNKNOWN/HOLD'
  ];
  for (const [label, text, required] of [
    ['RU', ru, [...shared, 'lang: ru', 'path: /guides/' + slug,
      'потере всего обеспечения', 'полностью безрисковой', '$5 000', '−7,50', 'прежняя редакция спецификации',
      'layout: ../../layouts/ReviewedGuideLayout.astro']],
    ['EN', en, [...shared, 'lang: en', 'path: /en/guides/' + slug,
      'entire posted collateral', 'fully risk-free', '$5,000', '−7.50', 'earlier specification',
      'layout: ../../../layouts/EnglishReviewedGuideLayout.astro']]
  ]) {
    for (const marker of required) {
      if (!text.includes(marker)) throw new Error('Guide 7 ' + label + ' missing review marker: ' + marker);
    }
    const count = (text.match(/^  - title: /gm) || []).length;
    if (count !== 8) throw new Error('Guide 7 ' + label + ' requires eight primary-source metadata entries');
  }
  if (ru.includes('По двум страницам нельзя считать') || en.includes('These descriptions must not be treated')) {
    throw new Error('Guide 7 reverted to disproved BIP product-identity ambiguity');
  }
  return true;
}
