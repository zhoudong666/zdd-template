import ElementMap from './element-map'
import { isFunction } from 'element-ui/src/utils/types'
import { isUndefined } from '@/utils/types'

const InputMap = ['el-input', 'el-input-number', 'ba-editor']

// 获取校验规则 参数item表示最终的配置项
function getRule(item, form) {
  const { rule, isRequired, type, label } = item
  if (typeof isRequired === 'boolean' && isRequired) {
    const isInput = InputMap.indexOf(type) > -1
    return {
      required: true,
      message: `请${isInput ? '输入' : '选择'}${label}`,
      trigger: `${isInput ? 'blur' : 'change'}`
    }
  } else if (rule) {
    return isFunction(rule) ? rule(form) : rule
  } else {
    return null
  }
}

export function computeFormItem(config, form) {
  // 结构传过来的item项,等于 copy了一份
  const item = { ...config }
  // 计算组件真实对应的名称并传入一些默认配置
  const res = ElementMap[item.type || 'input']
  item.type = res.component
  item.props = Object.assign({}, res.props, item.props)

  // 处理联动
  if (isFunction(item.getProps)) {
    Object.assign(item.props, item.getProps(form))
  }
  item._isShow = isFunction(item.isShow) ? !!item.isShow(form) : isUndefined(item.isShow) ? true : !!item.isShow

  // 处理校验
  item._rule = getRule(item, form)

  // 设置内容宽度
  if (item.contentWidth) {
    const temp = typeof item.contentWidth === 'number' ? `${item.contentWidth}px` : item.contentWidth
    item.props.style = { width: temp }
  }
  console.log(item)
  return item
}
