export default {
  namespaced: true,
  state: {
    userInfo: {
      username: "admin",
      password: "123123",
      role: "1,2,3,4",
      identityId: "",
      signPic: "",
      nickName: "",
      avatar: "static/images/UserAvatar.jpg",
      openid: ""
    },
    isJudge: true,
    role: 3,
    Authorization: ""
  },
  mutations: {
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

  }
}