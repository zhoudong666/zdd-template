import request from '@/utils/request'

// 物流人员列表，分页查询复制文档
export function httpcircuList() {
  return { url: '/corp/circu/circuList', method: 'get', queryParam: {} }
}
// 删除物流人员复制文档
export function httpdeleteCircu(circuNo) {
  return request({ url: `/corp/circu/deleteCircu/${circuNo}`, method: 'get' })
}
// 新增物流人员复制文档
export function httpaddCircu(data) {
  return request({ url: '/corp/circu/addCircu', method: 'put', data })
}
// 物流人员详情复制文档
export function httpcircuDetail(circuNo) {
  return request({ url: `/corp/circu/circuDetail/${circuNo}`, method: 'get' })
}
// 编辑物流人员复制文档
export function httpeditCircu(data) {
  return request({ url: '/corp/circu/editCircu', method: 'put', data })
}
// 车辆类别列表复制文档
export function httpchooseVehs() {
  return request({ url: '/corp/circu/chooseVehs', method: 'get' })
}
// 新增物流人员 - 根据身份证检查物流人员是否存在复制文档
export function httpcheckCircu(circuCard) {
  return request({ url: `/corp/circu/checkCircu/${circuCard}`, method: 'get' })
}
