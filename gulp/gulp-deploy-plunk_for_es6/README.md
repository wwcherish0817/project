gulp工程化部署.支持es6语法.支持scss.多项目.多文件. <br/>
在html/目录下创建自定义的文件夹(即项目名,可直接复制demo)<br/>


项目安装:<br/>
npm install<br/>

项目命令<br/>
npm run start -- --fileName={项目目录} --entry={指定编译js的文件名}<br/>
npm run uploadImg -- --fileName={项目目录}  //指定目录下的 src/image/ 目录下的所有图片 上传到静床图床<br/>
npm run upload -- --fileName={项目目录} //指定目录下 dist/下的 js/css/ 压缩上传,对应文件名修改.<br/>

项目起来后访问地址为
http://localhost:8080/demo/view/index.html

