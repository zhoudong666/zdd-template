/**
 * @param {null}  to get uuid
 * @returns {String} '2ba3f19f-502d-9434-fcaa-8652796bb717'
 */
export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

/**
 * blobToBase64
 * @param {blob}  blob
 * @returns
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

// 处理 MM-dd hh:mm:ss 只输入一位时的处理方法
// 例如: 期望返回 yyyy-MM-dd hh:mm:ss 的格式   但是给定的时间为: 2019-4-4 12:4:4
function padLeftZero(str) {
  // return ('00' + str).substr(str.length)
  return str.padStart(2, '0')
}
/**  格式化时间的封装 方案 1
 * @param {String | Number | Date} date default +new Date()
 * @param {String} fmt default 'yyyy-MM-dd'
 * @returns String
 */
export function formatDate(date = +new Date(), fmt = 'yyyy-MM-dd') {
  date = new Date(date)
  // 先处理年份
  // 正则y+ 匹配一个或多个y
  const yearReg = /(y+)/
  if (yearReg.test(fmt)) {
    const [, matched] = yearReg.exec(fmt) // 第一个匹配的项,生成的数组的第1个
    // 使用.replace() 替换 RegExp.$1 匹配到的值为 date.getFullYear
    // .substr() 截取 RegExp.$1 匹配到的 长度
    // 例如：通过/(y+).test(fmt)匹配到RegExp.$1的值为 yyy 则替换 yyy.replace('yyy',(2019 + ' ').substr(1)) 结果为: 019
    fmt = fmt.replace(matched, (date.getFullYear() + '').substring(4 - matched.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (const k in o) {
    const reg = new RegExp(`(${k})`)
    if (reg.test(fmt)) {
      const str = padLeftZero(o[k] + '')
      // fmt = fmt.replace(RegExp.$1, str)
      fmt = fmt.replace(reg.exec(fmt)[1], str)
    }
  }
  return fmt
}

/** 距离现在多少天
 * @param {Number} days default 0
 * @returns Array [开始日期,结束日期]
 */
export function diffDate(days = 0) {
  const now = +new Date()
  const temp = days * 24 * 60 * 60 * 1000
  return [formatDate(now - temp), formatDate()]
}

/**  格式化时间的封装 方案 2
 * @param {String | Number | Date} date default +new Date()
 * @param {String} fmt default 'yyyy-MM-dd'
 * @returns String
 */
export function DateFormat(date = +new Date(), fmt = 'yyyy-MM-dd') {
  date = new Date(date)
  if (/H+/.test(fmt) && /h+/.test(fmt)) {
    throw Error('小时格式错误，同类型只能连续出现一次！')
  }
  /* 模板参数校验，正则验证方法 */
  const verify = function (Rex) {
    const arr = new RegExp(Rex).exec(fmt) // 获得匹配结果数组
    // 匹配失败返回
    if (!arr) return ''

    // 同一类型间隔出现多次
    if (fmt.split(Rex).length > 2) throw Error('fmt格式错误：同类型只能连续出现一次！')

    return arr[0]
  }
  /**
   * 提供月、天、时、分、秒通用匹配替换
   * @param {对象o属性key} r
   * @param {r对应正则对象} rex
   **/
  const common = function (r, rex, len) {
    if (len !== 1 && len !== 2) {
      throw Error('月份格式错误:M只能出现1或2次')
    }
    len === 2 ? (fmt = fmt.replace(rex, o[r].length === 1 ? '0' + o[r] : o[r])) : (fmt = fmt.replace(rex, o[r]))
  }
  const o = {
    // 数据存储对象
    'y+': date.getFullYear() + '', // 年
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'M+': date.getMonth() + 1 + '', // 月
    'd+': date.getDate() + '', // 日
    'H+': date.getHours() + '', // 24时
    'h+': date.getHours() + '', // 12时 ===>  改为都是24小时制
    'm+': date.getMinutes() + '', // 分
    's+': date.getSeconds() + '', // 秒
    'S+': date.getMilliseconds(), // 毫秒
  }
  for (const r in o) {
    const rex = new RegExp(r)
    const temp = verify(rex) // 匹配所得字符串
    const len = temp.length // 长度
    if (!len || len === 0) {
      continue
    }
    if (r === 'y+') {
      if (len !== 2 && len !== 4) throw Error('年份格式错误:y只能出现2或4次')
      len === 2 ? (fmt = fmt.replace(rex, o[r].substring(2, 4))) : (fmt = fmt.replace(rex, o[r]))
    } else if (r === 'q+') {
      if (len !== 1) throw Error('季度格式错误:q只能出现1次')
      fmt = fmt.replace(rex, o[r])
    } else if (r === 'h+') {
      if (len !== 1 && len !== 2) throw Error('小时格式错误:h只能出现1或2次')
      // var h = (o[r] > 12 ? o[r] - 12 : o[r]) + '' 改为都是24小时制
      const h = o[r]
      len === 2 ? (fmt = fmt.replace(rex, h.length === 1 ? '0' + h : h)) : (fmt = fmt.replace(rex, h))
    } else if (r === 'S+') {
      if (len !== 1) throw Error('毫秒数格式错误:S只能出现1次')
      fmt = fmt.replace(rex, o[r])
    } else {
      // (r==="M+" || r==="d+" || r==="H+" || r==="m+" || r==="s+")
      common(r, rex, len)
    }
  }
  return fmt
}
