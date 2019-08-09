<template>
  <div class="toggleBox">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in 10" :key="index">
        <div class="grid-content">
          <i class="el-icon-upload"></i>
          <span>测试 {{item}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.toggleBox {
  position: absolute;
  top: 60px;
  border: 1px solid #eaeaea;
  z-index: 2;
  background-color: #ffffff;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px;
  box-shadow: 0px 12px 8px -12px #000;
}

.el-col {
  margin-bottom: 20px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;

  i {
    font-size: 48px;
  }

  span {
    font-size: 16px;
    line-height: 2;
  }

  &:hover {
    color: #0052D9;
  }
}
</style>
