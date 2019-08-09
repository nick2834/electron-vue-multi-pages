<template>
  <el-tree
    :data="checkData"
    ref="tree"
    show-checkbox
    node-key="id"
    :props="defaultProps"
    default-expand-all
    @check-change="handleCheckChange"
    :render-content="renderContent"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
  ></el-tree>
</template>
<script>
import { uniqeByKeys, uniq } from "@/utils/tools.js";
import { mapState } from "vuex";
function sortId(a, b) {
  return a.position - b.position;
}
const defaultCourt = {
  id: 1,
  name: "法院",
  litiArr: [
    {
      id: 2,
      name: "依申请调取"
    },
    {
      id: 3,
      name: "依职权调取"
    }
  ]
};
let checkData = [];
export default {
  computed: {
    ...mapState(["toolTag"])
  },
  data() {
    return {
      loading: true,
      checkData: [],
      litigantList: [],
      defaultProps: {
        children: "litiArr",
        label: "name"
      },
      selectUser: [], //选择人员
      selectUserNames: [], //选择人员名称
      allUser: [],
      allUserNames: [],
      allJudgesIdentityId: [],
      allJudgeName: [],
      selectSequence: [],
      selectPotion: "",
      allUserIdentity: [],
      selectObject: {}
    };
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
        </span>
      )
    },
    handleCheckChange(data, isChecked) {
      let _this = this;
      let checkKeys = _this.$refs.tree.getCheckedKeys(true);
      _this.litigantList.map(item => {
        checkKeys.indexOf(item.id) != -1
          ? (item["checked"] = true)
          : (item["checked"] = false);
      });
      this.watchLitigant(_this, _this.litigantList);
    },
    watchLitigant(_this, val) {
      let selectSequence = [];
      let selectPotion = [];
      let selectUser = [];
      let selectUserNames = [];
      let selectObject = new Object();
      val.map(item => {
        if (item.checked) {
          selectSequence.push(item.sequence);
          selectPotion.push(item.position);
          selectUser.push(item.identityId);
          selectUserNames.push(item.name);
          if (item.agents && item.agents.length > 0) {
            item.agents.map(items => {
              selectUser.push(items.identityId);
              selectUserNames.push(items.name);
            });
          }
        }
      });
      selectObject["identityId"] = uniq(selectUser);
      selectObject["name"] = uniq(selectUserNames);
      selectObject["allIdentityId"] = uniq(_this.allUserIdentity);
      selectObject["allName"] = uniq(_this.allUserNames);
      selectObject["selectSequence"] = uniq(selectSequence);
      selectObject["selectPotion"] = uniq(selectPotion);
      selectObject["allJudgesIdentityId"] = uniq(_this.allJudgesIdentityId);
      selectObject["allJudgeName"] = uniq(_this.allJudgeName);
      _this.$emit("checkChange", selectObject);
    }
  },
  mounted() {
    let _this = this;
    this.$store.dispatch("getInfoByCaseId").then(response => {
      _this.loading = false;
      if (response) {
        let agents = uniqeByKeys(response.agents, ["identityId", "name"]);
        let litigants = uniqeByKeys(response.litigants, ["identityId", "name"]);
        let judgeList = uniqeByKeys(response.judges, ["identityId", "name"]);
        let relations = uniqeByKeys(response.relations, ["identityId", "name"]);
        let litigantList = [];
        let checkboxItems = [];
        relations.map(item => {
          if (item.identityId != "" && item.name != "") {
            _this.allUserNames.push(item.name);
            _this.allUserIdentity.push(item.identityId);
          }
        });
        litigants.map(function(item, index) {
          if (item.identityId != "" && item.name != "") {
            _this.allUser.push(item.identityId);
            _this.allUserNames.push(item.name);
            _this.allUserIdentity.push(item.identityId);
          }
          checkboxItems[index] = {
            name: "",
            value: String(index) + String(index),
            litiArr: []
          };
          for (let i = 1; i <= 30; i++) {
            if (item.position == i) {
              switch (i) {
                case (i = 1):
                  checkboxItems[index].name = "原告";
                  break;
                case (i = 2):
                  checkboxItems[index].name = "被告";
                  break;
                case (i = 3):
                  checkboxItems[index].name = "第三人";
                  break;
                case (i = 4):
                  checkboxItems[index].name = "上诉人";
                  break;
                case (i = 5):
                  checkboxItems[index].name = "被上诉人";
                  break;
                case (i = 6):
                  checkboxItems[index].name = "申请人";
                  break;
                case (i = 7):
                  checkboxItems[index].name = "被申请人";
                  break;
                case (i = 8):
                  checkboxItems[index].name = "被执行人";
                  break;
                case (i = 9):
                  checkboxItems[index].name = "原审诉讼地位";
                  break;
                case (i = 10):
                  checkboxItems[index].name = "再审申请人";
                  break;
                case (i = 11):
                  checkboxItems[index].name = "再审被申请人";
                  break;
                case (i = 12):
                  checkboxItems[index].name = "异议人";
                  break;
                case (i = 13):
                  checkboxItems[index].name = "被执行第三人";
                  break;
                case (i = 14):
                  checkboxItems[index].name = "原审原告";
                  break;
                case (i = 15):
                  checkboxItems[index].name = "原审被告";
                  break;
                case (i = 16):
                  checkboxItems[index].name = "原审第三人";
                  break;
                case (i = 17):
                  checkboxItems[index].name = "反诉原告";
                  break;
                case (i = 18):
                  checkboxItems[index].name = "反诉被告";
                  break;
                case (i = 19):
                  checkboxItems[index].name = "起诉人";
                  break;
                case (i = 20):
                  checkboxItems[index].name = "被诉监护人";
                  break;
              }
              item.agents = [];
              item["checked"] = false;
              agents.map(function(item2) {
                if (item2.sequence.indexOf(item.sequence) != -1) {
                  item2["position"] = i;
                  item.agents.push(item2);
                  return;
                }
              });
              litigantList.push(item);
              litigantList.sort(sortId);
              checkboxItems[index]["litiArr"].push(item);
              _this.litigantList = litigantList;
            }
          }
        });
        agents.map((item, index) => {
          if (item.identityId != "" && item.name != "") {
            _this.allUser.push(item.identityId);
            _this.allUserNames.push(item.name);
            _this.allUserIdentity.push(item.identityId);
          }
        });
        judgeList.map((item, index) => {
          if (item.identityId != "") {
            _this.allJudgesIdentityId.push(item.identityId);
            _this.allJudgeName.push(item.name);
            _this.allUserNames.push(item.name);
            _this.allUserIdentity.push(item.identityId);
          }
        });
        var newItems = {};
        var newCheckboxItems = [];
        checkboxItems.map(item => {
          if (!newItems[item.name]) {
            newCheckboxItems.push(item);
            newItems[item.name] = item;
          } else {
            newCheckboxItems.map(item2 => {
              if (item2.name == item.name) {
                item2.litiArr.push(item.litiArr[0]);
              }
            });
          }
        });
        if (this.toolTag == 3) {
          newCheckboxItems.push(defaultCourt);
          _this.litigantList.push(defaultCourt.litiArr[0]);
          _this.litigantList.push(defaultCourt.litiArr[1]);
        }
        this.checkData = newCheckboxItems.reverse();
      }
    });
  }
};
</script>
<style lang="scss" scoped>

</style>
