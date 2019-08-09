<template>
  <el-form label-width="100px" class="setup_container setup_first">
    <el-form-item label="选择立案类型">
      <el-select v-model="value" placeholder="请选择立案类型">
        <el-option
          v-for="item in setupStyle"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择受理法院">
      <el-cascader
        :options="options"
        :show-all-levels="false"
        expand-trigger="hover"
        placeholder="请选择受理法院"
      ></el-cascader>
    </el-form-item>
    <el-form-item class="el-form__btn btn_group">
      <span class="btn cancle" @click="cancle">取消</span>
      <span class="btn next" @click="nextStep">下一步</span>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      setupStyle: [
        { label: "审判立案", value: 1 },
        { label: "执行立案", value: 2, disabled: true }
      ],
      options: [
        {
          value: "shenzhen",
          label: "深圳",
          children: [
            {
              value: "futiantu",
              label: "福田区",
              children: [
                {
                  value: "yizhi",
                  label: "福田区人民法院"
                },
                {
                  value: "fankui",
                  label: "福田区人民法院"
                },
                {
                  value: "xiaolv",
                  label: "福田区人民法院"
                },
                {
                  value: "kekong",
                  label: "福田区人民法院"
                }
              ]
            },
            {
              value: "nanshanqu",
              label: "南山区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "南山区人民法院"
                },
                {
                  value: "dingbudaohang",
                  label: "南山区人民法院"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    cancle() {
      this.$emit("cancle");
      this.$router.push({name:'setupcase'})
    },
    nextStep() {
      this.$emit("nextStep");
    }
  }
};
</script>
<style lang="scss" scoped>
.setup_first {
  .el-form-item {
    margin: 24px auto;

    .el-select, .el-cascader {
      width: 400px;
    }
  }
}
</style>

