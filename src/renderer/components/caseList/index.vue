<!-- 案件列表 -->
<template>
  <section id="caseList" class="dragable">
    <div class="wrapper">
      <div class="search-wrapper">
        <el-input
          class="no__dragable"
          placeholder="搜索"
          size="medium"
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
      class="caseList no__dragable"
      @scroll="onScroll"
      v-loading="loading"
      element-loading-background="rgb(255, 255, 255)"
    >
      <ul id="caseListBox" v-if="caseList.length > 0">
        <li
          v-for="(item,index) in caseList"
          class="sessionlist"
          :class="{ active: item.caseId == caseId }"
          @click="selectCase(item)"
          :key="index"
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
import { mapState, mapMutations } from "vuex";
import placeholder from "@/components/placeholder";
var page = 1;
export default {
  data() {
    return {
      active: false,
      pageNum: 1,
      status: 2,
      keyword: "",
      activeIndex: 0,
      loading: false,
      title: "暂无案件",
      timer: null,
      caseList: [],
      input1: ""
    };
  },
  components: {
    placeholder
  },
  computed: {
    ...mapState(["caseId", "searchText", "caseListCount", "msgCount", "role"]),
    noText() {
      if (this.keyword === "") return true;
      return false;
    },
    haveText() {
      if (this.keyword === "") return false;
      return true;
    }
  },
  watch: {
    role(val) {
      this.caseList = [];
      this.selectMyCaseList(true);
    }
  },
  methods: {
    //选择案件  进入群聊
    selectCase(e) {
      this.$store.commit("SELECT_CASE", e);
      this.$store.dispatch("getCreateGroup").then(res => {
        this.$store.dispatch("getUpdateMsg").then(data => {
          this.selectMyCaseList(false);
        });
      });
    },
    //案件搜索
    keypress(e) {
      this.caseList = [];
      this.selectMyCaseList(true);
    },
    //删除搜索
    del() {
      this.keyword = "";
      this.selectMyCaseList(true);
    },
    onScroll(e) {
      let srcElement = e.srcElement;
      if (
        srcElement.scrollTop +
          srcElement.offsetHeight -
          srcElement.scrollHeight ==
          0 &&
        page < Math.ceil(this.caseListCount / 15)
      ) {
        page++;
        this.pageNum = page;
        this.selectMyCaseList();
      }
    },
    selectMyCaseList(isLoading) {
      if (isLoading) {
        this.loading = true;
      }
      this.$store
        .dispatch("selectMyCaseList", {
          pageNum: this.pageNum,
          status: this.status,
          keyword: this.keyword
        })
        .then(res => {
          this.loading = false;
          if (res.errorCode == 0 && res.data.case) {
            this.caseList = res.data.case;
          }
        });
    },
    handleClick(e) {
      this.activeIndex = e;
      this.status = e;
      this.selectMyCaseList(true);
      this.$store.commit("CLEAR_SELECT_CASE");
    }
  },
  mounted() {
    this.selectMyCaseList(true);
  },
  beforeDestroy() {
    this.pageNum = 1;
    this.caseList = [];
  }
};
</script>

<style lang="scss" scoped>
#caseList {
  width: 250px;
  background: #e6e6e6;
  border-right: 1px solid #eaeaea;
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
  // border-top: 1px solid #d9d7d6;
  background: #ffffff;
  border-bottom: 1px solid #d9d7d6;

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
      background: #0052D9;
      transform: scale(0);
      transition: all 300ms;
    }

    &.active,
    &:hover {
      color: #0052D9;
      font-weight: 500;

      &::after {
        width: 60%;
        transform: scale(1);
      }
    }
  }
}

.caseList {
  height: calc(100vh - 120px);
  overflow-y: auto;
  // background: #f2f2f2;
  background: #ffffff;

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
