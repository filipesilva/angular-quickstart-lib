const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify')

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
  dest: './bundles/quickstart-lib.umd.js',
  format: 'umd',
});

// Minified UMD bundle.
const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
  dest: './bundles/quickstart-lib.umd.min.js',
  format: 'umd',
  plugins: rollupBaseConfig.plugins.concat([uglify({})])
});

const allBundles = [
  umdConfig,
  minifiedUmdConfig
].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

return Promise.all(allBundles)
  .then(() => console.log('All bundles generated successfully.'))
  .catch(e => { throw e });


