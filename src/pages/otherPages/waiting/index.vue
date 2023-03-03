<template>
  <div>
    <div class="logo-box">
      <img src="~@/assets/logo.png" alt="" />
      电池回收平台
    </div>

    <div class="form-box text-center">
      <img src="~@/assets/waiting.png" alt="" />
      <div class="m-20">您的注册信息还在审核中...</div>

      <el-button type="primary" style="width: 160px" @click="goBack"> 返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'waiting',
  created() {
    const temp_token = window.sessionStorage.getItem('temp_token')
    if (temp_token) window.sessionStorage.removeItem('temp_token')
  },
  methods: {
    goBack() {
      this.$store.dispatch('user/resetToken')
      this.$router.replace('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.logo-box {
  font-size: 18px;
  padding: 0 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  img {
    vertical-align: middle;
    width: 60px;
  }
}
.form-box {
  width: 500px;
  height: 500px;
  margin: 60px auto;
}
</style>
