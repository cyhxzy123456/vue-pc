export default [
  {
    path: '/myTrade/myTrade',
    name: 'myTrade',
    component: resolve => require(['../../views/myTrade/myTrade.vue'], resolve),
  },
  {
    path: '/myTrade/trans',
    name: 'trans',
    component: resolve => require(['../../views/myTrade/trans.vue'], resolve),
  },
  {
    path: '/myTrade/hisTradeDetail',
    name: 'hisTradeDetail',
    component: resolve => require(['../../views/myTrade/hisTradeDetail.vue'], resolve),
  }
]
