# Crypto Guides — bilingual guide template and translation contract (T1.4)

This directory holds the **operator template/translation contract**, not routed articles. The authoritative detailed rules and verification logic are already committed:

- [T1.2 RU → EN translation rules](../../docs/T1_2_RU_EN_TRANSLATION_RULES_R1.md)
- [Canonical T1.2 parity verifier](../../scripts/verify-t1-2-ru-en-parity-r1.mjs)
- [Adjacent T1.4 checker](check_translation_parity.mjs), a thin import of that **same** verifier, with no duplicate comparison implementation

## Authorship and evidence authority

For **Crypto Guides, Russian is the primary research language**:

1. **Claude** authors and fact-checks the original RU guide, including claims, quotations, sources, dates and the boundaries of what was verified.
2. **GPT** creates the English counterpart of that *reviewed* RU source. GPT must not introduce new factual claims, advice, prices, thresholds, results or promises; it must not remove examples, figures, dates, sources, qualifications or the disclaimer.
3. English is **not automatically approved for publication**. Structural parity is mandatory, but does not prove semantic fidelity or external factual currency. The first EN article required Claude/owner review; future articles require their own scoped source, parity, content-review and publication approvals.
4. Do **not** retranslate or rewrite existing approved bilingual content, including the published P31.5/T1.3 Crypto Guides RU↔EN `trading-bot-api-keys` pair. Elsewhere in the ecosystem, preserve the existing P30 BitEvo and E2 AI Skill Lab bilingual guides without regeneration.

## Actual Astro route paths

The source files live in the Astro route tree rather than next to this README. A matched pair uses the **same slug**:

| | RU primary | EN translation |
|---|---|---|
| Markdown source | `src/pages/guides/<slug>.md` | `src/pages/en/guides/<slug>.md` |
| Public URL | `/guides/<slug>` | `/en/guides/<slug>` |
| Frontmatter `lang` | `ru` | `en` |
| Frontmatter `layout` | `../../layouts/ReviewedGuideLayout.astro` | `../../../layouts/EnglishReviewedGuideLayout.astro` |

The proposal to store adjacent `<slug>.ru.md` / `<slug>.en.md` is **not valid for these Astro routes**. Match the files by `slug`; preserve the original RU Markdown source bytes.

## Minimal frontmatter template (new, separately approved guide only)

RU source fields:

```yaml
---
site: cryptoguidessite.vercel.app
slug: <slug>
path: /guides/<slug>
lang: ru
category: Security
title: "<source-verified Russian title>"
seo_title: "<source-verified Russian SEO title>"
description: "<source-verified Russian description>"
reviewed: "YYYY-MM-DD"
next_review: "YYYY-MM-DD"
sources:
  - title: "<exact verified source title>"
    url: https://example.invalid/source
schema: [Article, BreadcrumbList]
layout: ../../layouts/ReviewedGuideLayout.astro
---
```

EN counterpart has the same `site`, `slug`, `category`, `reviewed`, `next_review`, `sources` (entire title/URL/order) and `schema`. Its localized fields are:

```yaml
path: /en/guides/<slug>
alternate: /guides/<slug>
lang: en
title: "<faithful English title>"
seo_title: "<faithful English SEO title, 60 characters max>"
description: "<faithful English description, 160 characters max>"
layout: ../../../layouts/EnglishReviewedGuideLayout.astro
```

The examples contain placeholders only, **not** new source facts. Retain all other existing frontmatter fields, including `toc`, `related` and `research_source`, with faithful English-facing text where appropriate. Any internal locale-link substitution requires a **published, reviewed** EN counterpart; external-source URLs stay unchanged. The existing T1.2 BitEvo related-link exception is narrowly defined in the canonical checker.

## Translation fidelity and publication gate

- Maintain H2/H3 headings, Markdown table lines/semantic rows, list-item counts, source URLs and numerical values. Normalise RU/EN dates to `YYYY-MM-DD` for comparison.
- Do not elevate a paraphrase into a direct quotation without checking the original source verbatim. Preserve original attribution and uncertainty.
- Use clear British English, including `summarised` and `behaviour`; render dates as `2 October 2026`. Preserve documented technical terms such as `API key`, `IP allowlist`, `sub-account`, `Ed25519`, `HMAC`, `countdownCancelAll` and `DCP`, and BitEvo terms `Authority Budget`, `Evidence Before Effect`, `False Green`.
- Only guides that have review dates and source references qualify as reviewed EN articles. Historical/unreviewed archive pages **must not** be automatically translated or indexed as current.
- A paired reviewed page needs self canonical, reciprocal `hreflang=ru/en` and `x-default=ru`. Without a published pair the language switch falls back to `/en/guides`. Indexable pairs belong in sitemap and llms.txt.
- **A zero-mismatch script output is not an owner approval, a merge, or production evidence.** Keep source, build, PR, deployment and live readback distinct.

## Local acceptance

Run from the repository root:

```sh
node guides/crypto/check_translation_parity.mjs
npm run verify:t1-ru-en-parity
npm run build
```

Both checker entrypoints reuse `scripts/verify-t1-2-ru-en-parity-r1.mjs`, which runs 30 in-memory checks (18 negative scenarios) and discovers the actual RU/EN pairs. A valid current result includes `T1_2_RU_EN_PARITY_R1=PASS pairs=1 ... mismatches=0`.

**Baseline at T1.4:** 163 RU guide routes, 2 reviewed RU articles, 1 EN index, 1 reviewed EN article, 170 generated HTML pages and 8 sitemap URLs. The approved first EN guide's LF-canonical SHA256 is `84407BDC284768EE9BDC56ABFBF2A8CF5F7E56B798C5EFF78994FB94F7FB68D6`. Local Windows CRLF checkout bytes can have a different SHA256 without changing Git source content.

This T1.4 change is **contract only**. No original guide, `src/data`, route, generator, package script, existing verifier, release configuration, PR, deployment or translation publication is authorized by adding this README/checker.
