# Warning

This quickstart is under active development and hasn't yet reached its final form.

It may not be fully compatible with current versions of Angular.

# Angular QuickStart Lib
[![Build Status][travis-badge]][travis-badge-url]

This is a simple library quickstart for Angular libraries, implementing the
[Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).

Currently only unscoped, primary entry-point libraries are supported.

Features:
- a simple example library
- unit tests for the library
- a demo application that consumes the library in JIT mode and runs in watch mode
- an integration app that consumes the library in JIT and AOT mode and runs e2e tests

Common tasks are present as npm scripts:

- `npm start` to run a live-reload server with the demo app
- `npm run test` to test in watch mode, or `npm run test:once` to only run once
- `npm run build` to build the library
- `npm run lint` to lint 
- `npm run clean` to clean
- `npm run integration` to run the integration e2e tests
- `npm install ./relative/path/to/lib` after `npm run build` to test locally in another app

If you need to debug the integration app, please check `./integration/README.md`.

[travis-badge]: https://travis-ci.org/filipesilva/angular-quickstart-lib.svg?branch=master
[travis-badge-url]: https://travis-ci.org/filipesilva/angular-quickstart-lib
