export default {
  entry: './src/index.js',
  dest: './bundles/quickstart-library.umd.js',
  format: 'umd',
  moduleName: 'ng.heroProfile',
  globals: {
    '@angular/core': 'ng.core'
  }
}
