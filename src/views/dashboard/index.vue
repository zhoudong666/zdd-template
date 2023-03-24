<template>
  <div>
    <!-- <h2>欢迎登录本系统</h2> -->

    <!-- <img src="~@/assets/car-bg-welcome.png" alt="" style="width: 100%; height: calc(100vh - 134px)" /> -->
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: calc(100vh - 134px);
  background: #fff url(~@/assets/car-bg-welcome.png) no-repeat center;
  background-size: cover;
}
</style>
