# Crypto Guides — Public Content Repair Index R1

Date: 2026-08-15
State: PREVIEW_BRANCH_ONLY

This registry tracks bounded generated-public-artifact repairs. Source provenance is preserved; repair does not upgrade a route to current verified truth, production authority, security certification or trading authority.

## Last exact-head executed baseline before R9

Exact head `69a7c1d5466bbadb96f076aeb0733c2abfadebae` received a real Vercel build and READY deployment `dpl_2owrHfpqLjWrrUeTgWJCDai5G9Es`.

Executed proof:
- 166 pages / 162 guides;
- discovery/review/public-API gates PASS;
- canonical/public-contract gates PASS;
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=11`;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=11`;
- `DIRECT_GUIDE_SANITIZER_GATE=PASS routes=162 preserved=162 repaired_routes=11 forbidden_surface_hits=0 structural_holds=0`;
- deployment `READY`.

GitHub Actions on that exact head remained runner-provisioning blocked (`runner_id=0`, empty runner name, `steps=[]`), so no GitHub project code executed. Vercel is the exact-head executed build proof.

## BUILD-validated repairs — 11

### Trading / YMYL — 7
1. `funding-convergence-arbitrage` / `funding-convergence-r1`;
2. `liquidation-cascades-arbitrage` / `liquidation-cascades-r1`;
3. `bitcoin-futures-2026` / `bitcoin-futures-2026-r1`;
4. `btc-futures-trading-strategies` / `btc-futures-trading-strategies-r1`;
5. `risk-freymvork-dlya-kripto-botov` / `risk-framework-crypto-bots-r1`;
6. `pochemu-strategii-teryayut-dengi` / `strategy-failure-methodology-ru-r1`;
7. `why-90-percent-strategies-lose` / `strategy-failure-methodology-alt-r1`.

### Volatile vendor state — 3
8. `anthropic-models-and-upgrade` / `anthropic-models-vendor-state-r1`;
9. `fable-mythos-agents-2026` / `fable-mythos-vendor-state-r1`;
10. `frontier-models-cost-routing` / `frontier-cost-routing-vendor-state-r1`.

### Historical infrastructure redaction — 1
11. `fleet-coordinator-drift-monitoring` / `fleet-coordinator-public-redaction-r1`.

## Newly active R9 security source repair — exact-head BUILD pending

### `tee-agent-secrets`
- Repair ID: `tee-agent-secrets-security-r1`
- Evidence: `docs/CONTENT_REPAIR_TEE_AGENT_SECRETS_EVIDENCE_R1.md`
- Routed review/currentness: `SECURITY_SAFETY_REVIEW_REQUIRED / REVIEW_REQUIRED`
- Main boundary: keep documented enclave isolation, attestation-bound secret access and threshold/distributed-trust concepts; remove compromise-proof guarantees, fixed 2-of-3 / 500 USD / Binance policy as universal authority and unproven live signer/revocation claims.
- Exact security boundary: `This security architecture is defense in depth, not compromise-proof authority.`
- No credential generation/use, KMS/enclave/MPC deployment, signing, transaction, order, transfer or runtime authority.

## Primary security basis for R9

AWS Nitro Enclaves documentation supports:
- isolated vCPU/memory boundary from the parent;
- no persistent storage, SSH or external networking;
- signed attestation measurements;
- KMS policy conditions tied to authorized enclave measurements.

NIST threshold-cryptography sources support:
- distributed execution of cryptographic primitives;
- secret sharing / distribution of trust under a specified threshold security model.

Neither source establishes universal transaction amounts, exchange destinations, quorum settings or end-to-end behavioral correctness for an autonomous agent.

## Aggregate repair/sanitizer architecture

`src/data/public-guide-repair-registry.mjs` is the single aggregate registry consumed by public-repair and direct-guide-sanitizer apply/verify stages.

After R9 source changes the registry contains 12 repairs:
- 7 trading/YMYL;
- 3 volatile vendor-state;
- 1 historical infrastructure redaction;
- 1 security/safety architecture repair.

The next exact-head build must prove:
- `PUBLIC_GUIDE_REPAIR_APPLY_SUMMARY=PASS repairs=12`;
- route-specific `tee-agent-secrets` repair PASS;
- `PUBLIC_GUIDE_REPAIR_GATE_SUMMARY=PASS repairs=12`;
- sanitizer `repaired_routes=12` with zero forbidden-surface hits and zero structural holds;
- all existing canonical/public-contract gates remain green.

## Invariants

- no route deletion or redirect;
- no merge or production promotion;
- no credential/key generation, rotation or use;
- no enclave/KMS/MPC deployment;
- no transaction/order/signature effect;
- no runtime/DNS/firewall/scheduler mutation;
- no billing/provider mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
