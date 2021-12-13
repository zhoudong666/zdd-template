export default {
  // 1 默认输入类型
  input: {
    // 对应到 Element 中的组件 tag
    component: 'el-input',
    defaultVal: '',
    // 传递给 Element 组件的默认 props
    props: {
      clearable: true,
      style: { width: '100%' }
    }
  },
  // 2 单个 checkbox
  checkbox: {
    component: 'el-checkbox',
    props: {
      clearable: true
    }
  },
  // 3 多个 checkbox
  checkboxGroup: {
    component: 'ba-checkbox',
    props: {
      clearable: true
    }
  },
  // 4 数字输入框
  inputNumber: {
    component: 'el-input-number',
    props: {
      clearable: true
    }
  },
  // 5 多行文本
  textarea: {
    component: 'el-input',
    props: {
      type: 'textarea',
      rows: 3,
      style: { width: '400px' }
    }
  },
  // 6 单个日期时间选择器
  datetime: {
    component: 'el-date-picker',
    props: {
      type: 'datetime',
      valueFormat: 'timestamp'
    }
  },
  // 7 单选按钮组
  radio: {
    component: 'ba-radio',
    props: {}
  },
  // 8 select 单选 和多选
  select: {
    component: 'ba-select',
    props: {
      clearable: true
    }
  },
  // 9 自定义 key 和 value 查询集合
  selectInput: {
    component: 'ba-select-input'
  },

  // 暂时未封装
  upload: {
    component: 'ba-upload'
  },
  editor: {
    component: 'ba-editor'
  }
}
