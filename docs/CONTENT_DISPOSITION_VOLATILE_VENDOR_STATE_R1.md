# Crypto Guides — Volatile Vendor-State Disposition R1

Status: SOURCE REVIEW / NO PRODUCTION EFFECT

Scope: restored routes whose current repository authority classifies them as `VOLATILE_VENDOR_STATE / REVERIFY_REQUIRED`.

Routes:

- `anthropic-models-and-upgrade`
- `fable-mythos-agents-2026`
- `frontier-models-cost-routing`

This is a currentness disposition, not a fresh external vendor fact check. It does not silently replace restored article content with model knowledge or web research.

## Why these routes require a separate boundary

Vendor/model state is intrinsically time-sensitive. A restored article can contain model names, availability, pricing, context limits, routing choices, API behavior, benchmark claims, upgrade paths, product tiers or feature descriptions that were accurate at publication time and later changed.

Repository presence therefore establishes historical publication only. It does not establish present vendor state.

## Required interpretation

For all three routes:

- `reviewStatus = VOLATILE_VENDOR_STATE`;
- `currentness = REVERIFY_REQUIRED`;
- model/product availability must be checked against current primary vendor authority before current use;
- pricing, limits, feature availability, API behavior and plan/tier descriptions must be treated as dated unless a current receipt is attached;
- comparative quality/cost/routing recommendations remain historical analysis unless their underlying measurements are reproduced on a current evidence set;
- no historical recommendation should be interpreted as a current deployment, procurement, billing, production, or vendor-selection instruction.

## Route-specific disposition

### `anthropic-models-and-upgrade`

Decision: `HISTORICAL_VENDOR_RESEARCH / REVERIFY_BEFORE_CURRENT_USE`.

The route may remain as historical model/upgrade research, but any present-tense model availability, capability, pricing, limit, API or upgrade-path statement requires fresh primary-vendor verification.

### `fable-mythos-agents-2026`

Decision: `HISTORICAL_VENDOR_OR_PROJECT_STATE / REVERIFY_BEFORE_CURRENT_USE`.

The route may remain as restored research. Any claim that a named model/agent/product is currently available, supported, integrated, production-ready or superior requires fresh evidence from the relevant current authority.

### `frontier-models-cost-routing`

Decision: `HISTORICAL_COST_ROUTING_RESEARCH / REVERIFY_BEFORE_CURRENT_USE`.

Historical cost/routing matrices are not current billing authority. Prices, quotas, model identifiers, latency/quality comparisons and plan availability require fresh provider evidence and, for comparative recommendations, a current measurement methodology.

## Shared contract

1. publication != current vendor state;
2. historical price != current price;
3. historical model identifier != current availability;
4. historical benchmark/routing result != current comparative performance;
5. restored API behavior != current supported API contract;
6. no billing, plan upgrade, deployment, production, credential or external-effect authorization is implied.

## Governance

- no guide deletion or redirect;
- no merge or production promotion;
- no billing/plan mutation;
- no vendor purchase or subscription change;
- no credential/API-key mutation;
- no runtime/deployment effect;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
