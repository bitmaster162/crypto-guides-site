const sharedStyle = `<style>
  .public-repair-page{padding:40px 0 60px}.public-repair-container{max-width:860px}.public-repair-header{margin-bottom:26px}.public-repair-kicker{font:800 .68rem var(--font-mono);letter-spacing:.1em;color:var(--gold);margin-bottom:10px}.public-repair-header h1{font-size:clamp(2rem,5vw,3.7rem);line-height:1.02;margin:0 0 14px}.public-repair-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.public-repair-meta span{border:1px solid var(--line);border-radius:999px;padding:4px 8px;font:700 .58rem var(--font-mono);color:var(--muted)}.public-repair-lead{font-size:1.05rem;color:var(--muted);line-height:1.65}.public-repair-card{margin:14px 0;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--paper-soft)}.public-repair-card h2{margin:0 0 10px;font-size:1.08rem}.public-repair-card p,.public-repair-card li{color:var(--muted);line-height:1.65}.public-repair-card li+li{margin-top:8px}.public-repair-card code{font-family:var(--font-mono);color:var(--ink)}.public-repair-sources a{color:var(--blue);font-weight:700}.public-repair-boundary{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px 18px;border:1px solid rgba(255,178,46,.4);border-radius:var(--radius);background:rgba(255,178,46,.05)}.public-repair-boundary strong{color:var(--gold);font:800 .68rem var(--font-mono)}.public-repair-boundary span{color:var(--muted);font-size:.82rem}@media(max-width:620px){.public-repair-page{padding-top:28px}.public-repair-card{padding:16px}}
</style>`;

const teeAgentSecretsArticle = String.raw`<article class="article-page public-repair-page" data-public-guide-repair="tee-agent-secrets-security-r1" data-repair-state="BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS">
  <div class="container public-repair-container">
    <header class="public-repair-header">
      <div class="public-repair-kicker">PUBLIC REPAIR · SECURITY ARCHITECTURE</div>
      <h1>TEE и threshold cryptography для agent secrets: defense in depth, а не гарантия</h1>
      <div class="public-repair-meta">
        <span>Публичная редакция: 2026-08-15</span>
        <span>SECURITY_SAFETY_REVIEW_REQUIRED</span>
        <span>REVIEW_REQUIRED</span>
      </div>
      <p class="public-repair-lead">Изоляция signing logic от LLM context и распределение cryptographic trust между несколькими участниками могут существенно уменьшить blast radius. Но TEE, attestation и threshold cryptography не доказывают корректность policy, приложения или операционной схемы и не делают автономного агента compromise-proof.</p>
    </header>

    <section class="public-repair-card" aria-labelledby="tee-isolation">
      <h2 id="tee-isolation">Что реально даёт enclave isolation</h2>
      <p>AWS Nitro Enclaves документирует отдельное изолированное execution environment: enclave получает выделенные CPU/memory, не имеет persistent storage, SSH или внешней сети и взаимодействует с parent instance через local vsock. Это сильная граница для уменьшения прямого доступа host-процессов к чувствительному коду и данным.</p>
      <p>Эта граница не доказывает, что код внутри enclave безопасен, что входные данные корректны или что policy вокруг signing operation соответствует намерению оператора.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="tee-attestation">
      <h2 id="tee-attestation">Attestation проверяет измерения, а не бизнес-намерение</h2>
      <p>Nitro Enclaves может выпускать подписанный attestation document с measurements enclave. AWS KMS позволяет использовать эти measurements в policy conditions и выдавать cryptographic operation только разрешённому enclave image/state.</p>
      <p>Это позволяет строить rule вида «этот ключ доступен только конкретно измеренному enclave». Но attestation не является доказательством того, что high-level trading, transfer или approval logic безошибочна. Measurement identity и behavioral correctness — разные свойства.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="tee-threshold">
      <h2 id="tee-threshold">Threshold cryptography распределяет trust</h2>
      <p>NIST описывает threshold schemes, где secret key разделён между несколькими parties, а signing/decryption/key-generation выполняются распределённо без необходимости собирать полный ключ в одном месте. При подходящей security model это уменьшает риск единой точки компрометации.</p>
      <p>Конкретный threshold, число participants, fault/corruption assumptions, независимость operators, recovery и share rotation должны следовать из threat model и выбранного cryptographic scheme. Один фиксированный quorum не является универсальным secure default.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="tee-policy">
      <h2 id="tee-policy">Policy controls полезны только как проверяемый contract</h2>
      <ul>
        <li>destination allowlists, value/risk caps и operator approval могут ограничивать последствия ошибочного или вредоносного запроса;</li>
        <li>policy evaluation должна находиться вне недоверенного LLM decision path и быть детерминированно тестируемой;</li>
        <li>deny/unknown состояния должны fail closed;</li>
        <li>credential access, key use и authorization transition должны давать audit/effect receipt;</li>
        <li>recovery и revocation должны тестироваться отдельно, включая compromised participant, stale policy и unavailable enclave cases.</li>
      </ul>
      <p>Конкретные exchange destinations, денежные лимиты и quorum values являются implementation-specific policy, а не стандартом этой страницы.</p>
    </section>

    <section class="public-repair-card" aria-labelledby="tee-threats">
      <h2 id="tee-threats">Что остаётся в threat model</h2>
      <p>Defense-in-depth architecture всё ещё должна учитывать ошибки enclave application, supply-chain/build provenance, ошибочную KMS/access policy, compromised threshold participants, weak participant independence, malicious or ambiguous inputs, replay/state synchronization, recovery-path abuse, side-channel/platform assumptions и неправильное соединение policy decision с реальным effect.</p>
      <p>Prompt injection — только один класс входного риска. Защита секретов не равна доказательству безопасности всех действий агента.</p>
    </section>

    <section class="public-repair-card public-repair-sources" aria-labelledby="tee-sources">
      <h2 id="tee-sources">Первичные источники, проверено 2026-08-15</h2>
      <ul>
        <li><a href="https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-concepts.html" rel="noreferrer">AWS Nitro Enclaves · Concepts</a> — isolation, no external networking/persistent storage, vsock and measurements.</li>
        <li><a href="https://docs.aws.amazon.com/enclaves/latest/user/set-up-attestation.html" rel="noreferrer">AWS Nitro Enclaves · Cryptographic attestation</a> — signed measurements and external/KMS access policy.</li>
        <li><a href="https://docs.aws.amazon.com/enclaves/latest/user/connect-enclave-kms.html" rel="noreferrer">AWS Nitro Enclaves · KMS attestation and secrets management</a> — secrets gated to validated enclave measurements.</li>
        <li><a href="https://csrc.nist.gov/pubs/ir/8214/c/final" rel="noreferrer">NIST IR 8214C · Multi-Party Threshold Schemes</a> — distributed cryptographic primitives with secret-shared keys.</li>
        <li><a href="https://csrc.nist.gov/Projects/threshold-cryptography" rel="noreferrer">NIST Multi-Party Threshold Cryptography</a> — distribution of trust, secret sharing and threshold operations.</li>
      </ul>
    </section>

    <section class="public-repair-card" aria-labelledby="tee-use">
      <h2 id="tee-use">Допустимая область использования</h2>
      <p>Используйте страницу как security-design checklist: определить assets и threat model, отделить untrusted model context от signing authority, выбрать attested execution boundary, спроектировать threshold/fault assumptions, deterministic policy gates, revocation/recovery и auditable effect receipts.</p>
      <p><strong>Эта страница не является разрешением на создание или использование exchange credentials, private keys, подписывание транзакций, отправку ордеров, перевод средств или изменение runtime.</strong></p>
    </section>

    <aside class="public-repair-boundary">
      <strong>SECURITY BOUNDARY</strong>
      <span>This security architecture is defense in depth, not compromise-proof authority. No deployed enclave, MPC signer, whitelist, key custody, revocation path or transaction policy is proven by this public guide.</span>
    </aside>
  </div>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"TEE and threshold cryptography for agent secrets: bounded security repair","dateModified":"2026-08-15","description":"Defense-in-depth use of enclave isolation, attestation and threshold cryptography without universal transaction limits or compromise-proof claims.","isBasedOn":["https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-concepts.html","https://docs.aws.amazon.com/enclaves/latest/user/set-up-attestation.html","https://docs.aws.amazon.com/enclaves/latest/user/connect-enclave-kms.html","https://csrc.nist.gov/pubs/ir/8214/c/final","https://csrc.nist.gov/Projects/threshold-cryptography"]}</script>
  ${sharedStyle}
</article>`;

export const securityRepairs = [
  {
    schema: 'crypto-guides.public-guide-repair.v1',
    repairId: 'tee-agent-secrets-security-r1',
    slug: 'tee-agent-secrets',
    state: 'BOUNDED_PUBLIC_COPY_REPAIRED_REVIEW_REMAINS',
    expectedReviewStatus: 'SECURITY_SAFETY_REVIEW_REQUIRED',
    expectedCurrentness: 'REVIEW_REQUIRED',
    evidenceDoc: 'docs/CONTENT_REPAIR_TEE_AGENT_SECRETS_EVIDENCE_R1.md',
    articleHtml: teeAgentSecretsArticle,
    requiredMarkers: [
      'data-public-guide-repair="tee-agent-secrets-security-r1"',
      'SECURITY_SAFETY_REVIEW_REQUIRED',
      'REVIEW_REQUIRED',
      'Attestation проверяет измерения, а не бизнес-намерение',
      'Threshold cryptography распределяет trust',
      'This security architecture is defense in depth, not compromise-proof authority.',
      'https://docs.aws.amazon.com/enclaves/latest/user/set-up-attestation.html',
      'https://csrc.nist.gov/pubs/ir/8214/c/final'
    ],
    forbiddenPatterns: [
      { label: 'compromise prevention guarantee', pattern: /над[её]жно\s+предотвращает[\s\S]{0,100}компромет/iu },
      { label: 'transaction guarantee', pattern: /гарантирует\s+совершение\s+сделок/iu },
      { label: 'legacy key shares constant', pattern: /key_shares_required/iu },
      { label: 'legacy total shares constant', pattern: /total_key_shares/iu },
      { label: 'legacy transaction cap constant', pattern: /max_single_tx_usd/iu },
      { label: 'legacy allowlist constant', pattern: /allowed_destinations/iu },
      { label: 'legacy fixed 500 USD limit', pattern: /500(?:\.0)?\s*USD/iu },
      { label: 'legacy Binance allowlist endpoint', pattern: /fapi\.binance\.com/iu },
      { label: 'legacy implemented revoke command', pattern: /revoke_session_keys/iu },
      { label: 'legacy fixed quorum example as policy', pattern: /(?:2\s+из\s+3|2-of-3)[\s\S]{0,100}(?:требует|обязат|default|лимит|policy)/iu },
      { label: 'compromise-proof overclaim', pattern: /(?:невзламываем|compromise[- ]?proof|полностью\s+защищ)/iu }
    ]
  }
];
