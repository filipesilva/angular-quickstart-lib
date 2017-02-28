export default {
  entry: './src/index.js',
  dest: './bundles/quickstart-lib.umd.js',
  format: 'umd',
  moduleName: 'ng.heroProfile',
  globals: {
    '@angular/core': 'ng.core'
  }
}
