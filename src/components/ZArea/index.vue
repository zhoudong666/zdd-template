<template>
  <div>
    <el-cascader
      ref="cascaderAddr"
      :props="cascaderProps"
      v-model="showPcaCode"
      @change="cascaderChange"
      v-bind="$attrs"
    ></el-cascader>
  </div>
</template>

<!-- 使用懒加载方式选择省市区联动 -->
<!-- 使用方法 -->
<!--
  <ZArea :areaObj="areaObj" @change="areaChange" :disabled="true" v-if="isArea"></ZArea>

  areaObj: {
    province: '', // 所在省
    city: '', // 所在市
    area: '', // 所在区县
    pcaCode: '', //  '130000000000/130300000000/130303000000', // 省市区代码
  },
  isArea: false, // 用于控制不回显  在为areaObj赋值时候, 设为 true

  areaChange(obj) {
    for (const k in obj) this.$refs.addFormRef.form[k] = obj[k]
  },

 -->

<script>
import { httpAreaListByPid } from '@/api/register'
export default {
  name: 'ZArea',
  props: {
    areaObj: {
      type: Object,
      default: () => ({
        province: '',
        city: '',
        area: '',
        pcaCode: '',
      }),
    },
  },
  watch: {
    areaObj: {
      immediate: true,
      deep: true,
      handler(newVal) {
        const { pcaCode } = newVal
        if (pcaCode) {
          this.showPcaCode = pcaCode.split('/').map((i) => Number(i))
          for (const k in this.addShopForm) this.addShopForm[k] = newVal[k]
        }
      },
    },
  },
  data() {
    return {
      showPcaCode: [],
      addShopForm: {
        province: '',
        city: '',
        area: '',
        pcaCode: '',
      },
      cascaderProps: {
        lazy: true,
        label: 'areaName',
        value: 'areaId',
        async lazyLoad(node, resolve) {
          let levelId
          if (node.level === 0) {
            levelId = 0
          } else if (node.level === 1) {
            levelId = node.data.areaId
          } else if (node.level === 2) {
            levelId = node.data.areaId
          } else {
            return resolve([])
          }
          const res = await httpAreaListByPid({ pid: levelId })
          res.map((item) => (item.leaf = node.level >= 2))
          resolve(res)
        },
      },
    }
  },
  methods: {
    cascaderChange(code) {
      const labels = this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels
      this.addShopForm.province = labels[0].substr(0, 2)
      this.addShopForm.city = labels[1]
      this.addShopForm.area = labels[2]
      this.addShopForm.pcaCode = code.join('/')
      // .reduce((arr, curr, i) => {
      //   return arr.push(curr.toString().substr(0, (i + 1) * 2)) && arr
      // }, [])
      // .join('/')
      this.$emit('change', this.addShopForm)
      this.$emit('update:areaObj', this.addShopForm)
    },
  },
}
</script>

<style lang="scss" scoped></style>
