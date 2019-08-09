<!--案件调解-->
<template>
  <div class="makepeace_content">
    <back-btn title="案件调解"/>
    <section>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="1">发送图片</el-radio-button>
        <el-radio-button label="2">发送文字</el-radio-button>
      </el-radio-group>
      <div class="td_title">调解协议标题</div>
      <el-input placeholder="请输入调解协议标题" v-model="td_title" clearable type="textarea"></el-input>
      <template v-if="tabPosition == 1">
        <div class="td_title td_title_top">提交笔录图片：</div>
        <el-upload
          action
          :http-request="fileUpload"
          list-type="picture-card"
          multiple
          accept=".jpeg, .png"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          v-viewer
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </template>
      <template v-if="tabPosition == 2">
        <div class="td_title td_title_top">调解内容</div>
        <el-input placeholder="请输入调解内容" v-model="td_content" clearable type="textarea"></el-input>
      </template>
      <el-checkbox-group
        v-model="checkList"
        class="el-radio-group__title"
        text-color="#0052D9"
      >
        <el-checkbox v-for="(item,index) in optList" :label="item.value" :key="index">
          <div @click.stop="checkDetail" class="check_content">
            <span>{{item.name}}</span>
          </div>
        </el-checkbox>
      </el-checkbox-group>
      <el-button type="primary" :loading="isSendLoading">提交</el-button>
    </section>
  </div>
</template>
<script>
import uploadFiles from "@/service/upload";
import { cosOption } from "@/service/config";
export default {
  data() {
    return {
      isSendLoading: false,
      checkedMsg: false,
      tabPosition: 1,
      checkList: [],
      options: {
        inline: false,
        title: false,
        rotatable: false,
        scalable: false
      },
      td_title: "",
      td_content: "",
      optList:[
         { value:0,name:"发送短信提醒"},
         { value:1,name:"调解协议，需要当事人确认同意"}
      ]
    };
  },
  methods: {
    fileUpload(e) {},
    handlePictureCardPreview(e) {},
    handleRemove(e) {
      console.log(e);
    },
    checkDetail(e) {
      console.log(this.checkList);
    },
    change(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  margin-top: 20px;

  .el-radio-group__title {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .el-checkbox {
      margin-bottom: 20px;
    }

    .check_content {
      position: relative;

      img {
        position: absolute;
        left: 0;
        width: 100%;
        height: 20px;
        opacity: 0;
      }
    }
  }

  .td_title {
    line-height: 2;
    background: #f5f7fa;
    padding: 0 10px;
    margin-bottom: 20px;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;

    &.td_title_top {
      margin-top: 20px;
    }
  }

  .reciver {
    display: flex;
    background: #f5f7fa;
    line-height: 2;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    color: #888888;
    margin-top: 20px;
  }
}
</style>
