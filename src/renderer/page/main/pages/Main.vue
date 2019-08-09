<template>
  <div ref="container">
    <h1>我是主页面</h1>
    <button @click="openNewPage">退出重新登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowNewPage: false
    };
  },
  created() {
    console.log(this.$electron.ipcRenderer.send);
  },
  methods: {
    openNewPage() {
      this.$electron.ipcRenderer.send("showLoginWindow");
      this.$electron.ipcRenderer.send("hideMainWindow");
    }
  }
};
</script>

