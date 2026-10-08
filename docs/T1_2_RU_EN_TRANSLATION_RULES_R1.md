# T1.2 · Crypto Guides — RU → EN translation rules (R1)

Status: **translation parity contract only**. This document and its verifier do not authorise publishing, committing, merging, or deploying any English guide. The first guide remains under the separate T1.3 human review and owner-approval gate.

## Canonical source and routed destination

Crypto Guides is an Astro static site. The pre-existing RU article is `src/pages/guides/<slug>.md` (there is no `.ru.md` suffix in the repository). The routed EN counterpart must be `src/pages/en/guides/<slug>.md`, with the **same slug**. This is the explicitly documented file-location exception to the 2 October 2026 T1 wording `<slug>.ru.md` / adjacent `<slug>.en.md`.

Do not place `<slug>.en.md` beside the Russian file; that path does not implement the intended route. A future English file at `src/pages/en/guides/<slug>.md` renders `/en/guides/<slug>`; the original continues to render `/guides/<slug>`. T1.1's empty `/en/guides` index and English layout exist already.

T1.2 **must not create any routed English Markdown article**. After this change, `/en/guides` has one index page and zero EN article routes. The English translation draft reviewed by Claude is separate from this task.

## Translation and attribution rules

- The author's/Claude's verified RU Markdown is authoritative. GPT translates RU → EN; Claude independently reviews the first English translation, which is published **only after the owner's explicit “ок”**. Subsequent translations follow the parity verifier and their own approval gates.
- Preserve every fact, number, date, example, source, qualification, disclaimer and level of certainty. No additional prices, guarantees, trading advice or unsupported factual updates.
- Attribute claims exactly as in RU (e.g. an exchange's statement must remain an exchange-attributed statement, not the site's assertion). A source paraphrase is **not** a verbatim quotation unless compared word-for-word with the original.
- Prefer plain, concise English and British spelling (`summarised`, `behaviour`); render dates as `2 October 2026`. Keep API documentation terms intact: `API key`, `IP allowlist`, `sub-account`, `Ed25519`, `HMAC`, `countdownCancelAll`, `DCP`. Keep branded BitEvo terminology unchanged.
- The first guide uses **kill switch** consistently (title, description, summary, section, checklist). Preserve the Claude-reviewed Binance attribution and the approved BitEvo related-link title.
- Translate `title`, `seo_title` (maximum 60 Unicode characters) and `description` (maximum 160 characters). Translate TOC labels, `research_source` prose and human-readable body without changing meaning.
- **Identical metadata** across paired versions: `site`, `slug`, `category`, `reviewed`, `next_review`, `sources` (including source titles, URLs and order) and `schema`. Source titles written in Russian remain as they occur in RU if they are part of unchanged `sources`.
- RU: `lang: ru`, `path: /guides/<slug>`. EN: `lang: en`, `path: /en/guides/<slug>`, `alternate: /guides/<slug>`, and `layout: ../../../layouts/EnglishReviewedGuideLayout.astro` from `src/pages/en/guides/`.
- Replace a RU-page link with its EN equivalent **only when an actual EN pair exists and is reviewed/source-backed**. An allowed external exception is the already approved `https://bitevo.work/ru/guides/before-write-access` ↔ `https://bitevo.work/guides/before-write-access`; both URLs were verified HTTP 200. Unapproved URL substitutions fail parity.
- Each indexable language page has a self canonical. Paired articles have reciprocal `hreflang="ru"` and `hreflang="en"`, with `x-default` pointing to RU. Without an article pair, the Russian switch falls back to `/en/guides`. Both published versions must appear in sitemap and llms.txt.
- Archived/unreviewed RU guides do not enter the English section. Never silently copy historical sources as current guidance.

## Machine-verifiable acceptance

Run `node scripts/verify-t1-2-ru-en-parity-r1.mjs --self-test` for fixture-based tests, and `npm run verify:t1-ru-en-parity` for self-tests plus automatic discovery of all `src/pages/en/guides/*.md` articles. The latter is wired into the complete `npm run build` pipeline.

For each paired slug, the script requires:

1. Same numbers of H2 and H3 headings; same Markdown table-line count and **semantic table-row count** (header and data rows excluding separators); same number of numbered/bulleted list items.
2. Identical sets of URLs after *only* the documented RU↔EN link substitutions. Source URL set and source order must remain unchanged.
3. Identical sets of number tokens after normalising Russian/English month dates and `DD.MM.YYYY` to `YYYY-MM-DD`; URL-derived digits are excluded from number-token comparison. ISO dates, percentages, durations and money figures remain comparable.
4. Matching required source metadata, correct `lang/path/alternate`, EN layout and SEO limits. Missing RU source, stray `<slug>.en.md` beside RU, invalid files and unapproved replacements fail closed.
5. No dropped section, example, qualification, invented quote or change in claim attribution — **human semantic review remains mandatory**, because numerical/structural parity does not prove semantic equivalence.

The verifier prints `T1_2_RU_EN_PARITY_R1=PASS` with total pair count, structural comparisons, URL and numeric checks, fixture test counts and mismatch count. Any mismatch exits nonzero and identifies the slug and dimension. Its positive and negative self-tests use only memory; **no fixture Markdown is written into the routed source directory**.

At the T1.2 baseline, `pairs=0` is intentional and **does not mean a real translation has passed**. The full static build remains **169 pages**, with **163 RU guide routes, 1 EN index, 0 EN articles**, and 7 sitemap URLs.

## T1.3 follow-up (separate authority)

For the first article `trading-bot-api-keys`, publish the already Claude-reviewed EN text only after the owner reviews the complete final version and says “ок”; before merge check parity on both real Markdown files. The T1.1 tests presently pin `EN article count=0` and the P28.7 test pins one EN HTML page. **T1.3 must update these future-state expectations under its own scoped approval**; do not weaken or preemptively change them in T1.2.

T1.2 changes are confined to this document, `scripts/verify-t1-2-ru-en-parity-r1.mjs` and `package.json`. No RU article body, `src/data`, commit, push, PR, merge, deployment, branch deletion, Drive update or lease action is authorised.
