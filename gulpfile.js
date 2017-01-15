const gulp = require('gulp');
const del = require('del')
const cp = require('child_process');
const debug = require('gulp-debug');

gulp.task('default', ['build']);

/**
 * Call latexmk to build the file.
 */
gulp.task('build', copyAndMake);

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
  open('dest/main.pdf')

  /*
   * Recompile pdf normally on tex and image files change
   */
  gulp.watch(['!src/**/*.sty', 'src/**/*']).on('change', e => {
    gulp.src(e.path)
      .pipe(debug())
      .pipe(gulp.dest('dest'))
      .on('end', make);
  })

  /*
   * If custom packages changes, we have to clean cache and do a full compile.
   */
  gulp.watch(['src/**/*.sty']).on('change', function(e) {
    // If we remove the whole folder, like what we've done in clean task,
    // zathura won't be able to reload the new pdf.
    del(['dest/*']).then(ps =>  {
      copyAndMake()
    });
  });
});

/**
 * Copy everything under src folder into dest, and trigger make on end.
 */
function copyAndMake() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dest'))
    .on('end', make);
}

/**
 * Spawn latexmk to build project on dest folder
 */
function make() {
  // Use spawnSync to ensure that we always have the pdf ready after make()
  cp.spawnSync('latexmk', {
    cwd: 'dest'
  })
}

/**
 * Open the file using OS command.
 * Currently support Linux and Window only.
 */
function open(pdfFile){
  let command = process.platform.match('win.*') ?
    "start" : "xdg-open";
  let execCommand = `${command} ${pdfFile}`;
  return cp.exec(execCommand);
}
