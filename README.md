# Currency Conversion

Simple Web Application to convert currencies.

## Run

First, you need to provide environment variable [`API_KEY`](https://app.currencyapi.com/) by creating a `.env.local`
file in the root directory.

- `npm install` to init this project and install dependencies.
- `npm run dev` to run in development mode.
- `npm run start` to run in production mode.
- `npm test` to initialize [tests](spec/currency.spec.js) for [scales.ts](lib/currency.js).

## Description

Jasmine tests are located at [spec/currency.spec.js](spec/currency.spec.js) and the main conversion logic is
in [lib/currency.js](lib/currency.js).