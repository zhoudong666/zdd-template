import request from '@/utils/request'

export function login(data) {
  return request({ url: '/login', method: 'post', data })
}
// 获取个人资料信息
export function getInfo() {
  return request({ url: '/corp/user/info', method: 'get' })
}
// 用户登出
export function logout() {
  return request({ url: '/corp/user/logout', method: 'get' })
}
// 获取验证码图片
export function httpgetRegCaptcha(params) {
  return request({ url: '/anno/getRegCaptcha', method: 'get', params, responseType: 'blob' })
}
// 登录菜单导航
export function httpnavMenu() {
  return request({ url: '/corp/user/navMenu', method: 'get' })
}
// 发送手机验证码
export function httpgetRegPhoneVerify(data) {
  return request({ url: '/anno/getRegPhoneVerify', method: 'post', data })
}
// 回收单位注册
export function httpregister(data) {
  return request({ url: '/anno/register', method: 'post', data })
}
// 获取单位详细信息
export function httpcorpInfo() {
  return request({ url: '/corp/user/corpInfo', method: 'get' })
}
// 密码重置
export function httpchgPwd(data) {
  return request({ url: '/anno/chgPwd', method: 'post', data })
}
