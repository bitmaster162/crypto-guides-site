const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-table{width:100%;border-collapse:collapse;margin-top:12px}.public-repair-table th,.public-repair-table td{border:1px solid var(--line);padding:10px;vertical-align:top;text-align:left}.public-repair-table th{font:800 .62rem var(--font-mono);color:var(--ink)}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}.public-repair-table{font-size:.82rem}}
</style>`;

const articleHtml = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="execution-simulation-research-boundary-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · RESEARCH BOUNDARY · YMYL</div>
      <h1>Симуляция исполнения криптостратегий: исследовательские допущения и проверка расхождений</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-28</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Execution simulation помогает проверять, насколько результат стратегии зависит от идеализированных fills, очереди, задержек и издержек. Но historical replay не доказывает собственный market impact и не превращает research candidate в готовую live-реализацию. Каждое допущение должно быть явно задано, откалибровано и проверено на независимых наблюдениях.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="es-boundary">
      <h2 id="es-boundary">1. RESEARCH_CANDIDATE_NOT_IMPLEMENTATION_GUIDANCE</h2>
      <p><strong>Эта страница не является торговым разрешением.</strong> Она описывает методологию исследования execution realism, а не production blueprint, runtime-конфигурацию, deployment plan или capital instruction. Прохождение simulator-а не доказывает прибыльность, currentness, безопасность или готовность стратегии к live.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="es-replay">
      <h2 id="es-replay">2. historical replay cannot prove own market impact</h2>
      <ul>
        <li><strong>Partial fills и queue position:</strong> при агрегированных L2-данных реальная позиция собственного лимитного ордера обычно неизвестна, поэтому fill logic является model assumption.</li>
        <li><strong>Own market impact:</strong> исторический поток уже произошёл без нашего контрфактического ордера. Replay не может автоматически доказать, как рынок изменился бы из-за нашей заявки.</li>
        <li><strong>Latency:</strong> feed/order latency следует измерять на конкретном data/execution path или задавать как явный stress distribution; переносить фиксированные географические числа между системами нельзя.</li>
        <li><strong>Fees/funding/margin:</strong> это venue/account/product state. Для исследования их фиксируют на дату и scope, а не объявляют постоянными параметрами.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="es-models">
      <h2 id="es-models">3. Модели — кандидаты, а не универсальные правила</h2>
      <table class="public-repair-table">
        <thead><tr><th>Область</th><th>Допустимый статус</th><th>Проверка</th></tr></thead>
        <tbody>
          <tr><td>Queue model</td><td>MODEL_ASSUMPTION</td><td>Сравнивать альтернативные модели с наблюдаемыми fill/cancel результатами; не считать одну функцию или exponent универсальными.</td></tr>
          <tr><td>Market impact</td><td>EMPIRICAL_CANDIDATE_MODEL</td><td>Проверять sensitivity к размеру, liquidity, volatility и regime. Square-root form может быть baseline, но не гарантией.</td></tr>
          <tr><td>Adverse selection</td><td>DIAGNOSTIC_DEFINITION_REQUIRED</td><td>Явно задать post-fill horizon/benchmark и проверить устойчивость результата к альтернативным определениям.</td></tr>
          <tr><td>Latency model</td><td>PATH_SPECIFIC_INPUT</td><td>Предпочитать measured/historical distributions или explicit stress scenarios вместо фиксированной константы.</td></tr>
        </tbody>
      </table>
    </section>

    <section class="public-repair-card" aria-labelledby="es-tools">
      <h2 id="es-tools">4. Инструменты не являются доказательством fidelity</h2>
      <p>NautilusTrader, hftbacktest и другие event-driven/backtest frameworks можно использовать как исследовательские инструменты. Их наличие, скорость или набор fill models не доказывают, что конкретная конфигурация воспроизводит live execution. Выбор инструмента должен следовать из данных, требуемой granularity, воспроизводимости и измеримого discrepancy budget.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="es-validation">
      <h2 id="es-validation">5. calibrate against independent paper/live observations</h2>
      <ol>
        <li>Зафиксировать immutable dataset identity, venue/product/time scope и data granularity.</li>
        <li>Задать простую baseline fill/cost model до сложных queue/impact overlays.</li>
        <li>Явно записать latency, fee, funding, borrow, margin и rejection assumptions.</li>
        <li>Провести sensitivity/stress tests по fills, costs, latency и model parameters.</li>
        <li>Измерять implementation shortfall, fill-rate drift, adverse-fill diagnostics и заранее определённые discrepancies.</li>
        <li><strong>calibrate against independent paper/live observations</strong>, не используя live discrepancy для скрытого post-hoc подбора OOS результата.</li>
        <li>Если стратегия отбирается по simulation result, сохранять отдельные train, validation и untouched OOS boundaries.</li>
      </ol>
    </section>

    <section class="public-repair-card" aria-labelledby="es-promotion">
      <h2 id="es-promotion">6. Simulation PASS не равен promotion</h2>
      <p>Даже хорошо откалиброванный simulator остаётся моделью. Положительный результат означает только то, что стратегия пережила конкретный набор допущений и тестов. Для paper/live promotion нужны отдельные evidence receipts, независимый forward observation и отдельная owner authority.</p>
      <p><strong>no live execution or capital authority.</strong> Страница не задаёт entry, exit, leverage, position size, deployment, cloud migration, venue selection или движение капитала.</p>
    </section>

    <aside class="public-repair-boundary">
      <strong>REVIEW BOUNDARY</strong>
      <span>Публичная копия сохраняет execution-simulation methodology, но удаляет fixed implementation constants и live-readiness promotion. primarySourceRequired=true; currentness остаётся REVIEW_REQUIRED.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Симуляция исполнения криптостратегий: исследовательские допущения и проверка расхождений","dateModified":"2026-08-28","description":"Research-only execution simulation methodology with explicit model limitations, calibration and no live authority."}</script>
  ${sharedStyle}
</article>`;

export const executionSimulationRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'execution-simulation-research-boundary-r1',
    slug: 'simulyatsiya-ispolneniya-kripto-strategiy',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    expectedYmyl: true,
    evidenceDoc: 'docs/CONTENT_CLAIM_REVIEW_EXECUTION_SIMULATION_R1.md',
    articleHtml,
    requiredMarkers: [
      'data-public-guide-repair="execution-simulation-research-boundary-r1"',
      'RESEARCH_CANDIDATE_NOT_IMPLEMENTATION_GUIDANCE',
      'historical replay cannot prove own market impact',
      'calibrate against independent paper/live observations',
      'no live execution or capital authority',
      'Эта страница не является торговым разрешением'
    ],
    ymylBoundaryMarkers: [
      'RESEARCH_CANDIDATE_NOT_IMPLEMENTATION_GUIDANCE',
      'Эта страница не является торговым разрешением',
      'no live execution or capital authority'
    ],
    forbiddenPatterns: [
      { label: 'legacy fixed order latency', pattern: /order_latency\s*=\s*250\s*ms/iu },
      { label: 'legacy fixed feed latency', pattern: /feed_latency\s*=\s*150\s*ms/iu },
      { label: 'legacy universal queue choice', pattern: /PowerProbQueueModel/iu },
      { label: 'legacy universal VPIN threshold', pattern: /VPIN\s*>\s*0\.90/iu },
      { label: 'legacy universal adverse-fill window', pattern: /100\s*[–-]\s*500\s*ms/iu },
      { label: 'legacy guaranteed impact correction', pattern: /(?:гарантирован\w*|guarantee\w*)[\s\S]{0,100}(?:PnL|impact|square-root)/iu },
      { label: 'legacy exact performance claim WR', pattern: /WR\s*47\s*%/iu },
      { label: 'legacy exact performance claim AUC', pattern: /AUC\s*0\.845/iu },
      { label: 'legacy survivors promotion', pattern: /2\s*[–-]\s*3[\s\S]{0,40}(?:алгоритм|strateg)/iu },
      { label: 'legacy true predictive power', pattern: /true\s+predictive\s+power|истинн\w*\s+предиктивн\w*\s+сил/iu },
      { label: 'legacy live-ready promotion', pattern: /(?:ready|готов\w*)[\s\S]{0,50}(?:live|production)/iu },
      { label: 'legacy absolute Nautilus ranking', pattern: /NautilusTrader[\s\S]{0,60}(?:absolute|абсолютн\w*|best|лучш\w*)/iu },
      { label: 'legacy mandatory Tokyo migration', pattern: /(?:обязатель\w*|mandatory)[\s\S]{0,100}(?:Tokyo|Japan|Токио|Япони)/iu }
    ]
  }
];
