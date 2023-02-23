<template>
  <MyCard>
    <div slot="header">vue-qr 二维码生成组件</div>

    <!-- 基本二维码显示 -->
    <el-button @click="visible = true">基本二维码显示</el-button>
    <el-dialog :visible.sync="visible" width="240px" title="二维码">
      <vue-qr :text="downloadData.url" :margin="0" colorDark="#f67b29" colorLight="#fff" :size="200"></vue-qr>
    </el-dialog>

    <hr />
    <!-- 自定义弹框 包含二维码并下载 -->

    <el-button @click="visible2 = true">自定义弹框 包含二维码并下载pdf</el-button>
    <MyQrDialog :qrObj="qrObj" :visible.sync="visible2"></MyQrDialog>
  </MyCard>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  name: 'VueQrDemo',
  components: { VueQr },
  data() {
    return {
      visible: false,
      downloadData: {
        url: '扫码访问的链接地址111111',
      },

      visible2: false,
      qrObj: {
        title: '示例demo',
        qr: '二维码展示的内容',
        infoArr: [
          { field: '', label: 'label1', value: 'value 值1' },
          { field: '', label: 'label2', value: 'value 值2' },
          { field: '', label: 'label3', value: 'value 值3' },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #eee;
}
</style>
