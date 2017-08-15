工程基于vuecli vue2 webpack2 的多项目,多目录html工程配置

工程开始:
npm install

工程运行:
npm run dev

工程打包:
npm run build


可单个创建vue小工程目录
build/projectinfo.js 修改定义的目录
src下创建自定义文件夹 
例:Tourist-Ambassador 就是我创建的自定义文件夹.

工程run dev 之后 访问路径为: http://localhost:8080/Tourist-Ambassador/index.html?

工程跨域访问代理
config/index.js 中的 proxyTable配置
例:<br/>
proxyTable: {
  '/married': {
  target: 'http://activity.dreamlive.tv/',
  changeOrigin: true,
  }
 }
<br/>
我需要访问的接口路径是:http://html5.dreamlive.tv/activity/married/current.do? <br/>
跨域请求demo代码在 src/Tourist-Ambassador/index/indexa/indexa.vue 中的 如下:<br/>

this.$http.get('/married/current.do').then((response) => {
  console.log(response);
  window.alert(response.data.data.list[0].curday)
  }).catch((error) => {
  console.log(error);
})



