var path = require('path'),
  _ = require('lodash'),
  fs = require('fs'),
  argv = require('yargs').argv,
  fsExtra = require('fs-extra'),
  Promise = require('bluebird');
var readdir = Promise.promisify(fs.readdir);
var mkdir = Promise.promisify(fs.mkdir);
if(!argv.fileName){
  throw new Error('请输入要创建的新文件！')
}
readdir(path.join(process.cwd(), 'html'))
  .then(function (arr) {
    _.each(arr, function (item) {
      if (item == argv.fileName) {
        throw new Error(argv.fileName + '已存在(๑ŐдŐ)b☆d(ŐдŐ๑)╮ 造么')
      }
    })
    mkdir(path.join(process.cwd(), 'html', argv.fileName))
      .then(function () {
        fsExtra.copy(path.join(process.cwd(), 'html/demo'), path.join(process.cwd(), 'html', argv.fileName), function (err) {
          if (err) throw new Error('拷贝文件失败了( Ĭ ^ Ĭ ) Error :' + err)
        });
      })
      .catch(function (err) {
        console.log('创建文件失败( Ĭ ^ Ĭ ) Error :' + err)
      })
  })
  .catch(function (err) {
    console.log(err)
  })