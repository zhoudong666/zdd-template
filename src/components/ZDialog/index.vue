<template>
  <el-dialog :visible.sync="innerVisible" v-bind="$attrs" v-on="$listeners">
    <slot>
      <p>弹框自定义的内容</p>
    </slot>
    <span slot="footer" class="dialog-footer" v-if="hasBtns">
      <el-button type="primary" @click="sureBtn">确 定</el-button>
      <el-button @click="cancelBtn" v-if="!oneBtn">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ZDialog',

  // 写法 111 ----------start
  model: {
    prop: 'innerVisible', // 定义外层 v-model 传进来的 prop 接收字段
    event: 'self_event' // 定义外层 v-model 接收的事件名
  },
  props: {
    innerVisible: Boolean, // 需要在组件的 props 选项里声明 innerVisible 这个 prop
    hasBtns: {
      type: Boolean,
      default: true
    },
    oneBtn: {
      type: Boolean,
      default: false
    }
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

  mounted() {
    // console.log(this.$listeners)
  },
  computed: {},

  methods: {
    sureBtn() {
      this.$emit('sureBtn')
    },
    cancelBtn() {
      this.$emit('cancelBtn')
    },
    beforeClose() {
      this.$emit('self_event', !this.innerVisible) /** 写法 111 */
      // this.innerVisible = !this.innerVisible;  /** 写法 222 */
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  padding: 10px 15px;
  border-bottom: 1px solid #ccc;
}
::v-deep .el-dialog__body {
  padding: 10px;
}
::v-deep .el-dialog__footer {
  padding: 10px 15px;
}
::v-deep .el-dialog__headerbtn {
  top: 13px;
}
</style>
