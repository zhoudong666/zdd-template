<template>
  <div>
    <div class="logo-box">
      <img src="~@/assets/logo.png" alt="" />
      {{ title }}
    </div>

    <div class="form-box">
      <ZForm
        class="mb-10"
        ref="formRef"
        :fields="fields"
        submitText="查询"
        :controlSpan="24"
        :hasControl="false"
        labelWidth="130px"
      >
        <template slot="aaaa" slot-scope="{ data: { mobile, captchaCode } }">
          <ZSendBtn
            ref="ZSendBtnRef"
            :principal="mobile"
            @sendHandle="sendHandle"
            :isSend="!!captchaCode"
            @isSendFn="isSendFn"
          />
        </template>
        <template slot="bbb">
          <div class="text-right" style="width: 100%">
            <img class="security-img pointer" style="height: 32px; width: 100px" @click="getUuid" :src="securitySrc" />
          </div>
        </template>
      </ZForm>

      <div style="padding-left: 130px">
        <el-button type="primary" style="width: 100%" @click="registNow">立即注册</el-button>
        <el-button class="fr mt-20" type="text" @click="toLogin">已有账号,去登录</el-button>
        <!-- <el-button class="fr mt-20" type="text" @click="toAuth">去认证</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { title } from '@/settings'
import ZSendBtn from '@/components/ZSendBtn'
import { guid, blobToBase64 } from '@/utils/tools'
import { login, httpgetRegCaptcha, httpgetRegPhoneVerify, httpregister } from '@/api/user'

export default {
  name: 'regist',
  components: { ZSendBtn },
  created() {
    this.getUuid()
  },
  data() {
    return {
      title,
      fields: {
        corpName: { span: 24, type: 'input', label: '公司名称', isRequired: true },
        uscc: { span: 24, type: 'input', label: '公司统一代码', isRequired: true },
        loginUser: { span: 24, type: 'input', label: '登录账号', isRequired: true },
        password: { span: 24, type: 'input', label: '账号密码', isRequired: true, props: { type: 'password' } },

        captchaCode: { span: 18, type: 'input', label: '图形校验码', isRequired: true },
        bbb: { span: 6, type: 'slot' },
        mobile: { span: 18, defaultValue: '', type: 'input', label: '手机号码', isRequired: true },
        aaaa: { span: 6, type: 'slot' },
        validCode: { span: 24, type: 'input', label: '验证码', isRequired: true },
      },
      sessionUUID: '',
      securitySrc: '',
    }
  },
  methods: {
    getUuid() {
      this.sessionUUID = guid()
      httpgetRegCaptcha({ uuid: this.sessionUUID }).then((res) => {
        blobToBase64(res).then((msg) => {
          this.securitySrc = msg
        })
      })
    },
    isSendFn() {
      this.$message.error('请输入图形校验码! ')
    },
    sendHandle() {
      const { mobile, captchaCode } = this.$refs.formRef.form
      if (!mobile) return this.$message.error('请输入正确的手机号! ')
      const phoneVarifyObj = { uuid: this.sessionUUID, phone: mobile, captchaCode }
      httpgetRegPhoneVerify(phoneVarifyObj)
        .then((res) => {
          this.$message.success('短信发送成功! ')
          this.getUuid()
        })
        .catch((e) => {
          // this.$message.error('获取验证码失败,请重试! ')
          this.$refs.ZSendBtnRef.reset() // 重置发送按钮状态
          this.getUuid()
        })
    },
    registNow() {
      this.$refs.formRef.submit().then((valid) => {
        if (!valid) return
        httpregister({ ...this.$refs.formRef.form, sessionUUID: this.sessionUUID }).then((res) => {
          this.$message.success('注册成功! ')

          const { loginUser, password } = this.$refs.formRef.form
          const loginForm = {
            principal: loginUser,
            credentials: password,
            grantType: '0', // 密码登录
          }
          login(loginForm).then((response) => {
            const { token_type, access_token } = response
            window.sessionStorage.setItem('temp_token', token_type + access_token)
            this.toAuth()
          })
        })
      })
    },
    toLogin() {
      this.$router.push('/login')
    },
    toAuth() {
      this.$router.push('/authority')
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
  // background: red;
  // border: 1px solid red;
  margin: 60px auto;
}
</style>
