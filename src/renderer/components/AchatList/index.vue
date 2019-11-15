<!-- 聊天列表 -->
<template>
  <ul class="chat_list infinite-list" v-infinite-scroll="load">
    <li v-for="i in count" class="chat_list-item infinite-list-item" :key="i">
      <el-avatar>{{i}}</el-avatar>
      <div class="chat_list-content">
        <div>123</div>
        <div>456</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
    getList() {
      this.$http({
        url: "/chatlist/list",
        method: "get"
      }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {},
  created() {
    this.getList();
  }
};
</script>
<style scoped lang="scss">
.chat_list {
  height: calc(100vh - 55px);
  overflow: auto;
  padding: 0 20px;
  .chat_list-item {
    margin: 10px 0;
    display: flex;
    cursor: pointer;
    .chat_list-content {
      margin-left: 10px;
    }
  }
}
</style>