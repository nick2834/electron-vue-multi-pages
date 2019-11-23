<template>
  <div class="message_input">
    <div class="input_tool">
      <i class="el-icon-microphone"></i>
      <i class="el-icon-picture-outline"></i>
      <i class="el-icon-files"></i>
      <i class="el-icon-receiving"></i>
      <i class="el-icon-set-up" @click="handleShowModal"></i>
    </div>
    <div class="func-area" v-if="drawer">
      <ul class="func-area__content">
        <li v-for="(item, index) in count" :key="index" class="func-area__item">
          <span class="el-icon el-icon-chat-round"></span>
          <div class="title">功能按钮</div>
        </li>
      </ul>
    </div>
    <textarea
      name
      id
      cols="30"
      rows="10"
      class="input_area"
      placeholder="请在此输入内容"
      v-else
      v-model="value"
    ></textarea>
    <div class="send" @click="send" v-if="!drawer">
      <span>发送(ent)</span>
    </div>
    <a-drag-modal v-dialogDrag :showWin.sync="showWin" @update:showWin="showWin = false"></a-drag-modal>
    <!-- <el-dialog title="预览" :visible.sync="showWin" v-dialogDrag :modal="false"></el-dialog> -->
  </div>
</template>

<script>
import ADragModal from "@/components/AdragModal";
const { ipcRenderer } = require("electron");
export default {
  data() {
    return {
      drawer: false,
      count: 10,
      showWin: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      value: "",
      websock: null
    };
  },
  computed: {
    caseNo: {
      get() {
        return this.$store.state.cases.caseNo;
      }
    },
    caseId:{
      get() {
        return this.$store.state.cases.caseId;
      }
    },
  },
  components: { ADragModal },
  methods: {
    send() {
      console.log(this.value);
      // this.websock.send(this.value);
    },
    handleShowModal() {
      // this.showWin = true;
      ipcRenderer.send("showModalWindow",(this.caseNo));
      // setTimeout(() => {
      //   this.websocketsend(this.caseNo);
      // }, 3000);
    },
    onSubmit() {
      console.log("submit!");
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://127.0.0.1:10086";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(msg) {
      console.log(msg.data);
      //数据接收
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  },
  created() {
    // this.initWebSocket();
  }
};
</script>

<style lang="scss" scoped>
.message_input {
  border-top: 1px solid $borderColor;
  height: 200px;
  position: relative;
  .input_tool {
    height: 40px;
    line-height: 40px;
    color: #888a92;
    font-size: 20px;
    padding: 0 10px;
    i {
      padding: 0 5px;
      cursor: pointer;
      &:hover {
        color: #12b7f5;
      }
    }
  }
  .func-area {
    background: #ffffff;
    &__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &__item {
      margin-right: 10px;
      span.el-icon {
        background: #f3f3f3;
        border-radius: 10px;
        text-align: center;
        color: #888a92;
        border: 1px solid #f3f3f3;
        line-height: 50px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        font-size: 22px;
      }
      .title {
        text-align: center;
        font-size: 12px;
      }
      &:hover {
        color: #12b7f5;
      }
    }
  }
  .input_area,
  .func-area {
    padding: 10px;
    height: 160px;
    box-sizing: border-box;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
    font-size: 16px;
  }
  .send {
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #12b7f5;
    border-radius: 3px;
    background: #12b7f5;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background: #12b7f5;
      color: #fff;
    }
  }
}
</style>