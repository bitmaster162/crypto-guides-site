# Crypto Guides — duplicate/revision census V1

Snapshot: 2026-08-13 16:54 UTC / 23:54 Asia-Bangkok
Baseline production: `2b19db447318a3ddf0c856889d91d0e566deafa7`
Branch: `feat/v2-content-truth-quality-r2`
Task class: READ_ONLY_CONTENT_COMPARISON + PREVIEW-ONLY DOCUMENTATION

## Rule

Same title does not imply byte identity. No public route is deleted from this branch merely because two pages cover the same subject.

Classification vocabulary:

- `EXACT_DUPLICATE` — same meaningful body/content identity;
- `REDUNDANT_REVISION_PAIR` — materially same subject/thesis, different generation/expansion;
- `DISTINCT` — overlapping topic but meaningfully separate scope;
- `CANONICAL_WINNER_PENDING_REVIEW` — a historical choice exists but currentness/evidence review is still required before redirect/archive.

## Pair 1 — trading discipline / MAE-MFE

Routes:

- `/guides/trading-discipline-journal-mae-mfe` — published 2026-06-14;
- `/guides/trading-discipline-journal-psychology` — published 2026-07-07.

Both current production routes return HTTP 200 and have the exact same public title:

`Дисциплина трейдинга: дневник, MAE/MFE и психология убытков`

Both cover the same core thesis: trading journal, MAE/MFE, disposition effect / loss psychology, and algorithmic safeguards against encoding those biases.

They are **not byte/content exact duplicates**:

- the June route is a concise version with a short MemIR summary and no active constants;
- the July route is a later expanded rewrite with longer explanatory prose, structured constants and a richer agent summary;
- dates, kicker, schema IDs and route identities differ.

Classification:

`REDUNDANT_REVISION_PAIR`

Historical evidence: commit `0065ebdd6b8bddf21fa5a55185091394b13f563d` was explicitly titled `Fix guide taxonomy: recategorize AI/Trading/Security/Infra + remove 2 duplicates (162->160)` and removed the later `trading-discipline-journal-psychology` generation while retaining the older `trading-discipline-journal-mae-mfe` route.

This establishes a prior editorial canonical decision, but the current restored production intentionally predates that change. Therefore current migration classification is:

`HISTORICAL_CANONICAL_DECISION_EXISTS / CANONICAL_WINNER_PENDING_REVIEW`

Do not redirect/delete until source quality, citations/currentness and inbound-link implications are reviewed.

## Pair 2 — microstructure / delisting data integrity

Routes:

- `/guides/microstructure-delisting-data-integrity-2026` — published 2026-06-14;
- `/guides/microstructure-delisting-2026` — published 2026-07-07.

Both current production routes return HTTP 200 and have the exact same public title:

`Микроструктура и риск делистинга 2026: data-integrity для квант-движка`

Both describe the same two core subjects:

1. the June 2026 Bybit Open Interest calculation change and historical-series calibration;
2. a Binance delisting-risk / liquidity early-warning framework.

They are **not exact duplicates**:

- the June route is the concise earlier version;
- the July route is an expanded rewrite with structured constants and more verbose integration guidance;
- dates, kicker, schema IDs, summaries and route identities differ.

Classification:

`REDUNDANT_REVISION_PAIR`

The same historical dedupe commit `0065ebdd...` removed the later `microstructure-delisting-2026` generation and retained the older `microstructure-delisting-data-integrity-2026` route.

Current migration classification:

`HISTORICAL_CANONICAL_DECISION_EXISTS / CANONICAL_WINNER_PENDING_REVIEW`

Because this is YMYL/current-market content, the canonical decision must include fresh source verification of exchange mechanics and thresholds before either revision is relabeled `CURRENT`.

## Product implication

The restored 162-guide production is known to contain at least these two redundant revision pairs. The correct product repair is not a blind `162 -> 160` deletion. The migration should:

1. preserve both historical source identities;
2. choose one canonical public route only after evidence/currentness review;
3. redirect the redundant route if/when a winner is approved;
4. retain provenance showing which historical revision was superseded;
5. generate index/API/llms/sitemap from the canonical status rather than hand-editing four separate lists.

## Build-state boundary

Current R2 head before this documentation commit was `ce35ceecb14cff99b0d71ab95b1f7405c820a6a5` and PR #2 was OPEN / DRAFT / MERGEABLE against exact production base `2b19db...`.

Vercel did not execute a build for that current implementation head because the Hobby account reported the build-rate limit. The last actual R2 build attempt was ancestor `4b3f466...`, which failed for a now-replaced source-index parser (`Guide census unexpectedly small: 69`).

The current implementation has since moved discovery generation to an actual post-build `dist/guides/*` census, but that successor code remains `BUILD_UNVERIFIED` until Vercel capacity permits an exact-head build or an independently approved CI path exists.

## No-effect receipt

No Crypto Guides production source, main branch, deployment, route, redirect, DNS, content publication, trading/capital state, credential or external message was changed by this census.
