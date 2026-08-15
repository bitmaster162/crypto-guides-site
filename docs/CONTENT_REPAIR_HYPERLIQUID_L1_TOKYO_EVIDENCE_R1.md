# CONTENT_REPAIR_HYPERLIQUID_L1_TOKYO_EVIDENCE_R1

State: `EVIDENCE_BOUND_PUBLIC_REPAIR_R10`
Route: `hyperliquid-l1-tokyo-deploy`
Review target: `INFRA_IMPLEMENTATION_REVIEW_REQUIRED / REVIEW_REQUIRED`, `ymyl=true`
Checked: 2026-08-15

## Purpose

Bound the restored Hyperliquid L1 deployment article to claims supported by current primary documentation. Preserve useful node and latency-engineering concepts while removing venue-specific, hardware-specific, scheduler-specific and execution-looking details that are not part of the current official Hyperliquid deployment contract.

## Primary-source findings

### 1. Current node baseline

The official `hyperliquid-dex/node` instructions currently document:

- non-validator baseline: 16 vCPUs, 128 GB RAM, 500 GB SSD;
- validator baseline: 32 vCPUs, 128 GB RAM, 1 TB SSD;
- Ubuntu 24.04 support;
- public gossip ports 4001 and 4002 for a non-validator;
- for lowest latency, run the node in Tokyo, Japan;
- `~/hl-visor run-non-validator` as the normal non-validator start path;
- `--disable-output-file-buffering` as a flag that flushes output lines immediately and trades lower output latency for more disk I/O.

Source: https://github.com/hyperliquid-dex/node

### 2. Latency-specific guidance is not the baseline machine contract

Hyperliquid's current latency guide recommends, for latency-sensitive setups, at least 32 logical cores and about 500 MB/s disk throughput, local state reconstruction from node output, and use of `--disable-output-file-buffering` when appropriate.

This is a latency optimization layer, not evidence that every non-validator requires a specific bare-metal SKU, NIC, BIOS profile, scheduler policy or 7000 MB/s storage device.

Source: https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/optimizing-latency

### 3. Foundation peer is best-effort, not a latency guarantee

The Foundation non-validating node is documented as best-effort. Hyperliquid explicitly disclaims guarantees for availability, latency, performance and data completeness and says it should not be a sole or authoritative source for trading or time-sensitive activity.

Source: https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/nodes/foundation-non-validating-node

### 4. `reserveRequestWeight` is not priority execution

Current Hyperliquid Exchange API documentation describes `reserveRequestWeight` under "Reserve Additional Actions": it purchases/reserves additional address-based request capacity paid from the Perps balance. Current rate-limit documentation separately explains IP- and address-based request limits.

Therefore the restored framing of this action as a transaction-priority mechanism is not supported by the current API contract.

Sources:
- https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint
- https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/rate-limits-and-user-limits

### 5. AF_XDP zero-copy is capability-dependent

Linux kernel documentation states that AF_XDP can run in copy or zero-copy modes. If zero-copy is unsupported, normal binding may fall back to copy mode; forcing `XDP_ZEROCOPY` fails when the device/driver cannot provide zero-copy. This makes zero-copy a measured capability, not a universal property of an arbitrary NIC configuration.

Source: https://docs.kernel.org/networking/af_xdp.html

## Claims not promoted as current public authority

The repaired public article must not present any of the following as Hyperliquid's current official deployment contract without separate evidence:

- Equinix TY3 as the documented Hyperliquid co-location target;
- a fixed 7000 MB/s disk requirement;
- a mandatory Mellanox ConnectX-6 Dx / specific interface name;
- one universal GRUB, sysctl, IRQ, cgroup or SCHED_FIFO profile;
- fixed tmpfs sizes and local service topology;
- a fixed high-TPS claim used to justify RAM-disk deployment;
- `reserveRequestWeight` as priority execution or a priority fee;
- a guarantee that any of these tunings produce a specific latency outcome.

These can exist as historical experiments or candidate tuning hypotheses, but only with machine-specific benchmarks and rollback/effect evidence.

## Public disposition

Keep:

- official node baseline and Tokyo guidance;
- the distinction between baseline node requirements and latency-sensitive optimization;
- local state reconstruction and output-buffering concepts;
- measured, reversible OS/NIC tuning as an engineering methodology;
- AF_XDP as a capability that must be probed rather than assumed;
- best-effort / no-guarantee data-source boundary.

Remove or qualify:

- unsupported facility specificity;
- fixed hardware and kernel tuning presented as universal requirements;
- unverified performance claims;
- execution-priority interpretation of request-weight reservation;
- implied deployed HFT/runtime authority.

## Authority boundary

This evidence review authorizes only a bounded public-copy repair on the draft branch. It does not authorize node deployment, peer changes, firewall changes, host tuning, reboot, package/binary installation, validator registration, signing, exchange API actions, orders, transfers, trading or capital use.

`can_trade=false`
`capital_permission=DENY`
