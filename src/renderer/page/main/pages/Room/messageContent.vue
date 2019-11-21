<template>
  <div
    class="message_box"
    v-loading="messageLoading"
    element-loading-background="rgb(255, 255, 255)"
  >
    <div class="message_title">
      <span class="title">{{caseNo}}</span>
      <!-- <el-radio-group v-model="messageType" size="small">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="6">证据</el-radio-button>
        <el-radio-button label="8">文书</el-radio-button>
      </el-radio-group>-->
    </div>
    <ul class="message_list infinite-list" ref="list" @scroll="onScroll">
      <li class="message_item infinite-list-item" v-for="(item,index) in newsList" :key="index">
        <div class="enter__time" v-if="item.messageType == 0 || item.messageType == 13">
          <span v-if="item.messageType == 0">
            <p>{{item.sendDate}} {{item.messageBody}}</p>
          </span>
          <span v-else>
            <p>{{item.sendDate}} {{item.roleName}} {{item.sendMemName}} 已进入掌上法庭</p>
          </span>
        </div>
        <template v-else>
          <template v-if="item.isPersonalMsg == 1"></template>
          <template v-else>
            <template v-if="item.messageBody.iCanSee">
              <div></div>
            </template>
            <template v-else>
              <div class="time">
                <span v-if="item.sendDate">{{item.sendDate}}</span>
              </div>
              <div
                class="message_main"
                :class="item.sendMemIdentityId == userInfo.identityId ? 'self':'other'"
              >
                <img v-if="item.headUrl" :src="item.headUrl" class="avatar" width="36" height="36" />
                <div class="message_body">
                  <div class="username">
                    {{item.sendMemName}}
                    <span>已读</span>
                  </div>
                  <!-- 文字 1-->
                  <div class="content" v-if="item.messageType == 1">
                    <div class="text">{{item.messageBody.content}}</div>
                  </div>
                  <!-- 图片 2-->
                  <div class="content" v-else-if="item.messageType == 2">
                    <div class="text">
                      <el-image
                        class="picMsg"
                        :src="item.messageBody"
                        alt
                        :preview-src-list="[item.messageBody]"
                      ></el-image>
                    </div>
                  </div>
                  <div class="content" v-else-if="item.messageType == 17">
                    <ul class="con_list">
                      <li
                        class="con_list__item"
                        v-for="(items,indexs) in item.messageBody.content"
                        :key="indexs"
                      >
                        <i class="iconfont icon-img"></i>
                        <div class="con_list_title">
                          <span v-if="item.messageBody.title">{{item.messageBody.title}}</span>
                          <span v-else>调解协议图片</span>
                          <span>多张图片可左右滑动</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- 调解回复 19 -->
                  <div class="content" v-else-if="item.messageType == 19">
                    <div class="que__title">{{item.messageBody.title}}</div>
                    <div class="que__content">{{item.messageBody.info}}</div>
                  </div>
                  <div class="content" v-else>{{item.messageType}}</div>
                </div>
              </div>
            </template>
          </template>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHistoryMsg, getAllRelevant } from "@/service";
export default {
  props: {
    caseId: {
      type: String,
      default: ""
    },
    caseNo: {
      type: String,
      default: ""
    }
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
      isTabType: false,
      messageLoading: false
    };
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
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
        this.$store.commit("tencentIm/setNewsList", val);
      }
    }
  },
  methods: {
    onScroll(e) {
      let srcElement = e.srcElement;
      let idCard = this.userInfo.identityId;
      if (srcElement.scrollTop == 0) {
        if (this.currentPage == this.totalPage) return;
        ++this.currentPage;
        this.getHistoryMessage(idCard);
      }
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
      _this.messageLoading = true;
      getHistoryMsg({
        caseId: _this.caseId,
        messageType: _this.messageType,
        moduleId: "tc-history",
        currentPage: _this.currentPage,
        pageCount: _this.pageCount,
        identityId: idCard,
        groupId: _this.groupId
      }).then(({ data }) => {
        _this.messageLoading = false;
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
    padding: 10px 0;
    .message_item {
      overflow: hidden;
    }
    .time {
      width: 100%;
      font-size: 10px;
      margin: 7px auto;
      text-align: center;

      span {
        display: inline-block;
        padding: 4px 6px;
        color: #9e9e9e;
        border-radius: 3px;
        background-color: #f8f8f8;
      }
    }
    .enter__time {
      width: 100%;
      font-size: 10px;
      margin: 7px auto;
      text-align: center;

      span {
        display: inline-block;
        line-height: 2;

        p {
          background-color: #f8f8f8;
          padding: 4px 6px;
          color: #9e9e9e;
          border-radius: 3px;
          margin-bottom: 5px;
        }
      }
    }
    .message_main {
      .username {
        font-size: 12px;
        line-height: 2;
        color: #9ca8c9;
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
        font-size: 12px;
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
        .que__title {
          border-bottom: 1px solid #e9e9e9;
          line-height: 3;
          font-size: 12px;
          cursor: pointer;
          color: #777777;
        }
        .que__content {
          padding: 10px 0;
          font-size: 12px;
        }
        .con_list {
          width: 300px;
          line-height: 24px;
          background: #ffffff;
          border-radius: 5px;

          .con_list__item {
            line-height: 48px;
            border-bottom: 1px solid #e7e7e7;
            text-align: center;
            color: #0052d9;
            display: flex;
            padding: 10px;
            cursor: pointer;

            img {
              position: absolute;
              width: 250px;
              height: 48px;
              left: 0;
              opacity: 0;
            }

            .iconfont {
              font-size: 28px;
            }

            .con_list_title {
              width: 100%;
              display: flex;
              flex-direction: column;
              line-height: 1.5;

              span {
                line-height: 30px;

                &:last-child {
                  line-height: 18px;
                  font-size: 12px;
                  color: #888888;
                }
              }
            }

            .doc_item {
              width: 100%;
              display: flex;
              flex-direction: column;
              line-height: 1.5;

              span {
                line-height: 48px;
              }
            }

            .evi_tool {
              width: 60px;
              border-left: 1px solid #e7e7e7;
            }

            &.apply_content {
              img {
                width: 100%;
              }
            }

            .take-down__tool {
              width: 120px;
              position: relative;

              img {
                width: 120px;
                height: 48px;
                left: 0;
                opacity: 0;
              }
            }

            .doc_tool {
              width: 120px;
              position: relative;

              img {
                position: absolute;
                width: 120px;
                height: 48px;
                left: 0;
                opacity: 0;
              }
            }

            &:last-child {
              border-bottom: none;
            }
          }
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