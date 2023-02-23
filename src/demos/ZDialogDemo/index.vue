<template>
  <MyCard>
    <!-- 基本用法 -->
    <el-button @click="visible1 = true" class="mr-10"> ZDialog 基本用法 </el-button>
    <ZDialog
      title="ZDialog"
      :visible.sync="visible1"
      :before-close="() => (visible1 = false)"
      @sureBtn="sureBtn1"
      @cancelBtn="cancelBtn1"
    >
      ZDialog 内容
      <el-button slot="footerBtn">底部自定义按钮</el-button>
    </ZDialog>

    <!-- 可拖拽 -->
    <el-button @click="visible3 = true" class="mr-10"> ZDialog 可拖拽 </el-button>
    <ZDialog
      title="ZDialog"
      :visible.sync="visible3"
      :before-close="beforeClose"
      @open="open"
      @close="close"
      @sureBtn="sureBtn"
      @cancelBtn="cancelBtn"
      v-dialogDrag
    >
      这是可拓转的弹框 添加 v-dialogDrag 属性即可
    </ZDialog>

    <pre>
props 包含的属性有:
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

    </pre>
  </MyCard>
</template>

<script>
import ZDialog from '@/components/ZDialog/index'
export default {
  name: 'ZDialogDemo',
  components: { ZDialog },
  data() {
    return {
      visible1: false,
      visible3: false,
    }
  },
  created() {},
  methods: {
    sureBtn1() {
      this.$message.success('点击了确认按钮')
      this.visible1 = false
    },
    cancelBtn1() {
      this.$message('点击了取消按钮')
      this.visible1 = false
    },
    sureBtn() {
      this.visible3 = false
    },
    cancelBtn() {
      this.visible3 = false
    },
    beforeClose() {
      this.visible3 = false
    },
    open() {
      console.log('open')
    },
    close() {
      console.log('close')
    },
  },
}
</script>

<style></style>
