<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true">
      添加v-dialogDrag指令实现弹框可拖拽
    </el-button>
    <el-dialog
      v-dialogDrag
      title="提示"
      :visible.sync="dialogVisible"
      :modal="false"
    >
      <span>这是一段信息123444</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <br />
    <br />
    <br />

    <!-- 自己简单封装的弹框 底部固定有 确定 和 取消 两个按钮 -->
    <el-button @click="cusDialogVisible = true"> custom-dialog </el-button>
    <custom-dialog
      v-dialogDrag
      :visible.sync="cusDialogVisible"
      title="自定义弹框"
      @cancelBtn="cancelBtn"
      @sureBtn="sureBtn"
      @close="close"
      :close-on-click-modal="false"
      width="600px"
      :modal="false"
    >
      自定义弹框内容部分
    </custom-dialog>
  </div>
</template>

<script>
// 在 main.js 文件里已经全部注册
// import CustomDialog from '@/components/CustomDialog/index'
export default {
  // components: { CustomDialog },
  data() {
    return {
      dialogVisible: false,
      cusDialogVisible: false
    }
  },
  created() {},
  methods: {
    handleClose() {},
    sureBtn() {
      console.log('sureBtn')
      this.cusDialogVisible = false
    },
    cancelBtn() {
      console.log('cancelBtn')
      this.cusDialogVisible = false
    },
    close() {
      console.log('close')
    }
  }
}
</script>

<style>
/*弹窗自定义 动画*/
.el-dialog__wrapper {
  transition-duration: 0.8s;
}
.dialog-fade-enter-active {
  animation: none !important;
}
.dialog-fade-leave-active {
  transition-duration: 0s !important;
  animation: none !important;
}

/*设置 填充模式   此处的值为 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）*/
.dialog-fade-enter-active .el-dialog,
.dialog-fade-leave-active .el-dialog {
  animation-fill-mode: forwards;
}

.dialog-fade-enter-active .el-dialog {
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
}

.dialog-fade-leave-active .el-dialog {
  animation-duration: 0.5s;
}
</style>
