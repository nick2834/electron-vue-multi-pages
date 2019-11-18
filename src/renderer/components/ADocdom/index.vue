<template>
  <!-- 帮助文档组件  可根据不同的路由设置不同的帮助文档-->
  <div class="doc_box dragable">
    <!-- <i class="iconfont icon-wechat"></i> -->
    <!-- <i class="iconfont icon-court"></i> -->
    <img src="~@/assets/images/chat_placeholder.png" alt />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.doc_box {
  line-height: calc(100vh - 55px);
  text-align: center;
  position: relative;
  img{
    width: 248px;
    height: 248px;
    vertical-align: middle
  }
  .iconfont {
    font-size: 100px;
    color: #eaeaea;
  }
}
</style>
