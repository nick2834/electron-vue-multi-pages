<!-- 基本信息 -->
<template>
  <el-form class="detail_content">
    <el-form-item label="案号：">
      <span>{{caseInfo.caseNo}}</span>
    </el-form-item>
    <el-form-item label="案由：">
      <span>{{caseInfo.cause}}</span>
    </el-form-item>
    <el-form-item label="标的额（元）：">
      <span>{{caseInfo.money}}</span>
    </el-form-item>
    <el-form-item label="立案日期：">
      <span>{{caseInfo.setupAt}}</span>
    </el-form-item>
    <el-form-item label="剩余审限：">
      <span>{{caseInfo.jlqx}}</span>
    </el-form-item>
    <template v-if="caseInfo.judges && caseInfo.judges.length > 0">
      <el-form-item label="审判成员"></el-form-item>
      <el-form-item
        v-for="(item,index) in caseInfo.judges"
        :label="item.judgesType+'：'"
        :key="index"
      >
        <span>{{item.name}}</span>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  props: {
    caseInfo: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped lang="scss">
.detail_content {
  height: calc(100vh - 109px);
  overflow-y: scroll;
  text-align: left;
}
</style>