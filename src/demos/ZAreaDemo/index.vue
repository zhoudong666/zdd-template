<template>
  <MyCard>
    <div slot="header">省市区选择 懒加载模式</div>
    <ZArea :areaObj="areaObj" @change="areaChange" :disabled="isCheck" v-if="isShow"></ZArea>
  </MyCard>
</template>

<script>
export default {
  name: 'ZAreaDemo',
  created() {
    setTimeout(() => {
      this.isShow = true
    }, 1000)
  },
  data() {
    return {
      areaObj: {
        province: '', // 所在省
        city: '', // 所在市
        area: '', // 所在区县
        pcaCode: '', //  '130000000000/130300000000/130303000000', // 省市区代码
      },
      isCheck: false,
      isShow: false,
    }
  },
  methods: {
    areaChange(obj) {
      console.log({ ...obj })
    },
  },
}
</script>

<style lang="scss" scoped></style>
