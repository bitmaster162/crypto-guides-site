# CONTENT_REPAIR_REGIME_TIMING_EVIDENCE_R1

State: `EVIDENCE_BOUND_PUBLIC_REPAIR_R13`
Route: `regime-timing-30-120-min`
Review target: `YMYL_TRADING_REVIEW_REQUIRED / REVIEW_REQUIRED`, `ymyl=true`
Checked: 2026-08-15

## Purpose

Demote a restored fixed trading-timing rule from current public authority to a testable research hypothesis. Preserve the useful idea that regime age may be an explanatory feature while requiring dataset identity, sample support, costs, multiple-testing controls and out-of-sample validation before any numeric timing window can be treated as an edge.

## Restored source claim

The restored route currently states:

- title: `Тайминг регима: входить через 30-120 минут после смены тренда`;
- `0-30 мин ... exp +$4.11`;
- `30-120 мин: exp +$14.88` and labels this the best window;
- `2-6 ч ... exp −$2.93` and labels it a dead zone;
- `6h+ = +$9.25` in the agent summary;
- practical instruction: enter in the 30-120 minute window and avoid the 2-6 hour window;
- provenance statement: `Проверено на публичных логах Sovereign Arena.`

The route does not bind those figures to a reproducible dataset identifier/hash, sample count per timing bucket, exact regime-label definition, trial count, fee/slippage model, confidence interval, pre-registration, or independent out-of-sample split.

Source: repository route `regime-timing-30-120-min` in `src/pages/guides/[slug].astro`.

## Research basis for the disposition

### 1. Selecting the best backtest bucket creates selection risk

Bailey, Borwein, López de Prado and Zhu show that choosing among alternative backtest configurations can produce an overfit winner and propose Probability of Backtest Overfitting / combinatorially symmetric cross-validation as a way to quantify that risk.

Source:
- https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253

### 2. Reported performance must be corrected for multiple trials and non-normality

Bailey and López de Prado's Deflated Sharpe Ratio addresses selection bias under multiple testing and non-normal returns. A best-performing timing bucket cannot be promoted merely because its in-sample mean PnL is largest.

Source:
- https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551

### 3. Trading-strategy backtests require explicit multiple-testing treatment

Harvey and Liu describe the need to haircut historical strategy performance when multiple tests/data mining are involved and propose statistical hurdles for reported strategy performance.

Source:
- https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2345489

### 4. Regime information can be useful, but regime boundaries are model/data dependent

Research on online change-point detection demonstrates that regime information can improve predictions in some market-microstructure settings. That supports treating regime age as a feature worth testing; it does not establish a universal 30-120 minute crypto entry window.

Source:
- https://arxiv.org/abs/2307.02375

## Public disposition

Keep:

- regime-change timestamp / regime age as a candidate explanatory feature;
- explicit regime-definition versioning;
- time-bucket analysis as exploratory research;
- pre-specified or nested validation of candidate timing buckets;
- costs, slippage and execution assumptions;
- out-of-sample / walk-forward evaluation;
- uncertainty estimates and sample counts per bucket;
- multiple-testing / selection-bias controls;
- abstention when the timing feature lacks current evidence.

Do not publish as current actionable authority:

- `30-120 minutes` as a universal entry window;
- `2-6 hours` as a universal no-entry/dead zone;
- the historical `+$4.11`, `+$14.88`, `−$2.93`, `+$9.25` figures as transferable expectancy;
- `sweet_min=30` / `sweet_max=120` as executable constants;
- a claim that unnamed public logs alone validate the timing rule;
- a claim that one regime detector (moving averages, ADX, 24h return, etc.) shares the same timing profile as another.

## Minimum evidence package before promoting a numeric timing window

1. immutable dataset ID/hash, observation period, venue/instrument universe and data-cleaning rules;
2. exact regime-state definition and timestamp semantics, including look-ahead protection;
3. sample/trade counts and exposure per timing bucket;
4. gross and net-of-cost return/expectancy distributions, not only means;
5. confidence intervals/bootstrap or equivalent uncertainty estimates;
6. complete trial ledger for tested bucket boundaries, regime definitions and filters;
7. multiple-testing / backtest-overfitting control;
8. independent out-of-sample or walk-forward evidence;
9. stability across materially different periods/market regimes and sensitivity to nearby bucket boundaries;
10. no automatic trading promotion: any operational use requires a separate current trading/risk authorization.

## Replacement public contract

`30–120 minutes is a research hypothesis, not a universal entry window.`

The repaired public page teaches how to validate whether regime age has incremental predictive value. It does not prescribe an entry time, position, leverage, order, or capital allocation.

## Authority boundary

This evidence review authorizes only a bounded public-copy and metadata repair on the draft branch. It does not authorize exchange/API actions, signals, alerts, orders, position changes, trading-system parameter changes, runtime deployment or capital use.

`can_trade=false`
`capital_permission=DENY`
