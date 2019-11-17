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
    Authorization: {
      get() {
        return this.$store.state.Authorization;
      },
      set(val) {
        this.$store.commit("user/updateToken", val);
      }
    }
  },
  components: { AHeader },
  created() {
    var token = this.$electron.remote.getGlobal("appData").Authorization;
    sessionStorage.Authorization = token;
    this.Authorization = token
  },
};
</script>


