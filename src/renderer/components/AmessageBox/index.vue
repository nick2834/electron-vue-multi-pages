<template>
  <el-container class="message_container">
    <el-main class="message_content">
      <a-message-content></a-message-content>
      <a-message-input></a-message-input>
    </el-main>
    <el-aside :width="isOpen ? '240px':'0'" class="online_container">
      <span class="toggle_span" :style="{left:isOpen?'0':'-10px'}" @click="handleOpenClose">
        <i :class="isOpen ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      </span>
    </el-aside>
  </el-container>
</template>

<script>
import AMessageContent from "./messageContent";
import AMessageInput from "./messageInput";
export default {
  data() {
    return {
      isOpen: true
    };
  },
  components: {
    AMessageContent,
    AMessageInput
  },
  methods: {
    handleOpenClose() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.message_content {
  padding: 0;
  
}
.online_container {
  height: calc(100vh - 55px);
  background: #f6f7f9;
  position: relative;
  overflow: unset;
  transition: 300ms;

  .toggle_span {
    position: absolute;
    background: #dadada;
    width: 10px;
    height: 20px;
    color: #ffffff;
    left: 0;
    top: 10px;
    cursor: pointer;
    &:hover {
      background: #12b7f5;
    }
  }
}
</style>