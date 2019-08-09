<template>
  <section id="setuplist">
    <div class="wrapper">在线立案</div>
    <div
      class="setuplist"
      :style="{height:($route.path == '/setupcase'?'calc(100vh - 120px)':'calc(100vh - 60px)')}"
      v-loading="loading"
      element-loading-background="rgb(255, 255, 255)"
    >
      <ul id="setuplistBox" v-if="setupList.length > 0">
        <li v-for="(item,index) in setupList" class="sessionlist" :key="index">
          <p class="name">受理法院：{{item.courtName}}</p>
          <p class="lastmsg">提交时间：{{item.createTime}}</p>
          <div class="bottom_area">
            <span>申请号：{{item.id}}</span>
            <span v-if="item.statusCode == 1" class="fail">未通过</span>
            <span v-else class="succ">{{item.status}}</span>
          </div>
        </li>
      </ul>
      <ul id="setuplistBox" v-else>
        <placeholder :title="title"/>
      </ul>
    </div>
    <router-link
      class="setup_btn"
      tag="div"
      :to="{name: 'center'}"
      v-if="$route.path == '/setupcase'"
    >申请立案</router-link>
  </section>
</template>
<script>
import { getPutOnRecord } from "@/service";
import placeholder from "@/components/placeholder";
export default {
  data() {
    return {
      loading: true,
      setupList: [],
      title: "暂无立案"
    };
  },
  components: { placeholder },
  methods: {
    getPutOnRecord() {
      let _this = this;
      _this.loading = true;
      getPutOnRecord().then(({ data }) => {
        _this.loading = false;
        if (data.code == 0 && data.data) {
          _this.setupList = data.data.reverse();
        }
      });
    }
  },
  mounted() {
    this.getPutOnRecord();
  }
};
</script>
<style lang="scss" scoped>
#setuplist {
  width: 250px;
  background: #e6e6e6;
  border-right: 1px solid #eaeaea;

  .wrapper {
    height: 60px;
    line-height: 60px;
    text-align: center;
    // background: #3681ff !important;
    // color: #ffffff;
  }

  .setuplist {
    height: calc(100vh - 120px);
    overflow-y: auto;
    background: #fff;

    #setuplistBox {
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

      .bottom_area {
        font-size: 12px;
        width: 100%;
        color: #999;
        bottom: 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        justify-content: space-between;
        align-items center

        .fail {
          border: 1px solid #d0021b;
          color: #d0021b;
        }

        .succ {
          border: 1px solid #0052D9;
          padding: 4px 10px;
          color: #0052D9
        }
      }
    }
  }

  .setup_btn {
    height: 60px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    background: #0052D9;
    color: #ffffff;

    &:hover, &:focus {
      background: #66b1ff;
    }
  }
}
</style>

