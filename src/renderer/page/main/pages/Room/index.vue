<template>
  <el-container class="message_container">
    <template v-if="caseId != ''">
      <el-main class="message_content">
        <a-message-content></a-message-content>
        <a-message-input></a-message-input>
      </el-main>
      <el-aside :width="isOpen ? '240px':'0'" class="online_container">
        <span class="toggle_span" :style="{left:isOpen?'0':'-10px'}" @click="isOpen = !isOpen">
          <i :class="isOpen ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </span>
        <div
          class="message_detail"
          v-loading="detailLoading"
          element-loading-background="rgb(255, 255, 255)"
        >
          <el-tabs v-model="activeName" class="message_tab">
            <el-tab-pane label="基本信息" name="base">
              <a-base-info v-if="caseInfo" :caseInfo="caseInfo"></a-base-info>
            </el-tab-pane>
            <el-tab-pane label="案件主体" name="body">
              <a-case-body v-if="litigantList" :litigantList="litigantList" :address="address"></a-case-body>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-aside>
    </template>
  </el-container>
</template>

<script>
import ADocdom from "@/components/ADocdom";
import AMessageContent from "./messageContent";
import AMessageInput from "./messageInput";
import ABaseInfo from "./baseInfo";
import ACaseBody from "./caseBody";
import { infoByCaseId } from "@/service";
import { uniqeByKeys } from "@/utils/tools.js";
function sortId(a, b) {
  return a.position - b.position;
}
export default {
  data() {
    return {
      isOpen: true,
      detailLoading: false,
      activeName: "base",
      caseInfo: null,
      litigantList: [],
      address: ""
    };
  },
  components: {
    ADocdom,
    AMessageContent,
    AMessageInput,
    ABaseInfo,
    ACaseBody
  },
  computed: {
    role: {
      get() {
        return this.$store.state.user.role;
      }
    },
    caseId: {
      get() {
        return this.$store.state.cases.caseId;
      }
    }
  },
  watch: {
    caseId(val) {
      this.getInfoByCaseId();
    }
  },
  methods: {
    getInfoByCaseId() {
      let _this = this;
      _this.detailLoading = true;
      infoByCaseId({
        moduleId: "tc-infoByCaseId",
        caseId: this.caseId
      }).then(({ data }) => {
        _this.detailLoading = false;
        this.caseInfo = data.data;
        let agents = uniqeByKeys(data.data.agents, ["identityId", "name"]);
        let litigants = uniqeByKeys(data.data.litigants, [
          "identityId",
          "name"
        ]);
        let judgeList = uniqeByKeys(data.data.judges, ["identityId", "name"]);
        let relations = uniqeByKeys(data.data.relations, [
          "identityId",
          "name"
        ]);
        let litigantList = [];
        litigants.map(function(item, index) {
          for (let i = 1; i <= 30; i++) {
            if (item.position == i) {
              switch (i) {
                case (i = 1):
                  item.litiTitle = "原告";
                  break;
                case (i = 2):
                  item.litiTitle = "被告";
                  break;
                case (i = 3):
                  item.litiTitle = "第三人";
                  break;
                case (i = 4):
                  item.litiTitle = "上诉人";
                  break;
                case (i = 5):
                  item.litiTitle = "被上诉人";
                  break;
                case (i = 6):
                  item.litiTitle = "申请人";
                  break;
                case (i = 7):
                  item.litiTitle = "被申请人";
                  break;
                case (i = 8):
                  item.litiTitle = "被执行人";
                  break;
                case (i = 9):
                  item.litiTitle = "原审诉讼地位";
                  break;
                case (i = 10):
                  item.litiTitle = "再审申请人";
                  break;
                case (i = 11):
                  item.litiTitle = "再审被申请人";
                  break;
                case (i = 12):
                  item.litiTitle = "异议人";
                  break;
                case (i = 13):
                  item.litiTitle = "被执行第三人";
                  break;
                case (i = 14):
                  item.litiTitle = "原审原告";
                  break;
                case (i = 15):
                  item.litiTitle = "原审被告";
                  break;
                case (i = 16):
                  item.litiTitle = "原审第三人";
                  break;
                case (i = 17):
                  item.litiTitle = "反诉原告";
                  break;
                case (i = 18):
                  item.litiTitle = "反诉被告";
                  break;
                case (i = 19):
                  item.litiTitle = "起诉人";
                  break;
                case (i = 20):
                  item.litiTitle = "被诉监护人";
                  break;
              }
              item.agents = [];
              item["open"] = false;
              agents.map(function(item2) {
                if (item2.sequence.indexOf(item.sequence) != -1) {
                  item2["position"] = i;
                  item.agents.push(item2);
                  return;
                }
              });
              litigantList.push(item);
              litigantList.sort(sortId);
              _this.litigantList = litigantList;
            }
          }
        });
      });
    }
  },
  mounted() {
    console.log(this.$route);
    if (this.caseId == "") return;
    if (this.$route.params) {
      this.address = this.$route.params.address;
    }
    this.getInfoByCaseId();
  }
};
</script>

<style lang="scss" scoped>
.message_content {
  padding: 0;
}
.online_container {
  height: calc(100vh - 55px);
  background: #f6f7f9;
  position: relative;
  overflow: unset;
  transition: 300ms;
  .toggle_span {
    position: absolute;
    background: #dadada;
    width: 10px;
    height: 35px;
    color: #ffffff;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    line-height: 35px;
    cursor: pointer;
    z-index: 2;
    &:hover {
      background: #12b7f5;
    }
  }
  .message_detail {
    position: relative;
  }
  .message_tab {
    padding: 0 15px;
  }
}
</style>