<!--制作笔录-->
<template>
  <div class="takedown_content">
    <back-btn title="制作笔录"/>
    <section>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="1">预存告知书</el-radio-button>
        <el-radio-button label="2">发送图片</el-radio-button>
        <el-radio-button label="3">发送文字</el-radio-button>
      </el-radio-group>
      <template v-if="tabPosition == 1">
        <el-checkbox-group
          v-model="checkList"
          class="el-radio-group__title"
          text-color="#0052D9"
          @change="change"
        >
          <el-checkbox v-for="(item,index) in takeDownList" :label="item.value" :key="index">
            <div @click.stop="checkDetail" v-viewer="options" class="check_content">
              <span>{{item.name}}</span>
              <img :src="item.imgUrl" alt>
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-else>
        <div class="td_title">笔录标题</div>
        <el-input placeholder="请输入笔录标题" v-model="td_title" clearable type="textarea"></el-input>
        <template v-if="tabPosition == 2">
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
        <template v-if="tabPosition == 3">
          <div class="td_title td_title_top">笔录内容</div>
          <el-input placeholder="请输入笔录内容" v-model="td_content" clearable type="textarea"></el-input>
        </template>
        <div class="reciver">
          <span>选择接收方</span>
          <el-checkbox v-model="checkedMsg">发送短信提醒</el-checkbox>
        </div>
       <user-tree v-on:checkChange="checkChange"></user-tree>
      </template>
      <el-button type="primary" :loading="isSendLoading">提交</el-button>
    </section>
  </div>
</template>
<script>
import userTree from './userTree'
export default {
  data() {
    return {
      isSendLoading: false,
      checkedMsg: false,
      tabPosition: 1,
      checkList: [],
      takeDownList: [
        {
          name: "告知书",
          value: "0",
          txtStyle: 0,
          imgUrl:
            "https://tc-buck-1254338133.cos.ap-guangzhou.myqcloud.com/0.16147595346450916.o6zAJs6rYfmQBMEnvTtgIxjYALP8.VM1dEn9Fu1VEe6e54afc2505faac3f86f5aedb8f538f.png"
        },
        {
          name: "庭审告知书",
          value: "1",
          txtStyle: 0,
          imgUrl:
            "https://tc-buck-1254338133.cos.ap-guangzhou.myqcloud.com/0.5300732758564621.o6zAJs6rYfmQBMEnvTtgIxjYALP8.RaYTn2ne8Ibu9f153bf14c731ff296cb7956100c9d6f.png"
        },
        {
          name: "判决书、裁定书、调解书电子送达告知书",
          value: "2",
          txtStyle: 0,
          imgUrl:
            "https://tc-buck-1254338133.cos.ap-guangzhou.myqcloud.com/0.19002954821785423.o6zAJs6rYfmQBMEnvTtgIxjYALP8.JdspgVWK2hIb1f8def30da4a732701b09e9f6d1d5257.png"
        }
      ],
      options: {
        inline: false,
        title: false,
        rotatable: false,
        scalable: false
      },
      td_title: "",
      td_content: ""
    };
  },
  components:{
    userTree
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
    },
    checkChange(e){
      // console.log(e)
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
