// gulp依赖插件
var gulp = require('gulp'),
  // 热加载,热刷新
  browserSync = require('browser-sync'),
  // scss
  sass = require('gulp-sass'),
  gulpif = require('gulp-if'),
  // 重命名
  rename = require('gulp-rename'),
  argv = require('yargs').argv,
  minifycss = require('gulp-minify-css'),
  // 捕获问题,防止gulp进程应为问题自动退出
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  sourcemaps = require('gulp-sourcemaps'),
  // 自动前缀
  autoprefixer = require('gulp-autoprefixer'),
  // 压缩css
  minifycss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  path = require('path');
module.exports = function (gulp) {
  return function () {
    var _inputPath = path.join(global.basePath, 'src/scss');
    var _outputPath = path.join(global.basePath, 'dist/css');
    console.log(_outputPath)
    return gulp.src(_inputPath + '/*.scss')
      .pipe(changed(_outputPath))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, // 是否美化属性值 默认：true 像这样：
        remove: true // 是否去掉不必要的前缀 默认：true
      }))
      .pipe(gulpif(!argv.min, sourcemaps.init({
        loadMaps: true
      })))
      .pipe(gulpif(!argv.min, sourcemaps.write('.'))) // 写入 .map 文件
      .pipe(gulpif(argv.min, rename({
        suffix: '.min'
      })))
      .pipe(gulpif(argv.min, minifycss()))
      .pipe(gulpif(argv.min, rev()))
      .pipe(gulp.dest(_outputPath))
      .pipe(gulpif(argv.min, rev.manifest()))
      .pipe(gulpif(argv.min, gulp.dest(path.join(global.basePath, 'dist/rev/css'))))
      .pipe(browserSync.reload({
        stream: true
      }))
  }
}