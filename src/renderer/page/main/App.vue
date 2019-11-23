<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
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
    }
  },
  created() {
    var token = this.$electron.remote.getGlobal("appData").Authorization;
    sessionStorage.Authorization = token;
    this.Authorization = token;
  },
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
