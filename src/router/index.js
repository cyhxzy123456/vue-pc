import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Agreen from '../views/agreen'
import AdminLogin from '../views/adminLogin'
import News from './routers/news.js'
import Login from './routers/login.js'
import PersonCenter from './routers/personCenter.js'
import Trade from './routers/trade.js'
import MyTrade from './routers/myTrade.js'
import About from './routers/about.js'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'trans.vue',
      component: Index
    },
    {
      path: '/agreen',
      name: 'agreen.vue',
      component: Agreen,
      meta:{
        head:true
      }
    },
    {
      path: '/adminLogin',
      name: 'adminLogin.vue',
      component: AdminLogin
    },
    ...News,
    ...Login,
    ...PersonCenter,
    ...Trade,
    ...MyTrade,
    ...About
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
