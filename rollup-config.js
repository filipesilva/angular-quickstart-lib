import angularInline from 'rollup-plugin-angular-inline';

export default {
  entry: './dist/index.js',
  dest: './bundles/quickstart-lib.umd.js',
  format: 'umd',
  moduleName: 'quickstartLib',
  globals: {
    '@angular/core': 'ng.core'
  },
  plugins: [
    angularInline({ include: './dist/**/*.component.js' })
  ]
}
