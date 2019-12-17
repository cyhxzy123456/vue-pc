// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/index.js'// 引入store
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueOption from "./assets/js/vue-option"
import './assets/js/filter'//加载过滤器

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
const VueObject = new Vue(vueOption).$mount("#app");
//将vue实例对象全局出来
Vue.prototype.$vue = VueObject;
/* eslint-disable no-new */
/*new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})*/

let refreshSubscribers = [];
// 是否正在刷新的标志
let isRefreshing = false;
/* 将所有的请求都push到数组中 */
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// 数组中的请求得到新的token之后自执行，用新的token去请求数据
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}
import {FreshToken} from './assets/js/loginApi/login'
/**/
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('access_token')) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer " + localStorage.getItem('access_token');
      if (localStorage.getItem('overTime') && localStorage.getItem('overTime') <= new Date().getTime()) {
        if (!isRefreshing) {
          /*判断是否正在刷新*/
          isRefreshing = true;
          /*发起刷新token的请求*/
          let result = FreshToken(localStorage.getItem('refresh_token'))
          result.then((res)=>{
            isRefreshing = false;
            if (res.Result == 0) {
              localStorage.setItem('access_token', res.Data.access_token)
              localStorage.setItem('refresh_token', res.Data.refresh_token)
              let overTime = new Date().getTime() + res.Data.expires_in * 600
              localStorage.setItem('overTime', overTime)
              /*执行数组里的函数,重新发起被挂起的请求*/

              config.headers.Authorization = "Bearer " + res.Data.access_token;
              onRrefreshed(res.Data.access_token)
              /*执行onRefreshed函数后清空数组中保存的请求*/
              refreshSubscribers = []
            } else {
              localStorage.clear()
              VueObject.$store.commit('logout')
              VueObject.$router.push("/login");
              return
            }
          })
          /*把请求(token)=>{....}都push到一个数组中*/
          let retry = new Promise((resolve, reject) => {
            /*(token) => {...}这个函数就是回调函数*/
            subscribeTokenRefresh((token) => {
              // config.headers.common['Authorization'] = 'bearer ' + token;
              config.headers.Authorization = 'Bearer ' + token;
              /*将请求挂起*/
              resolve(config)
            })
          });
          return retry
        }
        return config
      } else {
        return config
      }
    } else {
      return config
    }
  },
  err => {
    return Promise.reject(err);
  }
);

// /****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(
  response => {
    //debugger
    //成功请求到数据
        //成功请求到数据请输入正确的价格
        if (response) {
          if (response.data.Result == 1 && response.data.Message.indexOf("重新登录") == -1 && response.data.Message.indexOf("输入正确的价格") == -1) {
            Vue.prototype.$alert(response.data.Message.replace(/<.*?>/ig, ""), '消息提示')
            return Promise.reject(response.data);
          } else {
            return response;
          }
        }
  },
  error => {
    //VueObject.$vux.loading.hide();
    if (error.response) {
      let err = error.response;
      if (err.status == 401) {
        localStorage.clear();
        VueObject.$store.commit('logout')
        VueObject.$router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);
