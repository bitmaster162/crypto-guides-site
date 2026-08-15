# TEE / Threshold Cryptography for Agent Secrets — Evidence R1

Date: 2026-08-15
Route: `tee-agent-secrets`
State: `SOURCE_REPAIR_APPLIED_EXACT_HEAD_BUILD_REVERIFY_PENDING`
Repair ID: `tee-agent-secrets-security-r1`
Review status: `SECURITY_SAFETY_REVIEW_REQUIRED`
Currentness: `REVIEW_REQUIRED`

## Why repair is required

The restored route mixes legitimate enclave/threshold-cryptography concepts with security guarantees and concrete transaction-policy parameters that read like universal or deployed production controls.

Restored copy includes claims that the architecture:
- reliably prevents API-key compromise even under successful prompt injection;
- guarantees transactions only to hard whitelists;
- uses a fixed 2-of-3 share threshold;
- uses a fixed single-transaction limit of 500 USD;
- hard-codes a Binance futures destination;
- immediately revokes session keys on a policy violation;
- implies an implemented autonomous signing/runtime path.

Those claims require a separate threat model, cryptographic scheme, policy implementation and runtime/effect evidence. TEE and threshold cryptography are useful defense-in-depth components, not a blanket proof of end-to-end agent safety.

## Primary security evidence rechecked 2026-08-15

### AWS Nitro Enclaves

Official AWS sources:
- `https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-concepts.html`
- `https://docs.aws.amazon.com/enclaves/latest/user/set-up-attestation.html`
- `https://docs.aws.amazon.com/enclaves/latest/user/connect-enclave-kms.html`
- `https://docs.aws.amazon.com/enclaves/latest/user/security.html`

AWS documents that Nitro Enclaves:
- isolate enclave vCPUs and memory from the parent instance;
- have no persistent storage, SSH/interactive access or external networking;
- communicate through local vsock;
- produce signed attestation documents containing enclave measurements;
- can use measurements as AWS KMS policy conditions so selected cryptographic operations/secrets are available only to authorized enclave states.

Disposition: retain isolation and attestation as concrete security properties within AWS's documented boundary. Do not extrapolate them into a claim that arbitrary application logic, prompts, policy or transactions are correct or compromise-proof.

### NIST multi-party threshold cryptography

Primary NIST sources:
- `https://csrc.nist.gov/pubs/ir/8214/c/final`
- `https://csrc.nist.gov/Projects/threshold-cryptography`

NIST IR 8214C describes threshold schemes where cryptographic primitives such as signing, encryption/decryption and key generation are computed in a distributed manner while the private/secret key is or becomes secret-shared across parties.

NIST's threshold-cryptography project describes distribution of trust and a corruption threshold under the assumed scheme/security model.

Disposition: retain threshold signing / distributed trust as a real cryptographic design family. A concrete quorum such as 2-of-3 is one system design choice, not a universal security requirement or sufficient proof of independent trust domains.

## Claim disposition

### KEEP_AS_SECURITY_CONCEPT
- isolated execution boundary for sensitive signing/secret processing;
- attestation-bound access to secrets/cryptographic operations;
- threshold/secret-shared signing to reduce a single point of key compromise;
- deterministic allowlist/value/risk policy outside the LLM context;
- fail-closed deny/unknown behavior;
- explicit operator approval for high-risk actions;
- revocation/recovery and audit/effect receipts as required control surfaces.

### REMOVE_OR_REWRITE
- reliable/guaranteed prevention of credential compromise from prompt injection;
- guarantee that all transactions obey a whitelist merely because TEE/MPC exists;
- fixed 2-of-3 quorum as a generic safe default;
- fixed 500 USD transaction cap as generic security policy;
- a Binance futures API host as generic allowed destination;
- `revoke_session_keys` or equivalent command as an implemented current runtime fact without code/effect evidence;
- implication that a live signer, credential set, transaction path or operator-approval system is currently deployed.

## Required threat-model boundary

The repaired public copy must explicitly preserve residual risks such as:
- enclave-application bugs;
- build/supply-chain provenance;
- incorrect KMS/attestation/access policy;
- compromised or non-independent threshold participants;
- stale/replayed/ambiguous inputs and state;
- recovery/revocation-path abuse;
- platform/side-channel assumptions outside the documented property;
- incorrect binding between policy decision and the real effect path.

Attestation proves measurements/identity conditions under the platform contract; it does not prove high-level business intent or behavioral correctness.

Threshold cryptography distributes key trust under a specified cryptographic and corruption model; it does not prove that all participants, policy decisions or transaction destinations are trustworthy.

## Deterministic public-repair gate

Generated repaired article HTML must fail if it contains the legacy guarantee language, old executable-looking constants, the fixed 500 USD limit, the Binance futures allowlist host, the old revoke command or compromise-proof language.

The repair must require:
- `SECURITY_SAFETY_REVIEW_REQUIRED`;
- `REVIEW_REQUIRED`;
- AWS Nitro Enclaves primary-source markers;
- NIST threshold-cryptography primary-source markers;
- exact boundary: `This security architecture is defense in depth, not compromise-proof authority.`;
- explicit no-credentials/no-signing/no-orders/no-transfers/no-runtime authority.

## Evidence ladder after source change

- Evidence: READY.
- Public repair: APPLIED IN SOURCE ON DRAFT BRANCH.
- Exact-head BUILD: PENDING.
- Deployment/readback: PENDING.
- Production effect: NONE.

No BUILD PASS may be claimed until an exact-head executor emits the route-specific `PUBLIC_GUIDE_REPAIR_APPLY` and `PUBLIC_GUIDE_REPAIR_GATE` receipts plus sanitizer/public-contract PASS.

## Governance

- no merge;
- no production promotion;
- no key/credential generation or rotation;
- no KMS/enclave/MPC deployment;
- no exchange account or API use;
- no transaction/order/signature action;
- no runtime mutation;
- no trading/capital effect;
- `can_trade=false`;
- `capital_permission=DENY`.
