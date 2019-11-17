<!-- wechat -->
<template>
  <el-container>
    <el-aside width="240px">
      <a-chat-list></a-chat-list>
    </el-aside>
    <el-main class="wechat_contaner">
      <a-message-box v-if="caseId != ''"></a-message-box>
      <a-docdom v-else></a-docdom>
    </el-main>
  </el-container>
</template>

<script>
import AChatList from "@/components/AchatList";
import AMessageBox from "@/components/AmessageBox";
import ADocdom from "@/components/ADocdom";
export default {
  data() {
    return {};
  },
  components: { AChatList, AMessageBox, ADocdom },
  computed: {
    caseId: {
      get() {
        return this.$store.state.cases.caseId;
      }
    }
  },
  methods: {
    logout() {
      this.$electron.ipcRenderer.send("showLoginWindow");
      this.$electron.ipcRenderer.send("hideMainWindow");
      this.$electron.remote.getGlobal("appData").userInfo = null;
      this.$store.commit("REMOVE_USER", null);
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
<style scoped lang="scss">
.wechat_contaner {
  padding: 0;
}
</style>