<!-- 关闭按钮组件 -->
<template>
  <div class="close_bar dragable">
    <div class="btn__group no__dragable">
      <el-dropdown trigger="click">
        <span class="icon_btn base__color icon_minus el-icon-setting el-dropdown-link"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleLogout">注销</el-dropdown-item>
          <el-dropdown-item @click.native="handleClose">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

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
import {remote,ipcRenderer} from 'electron'
export default {
  data() {
    return {
      ipc: ipcRenderer
    };
  },
  methods: {
    minusClick() {
      ipcRenderer.send("mian_min");
    },
    closeClick() {
      remote.getGlobal("appData").userInfo = null;
      ipcRenderer.send("mian_close");
    },
    handleLogout(){
      ipcRenderer.send("showLoginWindow");
      ipcRenderer.send("hideMainWindow");
      remote.getGlobal("appData").userInfo = null;
      this.$store.commit("REMOVE_USER", null);
    },
    handleClose(){
      ipcRenderer.send('close_login')
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.close_bar {
  // display: flex;
  // position: absolute;
  // right: 0;
  // z-index: 2;
  cursor: pointer;
  // width: 100%;
  flex-direction: row-reverse;
  .icon_btn {
    cursor: pointer;
    width: 15px;
    height: 15px;
    font-size: 16px;
    line-height: 15px;
    text-align: center;
    color: #ffffff;
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