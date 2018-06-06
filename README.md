# Node.JS Engineer's Code Challenge

> Code challenge for Dash Core Team candidates

The goal of this challenge is to create a browser application which receives,
validates and displays data from a user.

Since it takes a while, we've prepared [the application skeleton](application) for you.
It's not really a browser application, but we'll pretend that it is. ;)

In the provided skeleton, you should implement just two actions:
  1. [Store action](application/actions/storeActionFactory.js), which should validate and persist
     [sample data](application/data.json) in external service(s)
  2. [Fetch action](application/actions/fetchActionFactory.js), which should retrieve data
     and ensure its integrity

There are two types of external services available for you:
  1. **Peer-to-peer service** which hypothetically runs on user's hosts. Let’s call it "P2P" service.
     Networking and storage will be cheap for you - **0.0001 DASH per byte**, but you can’t trust
     this service because a malicious user may spoof (modify) your data.
  2. **Self-hosted service** which runs on your server. Let’s call it "hosted" service.
     Networking and storage will be much more expensive for you - **0.001 DASH per byte**, but the data is
     located on your server, so you can trust it.

We provide two functions which are the wrappers around [whatwg fetch](https://fetch.spec.whatwg.org/).
They help us to calculate incoming and outgoing traffic.

These functions are available for both store and fetch application's actions:
  - `p2pFetch` - should be used to store / retrieve data for P2P services
  - `hostedFetch` - function to store / retrieve data for hosted services

## Your mission

 - Fork this repository
 - Implement as many external services as you need to store sample data from the application
 - Implement [the store action](application/actions/storeActionFactory.js). Validate and persist sample data
   in the external service(s)
 - Implement [the fetch action](application/actions/fetchActionFactory.js). Fetch sample data back and ensure its 
   integrity. **When you fetch data back from the untrusted service, you should verify it for spoofing protection**
 - Write beautiful code. Code design (OOP, SOLID, 12factor) is important to us.
 - Run application and see results. **Try to spend as little money as possible**. Cost depends on the size
   of request / response and elapsed time. You may find the exact formula in
   [the application skeleton code](application/lib/calculateExpenses.js)

## Requirements

### External services
 - Services should be written in JavaScript and run with Node.JS
 - Services should be dockerized and started with [docker compose](docker-compose.yml) in the root directory
 - Data should be permanently persisted (i.e. available after a service restart)

### Application
 - You should validate sample data in the store action. Throw error if data is not valid.
 - You should check data integrity in the fetch action to avoid spoofing.
   Make sure the data returned by the fetch action matches the input data from the store action
 - You should use `p2pFetch` for sending / retrieving data from a P2P service
 - You should use `hostedFetch` for sending / retrieving data from a hosted service
 - You cannot store any data on the application side

### Sample data validation rules

[Sample data](application/data.json) represents a collection of various objects.
Each type of object has its own validation rules.

#### User

- `id`
   - Format: `a-zA-Z0-9`
   - Length: `256`
   - Required
- `type`
   - Value: `user`
   - Required
- `userName`
   - Format: `a-zA-Z0-9_.`
   - Max length: `20`
   - Required
- `firstName`
   - Max length: `100`
- `lastName`
   - Max length: `100`
- `email`
   - According to RFC

#### Payment

- `id`
   - Format: `a-zA-Z0-9`
   - Length: `256`
   - Required
- `type`
   - Value: `payment`
   - Required 
- `fromUserId`
   - Format: `a-zA-Z0-9`
   - Length: `256`
   - Required
- `toMerchantId` or `toUserId`
   - Format: `a-zA-Z0-9`
   - Length: `256`
   - Required
- `amount`
   - Format: float number
   - Not equal or less than `0`
   - Required
- `createdAt`
   - Format: Date ISO 8601
   - Required

#### Merchant

- `id`
   - Format: `a-zA-Z0-9`
   - Length: `256`
   - Required
- `type`
   - Value: `merchant`
   - Required
- `name`
   - Format: `a-zA-Z0-9`
   - Max length: `20`
   - Required

## Summary

Follow the [challenge mission](#your-mission) according to the [provided requirements](#requirements) and do your 
best. Good luck!

## License

[MIT](LICENSE) © 2018 Dash Core Team
