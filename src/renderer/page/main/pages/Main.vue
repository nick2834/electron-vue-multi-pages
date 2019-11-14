<template>
  <el-container>
    <el-header style="height:55px" class="dragable">
      <el-row :gutter="20">
        <el-col :span="4" :offset="2">
          <div class="el-input el-input--small el-input--prefix header_search">
            <input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner" />
            <span class="el-input__prefix">
              <i class="el-input__icon el-icon-search"></i>
            </span>
          </div>
        </el-col>
        <el-col :span="10" :offset="2" class="nav_menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <i class="el-icon-chat-dot-round"></i>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-user"></i>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-reading"></i>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2" :offset="4">
          <el-dropdown trigger="click">
            <img src="~@/assets/images/avatar.jpg" alt class="header_avatar el-dropdown-link" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>法官</el-dropdown-item>
              <el-dropdown-item>代理人</el-dropdown-item>
              <el-dropdown-item>自然人</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="240px">Aside</el-aside>
      <el-main>
        <h1>{{userInfo}}</h1>
        <el-button @click="logout">退出重新登录</el-button>

        <el-button @click.native="download">下载</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      activeIndex: "1",
      userInfo: null,
      input2: ""
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      }
    }
  },
  created() {
    this.userInfo = this.$electron.remote.getGlobal("appData");
    // console.log(this.user);
  },
  methods: {
    logout() {
      this.$electron.ipcRenderer.send("showLoginWindow");
      this.$electron.ipcRenderer.send("hideMainWindow");
      this.$electron.remote.getGlobal("appData").userInfo = null;
      this.$store.commit("REMOVE_USER", null);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 导出PDF
    download() {
      this.$http({
        method: "post",
        url: "http://192.168.137.1:8986/biz/createPDF",
        data: {
          fileName: "string",
          htmlStr: "string"
        },
        responseType: "arraybuffer"
      }).then(response => {
        var fileURL = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.pdf");
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    }
  },
  mounted() {
    console.log(store.state);
  }
};
</script>
<style lang="scss" scoped>
.header_search {
  [class*="el-input__"] {
    border-radius: 20px;
  }
}
.header_avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #f6f7f9;
  cursor: pointer;
}
</style>

