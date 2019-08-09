<template>
  <div class="modal_box tool_bar" :class="{ active : toolModal }" v-if="initSuccess">
    <el-collapse-transition>
      <tool v-if="toolTag == 1 || toolTag == 0"/>
      <private-chat v-else-if="toolTag == 2"/>
      <evidence v-else-if="toolTag == 3"/>
      <document v-else-if="toolTag == 4" num="1"/>
      <take-down v-else-if="toolTag == 5"/>
      <make-peace v-else-if="toolTag == 6"/>
      <per-manage v-else-if="toolTag == 7"/>
      <presence v-else-if="toolTag == 8"/>
      <que-to-evi v-else/>
    </el-collapse-transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
import tool from "./tool"; //总入口
import evidence from "./evidence"; //提交证据
import document from "./document"; //提交证据
import privateChat from "./privateChat"; //联系各方
import takeDown from "./takeDown"; //制作笔录
import makePeace from "./makePeace"; //调解协议
import perManage from "./perManage"; //人员管理
import presence from "./presence"; //到庭情况
import queToEvi from "./queToEvi"; //质证
export default {
  props: {
    time: {
      required: false,
      default: 0
    }
  },
  computed: {
    ...mapState(["toolModal", "toolTag"])
  },
  components: {
    tool,
    evidence,
    privateChat,
    queToEvi,
    document,
    takeDown,
    makePeace,
    perManage,
    presence
  },
  data() {
    return {
      initSuccess: false
    };
  },
  created() {
    this.initSlot();
  },
  methods: {
    initSlot() {
      let vm = this;
      setTimeout(function() {
        vm.initSuccess = true;
        vm.checkData = [];
      }, Number(vm.time || 0));
    }
  }
};
</script>
<style lang="scss" scoped></style>
