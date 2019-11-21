<!-- 模态框 -->
<template>
  <el-container>
    <el-header class="dragable" style="height:55px">
      {{caseNo}}
      <div class="close_bar dragable">
        <div class="btn__group no__dragable">
          <span class="icon_btn icon_minus el-icon-minus" @click="minusClick"></span>
          <span class="icon_btn icon_close el-icon-close" @click="closeClick"></span>
        </div>
      </div>
    </el-header>
  </el-container>
</template>

<script>
const { ipcRenderer } = require("electron");
export default {
  data() {
    return {};
  },
  computed: {
    caseNo: {
      get() {
        return this.$store.state.cases.caseNo;
      }
    }
  },
  watch:{
    caseNo(val){
      console.log(val)
    }
  },
  methods: {
    minusClick() {
      ipcRenderer.send("modal_minu");
    },
    closeClick() {
      ipcRenderer.send("modal_close");
    }
  },
  mounted(){
    console.log(this.caseNo)
  }
};
</script>
<style scoped lang="scss">
.close_bar {
  cursor: pointer;
  flex-direction: row-reverse;
  float: right;
  .icon_btn {
    cursor: pointer;
    width: 15px;
    height: 15px;
    font-size: 16px;
    line-height: 15px;
    text-align: center;
    color: #333;
    // font-weight: bold;
    padding: 5px;
    // background: rgba($color: #ffffff, $alpha: 0.6);
    &.icon_minus {
      margin-right: 1px;
      &:hover {
        border-radius: 50%;
        background: rgba($color: #ffffff, $alpha: 0.8);
      }
    }
    &.icon_close:hover {
      border-radius: 50%;
      background: #f56c6c;
      color: #ffffff;
    }
    &.base__color {
      color: #333333;
    }
  }
}
</style>