<template>
  <el-dialog
    v-if="innerVisible"
    :title="title"
    :visible.sync="innerVisible"
    v-bind="$attrs"
    v-on="$listeners"
    :close-on-click-modal="false"
  >
    <slot>
      <p>弹框自定义的内容</p>
    </slot>
    <span slot="footer" class="dialog-footer" v-if="hasFooter">
      <el-button @click="cancelBtn">{{ cancelBtnText }}</el-button>
      <slot name="footerBtn"></slot>
      <el-button type="primary" v-if="!oneBtn" @click="sureBtn">{{ sureBtnText }}</el-button>
    </span>
  </el-dialog>
</template>

<!-- 使用 -->
<!-- <ZDialog
  title="ZDialog"
  :visible.sync="visible1"
  :before-close="() => (visible1 = false)"
  @sureBtn="sureBtn1"
  @cancelBtn="cancelBtn1"
  >
  ZDialog 内容
  <el-button slot="footerBtn">底部自定义按钮</el-button>
</ZDialog>

visible1: false

sureBtn1() {
  this.$message.success('点击了确认按钮')
  this.visible1 = false
},
cancelBtn1() {
  this.$message('点击了取消按钮')
  this.visible1 = false
},

-->

<script>
export default {
  name: 'ZDialog',

  // 写法 111 ----------start
  // model: {
  //   prop: 'innerVisible', // 定义外层 v-model 传进来的 prop 接收字段
  //   event: 'self_event' // 定义外层 v-model 接收的事件名
  // },
  props: {
    // innerVisible: Boolean, // 需要在组件的 props 选项里声明 innerVisible 这个 prop

    visible: { type: Boolean, default: false },
    title: { type: String, default: 'title' },
    /** 是否需要底部按钮 */
    hasFooter: { type: Boolean, default: true },
    /** 是否只要一个确认按钮 */
    oneBtn: { type: Boolean, default: false },
    /** 确认按钮文字 */
    sureBtnText: { type: String, default: '确定' },
    /** 取消按钮文字 */
    cancelBtnText: { type: String, default: '取消' },
  },
  // 写法 111 ----------end

  // 写法 222 ----------start 使用 v-model 原生 默认 利用名为 value 的 prop 和名为 input 的事件
  // props: {
  //   value: Boolean, // 需要在组件的 props 选项里声明 value 这个 prop
  // },
  // computed: {    // 通过计算属性来 定义 v-model 传进来的字段名
  //   innerVisible: {
  //     get() {
  //       return this.value
  //     },
  //     set(value) {
  //       this.$emit('input', value)
  //     }
  //   }
  // },
  // 写法 222 ----------end

  mounted() {},
  computed: {
    innerVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },

  methods: {
    sureBtn() {
      this.$emit('sureBtn')
    },
    cancelBtn() {
      this.$emit('cancelBtn')
    },
    beforeClose() {
      // this.$emit('self_event', !this.innerVisible) /** 写法 111 */
      // this.innerVisible = !this.innerVisible;  /** 写法 222 */
    },
  },
}
</script>

<style lang="scss" scoped>
// 用于控制弹框的最小宽度
::v-deep .el-dialog {
  min-width: 800px;
}

::v-deep .el-dialog__header {
  padding: 10px 15px;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-dialog__body {
  padding: 10px;
}
::v-deep .el-dialog__footer {
  padding: 0 15px 15px;
  // text-align: center;
}
::v-deep .el-dialog__headerbtn {
  top: 13px;
}

// .dialog-fade-leave-active {
//   transition-duration: 0s !important; /*定义 退出时的 动画 过渡时间*/
//   animation: none !important;
// }
</style>
