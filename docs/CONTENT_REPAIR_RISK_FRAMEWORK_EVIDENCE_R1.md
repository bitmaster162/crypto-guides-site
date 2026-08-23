# Trading bot risk framework public repair evidence R1

Date: 2026-08-15
Scope: `risk-freymvork-dlya-kripto-botov`
State: `SOURCE_REPAIR_APPLIED_EXACT_HEAD_BUILD_REVERIFY_PENDING`
Review status: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness: `HISTORICAL_REVERIFY_REQUIRED`
Repair ID: `risk-framework-crypto-bots-r1`

The implementation hold is cleared: the four earlier public repairs and the global direct-guide sanitizer have received executed exact-head Vercel proof. This document now binds the final bounded repair in the originally prioritized five-route trading/YMYL cluster. The new Risk Framework repair remains source-only until a fresh exact-head build executes after this change.

## Core disposition

The restored route combines legitimate quantitative-risk and systems-engineering concepts with universal-looking thresholds, unsourced institutional-practice claims and implementation language that reads as if one architecture were mandatory for HFT fleets.

The public repair preserves concepts as research material while explicitly rejecting the false equivalence between:
- a published method and a validated implementation;
- an example threshold and an industry standard;
- a low-latency technology and a universally required architecture;
- a proposed recovery protocol and proven production safety.

## Primary/research anchors rechecked 2026-08-15

### Conditional Drawdown at Risk

Primary research:
- `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=223323`

Chekhlov, Uryasev and Zabarankin introduce Conditional Drawdown-at-Risk as a family of risk measures based on the portfolio drawdown/underwater curve. The existence of CDaR supports retaining drawdown-tail risk as a research concept. It does not establish any particular percentage as a universal risk limit.

### Covariance shrinkage

Primary author source:
- `https://ledoit.net/honey_abstract.htm`

Ledoit and Wolf describe shrinkage of the sample covariance matrix as an estimator intended to reduce estimation error in portfolio optimization. This supports retaining covariance shrinkage as a method. It does not validate a fixed lookback, asset universe or position-sizing rule for the restored guide.

### VPIN / flow toxicity — research plus material disagreement

Research sources:
- `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1748633`
- `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1881731`

Easley, López de Prado and O'Hara describe VPIN as a measure of order-flow toxicity/adverse-selection risk. Andersen and Bondarenko report materially different empirical conclusions about its predictive interpretation around the Flash Crash and short-run volatility.

Disposition: VPIN may remain as a research family to investigate, but the public guide must not present it as an uncontested universal risk veto or predictive signal.

### Aeron as an engineering option

Official documentation:
- `https://aeron.io/docs/aeron/overview/`

Aeron documents ordered log-buffer replication across process/network boundaries and IPC/UDP transport with a low/predictable-latency design goal. This supports naming Aeron as one low-latency messaging/IPC option. It does not establish that Aeron, shared memory or a particular ring-buffer topology is mandatory for every trading system.

## KEEP_AS_RESEARCH_CONCEPT

The following may remain when scope is explicit and no implementation/performance certification is implied:
- Conditional Drawdown at Risk / drawdown-tail risk concepts;
- covariance shrinkage, including Ledoit-Wolf-style estimators;
- realized-spread and markout decomposition;
- VPIN/order-flow-toxicity research as a contested indicator family rather than universal authority;
- event-driven recovery/hysteresis as an engineering pattern;
- shared-memory/ring-buffer/low-latency messaging technologies such as Aeron as architecture options;
- monitoring execution drift and stale state as operational-risk concepts.

The existence of these topics in research or engineering literature does not validate the restored guide's exact formulas, thresholds, latency budget, fleet size, recovery sequence or runtime implementation.

## INTERNAL_HEURISTIC / REVERIFY

The restored route contains universal-looking daily/weekly/monthly/total drawdown bands, a fixed count of shadow/virtual trades for restart, a fixed graduated re-entry ladder, a hard-coded microsecond stale-state threshold, fixed coverage/execution-drift gates and a fleet-size boundary.

These values are not established here as universal current facts. They may be retained only in a separately scoped implementation-specific evidence set, not as public industry requirements.

## REMOVE_OR_REWRITE

The public copy removes or materially qualifies claims that:
- a named threshold is the institutional standard for 2026;
- “top firms”, “market makers”, “advanced funds” or the industry as a whole have moved to one specific control architecture without high-grade evidence;
- a static hysteresis is a fundamental vulnerability in all systems;
- one IPC stack is necessary for survival or is the only valid kill-switch architecture;
- every fleet above one bot-count boundary requires the same topology;
- nanosecond/microsecond precision is a universal safety requirement independent of strategy horizon and venue;
- a fixed number of shadow trades proves recovery of statistical edge;
- a positive IC or several profitable windows is sufficient by itself to authorize a live restart;
- a framework is production-safe merely because it is described in prose.

## Implementation-status boundary

The repaired route must not imply, without separate source/runtime evidence, that:
- the described risk engine exists in deployed code;
- every order passes through the described risk gate;
- a global kill-switch is wired to live execution;
- Aeron/shared-memory state replication is deployed;
- paper/shadow execution matches live fills or queue position;
- self-throttle, re-entry or fleet-wide transitions are operational;
- latency targets were measured on a named environment;
- the architecture has been load-tested, fault-injected or production-qualified.

Specification is not implementation. Implementation is not production qualification.

## Required public risk framing

Control thresholds depend on at least:
- strategy horizon and order rate;
- venue/API semantics;
- portfolio leverage and concentration;
- liquidity and market-impact regime;
- execution architecture and network topology;
- measured latency and stale-state distribution;
- failure modes and recovery-time objectives;
- model uncertainty and out-of-sample performance;
- capital/risk budget and operator governance.

A deterministic control may be preferable to an LLM for hard risk gates, but the actual threshold still requires system-specific measurement and validation.

## Deterministic repair gate

The generated repaired HTML must fail verification if it contains the legacy hard-coded microsecond threshold, the fixed universal restart-trade count, the fixed staged re-entry percentage sequence, the universal fleet-size boundary, universal drawdown bands, “2026 institutional standard”, mandatory-Aeron language or an unproven deployed-risk-engine claim.

The gate also requires:
- `YMYL_TRADING_REVIEW_REQUIRED`;
- `HISTORICAL_REVERIFY_REQUIRED`;
- explicit research-vs-implementation separation;
- explicit non-execution/non-trading-authority copy;
- shared `delta-neutral` risk qualification;
- the cited research/engineering source markers.

## Evidence ladder after this source change

- Evidence: READY.
- Public repair source: APPLIED ON DRAFT BRANCH.
- Exact-head BUILD for this repair: PENDING.
- Deployment/readback for this repair: PENDING.
- Production effect: NONE.

No BUILD PASS may be claimed for `risk-framework-crypto-bots-r1` until an exact-head executor emits both the route-specific `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` receipts plus the sanitizer/public-contract gates.

## Governance

- Public repair applied in source: **yes, draft branch only**.
- Route deletion: **no**.
- Redirect: **no**.
- Merge authorization: **no**.
- Production promotion authorization: **no**.
- Billing mutation: **no**.
- Runtime mutation: **no**.
- Trading effect: **none**.
- `can_trade=false`.
- `capital_permission=DENY`.
