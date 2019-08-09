<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item,index) in toolData" :key="index">
      <div class="grid-content" @click="selectTools(index)">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.title}}</span>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      toolData: [
        {
          icon: "icon-lianxi",
          title: "联系各方"
        },
        {
          icon: "icon-zhengju",
          title: "提交证据"
        },
        {
          icon: "icon-wenshu",
          title: "文书送达"
        },
        {
          icon: "icon-bilu",
          title: "制作笔录"
        },
        {
          icon: "icon-tiaojie",
          title: "案件调解"
        },
        {
          icon: "icon-manage",
          title: "人员管理"
        },
        {
          icon: "icon-join",
          title: "到庭情况"
        }
      ]
    };
  },
  methods: {
    selectTools(e) {
      this.$store.commit("CHANGE_TOOLTAG", e + 2);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;

  i {
    // font-size: 48px;
    font-size: 32px;
    color: #0052D9;
  }

  span {
    font-size: 16px;
    line-height: 2;
  }

  &:hover {
    color: #0052D9;
  }
}
</style>
