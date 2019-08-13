<template>
  <div ref="container">
    <h1>{{userInfo}}</h1>
    <el-button @click="logout">退出重新登录</el-button>
  </div>
</template>

<script>
import store from '../../store'
export default {
  data() {
    return {
      userInfo:null
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user
      }
    }
  },
  created() {
    this.userInfo = this.$electron.remote.getGlobal('appData')
    // console.log(this.user);
    
  },
  methods: {
    logout() {
      this.$electron.ipcRenderer.send("showLoginWindow");
      this.$electron.ipcRenderer.send("hideMainWindow");
      this.$electron.remote.getGlobal('appData').userInfo = null;
      this.$store.commit('REMOVE_USER', null)
    }
  },
  mounted(){
    console.log(store.state);
  }
};
</script>

