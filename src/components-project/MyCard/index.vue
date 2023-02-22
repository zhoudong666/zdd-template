<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'MyCard',
}
</script>

<style lang="scss" scoped>
.el-card {
  border: none;
  box-shadow: none;
  ::v-deep .el-card__header {
    position: relative;
    // padding: 12px 14px;
    &::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 22px;
      background-color: red;
      left: 10px;
      top: 10px;
    }
  }
}
</style>
