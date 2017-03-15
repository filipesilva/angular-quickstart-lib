const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');

const inlineResources = require('./inline-resources');


return Promise.resolve()
  // Compile to ES5.
  .then(() => ngc({ project: 'tsconfig.lib.json' }))
  .then(() => inlineResources('tsconfig.lib.json'))
  .then(() => console.log('ES5 compilation succeeded.'))
  // Compile to ES2015.
  .then(() => ngc({ project: 'tsconfig.lib-es2015.json' }))
  .then(() => inlineResources('tsconfig.lib-es2015.json'))
  .then(() => console.log('ES2015 compilation succeeded.'))
  // Bundle lib.
  .then(() => {
    // Base configuration.
    const umdDir = `./bundles`;
    const fesmDir = `./dist`;
    const libFilename = 'quickstart-lib';
    const rollupBaseConfig = {
      entry: './out-tsc/lib/index.js',
      moduleName: 'quickstartLib',
      globals: {
        '@angular/core': 'ng.core'
      },
      external: [
        '@angular/core'
      ],
      plugins: []
    };

    // UMD bundle.
    const umdConfig = Object.assign({}, rollupBaseConfig, {
      dest: `${umdDir}/${libFilename}.umd.js`,
      format: 'umd',
    });

    // Minified UMD bundle.
    const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
      dest: `${umdDir}/${libFilename}.umd.min.js`,
      format: 'umd',
      plugins: rollupBaseConfig.plugins.concat([uglify({})])
    });

    // ESM+ES5 flat module bundle.
    const fesm5config = Object.assign({}, rollupBaseConfig, {
      dest: `${fesmDir}/${libFilename}.es5.js`,
      format: 'es'
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015config = Object.assign({}, rollupBaseConfig, {
      entry: './out-tsc/lib-es2015/index.js',
      dest: `${fesmDir}/${libFilename}.js`,
      format: 'es'
    });

    const allBundles = [
      umdConfig,
      minifiedUmdConfig,
      fesm5config,
      fesm2015config
    ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

    return Promise.all(allBundles)
      .then(() => console.log('All bundles generated successfully.'))
      .catch(e => {
        console.error('\nBundle generation failed. See below for errors.\n');
        console.error(e);
        process.exit(1);
      });
  });
