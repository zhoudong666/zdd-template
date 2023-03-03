import request from '@/utils/request'

// 用户列表，分页查询复制文档
export function httpuserList(params) {
  return { url: '/corp/account/userList', method: 'get', queryParam: {} }
}
// 删除用户复制文档
export function httpdeleteUser(userCode) {
  return request({ url: `/corp/account/deleteUser/${userCode}`, method: 'get' })
}
// 新增用户复制文档
export function httpaddUser(data) {
  return request({ url: '/corp/account/addUser', method: 'put', data })
}
// 获取个人资料信息复制文档
export function httpinfo(userCode) {
  return request({ url: `/corp/account/info/${userCode}`, method: 'get' })
}
// 编辑用户复制文档
export function httpeditUser(data) {
  return request({ url: '/corp/account/editUser', method: 'put', data })
}
// 新建用户 -- 全部仓库列表复制文档
export function httpchooseWhs() {
  return request({ url: '/corp/account/chooseWhs', method: 'get' })
}
// // 新建用户 -- 全部菜单列表复制文档
// export function httpchooseMenu() {
//   return request({ url: '/corp/account/chooseMenu', method: 'get' })
// }
// 新建用户 -- 全部菜单树复制文档
export function httpchooseMenuTree() {
  return request({ url: '/corp/account/chooseMenuTree', method: 'get' })
}
