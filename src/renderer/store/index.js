import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import cases from './modules/cases'
import tencentIm from './modules/tencentIm'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    cases,
    tencentIm
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore(state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
