<!-- 文本输入框 -->
<template>
  <div class="text" @click="closeModal">
    <div class="toolbar">
      <el-upload
        class="upload-demo"
        action
        :http-request="imgUpload"
        accept=".jpg, .jpeg, .png"
        :show-file-list="showFileList"
        :limit="3"
      >
        <i class="icon iconfont icon-img"></i>
      </el-upload>
      <el-upload
        class="upload-demo"
        action
        :http-request="fileUpload"
        accept=".doc, .pdf, .docx"
        :show-file-list="showFileList"
        :limit="3"
      >
        <i class="icon iconfont icon-file"></i>
      </el-upload>
      <i class="icon iconfont icon-huatong1"></i>
    </div>
    <textarea ref="text" v-model="content" @keyup="onKeyup"></textarea>
    <div class="send" @click="send">
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import uploadFiles from "@/service/upload";
const Bucket = "tc-buck-1254338133";
const Region = "ap-guangzhou";
export default {
  data() {
    return {
      content: "",
      reply: "未找到",
      frequency: 0,
      warn: false,
      showFileList: false
    };
  },
  computed: {
    ...mapState(["caseId", "messageData"]),
    ...mapGetters(["selectedChat"]),
    prevScrollHeight(val) {
      console.log(val);
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("CLOSE_MODAL", false);
    },
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.send();
      }
    },
    //发送图片消息
    imgUpload(e) {
      this.$bus.$emit("prevScrollHeight", 0);
      let file = e.file;
      let fileTags = "/images/";
      let messageData = this.messageData;
      uploadFiles(Bucket, Region, fileTags, file)
        .then(res => {
          this.fileKey = res.key;
          messageData.messageType = 2;
          messageData.messageBody = res.Url;
          this.$store.dispatch("sendMessageInfo", messageData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 发送文件消息
    fileUpload(e) {},
    // 点击发送按钮发送信息
    send() {
      if (this.content.length <= 1) {
        this.warn = true;
        this.content = "";
        setTimeout(() => {
          this.warn = false;
        }, 1000);
      } else {
        let messageData = this.messageData;
        var msg = {
          content: this.content
        };
        this.$bus.$emit("prevScrollHeight", 0);
        messageData.messageType = 1;
        messageData.messageBody = msg;
        this.$store.dispatch("sendMessageInfo", messageData);
        this.content = "";
      }
    }
  },
  // 在进入的时候 聚焦输入框
  mounted() {
    this.$refs.text.focus();
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    caseId() {
      setTimeout(() => {
        this.$refs.text.focus();
      }, 0);
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === "") {
        if (this.frequency === 0) {
          this.warn = true;
          this.frequency++;
          setTimeout(() => {
            this.warn = false;
          }, 1000);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  position: relative;
  height: 250px;
  background: #f2f2f2;

  .toolbar {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    padding: 0 30px;
    box-sizing: border-box;
    color: #7c7c7c;
    border-bottom: 1px solid #e7e7e7;
    display: flex;

    .iconfont {
      cursor: pointer;
      margin-right: 20px;
line-height: 40px;
      &:hover {
        color: #0052D9;
      }
    }
  }

  textarea {
    box-sizing: border-box;
    padding: 20px 30px;
    height: 210px;
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Micrsofot Yahei';
    resize: none;
    font-size: 16px;
  }

  .send {
    position: absolute;
    bottom: 10px;
    right: 30px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #0052D9;
    border-radius: 3px;
    background: #0052D9;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background: rgb(18, 150, 17);
      color: #fff;
    }
  }

  .warn {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 1px 5px 1px #bdbdbd;

    &.appear-enter-active, &.appear-leave-active {
      transition: all 1s;
    }

    &.appear-enter, &.appear-leave-active {
      opacity: 0;
    }

    &:before {
      content: ' ';
      position: absolute;
      top: 100%;
      right: 20px;
      border: 7px solid transparent;
      border-top-color: #fff;
      filter: drop-shadow(1px 3px 2px #bdbdbd);
    }
  }
}
</style>
