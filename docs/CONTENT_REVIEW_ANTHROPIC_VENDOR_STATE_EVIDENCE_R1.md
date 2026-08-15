# Crypto Guides — Anthropic Vendor-State Evidence R1

Status: EVIDENCE_READY / PUBLIC_REPAIR_NOT_APPLIED / NO_PRODUCTION_EFFECT

Source baseline reviewed: `1c95c899b6e561fae9b15e3305c208b422033604`

Scope:

- `anthropic-models-and-upgrade`
- `fable-mythos-agents-2026`
- adjacent Anthropic/Fable/Mythos claims in restored vendor-state content

This document is evidence-only. It does not rewrite public guide content, deploy, change billing, select a vendor/model, or authorize production/trading behavior.

## Repository claim cluster observed

The restored `anthropic-models-and-upgrade` route currently contains present-tense vendor assertions including:

- Fable 5 / Mythos 5 availability described as unstable;
- Claude Opus 4.8 described as the most reliable and powerful public Anthropic option for current production systems;
- static per-million-token prices for Fable 5, Opus 4.8 and Sonnet 4.6;
- routing/upgrade recommendations framed against that vendor snapshot.

The restored guide source also contains Fable/Mythos export-control/current-access narrative and comparative model claims that are inherently time-sensitive.

These claims remain correctly classified by repository policy as `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED` until fresh primary-vendor evidence is attached.

## Fresh primary-vendor evidence

Primary authority reviewed: Anthropic official announcements.

### Fable 5 / Mythos 5 availability

Anthropic states that Fable 5 and Mythos 5 were initially released on 2026-06-09, access was suspended on 2026-06-12 following a U.S. government directive, and the export controls were later lifted. Anthropic's 2026-06-30 redeployment announcement states that Fable 5 would return globally on 2026-07-01 and that access to Fable 5 and Mythos 5 was restored.

Evidence anchors:

- Anthropic — `Claude Fable 5 and Claude Mythos 5` (2026-06-09, with later status updates)
- Anthropic — `Statement on the US government directive to suspend access to Fable 5 and Mythos 5` (2026-06-12)
- Anthropic — `Redeploying Fable 5` (2026-06-30; restoration effective 2026-07-01)
- Anthropic — `More details on Fable 5’s cyber safeguards and our jailbreak framework` (2026-07-02), which states Fable 5 is re-deployed and globally available

Disposition: the restored blanket/current framing that Fable 5 availability is unstable and therefore Opus 4.8 is the current default public Anthropic choice is stale as a current fact claim. Historical description of the June suspension is retainable only with dates and a restored-access update.

### Anthropic model-family currentness

Anthropic announced Claude Sonnet 5 on 2026-06-30. Therefore any route presenting Sonnet 4.6 / Opus 4.8 as the complete current Anthropic public-model frontier without acknowledging later vendor releases is an incomplete vendor snapshot.

Disposition: model-family ranking and upgrade recommendations require a dated current-model inventory before public present-tense use.

### Fable / Mythos relationship

Anthropic states that Fable 5 and Mythos 5 share the same underlying model, with Fable carrying stronger safeguards for general use and Mythos having fewer safeguards and restricted defensive-cybersecurity availability.

Disposition: this relationship is primary-source-supported, but access scope, plan availability and provider distribution remain volatile and must be dated.

## Claim-level decisions

### KEEP, but date and source

- Fable 5 and Mythos 5 share an underlying model with different safeguard/access profiles.
- The June 2026 suspension occurred.
- The suspension was later lifted and access was restored.
- Mythos access is more restricted than general Fable access.

### REWRITE before current public use

- `availability is unstable` as an undated present-tense statement;
- `Opus 4.8 is the most reliable/powerful public Anthropic option` as current vendor truth;
- current model hierarchy that omits later Anthropic releases;
- any upgrade recommendation whose premise depends on the stale availability snapshot.

### REVERIFY separately

- exact current API model identifiers;
- exact context/output limits;
- exact token pricing and caching economics;
- subscription-plan inclusion / usage-credit policy;
- cloud-provider availability;
- comparative benchmark superiority;
- latency and routing recommendations.

Static prices in restored content are not current billing authority until checked against Anthropic's current pricing/API documentation on the repair execution date.

## Public repair requirements

A future bounded public repair for these routes should:

1. convert vendor-state claims to explicitly dated facts;
2. distinguish the June 12 suspension from the July 1 restoration;
3. remove or reverify present-tense `best/current/default` model recommendations;
4. remove static pricing from current-authority framing unless bound to fresh official pricing evidence;
5. preserve architectural observations that do not depend on vendor currentness, but label them as design recommendations rather than vendor facts;
6. preserve `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED` until an exact-head build executes the repair verifier.

## Evidence ceiling

This evidence proves a currentness contradiction in the restored vendor-state narrative. It does **not** prove that every numerical/model claim in the article is wrong, nor does it establish a complete current Anthropic pricing/benchmark matrix.

No public rewrite was applied in this step.

## Governance

- source/evidence only;
- no deployment;
- no merge;
- no production promotion;
- no billing/plan change;
- no credential/API-key mutation;
- no runtime effect;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
