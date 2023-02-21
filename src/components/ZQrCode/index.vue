<template>
  <vueQr :text="text" :size="size" :margin="margin" v-bind="$attrs" qid="testid"></vueQr>
</template>
<!--
vue-qr参数

text 二维码，即扫描二维码后跳转的页面
size 二维码大小
margin 二维码图像的外边距, 默认 20px
bgSrc 嵌入的背景图地址
logoSrc 嵌入至二维码中心的 LOGO 地址
logoScale 中间图的尺寸
dotScale 二维码的点的大小
colorDark 实点的颜色（注意：和colorLight一起设置才有效）
colorLight 空白的颜色（注意：和colorDark一起设置才有效）
autoColor 若为 true, 背景图的主要颜色将作为实点的颜色, 即 colorDark,默认 true

-->
<script>
import vueQr from 'vue-qr' // 二维码生成插件
export default {
  name: 'ZQrCode',
  components: { vueQr },
  props: {
    text: { default: '请传入text', required: true },
    size: { type: Number, default: 200 },
    margin: { type: Number, default: 10 },
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
