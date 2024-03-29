<template>
  <el-form
    :class="['agel-form', 'agel-form-' + layout]"
    ref="form"
    :model="value.data"
    v-bind="attrs.$form"
    v-on="value.on || {}"
  >
    <!-- 内联布局 -->
    <template v-if="layout === 'inline'">
      <slot name="prepend"></slot>
      <agel-form-item
        v-for="item in items"
        :value.sync="value.data[item.prop]"
        :item="item"
        :ref="item.prop"
        :key="item.prop"
        v-show="item.show"
      />
      <slot name="append"></slot>
    </template>

    <!-- 栅格布局 -->
    <el-row class="agel-item-w100" v-if="layout === 'grid'" v-bind="attrs.$row">
      <slot name="prepend"></slot>
      <el-col v-for="item in items" v-bind="item.$col" :key="item.prop" v-show="item.show">
        <agel-form-item :value.sync="value.data[item.prop]" :item="item" :ref="item.prop" />
      </el-col>
      <slot name="append"></slot>
    </el-row>

    <!-- descriptions 布局 -->
    <el-descriptions class="agel-item-w100" v-else-if="layout === 'desc'" v-bind="attrs.$descriptions">
      <slot name="title" slot="title"></slot>
      <slot name="extra" slot="extra"></slot>
      <slot name="append"></slot>
      <el-descriptions-item v-for="item in items" v-bind="item.$descriptionsItem" :key="item.prop">
        <slot-render
          v-if="item.label && item.label.constructor !== String"
          :render="item.label"
          slot="label"
        ></slot-render>
        <agel-form-item
          :value.sync="value.data[item.prop]"
          :item="item"
          :ref="item.prop"
          :showLabel="false"
          v-show="item.show"
        />
      </el-descriptions-item>
      <slot name="append"></slot>
    </el-descriptions>
  </el-form>
</template>

<script>
import { isVNode } from 'element-ui/src/utils/vdom'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

import { getIncludeAttrs, getExcludeAttrs, getProp, guid, each, extend } from './utils/utils'

import {
  defaultComponent,
  agFormProps,
  agItemProps,
  agItemPropKyes,
  agComponentsKeys,
  formPropKeys,
  formItemPropKyes,
  rowPropsKeys,
  colPorpKeys,
  descriptionsPropkeys,
  descriptionsItemPropkeys,
} from './utils/props'

import slotRender from './lib/slot-render'
import agelFormItem from './agel-form-item.vue'

const inputArr = ['el-input', 'el-input-number', 'el-autocomplete']
const selectArr = ['el-cascader', 'el-time-select', 'el-date-picker', 'agel-select', 'agel-tree-select']

export default {
  name: 'agel-form',
  inheritAttrs: false,
  components: {
    agelFormItem,
    slotRender,
  },
  props: {
    value: {
      required: true,
      type: Object,
      default: () => ({}),
    },
    attach: {
      type: Object,
      default: () => ({}),
    },
    'item-extend-keys': {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (newv, oldv) {
        if (newv === oldv) return
        const agelFormConfig = this.$agelFormConfig || {}
        extend(this.value, agelFormConfig.form || {})
        extend(this.value, agFormProps.call(this))
      },
    },
    attach: {
      deep: true,
      immediate: true,
      handler: function () {
        extend(this.value, this.attach, true)
      },
    },
  },
  mounted() {
    if (this.value.responsive) {
      this.resize()
      addResizeListener(this.$refs.form.$el, this.resize)
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.form.$el, this.resize)
  },
  computed: {
    layout() {
      if (this.value.inline) {
        return 'inline'
      } else if (this.value.descriptions) {
        return 'desc'
      } else {
        return 'grid'
      }
    },
    attrs() {
      const $form = getIncludeAttrs(formPropKeys, this.value)
      if (this.layout === 'inline') {
        return { $form }
      } else if (this.layout === 'grid') {
        const $row = getIncludeAttrs(rowPropsKeys, this.value)
        extend($form, { labelWidth: 'auto' })
        extend($row, { type: 'flex', gutter: 15 })
        return { $form, $row }
      } else if (this.layout === 'desc') {
        const $descriptions = getIncludeAttrs(descriptionsPropkeys, this.value)
        return { $form, $descriptions }
      }
      return {}
    },
    items() {
      return each(this.value.items, 'map', (v, i, k) => {
        const item = this.injectItemAttr(v, k)
        const agItem = this.getAgFormItemAttrs(item)
        agItem.$descriptionsItem = this.getDescriptionsItemAttrs(item)
        agItem.$formItem = this.getFormItemAttrs(item)
        agItem.$col = this.getColAttrs(item)
        agItem.$component = this.getComponentAttrs(item)
        return agItem
      }).filter((v) => v.display)
    },
  },
  methods: {
    injectItemAttr(item, prop) {
      const agelFormConfig = this.$agelFormConfig || {}
      if (!item.prop && prop) item.prop = prop
      if (!item.component) item.component = defaultComponent
      let config = agelFormConfig[item.component]
      if (config && config.constructor === Function) {
        config = config(item.prop, item, this.value)
      }
      if (config && config.constructor === Object) {
        extend(item, config)
      }
      if (item.prop === undefined) {
        item.prop = '_aguid_' + guid()
      }
      if (item.prop.indexOf('_aguid_') === -1 && !Object.prototype.hasOwnProperty.call(this.value.data, item.prop)) {
        this.$set(this.value.data, item.prop, this.getItemValue(item))
      }
      return item
    },
    getAgFormItemAttrs(item) {
      const agItem = Object.assign(agItemProps(), getIncludeAttrs(agItemPropKyes, item))
      agItem.component = this.getName(item)
      agItem.display = typeof item.display === 'function' ? item.display(this.value.data, item) : agItem.display
      agItem.show = typeof item.show === 'function' ? item.show(this.value.data, item) : agItem.show
      agItem.slot = item.slot === true ? this.$scopedSlots[item.prop] : agItem.slot
      agItem.slots = this.getSlots(agItem.slots)
      return agItem
    },
    getFormItemAttrs(item) {
      const formItem = getIncludeAttrs(formItemPropKyes, item)
      const rules = item.rules || (this.value.rules || {})[item.prop]
      formItem.label = typeof item.label === 'string' ? item.label : ''
      if (item.required && rules === undefined) {
        formItem.required = undefined
        formItem.rules = [
          {
            required: true,
            message: formItem.label + '必填',
            trigger: inputArr.includes(this.getName(item)) ? 'blur' : 'change',
          },
        ]
      }
      return formItem
    },
    getDescriptionsItemAttrs(item) {
      if (this.layout !== 'desc') return {}
      const descItem = getIncludeAttrs(descriptionsItemPropkeys, item)
      descItem.label = typeof item.label === 'string' ? item.label : ''
      descItem.labelClassName = descItem.labelClassName || ''
      if (!getProp(this.value, 'hide-required-asterisk')) {
        const rules = item.rules || (this.value.rules || {})[item.prop] || {}
        const required = item.required || (Array.isArray(rules) ? rules.some((v) => v.required) : rules.required)
        if (required) descItem.labelClassName += ' required-label'
      }
      return descItem
    },
    getColAttrs(item) {
      if (this.layout !== 'grid') return {}
      return Object.assign(getIncludeAttrs(colPorpKeys, this.value), getIncludeAttrs(colPorpKeys, item))
    },
    getComponentAttrs(item) {
      const ignoreKeys = [].concat(colPorpKeys, formItemPropKyes, agItemPropKyes, this.itemExtendKeys)
      const component = Object.assign(getExcludeAttrs(ignoreKeys, item), item.$component || {})
      component.placeholder = this.getPlaceholder(item)
      component.disabled = typeof item.disabled === 'function' ? item.disabled(this.value.data) : item.disabled
      return component
    },
    getItemValue(item) {
      const name = this.getName(item)

      if (Object.prototype.hasOwnProperty.call(item, 'defaultValue')) return item.defaultValue
      if (
        name === 'el-input' ||
        name === 'el-autocomplete' ||
        name === 'agel-select' ||
        name === 'agel-tree-select' ||
        name === 'agel-radio' ||
        (name === 'agel-checkbox' && item.options)
      ) {
        return ''
      }
      if (name === 'el-date-picker' || name === 'el-time-select') {
        return null
      }
      if (name === 'el-switch' || (name === 'agel-checkbox' && !item.options)) {
        return false
      }
      if (name === 'el-slider' || name === 'el-rate') {
        return 0
      }
      if (name === 'el-cascader' || name === 'el-transferManage' || name === 'agel-upload') {
        return []
      }
      // if (name === "el-input-number") return undefined;
      return undefined
    },
    getName(item) {
      const name = item.component || defaultComponent
      return agComponentsKeys.includes('ag' + name) ? 'ag' + name : name
    },
    getPlaceholder(item) {
      if (item.placeholder) return item.placeholder
      const name = this.getName(item)
      const label = typeof item.label === 'string' ? item.label : ''
      if (inputArr.includes(name)) {
        return '请输入' + label
      }
      if (selectArr.includes(name)) {
        return '请选择' + label
      }
    },
    getSlots(slots) {
      const noPorpsSlots = {}
      const hasPorpsSlots = {}
      if (slots.constructor !== Object || isVNode(slots)) {
        slots = { default: slots }
      }
      for (const name in slots) {
        const slot = slots[name]
        if (slot.constructor === Function && slot.length !== 0) {
          hasPorpsSlots[name] = slot
        } else {
          noPorpsSlots[name] = slot
        }
      }
      return { hasPorpsSlots, noPorpsSlots }
    },
    // 根据容器宽度响应式变化
    resize() {
      const width = this.$refs.form.$el.clientWidth
      if (!this.value.responsive || width === 0) return
      const method = this.value.responsiveMethod || this.responsiveMethod
      const keys = ['labelPosition', 'labelWidth', 'gutter']
      const layoutPropKeys = keys.concat(colPorpKeys)
      const layoutProps = getIncludeAttrs(layoutPropKeys, method(width))
      extend(this.value, layoutProps, true)
    },
    // 响应式规则
    responsiveMethod(w) {
      let arr = []
      if (w <= 400) arr = [24, 'top']
      if (w > 400 && w <= 600) arr = [24, 'right']
      if (w > 600 && w <= 900) arr = [12, 'right']
      if (w > 900 && w <= 1200) arr = [8, 'right']
      if (w > 1200 && w <= 1600) arr = [6, 'right']
      if (w >= 1600) arr = [4, 'right']
      return { span: arr[0], labelPosition: arr[1] }
    },
    // 暴露出去的功能函数
    getRef(prop) {
      if (prop === undefined) return this.$refs.form
      return this.$refs[prop] ? this.$refs[prop][0].getRef() : null
    },
    getItem(prop, deep) {
      if (deep) return this.items.find((v) => v.prop === prop)
      if (Array.isArray(this.value.items)) {
        return this.value.items.find((v) => v.prop === prop)
      } else {
        return this.value.items[prop]
      }
    },
    validate(callback, erroCallback) {
      this.$refs.form.validate((is) => {
        if (is) {
          callback && callback(this.value.data)
        } else {
          erroCallback && erroCallback()
        }
      })
    },
    resetFields() {
      this.$refs.form.resetFields()
    },
    clearValidate(props) {
      this.$refs.form.clearValidate(props)
    },
  },
  install(vue, opts = {}) {
    vue.prototype.$agelFormConfig = opts
    vue.component(opts.name || this.name, this)
  },
}
</script>

<style>
@import './style.css';
</style>
