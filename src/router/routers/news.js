export default [
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: resolve => require(['../../views/news/newsDetail.vue'], resolve)
  },
  {
    path: '/help',
    name: 'help',
    component: resolve => require(['../../views/news/help.vue'], resolve)
  }
]
