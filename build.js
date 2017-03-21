'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');

const inlineResources = require('./inline-resources');


const libName = require('./package.json').name;
const libDir = `src/lib`;
const distDir = `./dist`;

return Promise.resolve()
  // Compile to ES5.
  .then(() => ngc({ project: `${libDir}/tsconfig.json` })
    .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
    .then(() => inlineResources(`${libDir}/tsconfig.json`))
    .then(() => console.log('ES5 compilation succeeded.'))
  )
  // Compile to ES2015.
  .then(() => ngc({ project: `${libDir}/tsconfig.fesm.json` })
    .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
    .then(() => inlineResources(`${libDir}/tsconfig.fesm.json`))
    .then(() => console.log('ES2015 compilation succeeded.'))
  )
  // Copy typings and templates to `dist/` folder.
  .then(() => {
    // Source and dist directories.
    const srcFolder = path.join(__dirname, libDir);
    const compilationFolder = path.join(__dirname, 'out-tsc/lib-fesm');
    const distFolder = path.join(__dirname, distDir);

    return Promise.resolve()
      .then(() => _relativeCopy('**/*.d.ts', compilationFolder, distFolder))
      .then(() => _relativeCopy('**/*.metadata.json', compilationFolder, distFolder))
      .then(() => _flatCopy('**/*.html', srcFolder, distFolder))
      .then(() => _flatCopy('**/*.css', srcFolder, distFolder))
      .then(() => console.log('Typings and templates copy succeeded.'));
  })
  // Bundle lib.
  .then(() => {
    // Base configuration.
    const rollupBaseConfig = {
      entry: `./out-tsc/lib/${libName}.js`,
      moduleName: camelCase(libName),
      sourceMap: true,
      globals: {
        '@angular/core': 'ng.core'
      },
      external: [
        '@angular/core'
      ],
      plugins: [
        sourcemaps()
      ]
    };

    // UMD bundle.
    const umdConfig = Object.assign({}, rollupBaseConfig, {
      dest: `${distDir}/${libName}.umd.js`,
      format: 'umd',
    });

    // Minified UMD bundle.
    const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
      dest: `${distDir}/${libName}.umd.min.js`,
      format: 'umd',
      plugins: rollupBaseConfig.plugins.concat([uglify({})])
    });

    // ESM+ES5 flat module bundle.
    const fesm5config = Object.assign({}, rollupBaseConfig, {
      dest: `${distDir}/${libName}.es5.js`,
      format: 'es'
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015config = Object.assign({}, rollupBaseConfig, {
      entry: './out-tsc/lib-fesm/index.js',
      dest: `${distDir}/${libName}.js`,
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
  })
  .catch(e => {
    console.error('\Build failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  });


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const origin = path.join(from, file);
      const dest = path.join(to, file);
      _recursiveMkDir(path.dirname(dest));
      fs.createReadStream(origin).pipe(fs.createWriteStream(dest));
    })
  })
}

// Copy files flattering relative paths.
function _flatCopy(fileGlob, from, to) {
  return glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const origin = path.join(from, file);
      const dest = path.join(to, path.basename(file));
      _recursiveMkDir(path.dirname(dest));
      fs.createReadStream(origin).pipe(fs.createWriteStream(dest));
    })
  })
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
