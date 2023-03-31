<template>
  <div>
    <div class="logo-box">
      <img src="~@/assets/logo.png" alt="" />
      {{ project_title }}
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
            :isSend="!!captchaCode"
            @sendHandle="sendHandle"
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
        <el-button type="primary" style="width: 100%" @click="changeNow">立即更改</el-button>
        <el-button class="fr mt-20 fs-14" type="text" @click="toLogin">前去登录</el-button>
        <!-- <el-button class="fr mt-20" type="text" @click="toAuth">去认证</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import ZSendBtn from '@/components/ZSendBtn'
import { guid, blobToBase64 } from '@/utils/tools'
import { title as project_title } from '@/settings'
import { httpgetRegCaptcha, httpgetRegPhoneVerify, httpchgPwd } from '@/api/user'

export default {
  name: 'regist',
  components: { ZSendBtn },
  created() {
    this.getUuid()
  },
  data() {
    return {
      project_title,
      fields: {
        // loginUser: { span: 24, type: 'input', label: '登录账号', isRequired: true },
        password: { span: 24, type: 'input', label: '账号新密码', isRequired: true, props: { type: 'password' } },

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
    changeNow() {
      this.$refs.formRef.submit().then((valid) => {
        if (!valid) return
        httpchgPwd({ ...this.$refs.formRef.form, sessionUUID: this.sessionUUID }).then((res) => {
          this.$message.success('修改成功! ')
          window.localStorage.removeItem(project_title)
          this.$router.push('/login')
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
