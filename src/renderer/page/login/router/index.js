import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/login';

Vue.use(Router);

export default new Router({
  // mode: 'hash',
  name: 'Login',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
});

