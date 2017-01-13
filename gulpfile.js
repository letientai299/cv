const gulp = require('gulp');
const del = require('del')
const cp = require('child_process');

gulp.task('default', ['build']);

/**
 * Call latexmk to build the file.
 */
gulp.task('build', function () {
  let latexmk = cp.spawn('latexmk')
  latexmk.stdout.on('data', function (data) {
    data.toString().split('\r\n')
      .forEach(s => console.log('LaTeX - out|', s));
  })

  latexmk.stderr.on('data', function (data) {
    if (data.length !== 0) {
      console.error('LaTeX - err| ' + data.toString().trim());
    }
  });
});

/**
 * Delete latexmk and minted output folder.
 */
gulp.task('clean', function () {
  del(['build/',
  '_minted-*'
  ]).then(paths => {
    if (paths.length !== 0) {
      console.log('Deleted files and folders:\n',
        paths.forEach(s => s.trim()).join('\n'));
    } else {
      console.log('Alredy cleaned');
    }
  });;
})

/**
 * Spawn the pdf viewer and recompile whenever *.tex file change.
 */
gulp.task('serve', ['build'], function () {
  // spawn pdf viewer
  gulp.watch('*.tex', ['build']);
});
