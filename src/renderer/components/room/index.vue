<template>
  <div
    class="room_container"
    v-loading="roomLoading"
    element-loading-text="拼命加载中"
    element-loading-background="rgb(255, 255, 255)"
  >
    <template v-if="!roomLoading">
      <message/>
      <v-text/>
      <detail-bar/>
      <tool-bar time="200"/>
      <transition name="el-zoom-in-top">
        <!-- 判断非法官需要填写送达地址 -->
        <address-dialog v-show="addressDialog && !isJudge"/>
      </transition>
    </template>
  </div>
</template>
<script>
import message from "@/components/message/message";
import detailBar from "@/components/detailBar/detailbar";
import toolBar from "@/components/toolBar";
import vText from "@/components/text/text";
import addressDialog from "@/components/addressDialog";
import { mapState, mapActions, mapGetters } from "vuex";
import { getUserPolling, getDestroyState } from "@/service";
import http from "@/service/http";
const CancelToken = http.CancelToken;
const source = CancelToken.source();
let cancel;
export default {
  components: {
    message,
    vText,
    detailBar,
    addressDialog,
    toolBar
  },
  computed: {
    ...mapState(["roomLoading", "isJudge", "caseId", "user", "openid"])
  },
  data() {
    return {
      addressDialog: false,
      timer: null
    };
  },
  methods: {
    getUserPollingState() {
      let timer = this.timer;
      this.source = http.CancelToken;
      getUserPolling({
        identityId: this.user.identityId,
        caseId: this.caseId,
        moduleId: "tc-polling"
      })
        .then(res => {
          if (res.data) {
            new CancelToken(function executor(c) {
              cancel = c;
            });
            clearInterval(timer);
            timer = this.timer = null;
            timer = this.timer = setInterval(() => {
              this.getUserPollingState();
            }, 4000);
          } else {
            clearInterval(timer);
            timer = this.timer = null;
            cancel();
          }
        })
        .catch(err => {
          clearInterval(timer);
          timer = this.timer = null;
          cancel();
        });
    },
    getDestroyState() {
      if (this.caseId == "") return;
      getDestroyState({
        moduleId: "tc-userDestroyState",
        identityId: this.openid,
        caseId: this.caseId
      }).then(res => {
        console.log(res);
      });
    },
    cancleTimer() {
      cancel();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addressDialog = true;
      this.getUserPollingState();
    });
  },
  beforeDestroy() {
    console.log(this.timer);
    this.cancleTimer();
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.cancleTimer();
      this.getDestroyState();
    }
  }
};
</script>
<style lang="stylus">
.room_container {
  width: 100%;
  height: 100vh;
}

.modal_box {
  position: absolute;
  width: 50%;
  height: calc(100vh - 60px);
  background: rgba(255, 255, 255, 0.95);
  top: 60px;
  bottom: 0;
  z-index: 999;
  right: -50%;
  transition: all 0.3s;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: -1px 10px 10px 0px #eaeaea;
  overflow-y: scroll;

  &.active {
    right: 0;
  }
}
</style>
