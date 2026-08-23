const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const riskFrameworkArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="risk-framework-crypto-bots-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · RESEARCH-BOUND · YMYL</div>
      <h1>Risk Framework для крипто-ботов: методы, измерения и границы реализации</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>HISTORICAL_REVERIFY_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Надёжный risk framework не выводится из одного набора универсальных процентов, latency targets или restart rules. Порог зависит от стратегии, капитала, venue semantics, исполнения и наблюдаемого распределения отказов. Эта редакция сохраняет полезные исследовательские и инженерные идеи, но не выдаёт их за готовый production-standard или доказанную live-реализацию.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="rf-research">
      <h2 id="rf-research">Что можно использовать как исследовательский инструментарий</h2>
      <ul>
        <li><strong>Conditional Drawdown at Risk (CDaR)</strong> — семейство drawdown-tail risk measures для анализа худшей части underwater-trajectory. Это метод измерения риска, а не готовый лимит drawdown.</li>
        <li><strong>Covariance shrinkage</strong>, включая Ledoit–Wolf-style estimators, — способ уменьшать estimation error covariance matrix. Выбор universe, window и estimator всё равно требует отдельной проверки.</li>
        <li><strong>Realized spread и markout</strong> — полезные execution-quality decompositions для измерения adverse selection и качества исполнения на выбранном горизонте.</li>
        <li><strong>VPIN / flow-toxicity research</strong> — одна из исследовательских линий оценки order-flow toxicity. Литература содержит как положительные результаты, так и существенную критику predictive interpretation, поэтому метрика не рассматривается здесь как универсальный veto или сигнал.</li>
        <li><strong>Event-driven recovery, hysteresis и stale-state monitoring</strong> — инженерные patterns, которые следует калибровать по измеренным failure/recovery distributions.</li>
        <li><strong>Aeron, shared-memory и ring-buffer approaches</strong> — возможные low-latency transport/IPC building blocks. Их существование не означает, что конкретная технология обязательна для любой торговой системы.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="rf-design">
      <h2 id="rf-design">Как задавать hard risk gates</h2>
      <p>Hard gate должен быть детерминированным, наблюдаемым и fail-closed относительно собственного contract. Но его числовой threshold должен следовать из system-specific evidence: strategy horizon и order rate, leverage/concentration, liquidity regime, venue/API semantics, measured execution latency, stale-state distribution, failure modes, recovery-time objective и допустимый capital/risk budget.</p>
      <p>LLM может помогать классифицировать evidence или объяснять incident, но не должен быть единственным недетерминированным компонентом в критическом kill-switch path. При этом само наличие deterministic gate не доказывает правильность выбранного порога.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="rf-recovery">
      <h2 id="rf-recovery">Recovery и re-entry требуют evidence, а не ритуала</h2>
      <p>Возврат из degraded/shadow режима должен быть связан с наблюдаемыми критериями: устранённая root cause, стабильность data/execution path, отсутствие stale state, bounded drift, повторяемость результата на заранее заданном validation window и человеческая/системная authority в соответствии с governance contract.</p>
      <p>Фиксированное количество shadow trades, одинаковая лестница возврата капитала для всех стратегий или несколько прибыльных окон сами по себе не доказывают восстановление edge и не являются универсальным разрешением на live restart.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="rf-implementation">
      <h2 id="rf-implementation">Specification ≠ implementation ≠ production qualification</h2>
      <p>Из описания архитектуры нельзя заключать, что risk engine реально задеплоен, каждый order проходит через gate, kill-switch связан с live execution, IPC/replication stack работает в production или latency target измерен на конкретном окружении.</p>
      <p>Для таких утверждений нужны отдельные source identity, tests, runtime/effect receipts, fault-injection/load evidence и свежий readback. На этой странице таких production claims нет.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="rf-risk">
      <h2 id="rf-risk">Почему delta-neutral не означает risk-neutral</h2>
      <p>Даже нейтрализованная directional exposure не устраняет execution mismatch, basis/funding risk, model error, stale state, venue/API failure, margin/liquidation mechanics, collateral concentration, counterparty risk и operational failure. Поэтому risk framework должен моделировать не только market P&amp;L, но и качество данных, исполнение, инфраструктурные зависимости и authority transitions.</p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="rf-sources">
      <h2 id="rf-sources">Исследовательские и инженерные источники, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=223323" rel="noreferrer">Chekhlov, Uryasev, Zabarankin · Portfolio Optimization with Drawdown Constraints</a> — вводит Conditional Drawdown-at-Risk family.</li>
        <li><a href="https://ledoit.net/honey_abstract.htm" rel="noreferrer">Ledoit &amp; Wolf · Honey, I Shrunk the Sample Covariance Matrix</a> — covariance shrinkage как estimator, а не универсальный risk limit.</li>
        <li><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1748633" rel="noreferrer">Easley, López de Prado, O'Hara · The Exchange of Flow Toxicity</a> — VPIN/flow-toxicity research line.</li>
        <li><a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1881731" rel="noreferrer">Andersen &amp; Bondarenko · VPIN and the Flash Crash</a> — empirical critique showing why VPIN should not be treated as uncontested predictive authority.</li>
        <li><a href="https://aeron.io/docs/aeron/overview/" rel="noreferrer">Aeron Transport documentation</a> — IPC/UDP transport architecture and ordered log buffers; an engineering option, not a universal mandate.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="rf-use">
      <h2 id="rf-use">Допустимая область использования</h2>
      <p>Используйте эту страницу как checklist для проектирования и аудита: определить risk objectives, измерить реальные distributions, выбрать deterministic controls, задокументировать authority/failure modes и отдельно доказать implementation/effect boundary.</p>
      <p><strong>Эта страница не является торговым разрешением и не задаёт live leverage, drawdown limit, restart threshold, position size, order path или движение капитала.</strong></p>
    </section>

    <aside class="public-repair-boundary">
      <strong>REVIEW BOUNDARY</strong>
      <span>Статус маршрута остаётся YMYL_TRADING_REVIEW_REQUIRED / HISTORICAL_REVERIFY_REQUIRED. Исправление публичной копии не является сертификацией стратегии, risk engine, latency budget, fleet topology или production implementation.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Risk Framework for Crypto Bots: evidence-bound public repair","dateModified":"2026-08-15","description":"Research and engineering risk-framework concepts separated from universal thresholds and unproven production claims.","isBasedOn":["https://papers.ssrn.com/sol3/papers.cfm?abstract_id=223323","https://ledoit.net/honey_abstract.htm","https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1748633","https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1881731","https://aeron.io/docs/aeron/overview/"]}</script>
  ${sharedStyle}
</article>`;

export const riskFrameworkRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'risk-framework-crypto-bots-r1',
    slug: 'risk-freymvork-dlya-kripto-botov',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'HISTORICAL_REVERIFY_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REPAIR_RISK_FRAMEWORK_EVIDENCE_R1.md',
    articleHtml: riskFrameworkArticle,
    requiredMarkers: [
      'data-public-guide-repair="risk-framework-crypto-bots-r1"',
      'YMYL_TRADING_REVIEW_REQUIRED',
      'HISTORICAL_REVERIFY_REQUIRED',
      'Conditional Drawdown at Risk',
      'Covariance shrinkage',
      'Specification ≠ implementation ≠ production qualification',
      'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=223323',
      'https://ledoit.net/honey_abstract.htm',
      'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1748633',
      'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1881731',
      'https://aeron.io/docs/aeron/overview/'
    ],
    forbiddenPatterns: [
      { label: 'legacy microsecond universal threshold', pattern: /20\s*[–-]\s*50\s*(?:microseconds|микросекунд)/iu },
      { label: 'legacy universal restart trade count', pattern: /30\s+(?:virtual|shadow|виртуальн\w*)\s+trades?/iu },
      { label: 'legacy fixed staged reentry', pattern: /25%[\s\S]{0,80}50%[\s\S]{0,80}75%[\s\S]{0,80}100%/iu },
      { label: 'legacy fleet-size boundary', pattern: /100\+\s*bots?/iu },
      { label: 'institutional-standard overclaim', pattern: /2026\s+institutional\s+standard/iu },
      { label: 'mandatory Aeron overclaim', pattern: /Aeron\s+(?:is\s+)?(?:mandatory|required|the only)/iu },
      { label: 'deployed-risk-engine overclaim', pattern: /risk\s+engine\s+(?:is\s+)?deployed/iu },
      { label: 'universal daily drawdown band', pattern: /daily\s+drawdown[\s\S]{0,40}3\s*[–-]\s*5%/iu },
      { label: 'universal weekly drawdown band', pattern: /weekly\s+drawdown[\s\S]{0,40}6\s*[–-]\s*8%/iu },
      { label: 'universal monthly drawdown band', pattern: /monthly\s+drawdown[\s\S]{0,40}10\s*[–-]\s*12%/iu }
    ]
  }
];
