<template>
  <el-checkbox-group v-model="currValue" v-bind="$attrs" v-on="$listeners">
    <el-checkbox v-for="opt in options" :key="opt.value" :label="opt.value"> {{ opt.label }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'BaseCheckboxGroup',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
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
  },
  methods: {
    // change(event) {
    //   this.$emit('change', event)
    // }
  }
}
</script>

<style scoped></style>
