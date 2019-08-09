<!--返回按钮-->
<template>
  <div class="el-breadcrumb">
    <span class="el-breadcrumb__item" @click="changeToolTag">
      <span class="el-breadcrumb__inner">返回</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
    </span>
    <span class="el-breadcrumb__item" aria-current="page">
      <span class="el-breadcrumb__inner">{{title}}</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: ["title"],
  methods: {
    changeToolTag() {
      this.$store.commit("CHANGE_TOOLTAG", 1);
      if (this.recordTimeInterval) {
        clearInterval(this.recordTimeInterval);
        this.recordTimeInterval = null;
        this.isRecording = false;
        this.hasRecord = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb__item {
  cursor: pointer;
}
</style>
