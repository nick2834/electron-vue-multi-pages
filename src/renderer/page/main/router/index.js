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
      redirect: '/wechat',
      hidden: true
    },
    {
      path: '/',
      name: 'Main',
      component: require('../pages/Main').default,
      children: [{
        path: 'wechat',
        name: 'wechat',
        component: require('../pages/Wechat').default,
        meta: {
          title: "微信"
        }
      }, {
        path: 'contact',
        name: 'contact',
        component: require('../pages/Contact').default,
        meta: {
          title: "通讯录"
        }
      }, {
        path: 'collect',
        name: 'collect',
        component: require('../pages/Collect').default,
        meta: {
          title: "收藏"
        }
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  linkActiveClass: 'active'
})

export default router