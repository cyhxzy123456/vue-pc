export default [
  {
    path: '/about',
    name: 'about',
    component: resolve => require(['../../views/about/index.vue'], resolve),
    children:[
      {
        path: '/about/aboutUs',
        name: 'aboutUs',
        component: resolve => require(['../../views/about/aboutUs.vue'], resolve)
      },
      {
        path: '/about/newsList',
        name: 'newsList',
        component: resolve => require(['../../views/about/newsList.vue'], resolve)
      }
    ]
  }
]
