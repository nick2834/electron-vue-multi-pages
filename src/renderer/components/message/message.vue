<!-- 消息框 -->
<template>
  <div class="message" @click.stop="closeModal">
    <header class="header dragable">
      <div class="caseTitle dragable" @click.stop="showDetail">
        <img src="@/assets/images/law.png" alt />
        <span class="caseNo">{{selectCaseData.caseNo}}</span>
      </div>
      <el-radio-group
        v-model="messageType"
        fill="#0052D9"
        @change="changeTypes"
        :disabled="!loadDone"
        class="no__dragable"
      >
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="6">证据</el-radio-button>
        <el-radio-button label="8">文书</el-radio-button>
      </el-radio-group>
      <div class="toolBar no__dragable">
        <div @click.stop="showTools">
          <i class="el-icon-menu">功能列表</i>
        </div>
        <div @click.stop="showDetail">
          <i class="el-icon-info">案件信息</i>
        </div>
      </div>
    </header>
    <div class="message-wrapper" ref="list" @scroll="onScroll">
      <message-list :newsList="newsList" ref="messageList"></message-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import toggleBox from "@/components/toggleBox";
import messageList from "@/components/messageList";
import { getAllrelevant, getHistoryMsg } from "@/service";
export default {
  computed: {
    ...mapGetters(["selectedChat", "messages"]),
    ...mapState([
      "user",
      "selectCaseData",
      "detailModal",
      "newsList",
      "caseId",
      "groupId",
      "openid"
    ])
  },
  components: {
    toggleBox,
    messageList
  },
  data() {
    return {
      memRelevantVos: [],
      messageType: 0,
      totalPage: 0,
      currentPage: 1,
      pageCount: 10,
      isFirst: false,
      loadDone: true,
      prevScrollHeight: 0,
      isTabType: false
    };
  },
  mounted() {
    this.getAllrelevant();
    this.$bus.$on("prevScrollHeight", item => {
      this.prevScrollHeight = item;
    });
  },
  watch: {
    newsList(val) {
      setTimeout(() => {
        this.$refs.list.scrollTop = this.isTabType
          ? this.$refs.list.scrollHeight
          : this.$refs.list.scrollHeight - this.prevScrollHeight;
      }, 50);
    }
  },
  methods: {
    changeTypes(e) {
      let idCard = this.user.identityId;
      this.prevScrollHeight = 0;
      this.loadDone = false;
      this.messageType = e;
      this.currentPage = null;
      this.isTabType = true;
      this.$nextTick(() => {
        this.getHistoryMessage(this.caseId, idCard, true);
      });
    },
    onScroll(e) {
      let srcElement = e.srcElement;
      let idCard = this.user.identityId;
      if (srcElement.scrollTop == 0) {
        if (this.currentPage == this.totalPage) return;
        ++this.currentPage;
        this.getHistoryMessage(this.caseId, idCard, false);
      }
      this.$refs["messageList"].closeTips();
    },
    showTools() {
      this.$store.commit("SHOW_TOOLS");
    },
    showDetail() {
      this.$store.commit("SHOW_DETAIL");
    },
    closeModal() {
      this.$store.commit("CLOSE_MODAL");
    },
    getAllrelevant() {
      let idCard = this.user.identityId;
      let caseId = this.caseId;
      let _this = this;
      getAllrelevant({
        caseId: caseId,
        identityId: idCard,
        moduleId: "tc-CreateGroup"
      })
        .then(({ data }) => {
          let memList = data.memRelevantVos;
          this.memRelevantVos = memList;
          let memTypeData = memList.find(item => idCard == item.identityId);
          if (memTypeData == undefined && memTypeData.type == 0) {
            alert("信息不全");
          } else {
            //存储用户发送数据
            _this.$store.commit("SET_MESSAGEDATA", {
              moduleId: "tc-sendmessage",
              caseId: caseId,
              sendMemRole: memTypeData.type,
              juris: memList,
              sendMemOpenid: memTypeData.openid,
              messageType: "",
              messageBody: {},
              sendMemName: memTypeData.name,
              questionIdent: 1, //质证标识
              source: 1,
              sendMemIdentityId: idCard,
              isPersonalMsg: 0,
              shouldReload: false,
              groupId: _this.groupId,
              receivers: ""
            });
            // 获取历史消息记录
            _this.getHistoryMessage(caseId, idCard, false);
          }
        })
        .catch(err => {});
    },
    getHistoryMessage(caseId, idCard, isTab) {
      getHistoryMsg({
        caseId: caseId,
        messageType: this.messageType,
        moduleId: "tc-history",
        currentPage: this.currentPage,
        pageCount: this.pageCount,
        identityId: idCard,
        groupId: this.groupId
      })
        .then(({ data }) => {
          let messageModels = data.messageModels.reverse();
          this.totalPage = data.totalPage;
          this.currentPage = data.currentPage;
          this.loadDone = true;
          messageModels.map((item, index) => {
            // 私信
            if (item.messageType == 16) {
              if (item.messageBody.openids.indexOf(this.openid) != -1) {
                //判断是否点击过
                item.messageBody["isHasMe"] = true;
              } else {
                item.messageBody["isHasMe"] = false;
              }
              if (!item.messageBody.reciveIdentity) {
                //判断我是否能看到这条消息
                item.messageBody["iCanSee"] = true;
              } else {
                if (item.messageBody.reciveIdentity.indexOf(idCard) != -1) {
                  item.messageBody["iCanSee"] = true;
                } else {
                  item.messageBody["iCanSee"] = false;
                }
              }
            }
            if (item.messageType == 17) {
              if (item.messageBody.openids.indexOf(this.openid) != -1) {
                //判断是否点击过
                item.messageBody["isHasMe"] = true;
              } else {
                item.messageBody["isHasMe"] = false;
              }
            }
            if (item.messageType == 18) {
              if (!item.messageBody.reciveIdentity) {
                //判断我是否能看到这条消息
                item.messageBody["iCanSee"] = true;
              } else {
                if (item.messageBody.reciveIdentity.indexOf(idCard) != -1) {
                  item.messageBody["iCanSee"] = true;
                } else {
                  item.messageBody["iCanSee"] = false;
                }
              }
            }
            if (item.messageType == 6) {
              if (item.messageBody.messagePostIdentity) {
                if (
                  item.messageBody.messagePostIdentity.indexOf(idCard) != -1
                ) {
                  item.messageBody["isHasMe"] = true;
                } else {
                  item.messageBody["isHasMe"] = false;
                }
              } else {
                item.messageBody["isHasMe"] = true;
              }
            }
            //送达
            if (item.messageType == 8) {
              if (item.messageBody.receiverIdentityId) {
                if (item.messageBody.receiverIdentityId.indexOf(idCard) != -1) {
                  item.messageBody["iCanSee"] = true;
                } else {
                  item.messageBody["iCanSee"] = true;
                }
              } else {
                item.messageBody["iCanSee"] = true;
              }
            }
            // 私信
            if (item.isPersonalMsg == 1) {
              if (item.messageBody.sendPeopleIndentityId) {
                if (
                  item.messageBody.sendPeopleIndentityId.indexOf(idCard) != -1
                ) {
                  item.messageBody["isHasMe"] = true;
                } else {
                  item.messageBody["isHasMe"] = false;
                }
              }
            }
          });
          if (isTab) {
            this.$store.commit("REMOVE_NEWSLIST");
          }
          this.$store.commit("SET_NEWSLIST", messageModels);
          this.prevScrollHeight = isTab ? 0 : this.$refs.list.scrollHeight;
          this.isTabType = false;
        })
        .catch(err => {});
    }
  },
  beforeDestroy() {
    this.prevScrollHeight = 0;
    this.$bus.$off("prevScrollHeight");
  }
};
</script>

<style lang="scss">
.message {
  width: 100%;
  height: calc(100vh - 250px);
  user-select: none;
  .header {
    height: 60px;
    padding: 0 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    position: relative;
    // padding-right: 80px;
    .caseTitle {
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;

      img {
        width: 25px;
      }

      .caseNo {
        margin-right: 20px;
        user-select: none;
      }
    }

    .el-radio-group {
      position: absolute;
      line-height: unset;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }

    .toolBar {
      font-size: 22px;
      display: flex;
      align-items: center;
      line-height: 40px;
      height: 20px;
      margin-top: 25px; 
      div {
        cursor: pointer;
        color: #0052d9;
        display: flex;
        align-items: center;
        margin-left: 10px;
        font-size: 14px;
        span {
          margin-left: 5px;
          font-weight: 500;
        }
        .icon-logout {
          font-size: 16px;
        }
      }
    }
  }

  .message-wrapper {
    min-height: calc(100vh - 310px);
    max-height: calc(100vh - 310px);
    padding: 10px 15px;
    box-sizing: border-box;
    overflow-y: auto;
    border-bottom: 1px solid #e7e7e7;
  }
}
</style>
