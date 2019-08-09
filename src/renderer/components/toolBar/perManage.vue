<!--人员管理-->
<template>
  <div class="permanage_content">
    <back-btn title="人员管理"/>
    <section>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="代理人类型">
          <el-select v-model="form.agentType" placeholder="请选择代理人类型" @change="changeType">
            <el-option
              v-for="(item,index) in agentArr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="form.identityId" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phoneId" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item
          label="单位名称"
          v-if="form.agentType == '09_01010-1' || form.agentType == '09_01010-2'"
        >
          <el-input v-model="form.address" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="委托权限">
          <el-radio-group v-model="form.permission">
            <el-radio v-for="(item,index) in items" :key="index" :label="item.name">{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择代理关系">
          <user-tree v-on:checkChange="checkChange"></user-tree>
        </el-form-item>
        <el-button type="primary" :loading="isSendLoading">提交</el-button>
      </el-form>
    </section>
  </div>
</template>
<script>
import userTree from './userTree'
export default {
  data() {
    return {
      isSendLoading: false,
      agentArr: [
        {
          name: "请选择",
          id: "09_01"
        },
        {
          name: "律师",
          id: "09_01010-1"
        },
        {
          name: "承担法律援助的律师",
          id: "09_01010-2"
        },
        {
          name: "监护人",
          id: "09_01010-3"
        },
        {
          name: "亲友",
          id: "09_01010-4"
        },
        {
          name: "社会团体推荐的公民",
          id: "09_01010-5"
        },
        {
          name: "所在单位推荐的人",
          id: "09_01010-6"
        },
        {
          name: "法院许可的其他公民",
          id: "09_01010-7"
        },
        {
          name: "法律工作者",
          id: "09_01010-8"
        },
        {
          name: "所在社区推荐的公民",
          id: "09_01010-9"
        }
      ],
      items: [
        {
          name: "09_Z9996-1",
          value: "一般授权",
          checked: "true"
        },
        {
          name: "09_Z9996-2",
          value: "特别授权"
        }
      ],
      form: {
        agentType: "",
        name: "",
        phoneId: "",
        identityId: "",
        address: "",
        permission: "09_Z9996-1",
        resource: "",
        desc: ""
      }
    };
  },
  components:{userTree},
  methods: {
    changeType(e) {
      this.form.agentType = this.agentArr.find(item => e == item.id).id;
    },
    onSubmit() {
      console.log("submit!");
    },
    checkChange(e){
      // console.log(e)
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  margin-top: 20px;

  .el-select {
    width: 100%;
  }
}
</style>
