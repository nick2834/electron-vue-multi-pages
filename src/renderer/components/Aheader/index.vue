<!-- header -->
<template>
  <el-row :gutter="20" type="flex" class="header_group dragable">
    <el-dropdown trigger="click" class="avatar_group" @command="handleCommand">
      <div class="el-dropdown-link">
        <img src="~@/assets/images/avatar.png" class="header_avatar no__dragable" />
        <span class="user-role__name">
          <div class="name">{{userInfo.nickName}}</div>
          <div class="role">{{defauleRoleName}}</div>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="r" v-for="r in roleList" :key="r.role">{{r.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-menu
      :default-active="$route.meta.parentName ? $route.meta.parentName : $route.name"
      class="no__dragable"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item index="setup" v-if="!isJudge">
        <i class="iconfont icon-lian"></i>
      </el-menu-item>
      <el-menu-item index="wechat">
        <i class="iconfont icon-wechat">
          <span class="badge" v-show="msgCount != 0">{{msgCount > 99 ? '99+':msgCount}}</span>
        </i>
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
var userRoleArr = [];
export default {
  data() {
    return {
      activeIndex: "1",
      input2: "",
      defauleRoleName: "",
      roleList: []
    };
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      }
    },
    msgCount: {
      get() {
        return this.$store.state.cases.msgCount;
      }
    },
    role: {
      get() {
        return this.$store.state.user.role;
      }
    },
    isJudge: {
      get() {
        return this.$store.state.user.isJudge;
      },
      set(val) {
        this.$store.commit("user/updateIsjudge", val);
      }
    },
    caseId: {
      get() {
        return this.$store.state.cases.caseId;
      },
      set(val) {
        this.$store.commit("cases/clearCaseid", val);
      }
    }
  },
  components: { closeBar },
  methods: {
    handleCommand(e) {
      this.isJudge = e.role == 3 ? true : false;
      this.defauleRoleName = e.name;
      this.$store.commit("user/updateRole", e.role);
      this.roleList = userRoleArr.filter(
        item => item.name != this.defauleRoleName
      );
      this.caseId = "";
      this.show = false;
    },
    handleSelect(key, keyPath) {
      if (key != "wechat") this.$store.commit("cases/clearCaseid", "");
    }
  },
  mounted() {
    this.$store.dispatch("cases/getUnreadMessages");
    console.log(this.$router.options.routes.filter(item => !item.hidden));
  },
  created() {
    let roles = this.userInfo && this.userInfo.role;
    if (roles.indexOf("4") != -1) {
      var newRole = roles.split(",");
      newRole.pop();
      newRole.unshift("-1");
      roles = newRole.join(",");
    }
    if (roles.indexOf("3") != -1) {
      userRoleArr.push({
        id: 0,
        role: 3,
        name: "faguan"
      });
    }
    if (roles.indexOf("2") != -1) {
      userRoleArr.push({
        id: 1,
        role: 2,
        name: "dailiren"
      });
    }
    if (roles.indexOf("1") != -1) {
      userRoleArr.push({
        id: 2,
        role: 1,
        name: "dangshiren"
      });
    }
    if (roles.indexOf("-1") != -1) {
      userRoleArr.push({
        id: 3,
        role: 4,
        name: "qitashenfen"
      });
    }
    this.defauleRoleName = userRoleArr[0].name;
    this.roleList = userRoleArr.filter(
      item => item.name != this.defauleRoleName
    );
  }
};
</script>
<style lang="scss" scoped>
.header_group {
  justify-content: space-between;
  .avatar_group {
    cursor: pointer;
    .header_avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      border: 1px solid $borderColor;
    }
    .user-role__name {
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      .name {
        line-height: 25px;
        font-weight: 500;
        font-size: 14px;
      }
      .role {
        line-height: 15px;
        font-size: 12px;
        background: #12b7f5;
        color: #ffffff;
        padding: 0 5px;
        border-radius: 10px;
      }
    }
  }
  .badge {
    position: absolute;
    top: -8px;
    left: 20px;
    background-color: #f56c6c;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
  }
}
</style>