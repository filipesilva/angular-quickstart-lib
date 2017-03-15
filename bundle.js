const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify')

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
const fesm2015config = Object.assign({}, rollupBaseConfig, {
  dest: `${fesmDir}/${libFilename}.js`,
  format: 'es'
});

// ESM+ES2015 flat module bundle.

const allBundles = [
  umdConfig,
  minifiedUmdConfig,
  fesm2015config
].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

return Promise.all(allBundles)
  .then(() => console.log('\nAll bundles generated successfully.'))
  .catch(e => {
    console.error('\nBundle generation failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  });
