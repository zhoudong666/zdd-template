<template>
  <el-button class="send-letter" @click="send" :disabled="disabled">
    {{ text }} <span v-show="num">{{ num }}s</span>
  </el-button>
</template>

<script>
export default {
  name: 'ZSendBtn',
  props: {
    principal: String,
    isSend: { type: Boolean, default: true },
  },
  data() {
    return {
      text: '获取验证码',
      num: 0,
      disabled: false,
      timer: null,
    }
  },
  methods: {
    send() {
      if (!this.isSend) return this.$emit('isSendFn')
      const principal = this.principal
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
      if (!principal) {
        return this.$message.error('请填写手机号! ')
      } else if (!reg.test(principal)) {
        return this.$message.error('请填写正确的手机号码! ')
      } else if (principal.length !== 11) {
        return this.$message.error('请填写正确的手机号码! ')
      }
      this.disabled = true
      if (this.num > 0) return
      // this.$Q
      //   .get({
      //     url: this.$api.sendCode,
      //     data: { phone: principal, uuid: +new Date() }
      //   })
      // Promise.resolve({}).then((res) => {
      //   uni.showToast({ icon: 'none', title: '获取验证码成功~' })
      // })
      this.$emit('sendHandle')

      this.timer = null
      this.num = 60
      this.text = '重新获取'
      this.timer = setInterval(() => {
        this.num -= 1
        if (this.num === 0) {
          clearInterval(this.timer)
          this.disabled = false
        }
      }, 1000)
    },
    reset() {
      clearInterval(this.timer)
      this.text = '获取验证码'
      this.num = 0
      this.disabled = false
    },
  },
}
</script>

<style style="scss" scoped>
.send-letter {
  width: 100%;
}
</style>
