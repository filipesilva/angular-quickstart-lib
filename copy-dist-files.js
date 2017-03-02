const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Source and dist directories.
const from = path.join(__dirname, 'src');
// dist can be overriden with a command line arg
const to = path.join(__dirname, process.argv[2] || 'dist');

// File globs to be copied.
const fileGlobs = [
  '**/*.html',
  '**/*.css'
];

// Resolve globs and copy files.
fileGlobs.forEach(fileGlob =>
  glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const origin = path.join(from, file);
      const dest = path.join(to, file);
      console.log(`Copying ${origin} to ${dest}.`)
      fs.createReadStream(origin).pipe(fs.createWriteStream(dest));
    })
  })
);
