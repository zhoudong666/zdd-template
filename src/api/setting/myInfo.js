import request from '@/utils/request'

// // 物流人员列表，分页查询复制文档
// export function httpcircuList() {
//   return { url: '/corp/circu/circuList', method: 'get', queryParam: {} }
// }
// 获取个人资料信息复制文档
export function httpuserInfo() {
  return request({ url: '/corp/user/info', method: 'get' })
}
// 修改个人资料复制文档
export function httpmodSelfUser(data) {
  return request({ url: '/corp/user/modSelfUser', method: 'put', data })
}
// 修改单位资料复制文档
export function httpmodCorpInfo(data) {
  return request({ url: '/corp/user/modCorpInfo', method: 'put', data })
}
