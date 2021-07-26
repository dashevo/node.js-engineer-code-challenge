<p align="center">
	<a href="https://travis-ci.com/dashevo/node.js-engineer-code-challenge">
		<img src="https://travis-ci.com/dashevo/node.js-engineer-code-challenge.svg?branch=master" alt="TravisCI">
	</a>
	<a href="https://github.com/airbnb/javascript">
		<img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg" alt="AirBnB">
	</a>
	<a href="https://git.io/col">
		<img src="https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg" alt="Collaborative Etiquette">
	</a>
	<a href="https://twitter.com/intent/follow?screen_name=dashpay">
		<img src="https://img.shields.io/twitter/follow/dashpay.svg?style=social&logo=twitter" alt="follow on Twitter">
	</a>
	<a href="#">
		<img src="https://img.shields.io/dub/l/vibe-d.svg" alt="MIT">
	</a>
</p>


<p>&nbsp;</p>

<p align="center">
	<a href="https://dash.org">
		<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Dash_digital-cash_logo_2018_rgb_for_screens.svg/1600px-Dash_digital-cash_logo_2018_rgb_for_screens.svg.png" width="600">
	</a>
</p>

<p>&nbsp;</p>

# Node.JS Engineer's Code Challenge

> Code challenge for Dash Core Team candidates

The goal of this challenge is to create a browser application which receives,
validates and displays data from users.

Since it takes a while, we've prepared [the application skeleton](application) for you.
It's not really a browser application, but we'll pretend that it is. ;)

In the provided skeleton, you should implement just two actions:
  1. [Store action](application/actions/storeActionFactory.js), which should validate and persist
     [sample user data](application/data.json) in external service(s), to which your application should connect
  2. [Fetch action](application/actions/fetchActionFactory.js), which should retrieve this data back
     and ensure its integrity

Also, your solution must implement at least one of the following types of external services:
  1. **Peer-to-peer service** which hypothetically runs on remote untrusted hosts. Let’s call it the "P2P" service.
     Networking and storage will be cheap for you - **0.0001 DASH per byte** - but you can’t trust
     this service because a malicious operator may spoof (modify) your data, or a man-in-the-middle attack may occur.
  2. **Self-hosted service** which runs on your server. Let’s call it the "hosted" service.
     Networking and storage will be much more expensive for you - **0.001 DASH per byte** - but the data is
     located on your server, so you can trust it.

For communication with your external service(s) we provide two functions
which are wrappers around [whatwg fetch](https://fetch.spec.whatwg.org/).
They help us to calculate incoming and outgoing traffic.

These functions are available for both the store and fetch application actions:
  - `p2pFetch` - should be used to store / retrieve data for P2P services
  - `hostedFetch` - function to store / retrieve data for hosted services

## Your mission

 - Use this repository as a template for the solution.
 - Write a brief spec for your solution.
 - Implement as many external services as you need to store sample data from the application.
 - Implement [the store action](application/actions/storeActionFactory.js). Validate and persist sample data
   in the external service(s).
 - Implement [the fetch action](application/actions/fetchActionFactory.js). Fetch sample data back and ensure its 
   integrity. **When you fetch data back from the untrusted service, you should verify it for spoofing protection.**
 - Write beautiful code. Code design (SOLID, Clean Architecture, 12factor) is important to us.
 - Run application and see results. **Try to spend as little money as possible.** Cost depends on the size
   of request / response and elapsed time. You may find the exact formula in
   [the application skeleton code](application/lib/calculateExpenses.js).
 - Share a link to your private solution repository with us or send us an archive containing your solution.

## Requirements

### External services
 - Services should be written in JavaScript and run with Node.JS.
 - Services should be dockerized and started with [docker compose](docker-compose.yml) in the root directory.
 - Data should be permanently persisted (i.e. available after a service restart).

### Application
 - You should validate sample data in the store action. Throw an error if any data is invalid.
 - You should check data integrity in the fetch action to avoid spoofing. Keep in mind that you don't have access to the original input data which you received in the store action.
 - Make sure the data returned by the fetch action matches the input data from the store action.
 - You should use `p2pFetch` for sending / retrieving data from a P2P service.
 - You should use `hostedFetch` for sending / retrieving data from a hosted service.
 - You cannot store any data on the application side.

### Sample data validation rules

[Sample data](application/data.json) represents a collection of various objects.
Each type of object has its own validation rules.

#### User

- `id`
   - Format: `a-zA-Z0-9`
   - Length: `64`
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
   - Length: `64`
   - Required
- `type`
   - Value: `payment`
   - Required 
- `fromUserId`
   - Format: `a-zA-Z0-9`
   - Length: `64`
   - Required
- `toMerchantId` or `toUserId`
   - Format: `a-zA-Z0-9`
   - Length: `64`
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
   - Length: `64`
   - Required
- `type`
   - Value: `merchant`
   - Required
- `name`
   - Format: `a-zA-Z0-9_.`
   - Max length: `20`
   - Required

## Summary

Follow the [challenge mission](#your-mission) according to the [provided requirements](#requirements) and do your 
best. Good luck!

## License

[MIT](LICENSE) © 2018 Dash Core Team
