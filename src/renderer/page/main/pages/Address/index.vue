<!-- 送达地址 -->
<template>
  <el-card class="box-card address_card">
    <el-form :model="addresForm" ref="addressForm" :rules="rules">
      <el-form-item>
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sed debitis dolor alias voluptatem aliquid, accusantium molestiae omnis beatae</span>
        <span>veritatis at sapiente minus mollitia cum! Veniam itaque iure hic laborum?</span>
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit</span>
      </el-form-item>
      <el-form-item>
        <el-input v-model="addresForm.address"></el-input>
      </el-form-item>
      <el-form-item>
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sed debitis dolor alias voluptatem aliquid, accusantium molestiae omnis beatae</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认送达地址</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      addresForm: {
        address: ""
      },
      rules:{
        address: [
          { required: true, message: "请输入正确的送达地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          console.log(valid);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.address_card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.box-card {
  width: 500px;
}
</style>