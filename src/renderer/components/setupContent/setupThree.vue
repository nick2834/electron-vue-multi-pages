<template>
  <div class="setup_container setup_three">
    <el-form class="content" ref="form" label-width="220px" :rules="rules">
      <el-form-item v-for="(item,index) in qsclList" :key="index" :label="item.clmc" :prop="item.reg">
        <el-upload
          action
          :http-request="fileUpload"
          :on-remove="handleRemove"
          :item="item"
          :list-index="index"
          list-type="picture-card"
          multiple
          accept=".jpeg, .jpg, .png"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="btn_group">
      <span class="btn btn__prev" @click="prevStep">上一步</span>
      <span class="btn btn__next" @click="nextStep">下一步</span>
    </div>
  </div>
</template>
<script>
// import upload from "@/components/upload";
export default {
  data() {
    return {
      rules: {
        reg0: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        reg1: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        reg3: [{ required: true, message: "请选择活动区域", trigger: "change" }]
      },
      qsclList: [
        {
          clmc: "起诉状(必填项)",
          qscllj: [],
          qsclclfl: "1",
          reg: 'reg0'
        },
        {
          clmc: "当事人的身份材料(必填项)",
          qscllj: [],
          qsclclfl: "10",
          reg: 'reg1'
        },
        {
          clmc: "委托代理人委托手续和身份材料",
          qscllj: [],
          qsclclfl: "4",
          reg: 'reg2'
        },
        {
          clmc: "证据材料(必填项)",
          qscllj: [],
          qsclclfl: "3",
          reg: 'reg3'
        },
        {
          clmc: "其他材料",
          qscllj: [],
          qsclclfl: "6",
          reg: 'reg4'
        }
      ]
    };
  },
  // components: { upload },
  methods: {
    fileUpload() {},
    handleRemove(index, item, listIndex) {
      console.log(index);
      console.log(item);
      console.log(listIndex);
    },
    prevStep() {
      this.$emit("prevStep");
    },
    nextStep() {
      this.$emit("nextStep");
    }
  }
};
</script>
<style lang="scss" scoped>
.setup_three {
  .content {
    // max-width 600px;
    margin-top: 20px;
    height: calc(100vh - 300px);
    overflow-y: scroll;

    .title {
      background: #cfe5ff;
      line-height: 2.5;
      text-align: center;
      color: #0052D9;
    }

    .text {
      max-height: 400px;
      overflow-y: scroll;

      p {
        padding: 0 20px;
        line-height: 2;
        text-indent: 35px;
        font-size: 14px;
        color: #333;
        overflow-y: scroll;
      }
    }
  }

  .el-checkbox {
    margin: 20px auto;
  }
}
</style>

