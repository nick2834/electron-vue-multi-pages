<template>
  <div class="setup_container setup_four">
    <div class="content"></div>
    <div class="btn_group">
      <span class="btn btn__prev" @click="prevStep">上一步</span>
      <span class="btn btn__next" @click="confirm">提交立案</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    prevStep() {
      this.$emit("prevStep");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.setup_four {
  .content {
    // max-width 600px;
    margin-top: 20px;
    height: calc(100vh - 300px);
    overflow-y: scroll;

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

