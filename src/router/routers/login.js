export default [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../../views/login/login.vue'], resolve)
  },
  {
    path: '/login/register',
    name: 'register',
    component: resolve => require(['../../views/login/register.vue'], resolve)
  },
  {
    path: '/forget',
    name: 'forget',
    component: resolve => require(['../../views/login/forgetPwd.vue'], resolve)
  }
]
