<template>
  <div class="padding-20">
    <h5>vue-qr 二维码生成组件</h5>
    <el-button @click="visible = true">显示二维码</el-button>
    <el-dialog :visible.sync="visible" width="240px">
      <vue-qr :text="downloadData.url" :margin="0" colorDark="#f67b29" colorLight="#fff" :size="200"></vue-qr>
    </el-dialog>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
  components: {
    vueQr
  },
  data() {
    return {
      visible: false,
      downloadData: {
        url: '扫码访问的链接地址111111'
      }
    }
  }
}
</script>
