# Crypto Guides — Anthropic Vendor-State Evidence R1

Date: 2026-08-15
Status: SOURCE_REPAIRS_APPLIED_EXACT_HEAD_BUILD_REVERIFY_PENDING
Scope:
- `anthropic-models-and-upgrade`
- `fable-mythos-agents-2026`

Repair IDs:
- `anthropic-models-vendor-state-r1`
- `fable-mythos-vendor-state-r1`

Review status for both routes remains `VOLATILE_VENDOR_STATE`.
Currentness remains `REVERIFY_REQUIRED`.
No production, vendor-selection, billing, runtime or trading effect is authorized.

## Why repair is required

The restored vendor-state narrative contained present-tense claims tied to a short-lived June 2026 snapshot:
- Fable 5 / Mythos 5 availability described as unstable;
- Opus 4.8 framed as the durable current public Anthropic default/frontier choice;
- static model pricing and upgrade recommendations bound to that snapshot;
- a model inventory that omitted later releases.

Fresh official Anthropic evidence materially changes those claims. The public repair therefore converts vendor-state assertions into dated facts and leaves inherently volatile fields under `REVERIFY_REQUIRED` rather than replacing one brittle snapshot with another.

## Fresh primary-vendor evidence rechecked 2026-08-15

### Fable 5 / Mythos 5 timeline

Official Anthropic sources:
- `https://www.anthropic.com/news/claude-fable-5-mythos-5`
- `https://www.anthropic.com/news/fable-mythos-access`
- `https://www.anthropic.com/news/redeploying-fable-5`
- `https://www.anthropic.com/news/fable-safeguards-jailbreak-framework`
- `https://www.anthropic.com/claude/fable`
- `https://www.anthropic.com/claude/mythos`

Bounded facts:
- 2026-06-09: Anthropic announced Claude Fable 5 and Claude Mythos 5.
- 2026-06-12: Anthropic suspended access after a US-government export-control directive.
- 2026-06-30: Anthropic announced that the export controls had been lifted and that Fable 5 would return globally on July 1.
- 2026-07-01: Anthropic's updates state that access to Fable 5 and Mythos 5 was restored.
- 2026-07-02: Anthropic stated that Fable 5 had been re-deployed and was globally available.

Disposition: the June suspension is retainable as a dated historical event. An undated present-tense statement that Fable 5 is unavailable or generally unstable is stale.

### Fable / Mythos relationship and access scope

Anthropic states that Fable 5 and Mythos 5 share the same underlying model with different safeguard/access profiles. Fable is designed for broader use with safeguards; Mythos access is more restricted and tied to trusted/research programs where specified safeguards may be lifted.

Disposition: the model relationship is source-supported, but exact trusted-access eligibility and provider/plan distribution remain volatile and must be reverified before operational use.

### Sonnet 5 changes the model inventory

Official source:
- `https://www.anthropic.com/news/claude-sonnet-5`

Anthropic announced Claude Sonnet 5 on 2026-06-30 and documented API identifier `claude-sonnet-5` in that announcement. Therefore a current-model inventory limited to Sonnet 4.6 and Opus 4.8 is incomplete as of that date.

Disposition: the repair does not substitute a new permanent ranking. It removes durable `best/current/default` framing and requires task-specific, dated revalidation.

## Pricing / plans / provider state

Official announcements contain dated prices and plan/distribution statements, including time-bounded introductory pricing for Sonnet 5 and rollout/usage-policy details for Fable 5.

Those fields are intentionally not promoted into a static public pricing table in the bounded repair because:
- the Sonnet 5 announcement itself includes a scheduled pricing transition;
- Fable subscription inclusion/usage-credit rules have changed during rollout;
- cloud-provider and trusted-access distribution can change independently of model capability.

Exact current pricing, plan inclusion, rate limits, context/output limits, API identifiers and cloud-provider availability must be checked against current Anthropic documentation at the time of use.

## Claim-level decisions

### KEEP, but date and source
- June 9 launch of Fable 5 / Mythos 5;
- June 12 suspension;
- June 30 lifting of export controls;
- July 1 restoration;
- Fable/Mythos underlying-model relationship with different safeguard/access profiles;
- June 30 Sonnet 5 announcement and its dated API identifier.

### REMOVE_OR_REWRITE
- `availability is unstable` as an undated current state;
- `Fable 5 is unavailable` as present-tense current truth after restoration;
- Opus 4.8 as permanent default/best/current Anthropic authority;
- a complete-current-lineup claim omitting Sonnet 5;
- static token prices presented as durable billing authority;
- upgrade/routing recommendations whose premise depends on the stale June snapshot.

### REVERIFY on each operational use
- exact current API model identifiers;
- exact context/output limits;
- exact token/caching/batch pricing;
- plan inclusion and usage-credit policy;
- cloud-provider availability;
- rate limits;
- benchmark comparisons and methodology;
- latency/routing recommendations;
- Mythos trusted-access eligibility and safeguards.

## Public repair contract

Both generated pages must:
1. retain `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`;
2. present the suspension/restoration as a dated timeline;
3. avoid undated `best/current/default` model rankings;
4. avoid static pricing as current billing authority;
5. distinguish capability, safeguard profile and access authority;
6. state exactly: `This vendor snapshot is dated, not durable authority.`;
7. preserve routes with no redirect/delete;
8. expose no restored MemIR / Executable Parameters surfaces after the global sanitizer.

## Evidence ladder after this source change

- Evidence: READY.
- Two public repairs: APPLIED IN SOURCE ON DRAFT BRANCH.
- Exact-head BUILD for the new vendor repairs: PENDING.
- Deployment/readback: PENDING.
- Production effect: NONE.

No BUILD PASS may be claimed for either vendor repair until an exact-head executor emits their route-specific `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` receipts plus the sanitizer/public-contract gates.

## Governance

- no merge;
- no production promotion;
- no billing/plan change;
- no vendor/model selection authority;
- no credential/API-key mutation;
- no runtime effect;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
