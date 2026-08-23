# Crypto Guides Site

Crypto Guides is an Astro-based public research library for restored crypto, trading, AI, infrastructure and governance guides. The repository is intentionally **review-first**: publication of a restored route does not by itself mean that every historical fact, numeric threshold, venue detail, implementation parameter or recommendation is current.

This README is the operator contract for the repository. It describes what the project exposes, how the build is validated, and which boundaries must not be inferred from source presence alone.

## Current operating model

The site exposes three distinct public surfaces:

- `/guides` — human-facing guide discovery/index;
- `/guides/<slug>` — direct restored guide pages with a shared truth/review boundary;
- `/api/public-guides.json` — reviewed metadata API intended as the canonical machine-readable public contract.

Legacy `/api/guides` compatibility output may exist, but it is not the canonical authority for reviewed machine ingestion.

The restored corpus is deliberately conservative. Review metadata can mark routes as historical, stale, volatile, YMYL/trading review required, implementation review required, redundant revision pairs, or other bounded states. A public URL is not equivalent to `CURRENT_VERIFIED`.

## Evidence and currentness contract

For every guide, operators should keep these concepts separate:

1. **SOURCE** — what is present in the repository and its review metadata;
2. **BUILD** — whether generation and verification scripts actually executed successfully for the exact source revision;
3. **DEPLOYMENT** — whether that exact revision produced a deployment;
4. **READBACK** — whether the deployed output was independently fetched and matched the intended contract;
5. **PRODUCTION** — whether that exact verified deployment was explicitly promoted to production.

Do not infer later stages from earlier ones. In particular:

- source presence is not build evidence;
- a failed CI job with no runner/steps is not a code-test failure;
- a READY preview is not automatically production;
- historical content is not current operational or trading authority;
- canonical selection inside a revision pair does not upgrade unresolved claims to current verified guidance.

## Review and provenance data

Key review/provenance sources live under `src/data/` and `docs/`.

Important current mechanisms include:

- `src/data/public-review-overrides.json` — explicit route-level review/currentness decisions;
- `src/data/canonical-switch-plan.json` — reviewed canonical/superseded revision-pair plan;
- `src/data/public-guide-repairs.mjs` — bounded public-copy repairs whose output must still be build-verified;
- `docs/PUBLIC_CONTENT_REPAIR_INDEX_R1.md` — repair queue and evidence state;
- `docs/DIRECT_GUIDE_EXECUTABLE_SURFACE_AUDIT_R1.md` — audit of executable-looking metadata on direct guide pages;
- claim/evidence review documents in `docs/` — source-backed dispositions for high-risk or stale material.

## Build pipeline

Requires Node.js `>=22.12.0`.

Install dependencies:

```sh
npm ci
```

Run development server:

```sh
npm run dev
```

Run the complete release-quality build:

```sh
npm run build
```

`npm run build` is not a plain Astro build. The current pipeline performs:

1. build metadata generation;
2. Astro static build;
3. discovery generation;
4. review-status application;
5. canonical public API generation;
6. bounded public guide repairs;
7. public-contract verification;
8. canonical-switch-plan verification;
9. public-guide-repair verification.

Relevant scripts from `package.json`:

```text
generate:build-meta
generate:discovery
apply:review-status
generate:public-api
apply:public-guide-repairs
build:site
verify:public
verify:canonical-plan
verify:public-guide-repairs
build
```

A source-defined verifier or repair is **not PASS evidence** until the exact revision actually executes it successfully.

## Repository structure

```text
.github/      GitHub workflow configuration
docs/         claim reviews, dispositions, lineage decisions and repair evidence
public/       static public assets
scripts/      build, generation and deterministic verification scripts
src/
  components/ shared truth/review UI
  data/       review, canonical and repair metadata
  layouts/    shared page shell
  pages/      Astro routes and restored guide corpus
vercel.json   Vercel project configuration
```

## Canonical revision pairs

When two restored routes represent revisions of the same guide, the project may select one as `CANONICAL` and preserve the other as `SUPERSEDED_HISTORICAL_REVISION`.

Current policy for reviewed revision pairs is provenance-preserving:

- preserve both routes;
- do not delete historical revisions merely because a canonical route is selected;
- do not silently redirect unless a separately reviewed route policy explicitly authorizes it;
- keep unresolved numeric/method/currentness claims bounded by their own review status.

## Public-guide repair policy

Some restored guides contain stale, overclaimed, executable-looking or operationally sensitive historical material. Repairs are intentionally bounded:

- restored source can remain as provenance;
- generated public HTML may be replaced or sanitized;
- the route keeps its conservative review/currentness status unless independent evidence supports promotion;
- repairs do not authorize trading, bot execution, order sending, transfers, runtime mutation or production deployment.

The direct-page renderer is also under explicit review because historical `MemIR` summaries, RPC endpoints, constants and similar metadata can look like active operational authority even when the reviewed public API excludes them. See `docs/DIRECT_GUIDE_EXECUTABLE_SURFACE_AUDIT_R1.md`.

## Release gates

Before merge or production promotion, require exact-revision evidence for the relevant change set:

- dependency install succeeds;
- Astro/static generation completes;
- all deterministic repository gates execute;
- no gate is inferred from source-only presence;
- exact deployment identity is bound to the Git revision;
- required public API/page readback is collected where technically available;
- remaining review blockers are explicitly accepted or resolved;
- production promotion receives a separate owner decision.

A provider quota, build-rate limit, missing runner, authentication wall or unavailable readback must be reported as its own evidence boundary rather than converted into PASS or code failure.

## Security and execution boundary

This repository is a content/research site, not a trading execution authority.

Do not treat historical RPC endpoints, host names, constants, bot descriptions, scheduler names, environment-variable names or strategy parameters in restored content as current runtime configuration.

Repository publication does not prove that referenced infrastructure is reachable, deployed, authenticated, safe or current.

No merge, production deployment, DNS/domain change, billing/plan change, credential rotation, runtime mutation or trading/capital action is implied by normal source work in this repository.

Project-wide trading/capital boundary remains:

```text
can_trade=false
capital_permission=DENY
```

## Deployment

Vercel configuration is kept in `vercel.json`. Deployment evidence must always be bound to an exact Git revision.

A preview deployment may be used for build/readback evidence, but preview readiness is not equivalent to production promotion.

## Operator checklist

Before changing public truth-sensitive content:

- identify the exact route and current review status;
- bind current primary-source evidence where the claim is time-sensitive;
- distinguish verified fact, source-backed claim, inference, internal heuristic and unknown;
- avoid universalizing venue-specific or time-specific parameters;
- update source-controlled review/repair evidence;
- run the complete deterministic build on the exact revision;
- preserve SOURCE / BUILD / DEPLOYMENT / READBACK / PRODUCTION separation in the receipt.

## Status posture

The active truth-quality work is intentionally maintained as draft/review work until exact-head build evidence is available. Do not auto-merge or auto-promote because source changes appear complete.
