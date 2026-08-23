const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

function strategyFailureArticle({ repairId, title }) {
  return String.raw`<article class="article-page public-repair-page" data-public-guide-repair="${repairId}" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · EVIDENCE-BOUND · YMYL</div>
      <h1>${title}</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Причины провала торговой стратегии нужно доказывать на воспроизводимом наборе сделок, а не названием эксперимента или крупным счётчиком на публичном сайте. Эта редакция сохраняет полезную механику проверки — издержки, payoff geometry, реальное включение фильтров и out-of-sample контроль — но не выдаёт старые Sovereign Arena счётчики за текущий dataset receipt.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="sf-costs">
      <h2 id="sf-costs">1. Издержки должны входить в expectancy</h2>
      <p>Стратегия может выглядеть прибыльной до учёта spread, commissions, slippage, funding и market impact. Правильная проверка сравнивает ожидаемое движение и payoff с фактическими all-in costs на конкретном инструменте, venue и размере позиции.</p>
      <p>Низкая номинальная цена монеты сама по себе не делает инструмент «мёртвым». Проблема возникает, когда ожидаемое преимущество после исполнения и издержек становится неположительным. Это измеряемое условие, а не универсальный список запрещённых тикеров.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="sf-geometry">
      <h2 id="sf-geometry">2. Win rate без payoff geometry ничего не доказывает</h2>
      <p>Базовая expectancy зависит от вероятностей и средних выигрышей/проигрышей после costs. При одинаковом среднем размере win и loss стратегия с win rate ниже половины действительно имеет отрицательную gross expectancy; при несимметричном payoff результат зависит от фактического распределения, а не от одного магического R:R.</p>
      <p>Поэтому фиксированный порог вроде «ниже 50% всегда нужен один конкретный R:R» не является универсальным правилом. Нужны эмпирические distributions, tail losses, execution costs и достаточная выборка.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="sf-wiring">
      <h2 id="sf-wiring">3. Индикатор существует только если влияет на decision path</h2>
      <p>Созданный feature, ML model или фильтр не улучшает систему, если его output не входит в реальное решение. Проверка должна связывать signal calculation → decision → order/paper-action → outcome и доказывать, что отключение или инверсия компонента меняет поведение ожидаемым образом.</p>
      <p>Это можно проверять ablation-тестами, decision traces и deterministic wiring assertions. Само наличие файла модели, импортированной функции или красивой панели — не evidence использования.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="sf-evidence">
      <h2 id="sf-evidence">Что должно сопровождать performance claim</h2>
      <ul>
        <li>immutable dataset identity или воспроизводимый export с hash/manifest;</li>
        <li>точный период, universe, venue/product и правила включения/исключения наблюдений;</li>
        <li>разделение backtest, paper/forward и real-money результатов;</li>
        <li>fees, spread, slippage, funding и failure assumptions;</li>
        <li>sample size, distribution и uncertainty, а не только итоговый процент;</li>
        <li>out-of-sample / walk-forward methodology и baselines;</li>
        <li>source/effect receipt, если утверждение касается реально работающего runtime.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="sf-arena">
      <h2 id="sf-arena">Что известно о текущем Sovereign Arena evidence</h2>
      <p>В этом репозитории существует отдельная failure-inclusive research page с небольшим backtest/forward-paper snapshot. Она явно отделяет paper research от real-money trading и показывает, что часть кандидатов не проходит собственный gate. Однако эта страница является source-defined snapshot, а не независимым raw dataset receipt, и не подтверждает старые крупные счётчики из восстановленных статей.</p>
      <p>Публичный Sovereign Arena landing page также менял отображаемые агрегаты со временем. Такие headline counters нельзя использовать как самостоятельное доказательство конкретной выборки или performance result без bound dataset/readback.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="sf-risk">
      <h2 id="sf-risk">Почему delta-neutral не означает risk-neutral</h2>
      <p>Даже стратегия с ограниченной directional exposure сохраняет execution, basis/funding, liquidity, margin/liquidation, model, data, venue/counterparty и operational risk. Анализ причин провала должен учитывать эти слои, а не сводить результат к одному индикатору или win rate.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="sf-use">
      <h2 id="sf-use">Допустимая область использования</h2>
      <p>Используйте страницу как checklist для аудита paper/backtest стратегии: измерить expectancy after costs, проверить payoff distribution, доказать wiring каждого фильтра, сравнить с baselines и провести out-of-sample validation. Числовые gates должны быть strategy-specific и иметь собственное evidence.</p>
      <p><strong>Эта страница не является торговым разрешением и не задаёт live entry, exit, leverage, position size или движение капитала.</strong></p>
    </section>

    <aside class="public-repair-boundary">
      <strong>REVIEW BOUNDARY</strong>
      <span>Исправление публичной копии не является сертификацией стратегии, performance dataset или Sovereign Arena runtime. Старые headline-счётчики и paper-trading выводы требуют отдельного воспроизводимого provenance evidence перед повторным использованием как текущих фактов.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Strategy failure methodology: evidence-bound public repair","dateModified":"2026-08-15","description":"Evidence requirements for trading-strategy failure analysis without unbound performance counters or runtime claims."}</script>
  ${sharedStyle}
</article>`;
}

export const strategyFailureRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'strategy-failure-methodology-ru-r1',
    slug: 'pochemu-strategii-teryayut-dengi',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REPAIR_STRATEGY_FAILURE_EVIDENCE_R1.md',
    articleHtml: strategyFailureArticle({ repairId: 'strategy-failure-methodology-ru-r1', title: 'Почему paper-trading стратегии теряют деньги: механика вместо headline-цифр' }),
    requiredMarkers: [
      'data-public-guide-repair="strategy-failure-methodology-ru-r1"',
      'YMYL_TRADING_REVIEW_REQUIRED',
      'REVIEW_REQUIRED',
      'immutable dataset identity',
      'expectancy after costs',
      'Индикатор существует только если влияет на decision path',
      'Исправление публичной копии не является сертификацией стратегии'
    ],
    forbiddenPatterns: sharedForbiddenPatterns()
  },
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'strategy-failure-methodology-alt-r1',
    slug: 'why-90-percent-strategies-lose',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REPAIR_STRATEGY_FAILURE_EVIDENCE_R1.md',
    articleHtml: strategyFailureArticle({ repairId: 'strategy-failure-methodology-alt-r1', title: 'Почему торговые стратегии ломаются: проверяем издержки, геометрию и wiring' }),
    requiredMarkers: [
      'data-public-guide-repair="strategy-failure-methodology-alt-r1"',
      'YMYL_TRADING_REVIEW_REQUIRED',
      'REVIEW_REQUIRED',
      'immutable dataset identity',
      'expectancy after costs',
      'Индикатор существует только если влияет на decision path',
      'Исправление публичной копии не является сертификацией стратегии'
    ],
    forbiddenPatterns: sharedForbiddenPatterns()
  }
];

function sharedForbiddenPatterns() {
  return [
    { label: 'unbound 66k trade count', pattern: /66\s*[,\s]?000\+?|66k/iu },
    { label: 'unbound 90-percent performance framing', pattern: /90\s*%/iu },
    { label: 'unbound live-trades proof', pattern: /(?:proven|доказан\w*)[\s\S]{0,80}(?:live|paper)[\s-]*(?:trades|сдел)/iu },
    { label: 'unbound bot count', pattern: /150\+\s*(?:bots?|бот)/iu },
    { label: 'unbound hypothesis survivor count', pattern: /(?:1|одн\w*)[\s\S]{0,80}(?:150)[\s\S]{0,80}(?:hypoth|гипотез)/iu },
    { label: 'raw Sovereign Arena IP', pattern: /34\.70\.171\.152/iu },
    { label: 'raw Arena HTTP endpoint', pattern: /http:\/\/[^\s"'<]+\/api\/arena/iu },
    { label: 'universal minimum trade threshold', pattern: /(?:min(?:imum)?|минимум)[_\s-]*(?:sample[_\s-]*)?(?:trades?|сделок)[\s:=]{0,4}100\b/iu },
    { label: 'universal minimum day threshold', pattern: /(?:min(?:imum)?|минимум)[_\s-]*(?:distinct[_\s-]*)?(?:days?|дней)[\s:=]{0,4}10\b/iu },
    { label: 'universal three-regime threshold', pattern: /(?:min(?:imum)?|минимум)[_\s-]*(?:regimes?|markets?|режим\w*|рынк\w*)[\s:=]{0,4}3\b/iu },
    { label: 'universal rr 2.5 rule', pattern: /(?:R:?R|RR)[\s\S]{0,40}(?:2\.5|1\s*:\s*2\.5)/iu },
    { label: 'guaranteed loss wording', pattern: /гарантир(?:ует|ован)[\s\S]{0,40}(?:слив|убыт|отрицатель)/iu }
  ];
}
