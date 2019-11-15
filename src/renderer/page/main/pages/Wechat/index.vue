<!-- wechat -->
<template>
  <el-container>
    <el-aside width="240px">
      <a-chat-list></a-chat-list>
    </el-aside>
    <el-main>
      <h1>wechat</h1>
      <el-button @click="logout">退出重新登录</el-button>
      <el-button @click.native="download">下载</el-button>
    </el-main>
  </el-container>
</template>

<script>
import AChatList from "@/components/chatList";
export default {
  data() {
    return {};
  },

  components: { AChatList },
  methods: {
    logout() {
      this.$electron.ipcRenderer.send("showLoginWindow");
      this.$electron.ipcRenderer.send("hideMainWindow");
      this.$electron.remote.getGlobal("appData").userInfo = null;
      this.$store.commit("REMOVE_USER", null);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 导出PDF
    download() {
      this.$http({
        method: "post",
        url: "http://192.168.137.1:8986/biz/createPDF",
        data: {
          fileName: "string",
          htmlStr: "string"
        },
        responseType: "arraybuffer"
      }).then(response => {
        var fileURL = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.pdf");
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    }
  }
};
</script>
<style scoped>
</style>