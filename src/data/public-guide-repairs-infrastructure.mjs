const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const fleetCoordinatorArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="fleet-coordinator-public-redaction-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REDACTED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · HISTORICAL INFRASTRUCTURE</div>
      <h1>Fleet Coordinator: как отслеживать дрейф систем без публикации внутренней топологии</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED</span>
        <span>HISTORICAL_REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Fleet coordination — это инженерная задача сверки ожидаемого и наблюдаемого состояния нескольких узлов, сервисов и агентов. Публичной документации достаточно описывать модель дрейфа, authority и fail-closed поведение; конкретные host identities, IP-адреса, внутренние пути, scheduler names и credential-variable names не нужны для понимания метода.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="fleet-model">
      <h2 id="fleet-model">Минимальная модель Fleet Coordinator</h2>
      <ul>
        <li><strong>Expected state:</strong> versioned registry описывает допустимые роли, сервисные зависимости и ожидаемое состояние без публикации чувствительной сетевой топологии.</li>
        <li><strong>Observed state:</strong> read-only probes собирают свежие признаки доступности, версии, process/service identity и health, причём отсутствие данных должно давать <code>UNKNOWN</code>, а не ложный <code>PASS</code>.</li>
        <li><strong>Reconciliation:</strong> детерминированные правила сравнивают expected/observed state и создают drift records с evidence timestamp и source identity.</li>
        <li><strong>Authority:</strong> обнаружение дрейфа не является разрешением автоматически менять runtime. Repair/remediation требует отдельного policy gate и audit receipt.</li>
        <li><strong>Audit:</strong> история наблюдений должна сохранять причину, evidence и supersession, не превращая публичный сайт в карту внутренних систем.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="fleet-drift">
      <h2 id="fleet-drift">Какие классы дрейфа полезно отслеживать</h2>
      <p>Практический taxonomy может включать version/config drift, missing service, unexpected process, stale registry, unreachable dependency, authority mismatch, failed health probe и orphaned state. Названия категорий должны описывать проблему, а не раскрывать конкретный сервер, порт или внутренний deployment path.</p>
      <p>Для каждой записи полезно хранить минимум: <code>observed_at</code>, source/probe identity, expected fingerprint, observed fingerprint, severity, confidence, owner и remediation state.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="fleet-security">
      <h2 id="fleet-security">Public/private boundary</h2>
      <ul>
        <li>Публичный материал не должен перечислять реальные или исторические IP-адреса, private host aliases и host-to-service mapping без отдельной причины публикации.</li>
        <li>Не следует публиковать scheduler task names, точные cadences, внутренние state filenames, localhost/admin endpoints или environment-variable names, если они не являются частью публичного API contract.</li>
        <li>Документация не должна утверждать, что исторический host, service или automation сейчас работает. Для current-runtime claim нужен отдельный fresh readback.</li>
        <li>Имя переменной окружения само по себе не является секретом, но его удаление из публичного текста уменьшает лишнюю operational reconnaissance surface.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="fleet-recovery">
      <h2 id="fleet-recovery">Fail-closed reconciliation</h2>
      <p>Если probe отсутствует, registry конфликтует или source freshness истекла, coordinator должен фиксировать неопределённость и эскалировать review, а не автоматически объявлять систему исправной. Автоматическое восстановление допустимо только внутри заранее ограниченного и проверенного remediation contract.</p>
      <p>Эта страница описывает архитектурный паттерн. Она не доказывает наличие конкретного fleet, scheduler, API, сервера, dashboard или production automation.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="fleet-use">
      <h2 id="fleet-use">Допустимая область использования</h2>
      <p>Используйте материал как checklist для внутреннего reconciliation service: сформировать registry schema, freshness rules, drift taxonomy, read-only probes, evidence log и отдельный remediation authority gate. Конкретная topology должна храниться в защищённом operational source, а не в публичном guide.</p>
      <p><strong>Эта страница не является разрешением на изменение серверов, firewall, scheduler, credentials, deployment, DNS или runtime state.</strong></p>
    </section>

    <aside class="public-repair-boundary">
      <strong>INFRASTRUCTURE BOUNDARY</strong>
      <span>This historical infrastructure specification is not current runtime authority. Current hosts, addresses, services, credentials, scheduler state and deployment topology require a separate fresh infrastructure readback and explicit operational authorization.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Fleet Coordinator: public-redacted historical infrastructure guide","dateModified":"2026-08-15","description":"Fleet drift-monitoring concepts with concrete historical host, scheduler, endpoint and credential-variable metadata removed from the public artifact."}</script>
  ${sharedStyle}
</article>`;

export const infrastructureRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'fleet-coordinator-public-redaction-r1',
    slug: 'fleet-coordinator-drift-monitoring',
    state: 'BOUNDED_PUBLIC_COPY_REDACTED_REVERIFY_REMAINS',
    expectedReviewStatus: 'INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED',
    expectedCurrentness: 'HISTORICAL_REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_DISPOSITION_LEGACY_SURFACES_R1.md',
    articleHtml: fleetCoordinatorArticle,
    requiredMarkers: [
      'data-public-guide-repair="fleet-coordinator-public-redaction-r1"',
      'INFRASTRUCTURE_IMPLEMENTATION_REVIEW_REQUIRED',
      'HISTORICAL_REVERIFY_REQUIRED',
      'This historical infrastructure specification is not current runtime authority.',
      'Public/private boundary',
      'Fail-closed reconciliation',
      'Эта страница не является разрешением на изменение серверов'
    ],
    forbiddenPatterns: [
      { label: 'historical arena IP', pattern: /34\.70\.171\.152/iu },
      { label: 'historical win host IP', pattern: /185\.231\.154\.149/iu },
      { label: 'historical fin host IP', pattern: /35\.217\.10\.153/iu },
      { label: 'historical old host IP', pattern: /144\.124\.250\.14/iu },
      { label: 'historical arena alias', pattern: /\barena-vps\b/iu },
      { label: 'historical win alias', pattern: /\bwin185\b/iu },
      { label: 'historical fin alias', pattern: /\bfin35\b/iu },
      { label: 'historical old alias', pattern: /\bold144\b/iu },
      { label: 'historical scheduler task', pattern: /Fleet-Coordinator/iu },
      { label: 'historical coordinator filename', pattern: /fleet_coordinator\.py/iu },
      { label: 'credential variable name', pattern: /BITEVO_API_KEY/iu },
      { label: 'historical localhost audit endpoint', pattern: /http:\/\/localhost:8080\/journal\/entries/iu },
      { label: 'historical state path', pattern: /fleet\/unified_state\.json/iu },
      { label: 'historical registry filename', pattern: /fleet_registry\.json/iu },
      { label: 'historical topology filename', pattern: /infrastructure\.json/iu }
    ]
  }
];
