const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const pythonRtArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="python-rt-architecture-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · INFRASTRUCTURE · LATENCY</div>
      <h1>Python low-latency contour: RT mechanisms, WCET and measurement instead of a 0.5 ms guarantee</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>INFRA_IMPLEMENTATION_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
        <span>BENCHMARK TARGET ≠ DEADLINE GUARANTEE</span>
      </div>
      <p class="public-repair-lead">Python может участвовать в очень низколатентной архитектуре, а Linux предоставляет реальные RT-механизмы. Но фиксированный порог 0.5 ms нельзя объявлять hard-real-time свойством контура без доказательства для конкретных CPU, firmware, kernel, scheduler, Python build и workload. Здесь 0.5 ms — только benchmark target, не гарантированный deadline.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="rt-facts">
      <h2 id="rt-facts">Что подтверждают Linux и CPython</h2>
      <ul>
        <li><strong>PREEMPT_RT</strong> делает большую часть kernel execution preemptible, использует priority inheritance и threaded interrupts и тем самым уменьшает источники scheduling latency. Это механизм RT-платформы, а не сертификат конкретного application deadline.</li>
        <li><strong>SCHED_FIFO</strong> и <strong>SCHED_DEADLINE</strong> — реальные scheduler policies. Для SCHED_DEADLINE hard schedulability привязана к task model, WCET/runtime, deadline, period и admission/schedulability conditions.</li>
        <li><strong>nohz_full</strong>, CPU affinity/isolation и IRQ placement могут уменьшать OS jitter, но имеют preconditions и tradeoffs и должны проверяться на конкретном host.</li>
        <li><strong>Memory locking</strong> полезен для снижения риска page-fault latency; Linux RT monitors отдельно отслеживают page faults у real-time tasks.</li>
        <li><strong>CPython shared memory</strong> может убрать сериализацию и лишнее копирование между процессами. Это performance primitive, а не автоматическая atomicity/process-safety или deadline guarantee.</li>
        <li>Обычный GIL-enabled CPython сериализует исполнение Python bytecode между threads; process separation или bounded native code могут уменьшить этот bottleneck. Free-threaded builds существуют, но не являются универсальной заменой измерению worst-case latency.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="rt-target">
      <h2 id="rt-target">Как обращаться с целью 0.5 ms</h2>
      <p><strong>0.5 ms is a benchmark target, not a guaranteed deadline.</strong> Сначала необходимо определить, что именно считается heartbeat/deadline: wakeup-to-run, один compute cycle, IPC round trip, end-to-end market-data decision path или другая величина.</p>
      <p>После этого измеряется не только median/average. Нужны tail latency, worst observed misses, duration теста, load profile и причины выбросов. Для ОС Linux предоставляет RTLA/timerlat и osnoise-инструменты; firmware/hardware noise также надо измерять отдельно, потому что некоторые задержки возникают вне контроля обычного scheduler path.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="rt-sched">
      <h2 id="rt-sched">Scheduler policy не заменяет WCET и admission evidence</h2>
      <p>SCHED_DEADLINE управляется параметрами runtime/deadline/period. Для hard schedulability runtime должен покрывать worst-case execution time соответствующей задачи, а workload должен пройти feasibility/admission constraints. Поэтому запись «включить SCHED_DEADLINE и получить гарантированное выполнение» некорректна без связанного WCET и system-level schedulability evidence.</p>
      <p>SCHED_FIFO также требует осторожности: runaway high-priority work способен вытеснить обычные задачи и повредить доступности системы. RT policy выбирается из модели workload и failure behavior, а не из общего рейтинга «FIFO сначала, DEADLINE оптимально».</p>
    </section>

    <section class="public-repair-card" aria-labelledby="rt-python">
      <h2 id="rt-python">Python hot path: что можно оптимизировать</h2>
      <ul>
        <li>разделить orchestration/control plane и ограниченный latency-sensitive worker;</li>
        <li>минимизировать allocations и непредсказуемые операции в измеряемом участке;</li>
        <li>использовать shared memory там, где это действительно уменьшает serialization/copy cost, отдельно проектируя synchronization и memory ordering;</li>
        <li>выносить строго bounded compute в native extension только после профилирования и с явной ownership/error boundary;</li>
        <li>управлять cyclic GC только если объектная модель и lifecycle это допускают; <code>gc.disable()</code>/<code>gc.freeze()</code> — runtime tools, не доказательство deadline;</li>
        <li>memory locking, CPU isolation, IRQ affinity и timer coalescing/slack считать tuning hypotheses и проверять по одной с rollback.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="rt-proof">
      <h2 id="rt-proof">Что нужно, чтобы превратить target в поддерживаемое утверждение</h2>
      <ol>
        <li>точные CPU, firmware, kernel version/config и PREEMPT state;</li>
        <li>точный Python build, native modules и dependency set;</li>
        <li>формальное определение workload/deadline и допустимого miss policy;</li>
        <li>WCET или консервативная execution-time bound для admitted hot path;</li>
        <li>scheduler parameters и admission/schedulability result;</li>
        <li>длительное измерение under representative load: distribution, tail и deadline misses;</li>
        <li>RTLA/osnoise + hardware-noise evidence и page-fault/allocation/GC telemetry;</li>
        <li>rollback/fail-safe behavior при нарушении latency assumptions.</li>
      </ol>
      <p>Без такого пакета корректная формулировка — <strong>low-latency architecture candidate</strong>, а не hard-real-time certification.</p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="rt-sources">
      <h2 id="rt-sources">Первичные источники, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://docs.kernel.org/core-api/real-time/theory.html" rel="noreferrer">Linux Kernel · PREEMPT_RT theory of operation</a></li>
        <li><a href="https://docs.kernel.org/scheduler/sched-deadline.html" rel="noreferrer">Linux Kernel · Deadline Task Scheduling</a></li>
        <li><a href="https://docs.kernel.org/timers/no_hz.html" rel="noreferrer">Linux Kernel · NO_HZ / adaptive ticks</a></li>
        <li><a href="https://docs.kernel.org/tools/rtla/rtla-timerlat.html" rel="noreferrer">Linux Kernel · RTLA timerlat</a></li>
        <li><a href="https://docs.kernel.org/trace/hwlat_detector.html" rel="noreferrer">Linux Kernel · Hardware Latency Detector</a></li>
        <li><a href="https://docs.kernel.org/trace/rv/monitor_rtapp.html" rel="noreferrer">Linux Kernel · Real-time application monitors</a></li>
        <li><a href="https://docs.python.org/3/library/threading.html" rel="noreferrer">Python · threading / GIL considerations</a></li>
        <li><a href="https://docs.python.org/3/library/multiprocessing.shared_memory.html" rel="noreferrer">Python · multiprocessing.shared_memory</a></li>
        <li><a href="https://docs.python.org/3/library/multiprocessing.html" rel="noreferrer">Python · multiprocessing synchronization semantics</a></li>
        <li><a href="https://docs.python.org/3/library/gc.html" rel="noreferrer">Python · garbage collector controls</a></li>
        <li><a href="https://docs.python.org/3/library/os.html" rel="noreferrer">Python · scheduler interfaces</a></li>
      </ul>
    </section>

    <aside class="public-repair-boundary">
      <strong>INFRASTRUCTURE AUTHORITY BOUNDARY</strong>
      <span>This infrastructure specification is not current runtime authority. A numeric real-time deadline requires exact-system WCET, schedulability and measured latency evidence; no scheduler, kernel or Python tuning is applied by this page.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Python low-latency contour: RT mechanisms, WCET and measurement instead of a 0.5 ms guarantee","dateModified":"2026-08-15","description":"Evidence-bound guide to Linux real-time mechanisms and CPython latency engineering without claiming an unverified 0.5 ms hard-real-time guarantee.","isBasedOn":["https://docs.kernel.org/core-api/real-time/theory.html","https://docs.kernel.org/scheduler/sched-deadline.html","https://docs.kernel.org/tools/rtla/rtla-timerlat.html","https://docs.python.org/3/library/threading.html","https://docs.python.org/3/library/multiprocessing.shared_memory.html","https://docs.python.org/3/library/gc.html"]}</script>
  ${sharedStyle}
</article>`;

export const pythonRtInfrastructureRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'python-rt-architecture-r1',
    slug: 'python-rt-architecture',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS',
    expectedReviewStatus: 'INFRA_IMPLEMENTATION_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    expectedYmyl: false,
    evidenceDoc: 'docs/CONTENT_REPAIR_PYTHON_RT_ARCHITECTURE_EVIDENCE_R1.md',
    articleHtml: pythonRtArticle,
    requiredMarkers: [
      'data-public-guide-repair="python-rt-architecture-r1"',
      'INFRA_IMPLEMENTATION_REVIEW_REQUIRED',
      'REVIEW_REQUIRED',
      '0.5 ms is a benchmark target, not a guaranteed deadline.',
      'PREEMPT_RT',
      'SCHED_DEADLINE',
      'WCET',
      'RTLA/timerlat',
      'low-latency architecture candidate',
      'This infrastructure specification is not current runtime authority.',
      'https://docs.kernel.org/scheduler/sched-deadline.html',
      'https://docs.python.org/3/library/threading.html'
    ],
    forbiddenPatterns: [
      { label: 'old hard-real-time headline', pattern: /жесткого\s+реального\s+времени\s*\(hb\s*<=\s*0\.5\s*мс\)/iu },
      { label: 'old guaranteed deadline claim', pattern: /Гарантированное\s+выполнение\s+задач\s+в\s+срок/iu },
      { label: 'old scheduler optimality claim', pattern: /SCHED_DEADLINE\s*\(оптимально\)/iu },
      { label: 'universal one-ns timer-slack prescription', pattern: /(?:Timer\s+Slack|timer\s+slack)[\s\S]{0,80}(?:1\s*нс|1\s*ns)/iu },
      { label: 'hard-real-time achievement overclaim', pattern: /Для\s+достижения\s+жесткого\s+реального\s+времени[\s\S]{0,120}Python/iu }
    ]
  }
];
