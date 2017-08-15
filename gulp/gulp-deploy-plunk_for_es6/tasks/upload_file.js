var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var readdir = Promise.promisify(fs.readdir);
var rename = Promise.promisify(fs.rename);
var readFile = Promise.promisify(fs.readFile);
var argv = require('yargs').argv;
var writeFile = Promise.promisify(fs.writeFile);
var request = Promise.promisify(require('request'));
if (!argv.fileName) {
    throw new Error('请选择目标文件')
}

var inputPath = path.join(process.cwd(), 'html', argv.fileName, 'dist');
// update file
var updateFile = function(filepath, dir) {
    var _fileName = path.join('activity', argv.fileName, 'dist', dir, path.basename(filepath))
    _fileName = _fileName.split('\\').join('/')
    var formData = {
        filename: _fileName,
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
        .then(function(res) {
            var _body = JSON.parse(res.body)
            if (!_body.errno) {
                console.log(JSON.parse(res.body))
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
var selectFile = function(dir) {
    var _inputPath = path.join(inputPath, dir)
    readdir(_inputPath)
        .then(function(files) {
            for (var i = 0; i < files.length; i++) {
                if (!/\.map/i.test(files[i])) {
                    updateFile(path.join(_inputPath, files[i]), dir)
                }
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
var dirArray = ['js', 'css']
for (let dir of dirArray) {
    selectFile(dir)
}