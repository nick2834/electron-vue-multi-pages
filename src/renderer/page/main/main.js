import Vue from 'vue';

import App from './App';
import router from './router';
import store from '../store'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-variables.scss';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.prototype.$http = httpRequest
if(process.env.NODE_ENV !== 'development'){
  require('@/mock')
}
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
