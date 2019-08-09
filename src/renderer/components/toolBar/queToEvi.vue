<!--质证-->
<template>
  <div class="evidence_content">
    <back-btn title="质证"/>
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      class="demo-ruleForm"
      label-position="left"
    >
      <div class="el-alert el-alert--info">
        <i class="el-icon-info"></i>
        <div class="el-alert__content">
          <span class="el-alert__title">
            对该证据的真实性、合法性、关联性及证明目的有异议质证是对证据发表意见。请参考。
            <a href="javascript:void();">质证指导和示例</a>
          </span>
        </div>
      </div>
      <el-form-item label="提出异议:">
        <el-switch v-model="numberValidateForm.delivery"></el-switch>
      </el-form-item>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="1">文字质证</el-radio-button>
        <el-radio-button label="2">上传文件</el-radio-button>
      </el-radio-group>
      <el-form-item label prop="age" v-if="tabPosition == 1">
        <el-input type="textarea" v-model="numberValidateForm.age" placeholder="请在此填写质证意见"></el-input>
      </el-form-item>
      <el-form-item label prop="age" v-if="tabPosition == 2">
        <el-upload
          action
          :http-request="fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          multiple
          accept="jpeg"
          v-viewer
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uploadFiles from "@/service/upload";
const Bucket = "tc-buck-1254338133";
const Region = "ap-guangzhou";
export default {
  data() {
    return {
      tabPosition: "1",
      numberValidateForm: {
        age: "",
        delivery: false
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgFiles:[]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fileUpload(e) {
      let file = e.file;
      let fileTags = "/files/";
      uploadFiles(Bucket, Region, fileTags, file).then(res => {
        console.log(res);
        this.fileKey = res.key;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
section .el-button{
    width: auto;
    margin-top: 30px;
}
.evidence_content {
  .el-alert--info {
    background: #ecf6ff;
    margin: 20px 0;

    i {
      color: #0052D9;
      font-size: 20px;
    }

    a {
      color: #0052D9;
    }
  }
}
</style>
