const gulp = require('gulp');
const del = require('del')
const cp = require('child_process');
const debug = require('gulp-debug');

gulp.task('default', ['build']);

/**
 * Call latexmk to build the file.
 */
gulp.task('build', function () {
  gulp.src('src/**/*')
    .pipe(gulp.dest('dest'))
    .on('end', make);
});

/**
 * Delete latexmk and minted output folder.
 */
gulp.task('clean', function () {
  del(['dest']);
})

/**
 * Spawn the pdf viewer and recompile whenever *.tex file change.
 */
gulp.task('serve', ['build'], function () {
  gulp.watch('src/**/*').on('change', e => {
    gulp.src(e.path)
      .pipe(debug())
      .pipe(gulp.dest('dest'))
      .on('end', make);
  })
});

/**
 * Run latexmk
 */
function make() {
  let latexmk = cp.spawn('latexmk', {
    cwd: 'dest'
  })
  latexmk.stdout.on('data', function (data) {
    data.toString().split('\r\n')
      .forEach(s => console.log('LaTeX - out|', s));
  })

  latexmk.stderr.on('data', function (data) {
    if (data.length !== 0) {
      console.error('LaTeX - err| ' + data.toString().trim());
    }
  });
}
