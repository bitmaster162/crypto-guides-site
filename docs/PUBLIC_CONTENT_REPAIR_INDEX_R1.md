# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks bounded generated-public-artifact repairs. Source provenance is preserved; repair does not upgrade a route to current verified truth, production authority or trading authority.

## Last exact-head executed baseline before R8

Exact head `3ec57de8aba28a1ac173641f1237f37f03c5f8e6` received a real Vercel build and READY deployment `dpl_Dki1tEviaYTnmq1a6RBdA5L7QZYg`.

Executed proof on that head:
- 166 pages / 162 guides;
- discovery/review/public-API gates PASS;
- canonical/public-contract gates PASS;
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=9`;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=9`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=9 forbidden_surface_hits=0 structural_holds=0`;
- deployment `READY`.

GitHub Actions on that head remained runner-provisioning blocked (`runner_id=0`, empty runner name, `steps=[]`), so GitHub project code did not execute. Vercel is the exact-head executed build proof.

## BUILD-validated repairs — 9

### Trading / YMYL — 5
1. `funding-convergence-arbitrage` / `funding-convergence-r1`;
2. `liquidation-cascades-arbitrage` / `liquidation-cascades-r1`;
3. `bitcoin-futures-2026` / `bitcoin-futures-2026-r1`;
4. `btc-futures-trading-strategies` / `btc-futures-trading-strategies-r1`;
5. `risk-freymvork-dlya-kripto-botov` / `risk-framework-crypto-bots-r1`.

### Volatile vendor state — 3
6. `anthropic-models-and-upgrade` / `anthropic-models-vendor-state-r1`;
7. `fable-mythos-agents-2026` / `fable-mythos-vendor-state-r1`;
8. `frontier-models-cost-routing` / `frontier-cost-routing-vendor-state-r1`.

### Historical infrastructure redaction — 1
9. `fleet-coordinator-drift-monitoring` / `fleet-coordinator-public-redaction-r1`.

## Newly active R8 source repairs — exact-head BUILD pending

### `pochemu-strategii-teryayut-dengi`
- Repair ID: `strategy-failure-methodology-ru-r1`
- Evidence: `docs/CONTENT_REPAIR_STRATEGY_FAILURE_EVIDENCE_R1.md`
- Routed review/currentness: `YMYL_TRADING_REVIEW_REQUIRED / REVIEW_REQUIRED`
- Main boundary: keep expectancy-after-costs, payoff geometry, wiring/ablation and OOS methodology; remove unbound Arena counters/performance proof and universal validation thresholds.

### `why-90-percent-strategies-lose`
- Repair ID: `strategy-failure-methodology-alt-r1`
- Evidence: same R8 evidence document
- Routed review/currentness: `YMYL_TRADING_REVIEW_REQUIRED / REVIEW_REQUIRED`
- Same methodological boundary; route remains addressable with no redirect/delete.

The restored fixed `66k` / `90%` / 150+ / survivor-count style claims are not replaced with invented newer numbers. A fresh Sovereign Arena homepage readback currently exposes different live-looking counters, while the repository-local `/sovereign-arena-dataset` page is a hard-coded research snapshot rather than an independently bound raw dataset receipt. Therefore the public repair removes headline counters from empirical authority until reproducible provenance exists.

## Review-routing repair in R8

`pochemu-strategii-teryayut-dengi` was semantically trading/YMYL but did not reliably match the slug-based trading rule. R8 explicitly adds that slug to the conservative trading-YMYL rule so both equivalent strategy-failure pages route consistently.

The public-repair verifier is also upgraded to verify the **final generated public API review record** rather than requiring every repaired route to have an explicit override. This makes rule-routed and override-routed review states first-class and testable through the same final contract.

## Aggregate repair/sanitizer architecture

`src/data/public-guide-repair-registry.mjs` is the single aggregate registry consumed by:
- public repair apply;
- public repair verification;
- direct-guide sanitizer apply;
- direct-guide sanitizer verification.

After R8 source changes the registry contains 11 repairs:
- 7 trading/YMYL;
- 3 volatile vendor-state;
- 1 historical infrastructure redaction.

The next exact-head build must prove:
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=11`;
- route-specific PASS for both strategy-failure repairs;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=11`;
- sanitizer `repaired_routes=11` with zero forbidden-surface hits and zero structural holds;
- existing canonical/public-contract gates remain green.

## Evidence hierarchy

1. exact executed build/readback evidence;
2. source-bound immutable/reproducible dataset or runtime receipts;
3. routed review metadata and primary-source claim evidence;
4. public landing-page counters and restored prose as discovery evidence only.

A changed public counter is not a dataset identity, and a source-defined static dataset page is not independently replayed provenance unless its underlying bytes/manifest are bound.

## Invariants

- no route deletion or redirect;
- no merge or production promotion;
- no invented performance replacement numbers;
- no Arena runtime/DNS/firewall/dashboard mutation;
- no billing/provider mutation;
- no credential/scheduler mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
