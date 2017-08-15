import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);


//添加一个请求拦截器

Vue.prototype.$http.interceptors.request.use(function(config) {
    // 拦截请求修改地址
    if (/http:\/\/html5.dreamlive.tv/ig.test(window.location.href) && !/http:\/\//ig.test(config.url)) {
        config.url = 'http://html5.dreamlive.tv/activity' + config.url
    } else if (/http:\/\/activity.dreamlive.tv/ig.test(window.location.href) && !/http:\/\//ig.test(config.url)) {
        config.url = 'http://activity.dreamlive.tv' + config.url
    }
    return config;
}, function(err) {
    return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})