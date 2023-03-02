import request from '@/utils/request'

// 获取省市区信息复制文档
export function httpAreaListByPid(params) {
  return request({ url: '/admin/area/listByPid', method: 'get', params })
}
// 认证回收单位复制文档
export function httptoAuthCorp(data) {
  return request({ url: '/corp/user/toAuthCorp', method: 'put', data })
}
