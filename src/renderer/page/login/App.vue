<template>
  <div id="app">
    <div id="login">
      <!-- <div class="close__bar">
        <div class="close_btn__group">
          <span class="icon_btn icon_minus el-icon-setting"></span>
          <span class="icon_btn icon_minus el-icon-minus"></span>
          <span class="icon_btn icon_close el-icon-close"></span>
        </div>
      </div>-->
      <div class="login-container">
        <div class="login_box login_left dragable">
          <div class="login_header no__dragable">
            <span @click="activeId = 0" :class="{active:activeId == 0}">扫码登录</span>
            <span @click="activeId = 1" :class="{active:activeId == 1}">账号登录</span>
          </div>
          <div class="login_content dragable" v-if="activeId == 0">
            <div class="qrcode_box">
              <img class="qrcode" src="@/assets/images/qrcode.jpg" alt />
            </div>
            <div class="qrcode_info">请使用微信扫码登录</div>
          </div>
          <div class="login_content no__dragable" v-else>
            <el-form :model="userForm" :rules="rules" ref="userForm">
              <el-form-item prop="username">
                <el-input prefix-icon="el-icon-user" v-model="userForm.username" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="userForm.password"
                  placeholder="密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')" :loading="loading">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="login_box login_right dragable">
          <img src="@/assets/images/login-bg.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closeBar from "@/components/closeBar";
// const {remote,electron} = 'electron'
export default {
  name: "App",
  components: {
    closeBar
  },
  data() {
    return {
      activeId: 0,
      userForm: {
        username: "admin",
        password: "123123"
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ]
      },
      loading: false
    };
  },
  methods: {
    submitForm(userForm) {
      let _this = this;
      let el = _this.$electron;
      _this.loading = true;
      _this.$refs[userForm].validate(valid => {
        if (valid) {
          this.$http
            .post("auth/login", {
              username: "tc123",
              password: "123456",
              moduleId: "tc-login"
            })
            .then(({ data }) => {
              _this.loading = false;
              let token = data.data.Authorization;
              el.ipcRenderer.send("showMainWindow");
              el.ipcRenderer.send("hideLoginWindow");
              el.remote.getGlobal("appData").Authorization = token;
            });
          // return;

          // _this.$electron.ipcRenderer.send("showMainWindow");
          // _this.$electron.ipcRenderer.send("hideLoginWindow");
          // _this.$electron.remote.getGlobal("appData").userInfo = _this.userForm;
          // _this.loading = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/style/reset.css";
#app {
  user-select: none;
}
.dragable {
  -webkit-app-region: drag;
}
.no__dragable {
  -webkit-app-region: no-drag;
}
#login {
  position: relative;
  user-select: none;
  height: 323px;
  .close__bar {
    height: 25px;
    width: 100%;
    position: absolute;
    line-height: 25px;
    .close_btn__group {
      float: right;
      .icon_btn {
        cursor: pointer;
        width: 20px;
        font-size: 16px;
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
  }
}
.login-container {
  width: 500px;
  height: 323px;
  // border-radius: 10px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
}
.login_left {
  width: 300px;
  padding: 20px;
  position: relative;
}
.login_header {
  margin-bottom: 40px;
}
.login_header span {
  margin-right: 20px;
  cursor: pointer;
  font-size: 16px;
}
.login_header span.active {
  color: #0052d9;
  padding-bottom: 10px;
  border-bottom: 3px solid #0052d9;
}
.login_content {
  .qrcode_box {
    .qrcode {
      width: 160px;
      height: 160px;
      display: block;
      margin: 0 auto;
    }
  }
  .qrcode_info {
    text-align: center;
    font-size: 13px;
    margin-top: 10px;
    color: #999;
  }
}
.el-button--primary {
  width: 100%;
}
</style>
