<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div class="page-container">
        <el-scrollbar>
          <router-view :key="key" />
        </el-scrollbar>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.app-main {
  /*50 = navbar  */
  height: calc(100vh - #{$footerHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #eee;
  .page-container {
    height: 100%;
    padding: 20px;
    & > .el-scrollbar {
      background-color: #fff;
    }
  }
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
