<!-- 案件主体 -->
<template>
  <div class="detail_content">
    <el-row>
      <el-col :span="24">当事人信息</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="liti__title">
        <span class="w2">身份</span>
        <span class="w4">姓名</span>
        <span class="w4">联系方式</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <ul>
          <li class="liti__content" v-for="(item,index) in litigantList" :key="index">
            <span class="w2">{{item.litiTitle}}</span>
            <span class="w4">{{item.name}}</span>
            <span class="w4" style="color:#12b7f5">{{item.phoneId}}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">当事人送达地址</el-col>
    </el-row>
    <el-col>
      <el-col :span="24">
        <ul>
          <li class="liti__content" v-for="(item,index) in litigantList" :key="index">
            <span class="w2">{{item.litiTitle}}</span>
            <span class="w4">{{item.name}}</span>
            <div class="w100" style="color:#12b7f5;"><span style="color:#777777;">地址：</span>{{item.address}}</div>
          </li>
        </ul>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  props: {
    litigantList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeName2: 0
    };
  }
};
</script>
<style scoped lang="scss">
.detail_content {
  height: calc(100vh - 109px);
  overflow-y: scroll;
  text-align: left;
  .w2 {
    width: 20%;
  }
  .w4 {
    width: 40%;
  }
  .w100 {
    width: 100%;
  }
  .el-row {
    line-height: 3;
    border-bottom: 1px solid $borderColor;
    font-size: 12px;
    color: #777777;
  }

  .el-col-16 {
    text-align: right;
  }

  .address {
    text-align: center;
  }
  .liti__title,
  .liti__content {
    display: flex;
    flex-wrap: wrap;
    line-height: 3;
    font-size: 12px;
    color: #777777;
  }
  .judge_info {
    line-height: 3;
    font-size: 12px;
    color: #777777;

    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $borderColor;
    }
  }
}
</style>