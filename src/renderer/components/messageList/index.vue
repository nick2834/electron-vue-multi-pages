<template>
  <ul v-if="newsList" @click="closeTips">
    <li v-for="(item,index) in newsList" class="message-item" :key="index" :id="'list'+ item.id">
      <!-- 私信 -->
      <template v-if="item.isPersonalMsg == 1">
        <template v-if="item.messageBody.isHasMe">
          <div class="time" v-if="item.sendDate">
            <span>{{item.sendDate}}</span>
          </div>
          <div class="main" :class="{ self: item.sendMemIdentityId == user.identityId }">
            <img v-if="item.headUrl" class="avatar" width="36" height="36" :src="item.headUrl">
            <i v-else class="el-icon-loading avatar"></i>
            <div class="message_body">
              <div class="username" v-if="item.sendMemIdentityId == user.identityId">
                <span class="isRead" @click.stop="lookReadPerson(item.id)">
                  <tool-tips
                    :readPersonList="readPersonList"
                    :item="item"
                    :toolTipsIndex="toolTipsIndex"
                  />已读
                </span>
                <span v-if="item.messageBody.isRecive" class="pri_red">回复私信</span>
                <span v-else class="pri_red">私信</span>
                {{item.sendMemName}}
                <div class="user_target">
                  <template v-if="item.messageBody.isRecive">回复私信</template>
                  <template v-else>私信</template>
                  {{item.messageBody.sendPeopleName}}
                </div>
              </div>
              <div class="username" v-else>
                {{item.sendMemName}}
                <span v-if="item.messageBody.isRecive" class="pri_red">回复私信</span>
                <span v-else class="pri_red">私信</span>
                <span class="isRead" @click.stop="lookReadPerson(item.id)">
                  <tool-tips
                    :readPersonList="readPersonList"
                    :item="item"
                    :toolTipsIndex="toolTipsIndex"
                  />已读
                </span>
                <div class="user_target">
                  <template v-if="item.messageBody.isRecive">回复私信</template>
                  <template v-else>私信</template>
                  {{item.messageBody.sendPeopleName}}
                </div>
              </div>
              <div class="content" v-if="item.messageType == 1">
                <div class="text">{{item.messageBody.value}}</div>
              </div>

              <div class="content" v-if="item.messageType == 2">
                <ul class="que__content" v-viewer="options">
                  <template v-if="item.messageBody.value.length < 2">
                    <li v-for="(int,ind) in item.messageBody.value" :key="ind" class="W100">
                      <img class="picMsg" :src="int" alt>
                    </li>
                  </template>
                  <template v-else-if="item.messageBody.value.length == 2">
                    <li v-for="(int,ind) in item.messageBody.value" :key="ind" class="W50">
                      <img class="picMsg" :src="int" alt>
                    </li>
                  </template>
                  <template v-else-if="item.messageBody.value.length == 3">
                    <li v-for="(int,ind) in item.messageBody.value" :key="ind" class="W30">
                      <img class="picMsg" :src="int" alt>
                    </li>
                  </template>
                  <template v-else>
                    <li v-for="(int,ind) in item.messageBody.value" :key="ind" class="W21">
                      <img class="picMsg" :src="int" alt>
                    </li>
                  </template>
                </ul>
              </div>

              <div class="content" v-if="item.messageType == 3">
                <div class="text audio" @click="audioPlay(item.id)">
                  <audio
                    :src="item.messageBody.value"
                    controls
                    :ref="'audio'+ item.id"
                    @ended="onEnded"
                  ></audio>
                  <img :src="audio64" alt v-if="audioIndex == item.id">
                  <i class="iconfont icon-audio-r" v-else></i>
                </div>
              </div>

              <div class="content" v-if="item.messageType == 4">
                <div class="text video">
                  <video :src="item.messageBody.value" controls></video>
                </div>
              </div>
              <span class="reply_icon">
                <i
                  class="iconfont icon-reply"
                  v-if="item.sendMemIdentityId != user.identityId"
                  @click.stop="privateReply(item.id)"
                ></i>
              </span>
            </div>
          </div>
        </template>
      </template>
      <!-- 正常消息 -->
      <template v-else>
        <!-- 判断我是否可见 -->
        <template v-if="item.messageBody.iCanSee">
          <div class="time" v-if="item.sendDate">
            <span>{{item.sendDate}}</span>
          </div>
          <div class="main" :class="{ self: item.sendMemIdentityId == user.identityId }">
            <img v-if="item.headUrl" class="avatar" width="36" height="36" :src="item.headUrl">
            <i v-else class="el-icon-loading avatar"></i>
            <div class="message_body">
              <template v-if="item.sendMemIdentityId == user.identityId">
                <div class="username">
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                  {{item.sendMemName}}
                  <span v-if="item.messageType == 16">提交谈话笔录</span>
                </div>
              </template>
              <template v-else>
                <div class="username">
                  {{item.sendMemName}}
                  <span v-if="item.messageType == 16">提交谈话笔录</span>
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                </div>
              </template>

              <!-- 文书类型 8-->
              <div class="content" v-if="item.messageType == 8">
                <div class="text" v-if="item.messageBody.isBack" v-viewer="options">
                  <img class="picMsg" :src="item.messageBody.backUrl" alt>
                </div>
                <ul class="text evidence" v-else>
                  <li
                    class="evidence_content"
                    v-for="(items,indexs) in item.messageBody.files"
                    :key="indexs"
                  >
                    <i class="iconfont icon-img"></i>
                    <div class="doc_item">
                      <span>{{items.types[0].typename}}</span>
                    </div>
                    <div class="evi_tool doc_tool" v-viewer="options">
                      <template v-for="(item2,ind) in items.imgs">
                        <img :src="item2" alt :key="ind">
                      </template>
                      查看文书
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 释明告知 16 -->
              <div class="content" v-if="item.messageType == 16">
                <ul class="text evidence">
                  <li
                    class="evidence_content"
                    v-for="(items,indexs) in item.messageBody.content"
                    :key="indexs"
                  >
                    <i class="iconfont icon-img"></i>
                    <div class="evidence_item">
                      <span v-if="item.messageBody.title">{{item.messageBody.title}}</span>
                      <span v-else>谈话笔录图片</span>
                      <span>多张图片可左右滑动</span>
                    </div>

                    <div
                      class="evi_tool take-down__tool"
                      @click.stop="handleTakeDown(items)"
                      v-viewer="options"
                    >
                      <template v-for="(item2,ind) in item.messageBody.content">
                        <img :src="item2" alt :key="ind">
                      </template>
                      查看笔录
                    </div>
                  </li>
                </ul>
                <div class="aggree__btn" v-if="!isJudge">我已知晓并理解上述内容</div>
              </div>
              <!-- 释明回复 18 -->
              <div class="content" v-if="item.messageType == 18"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="enter__time" v-if="item.messageType == 0">
            <span v-if="item.sendDate">
              <!-- <p></p> -->
              <p>
                {{item.sendDate}}
                <span>{{item.messageBody}}</span>
              </p>
            </span>
          </div>
          <div class="enter__time" v-else-if="item.messageType == 13">
            <span v-if="item.sendDate">
              <!-- <p></p> -->
              <p>
                {{item.sendDate}}
                {{item.roleName}}
                <span
                  style="color:#0052D9"
                >{{item.sendMemName}}</span> 已进入掌上法庭
              </p>
            </span>
          </div>
          <div class="time" v-else>
            <span v-if="item.sendDate">{{item.sendDate}}</span>
          </div>
          <div
            class="main"
            :class="{ self: item.sendMemIdentityId == user.identityId }"
            v-if="item.messageType != 13 && item.messageType != 0"
          >
            <img v-if="item.headUrl" class="avatar" width="36" height="36" :src="item.headUrl">
            <i v-else class="el-icon-loading avatar"></i>
            <div class="message_body">
              <div class="username" v-if="item.messageType == 6">
                <template v-if="item.sendMemIdentityId == user.identityId">
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                  {{item.sendMemName}} 提交了
                  <span class="bold">{{item.messageBody.messagePostMem}}</span>的证据图片
                  <span class="bold">{{item.messageBody.page}}</span>张
                </template>
                <template v-else>
                  {{item.sendMemName}} 提交了
                  <span class="bold">{{item.messageBody.messagePostMem}}</span>的证据图片
                  <span class="bold">{{item.messageBody.page}}</span>张
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                </template>
              </div>
              <div class="username" v-else-if="item.messageType == 7">
                <template v-if="item.sendMemIdentityId == user.identityId">
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                  {{item.sendMemName}}发表质证意见
                </template>
                <template v-else>
                  {{item.sendMemName}}发表质证意见
                  <span
                    class="isRead"
                    @click.stop="lookReadPerson(item.id)"
                  >
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                </template>
              </div>
              <div class="username" v-else-if="item.messageType == 17">
                <template v-if="item.sendMemIdentityId == user.identityId">
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                  {{item.sendMemName}}提交调解协议
                </template>
                <template v-else>
                  {{item.sendMemName}}提交调解协议
                  <span
                    class="isRead"
                    @click.stop="lookReadPerson(item.id)"
                  >
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                </template>
              </div>
              <div class="username" v-else>
                <template v-if="item.sendMemIdentityId == user.identityId">
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                  {{item.sendMemName}}
                </template>
                <template v-else>
                  {{item.sendMemName}}
                  <span class="isRead" @click.stop="lookReadPerson(item.id)">
                    <tool-tips
                      :readPersonList="readPersonList"
                      :item="item"
                      :toolTipsIndex="toolTipsIndex"
                    />已读
                  </span>
                </template>
              </div>
              <!-- 文字 1-->
              <div class="content" v-if="item.messageType == 1">
                <div class="text">{{item.messageBody.content}}</div>
              </div>
              <!-- 图片 2-->
              <div class="content" v-else-if="item.messageType == 2">
                <div class="text">
                  <el-image class="picMsg" :src="item.messageBody" alt :preview-src-list="[item.messageBody]"></el-image>
                </div>
              </div>
              <!-- 语音 3-->
              <div class="content" v-else-if="item.messageType == 3">
                <div class="text audio" @click="audioPlay(item.id)">
                  <audio :src="item.messageBody" controls :ref="'audio'+ item.id" @ended="onEnded"></audio>
                  <img :src="audio64" alt v-if="audioIndex == item.id">
                  <i class="iconfont icon-audio-r" v-else></i>
                </div>
              </div>
              <!-- 视频 4-->
              <div class="content" v-else-if="item.messageType == 4">
                <div class="text video">
                  <video :src="item.messageBody" controls></video>
                </div>
              </div>
              <!-- 地图 5 -->
              <div class="content" v-else-if="item.messageType == 5">
                <div class="text maps" @click="checkMaps(item.messageBody)">
                  <div class="map_info">
                    <p class="name">{{item.messageBody.name}}</p>
                    <p class="title">{{item.messageBody.address}}</p>
                  </div>
                  <img :src="item.messageBody.src" alt>
                </div>
              </div>
              <!-- 证据 6 -->
              <div class="content" v-else-if="item.messageType == 6">
                <ul class="text evidence">
                  <li
                    class="evidence_content"
                    v-for="(items,indexs) in item.messageBody.files"
                    :key="indexs"
                    v-viewer="options"
                    v-if="items.imgs.length > 0"
                  >
                    <i class="iconfont icon-img"></i>
                    <div class="evidence_item">
                      <span>{{items.tip}}</span>
                      <span>多张图片可左右滑动</span>
                    </div>
                    <template v-for="(item2,ind) in items.imgs">
                      <img :src="item2" alt :key="ind">
                    </template>
                    <template v-if="item.messageBody.hasCatalog && !isJudge && indexs != 0">
                      <div class="evi_tool" @click="handleEvi(items)">质证</div>
                    </template>
                  </li>
                </ul>
              </div>
              <!-- 质证 7 -->
              <div class="content" v-else-if="item.messageType == 7">
                <template v-if="item.messageBody.questionType == 0">
                  <div class="que__title">{{item.messageBody.title}}</div>
                  <div class="que__content">{{item.messageBody.info}}</div>
                </template>
                <template v-else>
                  <div class="que__title">{{item.messageBody.title}}</div>
                  <ul class="que__content" v-viewer="options">
                    <li v-for="(int,ind) in item.messageBody.content" :key="ind">
                      <img :src="int" alt>
                    </li>
                  </ul>
                </template>
              </div>
              <!-- 申请书 11-->
              <div class="content" v-else-if="item.messageType == 11">
                <div class="text evidence">
                  <div class="evidence_content apply_content" v-viewer="options">
                    <i class="iconfont icon-img"></i>
                    <div class="evidence_item">
                      <span>{{item.messageBody.title}}</span>
                      <span>多张图片可左右滑动</span>
                    </div>
                    <template v-for="(items,ind) in item.messageBody.content">
                      <img :src="items" alt :key="ind">
                    </template>
                  </div>
                </div>
              </div>
              <!-- 调解协议 17 -->
              <div class="content" v-else-if="item.messageType == 17">
                <ul class="text evidence">
                  <li
                    class="evidence_content"
                    v-for="(items,indexs) in item.messageBody.content"
                    :key="indexs"
                  >
                    <i class="iconfont icon-img"></i>
                    <div class="evidence_item">
                      <span v-if="item.messageBody.title">{{item.messageBody.title}}</span>
                      <span v-else>调解协议图片</span>
                      <span>多张图片可左右滑动</span>
                    </div>

                    <div
                      class="evi_tool take-down__tool"
                      @click.stop="handleTakeDown(items)"
                      v-viewer="options"
                    >
                      <template v-for="(item2,ind) in item.messageBody.content">
                        <img :src="item2" alt :key="ind">
                      </template>
                      查看文件
                    </div>
                  </li>
                </ul>
                <div class="aggree__btn_group" v-if="!isJudge">
                  <span>同意上述调解协议</span>
                  <span>不同意</span>
                </div>
              </div>
              <!-- 调解回复 19 -->
              <div class="content" v-else-if="item.messageType == 19">
                <div class="que__title">{{item.messageBody.title}}</div>
                <div class="que__content">{{item.messageBody.info}}</div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import toolTips from "./toolTips";
import { audio64 } from "@/utils/img64.js";
import Recorder from "recorder-js";
import { getReadPerson } from "@/service";
export default {
  props: ["newsList"],
  computed: {
    ...mapState(["user", "isJudge"])
  },
  components: {
    toolTips
  },
  data() {
    return {
      audio64: audio64,
      audioContext: null,
      audioIndex: null,
      options: {
        inline: false,
        title: false,
        rotatable: false,
        scalable: false
      },
      toolTipsIndex: 0,
      disabled: false,
      readPersonList: []
    };
  },
  methods: {
    privateReply(i) {
      this.$store.commit("SET_PRIVATEID", i);
      this.$store.commit("SHOW_TOOLS", 2);
    },
    audioPlay(i) {
      let audioID = `audio${i}`;
      //此次获取audio也可以用获取ID的方法
      let audio = (this.audioContext = this.$refs[audioID][0]);
      this.audioIndex = i;
      audio.play();
    },
    onEnded(e) {
      this.audioIndex = null;
    },
    handleEvi(item) {
      //通过bus注册 跨组件传输数据
      this.$bus.$emit("eviItem", item);
      this.$store.commit("SHOW_TOOLS", 3);
    },
    handleTakeDown() {},
    getReadPerson(id) {
      getReadPerson({
        moduleId: "tc-getReads",
        identityId: this.user.identityId,
        messageId: id
      })
        .then(({ data }) => {
          if (data.errorCode == 0 && data.data) {
            this.readPersonList = data.data;
            this.toolTipsIndex = id;
          } else {
            this.toolTipsIndex == "";
          }
        })
        .catch(err => {
          this.toolTipsIndex == "";
        });
    },
    lookReadPerson(id) {
      this.toolTipsIndex == ""
        ? this.getReadPerson(id)
        : (this.toolTipsIndex = "");
    },
    closeTips() {
      this.toolTipsIndex = "";
    },
    // 地图
    checkMaps(item) {
      window.open(
        `https://apis.map.qq.com/uri/v1/geocoder?coord=${item.lat},${
          item.lng
        }&referer=EOJBZ-FBSKX-JF746-TCTXA-YLDAK-MXBTS`
      );
    }
  }
};
</script>
<style lang="scss" scope>
.time {
  width: 100%;
  font-size: 12px;
  margin: 7px auto;
  text-align: center;

  span {
    display: inline-block;
    padding: 4px 6px;
    color: #fff;
    border-radius: 3px;
    background-color: #dcdcdc;
  }
}

.bold {
  font-weight: bold;
  color: #0052D9;
}

.pri_red {
  background: orangered;
  color: #ffffff;
  cursor: pointer;
  border-radius: 2px;
  padding: 2px 5px;
  position: relative;
  margin: 0 5px;
}

.reply_icon {
  position: absolute;
  right: -40px;
  top: 50%;
  font-size: 30px;
  transform: translateY(-50%);
  color: #0052D9;
  cursor: pointer;
}

.user_target {
  color: #999999;
  font-size: 12px;
  line-height: 2;
}

.enter__time {
  width: 100%;
  font-size: 12px;
  margin: 7px auto;
  text-align: center;

  span {
    display: inline-block;
    line-height: 2;

    p {
      background-color: #dcdcdc;
      padding: 4px 6px;
      color: #fff;
      border-radius: 3px;
      margin-bottom: 5px;
    }
  }
}

.main {
  .avatar {
    float: left;
    margin-left: 15px;
    border-radius: 3px;
  }

  .message_body {
    display: inline-block;
    margin-left: 15px;
    position: relative;

    .username {
      font-size: 12px;
      line-height: 2;
      color: #999999;
      position: relative;

      .message__popper {
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        min-width: 190px;
        max-width: 190px;
        text-align: center;
        line-height: 2;

        &.self {
          right: 25px;
          left: unset;
        }
      }

      .isRead {
        background: #3681ff;
        color: #ffffff;
        cursor: pointer;
        border-radius: 2px;
        padding: 2px 5px;
        position: relative;
        margin: 0 5px;
      }
    }

    .private_chat {
      img {
        width: 21%;
        padding: 0 5px;
      }
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
      background-color: #fafafa;
      border-radius: 4px;

      .aggree__btn {
        margin-top: 10px;
        color: #0052D9;
        background: #ffffff;
        border-radius: 5px;
        border: 1px solid #0052D9;
        text-align: center;
        line-height: 2;
        cursor: pointer;

        &:hover {
          background: #0052D9;
          color: #ffffff;
        }
      }

      .aggree__btn_group {
        display: flex;
        margin-top: 10px;
        text-align: center;
        line-height: 2;
        color: #0052D9;
        justify-content: space-between;

        span {
          background: #ffffff;
          border-radius: 5px;
          border: 1px solid #0052D9;
          cursor: pointer;
          flex: 0.6;

          &:last-child {
            flex: 0.3;
          }

          &:hover {
            background: #0052D9;
            color: #ffffff;
          }
        }
      }

      .picMsg {
        max-width: 100%;
      }

      .audio {
        cursor: pointer;
        height: 24px;
        width: 120px;
        position: relative;

        .iconfont {
          line-height: 24px;
          color: #0052D9;
          font-size: 24px;
        }

        audio {
          position: absolute;
          width: 120px;
          height: 24px;
          display: none;
        }

        img {
          width: 24px;
          height: 24px;
        }
      }

      .video {
        video {
          max-height: 300px;
          width: 300px;
          height: 300px;
        }
      }

      .maps {
        .map_info {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .name {
            font-size: 14px;
          }

          .title {
            font-size: 12px;
          }
        }

        img {
          width: 100%;
        }
      }

      .evidence {
        width: 300px;
        line-height: 24px;
        background: #ffffff;
        border-radius: 5px;

        .evidence_content {
          line-height: 48px;
          border-bottom: 1px solid #e7e7e7;
          text-align: center;
          color: #0052D9;
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

          .evidence_item {
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

      &:before {
        content: ' ';
        position: absolute;
        top: 12px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }

      .que__title {
        color: #888888;
        font-size: 12px;
      }

      .que__content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        text-align: center;

        li {
          width: 21%;
          padding: 0 5px;

          &.W100 {
            width: 100%;
          }

          &.W50 {
            width: 46%;
          }

          &.W30 {
            width: 30%;
          }

          &.W21 {
            width: 21%;
          }
        }

        img {
          max-width: 100%;
        }
      }
    }
  }
}

.self {
  text-align: right;

  .avatar {
    float: right;
    margin: 0 15px;
    margin-left: 0;
  }

  .message_body {
    margin-right: 15px;
    margin-left: 0;
  }

  .content {
    // background-color: #b2e281 !important;
    background-color: #fafafa !important;

    .evidence_content {
      img {
        width: 100%;
      }
    }

    &:before {
      left: 100%;
      border-right-color: transparent !important;
      // border-left-color: #b2e281 !important;
      border-left-color: #fafafa !important;
    }
  }
}
</style>
