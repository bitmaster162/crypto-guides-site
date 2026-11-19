import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const slug = 'low-cap-grid-bots-costs-and-risks';
const ruFile = fileURLToPath(new URL('../src/pages/guides/' + slug + '.md', import.meta.url));
const enFile = fileURLToPath(new URL('../src/pages/en/guides/' + slug + '.md', import.meta.url));

// This successor gate recognizes the specific paired review, not arbitrary extra pages.
// Missing one side or a material truth marker fails closed.
export function isExactGuide6Successor() {
  if (!existsSync(ruFile) && !existsSync(enFile)) return false;
  if (!existsSync(ruFile) || !existsSync(enFile)) {
    throw new Error('Guide 6 must have both RU and EN reviewed sources');
  }
  const ru = readFileSync(ruFile, 'utf8');
  const en = readFileSync(enFile, 'utf8');
  const common = [
    'slug: ' + slug,
    'reviewed: "2026-11-19"',
    'next_review: "2027-02-19"',
    'GRID_OS_EDGE_AFTER_COSTS_R1',
    'sources:',
    'UNKNOWN'
  ];
  for (const [name, text, markers] of [
    ['RU', ru, [...common, '−$768,14', '+$577,97', '−$1 346,10', 'lang: ru']],
    ['EN', en, [...common, '−$768.14', '+$577.97', '−$1,346.10', 'lang: en']]
  ]) {
    for (const marker of markers) {
      if (!text.includes(marker)) throw new Error('Guide 6 ' + name + ' missing evidence marker: ' + marker);
    }
  }
  return true;
}
