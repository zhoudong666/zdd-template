<template>
  <div class="icon-container">
    <div>使用方法</div>
    &lt;svg-icon icon-class="table">&lt;/svg-icon>
    <hr />
    <template v-for="(item, index) in iconList">
      <div class="icon-item" :key="item">
        <svg-icon :icon-class="item" :key="index"></svg-icon>
        <span> {{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import fileNames from '@/icons/index.js'

export default {
  name: 'IconDemo',

  data() {
    return {
      iconList: []
    }
  },

  mounted() {
    this.$nextTick(() => {
      var list = fileNames.reduce((arr, curr) => {
        if (!curr) return arr
        arr.push(curr.split('.')[1].slice(1))
        return arr
      }, [])
      console.log(list)
      this.iconList = list
    })
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.icon-container {
  padding: 10px;
}
.icon-item {
  float: left;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin-bottom: 10px;
}
</style>
