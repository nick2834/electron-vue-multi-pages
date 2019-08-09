<template>
  <div
    class="el-tooltip__popper is-dark message__popper"
    x-placement="top"
    v-show="toolTipsIndex == item.id"
    @click="toolTipsIndex = ''"
  >
    <ul>
      <li v-for="(int,ind) in readPersonList" :key="ind">{{int.name}} {{int.readDate}}</li>
    </ul>
    <div class="popper__arrow"></div>
  </div>
</template>
<script>
export default {
    props:['readPersonList',"item","toolTipsIndex"]
};
</script>
<style lang="scss" scoped>
.el-tooltip__popper .popper__arrow, .el-tooltip__popper .popper__arrow::after {
  left: 50%;
  transform: translateX(-50%);
}

.el-tooltip__popper[x-placement^=top] .popper__arrow::after {
  margin: 0;
}
</style>
