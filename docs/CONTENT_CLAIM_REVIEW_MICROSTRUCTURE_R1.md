# Crypto Guides — microstructure/delisting claim review R1

Snapshot: 2026-08-14 Asia/Bangkok
Task class: CONTENT_TRUTH_REVIEW / READ_ONLY_EXTERNAL_VERIFICATION / NO_PRODUCTION_PROMOTION

## Routes under review

- `microstructure-delisting-data-integrity-2026`
- `microstructure-delisting-2026`

Both routes publish the same title and are already classified as `REDUNDANT_REVISION_PAIR`.

## Primary-source findings

### Bybit open-interest method change

Confirmed from Bybit's own announcement and Help Center:

- effective date: 2026-06-11;
- displayed OI methodology changed from bilateral/double-sided counting to unilateral/single-sided counting;
- Bybit says displayed OI becomes approximately 50% lower;
- Bybit describes this as a display/methodology change rather than a drop in underlying market activity;
- Bybit also documents API fields supporting single-sided OI and says integrations should be updated.

Disposition: `PRIMARY_EVENT_CONFIRMED`.

The guide's use of an exact historical `0.5` transform is a derived data-engineering rule. The primary source supports the direction and approximate magnitude of the discontinuity, but that does not by itself prove one universal transform is correct for every historical field/vendor/data pipeline.

Disposition: `DERIVED_HEURISTIC_REVIEW_REQUIRED`.

### Binance Monitoring Tag / delisting risk

Confirmed from Binance's own Monitoring Tag materials:

- Monitoring Tag assets are subject to closer review and can face delisting risk;
- Binance includes trading volume and liquidity among its review criteria;
- Binance also lists multiple non-market criteria, including project/development activity, network or smart-contract stability, communication/due-diligence responsiveness and conduct/ecosystem factors.

Disposition: `PRIMARY_CRITERIA_CONFIRMED`.

The guide's custom numeric Delist-Risk Score and its volume/spread/depth thresholds were not found as Binance-published official thresholds in this primary-source review. They must therefore be labeled as internal/derived heuristics unless a direct exchange source is later attached.

Disposition: `HEURISTIC_NOT_SOURCE_BOUND_TO_BINANCE`.

## Canonicalization decision

`PENDING_CLAIM_LEVEL_REVIEW`

The July route is a review-first candidate because it is later dated and carries richer explicit metadata, but later date/richer metadata is not sufficient evidence to make it the canonical public authority.

`canonicalSlug = null`

## Required cleanup before a canonical winner can be selected

1. Separate exchange-confirmed facts from internal heuristics in page copy and machine metadata.
2. Bind the Bybit event statement to a primary source.
3. Label any exact historical transform as a pipeline-specific calibration rule, not an exchange guarantee.
4. Label Delist-Risk Score thresholds as internal heuristics unless an exchange primary source is attached.
5. Compare the two bodies after those edits and only then choose canonical/superseded disposition.

## Boundaries

No guide deletion, redirect, canonical URL change, trading/runtime action, production deployment or merge is authorized by this review.
