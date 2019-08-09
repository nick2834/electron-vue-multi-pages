<template>
  <div
    class="modal_box detail_box"
    :class="detailModal?'active':''"
    v-loading="detailLoading"
    element-loading-background="rgb(255, 255, 255)"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <el-row>
          <el-col :span="8">案号</el-col>
          <el-col :span="16">{{caseInfo.caseNo}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">案由</el-col>
          <el-col :span="16">{{caseInfo.cause}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">标的额（元）</el-col>
          <el-col :span="16">{{caseInfo.money}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">立案日期</el-col>
          <el-col :span="16">{{caseInfo.setupAt}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">剩余审限</el-col>
          <el-col :span="16">{{caseInfo.jlqx}}天</el-col>
        </el-row>
        <template v-if="caseInfo.judges && caseInfo.judges.length > 0">
          <el-row>
            <el-col :span="24">审判成员</el-col>
          </el-row>
          <ul class="judge_info">
            <li v-for="(item,index) in caseInfo.judges" :key="index">
              <span class="span_8">{{item.judgesType}}</span>
              <span class="span_16">{{item.name}}</span>
            </li>
          </ul>
        </template>
      </el-tab-pane>
      <el-tab-pane label="案件主体" name="second">
        <el-row>
          <el-col :span="24">当事人信息</el-col>
        </el-row>
        <el-table :data="litigantList" style="width: 100%">
          <el-table-column prop="litiTitle" label="身份"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="phoneId" label="联系方式"></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">当事人送达地址</el-col>
        </el-row>
        <el-collapse v-model="activeName2" accordion>
          <el-collapse-item v-for="(item,index) in litigantList" :name="index" :key="index">
            <template slot="title">
              <span style="width:50%">{{item.litiTitle}}</span>
              <span>{{item.name}}</span>
            </template>
            <div class="address">{{item.address}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { infoByCaseId } from "@/service";
import { uniqeByKeys } from "@/utils/tools.js";
function sortId(a, b) {
  return a.position - b.position;
}
export default {
  computed: {
    ...mapState(["caseId", "detailModal"])
  },
  watch: {
    detailModal(val) {
      if (!val) return;
      let _this = this;
      _this.detailLoading = true;
      this.$store.dispatch("getInfoByCaseId").then(response => {
        _this.detailLoading = false;
        if (response) {
          let agents = uniqeByKeys(response.agents, ["identityId", "name"]);
          let litigants = uniqeByKeys(response.litigants, [
            "identityId",
            "name"
          ]);
          let judgeList = uniqeByKeys(response.judges, ["identityId", "name"]);
          let relations = uniqeByKeys(response.relations, [
            "identityId",
            "name"
          ]);
          let litigantList = [];
          _this.caseInfo = response;
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
                console.log(_this.litigantList)
                _this.litigantList = litigantList;
              }
            }
          });
        }
      });
    }
  },
  data() {
    return { 
      activeName: "first",
      caseInfo: {},
      litigantList: [],
      activeName2: 0,
      detailLoading: true
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tabs__header {
  margin: 0;
}

.el-row {
  line-height: 3;
  border-bottom: 1px solid #E4E7ED;
  font-size: 14px;
  color: #606266;
}

.el-col-16 {
  text-align: right;
}

.address {
  text-align: center;
}

.judge_info {
  line-height: 3;
  font-size: 14px;
  color: #606266;

  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e4e7ed;
  }
}
</style>