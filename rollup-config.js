export default {
  entry: './src/index.js',
  dest: './bundles/hero-profile.umd.js',
  format: 'umd',
  moduleName: 'ng.heroProfile',
  globals: {
    '@angular/core': 'ng.core'
  }
}