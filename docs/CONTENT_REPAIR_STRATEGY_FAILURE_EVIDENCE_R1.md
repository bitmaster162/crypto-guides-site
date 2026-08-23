# Strategy Failure / Sovereign Arena Provenance Evidence R1

Date: 2026-08-15
Scope:
- `pochemu-strategii-teryayut-dengi`
- `why-90-percent-strategies-lose`

State: `SOURCE_REPAIRS_APPLIED_EXACT_HEAD_BUILD_REVERIFY_PENDING`
Repair IDs:
- `strategy-failure-methodology-ru-r1`
- `strategy-failure-methodology-alt-r1`

Review status: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness: `REVIEW_REQUIRED`

## Why repair is required

The two restored routes present a useful strategy-audit idea together with live-looking quantitative authority that is not bound to a reproducible dataset receipt in this repository.

The restored copy claims, among other things:
- `66k` / `66 000+` trades as the empirical basis;
- `90%` strategy-failure framing;
- Sovereign Arena data as proof of three universal-looking defects;
- fixed validation thresholds such as 100 trades, 10 days, 3 regimes/markets and a specific sub-50%-win-rate R:R;
- elsewhere in the same restored source family, live-looking Arena counters such as 150+ bots and a single surviving strategy from roughly 150 hypotheses;
- a raw HTTP Arena infrastructure/API link used as if it were a public evidence surface.

These claim classes require stronger provenance than a restored article or a changing landing-page counter.

## Repository-local dataset surface

`src/pages/sovereign-arena-dataset.astro` is a separate failure-inclusive research page. Its source-defined snapshot currently states:
- 29 strategy configs;
- 0 / 29 passed its strict walk-forward gate;
- median win rate 37.5%;
- median expectancy approximately -0.258R;
- 2331 forward-paper observations;
- no real-money trading claim.

The page is useful as a disclosure-oriented research snapshot, but the values are hard-coded in the page source rather than generated from a bound downloadable dataset, manifest, hash or immutable experiment receipt. It therefore does not independently prove the restored `66k` claim or the other Arena headline counters.

## Fresh Sovereign Arena production readback

Fresh read-only Vercel fetch on 2026-08-15 returned HTTP 200 for the Sovereign Arena production homepage.

The rendered page currently contains live-looking static counters and product claims, including:
- `81k+` paper trades in the headline stats;
- `157` bots live 24/7;
- `5` regime edges in the matrix;
- a service card that separately says `46 000+` trades for the Edge Ledger API;
- multiple public DuckDNS dashboard links.

Because the same rendered page contains materially different trade-count figures for different surfaces, these counters are not a substitute for a single dataset identity. They may describe different scopes, but the scope/provenance relation is not encoded strongly enough to use one of them as proof of the older `66k` article claim.

No raw immutable dataset receipt, manifest/hash binding or independently replayed experiment package was established in this review for the two restored articles.

## Claim disposition

### KEEP_AS_METHOD

The following concepts are useful and do not depend on the old headline numbers:
- expectancy must be measured after spread, fees, slippage, funding and other relevant costs;
- payoff geometry matters together with win/loss probabilities and distributions;
- a model/filter only affects the strategy if its output is actually wired into the decision path;
- ablation tests and decision traces can prove whether a component changes behavior;
- backtest, forward-paper and real-money results must be separated;
- out-of-sample / walk-forward validation and baseline comparison are appropriate evidence patterns.

### REWRITE / REMOVE AS CURRENT EMPIRICAL AUTHORITY

The bounded public copy must not retain as current proof:
- `66k`, `66 000+` or another unbound exact trade count;
- `90%` as a measured failure rate;
- a claim that the three defects are `proven on 66k live paper trades`;
- `150+ bots` or a specific current bot count;
- `one survivor from ~150 hypotheses` or similar unbound survivor statistics;
- raw IP / plain-HTTP Arena links as dataset evidence;
- fixed 100-trade / 10-day / 3-regime validation gates as universal requirements;
- a universal R:R 2.5 rule for sub-50% win rate;
- universal ticker classes described as impossible to trade solely because of nominal price;
- guaranteed-loss wording that ignores the explicit payoff/cost assumptions required for the algebra.

### ALGEBRAIC CLAIM THAT MAY BE RETAINED WITH SCOPE

If average win and average loss are equal before costs, a win probability below 50% implies negative gross expectancy. This is an algebraic statement under explicit assumptions, not evidence that any observed strategy has equal payoff magnitudes or that 50% is a universal live threshold.

## Required performance-evidence contract

Any future public claim about Arena strategy performance should bind at minimum:
- immutable dataset/export identity;
- hash/manifest or equivalent reproducible receipt;
- observation window and generation timestamp;
- venue/product/universe;
- strategy/config identity and version;
- exact inclusion/exclusion rules;
- cost model;
- separation of backtest, paper/forward and real-money observations;
- sample distribution and uncertainty;
- out-of-sample methodology;
- runtime/effect receipt when the claim depends on a running service.

A public landing-page counter is discovery evidence, not sufficient experimental provenance.

## Deterministic repair gate

Generated repaired HTML must fail if the article body contains:
- `66k` / `66 000+`;
- `90%` failure-rate framing;
- unbound 150+ bot or ~150-hypothesis survivor counts;
- raw Arena IP/API links;
- fixed universal validation thresholds or R:R 2.5 rules;
- `proven on live/paper trades` language without a bound receipt;
- guaranteed-loss wording lacking scoped assumptions.

Both repaired routes must preserve:
- `YMYL_TRADING_REVIEW_REQUIRED`;
- `REVIEW_REQUIRED`;
- explicit non-execution/non-trading-authority language;
- the shared `delta-neutral` risk qualification;
- the statement that public-copy repair is not strategy or dataset certification.

## Review-routing correction

The English-style slug already matches the trading-YMYL rule. The Russian slug `pochemu-strategii-teryayut-dengi` did not reliably match that rule despite clearly trading/YMYL content and could fall into residual content review.

The source repair therefore adds the Russian slug explicitly to the conservative trading-YMYL routing pattern so both equivalent pages have the same review class.

## Evidence ladder after source change

- Evidence: READY.
- Pair repair: APPLIED IN SOURCE ON DRAFT BRANCH.
- Exact-head BUILD: PENDING.
- Deployment/readback: PENDING.
- Production effect: NONE.

No BUILD PASS may be claimed until an exact-head executor emits both route-specific `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` receipts plus sanitizer/public-contract PASS.

## Governance

- no merge;
- no production promotion;
- no dataset falsification or invented performance replacement;
- no Arena runtime/DNS/firewall/dashboard mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
