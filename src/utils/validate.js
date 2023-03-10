/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export const validateMobile = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号!'))
  } else {
    // 设置正则表达式的手机号码格式 规则 ^起点 $终点 1第一位数是必为1  [3-9]第二位数可取3-9的数字  \d{9} 匹配9位数字
    var reg = /^1[3-9]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号!'))
    }
  }
}

export const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入名字!'))
  } else {
    var reg = /^[\u4e00-\u9fa5]{2,5}$/ // 2-4个中文字符正则
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('名字为2-5位汉字!'))
    }
  }
}

export const validateIdentity = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入身份证号!'))
  } else {
    // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 普通校验
    //  18位精准校验
    const reg = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的身份证号 !'))
    }
  }
}

export const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码!'))
  } else {
    // (?![0-9]+$)表示排除掉只有数字的组合，
    // (? ![a - zA - Z] + $)表示排除掉只有字母的组合，
    // [0 - 9A - Za - z]表示必须有字母或数字
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/ //
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('密码必须包含字母和数字, 且在6~18位之间!'))
    }
  }
}

export const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱!'))
  } else {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱!'))
    }
  }
}
