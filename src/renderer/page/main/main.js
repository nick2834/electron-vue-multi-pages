import Vue from 'vue';

import App from './App';
import router from './router';
import store from '../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-variables.scss';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.use(ElementUI)
// 混入一些在全局使用的功能

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
