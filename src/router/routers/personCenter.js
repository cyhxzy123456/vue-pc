export default [
  {
    path: '/personCenter/index',
    name: 'index',
    component: resolve => require(['../../views/personCenter/index'], resolve),
    children: [
      {
        path: '/personCenter/user',
        name: 'user',
        component: resolve => require(['../../views/personCenter/user'], resolve)
      },
      {
        path: '/personCenter/setting',
        name: 'setting',
        component: resolve => require(['../../views/personCenter/setting'], resolve)
      },
      {
        path: '/personCenter/apply',
        name: 'apply',
        component: resolve => require(['../../views/personCenter/apply'], resolve)
      },
      {
        path: '/personCenter/flowing',
        name: 'flowing',
        component: resolve => require(['../../views/personCenter/flowing'], resolve)
      },
      {
        path: '/personCenter/protocol',
        name: 'protocol',
        component: resolve => require(['../../views/personCenter/protocol'], resolve)
      },
      {
        path: '/personCenter/message',
        name: 'message',
        component: resolve => require(['../../views/personCenter/message'], resolve)
      },
      {
        path: '/personCenter/feedback',
        name: 'feedback',
        component: resolve => require(['../../views/personCenter/feedback'], resolve)
      },
      {
        path: '/personCenter/feedbackDetail',
        name: 'feedbackDetail',
        component: resolve => require(['../../views/personCenter/feedbackDetail'], resolve)
      },
      {
        path: '/personCenter/drawing',
        name: 'drawing',
        component: resolve => require(['../../views/personCenter/drawing'], resolve)
      },
      {
        path: '/personCenter/recharge',
        name: 'recharge',
        component: resolve => require(['../../views/personCenter/recharge'], resolve)
      },
      {
        path: '/personCenter/invitation',
        name: 'invitation',
        component: resolve => require(['../../views/personCenter/invitation'], resolve)
      },
    ]
  }
]
