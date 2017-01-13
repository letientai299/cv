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
  open('dest/main.pdf');

  gulp.watch('src/**/*').on('change', e => {
    gulp.src(e.path)
      .pipe(debug())
      .pipe(gulp.dest('dest'))
      .on('end', make);
  })
});

function make() {
  return cp.spawn('latexmk', {
    cwd: 'dest'
  })
}

function open(pdfFile){
  let command = process.platform.match('win.*') ?
    "start" : "xdg-open";
  let execCommand = `${command} ${pdfFile}`;
  // console.log(execCommand);
  return cp.exec(execCommand);
}
