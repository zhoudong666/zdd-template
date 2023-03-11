<template>
  <el-form class="pro-form" :ref="formRef" :model="form" v-bind="$attrs" :label-width="labelWidth" label-suffix=" :">
    <el-row :gutter="16">
      <template v-for="item in formItems">
        <template v-if="item.type === 'slot'">
          <el-col :key="item.key" :span="item.span || 24">
            <!-- <slot v-bind="item.props" v-on="item.events" :data="item.data"></slot>
            <slot :name="item.key" v-bind="item.props" v-on="item.events" :data="item.data"></slot> -->
            <template v-if="item.label">
              <el-form-item
                v-if="item._isShow"
                :rules="item._rule"
                :prop="item.key"
                :label="item.label"
                v-bind="item.props"
              >
                <slot v-bind="item.props" v-on="item.events" :data="form"></slot>
                <slot :name="item.key" v-bind="item.props" v-on="item.events" :data="form"></slot>
              </el-form-item>
            </template>
            <template v-else>
              <div>
                <slot v-bind="item.props" v-on="item.events" :data="form"></slot>
                <slot :name="item.key" v-bind="item.props" v-on="item.events" :data="form"></slot>
              </div>
            </template>
          </el-col>
        </template>
        <template v-else>
          <el-col :key="item.key" :span="item.span || 24" v-if="item._isShow">
            <el-form-item :rules="item._rule" :prop="item.key" :label="item.label" v-bind="item.props">
              <component
                :is="item.type"
                v-model.trim="form[item.key]"
                :options="item.options"
                v-bind="item.props"
                v-on="item.events"
              />
            </el-form-item>
          </el-col>
        </template>
      </template>

      <template>
        <el-col v-show="innerIsOpen || isOpen" v-for="item in toggleFormItems" :key="item.key" :span="item.span || 24">
          <el-form-item v-if="item._isShow" :rules="item._rule" :prop="item.key" :label="item.label">
            <component :is="item.type" v-model.trim="form[item.key]" :options="item.options" v-bind="item.props" />
          </el-form-item>
        </el-col>
      </template>
      <slot name="search" />
      <el-col :span="controlSpan" v-if="hasControl" :class="{ 'text-right': controlSpan == 24 }">
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
import { computeFormItem } from './core'
import elMap from './element-map'
export default {
  name: 'ZForm',
  props: {
    /** 表单唯一引用 ref 对应的值 */
    formRef: { type: String, default: 'formRef', },
    /** label 的宽度 */
    labelWidth: { type: String, default: '110px', },
    /** 有折叠项情况下 是否展开 */
    isOpen: { type: Boolean, default: false, },
    /** fields 表示每个表单项配置组成的对象 */
    fields: { type: Object, default: () => ({}), },
    /** 隐藏可切换表单项 */
    toggleFields: { type: Object, default: () => ({}), },
    /** 是否显示操作按钮 */
    hasControl: { type: Boolean, default: true, },
    /** 控制按钮所占份数 */
    controlSpan: { type: Number, default: 6, },
    /** 提交按钮文本 */
    submitText: { type: String, default: '提交', },
    /** 重置按钮文本 */
    resetText: { type: String, default: '重置', },
  },
  data() {
    return {
      // data里的 函数 会在 beforecreate 后   created 前 执行
      form: this.initForm(),
      innerIsOpen: false,
    }
  },
  computed: {
    formItems() {
      // return this.fields.map((item) => computeFormItem(item, this.form))
      var arr = []
      for (const k in this.fields) {
        // this.fields[k].key = k
        this.$set(this.fields[k], 'key', k)
        arr.push(computeFormItem(this.fields[k], this.form))
      }
      return arr
    },
    toggleFormItems() {
      // return this.toggleFields.map((item) => computeFormItem(item, this.form))
      var arr = []
      for (const k in this.toggleFields) {
        this.$set(this.toggleFields[k], 'key', k)
        arr.push(computeFormItem(this.toggleFields[k], this.form))
      }
      return arr
    },
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

      const tempObj = Object.assign({}, this.fields, this.toggleFields)
      for (const key in tempObj) {
        const item = tempObj[key]
        if (item.defaultValue !== undefined) {
          tempFormObj[key] = item.defaultValue
        } else {
          //   每种表单类型元素不一样，所以默认值也有所不同
          tempFormObj[key] = defaultValMap[item.type || 'input']
        }
      }
      return tempFormObj
    },
    submit() {
      return new Promise((resolve) => {
        this.$refs[this.formRef].validate((valid) => {
          // 此处未获取到ba-select-input的选项值?
          this.$emit('submit', this.form, valid)
          resolve(valid)
        })
      })
    },
    /** 重置表单 */
    reset() {
      this.$refs[this.formRef].resetFields()
      this.$emit('reset', this.form)
    },
    /** 清除表单校验 */
    clear() {
      this.$refs[this.formRef].clearValidate()
    },
    /** 设置表单各字段值 */
    setForm(valObj) {
      for (const key in valObj) {
        this.form[key] = valObj[key]
        this.clear()
      }
    },
    /** 控制显示与隐藏 */
    openOrClose() {
      this.innerIsOpen = !this.innerIsOpen
    },
  },
}
</script>

<style scoped lang="scss">
.pro-form {
  /* padding: 12px; */
  background: white;

  ::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }
  ::v-deep .el-input.is-disabled .el-input__inner,
  ::v-deep .el-textarea.is-disabled .el-textarea__inner {
    color: #606266; //在这里更改 input 和 textarea 禁用字体颜色
  }
  ::v-deep .is-disabled .is-checked .el-checkbox__inner {
    //更改选中时选框的样式
    background-color: #1890ff;
    border-color: #1890ff;
  }
  //更改未选中时文字(label)的样式
  ::v-deep .is-disabled .el-checkbox__label {
    color: #606266;
  }

  [my_switch='my_switch'] {
    ::v-deep .el-switch__core {
      width: 56px !important;
    }
    .el-switch {
      &:after {
        content: '关闭';
        font-size: 10px;
        color: #fff;
        position: absolute;
        left: 22px;
      }
      &.is-checked:after {
        content: '开启';
        font-size: 10px;
        color: #fff;
        position: absolute;
        left: 8px;
      }
    }
  }
}
</style>
