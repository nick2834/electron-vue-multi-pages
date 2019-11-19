<template>
  <div class="message_box">
    <div class="message_title">
      <span class="title">Web前端（JS|React|Angular|V</span>
      <el-radio-group v-model="messageType" size="small">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="6">证据</el-radio-button>
        <el-radio-button label="8">文书</el-radio-button>
      </el-radio-group>
    </div>
    <ul class="message_list infinite-list" v-infinite-scroll="load">
      <li class="message_item infinite-list-item" v-for="(item,index) in newsList" :key="index">
        <div
          class="message_main"
          :class="item.sendMemIdentityId == userInfo.identityId ? 'self':'other'"
        >
          <img :src="item.headUrl" class="avatar" width="36" height="36" alt />
          <div class="message_body">
            <div class="username">{{item.sendMemName}}</div>
            <div
              class="content"
            >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, voluptas quod? Porro voluptatibus assumenda quibusdam impedit enim repudiandae molestias minima ipsam ad repellendus necessitatibus dolore eligendi, consectetur consequuntur sit quo.</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHistoryMsg, getAllRelevant } from "@/service";
export default {
  data() {
    return {
      newsLists: 0,
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
  computed: {
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      }
    },
    caseId: {
      get() {
        return this.$store.state.cases.caseId;
      }
    },
    groupId: {
      get() {
        return this.$store.state.cases.groupId;
      }
    },
    newsList: {
      get() {
        return this.$store.state.tencentIm.newsList;
      },
      set(val) {
        this.$store.commit("tencentIm/updateNewsList", val);
      }
    }
  },
  methods: {
    load() {
      this.newsLists += 2;
    },
    getAllrelevants() {
      let idCard = this.userInfo ? this.userInfo.identityId : null;
      let caseId = this.caseId;
      let _this = this;
      getAllRelevant({
        caseId: caseId,
        identityId: idCard,
        moduleId: "tc-CreateGroup"
      })
        .then(({ data }) => {
          let memList = data.data.memRelevantVos;
          this.memRelevantVos = memList;
          let memTypeData = memList.find(item => idCard == item.identityId);
          if (memTypeData == undefined || memTypeData.type == 0) {
            alert("信息不全");
          } else {
            _this.$store.commit("tencentIm/updateMessagData", {
              moduleId: "tc-sendmessage",
              caseId: _this.caseId,
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
            _this.getHistoryMessage(idCard);
          }
        })
        .catch(err => {});
    },
    getHistoryMessage(idCard) {
      let _this = this;
      getHistoryMsg({
        caseId: _this.caseId,
        messageType: _this.messageType,
        moduleId: "tc-history",
        currentPage: _this.currentPage,
        pageCount: _this.pageCount,
        identityId: idCard,
        groupId: _this.groupId
      }).then(({ data }) => {
        console.log(data);
        let messageModels = data.data.messageModels.reverse();
        _this.totalPage = data.data.totalPage;
        _this.currentPage = data.data.currentPage;
        messageModels.map((item, index) => {
          // 私信
          if (item.messageType == 16) {
            if (item.messageBody.openids.indexOf(this.userInfo.openid) != -1) {
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
            if (item.messageBody.openids.indexOf(this.userInfo.openid) != -1) {
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
              if (item.messageBody.messagePostIdentity.indexOf(idCard) != -1) {
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
        _this.newsList = messageModels;
      });
    }
  },
  mounted() {
    this.getAllrelevants();
  }
};
</script>

<style lang="scss" scoped>
.message_box {
  height: calc(100vh - 256px);
  overflow: hidden;
  .message_title {
    font-weight: bold;
    line-height: 30px;
    padding: 0 10px;
    border-bottom: 1px solid $borderColor;
    display: flex;
    justify-content: space-between;
    .title {
      cursor: pointer;
    }
  }
  .message_list {
    height: calc(100vh - 286px);
    overflow-y: scroll;
    .message_item {
      overflow: hidden;
    }
    .message_main {
      .username {
        font-size: 12px;
        line-height: 2;
        color: #999999;
        position: relative;
      }
      .content {
        display: inline-block;
        position: relative;
        padding: 6px 10px;
        max-width: 330px;
        min-height: 36px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: left;
        word-break: break-all;
        background-color: #f3f3f3;
        border-radius: 4px;
        &:before {
          content: " ";
          position: absolute;
          top: 12px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: #f3f3f3;
        }
      }
      &.self {
        text-align: right;
        .avatar {
          float: right;
          margin: 0 15px;
          margin-left: 0;
        }

        .message_body {
          // margin-right: 15px;
          margin-right: 65px;
          margin-left: 0;
          .content {
            background-color: #d9f4fe;
            &:before {
              left: 100%;
              border-right-color: transparent;
              border-left-color: #d9f4fe;
            }
          }
        }
      }
      &.other {
        text-align: left;
        .avatar {
          float: left;
          margin-left: 15px;
          border-radius: 3px;
        }
        .message_body {
          display: inline-block;
          margin-left: 15px;
          position: relative;
        }
      }
    }
  }
}
</style>