<template>
  <div ref="container">
    <h1>{{userInfo}}</h1>
    <el-button @click="logout">退出重新登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo:null
    };
  },
  watch:{
    userInfo:{
      deep:true,
      handler(val){
        console.log(val)
      }
    }
  },
  created() {
    this.userInfo = this.$electron.remote.getGlobal('appData')
  },
  methods: {
    logout() {
      this.$electron.ipcRenderer.send("showLoginWindow");
      this.$electron.ipcRenderer.send("hideMainWindow");
      this.$electron.remote.getGlobal('appData').userInfo = null;
    }
  },
};
</script>

