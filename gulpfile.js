const gulp = require('gulp');
const del = require('del')
const cp = require('child_process');

gulp.task('default', ['build']);

/**
 * Call latexmk to build the file.
 */
gulp.task('build', function () {
  let latexmk = cp.spawn('latexmk')
  latexmk.stdio.on('data', function (data) {
    console.log('stdout: ' + data);
  })
  latexmk.stderr.on('data', function (data) {
    console.error('stdout: ' + data);
  });
});

/**
 * Delete latexmk output folder.
 */
gulp.task('clean', function () {
  del('build/');
  del('main.pdf');
})

/**
 * Spawn the pdf viewer and recompile whenever *.tex file change.
 */
gulp.task('serve', ['build'], function () {
  // spawn pdf viewer
  gulp.watch('*.tex', ['build']);
});
