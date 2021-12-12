<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true"> ZDialog 自定义弹框 </el-button>

    <z-dialog
      title="ZDialog"
      v-model="dialogVisible"
      :before-close="beforeClose"
      :close-on-click-modal="false"
      @open="open"
      @close="close"
      @sureBtn="sureBtn"
      @cancelBtn="cancelBtn"
      v-dialogDrag
    >
    </z-dialog>
  </div>
</template>

<script>
import ZDialog from '@/components/ZDialog/index'
export default {
  components: { ZDialog },
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {},
  methods: {
    sureBtn() {
      console.log('sureBtn')
      this.dialogVisible = false
    },
    cancelBtn() {
      console.log('cancelBtn')
      this.dialogVisible = false
    },
    beforeClose() {
      this.dialogVisible = false
      console.log('beforeClose')
    },
    open() {
      console.log('open')
    },
    close() {
      console.log('close')
    }
  }
}
</script>

<style></style>
