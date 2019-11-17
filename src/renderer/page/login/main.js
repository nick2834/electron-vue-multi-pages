import Vue from 'vue';

import App from './App';
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-variables.scss';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.prototype.$http = httpRequest
Vue.config.productionTip = false;
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
