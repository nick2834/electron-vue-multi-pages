<!-- 侧边栏 -->
<template>
  <el-menu
    :default-active="$route.meta.parentPath ? $route.meta.parentPath : $route.path"
    class="el-menu-vertical dragable"
    background-color="#0052D9"
    active-text-color="#ffffff"
    text-color="#fff"
    @select="navSelect"
    :collapse="isCollapse"
    router
  >
    <header class="no__dragable" @click="isCollapse = !isCollapse">
      <img class="avatar" src="@/assets/images/avatar.png" alt />
    </header>
    <div class="el-dropdown">
      <span @click="handleCheckRole">
        {{defauleRoleName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-collapse-transition>
        <ul class="role_list" v-show="show">
          <li v-for="item in roleList" :key="item.id" @click="handleChangeRole(item)">{{item.name}}</li>
        </ul>
      </el-collapse-transition>
    </div>
    <el-menu-item class="no__dragable" v-for="(item,index) in menuRouter" :key="index" :index="'/' +item.path" v-if="item.meta.hasRole.indexOf(role) >=0">
      <i class="iconfont" :class="item.meta.icon">
        <span class="badge" v-show="index == 2 && msgCount != 0">{{msgCount}}</span>
      </i>
      <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
    <footer>
      <i class="el-icon-setting no__dragable" @click="isCollapse = !isCollapse"></i>
    </footer>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
var userRoleArr = [];
export default {
  data() {
    return {
      isCollapse: true,
      menuRouter: [],
      show: false,
      defauleRoleName: "",
      roleList: []
    };
  },

  components: {},

  computed: {
    ...mapState(["user", "msgCount", "avatar", "role"])
  },

  mounted() {
    this.menuRouter = this.$router.options.routes.find(
      item => !item.hidden
    ).children;
    this.$store.dispatch("getUnreadMessage");
  },
  methods: {
    removeUser() {
      this.$store.dispatch("logout");
    },
    navSelect(index, indexPath) {
      this.$store.commit("CLEAR_SELECT_CASE");
    },
    handleCheckRole() {
      this.show = !this.show;
    },
    handleChangeRole(e) {
      this.defauleRoleName = e.name;
      this.$store.commit("CHANGE_ROLE", e.role);
      this.roleList = userRoleArr.filter(
        item => item.name != this.defauleRoleName
      );
      this.show = false;
    }
  },
  created() {
    let roles = this.user && this.user.role;
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
        name: "法官"
      });
    }
    if (roles.indexOf("2") != -1) {
      userRoleArr.push({
        id: 1,
        role: 2,
        name: "代理人"
      });
    }
    if (roles.indexOf("1") != -1) {
      userRoleArr.push({
        id: 2,
        role: 1,
        name: "当事人"
      });
    }
    if (roles.indexOf("-1") != -1) {
      userRoleArr.push({
        id: 3,
        role: 4,
        name: "其他"
      });
    }
    this.defauleRoleName = userRoleArr[0].name;
    this.roleList = userRoleArr.filter(
      item => item.name != this.defauleRoleName
    );
  }
};
</script>
<style scoped lang="scss">
.el-menu-vertical {
  width: 70px;
  height: 100vh;
  position: relative;
  border: none;
  header {
    width: 100%;
    margin: 70px 0 20px 0;
    .avatar {
      width: 42px;
      height: 42px;
      margin: 0 auto;
      border-radius: 2px;
      display: block;
    }
  }
  .el-dropdown {
    text-align: center;
    display: block;
    color: #ffffff;
    line-height: 3;
    cursor: pointer;
    position: relative;
    font-size: 12px;

    .role_list {
      width: 100%;
      // background rgba(255,255,255,0.9)
      color: rgb(0, 220, 65);
      cursor: pointer;
    }
  }
  .el-menu-item {
    text-align: center;
    // font-size: 25px;
    &.is-active {
      background: #3681ff !important;
    }
    .iconfont {
      position: relative;
      color: #ffffff;
    }

    .badge {
      position: absolute;
      top: -10px;
      width: 20px;
      height: 20px;
      background: red;
      font-size: 12px;
      border-radius: 50%;
      right: -10px;
      margin: 0;
      visibility: visible;
      line-height: 20px;
      text-align: center;
      color: #ffffff;
    }

    span {
      //   margin-left: 20px;
    }
  }
  footer {
    position: absolute;
    bottom: 30px;
    width: 100%;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    font-size: 24px;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
  border: none;
  .el-menu-item {
    // text-align: left;
  }
}
</style>