// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Mint from 'mint-ui';
import "mint-ui/lib/style.css"


import axios from 'axios'
import 'babel-polyfill';


Vue.use(Mint);
Vue.use(Viewer)

Viewer.setDefaults({
  "url": "data-source",
  "movable" : false
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//axios.defaults.baseURL = 'http://192.168.18.236:7001';


  axios.defaults.baseURL = 'http://kexinfarms.com:7001';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers["token"]  = localStorage.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code == 1) {
      return Promise.resolve(response.data)
    }
  },
  error => {
    return Promise.reject(error)   // 返回接口返回的错误信息
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
