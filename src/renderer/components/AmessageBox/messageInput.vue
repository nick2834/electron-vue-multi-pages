<template>
  <div class="message_input">
    <div class="input_tool">
      <i class="el-icon-microphone"></i>
      <i class="el-icon-picture-outline"></i>
      <i class="el-icon-files"></i>
      <i class="el-icon-receiving"></i>
      <i class="el-icon-set-up" @click="drawer = true"></i>
    </div>
    <textarea name id cols="30" rows="10" class="input_area"></textarea>
    <el-drawer title="我是标题" :visible.sync="drawer" direction="rtl" :modal="false" size="40%" class="message_drawer">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return { drawer: false };
  }
};
</script>

<style lang="scss" scoped>
.message_input {
  border-top: 1px solid $borderColor;
  height: 200px;
  .input_tool {
    height: 40px;
    line-height: 40px;
    color: #888a92;
    font-size: 20px;
    padding: 0 10px;
    i {
      padding: 0 5px;
      cursor: pointer;
      &:hover {
        color: #12b7f5;
      }
    }
  }
  .input_area {
    padding: 10px;
    height: 160px;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
    font-size: 16px;
  }
}
</style>