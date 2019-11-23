<!-- 模态框 -->
<template>
  <el-container>
    <el-header class="dragable" style="height:55px">
      {{caseNo}}
      <div class="close_bar dragable">
        <div class="btn__group no__dragable">
          <span class="icon_btn icon_minus el-icon-minus" @click="minusClick"></span>
          <span class="icon_btn icon_close el-icon-close" @click="closeClick"></span>
        </div>
      </div>
    </el-header>
    <el-form>
      <el-form-item>
        <el-input v-model="value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">发送</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
const { ipcRenderer, remote } = require("electron");
import socket from "@/service/websocket";
export default {
  data() {
    return {
      value: "",
      caseNo: "",
      ws: null
    };
  },
  methods: {
    minusClick() {
      ipcRenderer.send("modal_minu");
    },
    closeClick() {
      ipcRenderer.send("modal_close");
    },
    submit() {
      console.log(this.value);
      this.ws.send(this.value);
    },
    initWebSocket() {
      this.ws = new socket({ url: "ws://127.0.0.1:10086" });
      this.wsOnmessage();
    },
    wsOnmessage() {
      if (this.ws) {
        this.ws.onmessage(msg => {
          console.log(msg);
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initWebSocket();
    });
  },
  beforeDestroy() {
    this.ws.close();
    this.ws = null;
  }
};
</script>
<style scoped lang="scss">
.close_bar {
  cursor: pointer;
  flex-direction: row-reverse;
  float: right;
  .icon_btn {
    cursor: pointer;
    width: 15px;
    height: 15px;
    font-size: 16px;
    line-height: 15px;
    text-align: center;
    color: #333;
    // font-weight: bold;
    padding: 5px;
    // background: rgba($color: #ffffff, $alpha: 0.6);
    &.icon_minus {
      margin-right: 1px;
      &:hover {
        border-radius: 50%;
        background: rgba($color: #ffffff, $alpha: 0.8);
      }
    }
    &.icon_close:hover {
      border-radius: 50%;
      background: #f56c6c;
      color: #ffffff;
    }
    &.base__color {
      color: #333333;
    }
  }
}
</style>