<template>
  <el-form class="pro-form" :ref="formRef" :model="form" v-bind="$attrs" :label-width="labelWidth">
    <el-row :gutter="16">
      <el-col v-for="item in formItems" :key="item.key" :span="item.span || 24">
        <el-form-item v-if="item._isShow" :rules="item._rule" :prop="item.key" :label="item.label">
          <template v-if="item.type === 'slot'">
            <div>
              <slot></slot>
            </div>
          </template>
          <template v-else>
            <component
              :is="item.type"
              v-model.trim="form[item.key]"
              :options="item.options"
              v-bind="item.props"
              v-on="item.events"
            />
          </template>
        </el-form-item>
      </el-col>
      <template>
        <el-col v-show="innerIsOpen || isOpen" v-for="item in toggleFormItems" :key="item.key" :span="item.span || 24">
          <el-form-item v-if="item._isShow" :rules="item._rule" :prop="item.key" :label="item.label">
            <component :is="item.type" v-model.trim="form[item.key]" :options="item.options" v-bind="item.props" />
          </el-form-item>
        </el-col>
      </template>
      <slot name="search" />
      <el-col :span="controlSpan" v-if="hasControl">
        <el-button type="primary" @click="submit">{{ submitText }}</el-button>
        <el-button @click="reset">{{ resetText }}</el-button>
        <el-button v-if="toggleFormItems.length" @click="openOrClose">
          {{ isOpen || innerIsOpen ? '收起' : '展开' }}
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
// import BaCheckbox from "../base-components/ba-checkbox";
// import BaSelect from "../base-components/ba-select";
// import BaRadio from "../base-components/ba-radio";
// import BaSelectInput from "../base-components/ba-select-input";
import { computeFormItem } from './core'
import elMap from './element-map'
export default {
  name: 'ZForm',
  // components: { BaCheckbox, BaSelect, BaRadio, BaSelectInput },
  props: {
    /** 表单唯一引用 ref 对应的值 */
    formRef: {
      type: String,
      // required: true,
      default: 'form'
    },
    /** label 的宽度 */
    labelWidth: {
      type: String,
      default: '110px'
    },
    /** 有折叠项情况下 是否展开 */
    isOpen: {
      type: Boolean,
      default: false
    },
    /** fields 表示每个表单项配置组成的数组 */
    fields: {
      type: Array,
      default: () => []
    },
    /** 隐藏可切换表单项 */
    toggleFields: {
      type: Array,
      default: () => []
    },
    /** 是否显示操作按钮 */
    hasControl: {
      type: Boolean,
      default: true
    },
    /** 控制按钮所占份数 */
    controlSpan: {
      type: Number,
      default: 8
    },
    /** 提交按钮文本 */
    submitText: {
      type: String,
      default: '提交'
    },
    /** 重置按钮文本 */
    resetText: {
      type: String,
      default: '重置'
    }
  },
  data() {
    return {
      // data里的 函数 会在 beforecreate 后   created 前 执行
      form: this.initForm(),
      innerIsOpen: false
    }
  },
  computed: {
    formItems() {
      return this.fields.map((item) => computeFormItem(item, this.form))
    },
    toggleFormItems() {
      return this.toggleFields.map((item) => computeFormItem(item, this.form))
    }
  },
  beforeCreate() {
    // console.log('beforeCreate: computed 还没有执行 ', this.formItems)
  },
  created() {
    // console.log('created 执行阶段 : computed 已 执行', this.formItems)
  },
  methods: {
    /** 初始化表单对象 返回初始值对象给data里的form */
    initForm() {
      // console.log('data 执行阶段 : computed 还没有执行', this.formItems)
      const tempFormObj = {} // 临时存放表单数据的对象
      const defaultValMap = {} // 表单项默认值map
      for (const key in elMap) {
        if (Object.hasOwnProperty.call(elMap, key)) {
          defaultValMap[key] = elMap[key].defaultVal
        }
      }
      // const defaultValMap = elMap.map((item) => {})
      // const defaultValMap = {
      //   input: '',
      //   checkbox: false,
      //   checkboxGroup: [],
      //   inputNumber: 0,
      //   selectInput: []
      //   // datetime: new Date(),
      //   // undefined: ''
      // }
      this.fields.concat(this.toggleFields).forEach((item) => {
        if (item.defaultValue !== undefined) {
          tempFormObj[item.key] = item.defaultValue
        } else {
          // TODO 每种表单类型元素不一样，所以默认值也有所不同
          tempFormObj[item.key] = defaultValMap[item.type || 'input']
        }
      })
      return tempFormObj
    },
    submit() {
      this.$refs[this.formRef].validate((valid) => {
        // 此处未获取到ba-select-input的选项值?
        this.$emit('submit', this.form, valid)
      })
    },
    /** 重置表单 */
    reset() {
      this.$refs[this.formRef].resetFields()
    },
    /** 清除表单校验 */
    clear() {
      this.$refs[this.formRef].clearValidate()
    },
    /** 设置表单各字段值 */
    setForm(valObj) {
      for (const key in valObj) {
        this.form[key] = valObj[key]
        // if (form.hasOwnProperty(key)) {
        //   this.form[key] = form[key]
        // }
      }
    },
    /** 控制显示与隐藏 */
    openOrClose() {
      this.innerIsOpen = !this.innerIsOpen
    }
  }
}
</script>

<style scoped>
.pro-form {
  /* padding: 12px; */
  background: white;
}
</style>
