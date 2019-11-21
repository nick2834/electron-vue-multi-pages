<!-- 聊天列表 -->
<template>
  <section id="caseList" class="dragable">
    <div class="wrapper">
      <div class="search-wrapper">
        <el-input
          class="no__dragable"
          placeholder="搜索"
          size="small"
          suffix-icon="el-icon-search"
          v-model="keyword"
          clearable
          @change="keypress"
        ></el-input>
      </div>
    </div>
    <ul class="tab_pannel">
      <li :class="activeIndex == 0 ? 'active' :''" @click="handleClick(0)">未结</li>
      <li :class="activeIndex == 1 ? 'active' :''" @click="handleClick(1)">已结</li>
    </ul>
    <div
      class="caseList"
      :class="caseList.length > 0?'no__dragable':'dragable'"
      v-loading="caseLoading"
      element-loading-background="rgb(255, 255, 255)"
    >
      <ul id="caseListBox" v-if="caseList.length > 0">
        <li
          v-for="(item,index) in caseList"
          class="sessionlist"
          :class="{ active: item.caseId == caseId }"
          :key="index"
          @click="selectCase(item)"
        >
          <p class="name">{{item.caseNo}}</p>
          <p class="lastmsg">{{item.caseTitle}}</p>
        </li>
      </ul>
      <ul id="caseListBox" v-else>
        <placeholder :title="title" />
      </ul>
    </div>
  </section>
</template>

<script>
var page = 1;
import { CreateGroup, getUpdateMsg } from "@/service";
import placeholder from "@/components/Aplaceholder";
export default {
  data() {
    return {
      active: false,
      pageNum: 1,
      status: 2,
      keyword: "",
      title: "暂无记录",
      activeIndex: 0,
      caseList: [],
      caseLoading: false
    };
  },
  watch: {
    role(val) {
      this.caseList = [];
      this.selectMyCaseList(true);
    }
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      }
    },
    role: {
      get() {
        return this.$store.state.user.role;
      }
    },
    caseId: {
      get() {
        return this.$store.state.cases.caseId;
      },
      set(val) {
        this.$store.commit("cases/updateCaseid", val);
      }
    },
    groupId: {
      get() {
        return this.$store.state.cases.groupId;
      },
      set(val) {
        this.$store.commit("cases/updateGroupId", val);
      }
    },
    roomId: {
      get() {
        return this.$store.state.cases.roomId;
      },
      set(val) {
        this.$store.commit("cases/updateRoomId", val);
      }
    },
    newsList: {
      get() {
        return this.$store.state.tencentIm.newsList;
      },
      set(val) {
        this.$store.commit("tencentIm/updateNewsList", val);
      }
    },
    caseNo: {
      get() {
        return this.$store.state.cases.caseNo;
      },
      set(val) {
        this.$store.commit("cases/updateCaseno", val);
      }
    }
  },
  components: { placeholder },
  methods: {
    //案件搜索
    keypress(e) {
      this.caseList = [];
      this.selectMyCaseList(true);
    },
    handleClick(e) {
      this.activeIndex = e;
      this.pageNum = 1;
      this.status = e == 0 ? 2 : 1;
      this.caseId = "";
      this.caseNo = "";
      this.selectMyCaseList(true);
    },
    selectCase(item) {
      this.caseId = item.caseId;
      this.caseNo = item.caseNo;
      this.newsList = [];
      this.$router.push({ name: "wechat" }); //组织页面二次跳转
      this.$nextTick(() => {
        if (this.role != 3 && this.role != 4) {
          this.$store.dispatch("cases/getDeliveryAddress").then(({ data }) => {
            if (data && data.address) {
              this.getCreateGroup();
              this.$router.push({
                name: "room",
                params: {
                  address: data.address
                }
              });
            } else {
              this.$router.push({ name: "address" });
            }
          });
        } else {
          this.getCreateGroup();
        }
      });
    },
    selectMyCaseList(isLoading) {
      if (isLoading) {
        this.caseLoading = true;
      }
      this.$store
        .dispatch("cases/selectMyCaseList", {
          pageNum: this.pageNum,
          status: this.status,
          keyword: this.keyword
        })
        .then(res => {
          this.caseLoading = false;
          if (res.errorCode == 0 && res.data.case) {
            this.caseList = res.data.case;
          }
        });
    },
    getCreateGroup() {
      CreateGroup({
        caseId: this.caseId,
        identityId: this.userInfo.identityId,
        moduleId: "tc-CreateGroup",
        role: this.role
      }).then(({ data }) => {
        if (data.status == "OK") {
          let datas = data.data;
          this.groupId = datas.groupId;
          this.roomId = datas.roomId;
          this.getUpdateMsg();
          this.$router.push({ name: "room" });
        }
      });
    },
    getUpdateMsg() {
      getUpdateMsg({
        moduleId: "tc-updateMsg",
        caseId: this.caseId,
        role: this.role,
        openid: this.userInfo.openid
      }).then(res => {
        this.selectMyCaseList(false);
      });
    }
  },
  mounted() {},
  created() {
    this.selectMyCaseList(true);
  }
};
</script>
<style scoped lang="scss">
#caseList {
  background: #e6e6e6;
  user-select: none;
}

.el-badge__content.is-fixed {
  top: 20px;
  right: 35px;
}

.wrapper {
  padding: 22px 12px 12px 12px;
  background: #ffffff;
}

.search-wrapper {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  border-radius: 2px;
}

.tab_pannel {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  text-align: center;
  background: #ffffff;
  border-bottom: 1px solid $borderColor;

  li {
    flex: 1;
    cursor: pointer;
    position: relative;
    font-size: 14px;

    &::after {
      position: absolute;
      content: "";
      bottom: 0;
      width: 0;
      left: 20%;
      height: 3px;
      background: #12b7f5;
      transform: scale(0);
      transition: all 300ms;
    }

    &.active,
    &:hover {
      color: #12b7f5;
      font-weight: 500;

      &::after {
        width: 60%;
        transform: scale(1);
      }
    }
  }
}

.caseList {
  height: calc(100vh - 175px);
  overflow-y: auto;
  // background: #f2f2f2;
  background: #ffffff;
  position: relative;
  #caseListBox {
    height: 100%;
    position: relative;
  }

  .sessionlist {
    display: flex;
    padding: 12px;
    transition: background-color 0.1s;
    font-size: 0;
    flex-direction: column;
    line-height: 2;
    border-bottom: 1px solid $borderColor;
    cursor: pointer;
    position: relative;
    text-align: left;
    &:hover {
      background-color: #e5e5e5;
    }

    &.active {
      background-color: #e4e4e4;
    }

    .avatar {
      border-radius: 2px;
      margin-right: 12px;
    }

    .name {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
    }

    .lastmsg {
      font-size: 12px;
      width: 100%;
      color: #999;
      bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .unread_file {
      font-size: 12px;
      width: 100%;
      color: #999;
      bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>