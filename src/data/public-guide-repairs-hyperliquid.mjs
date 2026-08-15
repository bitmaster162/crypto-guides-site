const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const hyperliquidNodeArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="hyperliquid-l1-node-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · INFRASTRUCTURE · YMYL</div>
      <h1>Hyperliquid L1 non-validator: текущие требования ноды и границы low-latency tuning</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>INFRA_IMPLEMENTATION_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
        <span>YMYL REVIEW</span>
      </div>
      <p class="public-repair-lead">Текущая документация Hyperliquid действительно рекомендует Tokyo для минимальной задержки и допускает дополнительный low-latency tuning, но это не превращает конкретный дата-центр, NIC, BIOS, kernel profile или scheduler policy в официальный универсальный deployment contract. Эта редакция разделяет подтверждённые требования ноды, latency-specific рекомендации и локальные инженерные эксперименты.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="hl-current">
      <h2 id="hl-current">Что подтверждено текущими первичными источниками</h2>
      <ul>
        <li>Официальные инструкции ноды указывают для non-validator базовый профиль <strong>16 vCPU / 128 GB / 500 GB SSD</strong>, Ubuntu 24.04 и публичные gossip ports 4001/4002.</li>
        <li>Для lowest latency Hyperliquid прямо рекомендует размещать ноду в <strong>Tokyo, Japan</strong>. Документация при этом не называет конкретный коммерческий facility обязательной точкой размещения.</li>
        <li>Отдельный latency guide рекомендует для latency-sensitive setups как минимум <strong>32 logical cores</strong> и около <strong>500 MB/s</strong> disk throughput. Это дополнительная optimization guidance, а не замена базового machine contract.</li>
        <li>Флаг <code>--disable-output-file-buffering</code> документирован как способ быстрее получать output lines ценой большего количества disk I/O. Из этого не следует универсальное требование переносить данные на RAM-диск или применять одну фиксированную storage topology.</li>
        <li>Foundation non-validating node публикуется на best-effort basis: без гарантий availability, latency, performance или completeness. Для time-sensitive use данные нужно независимо проверять.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="hl-rate">
      <h2 id="hl-rate">Request capacity не равна priority execution</h2>
      <p>Текущий Exchange API описывает <code>reserveRequestWeight</code> как резервирование дополнительных действий в рамках address-based request limits. Это rate-limit capacity, а не доказательство приоритетного включения торговой транзакции, более быстрого matching или гарантированного execution priority.</p>
      <p>Любая стратегия, зависящая от latency, очередности, nonce handling или block inclusion, должна измерять фактическое поведение отдельно и не подменять rate-limit semantics предположением о приоритете исполнения.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="hl-xdp">
      <h2 id="hl-xdp">AF_XDP: capability, а не универсальная настройка</h2>
      <p>Linux AF_XDP поддерживает copy и zero-copy paths. Поддержка zero-copy зависит от device/driver capabilities; принудительный <code>XDP_ZEROCOPY</code> должен завершиться ошибкой, если zero-copy недоступен. Поэтому NIC, queue layout, IRQ affinity, XDP mode и packet-loss behavior нужно сначала обнаружить и измерить на конкретном host.</p>
      <p>Low-latency tuning следует проводить как обратимый benchmark loop: baseline → одна гипотеза → latency/jitter/drop telemetry → regression check → rollback criteria. Нельзя переносить чужой kernel/BIOS profile в production только потому, что он выглядит «HFT-оптимизированным».</p>
    </section>

    <section class="public-repair-card" aria-labelledby="hl-removed">
      <h2 id="hl-removed">Что снято с роли текущего deployment authority</h2>
      <ul>
        <li>неподтверждённая конкретизация коммерческого Tokyo facility как обязательного места для Hyperliquid;</li>
        <li>жёсткие vendor-specific NIC, interface, BIOS, GRUB, sysctl, IRQ и scheduler настройки как универсальный рецепт;</li>
        <li>фиксированные storage-throughput и RAM-disk размеры, не являющиеся текущими требованиями Hyperliquid;</li>
        <li>локальные service names, CPU pinning maps и real-time priorities как будто это официальный node profile;</li>
        <li>неподтверждённые TPS/latency guarantees и утверждения о полном устранении I/O stalls;</li>
        <li>интерпретация request-weight reservation как priority fee или guaranteed execution mechanism.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="hl-use">
      <h2 id="hl-use">Допустимая область использования</h2>
      <p>Начинайте с текущих официальных node requirements и подписанных binaries, затем отдельно измеряйте peer quality, block-apply lag, disk throughput, output freshness, packet drops и end-to-end strategy latency. Hardware/kernel optimizations должны иметь host-specific evidence и rollback plan.</p>
      <p><strong>Эта страница не является торговым разрешением и не запускает ноду, валидатор, exchange API actions, ордера, переводы, firewall changes, kernel tuning, reboot или deployment.</strong></p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="hl-sources">
      <h2 id="hl-sources">Первичные источники, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://github.com/hyperliquid-dex/node" rel="noreferrer">Hyperliquid node repository · Running a node</a> — baseline machine specs, Ubuntu, gossip ports, Tokyo guidance, flags and signed-binary verification.</li>
        <li><a href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/optimizing-latency" rel="noreferrer">Hyperliquid Docs · Optimizing latency</a> — latency-sensitive machine and node-output guidance.</li>
        <li><a href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/nodes/foundation-non-validating-node" rel="noreferrer">Hyperliquid Docs · Foundation non-validating node</a> — best-effort/no-guarantee boundary.</li>
        <li><a href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint" rel="noreferrer">Hyperliquid Docs · Exchange endpoint</a> — <code>reserveRequestWeight</code> semantics.</li>
        <li><a href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/rate-limits-and-user-limits" rel="noreferrer">Hyperliquid Docs · Rate limits and user limits</a> — request-weight and address-based limits.</li>
        <li><a href="https://docs.kernel.org/networking/af_xdp.html" rel="noreferrer">Linux Kernel Documentation · AF_XDP</a> — copy/zero-copy capability and <code>XDP_ZEROCOPY</code> behavior.</li>
      </ul>
    </section>

    <aside class="public-repair-boundary">
      <strong>INFRASTRUCTURE + YMYL BOUNDARY</strong>
      <span>This infrastructure specification is not current runtime authority. Current peer topology, host configuration, latency, data completeness and execution behavior require separate fresh measurement and explicit operational authorization.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Hyperliquid L1 non-validator: current node facts and bounded latency tuning","dateModified":"2026-08-15","description":"Evidence-bound distinction between current Hyperliquid non-validator requirements, latency guidance and host-specific tuning hypotheses.","isBasedOn":["https://github.com/hyperliquid-dex/node","https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/optimizing-latency","https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/nodes/foundation-non-validating-node","https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint","https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/rate-limits-and-user-limits","https://docs.kernel.org/networking/af_xdp.html"]}</script>
  ${sharedStyle}
</article>`;

export const hyperliquidInfrastructureRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'hyperliquid-l1-node-r1',
    slug: 'hyperliquid-l1-tokyo-deploy',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS',
    expectedReviewStatus: 'INFRA_IMPLEMENTATION_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    expectedYmyl: true,
    sourceTitle: 'GEO-оптимизированный Чек-лист Деплоя Невалидирующей Ноды Hyperliquid L1 (Equinix TY3, Токио)',
    publicTitle: 'Hyperliquid L1 non-validator: текущие требования ноды и границы low-latency tuning',
    evidenceDoc: 'docs/CONTENT_REPAIR_HYPERLIQUID_L1_TOKYO_EVIDENCE_R1.md',
    articleHtml: hyperliquidNodeArticle,
    requiredMarkers: [
      'data-public-guide-repair="hyperliquid-l1-node-r1"',
      'INFRA_IMPLEMENTATION_REVIEW_REQUIRED',
      'REVIEW_REQUIRED',
      '16 vCPU / 128 GB / 500 GB SSD',
      'Tokyo, Japan',
      '32 logical cores',
      '500 MB/s',
      '--disable-output-file-buffering',
      'reserveRequestWeight',
      'XDP_ZEROCOPY',
      'Эта страница не является торговым разрешением',
      'This infrastructure specification is not current runtime authority.',
      'https://github.com/hyperliquid-dex/node',
      'https://docs.kernel.org/networking/af_xdp.html'
    ],
    forbiddenPatterns: [
      { label: 'unsupported facility specificity', pattern: /Equinix\s+TY3/iu },
      { label: 'unsupported fixed ultra-high disk requirement', pattern: /7000\s*(?:MB|МБ)\s*\/\s*s|7000\s*(?:MB|МБ)\s*\/\s*с/iu },
      { label: 'hardware-specific NIC authority', pattern: /ConnectX-6\s+Dx/iu },
      { label: 'historical interface identity', pattern: /\bens1f0\b/iu },
      { label: 'historical fixed CPU isolation profile', pattern: /isolcpus=1-3/iu },
      { label: 'historical fixed real-time priority', pattern: /SCHED_FIFO\s*99/iu },
      { label: 'historical priority-fee denomination', pattern: /0\.0001\s*ETH/iu },
      { label: 'historical Mellanox tuning constant', pattern: /MAX_ACC_OUT_READ=44/iu },
      { label: 'historical NIC private flag', pattern: /rx_striding_rq/iu },
      { label: 'historical multicast example', pattern: /239\.1\.9\.1/iu },
      { label: 'historical host account path', pattern: /\/home\/hyperliquid_user/iu },
      { label: 'universal latency guarantee', pattern: /гарантиру(?:ет|ют|ется)[\s\S]{0,80}(?:latency|задерж|микросек)/iu }
    ]
  }
];
