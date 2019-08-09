<!-- 未读消息案件列表 -->
<template>
  <section id="caseList">
    <div class="wrapper dragable">消息中心</div>
    <div
      class="caseList"
      @scroll="onScroll"
      v-loading="loading"
      element-loading-background="rgb(255, 255, 255)"
    >
      <ul id="caseListBox" v-if="unReadCaseList.length > 0">
        <li
          v-for="(item,index) in unReadCaseList"
          class="sessionlist"
          :class="{ active: item.unionKey == unionKey }"
          @click="selectCase(item)"
          :key="index"
        >
          <span
            class="el-badge__content is-fixed"
            v-if="item.unreadMsgCount > 0"
          >{{item.unreadMsgCount}}</span>
          <p class="name">{{item.caseNo}}</p>
          <p class="lastmsg">{{item.caseTitle}}</p>
          <p class="unread_file" v-if="item.unreadFileCount > 0">您有{{item.unreadFileCount}}条文书需要查看</p>
        </li>
      </ul>
      <ul id="caseListBox" v-else>
        <placeholder :title="title"/>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import placeholder from "@/components/placeholder";
var page = 1;
export default {
  data() {
    return {
      active: false,
      pageNum: 1,
      activeIndex: 0,
      loading: false,
      title: "暂无消息"
    };
  },
  components: {
    placeholder
  },
  computed: {
    ...mapState(["caseId", "unReadCaseListCount", "unReadCaseList", "msgCount","unionKey"])
  },
  methods: {
    // 如果为已读案件，直接进入
    selectCase(e) {
      let store = this.$store;
      if (e.unreadFileCount > 0 || e.unreadMsgCount > 0) {
        store.commit("SELECT_UNREADMSG", e);
      } else {
        store.commit("SELECT_CASE", e);
        store.dispatch("getCreateGroup").then(res => {
          store.dispatch("getUpdateMsg").then(data => {
            this.getUnreadCaseList(false);
          });
        });
      }
    },
    onScroll(e) {
      let srcElement = e.srcElement;
      if (
        srcElement.scrollTop +
          srcElement.offsetHeight -
          srcElement.scrollHeight ==
          0 &&
        page < Math.ceil(this.unReadCaseListCount / 15)
      ) {
        page++;
        this.pageNum = page;
        this.getUnreadCaseList();
      }
    },
    getUnreadCaseList(isLoading) {
      if (isLoading) {
        this.loading = true;
      }
      this.$store
        .dispatch("getUnreadCaseList", {
          pageNum: this.pageNum
        })
        .then(res => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getUnreadCaseList(true);
  },
  beforeDestroy() {
    this.pageNum = 1;
  }
};
</script>

<style lang="scss" scoped>
#caseList {
  width: 250px;
  background: #e6e6e6;
  border-right: 1px solid #eaeaea;
}

.el-badge__content.is-fixed {  
  top: 50%; 
  right: 35px;
}

.wrapper {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #3681ff;
  color: #ffffff;
  font-size: 16px;
}

.search-wrapper {
  position: relative;
  display: flex;
  box-sizing: border-box;
  height: 26px;
  width: 100%;
  background-color: #e5e3e2;
  border: 1px solid #d9d7d6;
  border-radius: 2px;

  .searchInput {
    flex: 1;
    font-size: 12px;
    padding: 6px;
    background-color: #e5e3e2;
    outline: none;

    &:focus {
      background-color: #f2efee;
    }
  }

  .icon-search {
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }

  .searchInput-delete {
    display: block;
    position: absolute;
    outline: none;
    top: 0;
    right: 0;
    width: 24px;
    height: 100%;
    cursor: pointer;
    color: #666666;
    line-height: 26px;
    font-size: 14px;
  }
}

.tab_pannel {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  text-align: center;
  border-top: 1px solid #d9d7d6;

  li {
    flex: 1;
    cursor: pointer;
    position: relative;

    &.active {
      color: #0052D9;
      border-bottom: 3px solid #0052D9;
    }
  }
}

.caseList {
  height: calc(100vh - 60px);
  overflow-y: auto;
  background: #ffffff;

  #caseListBox {
    height: 100%;
    position: relative;
    user-select: none;
  }

  .sessionlist {
    display: flex;
    padding: 12px;
    transition: background-color 0.1s;
    font-size: 0;
    flex-direction: column;
    line-height: 2;
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: rgb(220, 220, 220);
    }

    &.active {
      background-color: #c4c4c4;
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
