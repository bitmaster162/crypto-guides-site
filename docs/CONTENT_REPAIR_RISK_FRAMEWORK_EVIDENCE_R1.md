# Trading bot risk framework public repair evidence R1

Date: 2026-08-14
Scope: `risk-freymvork-dlya-kripto-botov`
State: `EVIDENCE_READY_PUBLIC_REPAIR_NOT_APPLIED`
Review status: `YMYL_TRADING_REVIEW_REQUIRED`
Currentness: `HISTORICAL_REVERIFY_REQUIRED`

This document prepares a later bounded public-copy repair. It does not activate a new post-build rewrite while the already implemented `funding-convergence-r1` repair remains without an executed full-build proof.

## Core disposition

The restored route combines legitimate quantitative-risk and systems-engineering concepts with universal-looking thresholds, unsourced institutional-practice claims and implementation language that reads as if one architecture were mandatory for HFT fleets in 2026.

The public repair should preserve concepts as research material while removing the false equivalence between:
- a published method and a validated implementation;
- an example threshold and an industry standard;
- a low-latency technology and a universally required architecture;
- a proposed recovery protocol and proven production safety.

## KEEP_AS_RESEARCH_CONCEPT

The following may remain as research topics when their scope is explicit and no implementation or performance certification is implied:
- Conditional Drawdown at Risk / drawdown-tail risk concepts;
- covariance shrinkage, including Ledoit-Wolf-style estimators;
- realized-spread and markout decomposition;
- VPIN/order-flow-toxicity research as one family of market-microstructure indicators;
- event-driven recovery/hysteresis as an engineering pattern;
- shared-memory/ring-buffer/low-latency messaging technologies such as Aeron as architecture options;
- monitoring execution drift and stale state as operational-risk concepts.

The existence of these topics in research or engineering literature does not validate the restored guide's exact formulas, thresholds, latency budget, fleet size, recovery sequence or runtime implementation.

## INTERNAL_HEURISTIC / REVERIFY

The restored route contains or endorses values and sequences including:
- daily drawdown ranges around `3–5%`;
- weekly drawdown ranges around `6–8%`;
- monthly drawdown ranges around `10–12%`;
- total drawdown ranges around `15–20%`;
- `30` profitable/qualifying virtual trades as a re-entry gate;
- fixed graduated re-entry steps such as `25%`, `50%`, `75%`, `100%`;
- `20–50 microseconds` as a stale-position/risk-gate threshold;
- fixed depth/coverage and execution-drift thresholds;
- fixed reduction percentages, percentile gates, waiting windows and hysteresis intervals;
- `100+ bots` as an architecture boundary.

These values are not established here as universal current facts. They may be retained only as explicitly labelled examples, historical internal hypotheses or strategy/system-specific parameters supported by an implementation-specific evidence set.

## REMOVE_OR_REWRITE

The future public copy must remove or materially qualify claims such as:
- a named threshold is the institutional standard for 2026;
- “top firms”, “market makers”, “advanced funds” or the industry as a whole have moved to one specific control architecture without high-grade current evidence;
- a static hysteresis is a “fundamental vulnerability” in all systems;
- a particular IPC stack is necessary for survival or is the only valid way to implement a kill-switch;
- every fleet above a particular bot count requires the same topology;
- nanosecond/microsecond latency precision is a universal safety requirement independent of strategy horizon and venue;
- a fixed number of shadow trades proves the recovery of statistical edge;
- a positive Information Coefficient or several profitable windows is sufficient by itself to authorize a live restart;
- one control framework is proven production-safe merely because it is described in prose.

## Implementation-status boundary

The public route must not imply any of the following without separate source/runtime evidence:
- the described risk engine exists in deployed code;
- every order passes through the described risk gate;
- a global kill-switch is wired to live execution;
- Aeron/shared-memory state replication is deployed;
- paper/shadow execution matches live fills or queue position;
- self-throttle, re-entry or fleet-wide mode transitions are operational;
- latency targets were measured on a named environment;
- the architecture has been load-tested, fault-injected or production-qualified.

Specification is not implementation. Implementation is not production qualification.

## Required public risk framing

A repaired article should explain that control thresholds depend on at least:
- strategy horizon and order rate;
- venue/API semantics;
- portfolio leverage and concentration;
- liquidity and market-impact regime;
- execution architecture and network topology;
- measured latency and stale-state distribution;
- failure modes and recovery time objectives;
- model uncertainty and out-of-sample performance;
- capital/risk budget and operator governance.

A deterministic control may be preferable to an LLM for hard risk gates, but the actual threshold still requires system-specific measurement and validation.

## Future deterministic repair gate

Do not implement this public rewrite until the existing funding repair receives an executed full-build proof.

When implementation resumes, the route gate should fail if generated public HTML presents any of the following as current universal/production-qualified guidance:
- `20–50 microseconds`;
- `30` virtual trades as a universal live-restart gate;
- fixed `25/50/75/100%` re-entry as an industry requirement;
- universal DD percentages;
- “2026 institutional standard” or equivalent authority language;
- claims that one named IPC technology is mandatory;
- claims that the described runtime/risk engine is deployed without an implementation receipt.

The gate must require:
- `YMYL_TRADING_REVIEW_REQUIRED`;
- `HISTORICAL_REVERIFY_REQUIRED` until relevant claims are separately upgraded;
- explicit research-vs-implementation separation;
- explicit non-execution/non-trading-authority copy.

## Governance

- Public repair applied: **no**.
- Route deletion: **no**.
- Redirect: **no**.
- Merge authorization: **no**.
- Production promotion authorization: **no**.
- Billing mutation: **no**.
- Runtime mutation: **no**.
- Trading effect: **none**.
- `can_trade=false`.
- `capital_permission=DENY`.
