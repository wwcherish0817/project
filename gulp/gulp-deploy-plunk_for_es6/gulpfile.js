// 在node7.0中报错的兼容处理
var os = require('os');
os.tmpDir = os.tmpdir
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  proxyMiddleware = require('http-proxy-middleware'),
  // ^proxy的代理模块^
  eslint = require('gulp-eslint'),
  sequence = require('gulp-sequence'),
  // ^js语法检查^
  browserSync = require('browser-sync'),
  // ^静态文件服务器，同时也支持浏览器自动刷新^
  path = require('path'),
  _ = require('lodash'),
  fs = require('fs'),
  rev = require('gulp-rev'),
  argv = require('yargs').argv;
var fsExtra = require('fs-extra');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');
var _ = require('underscore');
var debug = require('gulp-debug');
var shell = require('gulp-shell');

if (!argv.fileName) {
  throw new Error('请输入工作的文件夹 --fileName=***')
}
if (argv.fileName == 'demo') {
  throw new Error('模板文件夹不允许进行编译,请更换文件')
}
global.isBundling = false;
global.isBrowserSync = false;
global.basePath = path.join(__dirname, 'html', argv.fileName)
var jsTask = require('./tasks/js_task')
var cssTask = require('./tasks/css_task')
var currentFileNameArr = _.filter(fs.readdirSync(path.join(__dirname, 'html')), function (item) {
  if (fs.statSync(path.join(__dirname, 'html', item)).isDirectory()) {
    return item
  }
})

gulp.task('browser-sync', function () {
  function onError(err, req, res) {
    console.log('错误')
    console.log(err)
  }
  var options = {
    target: 'http://activity.dreamlive.tv',
    changeOrigin: true,
    onError: onError,
    onProxyReq: function(proxyReq, req, res){
      proxyReq.setHeader('Cookie', 'JSESSIONID=A498E8EC0589D4038E83F2EF531909C4; userid=21000221; token=010140701d59310d8228287jcj4n9ken8jc33e');
    }
  }
  var proxy = proxyMiddleware(['/activity', '/report', '/wechat'], options)
  browserSync({
    open: true,
    server: {
      baseDir: path.join('html', argv.fileName),
      middleware: [proxy]
    }
  })
  global.isBrowserSync = true;
})
gulp.task('JSrev', function () {
  return gulp.src(path.join(global.basePath, 'dist/js/*.js'), {
      read: true
    })
    .pipe(clean())
    .pipe(rev())
    .pipe(gulp.dest(path.join(global.basePath, 'dist/js')))
    .pipe(rev.manifest({
      merge: true
    }))
    .pipe(gulp.dest(path.join(global.basePath, 'dist/rev/js')));
});
// html 文件替换
gulp.task('rev', function () {
  return gulp.src([path.join(global.basePath, 'dist/rev/*/*.json'), path.join(global.basePath, 'view/*.html')])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        '../dist/css/': 'http://static.dreamlive.tv/activity/' + argv.fileName + '/dist/css/',
        '../dist/js/': 'http://static.dreamlive.tv/activity/' + argv.fileName + '/dist/js/',
      }
    }))
    .pipe(gulp.dest(path.join(global.basePath, 'dist/view')));
});
// true　时候替换css中的image
var replaceFlag = true
// 上传静床后添加时间戳
gulp.task('replaceCss', function () {
  var _input = path.join(global.basePath, 'dist/css', '*.css')
  var _output = path.join(global.basePath, 'dist/css')
  var _imagesUrl = JSON.parse(fs.readFileSync(path.join(__dirname, 'html', argv.fileName, 'updateHistory/imageUpdateHistory.json'), {
    'encoding': 'utf8'
  }))
  return gulp.src(_input)
    .pipe(replace(/((\.\.\/)?|((http|https):\/\/)){1}(([a-zA-Z0-9_-]+\.?)+\/)+[a-zA-Z0-9-_@]+(\.(png|jpg|jpeg|gif)){1}(\?\w+=\d+)?/ig, function (str) {
      var _extname = path.extname(str).split('?')[0].replace('.', '')
      if (/png|jpg|jpeg|gif/.test(_extname)) {
        var _imgPath = _imagesUrl[path.basename(str).split('?')[0].replace('@', '')]
        if (_.isUndefined(_imgPath)) {
          throw new Error(path.basename(str) + '图片上传记录中没有找到这个文件请检查后重试!')
        }
        return _imgPath
      }
    }))
    .pipe(gulp.dest(_output))
})

// 最终上传之前将文件名称替换为min.css || min.js
gulp.task('replaceHtml', function () {
  if (!argv.fileName) {
    throw new Error('请选择目标文件')
  }
  var keys = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, 'html', argv.fileName, 'dist/rev/js/rev-manifest.json'), {
    'encoding': 'utf8'
  })))
  keys = keys.map(function (item) {
    return item.split('.')[0]
  })
  var _input = path.join(__dirname, 'html', argv.fileName, 'view', '*.html')
  var _output = path.join(__dirname, 'html', argv.fileName, 'view')
  return gulp.src(_input)
    .pipe(replace(/[\w\.\/]+\w+((\.min)?\.(css|js)){1}/ig, function (str) {
      var _extname = path.extname(str).split('?')[0].replace('.', '')
      if (/js|css/.test(_extname) && ~keys.indexOf(path.basename(str).split('.')[0])) {
        if (!/min/.test(path.basename(str))) {
          var _arr = path.basename(str).split('.')
            _arr.splice(-1, 0, 'min')
            return path.dirname(str) + '/' + _arr.join('.')
        } else {
          var _arr = path.basename(str).split('.')
            _arr.splice(-2, 1)
            return path.dirname(str) + '/' + _arr.join('.')
        }
      } else {
        return str
      }
    }))
    .pipe(gulp.dest(_output))
})
gulp.task('clean', function () {
  return gulp.src([path.join(global.basePath, 'dist/**/*.*'), '!' + path.join(global.basePath, 'dist/image/*.*')])
    .pipe(clean())
});
gulp.task('build-css', cssTask(gulp))
gulp.task('build-js', function () {
  return jsTask(gulp)
})
gulp.task('watch', function () {
  gulp.watch(path.join(global.basePath, 'src/scss/*.scss'), ['build-css'])
  gulp.watch(path.join(global.basePath, 'view/*.html')).on('change', browserSync.reload)
  gulp.watch(path.join(global.basePath, 'dist/js/*.js')).on('change', browserSync.reload)
})
gulp.task('endTask', shell.task([
  'echo build结束上传文件',
  `npm run upload -- --fileName=${argv.fileName}`
]))

if (!!argv.min) {
  //gulp.task('default',sequence('clean','build-js')) 
  gulp.task('default',sequence('clean', ['build-js', 'build-css'], 'JSrev', ['replaceCss', 'replaceHtml'], 'rev', 'replaceHtml', 'endTask'))
} else {
  gulp.task('default', sequence('clean', 'build-js', 'build-css', 'browser-sync', 'watch'))
}