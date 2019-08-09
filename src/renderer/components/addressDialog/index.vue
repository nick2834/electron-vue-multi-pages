<template>
  <div class="address_dialog">
    <div class="dialog_content">
      <div class="dialog_title">提示</div>
      <div class="dialog_header">
        <p>您在本平台提供或确认的送达地址，将适用于一审、二审、再审审查、执行程序，以及同期在受理法院审理的其他案件。</p>
        <p>您注册本平台时已经验证手机号码，该号码将作为您的联系方式予以确认。</p>
        <p>请填写有效的邮寄送达地址。如本人收件不需填写收件人姓名和电话；如由他人代收请一并填写代收人姓名和电话。</p>
      </div>
      <div class="dialog_body">
        <el-form
          ref="addressForm"
          :model="addressForm"
          label-width="80px"
          :rules="rules"
          label-position="top"
        >
          <el-form-item label prop="address">
            <el-input type="textarea" v-model="addressForm.address" placeholder="请在此填写送达地址"></el-input>
          </el-form-item>
          <p
            class="info"
          >因受送达人自己提供或者确认的送达地址不准确、拒不提供送达地址、送达地址变更未及时告知人民法院、受送达人本人或者受送达人指定的代收人拒绝签收，导致诉讼文书未能被受送达人实际接收的，文书退回之日视为送达之日。</p>
          <el-button type="primary" @click="onSubmit">确认送达地址</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addressDialog: false,
      addressForm: {
        address: ""
      },
      rules: {
        address: [
          { required: true, message: "请输入正确的送达地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          console.log(valid);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.address_dialog {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  left: 0;
  right: 0;
  display: flex;

  .dialog_content {
    width: 50%;
    height: auto;
    background: #ffffff;
    margin: auto;
    padding: 30px;
    border-radius: 20px;
    .dialog_title {
      text-align: center;
      font-size: 18px;
      color: #303133;
      margin-bottom: 15px;
    }

    .dialog_header {
      color: #606266;
      line-height: 24px;
      font-size: 14px;
    }
    .dialog_body {
      margin: 10px 0;
      color: #606266;
      line-height: 24px;
      font-size: 14px;
      .info {
        margin: 10px 0;
      }

      .el-button--primary {
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
