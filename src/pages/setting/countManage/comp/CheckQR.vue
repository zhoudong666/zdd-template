<template>
  <ZDialog
    title="二维码预览"
    cancelBtnText="关闭"
    width="500px"
    :visible.sync="visible"
    :before-close="() => $emit('update:visible', false)"
    sureBtnText="下载二维码"
    @cancelBtn="cancelBtn"
    @sureBtn="sureBtn"
  >
    <div class="text-center">
      <ZQrCode :text="qrText" :callback="getQrData"></ZQrCode>
    </div>
  </ZDialog>
</template>

<script>
// import ZQrCode from '@/components/ZQrCode' // 二维码组件

export default {
  name: 'CheckQR',
  // components: { ZQrCode },
  props: {
    visible: { type: Boolean, default: false },
    qrText: { type: [String, Number] },
  },
  data() {
    return {
      qrData: '',
    }
  },
  methods: {
    cancelBtn() {
      this.$emit('update:visible', false)
    },
    getQrData(qrData) {
      this.qrData = qrData
    },
    sureBtn() {
      function download(link, filename) {
        const a = document.createElement('a')
        a.href = link
        a.download = filename || 'default.png'
        a.dispatchEvent(new MouseEvent('click'))
      }
      download(this.qrData)
    },
  },
}
</script>

<style lang="scss" scoped></style>
