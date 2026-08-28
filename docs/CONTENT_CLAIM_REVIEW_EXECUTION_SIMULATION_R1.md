# Execution Simulation Claim Review R1

Status: `RESEARCH_CANDIDATE_NOT_IMPLEMENTATION_GUIDANCE`

Target route: `simulyatsiya-ispolneniya-kripto-strategiy`

Review date: 2026-08-28

## Authority boundary

This review binds the public route to a research/evaluation boundary. It does not certify an execution model, venue, latency constant, fee tier, queue model, market-impact function, framework choice, live strategy, runtime configuration, deployment plan, or capital action.

The route may explain how execution simulation can expose optimistic backtest assumptions, but it must not present historical research candidates as production implementation guidance.

## Claim dispositions

### Retain, qualified

- Partial fills, queue-position uncertainty, adverse selection, latency, fees, funding, borrow, margin, market impact and implementation shortfall are legitimate execution-simulation concerns.
- Historical replay is useful for research, but simulated orders generally cannot reconstruct their own counterfactual market impact from historical data alone.
- Queue models are assumptions that require venue/data-specific calibration; no single probability function or exponent is a universal implementation constant.
- Latency should be represented from measured path-specific observations or explicit stress distributions rather than copied as a fixed geography-wide constant.
- Venue fees, funding mechanics, margin rules and product behavior are volatile account/product state and must be read from current primary sources for the exact study scope.
- NautilusTrader, hftbacktest and similar tools may be discussed as examples. Framework availability does not prove that one architecture is universally optimal.
- Implementation shortfall, fill-rate differences, adverse-fill diagnostics and paper/live discrepancies are useful validation outputs when their definitions and measurement windows are explicit.

### Remove or rewrite

- Any statement that the route is a ready production architecture or an immediate implementation plan.
- Claims that a simulator is "maximally realistic", makes backtests "tell the truth", guarantees fidelity, or makes surviving strategies ready for live deployment.
- Fixed `order_latency=250 ms`, `feed_latency=150 ms`, universal adverse-fill windows, universal VPIN thresholds, universal queue exponents, or universal market-impact prefactors.
- Claims that the square-root law is a strict universal law for all crypto execution or that one formula is guaranteed to eliminate illusory PnL.
- Unbound infrastructure claims about validator geography, exact colocation latency, RTT, TPS, mandatory cloud-region migration or venue-wide topology.
- Timeless Binance, Bybit or Hyperliquid fee tables, rebate tiers, funding cadences or account thresholds unless rebound to dated primary evidence for the exact product/account context.
- Instructions to manufacture trading volume to reach fee tiers.
- "NautilusTrader is the absolute leader" or a mandatory instruction to port a particular hftbacktest queue model into it.
- Unbound performance/promotion claims including `WR 47%`, `AUC 0.845`, a claim that only "2–3" algorithms will survive, "true predictive power", or live readiness.

## Research-only validation standard

A defensible execution-simulation study should state:

1. immutable dataset identity and venue/product/time scope;
2. market-data granularity and known information losses;
3. explicit fill/queue assumptions and alternatives;
4. measured or stress-tested latency assumptions;
5. all-in transaction-cost assumptions from current primary sources where required;
6. model-risk checks for market impact and adverse selection;
7. train/validation/OOS separation where strategy selection is involved;
8. comparison against simpler execution baselines;
9. independent paper/live observations used to recalibrate discrepancies;
10. a separate owner authority gate for any runtime, live execution or capital effect.

A simulator PASS is evidence about a bounded research configuration, not evidence that a strategy is profitable, current, safe, deployable or authorized for live trading.

## Lifecycle disposition

After the bounded public repair and deterministic verifier pass, this route may move from `POST_R13_CONTENT_TRUTH_HOLD` to `REVIEW_DOC_BOUND` with `latestVerdict=REVIEW_DOC_BOUND_NO_CURRENTNESS_UPGRADE`.

`primarySourceRequired=true` remains. Currentness remains `REVIEW_REQUIRED`.

The remaining post-R13 HOLD routes must remain unchanged:

- `analiz-fidov-likvidatsiy-kriptovalyut`
- `kriptotreyding-i-quant-issledovaniya`
- `obzor-vsekh-torgovykh-strategiy`

This review does not resolve `LIQUIDATION_ROUTE` or `REMOVE_UNSUPPORTED`, and it creates no runtime, trading or capital authority.
