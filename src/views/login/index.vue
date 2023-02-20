<template>
  <div class="login-container">
    <div class="img-box">
      <div class="left-img"></div>
      <div class="right-form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="off"
          label-position="left"
        >
          <div class="logo-box">
            <img src="~@/assets/logo.png" alt="" />
            电池回收平台
          </div>
          <div class="title-container">
            <h3 class="title">系 统 登 录</h3>
          </div>

          <el-form-item prop="principal">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="loginForm.principal" placeholder="请输入用户名" type="text" auto-complete="off" />
          </el-form-item>

          <el-form-item prop="credentials">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              v-model="loginForm.credentials"
              :type="passwordType"
              placeholder="请输入密码"
              auto-complete="off"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-form-item prop="validCode">
            <span class="svg-container">
              <!-- <svg-icon icon-class="password" /> -->
              <i class="el-icon-key"></i>
            </span>
            <el-input
              v-model="loginForm.validCode"
              placeholder="请输入验证码"
              auto-complete="off"
              @keyup.enter.native="handleLogin"
              maxLength="4"
            />
            <span class="show-pwd" style="top: 0; right: 0; height: 40px">
              <img class="security-img" style="height: 40px; width: 100px" @click="reloadSecu" :src="securitySrc" />
            </span>
          </el-form-item>

          <div class="mb-15 fs-14 flex justify-between">
            <el-checkbox v-model="isRemember">记住密码</el-checkbox>
            <el-button type="text" @click="toForget" class="fs-14 pt-1">忘记密码</el-button>
          </div>

          <el-button
            type="primary"
            size="default"
            style="width: 100%; margin-bottom: 16px"
            :loading="loading"
            @click.native.prevent="handleLogin"
            >登录</el-button
          >
          <div class="text-right">
            <el-button type="text" @click="toRegist" class="fs-14">公司注册</el-button>
          </div>
          <!-- <div class="tips">
            <span style="margin-right: 20px">principal: admin</span>
            <span> credentials: any</span>
          </div> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { httpgetRegCaptcha } from '@/api/user'

// import { validUsername } from '@/utils/validate'

import { guid, blobToBase64 } from '@/utils/tools'
import { title as project_title } from '@/settings'

export default {
  name: 'Login',
  data() {
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        // principal: 'hzy',
        // credentials: '123456',
        principal: 'admin',
        credentials: 'admin',
        grantType: '0', // 密码登录
        sessionUUID: '',
        validCode: '1111', // 验证码
      },
      loginRules: {
        principal: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        credentials: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        validCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,

      securitySrc: '',
      isRemember: false, // 是否记住密码
    }
  },
  created() {
    this.getUuid()

    const objStr = window.localStorage.getItem(project_title)
    if (!objStr) return
    this.isRemember = true
    const pwdObj = JSON.parse(window.atob(objStr))
    this.loginForm.principal = pwdObj.principal
    this.loginForm.credentials = pwdObj.credentials
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
    isRemember(newV) {
      if (!newV) window.localStorage.removeItem(project_title)
    },
  },
  methods: {
    // principal, credentials
    showPwd() {
      this.passwordType = this.passwordType ? '' : 'password'
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return
        this.loading = true
        this.$store
          .dispatch('user/login', this.loginForm)
          .then(() => {
            // this.$router.push({ path: this.redirect || '/' })
            this.reloadSecu()
            const userStatus = this.$store.state.user.userStatus
            this.loading = false
            // 根据登录接口的返回 userStatus 判断
            // 0:正常 1 未提交认证 2 未认证
            // 0：正常进系统
            // 1：跳转到认证页面
            // 2：跳转到未认证的插图页面
            if (userStatus === '0') {
              this.isRemember && localStorage.setItem(project_title, window.btoa(JSON.stringify(this.loginForm)))
              this.$router.push({ path: this.redirect || '/' })
            } else if (userStatus === '1') {
              this.$router.push('/authority')
            } else if (userStatus === '2') {
              this.$router.push('/waiting')
            }
          })
          .catch(() => {
            this.reloadSecu()
            this.loginForm.validCode = ''
            this.loading = false
          })
      })
    },
    getUuid() {
      this.loginForm.sessionUUID = guid()
      // 获取二维码
      httpgetRegCaptcha({ uuid: this.loginForm.sessionUUID }).then((res) => {
        blobToBase64(res).then((msg) => {
          // this.securitySrc = msg
          this.securitySrc =
            'data:text/xml;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAIAAACWMwO2AAACnUlEQVR42u3cu0oDQRQG4PUBLCwtBLGxES0ECQRsFGzEQkFS2lpYChYWNkpeQSsbEUQDIjaW1nYi2qWwtxdBXBkZJpmLu7NzOTP5f06TLBuSzceZMwtJ8YkgHlLgEiCAhQAWAlgIAlgIYCHecnm9wkp5tDX/V4AVJwv9Vll5CFM648LCO0PHyoFX3U4WgBpgZcirevw5Ayzw8jKcFafbG7yqn2ZxivPsLq/xAi9yu0LAcs6rPdbjBVjDSsTnDUczhmUXURVgJQ/rovfMi44qwEoSli4issDaAGtgVyjrER+aj6aSAMhkVYDlHtb69MdIXUdREmD9wup29gGLIKzbyXFWFD7d0sG9XLU7lvlheFjikK4rOqqcdywujAgyszYOzgRLOcg3h3V4884qD1iyISyFcWBl1rEIwjp+2eSle14+6h6WaEUcucywzK8bYMaiAEsJyCGsq5OjsprDkklVh/XdOiurKSy721pREh2WTo/zjsV4VUc2REenqlbHYryqIysqugGsiLDqIjMbar4UVhEGWI5VzXUmgs1YOmHmzuRwxjIIAyyXquSOVTorK+LwLuvxMbzLC6UalvJkwLKAxdsYr4i7wjBhvArd1s8Mi8Kdkliw/l3mzEuhiMyTs7iwBjoWYFnAqlvKV/OBDLAAS40sK1jJJT9YLKt3W4A10vex7GasALYAC7C82AIswPJiC7AAy4stwAIsLwEswAIs5RWceS0LsJzD2uvOWlRuHYvxCi+MLKzoyW0pDCwMsBzC6j7usCI9YwUQRlbVeXsqaZRcWENnfof35ryUdEj99is/W06cUd8V0v9RYfa27FbM5GGRfeelrVx55dCxDLySeOcjawv/QQpb7vP0tghYCDqWizx89VnhuwcsJL38AJDT0UuCRPOaAAAAAElFTkSuQmCC'
        })
      })
    },
    reloadSecu() {
      this.getUuid()
    },
    toRegist() {
      this.$router.push('/regist')
    },
    toForget() {
      this.$router.push('/forget')
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #283443;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 35px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 6px 5px 6px 15px;
      // color: $light_gray;
      // height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: relative;
  height: 100vh;
  min-width: 800px;
  min-height: 600px;
  width: 100%;
  background: $bg url(~@/assets/login-bg1.png) no-repeat;
  background-size: 100% 100%;
  // overflow: hidden;
  .logo-box {
    font-size: 18px;
    padding-bottom: 5vh;
    img {
      vertical-align: middle;
      width: 60px;
    }
  }
  .img-box {
    position: absolute;
    display: flex;
    width: 80%;
    height: 80%;
    min-width: 700px;
    min-height: 500px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    .left-img {
      flex: 4;
      background: $bg url(~@/assets/car-bg.png) no-repeat;
      background-size: 100% 100%;
    }
    .right-form {
      flex: 3;
    }
  }

  .login-form {
    position: relative;
    // width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 24px;
      color: #092b43;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
