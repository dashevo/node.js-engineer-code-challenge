# Node.JS Engineer's Code Challenge

> Code challenge for Dash Core Team's candidates

The goal of the challenge is creating a browser application which receives,
validates and represent data from a user.

It takes too much time, so we've prepared [the application skeleton](application) for you.
It's not really browser application but we pretend that it is, right? ;)

In this skeleton you should implement just two actions:
  1. [Store action](application/actions/storeActionFactory.js), which should validate and persist
     [sample data](application/data.json) in external service(s)
  2. [Fetch action](application/actions/fetchActionFactory.js), which should retrieve data back
     and ensure its integrity

There are two types of external services available for you:
  1. **Peer-to-peer service** which hypothetically runs on users hosts. Let’s call it "P2P" service.
     Networking and storage will be cheap for you - **0.0001 DASH per byte**, but you can’t trust
     this service because a malicious user may spoof (modify) your data.
  2. **Self-hosted service** which runs on your server. Let’s call it "hosted" service.
     Networking and storage will be much expensive for you - **0.001 DASH per byte**, but data is
     located on your server, so you can trust it.

We provide `p2pFetch`, `hostedFetch` functions for both application's actions.
These functions are the wrappers around [whatwg fetch](https://fetch.spec.whatwg.org/),
which help us to calculate income and outcome traffic.

## Your mission

 - Implement external services as many as you need to persist sample data from the application
 - Validate and persist sample data in the external service(s)
 - Fetch sample data back and ensure its integrity. **When you fetch data back from untrusted service
   you should verify it for spoofing protection**
 - **Spent less money as much as possible**. Costs depends on size of request / response and elapsed time. 
   You may find the exact formula in [the application skeleton code](application/lib/calculateExpenses.js)
 - Write beautiful code. Code design (OOP, SOLID, 12factor) is always important for us

## Requirements

### External services
 - Services should be written in JavaScript and running with Node.JS
 - Services should be dockerized and starting with [docker compose](docker-compose.yml) in root directory
 - Data should be permanently persisted (be available after service restart). 
 
### Application
 - You should use `p2pFetch` for sending / getting data from P2P service
 - You should use `hostedFetch` for sending / getting data from hosted service
 - You can't store any data on application side

### Sample data validation rules

[Sample data](application/data.json) represents collection of various objects.
Each type of object has own validation rules.

#### User

- `id`
   - Format: `a-zA-Z0-1`
   - Length: `256`
- `username`
   - Format: `a-zA-Z0-1`
   - Length: `20` 
- `firstName`
   - Length: `20` 
- `lastName`
   - Length: `20`
- `email`
   - According to RFC

#### Payment

- `id`
   - Format: `a-zA-Z0-1`
   - Length: `256`
- `fromUserId`
   - Format: `a-zA-Z0-1`
   - Length: `256`
- `merchantId`
   - Format: `a-zA-Z0-1`
   - Length: `256`
- `amount`
   - Format: float number
   - Not equal or less than `0`
- `createdAt`
   - Format: Date ISO 8601

#### Contact

- `fromUserId`
   - Format: `a-zA-Z0-1`
   - Length: `256`
- `toUserId`
   - Format: `a-zA-Z0-1`
   - Length: `256`
- `accepted`
   - Format: `boolean`

#### Merchant

- `id`
   - Format: `a-zA-Z0-1`
   - Length: `256`
- `name`
   - Format: `a-zA-Z0-1`
   - Length: `20`
