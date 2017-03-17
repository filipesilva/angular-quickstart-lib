# E2E App

This is a simplified version of https://github.com/angular/quickstart used to test the lib.

## npm scripts

We've captured many of the most useful commands in npm scripts defined in the `package.json`:

* `npm start` - runs the compiler and a server at the same time, both in "watch mode".
* `npm run build` - runs the TypeScript compiler once.
* `npm run build:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* `npm run serve` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server, written and maintained by
[John Papa](https://github.com/johnpapa) and
[Christopher Martin](https://github.com/cgmartin)
with excellent support for Angular apps that use routing.
* `npm run e2e` - compiles and run protractor e2e tests, written in Typescript (*e2e-spec.ts)

## Ahead-of-Time Compilation (AOT)

There are also a few scripts related to (AOT):
* `npm run build:aot` - builds your app with AOT, outputting it in the `aot/` folder
* `npm run serve:aot` - builds and serves your app with AOT
* `npm run e2e:aot` - tests your served AOT app with protractor
* `npm run clean` - clean temporary files left by AOT compilation.

AOT building depends on `build.js`.
Be sure to read the [Ahead-of-Time Compilation Cookbook](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)
for details on how the setup works.
