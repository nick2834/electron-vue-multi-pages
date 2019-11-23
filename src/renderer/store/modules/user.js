import { users } from '@/service'
export default {
  namespaced: true,
  state: {
    userInfo: null,
    openid: "",
    isJudge: true,
    role: 3,
    Authorization: ""
  },
  mutations: {
    updateUsers(state, users) {
      state.userInfo = users
    },
    updateToken(state, token) {
      state.Authorization = token
    },
    updateRole(state, role) {
      state.role = role
    },
    updateIsjudge(state, isJudge) {
      state.isJudge = isJudge
    }
  },
  actions: {
    getUsers({
      state
    }) {
      return new Promise((resolve, reject) => {
        users({
          openid: state.openid,
          moduleId: "tc-getInfoByOpenid",
          role: "0"
        }).then(({
          data
        }) => {
          resolve(data.data)
        }).catch(err => {
          reject(err)
        });
      })
    }
  }
}