import { authLogin } from '@/service/api'
export default {
  namespaced: true,
  state: {
    userInfo: {
      username: "admin",
      password: "123123",
      role: "1,2,3",
      identityId: "",
      signPic: "",
      nickName: "测试账号",
      avatar: "static/images/UserAvatar.jpg",
      openid: ""
    },
    role: 1,
    name: '',
    Authorization: ""
  },
  mutations: {
    updateToken(state,token){
      state.Authorization = token
    },
    updateRole(state,role){
      state.role = role
    }
  },
  actions: {
    
  }
}
