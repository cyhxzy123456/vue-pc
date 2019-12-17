export default [
  {
    path: '/trade',
    name: 'trade',
    component: resolve => require(['../../views/trade/trade.vue'], resolve),
  },
  {
    path: '/trade/free',
    name: 'free',
    component: resolve => require(['../../views/trade/free.vue'], resolve),
  }
]
