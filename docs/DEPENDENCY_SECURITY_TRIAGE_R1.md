# Crypto Guides — Dependency Security Triage R1

Status: SOURCE EVIDENCE / NO DEPENDENCY MUTATION / BUILD REVERIFY REQUIRED

Date: 2026-08-14 (Asia/Bangkok)

Scope: bind the externally observed `npm audit` summary (`7 vulnerabilities: 1 low, 6 high`) to the exact dependency versions currently locked by Crypto Guides, using GitHub-reviewed advisories and upstream Astro package contracts. This document does not perform an upgrade, claim exploitability, or claim a clean audit.

## Evidence boundary

The current `package-lock.json` dependency graph is shared by `main` and the active PR branch at the time of this review. The externally observed audit count is therefore relevant to the current branch dependency graph, subject to normal advisory-database drift.

GitHub Dependabot repository alerts are disabled, so this review uses the GitHub global advisory database directly rather than treating the absence of repository alerts as evidence of safety.

Do not run `npm audit fix --force` as a blind remediation. The project has a large Astro/static-generation and deterministic verification surface, and dependency changes require a fresh exact-head full build.

## Bound vulnerable packages

`npm audit` aggregates multiple advisories affecting the same package. The six high-severity dependency items are consistent with six affected package names even though some packages have more than one active advisory.

### HIGH — `astro@6.4.4`

Reviewed advisory:

- `GHSA-2pvr-wf23-7pc7` / `CVE-2026-54299`
- issue: Host-header SSRF in the prerendered error-page fetch path for affected SSR applications;
- vulnerable range: `< 6.4.6`;
- first patched version: `6.4.6`.

Applicability note: Crypto Guides is currently built as a static site rather than an established SSR runtime in this repository. Package vulnerability is proven; exploitability on the deployed static output is not proven. Upgrading off the vulnerable package remains required for dependency hygiene.

### HIGH — `js-yaml@4.2.0`

Reviewed advisories include:

- `GHSA-52cp-r559-cp3m` / `CVE-2026-59869`: quadratic CPU consumption through YAML merge-key chains; 4.x patched in `4.3.0`;
- `GHSA-5p4m-2wfm-xmqj`: quadratic CPU consumption in `!!omap` resolution; 4.x patched in `4.3.1`.

Required floor to clear both reviewed 4.x issues: `js-yaml >= 4.3.1`.

Applicability note: current project evidence does not establish a public runtime endpoint that accepts attacker-controlled YAML. The affected package/version is present; remote runtime exploitability is not proven.

### HIGH — `nanoid@3.3.12`

Reviewed advisories include:

- `GHSA-28wg-ghj8-5hjv` / `CVE-2026-67214`: non-secure generators can loop indefinitely with a negative size; 3.x patched in `3.3.16`;
- `GHSA-2v37-7h3g-55p8` / `CVE-2026-67213`: custom generators can loop indefinitely with size zero; 3.x patched in `3.3.18`.

Required floor to clear both reviewed 3.x issues: `nanoid >= 3.3.18`.

Applicability note: no direct project call site accepting attacker-controlled Nano ID sizes was established in this review. The dependency finding remains valid even though direct exploitability is unproven.

### HIGH — `postcss@8.5.15`

Reviewed advisory:

- `GHSA-r28c-9q8g-f849` / `CVE-2026-73646`;
- issue: path traversal in previous-source-map auto-loading can disclose arbitrary `.map` files under the affected processing conditions;
- vulnerable range: `<= 8.5.17`;
- first patched version for this high advisory: `8.5.18`.

A later PostCSS advisory exists after the original fix line, so choosing a target version must be based on the full current advisory set at upgrade time rather than pinning blindly to the first historical patch.

Applicability note: Crypto Guides uses PostCSS through the build toolchain; no repository evidence currently establishes an exposed runtime service processing attacker-controlled CSS. Build/tooling exposure and dependency hygiene still require remediation.

### HIGH — `sharp@0.34.5`

Reviewed advisory:

- `GHSA-f88m-g3jw-g9cj`;
- issue: inherited libvips vulnerabilities affecting consumers processing untrusted GIF/TIFF/VIPS image input;
- vulnerable range: `< 0.35.0`;
- first patched version: `0.35.0`.

Applicability note: repository search did not identify direct Sharp application code or a public image-upload/processing endpoint. Crypto Guides is a static site, so a production remote exploit path is not proven. However, the locked dependency is inside the reviewed vulnerable range.

Important compatibility boundary: the final Astro 6.x release line still declares optional `sharp: ^0.34.0`. Astro `6.4.8` therefore cannot naturally resolve to Sharp `0.35.x`. Upstream Astro `main` (7.x development/current line at review time) allows `sharp: ^0.34.0 || ^0.35.0`.

Therefore Sharp cannot be treated as a trivial lockfile-only remediation while staying on the unmodified Astro 6.x package contract.

### HIGH — `svgo@4.0.1`

Reviewed advisory:

- `GHSA-2p49-hgcm-8545` / `CVE-2026-73650`;
- issue: `removeScripts` can leave executable SVG scripts in some cases when a consumer relies on that plugin as sanitization;
- affected 4.x range: `>= 4.0.0, < 4.0.2`;
- first patched 4.x version: `4.0.2`.

Repository search did not identify direct use of `removeScripts`. The advisory itself says the plugin is disabled by default. Dependency vulnerability is present; a project-specific XSS path through that plugin is not established by this review.

### LOW — `esbuild@0.27.7`

Reviewed advisory:

- `GHSA-g7r4-m6w7-qqqr`;
- issue: Windows development server path traversal/arbitrary file read when using affected esbuild `servedir` behavior;
- vulnerable range: `>= 0.27.3, < 0.28.1`;
- first patched version: `0.28.1`.

A separate historical high-severity esbuild advisory (`GHSA-gv7w-rqvm-qjhr`) is withdrawn because the affected package was incorrectly identified. It must not be counted as an active Crypto Guides high-severity issue.

Applicability note: the active low advisory is Windows/dev-server specific. Production static output exploitability is not established, but development hosts should not expose an affected esbuild serve surface.

## Why the observed count is 1 low + 6 high

The evidence maps cleanly to seven vulnerable package items:

| Severity | Locked package | Minimum reviewed patch floor / boundary |
|---|---|---|
| HIGH | `astro@6.4.4` | `>=6.4.6` for the bound Astro advisory |
| HIGH | `js-yaml@4.2.0` | `>=4.3.1` |
| HIGH | `nanoid@3.3.12` | `>=3.3.18` |
| HIGH | `postcss@8.5.15` | `>=8.5.18` for the bound high advisory; re-check later advisories |
| HIGH | `sharp@0.34.5` | `>=0.35.0`, incompatible with Astro 6.x's declared optional range without a separate dependency decision |
| HIGH | `svgo@4.0.1` | `>=4.0.2` |
| LOW | `esbuild@0.27.7` | `>=0.28.1` |

Multiple high advisories affect `js-yaml` and `nanoid`, but npm audit can aggregate those under the same vulnerable package item. This explains why advisory count and vulnerable-package count are not identical.

## Remediation options

### Option A — bounded 6.x hardening candidate

Goal: minimize framework change.

Candidate actions, to be prepared only when an exact-head build can execute:

1. update Astro within 6.x to the final/latest reviewed 6.x patch (`6.4.8` at this review) so the Astro SSRF is not retained;
2. refresh compatible transitive packages to safe current versions within their declared ranges where possible (`js-yaml`, `nanoid`, `postcss`, `svgo`, and potentially `esbuild` if the Astro/Vite graph permits it);
3. treat Sharp separately because Astro 6.x declares only `^0.34.0`;
4. do not force an unsupported Sharp override without a dedicated compatibility test;
5. run `npm audit` plus the complete repository build/gate pipeline on the exact candidate lockfile.

Expected limitation: this option may leave the Sharp high unresolved unless a separately proven safe dependency override or image-service change is introduced.

### Option B — framework-line migration candidate

Goal: move to an Astro line whose upstream package contract permits Sharp `0.35.x` and newer build dependencies.

This is not a patch-level change. It requires:

- explicit Astro 7 migration review;
- package/lockfile diff;
- exact build of all 162 restored routes;
- all discovery/review/public API/canonical/public-repair gates;
- direct-page sanitizer/regression verification;
- preview deployment/readback before any production decision.

Do not combine this migration with content rewrites unless necessary. Security/framework migration should be separately attributable.

## Recommended execution order

Because the current branch already has an unexecuted public-guide repair and external build capacity is blocked:

1. keep this triage as SOURCE evidence only;
2. obtain a real exact-head build for the already-added funding repair before changing the dependency graph;
3. after that build is understood, create a dedicated dependency-hardening candidate rather than mixing dependency changes into content repair commits;
4. re-query current reviewed advisories immediately before selecting versions because the advisory database is time-sensitive;
5. run `npm ci`, `npm audit`, the complete deterministic build/gate pipeline, and exact-deployment readback;
6. only then classify the dependency lane PASS/HOLD.

## CSS warning relation

The external audit also reported `Expected identifier but found end of file [css-syntax-error]` against `main`.

That finding is independently explained by the old `src/layouts/Layout.astro` base revision ending its `<style>` content with an incomplete bare `.` token and no proper completed tail. The active PR replaced that broken tail with valid completed CSS. A later exact-head Vercel build at `47d8e4ace0b546c011c3e2fbd17aac6568473e53` completed Astro static generation and all then-existing deterministic gates without that CSS syntax warning.

Therefore the specific CSS defect observed against `main` is already repaired in the active PR lineage. This does not imply that later unbuilt heads are globally BUILD PASS.

## Governance

- no `npm audit fix` executed;
- no package or lockfile mutation;
- no dependency override;
- no framework migration;
- no merge;
- no deploy/promotion;
- no billing/plan change;
- no runtime/credential mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.

Decision: `DEPENDENCY_RISK_BOUND / REMEDIATION_DEFERRED_TO_EXECUTABLE_BUILD_LANE`.
