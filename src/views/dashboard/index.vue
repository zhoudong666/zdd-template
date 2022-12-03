<template>
  <div>
    <h2>Dashboard</h2>

    <div v-for="i in 100" :key="i">{{ i }}</div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
