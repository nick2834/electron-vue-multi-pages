<!-- 关闭按钮组件 -->
<template>
  <div class="close_bar dragable">
    <div class="btn__group no__dragable">
      <span
        v-if="$route.path != '/login'"
        class="icon_btn icon_minus el-icon-setting"
        :class="$route.path != '/login' ? 'base__color' :''"
        @click="errorClick"
      ></span>
      <span
        class="icon_btn icon_minus el-icon-minus"
        :class="$route.path != '/login' ? 'base__color' :''"
        @click="minusClick"
      ></span>
      <span
        class="icon_btn icon_close el-icon-close"
        :class="$route.path != '/login' ? 'base__color' : ''"
        @click="closeClick"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    minusClick() {
      this.$electron.ipcRenderer.send("min-app");
    },
    closeClick() {
      this.$electron.remote.getGlobal('appData').userInfo = null;
      this.$electron.ipcRenderer.send("close-app");
    },
    errorClick(){
      this.$electron.ipcRenderer.send("open-error-dialog");
    }
  },
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
.close_bar {
  display: flex;
  position: absolute;
  right: 0;
  z-index: 2;
  cursor: pointer;
  width: 100%;
  flex-direction: row-reverse;
  .btn__group {
  }
  .icon_btn {
    cursor: pointer;
    width: 20px;
    height: 15px;
    font-size: 16px;
    line-height: 15px;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    padding: 5px;
    // background: rgba($color: #ffffff, $alpha: 0.6);
    &.icon_minus {
      margin-right: 1px;
      &:hover {
        background: rgba($color: #ffffff, $alpha: 0.8);
      }
    }
    &.icon_close:hover {
      background: #f56c6c;
      color: #ffffff;
    }
    &.base__color {
      color: #333333;
    }
  }
}
</style>