const gulp = require('gulp');
const del = require('del')
const cp = require('child_process');

gulp.task('default', ['build']);

/**
 * Call latexmk to build the file.
 */
gulp.task('build', function () {
  cp.spawn('latexmk');
});

/**
 * Delete latexmk output folder.
 */
gulp.task('clean', function() {
  del('build/');
})

/**
 * Spawn the pdf viewer and recompile whenever *.tex file change.
 */
gulp.task('serve', ['build'], function () {
  // spawn pdf viewer
  gulp.watch('*.tex', ['build']);
});
