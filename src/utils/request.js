import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    const whiteURL = ['/corp/user/corpInfo', '/corp/user/toAuthCorp']
    if (whiteURL.includes(config.url)) {
      const temp_token = window.sessionStorage.getItem('temp_token')
      config.headers.Authorization = getToken() || temp_token
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data

    // 排除没有code的接口
    const noCodeUrls = [
      '/anno/getRegCaptcha',
      '/login',
      '/corp/user/logout',
      // '/anno/getRegPhoneVerify',
      '/corp/user/upload/element',
      '/admin/area/listByPid',
    ]
    const url = response.config.url
    if (noCodeUrls.includes(url)) return res

    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0) {
      Message({ message: res.message || 'Error', type: 'error', duration: 5 * 1000 })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 || res.code === 500 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          { confirmButtonText: 'Re-Login', cancelButtonText: 'Cancel', type: 'warning' },
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      Message({ message: '登录信息已过期, 请重新登录', type: 'error', duration: 5 * 1000 })
      setTimeout(() => location.reload(), 1500)
      return
    }
    Message({ message: error.response.data, type: 'error', duration: 2 * 1000 })
    return Promise.reject(error)
  },
)

export default service
