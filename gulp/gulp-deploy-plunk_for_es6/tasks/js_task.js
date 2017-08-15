var browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  standalonify = require('standalonify'),
  sourcemaps = require('gulp-sourcemaps'),
  argv = require('yargs').argv,
  concat = require('gulp-concat'),
  gulpif = require('gulp-if'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  path = require('path'),
  watchify = require('watchify'),
  _ = require('lodash'),
  babelify = require('babelify'),
  notify = require('gulp-notify'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  gutil = require('gulp-util'),
  debug = require('gulp-debug'),
  chalk = require('chalk'),
  es = require('event-stream'),
  rename = require('gulp-rename');
var outputFileName = !!argv.entry ? argv.entry.split(',') : ['main'];

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) +
      ': ' +
      'Line ' +
      chalk.magenta(err.lineNumber) +
      ' & ' +
      'Column ' +
      chalk.magenta(err.columnNumber || err.column) +
      ': ' +
      chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.message))
  }
}
//browserify合并代码
function buildjs(b, entry ,gulp) {
  return b
    .bundle() //合并打包
    .on('error', map_error)
    .pipe(source(`${entry}.js`)) //将常规流转换为包含Stream的vinyl对象，并且重命名
    .pipe(buffer()) //将vinyl对象内容中的Stream转换为Buffer
    .pipe(gulpif(!argv.min, sourcemaps.init({
      loadMaps: true
    })))
    .pipe(gulpif(!argv.min, sourcemaps.write('.'))) // 写入 .map 文件
    .pipe(gulpif(argv.min, uglify()))
    .pipe(gulpif(argv.min, rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(path.join(global.basePath, 'dist/js')))
}
module.exports = function (gulp) {
  var tasks = outputFileName.map(function (entry) {
    let _entry = entry
    let _stream = null
    let b = browserify({
        entries: [path.join(global.basePath, `src/js/${_entry}.js`)],
        debug: true
      }).transform('babelify')
      .plugin(watchify) //设置watchify插件
      .on('update', function (ids) { //监测文件改动
        ids.forEach(function (v) {
          console.log('bundle changed file:' + v); //记录改动的文件名
        });
        _stream = buildjs(b, _entry, gulp); //触发打包js任务
      })
    _stream = buildjs(b, _entry, gulp); //须要先执行一次bundle
    return _stream
  })
  return es.merge(tasks);
}