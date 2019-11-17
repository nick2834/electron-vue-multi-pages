<template>
  <div class="placeholder dragable">
    <img src="@/assets/images/placeholder.png" alt />
    <span>{{title}}</span>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
<style lang="scss" scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  img {
    width: 100px;
  }
  span {
    line-height: 2;
    font-size: 14px;
    color: #e5e3e2;
  }
}
</style>
