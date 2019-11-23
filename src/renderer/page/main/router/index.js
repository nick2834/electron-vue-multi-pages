import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/wechat'
  },
  {
    path: '/',
    name: 'main',
    component: require('../pages/Main').default,
    children: [
      {
        path: '/setup',
        name: 'setup',
        component: require('../pages/Setup').default,
        meta: {
          title: "测试",
          role: '2,1'
        }
      },
      {
        path: '/wechat',
        name: 'wechat',
        component: require('../pages/Wechat').default,
        meta: {
          title: "微信",
          role: '3,2,1'
        },
        children: [{
          path: '/address',
          name: 'address',
          component: require('../pages/Address').default,
          meta: {
            title: "地址",
            parentName: 'wechat',
            role: '3,2,1'
          },
          hidden: true
        }, {
          path: '/room',
          name: 'room',
          component: require('../pages/Room').default,
          meta: {
            title: "房间",
            parentName: 'wechat',
            role: '3,2,1'
          },
          hidden: true
        }]
      }, {
        path: '/contact',
        name: 'contact',
        component: require('../pages/Contact').default,
        meta: {
          title: "通讯录",
          role: '3,2,1'
        }
      }, {
        path: '/collect',
        name: 'collect',
        component: require('../pages/Collect').default,
        meta: {
          title: "收藏",
          role: '3,2,1'
        }
      },
      {
        path: '/modal',
        name: 'modal',
        component: require('../pages/Modal').default,
        meta: {
          title: "模态框"
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/',
    hidden: true
  }
  ],
  linkActiveClass: 'active'
})

export default router