// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Goods from './components/goods/goods.vue'
import Comment from './components/comment/comment.vue'
import Business from './components/business/business.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)



const routes = [
    { path: '/', redirect: '/goods' },
    { path: '/goods', component: Goods },
    { path: '/comment', component: Comment },
    { path: '/business', component: Business }
]

const router = new VueRouter({
    routes, // （缩写）相当于 routes: routes
    linkActiveClass: "select"
})

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App } 
// })