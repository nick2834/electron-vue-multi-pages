<!-- 拖拽窗 -->
<template>
  <transition name="dialog">
    <div class="el-dialog__wrapper" v-show="showWin">
      <div role="dialog" class="el-dialog">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <div class="btn_group no__dragable">
            <span class="btn_icon el-icon-minus"></span>
            <span class="btn_icon btn-max el-icon-full-screen"></span>
            <span class="btn_icon el-icon-close" @click="closeModal"></span>
          </div>
        </div>
        <div class="el-dialog__body">
          <slot name="content" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    showWin: {
      type: Boolean
    },
    width: {
      type: [String, Number],
      default: 500
    },
    height: {
      type: [String, Number],
      default: 300
    }
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      Otop: 0,
      Oleft: 0,
      top: 0,
      left: 0,
      Owidth: this.width,
      Oheight: this.height,
      curWidth: this.width,
      curHeight: this.height,
      minWidth: 240,
      minHeight: 150,
      canMove: false,
      canResize: false,
      max: false
    };
  },
  methods: {
    maxWin() {
      this.max = !this.max;
      if (this.max) {
        var h = this.$refs.dialogArea.offsetHeight;
        var w = this.$refs.dialogArea.offsetWidth;
        this.curWidth = w;
        this.curHeight = h;
        this.top = 0;
        this.left = 0;
      } else {
        this.curWidth = this.Owidth;
        this.curHeight = this.Oheight;
        this.top = this.Otop;
        this.left = this.Oleft;
      }
    },
    closeModal() {
      this.$emit("update:showWin", false);
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.el-dialog__wrapper {
  z-index: 20001;
}
.el-dialog {
  top: 50%;
  transform: translateY(-50%);
  .el-dialog__header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 80px 0 15px;
    background: $defaultColor;
    color: #ffffff;
    box-sizing: border-box;
    display: flex;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.3);
    .title {
      width: calc(100% - 80px);
      height: 100%;
      cursor: move;
      user-select: none;
      position: absolute;
      top: 0;
      left: 0;
    }
    .btn_group {
      position: absolute;
      height: 40px;
      line-height: 40px;
      right: 0;
      display: flex;
      align-items: center;
      .btn_icon {
        width: 20px;
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        padding: 5px;
        cursor: pointer;
        &:hover {
          color: #909399;
        }
      }
    }
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s;
}
.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: all 0.2s;
}
.dialog-enter .dialog,
.dialog-leave-to .dialog {
  transform: scale3d(0.1, 0.1, 0.1);
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
</style>