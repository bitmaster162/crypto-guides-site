---
site: cryptoguidessite.vercel.app
slug: trading-bot-api-keys
path: /guides/trading-bot-api-keys
lang: ru
category: Security
title: "API-ключи торгового бота: права, IP, вывод, стоп-кран"
seo_title: "API-ключ торгового бота: права, IP, стоп-кран | Crypto Guides"
description: "Какие права давать API-ключу бота, зачем привязка к IP, почему ключ без права вывода тоже опасен и как остановить бота. По документации Binance, Bybit и OKX."
reviewed: "2026-10-02"
next_review: "2027-01-02"
related: [https://bitevo.work/ru/guides/before-write-access]
schema: [Article, BreadcrumbList]
research_source: "R177 (тема и чек-лист); правила бирж и случаи — по первоисточникам, сверено 02.10.2026"
sources:
  - title: "Binance — How to Create API Keys on Binance (FAQ, обновлено 20.03.2025)"
    url: https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072
  - title: "Binance — API Key Types (документация Spot API)"
    url: https://developers.binance.com/docs/binance-spot-api-docs/faqs/api_key_types
  - title: "Binance — Auto-Cancel All Open Orders (USDⓈ-M Futures)"
    url: https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders
  - title: "Bybit — Create Sub UID API Key (API v5)"
    url: https://bybit-exchange.github.io/docs/v5/user/create-subuid-apikey
  - title: "Bybit — Get API Key Information (API v5)"
    url: https://bybit-exchange.github.io/docs/v5/user/apikey-info
  - title: "Bybit — Set Disconnect Cancel All (DCP, API v5)"
    url: https://bybit-exchange.github.io/docs/v5/order/dcp
  - title: "OKX — объявление о защите API-ключей (04.01.2023)"
    url: https://www.acnnewswire.com/press-release/english/80244/
  - title: "BleepingComputer — Crypto platform 3Commas admits hackers stole API keys (29.12.2022)"
    url: https://www.bleepingcomputer.com/news/security/crypto-platform-3commas-admits-hackers-stole-api-keys/
  - title: "TechCrunch — Bitcoin price drops 10% as hackers exploit Binance's API keys (07.03.2018)"
    url: https://techcrunch.com/2018/03/07/bitcoin-price-drops-10-as-hackers-exploit-binances-api-keys/
layout: ../../layouts/ReviewedGuideLayout.astro
toc: [{"title":"Коротко","id":"коротко"},{"title":"1. Права: чтение и торговля, без вывода","id":"1-права-чтение-и-торговля-без-вывода"},{"title":"2. Привязка к IP","id":"2-привязка-к-ip"},{"title":"3. Отдельный суб-аккаунт","id":"3-отдельный-суб-аккаунт"},{"title":"4. Где хранить ключ и когда менять","id":"4-где-хранить-ключ-и-когда-менять"},{"title":"5. Стоп-кран","id":"5-стоп-кран"},{"title":"Чек-лист перед запуском","id":"чек-лист-перед-запуском"},{"title":"Чем этот гайд не является","id":"чем-этот-гайд-не-является"},{"title":"Источники","id":"источники"}]
---

Безопасность · проверенный гайд

# API-ключи торгового бота: права, IP, вывод, стоп-кран

Бот торгует через API-ключ, а не через ваш пароль. Ключ лежит там, где работает бот: на вашем сервере, ноутбуке или у стороннего сервиса. Поэтому главный вопрос не «надёжен ли бот», а «что сможет сделать тот, кто получит ключ». Ниже — пять правил и порядок действий, если что-то пошло не так.

Проверено 2 октября 2026 · следующий пересмотр 2 января 2027. Правила бирж — по их документации на эту дату.

## Коротко

1. Права — только чтение и торговля. Права вывода у бота нет.
2. Ключ привязан к IP сервера, на котором работает бот.
3. Бот торгует на отдельном суб-аккаунте, где лежит только сумма, которую вы готовы потерять.
4. Ключ не лежит в коде и не пересылается в чатах; у него есть дата замены.
5. Стоп-кран отработан заранее: вы знаете, где удалить ключ и отменить ордера.

## 1. Права: чтение и торговля, без вывода

Права выбирают при создании ключа. Боту нужны чтение и торговля на своём рынке — споте или фьючерсах. Право вывода ему не нужно: не включайте его.

Но ключ без права вывода ещё не безопасен. С правом торговли на ваши деньги можно купить что угодно — в том числе неликвидную монету по завышенной цене.

**Публичный случай:** в марте 2018 года через API-ключи пользователей Binance выставили продажи их активов и скупили Viacoin: за минуты капитализация VIA выросла с 64 до 159 млн долларов. Binance остановила вывод и заявила, что на тот момент подтверждённые пострадавшие — пользователи, которые регистрировали API-ключи (для торговых ботов и не только), а признаков взлома самой платформы нет. [TechCrunch](https://techcrunch.com/2018/03/07/bitcoin-price-drops-10-as-hackers-exploit-binances-api-keys/)

Поэтому ограничения по IP и отдельный счёт нужны даже ключу без права вывода.

## 2. Привязка к IP

Ключ с белым списком IP не сработает с чужого компьютера, даже если утечёт. Крупные биржи подталкивают к привязке своими правилами:

| Биржа | Ключ без привязки к IP | Право вывода |
|---|---|---|
| Binance | Системный ключ (HMAC) без ограничения по IP получает только чтение. Для других прав — ограничение по IP, собственный ключ Ed25519 или RSA, либо отключение защиты по умолчанию (не отключайте) | Только с ограничением по IP |
| Bybit | Перестаёт действовать через 90 дней; после смены пароля аккаунта — через 7 дней | Только у ключа основного аккаунта |
| OKX | По объявлению от 4 января 2023 года ключи с правами торговли и вывода без привязки к IP автоматически истекают после 14 дней без активности | — |

Источники: [FAQ Binance](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072) (обновлено 20.03.2025), документация API Bybit — [создание ключа](https://bybit-exchange.github.io/docs/v5/user/create-subuid-apikey) и [сведения о ключе](https://bybit-exchange.github.io/docs/v5/user/apikey-info), [объявление OKX](https://www.acnnewswire.com/press-release/english/80244/).

Если у вас динамический IP (так часто бывает у домашнего интернета), привязка будет ломаться. Бота с привязкой по IP запускают на сервере со статическим адресом. Если ключ нужен стороннему сервису, впишите в белый список адреса этого сервиса из его документации.

## 3. Отдельный суб-аккаунт

Держите бота на суб-аккаунте и переводите туда только рабочую сумму. Основной баланс тогда ключу недоступен, а убыток от ошибки бота или утечки ограничен этой суммой.

На Bybit ключ суб-аккаунта не может получить право вывода: по документации API оно есть только у ключа основного аккаунта.

## 4. Где хранить ключ и когда менять

- **Только на сервере бота.** Секрет — в переменных окружения или в менеджере секретов. Не в коде, не в репозитории, не на скриншотах и не в переписке.
- **Свой ключ вместо системного, где можно.** Binance рекомендует ключи Ed25519, а ключи HMAC называет устаревшими. С Ed25519 вы отдаёте бирже только открытый ключ, а запросы подписываете закрытым, который не покидает ваш сервер. [Документация Binance](https://developers.binance.com/docs/binance-spot-api-docs/faqs/api_key_types)
- **Сторонний сервис — отдельный ключ.** Ваш ключ хранится на его серверах. В декабре 2022 года сервис торговых ботов 3Commas подтвердил, что в выложенных в сеть файлах — действующие API-ключи пользователей. Компания попросила биржи отозвать все ключи, связанные с 3Commas, а пользователей — выпустить новые; до этого она объясняла потери пользователей фишингом и заражёнными приложениями. [BleepingComputer](https://www.bleepingcomputer.com/news/security/crypto-platform-3commas-admits-hackers-stole-api-keys/) Давайте такому сервису отдельный ключ с минимальными правами и IP сервиса и удаляйте его, когда перестаёте пользоваться сервисом.
- **Замена.** Меняйте ключи раз в 60–90 дней, неиспользуемые удаляйте. На Bybit ключ без привязки к IP и так перестаёт работать через 90 дней.

## 5. Стоп-кран

До запуска запишите и один раз проверьте на тестовом ключе:

1. Как остановить бота: процесс, сервис или кнопку у провайдера.
2. Где удалить ключ. Удалённым ключом нельзя подписать ни один новый запрос.
3. Где отменить все открытые ордера и посмотреть позиции в интерфейсе биржи. Уже выставленные ордера проверяйте отдельно.

Если подозреваете утечку: сначала удалите ключ, потом отмените ордера и проверьте позиции и историю аккаунта. Новый ключ — только когда поняли, откуда утёк старый.

**Для тех, кто пишет бота сам.** На фьючерсах USDⓈ-M у Binance есть автоотмена ордеров (`countdownCancelAll`). Документация предлагает раз в 30 секунд ставить таймер на 120 секунд: если бот перестал его продлевать, все ордера по инструменту отменяются. [Документация Binance](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders) Похожая функция Bybit (DCP) по документации доступна только институциональным клиентам. [Документация Bybit](https://bybit-exchange.github.io/docs/v5/order/dcp)

## Чек-лист перед запуском

| Что | Как должно быть |
|---|---|
| Права | Чтение и торговля; вывода нет |
| IP | Ключ привязан к серверу бота |
| Счёт | Суб-аккаунт, на нём только рабочая сумма |
| Хранение | Не в коде и не в чатах; дата замены записана |
| Сторонний сервис | Отдельный ключ, IP сервиса; удалить, когда сервис больше не нужен |
| Стоп-кран | Знаю, где удалить ключ и отменить ордера; проверил на тестовом ключе |

## Чем этот гайд не является

Это не финансовая рекомендация и не аудит безопасности. Правила бирж меняются: перед созданием ключа сверяйтесь с текущими настройками и документацией своей биржи. Сроки и цифры приведены по источникам на дату проверки.

## Источники

1. [Binance — How to Create API Keys on Binance](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072) (FAQ, обновлено 20.03.2025)
2. [Binance — API Key Types](https://developers.binance.com/docs/binance-spot-api-docs/faqs/api_key_types) (документация Spot API)
3. [Binance — Auto-Cancel All Open Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders) (USDⓈ-M Futures)
4. [Bybit — Create Sub UID API Key](https://bybit-exchange.github.io/docs/v5/user/create-subuid-apikey) (API v5)
5. [Bybit — Get API Key Information](https://bybit-exchange.github.io/docs/v5/user/apikey-info) (API v5)
6. [Bybit — Set Disconnect Cancel All](https://bybit-exchange.github.io/docs/v5/order/dcp) (API v5)
7. [OKX — объявление о защите API-ключей](https://www.acnnewswire.com/press-release/english/80244/) (04.01.2023)
8. [BleepingComputer — Crypto platform 3Commas admits hackers stole API keys](https://www.bleepingcomputer.com/news/security/crypto-platform-3commas-admits-hackers-stole-api-keys/) (29.12.2022)
9. [TechCrunch — Bitcoin price drops 10% as hackers exploit Binance's API keys](https://techcrunch.com/2018/03/07/bitcoin-price-drops-10-as-hackers-exploit-binances-api-keys/) (07.03.2018)

**Связанное:** [Перед тем как дать AI-агенту право записи: семь проверок](https://bitevo.work/ru/guides/before-write-access) — BitEvo
