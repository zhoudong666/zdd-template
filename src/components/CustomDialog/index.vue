<template>
  <!-- 封装弹框 -->
  <div class="custom-dialog">
    <el-dialog :visible.sync="mVisible" v-bind="$attrs" v-on="$listeners">
      <slot>
        <p>弹框自定义的内容</p>
      </slot>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureBtn">确 定</el-button>
        <el-button @click="cancelBtn">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mVisible: {
      get() {
        return this.visible
      },
      // 经测试, set 无用
      set(val) {
        // 当visible改变的时候，触发父组件的 updateVisible方法，
        // 在该方法中更改传入子组件的 centerDialogVisible的值
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    cancelBtn() {
      this.$emit('cancelBtn')
    },
    sureBtn() {
      this.$emit('sureBtn')
    },
    beforeClose() {
      this.$emit('beforeClose')
    }
  }
}
</script>

<style lang="scss">
.custom-dialog {
  .el-dialog {
    margin-top: 8vh !important;
  }
  .el-dialog__header {
    border-bottom: 1px solid #f6f7f9;
    padding: 0 20px;
  }
  .el-dialog__body {
    padding: 10px;
    box-sizing: border-box;
    max-height: 70vh;
    overflow: hidden;
    border-bottom: 1px solid #f6f7f9;
  }
  .el-dialog__headerbtn {
    top: 12px;
  }
  .el-dialog__title {
    line-height: 40px;
  }
  .el-dialog__footer {
    text-align: center;
    padding: 10px;
  }
}
</style>
