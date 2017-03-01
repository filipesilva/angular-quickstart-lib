import angularInline from 'rollup-plugin-angular-inline';

export default {
  entry: './src/index.js',
  dest: './bundles/quickstart-lib.umd.js',
  format: 'umd',
  moduleName: 'ng.quickstartLib',
  globals: {
    '@angular/core': 'ng.core'
  },
  plugins: [
    angularInline({ include: './src/**/*.component.js' })
  ]
}
