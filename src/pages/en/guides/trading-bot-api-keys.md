---
site: cryptoguidessite.vercel.app
slug: trading-bot-api-keys
path: /en/guides/trading-bot-api-keys
alternate: /guides/trading-bot-api-keys
lang: en
category: Security
title: "Trading Bot API Keys: Permissions, IP, Withdrawals and Kill Switch"
seo_title: "Bot API Keys: Permissions, IP, Kill Switch | Crypto Guides"
description: "Which permissions to give a trading bot API key, why to restrict it by IP, why a key without withdrawal rights is still risky and how to stop the bot."
reviewed: "2026-10-02"
next_review: "2027-01-02"
related: [https://bitevo.work/guides/before-write-access]
schema: [Article, BreadcrumbList]
research_source: "R177 (topic and checklist); exchange rules and cases checked against primary sources on 2 October 2026"
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
layout: ../../../layouts/EnglishReviewedGuideLayout.astro
toc: [{"title":"In brief","id":"in-brief"},{"title":"1. Permissions: read and trade, no withdrawals","id":"1-permissions-read-and-trade-no-withdrawals"},{"title":"2. IP allowlist","id":"2-ip-allowlist"},{"title":"3. Separate sub-account","id":"3-separate-sub-account"},{"title":"4. Where to store the key and when to rotate it","id":"4-where-to-store-the-key-and-when-to-rotate-it"},{"title":"5. Kill switch","id":"5-kill-switch"},{"title":"Pre-launch checklist","id":"pre-launch-checklist"},{"title":"What this guide is not","id":"what-this-guide-is-not"},{"title":"Sources","id":"sources"}]
---

Security · reviewed guide

# Trading bot API keys: permissions, IP, withdrawals and kill switch

A bot trades using an API key, not your password. The key is stored wherever the bot runs: on your server, laptop or at a third-party service. So the main question is not “is the bot trustworthy?”, but “what could someone who obtains the key do?”. Below are five rules and the steps to take if something goes wrong.

Checked 2 October 2026 · Next review 2 January 2027. Exchange rules are based on their documentation as of that date.

## In brief

1. Give the bot read and trading permissions only. It has no withdrawal rights.
2. Restrict the key to the IP address of the server running the bot.
3. Run the bot on a separate sub-account containing only the amount you are prepared to lose.
4. Do not store the key in code or send it in chats; set a date to rotate it.
5. Rehearse the kill switch in advance: know where to delete the key and cancel orders.

## 1. Permissions: read and trade, no withdrawals

You choose permissions when creating a key. A bot needs read and trading access to its market, whether spot or futures. It does not need withdrawal rights: do not enable them.

But a key without withdrawal rights is not automatically safe. With trading access to your funds, someone can buy anything, including an illiquid coin at an inflated price.

**Public case:** In March 2018, trades placed through Binance users’ API keys sold their assets and bought Viacoin. Within minutes, VIA’s market capitalisation rose from $64 million to $159 million. Binance halted withdrawals and said that the users confirmed as affected at that point were those who had registered API keys (for trading bots and other purposes), and that there was no sign the platform itself had been hacked. [TechCrunch](https://techcrunch.com/2018/03/07/bitcoin-price-drops-10-as-hackers-exploit-binances-api-keys/)

That is why an IP allowlist and a separate account matter even for a key with no withdrawal rights.

## 2. IP allowlist

A key restricted by an IP allowlist will not work from someone else’s computer, even if it is leaked. Major exchanges encourage IP restrictions through their rules:

| Exchange | Key without an IP allowlist | Withdrawal rights |
|---|---|---|
| Binance | A system-generated key (HMAC) without an IP restriction gets read-only access. For other permissions, use an IP restriction, your own Ed25519 or RSA key, or disable the default protection (do not disable it). | Only with an IP restriction |
| Bybit | Expires after 90 days; after an account password change, within 7 days. | Only for a main-account key |
| OKX | According to the announcement of 4 January 2023, keys with trading and withdrawal rights but no IP allowlist expire automatically after 14 days of inactivity. | — |

Sources: [Binance FAQ](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072) (updated 20 March 2025), Bybit API documentation — [create a key](https://bybit-exchange.github.io/docs/v5/user/create-subuid-apikey) and [key information](https://bybit-exchange.github.io/docs/v5/user/apikey-info), and the [OKX announcement](https://www.acnnewswire.com/press-release/english/80244/).

If you have a dynamic IP address (common with home internet connections), the allowlist will keep breaking. Run a bot that uses an IP allowlist on a server with a static address. If a third-party service needs the key, add that service’s IP addresses from its documentation to the allowlist.

## 3. Separate sub-account

Keep the bot on a sub-account and transfer only its working funds there. The key then cannot access your main balance, and the loss from a bot error or a leaked key is limited to that amount.

On Bybit, a sub-account API key cannot be given withdrawal rights: according to the API documentation, only a main-account key can have them.

## 4. Where to store the key and when to rotate it

- **Only on the bot’s server.** Keep the secret in environment variables or a secrets manager. Not in code, not in a repository, not in screenshots and not in chats.
- **Use your own key instead of a system-generated one where possible.** Binance recommends Ed25519 keys and describes HMAC keys as deprecated. With Ed25519, you give the exchange only the public key and sign requests with the private key, which never leaves your server. [Binance documentation](https://developers.binance.com/docs/binance-spot-api-docs/faqs/api_key_types)
- **A separate key for each third-party service.** Your key is stored on that service’s servers. In December 2022, the trading-bot service 3Commas confirmed that files published online contained active users’ API keys. The company asked exchanges to revoke all keys associated with 3Commas and asked users to issue new ones. Before that, it had attributed users’ losses to phishing and infected applications. [BleepingComputer](https://www.bleepingcomputer.com/news/security/crypto-platform-3commas-admits-hackers-stole-api-keys/) Give such a service its own key with minimum permissions and the service’s IP allowlist. Delete it when you stop using the service.
- **Rotation.** Rotate keys every 60–90 days and delete unused ones. On Bybit, a key without an IP allowlist already expires after 90 days.

## 5. Kill switch

Before launch, write down these steps and test them once with a test key:

1. How to stop the bot: its process, service or the provider’s button.
2. Where to delete the key. A deleted key cannot sign any new requests.
3. Where to cancel all open orders and view positions in the exchange interface. Check orders that have already been placed separately.

If you suspect a leak, first delete the key, then cancel orders and check positions and account history. Create a new key only after you understand how the old one was leaked.

**For those who build their own bots.** Binance USDⓈ-M Futures offers automatic order cancellation (`countdownCancelAll`). Its documentation suggests setting a 120-second timer every 30 seconds: if the bot stops renewing it, all orders for that instrument are cancelled. [Binance documentation](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders) A similar Bybit feature (DCP) is available only to institutional clients according to its documentation. [Bybit documentation](https://bybit-exchange.github.io/docs/v5/order/dcp)

## Pre-launch checklist

| Item | Required state |
|---|---|
| Permissions | Read and trade; no withdrawals |
| IP | Key restricted to the bot server |
| Account | Sub-account with working funds only |
| Storage | Not in code or chats; rotation date recorded |
| Third-party service | Separate key and the service’s IPs; delete when no longer needed |
| Kill switch | Know where to delete the key and cancel orders; tested with a test key |

## What this guide is not

This is not financial advice or a security audit. Exchange rules change: check your exchange’s current settings and documentation before creating a key. Time limits and figures are based on the sources as of the review date.

## Sources

1. [Binance — How to Create API Keys on Binance](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072) (FAQ, updated 20 March 2025)
2. [Binance — API Key Types](https://developers.binance.com/docs/binance-spot-api-docs/faqs/api_key_types) (Spot API documentation)
3. [Binance — Auto-Cancel All Open Orders](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Auto-Cancel-All-Open-Orders) (USDⓈ-M Futures)
4. [Bybit — Create Sub UID API Key](https://bybit-exchange.github.io/docs/v5/user/create-subuid-apikey) (API v5)
5. [Bybit — Get API Key Information](https://bybit-exchange.github.io/docs/v5/user/apikey-info) (API v5)
6. [Bybit — Set Disconnect Cancel All](https://bybit-exchange.github.io/docs/v5/order/dcp) (API v5)
7. [OKX — API key protection announcement](https://www.acnnewswire.com/press-release/english/80244/) (4 January 2023)
8. [BleepingComputer — Crypto platform 3Commas admits hackers stole API keys](https://www.bleepingcomputer.com/news/security/crypto-platform-3commas-admits-hackers-stole-api-keys/) (29 December 2022)
9. [TechCrunch — Bitcoin price drops 10% as hackers exploit Binance's API keys](https://techcrunch.com/2018/03/07/bitcoin-price-drops-10-as-hackers-exploit-binances-api-keys/) (7 March 2018)

**Related:** [Before an AI agent gets write access: seven checks](https://bitevo.work/guides/before-write-access) — BitEvo
