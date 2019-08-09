<template>
  <div class="msgDetail" :loading="loading">
    <header>
      <div class="caseTitle">
        <img src="@/assets/images/law.png" alt>
        <span class="caseNo">{{newsCaseNo}}</span>
      </div>
      <el-button type="primary">进入案件</el-button>
    </header>
    <ul class="msgDetail_content">
      <li v-for="(item,index) in msgListDetail" :key="index">
        <!-- <img class="img_placeholder" style="width: 100px; height: 100px" :src="url" :class="{isFloat: index%2 == 1}"/> -->
        <img class="img_placeholder" v-if="item.type == 0" src="@/assets/images/icon-0.png">
        <img class="img_placeholder" v-else-if="item.type == 1" src="@/assets/images/icon-1.png">
        <img class="img_placeholder" v-else-if="item.type == 2" src="@/assets/images/icon-2.png">
        <p class="detail_con detail_title">{{item.title}}</p>
        <p class="detail_con detail_date">{{item.sendDate}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["unionKey", "newsCaseNo"])
  },
  data() {
    return {
      loading: true,
      msgListDetail: [],
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  mounted() {
    this.getSelectMsgList();
  },
  methods: {
    getSelectMsgList() {
      this.loading = true;
      this.$store.dispatch("getSelectMsgList").then(res => {
        this.loading = false;
        let msgListDetail = res.data;
        msgListDetail.map(item =>{
          item['icon'] = `assets/images/icon-${item.type}.png`
        })
        this.msgListDetail = msgListDetail;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
section .el-button {
  width: 100px;
  margin-top: 0;
}

.msgDetail {
  width: 100%;
  height: 100vh;

  header {
    height: 60px;
    padding: 0 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;

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
      }
    }
  }

  .msgDetail_content {
    height: calc(100vh - 60px);
    padding: 0 10%;
    overflow-y: scroll;

    li {
      border-bottom: 1px solid #e7e7e7;
      padding: 20px 0;
      overflow: hidden;
      width: 49%;
      float: left;
      margin-right: 2%;

      &:nth-child(2n) {
        margin-right: 0;
      }

      .img_placeholder {
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 10px;

        &.isFloat {
          float: right;
        }
      }

      .detail_con {
        text-align: right;
        line-height: 25px;
      }

      .detail_title {
        font-size:14px
      }

      .detail_date {
        color: #888888;
        font-size: 12px
      }
    }
  }
}
</style>
