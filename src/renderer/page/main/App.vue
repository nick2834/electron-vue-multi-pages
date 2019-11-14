<template>
  <div id="app">
    <!-- <close-bar /> -->
    <router-view/>
  </div>
</template>

<script>
// import closeBar from "@/components/closeBar";
export default {
  name: 'App',
  components: {
    // closeBar
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
