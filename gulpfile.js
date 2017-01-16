const gulp = require('gulp');
const del = require('del')
const cp = require('child_process');
const debug = require('gulp-debug');
const gutil = require('gulp-util');
const replace = require('gulp-replace');
const glob = require('glob');
const fs = require('fs');

/**
 * Files that don't require any special treatment.
 */
const SIMPLE_FILES = ['src/*.tex', 'src/images/*', 'src/latexmkrc']

gulp.task('default', ['build']);

/**
 * Call latexmk to build the file.
 */
gulp.task('build', () => {
  generateColorTheme();
  copyAndMake();
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
  open('dest/main.pdf')

  /*
   * Recompile pdf normally on tex and image files change
   */
  gulp.watch(SIMPLE_FILES, {base: 'src'})
    .on('change', e => {
      gulp.src(e.path)
        .pipe(debug())
        .pipe(gulp.dest('dest'))
        .on('end', make);
    })

  /*
   * Generate the theme files, convert svg color to match with once config.json
   * change.
   */
  gulp.watch(['src/config.json'])
    .on('change', (e) => {
      generateColorTheme(make)
    })
});

/**
 * Copy everything under src folder into dest, and trigger make on end.
 */
function copyAndMake() {
  return gulp.src(SIMPLE_FILES, {base: 'src'})
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
function open(pdfFile) {
  let command = process.platform.match('win.*') ?
    "start" : "xdg-open";
  let execCommand = `${command} ${pdfFile}`;
  return cp.exec(execCommand);
}

/**
 * Convert config.json to tex file(s).
 */
function generateColorTheme(cb) {
  let config = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));
  let themeName = config.useTheme;
  let theme = config.themes[themeName];

  if (cb == null) {
    cb = () => {} ;// no-op
  }

  removeSvgTempFileSync();

  // Change svg fill color.
  gulp.src('src/images/*.svg')
    .pipe(replace(/fill:#[0-9a-fA-F]{6}/, `fill:${theme.primaryColor}`))
    .pipe(gulp.dest('dest'))
    .on('end', () => writeNewColorTexFile(theme, cb));
}

/**
 * Remove all pdf and pdf_tex file generated from svg file by inkscape
 */
function removeSvgTempFileSync() {
  return glob.sync("src/*.svg").map(f => f.replace('src', 'dest'))
    .map(f => f.replace('.svg', '.*'))
    .forEach(f => del(f));
}

/**
 *Write tex file, so that color theme will be applied to link and other things.
 */
function writeNewColorTexFile(theme, cb) {
  let colorThemeTexContent = Object.keys(theme)
    .map(k => `\\definecolor{${k}}{HTML}{${theme[k].replace('#', '')}}`)
    .join('\n')
  return srcString('colorTheme.tex', colorThemeTexContent)
    .pipe(gulp.dest('dest'))
    .on('end', cb);
}

/**
 * Pipe a string to a file.
 */
function srcString(filename, content) {
  var src = require('stream').Readable({
    objectMode: true
  })
  src._read = function () {
    this.push(new gutil.File({
      cwd: "",
      base: "",
      path: filename,
      contents: new Buffer(content)
    }))
    this.push(null)
  }
  return src
}
