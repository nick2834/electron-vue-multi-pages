<!--到庭情况-->
<template>
  <div
    class="presence_content"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgb(255, 255, 255)"
  >
    <back-btn title="到庭情况"/>
    <section>
      <el-table :data="presenceList" style="width: 100%" size="medium">
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.state == 'Online'" style="color:#0052D9">在线</div>
            <div v-else>离线</div>
          </template>
        </el-table-column>
        <el-table-column label="身份">
          <template slot-scope="scope">
            <img
              :src="scope.row.headUrl"
              width="36"
              :class="scope.row.state == 'Online'?'is_online':'is_offline'"
            >
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="首次进入时间" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.isEnterDate" style="color:#0052D9">{{scope.row.isEnterDate}}</div>
            <div v-else>未进入</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <span
              v-if="user.identityId != scope.row.identityId"
              @click="handleForbidden(scope.$index, scope.row)"
              class="func_area"
            >
              <i
                :class="['iconfont',scope.row.shuttedUinStatus ? 'icon-unforbidden':'icon-forbidden']"
              ></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
import { getOnlineState } from "@/service";
import { mapState } from "vuex";
import http from "@/service/http";
let CancelToken = http.CancelToken;
let source = CancelToken.source();
let cancel;
export default {
  computed: {
    ...mapState(["caseId", "groupId", "openid", "user"])
  },
  data() {
    return {
      timer: null,
      presenceList: [],
      loading: true
    };
  },
  methods: {
    handleForbidden(index, row) {
      let title = row.shuttedUinStatus
        ? "此操作将禁止此人发言, 是否继续?"
        : "此操作将解除禁止此人发言, 是否继续?";
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    },
    getOnlineState() {
      let _this = this;
      let timer = this.timer;
      this.source = http.CancelToken;
      getOnlineState()
        .then(({ data }) => {
          _this.loading = false;
          _this.presenceList = data.data;
          new CancelToken(function executor(c) {
            cancel = c;
          });
          clearInterval(timer);
          timer = _this.timer = null;
          timer = _this.timer = setInterval(() => {
            _this.getOnlineState();
          }, 4000);
        })
        .catch(err => {
          clearInterval(timer);
          timer = _this.timer = null;
          cancel();
        });
    },
    cancleTimer() {
      cancel();
    }
  },
  mounted() {
    let _this = this;
    _this.getOnlineState();
    _this.$once("hook:beforeDestroy", () => {
      _this.cancleTimer();
      if (_this.timer) {
        clearInterval(_this.timer);
        _this.timer = null;
        _this.cancleTimer();
      }
    });
  }
  // beforeDestroy() {
  //   let _this = this;
  //   _this.cancleTimer();
  //   if (_this.timer) {
  //     clearInterval(_this.timer);
  //     _this.timer = null;
  //     _this.cancleTimer();
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.presence_content {
  height: calc(100vh - 120px);

  section {
    margin: 20px 0;

    .is_offline {
      filter: grayscale(100%);
    }

    .is_online {
      filter: grayscale(0);
    }

    .func_area {
      cursor: pointer;
      line-height: 30px;
    }

    .iconfont {
      color: #0052D9;
      font-size: 30px;
    }

    .el-table .cell {
      line-height: 30px;
    }
  }
}
</style>

