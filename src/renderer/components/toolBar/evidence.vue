<!--提交证据-->
<template>
  <div class="document_content">
    <back-btn title="提交证据"/>
    <section>
      <div class="doc_title">
        <p class>请上传证据材料的证据目录(可选)</p>
      </div>
      <el-upload
        action
        :data="{index:1}"
        :http-request="fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        multiple
        accept="jpeg"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="doc_title">请按证据目录的顺序上传证据</div>
      <template v-for="(item,index) in files">
        <div class="doc_box" :key="index">
          <div class="doc_title">
            <p class>添加证据{{(index+1) | number}}</p>
            <i class="el-icon-circle-close" v-show="index != 0" @click="deleteFiles(index)"></i>
          </div>
          <el-upload
            action
            :data="{index:index}"
            :http-request="fileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            multiple
            accept="jpeg"
            :ref="'evilist-'+(index + 1)"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </template>
      <p class="add_more" @click="addFiles">继续添加</p>
      <div class="reciver">
        <span>选择证据提供方</span>
        <el-checkbox v-model="checkedMsg">发送短信提醒</el-checkbox>
      </div>
      <user-tree v-on:checkChange="checkChange"></user-tree>
      <el-button type="primary" :loading="isSendLoading" @click="handleSubmit">提交</el-button>
    </section>
    <div v-show="hidden" v-viewer="viewerOption" class="eviMenu" ref="eviMenu">
      <img width="100%" :src="dialogImageUrl" alt>
    </div>
  </div>
</template>
<script>
import number from "@/utils/number.js";
import userTree from "./userTree";
import { mapState, mapGetters } from "vuex";
import uploadFiles from "@/service/upload";
import { cosOption } from "@/service/config";
export default {
  components: {
    userTree
  },
  props: {
    num: {
      required: false,
      default: 1
    }
  },
  computed: {
    ...mapState(["caseId", "caseInfo", "toolTag"])
  },
  data() {
    return {
      isSendLoading: false,
      viewerOption: cosOption.viewerOption,
      files: [
        {
          title: "",
          tip: "", //方便证据对话赋值（查看证据一详情,证据一的质证意见）
          imgs: [], //证据图片
          question: [] //质证意见
        }
      ],
      numbers: this.num,
      dialogImageUrl: "",
      checkedMsg: false,
      checkData: {},
      hidden: false,
      filesImageList: []
    };
  },
  filters: {
    number(str) {
      return number(str);
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.$nextTick(() => {
        const viewer = this.$refs.eviMenu.$viewer;
        viewer.show();
      });
    },
    handleChange(file, fileList) {
      this.dialogImageUrl = file.url;
    },
    handleRemove(file, fileList) {},
    checkChange(e) {
      this.checkData = e;
    },
    addFiles() {
      this.numbers++;
      var addFiles = {};
      addFiles.tip = "证据" + number(this.numbers);
      addFiles.imgs = [];
      addFiles.types = [];
      this.files.push(addFiles);
    },
    deleteFiles(e) {
      this.numbers--;
      this.files.splice(e, 1);
    },
    fileUpload(e) {
      console.log(e)
    },
    handleSubmit(e) {
      this.isSendLoading = true;
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  .add_more {
    text-align: center;
    line-height: 2;
    cursor: pointer;
    color: #0052D9;
    margin-bottom: 20px;
  }

  .reciver {
    display: flex;
    background: #f5f7fa;
    line-height: 2;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    color: #888888;
  }

  .doc_title {
    line-height: 2;
    background: #f5f7fa;
    padding: 0 10px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888888;

    i {
      cursor: pointer;
      color: #999999;
      font-size: 20px;

      &:hover {
        color: #333333;
      }
    }
  }
}

.el-select {
  width: 100%;
  margin-top: 20px;
}
</style>
