<template>
  <el-container id="app">
    <el-header style="height:55px" v-if="$route.path != '/modal'">
      <a-header></a-header>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import AHeader from "@/components/Aheader";
export default {
  name: "App",
  computed: {
    Authorization: {
      get() {
        return this.$store.state.Authorization;
      },
      set(val) {
        this.$store.commit("user/updateToken", val);
      }
    },
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      }
    },
    caseId: {
      get() {
        return this.$store.state.cases.caseId;
      }
    }
  },
  components: { AHeader },
  watch: {
    caseId(val) {
      if (val == "") {
        // this.$electron.ipcRenderer.send("modal_close");
        console.log(this.$electron.ipcRenderer)
      }
    }
  },
  created() {
    var token = this.$electron.remote.getGlobal("appData").Authorization;
    sessionStorage.Authorization = token;
    this.Authorization = token;
  },
  mounted() {
    this.$store.dispatch("tencentIm/getIdentifierActions", this.userInfo);
  }
};
</script>

<style>
@import "../../assets/style/_base.scss";
@import "../../assets/style/reset.css";
@import "../../assets/fonts/iconfont.css";
#app {
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fdfdfd;
  overflow: hidden;
  user-select: none;
}
.dragable {
  -webkit-app-region: drag;
}
.no__dragable {
  -webkit-app-region: no-drag;
}
</style>
