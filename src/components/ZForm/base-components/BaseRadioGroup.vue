<template>
  <el-radio-group v-model="currValue" v-bind="$attrs" v-on="$listeners">
    <el-radio v-for="opt in options" :key="opt.value" :label="opt.value"> {{ opt.label }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'BaseRadioGroup',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    }
  },
  computed: {
    currValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped></style>
