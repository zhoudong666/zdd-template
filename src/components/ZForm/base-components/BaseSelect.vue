<template>
  <el-select v-model="currValue" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="opt in options" :key="opt.value" :value="opt.value" :label="opt.label"> </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'BaseSelect',
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
