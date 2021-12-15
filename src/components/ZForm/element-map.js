export default {
  // 1 默认输入类型
  input: {
    // 对应到 Element 中的组件 tag
    component: 'el-input',
    defaultVal: '',
    // 传递给 Element 组件的默认 props
    props: {
      clearable: true,
      style: { width: '100%' },
      placeholder: '请输入'
    }
  },
  // 2 单个 checkbox
  checkbox: {
    component: 'el-checkbox',
    defaultVal: false,
    props: {}
  },
  // 3 多个 checkbox
  checkboxGroup: {
    component: () => import('./base-components/BaseCheckboxGroup'),
    defaultVal: [],
    props: {}
  },
  // 4 数字输入框
  inputNumber: {
    component: 'el-input-number',
    defaultVal: 0,
    props: {}
  },
  // 5 多行文本
  textarea: {
    component: 'el-input',
    defaultVal: '',
    props: {
      type: 'textarea',
      rows: 3,
      placeholder: '请输入'
    }
  },
  // 6 单个日期时间选择器
  datePicker: {
    component: 'el-date-picker',
    defaultVal: '',
    props: {
      type: 'date',
      editable: false,
      placeholder: '请选择',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  // 7 日期时间段 选择器
  dateRangePicker: {
    component: 'el-date-picker',
    defaultVal: [],
    props: {
      type: 'daterange',
      editable: false,
      startPlaceholder: '请选择',
      endPlaceholder: '请选择',
      unlinkPanels: true,
      // rangeSeparator: '至',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  // 8 固定 时分秒 时间选择器
  timeSelect: {
    component: 'el-time-select',
    defaultVal: '',
    props: {
      editable: false,
      placeholder: '请选择'
    }
  },
  // 9 任意时间点 时间选择器
  timePicker: {
    component: 'el-time-picker',
    defaultVal: '',
    props: {
      editable: false,
      placeholder: '请选择',
      valueFormat: 'HH:mm:ss'
    }
  },
  // 11 任意时间点 时间段 选择器
  timeRangePicker: {
    component: 'el-time-picker',
    defaultVal: ['00:00:00', '23:59:59'],
    props: {
      editable: false,
      isRange: true,
      placeholder: '请选择',
      valueFormat: 'HH:mm:ss'
    }
  },

  // 12 单选按钮组
  radioGroup: {
    component: () => import('./base-components/BaseRadioGroup'),
    props: {}
  },

  // 13 select 单选 和多选
  select: {
    component: () => import('./base-components/BaseSelect'),
    defaultVal: '',
    props: {
      filterable: true,
      clearable: true
    }
  },

  // 14 multipleSelect 单选 和多选
  mulSelect: {
    component: () => import('./base-components/BaseMulSelect'),
    defaultVal: [],
    props: {
      multiple: true, // 多选必须
      filterable: true,
      clearable: true
    }
  },

  slot: {},
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
