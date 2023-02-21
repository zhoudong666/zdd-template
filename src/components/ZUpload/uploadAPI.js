import request from '@/utils/request'

// 获取省市区信息
export function httpAreaListByPid(params) {
  return request({ url: '/plat/area/listByPid', method: 'get', params })
}

// // 文件上传到oss
// export function httpupload(data) {
//   return request({ url: '/plat/user/upload/element', method: 'post', data })
// }

//  指向的文件服务器 的 域名
export const fileServer = 'https://weboss.qmprint.cn/'

export const fileUploadUrlStr = '/plat/user/upload/element'

// 对表单里的文件地址是字符串的,使用逗号分隔的多个文件,单独处理
export function handleImgUrl(formObj, imgKeyArr) {
  for (const k in formObj) {
    const item = formObj[k]
    if (imgKeyArr.includes(k) && item) {
      const urlArr = item.split(',')
      formObj[k] = urlArr
        .map((i) => {
          const urlStr = i.split(fileServer)
          return urlStr.length === 2 ? urlStr[1] : urlStr
        })
        .join(',')
    }
  }
  return formObj
}
