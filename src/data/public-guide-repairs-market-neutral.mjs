const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-table{width:100%;border-collapse:collapse;margin-top:12px}.public-repair-table th,.public-repair-table td{border:1px solid var(--line);padding:10px;vertical-align:top;text-align:left}.public-repair-table th{font:800 .62rem var(--font-mono);color:var(--ink)}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}.public-repair-table{font-size:.82rem}}
</style>`;

const articleHtml = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="market-neutral-latest-verdict-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · LATEST-VERDICT BOUND · YMYL</div>
      <h1>Рыночно-нейтральные криптостратегии 2026</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-28</span>
        <span>YMYL_TRADING_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Рыночная нейтральность описывает цель по направленной экспозиции, а не доказательство прибыли. Эта редакция сохраняет полезную исследовательскую таксономию, но подчиняет её более позднему evidence: отклонённые family-гипотезы остаются отклонёнными, collector-only гипотезы остаются research-only, а методы не становятся live-стратегиями без отдельного out-of-sample и forward подтверждения.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="mn-status">
      <h2 id="mn-status">1. Последний verdict важнее восстановленного описания</h2>
      <table class="public-repair-table">
        <thead><tr><th>Family</th><th>Допустимый публичный статус</th><th>Что это означает</th></tr></thead>
        <tbody>
          <tr><td><code>BASIS_SHOCK_REVERSION</code></td><td>TRAIN_GATE_REJECT</td><td>Не продвигать как текущий edge; validation/OOS не открывались после провала train gate.</td></tr>
          <tr><td><code>BASIS_SHOCK_FUNDING_ALIGNMENT</code>, <code>BASIS_FUNDING_CARRY</code>, <code>BASIS_DISPERSION_REVERSION</code></td><td>REJECTED / NOT PROMOTED</td><td>Сохранять только как исторические research families, не как рекомендации.</td></tr>
          <tr><td><code>CROSS_ASSET_RESIDUAL_REVERSION</code></td><td>REJECTED / NOT PROMOTED</td><td>Pairs/residual идеи требуют нового evidence, а не переноса старого статуса.</td></tr>
          <tr><td>Funding lead/lag</td><td>COLLECTOR_ONLY_HYPOTHESIS</td><td>Качество сбора и временного выравнивания данных не доказывает предиктивный edge.</td></tr>
        </tbody>
      </table>
    </section>

    <section class="public-repair-card" aria-labelledby="mn-mechanics">
      <h2 id="mn-mechanics">2. Что можно изучать без обещаний результата</h2>
      <ul>
        <li><strong>Basis / carry:</strong> разница между spot и derivative pricing может измеряться, но её экономическая пригодность зависит от конкретного venue, продукта, funding, borrow, collateral, margin и всех издержек исполнения.</li>
        <li><strong>Funding convergence:</strong> различия ставок можно исследовать как временной ряд. Устойчивость спреда, синхронизация начислений и возможность нейтрального исполнения должны проверяться отдельно.</li>
        <li><strong>Pairs / cointegration:</strong> стационарность спреда является гипотезой, которая может ломаться при смене режима. Kalman-style state estimation, VECM и другие модели — инструменты исследования, а не свидетельство живого edge.</li>
        <li><strong>DRL / PPO / LSTM:</strong> допустимы как candidate methods только после сравнения с простыми baselines, полного учёта costs и независимого OOS. Сложность модели сама по себе не является доказательством улучшения.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="mn-risk">
      <h2 id="mn-risk">3. delta-neutral не означает risk-neutral</h2>
      <p>Снижение направленной beta не устраняет basis risk, funding-rate risk, execution/slippage, liquidity, margin/liquidation, venue/counterparty, model, data и operational risk. Разные legs могут переоцениваться и исполняться несинхронно, а условия collateral и funding могут меняться быстрее, чем стратегия успеет восстановить нейтральность.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="mn-evidence">
      <h2 id="mn-evidence">4. Каким должен быть evidence до promotion</h2>
      <ul>
        <li>immutable dataset identity и точные venue/product/time boundaries;</li>
        <li>all-in costs: fees, spread, slippage, funding, borrow, market impact и failure assumptions;</li>
        <li>отдельные train, validation и untouched OOS периоды;</li>
        <li>stability checks по режимам, размерам позиции и cost stress;</li>
        <li>простые baselines до сложных ML/DRL overlays;</li>
        <li>независимый forward/paper receipt до любого разговора о runtime promotion;</li>
        <li>отдельная owner authority для любой live execution или capital effect.</li>
      </ul>
      <p>Если family провалила train gate, закрытые validation/OOS не открываются только ради поиска положительного результата. Если collector исправен, это подтверждает data path, а не торговую гипотезу.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="mn-venues">
      <h2 id="mn-venues">5. Venue и product mechanics нужно датировать</h2>
      <p>Funding cadence, fee tiers, margin rules, collateral eligibility, API behavior, throughput и product availability являются изменяемым vendor state. Они проверяются по первичным документам площадки на дату исследования и не превращаются в универсальные константы статьи.</p>
      <p>Outcome markets и другие новые инструменты можно рассматривать как отдельные legs с собственными settlement, liquidity, oracle и basis risks. Само наличие продукта не доказывает межрыночную неэффективность.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="mn-use">
      <h2 id="mn-use">6. Допустимая область использования</h2>
      <p>Используйте страницу как research checklist: сформулировать family, определить neutralization target, собрать venue-specific данные, посчитать полный cost stack, провести train gate и только затем решать, заслуживает ли гипотеза validation/OOS.</p>
      <p><strong>Эта страница не является торговым разрешением и не задаёт live entry, exit, leverage, position size, deployment или движение капитала.</strong></p>
    </section>

    <aside class="public-repair-boundary">
      <strong>REVIEW BOUNDARY</strong>
      <span>Исправление публичной копии фиксирует latest-verdict propagation и убирает promotion drift. Оно не сертифицирует funding, basis, pairs, DRL, outcome-market или liquidation-related family как прибыльную или текущую.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Рыночно-нейтральные криптостратегии 2026","dateModified":"2026-08-28","description":"Evidence-bound research taxonomy for market-neutral crypto strategies with rejected and research-only states preserved."}</script>
  ${sharedStyle}
</article>`;

export const marketNeutralRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'market-neutral-latest-verdict-r1',
    slug: 'rynochno-neytralnye-kriptostrategii-2026',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVERIFY_REMAINS',
    expectedReviewStatus: 'YMYL_TRADING_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    expectedYmyl: true,
    evidenceDoc: 'docs/CONTENT_CLAIM_REVIEW_MARKET_NEUTRAL_R1.md',
    articleHtml,
    requiredMarkers: [
      'data-public-guide-repair="market-neutral-latest-verdict-r1"',
      'TRAIN_GATE_REJECT',
      'COLLECTOR_ONLY_HYPOTHESIS',
      'delta-neutral не означает risk-neutral',
      'независимый forward/paper receipt',
      'Эта страница не является торговым разрешением'
    ],
    ymylBoundaryMarkers: [
      'delta-neutral не означает risk-neutral',
      'Эта страница не является торговым разрешением'
    ],
    forbiddenPatterns: [
      { label: 'legacy institutional-share claim', pattern: /44\s*%/iu },
      { label: 'legacy market-neutral return', pattern: /14\.4\s*%/iu },
      { label: 'legacy quant-index return', pattern: /31\.23\s*%/iu },
      { label: 'legacy top-strategy return', pattern: /66\.69\s*%/iu },
      { label: 'legacy Sharpe claim', pattern: /Sharpe\s*2\.39/iu },
      { label: 'legacy Sortino claim', pattern: /Sortino\s*4\.51/iu },
      { label: 'legacy alt funding return', pattern: /115\.9\s*%/iu },
      { label: 'legacy exact Granger certainty', pattern: /(?:100\s*%|ровно\s+ноль)[\s\S]{0,80}(?:Granger|Грейнджер|causality|причинност)/iu },
      { label: 'legacy panic-gap promotion', pattern: /Panic\s+Gap/iu },
      { label: 'legacy provider price', pattern: /\$\s*(?:599|1,?000)\s*\/\s*(?:month|мес)/iu },
      { label: 'legacy mandatory DRL framing', pattern: /(?:требу\w*|обязатель\w*)[\s\S]{0,100}(?:DRL|PPO|LSTM)/iu },
      { label: 'legacy positive-expectancy promotion', pattern: /(?:положительн\w*\s+математическ\w*\s+ожидан|positive\s+expectancy)/iu },
      { label: 'legacy high edge ranking', pattern: /(?:Очень\s+высокая|Высокая)[\s\S]{0,80}(?:edge|экспектанси|живость)/iu }
    ]
  }
];
