<!--文书送达-->
<template>
  <div class="document_content">
    <back-btn title="文书送达"/>
    <section>
      <template v-for="(item,index) in files">
        <div class="doc_box" :key="index">
          <div class="doc_title">
            <p class>文书{{(index+1) | number}}</p>
            <i class="el-icon-circle-close" v-show="index != 0" @click="deleteFiles(index)"></i>
          </div>
          <el-upload
            action
            :data="{index:index}"
            :http-request="fileUpload"
            :on-remove="handleRemove"
            :item="item"
            :list-index="index"
            list-type="picture-card"
            multiple
            accept=".jpeg, .jpg, .png"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-select
            v-model="item.types[0].typename"
            filterable
            allow-create
            default-first-option
            placeholder="请选择文书类型"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.typename"
            ></el-option>
          </el-select>
        </div>
      </template>
      <p class="add_more" @click="addFiles">继续添加</p>
      <div class="reciver">
        <span>选择接收方</span>
        <el-checkbox v-model="checkedMsg" @change="handleSendMsg">发送短信提醒</el-checkbox>
      </div>
      <user-tree v-on:checkChange="checkChange"></user-tree>
      <el-button type="primary" :loading="isSendLoading" @click="handleSubmit">提交</el-button>
    </section>
  </div>
</template>
<script>
import number from "@/utils/number.js";
import userTree from "./userTree";
import { mapState, mapGetters } from "vuex";
import uploadFiles from "@/service/upload";
import { cosOption } from "@/service/config";
import { uniq, guid } from "@/utils/tools";
export default {
  props: {
    num: {
      required: false,
      default: 1
    }
  },
  components: {
    userTree
  },
  computed: {
    ...mapState(["caseId", "caseInfo", "toolTag", "messageData"])
  },
  data() {
    return {
      isSendLoading: false,
      viewerOption: cosOption.viewerOption,
      files: [
        {
          title: "文书一",
          imgs: [], //文书图片
          types: [{ value: this.num, typename: "" }] //文书类型
        }
      ],
      numbers: this.num,
      options: [
        { value: "0", typename: "传票" },
        { value: "1", typename: "出庭通知书" },
        { value: "2", typename: "起诉状" },
        { value: "3", typename: "答辩状" },
        { value: "4", typename: "应诉通知书" },
        { value: "5", typename: "举证通知书" },
        { value: "6", typename: "告知合议庭组成人员通知书" },
        { value: "7", typename: "裁定书" },
        { value: "8", typename: "调解书" },
        { value: "9", typename: "判决书" }
      ],
      dialogImageUrl: "",
      checkedMsg: false
    };
  },
  watch: {
    files(val) {
      console.log(val);
    }
  },
  filters: {
    number(str) {
      return number(str);
    }
  },
  methods: {
    handleRemove(index, item, listIndex) {
      item.imgs.splice(index, 1);
    },
    checkChange(e) {
      this.checkData = e;
    },
    handleSendMsg(e) {
      this.checkedMsg = !this.checkedMsg;
    },
    addFiles() {
      this.numbers++;
      var addFiles = {};
      var typeObj = { value: this.numbers, typename: "" };
      addFiles.title = "文书" + number(this.numbers);
      addFiles.imgs = [];
      addFiles.types = [];
      addFiles.types.push(typeObj);
      this.files.push(addFiles);
    },
    deleteFiles(e) {
      this.numbers--;
      this.files.splice(e, 1);
    },
    fileUpload(e) {
      let file = e.file;
      let fileTags = "/images/";
      let index = e.data.index;
      // this.files[index].imgs.push(e.file);
      uploadFiles(cosOption.Bucket, cosOption.Region, fileTags, file)
        .then(res => {
          this.fileKey = res.key;
          // console.log(res.Url);
          this.files[index].imgs.push(res.Url);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSubmit(e) {
      let isEmpty = true;
      let _this = this;
      _this.files.map(item => {
        if (
          item.types[0].typename == "" ||
          item.imgs.length == 0 ||
          !_this.checkData
        ) {
          isEmpty = false;
        }
      });
      if (!isEmpty) {
        _this.$message.error("请检查是否上传图片，选择文书类型及接收方");
        return;
      }
      _this.isSendLoading = true;
      let identityIds = uniq(_this.checkData.identityId); //接收者身份证
      let allJudgesIdentityId = uniq(_this.checkData.allJudgesIdentityId); //所以法官身份证
      let allReciveIdentityIds = uniq(allJudgesIdentityId.concat(identityIds)); //所有人身份证
      let reciverNames = uniq(_this.checkData.name); //接收者名字
      let messageData = this.messageData;
      var messageContent = {
        files: _this.files,
        receivers: identityIds.join(","),
        names: reciverNames.join(","),
        receiverIdentityId: allReciveIdentityIds.join(","),
        sendSource: 1, //判断是微法院发出
        sendNumber: guid()
      };
      messageData["receivers"] = allReciveIdentityIds.join(",");
      messageData["messageType"] = 8;
      messageData["messageBody"] = messageContent;
      messageData["sendSmsIdent"] = this.checkedMsg ? 1 : 0;
      console.log(messageData)
      _this.$store.dispatch("sendMessageInfo", messageData).then(res =>{
        _this.isSendLoading = false;
        _this.$store.commit('CLOSE_MODAL')
      });
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

  .doc_box {
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
}

.el-select {
  width: 100%;
  margin-top: 20px;
}
</style>
