<!-- header -->
<template>
  <el-row :gutter="20" type="flex" class="header_group dragable">
    <el-dropdown trigger="click" class="avatar_group">
      <div class="el-dropdown-link">
        <img src="~@/assets/images/avatar.jpg" class="header_avatar no__dragable" />
        <span>周星星</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>法官</el-dropdown-item>
        <el-dropdown-item>代理人</el-dropdown-item>
        <el-dropdown-item>自然人</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-menu
      :default-active="$route.name"
      class="no__dragable"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="wechat">
        <!-- <i class="el-icon-chat-dot-round"></i> -->
        <i class="iconfont icon-wechat"></i>
      </el-menu-item>
      <el-menu-item index="contact">
        <i class="iconfont icon-friend"></i>
      </el-menu-item>
      <el-menu-item index="collect">
        <i class="iconfont icon-collect"></i>
      </el-menu-item>
    </el-menu>
    <close-bar></close-bar>
  </el-row>
</template>

<script>
import closeBar from "../closeBar";
export default {
  data() {
    return {
      activeIndex: "1",
      input2: ""
    };
  },
  components: { closeBar },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.header_group {
  justify-content: space-between;
  .avatar_group {
    .header_avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      border: 1px solid #f6f7f9;
      cursor: pointer;
    }
  }
}
</style>