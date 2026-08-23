# CONTENT_REPAIR_PYTHON_RT_ARCHITECTURE_EVIDENCE_R1

State: `EVIDENCE_BOUND_PUBLIC_REPAIR_R12`
Route: `python-rt-architecture`
Review target: `INFRA_IMPLEMENTATION_REVIEW_REQUIRED / REVIEW_REQUIRED`, `ymyl=false`
Checked: 2026-08-15

## Purpose

Bound the restored Python real-time architecture guide to claims supported by current Linux kernel and CPython documentation. Preserve useful latency-engineering mechanisms while removing the unsupported implication that a generic Python/Linux contour is already a hard-real-time system with a guaranteed `hb <= 0.5 ms` deadline.

## Source finding

The restored article currently presents all of the following as a deployment recipe rather than as testable hypotheses:

- `hb <= 0.5 ms` as a hard-real-time target/requirement;
- `SCHED_DEADLINE` as the "optimal" scheduler and as providing guaranteed deadline completion;
- CPU isolation / `nohz_full` / IRQ affinity / memory locking / timer slack / shared memory as a combined route to that fixed deadline;
- `timer slack = 1 ns` as a universal tuning value;
- a Python hot path as hard-real-time after moving selected work outside the GIL.

Those mechanisms are real, but the conclusion is stronger than the primary sources support without system-specific WCET, admission, kernel, hardware and interference evidence.

## Primary-source findings

### 1. PREEMPT_RT reduces scheduling latency; it does not by itself certify a 0.5 ms application deadline

Linux documents PREEMPT_RT as making most kernel execution preemptible, using priority inheritance and threaded interrupts so a high-priority task can be scheduled with reduced latency. Some low-level paths remain outside ordinary preemption.

Sources:
- https://docs.kernel.org/core-api/real-time/
- https://docs.kernel.org/core-api/real-time/theory.html

### 2. SCHED_DEADLINE guarantees depend on task parameters and schedulability

Linux SCHED_DEADLINE is an EDF/CBS scheduler with `runtime`, `deadline` and `period`. Kernel documentation ties hard schedulability to a task model in which runtime covers WCET and the admitted workload is feasible. The scheduler performs admission control; the existence of the policy alone is not evidence that an arbitrary Python loop will meet a particular end-to-end deadline.

Source:
- https://docs.kernel.org/scheduler/sched-deadline.html

### 3. `nohz_full` is a jitter-reduction mechanism with preconditions and tradeoffs

Linux documents full adaptive ticks for CPUs with one runnable task as useful for aggressive real-time/HPC response constraints. It also documents overheads and conditions under which other tick configurations may be preferable. Therefore it is a candidate tuning mechanism, not a universal latency guarantee.

Source:
- https://docs.kernel.org/timers/no_hz.html

### 4. Real-time latency must be measured, including OS and hardware noise

The kernel provides RTLA/timerlat to measure timer IRQ/thread latency and trace sources of operating-system noise. The hardware latency detector exists because firmware/SMI and other hardware effects can introduce latency that Linux itself cannot schedule away. Kernel real-time monitors also flag page faults in RT tasks and recommend memory locking as a mitigation.

Sources:
- https://docs.kernel.org/tools/rtla/rtla.html
- https://docs.kernel.org/tools/rtla/rtla-timerlat.html
- https://docs.kernel.org/trace/hwlat_detector.html
- https://docs.kernel.org/trace/rv/monitor_rtapp.html

### 5. CPython runtime mechanisms help architecture, but do not supply a hard-real-time contract

Current CPython documentation states that normal GIL-enabled CPython allows only one thread to execute Python code at a time; multiprocessing can bypass that GIL boundary. Free-threaded builds exist but are not the default. Shared memory can avoid serialization/copying between processes, but Python documentation separately warns that shared objects/operations are not automatically atomic or process-safe.

Sources:
- https://docs.python.org/3/library/threading.html
- https://docs.python.org/3/library/multiprocessing.shared_memory.html
- https://docs.python.org/3/library/multiprocessing.html

### 6. GC controls are workload/lifecycle tools, not deadline proof

CPython allows automatic cyclic GC to be disabled. `gc.freeze()` is specifically documented as useful around `fork()` to improve copy-on-write behavior. These controls may reduce a source of runtime variability for a carefully designed process, but they are not proof of a fixed worst-case execution deadline.

Source:
- https://docs.python.org/3/library/gc.html

### 7. Python exposes scheduler controls where supported

Current Python `os` documentation exposes scheduler policies such as SCHED_FIFO and, on supported platforms, SCHED_DEADLINE. This makes Python capable of requesting OS scheduling policies; it does not change the kernel-side feasibility/WCET conditions required for deadline guarantees.

Source:
- https://docs.python.org/3/library/os.html

## Public disposition

Keep as engineering mechanisms:

- process separation and CPU affinity/isolation;
- PREEMPT_RT as a kernel option to evaluate;
- SCHED_FIFO and SCHED_DEADLINE as scheduler policies with explicit safety and feasibility requirements;
- memory locking to reduce page-fault latency risk;
- shared memory to reduce serialization/copy overhead;
- native extensions / moving bounded compute outside ordinary Python bytecode where justified;
- GC lifecycle control where application invariants permit it;
- `nohz_full` / IRQ placement as benchmarked tuning candidates;
- SWMR/sequence-counter ideas only with explicit atomicity and memory-ordering design.

Do not publish as current authority without exact-system evidence:

- `hb <= 0.5 ms` as guaranteed hard real-time behavior;
- a universal `1 ns` timer-slack prescription;
- `SCHED_DEADLINE` as automatically "optimal";
- "guaranteed completion by deadline" without WCET + admission/schedulability evidence;
- any implication that shared memory, GIL release, memory locking or CPU isolation independently creates a hard-real-time Python runtime;
- any fixed kernel/IRQ/CPU recipe as portable across machines.

## Replacement measurement contract

A numeric latency target such as 0.5 ms may remain only as a benchmark objective. Promotion from target to supported runtime claim requires a bound evidence package for the exact machine/kernel/runtime/build, including at minimum:

1. exact CPU/firmware/kernel/PREEMPT configuration and Python build;
2. workload definition and deadline semantics;
3. WCET or conservative execution-time bound for the admitted hot-path workload;
4. scheduler parameters and schedulability/admission result;
5. sustained latency distribution plus worst observed misses under representative load;
6. OS-noise and hardware-noise measurements;
7. page-fault / allocation / GC behavior for the measured process;
8. rollback and failure behavior if deadline assumptions are violated.

Until then the page is an architecture/measurement guide, not a hard-real-time certification.

## Authority boundary

This evidence review authorizes only a bounded public-copy and metadata repair on the draft branch. It does not authorize CPU isolation, scheduler changes, PREEMPT_RT changes, IRQ changes, memory locking, timer-slack changes, process priority changes, reboot, host mutation or production deployment.

`can_trade=false`
`capital_permission=DENY`
