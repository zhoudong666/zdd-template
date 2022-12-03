<template>
  <div class="footer-box text">{{ footerText }}</div>
</template>

<script>
import defaultSettings from '@/settings'
export default {
  name: 'LayoutFooter',
  data() {
    return {
      footerText: defaultSettings.footer
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.footer-box {
  position: absolute;
  right: 0;
  height: $footerHeight;
  line-height: $footerHeight;
  width: 100%;
}
.text {
  color: #999;
  font-size: 12px;
}
</style>
