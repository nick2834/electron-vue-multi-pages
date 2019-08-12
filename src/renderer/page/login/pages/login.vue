<template>
  <div id="login">
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
</template>

<script>
export default {
  data() {
    return {
      activeId: 0,
      userForm: {
        username: "admin",
        password: "123123",
        role: "1,2,3",
        identityId: "",
        signPic: "",
        nickName: "",
        avatar: "",
        openid: ""
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
      _this.$refs[userForm].validate(valid => {
        if (valid) {
		  _this.loading = true;
      _this.$electron.ipcRenderer.send("showMainWindow");
      _this.$electron.ipcRenderer.send("hideLoginWindow");
      _this.$electron.remote.getGlobal('appData').userInfo = _this.userForm
		  _this.loading = false;
		  return
          _this.$store
            .dispatch("authLogin", _this.userForm)
            .then(res => {
              // _this.$router.push("/");
              _this.$electron.ipcRenderer.send("switchToHome");
              _this.loading = false;
            })
            .catch(err => {
              _this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
  created(){
    console.log(this.$electron.remote.getGlobal('appData'))
  }
};
</script>
<style lang="scss" scoped>
#login {
  position: relative;
  width: 100%;
  height: 100vh;
  // background-image: url(~@/assets/login_bg.jpg);
  background-size: cover;
  background-position: center;
  user-select: none;
}
.login-container {
  width: 500px;
  height: 323px;
  // border-radius: 10px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  overflow: hidden;
  background: #ffffff;
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
.login_right {
}
</style>
