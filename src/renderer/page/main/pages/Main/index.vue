<template>
  <el-container>
    <el-header style="height:55px" v-if="$route.path != '/modal'">
      <a-header v-if="!appLoading" :userInfo="userInfo"></a-header>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import AHeader from "@/components/Aheader";
export default {
  name: "App",
  data() {
    return {
      appLoading: true
    };
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      },
      set(val) {
        this.$store.commit("user/updateUsers", val);
      }
    }
  },
  components: { AHeader },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch("user/getUsers").then(({ user }) => {
        this.userInfo = user;
        this.appLoading = false;
        this.$store.dispatch("cases/getUnreadMessages");
        this.$store.dispatch("tencentIm/getIdentifierActions", user);
      });
    }
  }
};
</script>

<style>
</style>