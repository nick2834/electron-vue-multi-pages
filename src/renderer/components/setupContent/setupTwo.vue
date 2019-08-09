<template>
  <div class="setup_container setup_two">
    <div class="content">
      <h1 class="title">深圳市中级人民法院告知书</h1>
      <div class="text">
        <p>一、当事人或诉讼代理人应诚信诉讼。同意进入本平台后，在本平台上发表的所有文字、语音、视频、图片等均视为本人操作，由本人承担相应的法律责任。</p>
        <p>二、当事人及其诉讼代理人同意进入本平台参与诉讼活动的，在案件审理期间不得擅自退出本平台。进入平台的微信号即视为当事人或诉讼代理人已确认的电子送达地址，人民法院将依法开展电子送达。</p>
        <p>三、通过本平台进行的诉讼行为效力等同于线下诉讼行为的效力，线上电子签名与线下签名有同等效力。</p>
        <p>四、当事人及其诉讼代理人可通过平台联系法官、提供证据、参与调解、申请保全等诉讼活动。</p>
        <p>五、当事人及其诉讼代理人进入平台后的言行应合法，不得发表与案件无关的言论、视频、图片等。对在本平台所形成的文字、语音、视频、图片等内容不得用于与诉讼无关的任何其他用途，不得外传、扩散、截屏、转发他人。</p>
        <p>六、当事人及其诉讼代理人应保持手机畅通，若在诉讼过程中发生手机遗失、微信被盗等特殊情形时，应及时告知承办人，并采取补救措施，在此期间所产生的一切法律后果均由当事人本人承担。</p>
        <p>如已仔细阅读上述告知内容，并同意进入平台参与线上诉讼活动的，请确认同意。</p>
      </div>
    </div>
    <el-checkbox v-model="checked">已阅读并同意上述告知内容</el-checkbox>
    <div class="btn_group">
      <span class="btn btn__prev" @click="prevStep">上一步</span>
      <span class="btn btn__next" @click="nextStep">下一步</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false
    };
  },
  methods: {
    prevStep() {
      this.$emit("prevStep");
    },
    nextStep() {
      if (!this.checked) {
        this.$message.error("请先勾选阅读并同意上述告知内容");
      } else {
        this.$emit("nextStep");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.setup_two {
  .content {
    // max-width 600px;
    margin: 0 auto;
    border: 2px solid #0052D9;
    border-radius: 2px;
    min-height: 300px;

    .title {
      background: #cfe5ff;
      line-height: 2.5;
      text-align: center;
      color: #0052D9;
    }

    .text {
      max-height: 400px;
      overflow-y: scroll;

      p {
        padding: 0 20px;
        line-height: 2;
        text-indent: 35px;
        font-size: 14px;
        color: #333;
        overflow-y: scroll;
      }
    }
  }

  .el-checkbox {
    margin: 20px auto;
  }
}
</style>

