<!-- wechat -->
<template>
  <el-container>
    <el-aside width="240px">
      <a-chat-list></a-chat-list>
    </el-aside>
    <el-main class="wechat_contaner">
      <router-view v-if="caseId != ''"></router-view>
      <a-docdom v-else></a-docdom>
    </el-main>
  </el-container>
</template>

<script>
import AChatList from "@/components/AchatList";
import ADocdom from "@/components/ADocdom";
export default {
  data() {
    return {};
  },
  components: { AChatList, ADocdom },
  computed: {
    caseId: {
      get() {
        return this.$store.state.cases.caseId;
      }
    }
  },
  methods: {
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
  position: relative;
}
</style>