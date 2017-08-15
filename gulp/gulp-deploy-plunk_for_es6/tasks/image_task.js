var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var readdir = Promise.promisify(fs.readdir);
var rename = Promise.promisify(fs.rename);
var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);
var mkdir = Promise.promisify(fs.mkdir);
var fsExtra = require('fs-extra');
var argv = require('yargs').argv;
var imageUpdatehistory = {};
var request = Promise.promisify(require('request'));
if (!argv.fileName) {
  throw new Error('请选择目标文件')
}
var _inputPath = path.join(process.cwd(), 'html', argv.fileName, 'src/image');
var imageUpdatehistoryPath = path.join(process.cwd(), 'html', argv.fileName, 'updateHistory/imageUpdateHistory.json')
// 读取image 文件修改文件名称, 删除@符号上传cdn
var total = 0;
// update image
var updateImage = (function () {
  var _count = 0;
  return function (filepath) {
    var _fileName = path.basename(filepath)
    var formData = {
      name: _fileName,
      file: fs.createReadStream(filepath)
    };
    var _options = {
      method: 'POST',
      uri: '', //上传图片的服务器接口
      qs: {
        guid: 'e856150a929bc1e9c3eef9ad4e6408a5',
        rand: 1,
        time: 1,
        platform: 'server'
      },
      formData: formData
    }
    request(_options)
      .then(function (res) {
        var _body = JSON.parse(res.body)
        if (!_body.errno) {
          imageUpdatehistory[_fileName] = _body.data.url
          _count++
          if (_count === total) {
            console.log('上传完成')
            writeFile(imageUpdatehistoryPath, JSON.stringify(imageUpdatehistory))
              .then(function (data) {
                console.log('记录完成')
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        }else{
          console.log('上传失败了！')
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }
})()
readdir(_inputPath)
  .then(function (files) {
    var _filesName = [];
    for (var i = 0; i < files.length; i++) {
      var _oldPath = path.join(_inputPath, files[i]);
      var _newPath = path.join(_inputPath, files[i].replace(/@/g, ''));
      _filesName.push(rename(_oldPath, _newPath))
    }
    Promise.all(_filesName)
      .then(function (data) {
        console.log('images文件修改完成!')
        readdir(_inputPath)
          .then(function (files) {
            total = files.length
            for (var j = 0; j < files.length; j++) {
              updateImage(path.join(_inputPath, files[j]))
            }
            return true;
          })
          .then(function () {
            return mkdir(path.join(process.cwd(), 'html', argv.fileName, 'dist/image'))
          })
          .then(function () {
            fsExtra.copy(path.join(process.cwd(), 'html', argv.fileName, 'src/image'), path.join(process.cwd(), 'html', argv.fileName, 'dist/image'), function (err) {
              if (err) throw new Error('拷贝文件失败了( Ĭ ^ Ĭ ) Error :' + err)
            });
          }, function(err){
             console.log('创建文件失败( Ĭ ^ Ĭ ) Error :' + err)
             fsExtra.copy(path.join(process.cwd(), 'html', argv.fileName, 'src/image'), path.join(process.cwd(), 'html', argv.fileName, 'dist/image'), function (err) {
              if (err) throw new Error('拷贝文件失败了( Ĭ ^ Ĭ ) Error :' + err)
            });
          })
          .catch(function (err) {
            console.log(err)
          })
      })
      .catch(function (err) {
        console.log('文件修改错误!')
        console.log(err)
      })
  })
  .catch(function (err) {
    console.log(err)
  })