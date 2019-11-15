<template>
  <el-container>
    <el-header style="height:55px">
      <a-header></a-header>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import AHeader from "@/components/Aheader";
export default {
  data() {
    return {
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      }
    }
  },
  components: { AHeader },
  created() {
    this.userInfo = this.$electron.remote.getGlobal("appData");
  },
};
</script>


