# Crypto Guides — trading-discipline claim review R1

Snapshot: 2026-08-14 Asia/Bangkok
Source head reviewed before write: `aec1a08a6eade4fabfff1d35628a9d0e5394ff0e`
Task class: CONTENT_TRUTH_REVIEW / YMYL_REVIEW / NO_PRODUCTION_PROMOTION

## Routes under review

- `trading-discipline-journal-mae-mfe`
- `trading-discipline-journal-psychology`

Both routes publish the same title: `Дисциплина трейдинга: дневник, MAE/MFE и психология убытков` and are already classified as `REDUNDANT_REVISION_PAIR`.

Repository source shows the earlier route as the concise revision and the later route as an expanded revision with richer machine metadata, including Prospect Theory, Sunk Cost Fallacy, Disposition Effect, MAE/MFE definitions and internal-looking safety-guard labels.

This review does not treat later date or richer metadata as proof of greater factual authority.

## Claim-level findings

### Disposition effect

Primary academic evidence supports the existence of the disposition effect as a behavioral-finance phenomenon.

- Shefrin & Statman (1985), *The Disposition to Sell Winners Too Early and Ride Losers Too Long: Theory and Evidence*, Journal of Finance, DOI `10.2307/2327802`, is the foundational named treatment.
- Odean (1998), *Are Investors Reluctant to Realize Their Losses?*, Journal of Finance, DOI `10.1111/0022-1082.00072`, tests brokerage records from 10,000 accounts and reports a preference for realizing winners rather than losers.

Disposition: `PRIMARY_LITERATURE_SUPPORTED_BEHAVIORAL_EFFECT`.

Boundary: evidence for a population-level behavioral tendency does not establish that every trader exhibits it, that every losing position is held because of it, or that one mechanical exit rule universally removes it.

Disposition for universal/prescriptive interpretation: `OVERGENERALIZATION_NOT_SUPPORTED`.

### Prospect Theory / loss aversion

Kahneman & Tversky (1979), *Prospect Theory: An Analysis of Decision under Risk*, Econometrica 47, 263–291, establishes prospect theory as a descriptive alternative to expected-utility theory. Tversky & Kahneman (1992), *Advances in Prospect Theory: Cumulative Representation of Uncertainty*, Journal of Risk and Uncertainty 5, 297–323, extends the framework and explicitly invokes loss aversion.

The later route currently serializes the shorthand `боль убытка ≈ 2× радости равной прибыли` as a constant-like metadata value. A roughly two-times loss-aversion coefficient is associated with a particular prospect-theory parameterization/experimental estimate; it is not a universal physical or behavioral constant applying to every person, market, stake size or decision context.

Disposition: `SUPPORTED_CONCEPT / NUMERIC_SHORTHAND_REQUIRES_QUALIFICATION`.

Required public wording boundary: describe the coefficient as an empirical/model estimate under a specified prospect-theory formulation, not as an invariant human constant.

### MAE / MFE

In the repository material, MAE and MFE are used as descriptive trade-excursion metrics: adverse excursion measures how far a trade moved against the position before closure; favorable excursion measures how far it moved in favor before closure.

These definitions are suitable as measurement concepts. The stronger step — deriving stop-loss or take-profit levels from their historical distributions — is a strategy/data-specific calibration method, not an externally guaranteed optimal trading rule.

Disposition for metric definitions: `DESCRIPTIVE_METRIC_ACCEPTABLE`.

Disposition for prescriptive stop/target optimization: `METHOD_HEURISTIC_REQUIRES_OUT_OF_SAMPLE_VALIDATION`.

Required boundary: any MAE/MFE-derived stop or target must be represented as a model-specific empirical calibration subject to sample selection, regime change, costs, slippage and out-of-sample validation.

### Internal safety / execution labels

The later revision exposes labels including `GER soft-stop`, `breakout-flatten`, `time-stop` and `regime-gate` as safety guards.

The reviewed academic sources do not establish these BitEvo/Arena implementation labels as generally validated behavioral-finance controls. They are implementation patterns belonging to the system/project layer unless separate source and test evidence is attached.

Disposition: `INTERNAL_IMPLEMENTATION_PATTERN / NOT_EXTERNAL_CERTIFICATION`.

They must not be presented as if Prospect Theory, disposition-effect literature or MAE/MFE research independently validated those exact controls.

## Revision comparison

### Earlier route — `trading-discipline-journal-mae-mfe`

Strengths:
- more concise;
- fewer hard-coded behavioral constants;
- lower machine-metadata overclaim surface.

Weaknesses:
- still needs provenance for behavioral-finance claims;
- MAE/MFE calibration language must stay method-specific rather than universal.

Canonical role remains: `EARLIER_REVISION`.

### Later route — `trading-discipline-journal-psychology`

Strengths:
- richer structure and machine-readable metadata;
- clearer enumeration of behavioral concepts and implementation guards.

Weaknesses:
- serializes the approximately-2x loss-aversion shorthand too strongly;
- can blur descriptive behavioral research with prescriptive trading-system controls;
- internal safety labels can look externally validated when they are not;
- richer metadata increases the public truth-boundary burden.

Canonical role remains: `LATER_REVISION_REVIEW_CANDIDATE`.

## Canonicalization decision

`PENDING_CLAIM_LEVEL_REVIEW`

`canonicalSlug = null`

No canonical winner is selected in R1.

The earlier revision is presently the lower-overclaim candidate; the later revision is the richer consolidation candidate. Choosing between them requires copy cleanup and source binding rather than a date-based rule.

## Required cleanup before a canonical winner can be selected

1. Qualify the approximately-2x loss-aversion statement as a model/empirical estimate, not a universal constant.
2. Bind disposition-effect statements to primary literature and avoid population-to-individual overgeneralization.
3. Separate MAE/MFE measurement definitions from strategy-specific stop/target calibration claims.
4. Label `GER soft-stop`, `breakout-flatten`, `time-stop` and `regime-gate` as internal implementation patterns unless independent evidence exists.
5. Add an explicit evidence boundary between behavioral research, trading methodology and BitEvo/Arena implementation.
6. Recompare the cleaned bodies and machine metadata; only then select `canonicalSlug` and mark the other route `SUPERSEDED` or retain both with distinct scopes.

## Evidence references

- Kahneman, D. & Tversky, A. (1979). *Prospect Theory: An Analysis of Decision under Risk*. Econometrica 47, 263–291. DOI `10.2307/1914185`.
- Tversky, A. & Kahneman, D. (1992). *Advances in Prospect Theory: Cumulative Representation of Uncertainty*. Journal of Risk and Uncertainty 5, 297–323. DOI `10.1007/BF00122574`.
- Shefrin, H. & Statman, M. (1985). *The Disposition to Sell Winners Too Early and Ride Losers Too Long: Theory and Evidence*. Journal of Finance 40, 777–790. DOI `10.2307/2327802`.
- Odean, T. (1998). *Are Investors Reluctant to Realize Their Losses?*. Journal of Finance 53, 1775–1798. DOI `10.1111/0022-1082.00072`.

## Boundaries

No guide deletion, redirect, canonical URL change, trading/runtime action, production deployment, billing change, merge or promotion is authorized by this review.
