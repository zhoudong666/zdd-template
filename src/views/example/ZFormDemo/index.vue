<template>
  <div class="padding-15">
    <el-card>
      <div slot="header">form title</div>
      <z-form :fields="fields1" :toggleFields="toggleFields" label-position="right" @submit="onSubmit" ref="aaa">
      </z-form>

      <el-button @click="setForm">设置值</el-button>
    </el-card>
  </div>
</template>

<script>
import ZForm from '@/components/ZForm'
export default {
  name: 'ZFormDemo',
  components: { ZForm },
  created() {
    // 模拟请求回来的数据
    setTimeout(() => {
      this.fields1[2].options = [
        { value: 1, label: '足球' },
        { value: 2, label: '篮球' },
        { value: 3, label: '排球' }
      ]
    })
  },
  data() {
    return {
      fields1: [
        // 1 默认输入类型为input
        {
          span: 6,
          type: 'input', // 默认类型
          label: '用户名用户名',
          key: 'name',
          isRequired: true,
          isShow: function (form) {
            return true
          },
          // rule: [
          //   {
          //     validator: (rule, value, callback) => {
          //       if (value === '') callback(new Error('请输入XXX'))
          //     },
          //     trigger: 'blur'
          //   },
          //   {
          //     validator: (rule, value, callback) => {
          //       if (value === '111222') callback(new Error('值不可为111222'))
          //     },
          //     trigger: 'change'
          //   }
          // ],
          defaultValue: 'defaultValue',
          props: { placeholder: '8888' /* disabled: true */ },
          events: {
            input(event) {
              console.log('input', event)
            }
          }
        },
        // 2 单个 checkbox
        {
          span: 4,
          type: 'checkbox',
          label: '是否同意协议',
          key: 'isAgree',
          defaultValue: true
          // defaultValue: 'on',
          // props: {
          //   'true-label': 'on',  // 默认 true
          //   'false-label': 'off',  //  默认 false
          // }
        },
        // 3 多个 checkbox
        {
          span: 8,
          type: 'checkboxGroup',
          label: '爱好',
          key: 'hobby',
          defaultValue: [1, 2],
          options: [],
          events: {
            change(val) {
              console.log('更改后的值', val)
            }
          }
        },
        // 4 数字输入框
        {
          span: 6,
          type: 'inputNumber',
          label: '数字输入框',
          key: 'inputNumber',
          defaultValue: 3,
          props: {
            min: 1,
            max: 10,
            precision: 2,
            step: 2
          }
        },
        // 5 多行文本
        {
          span: 12,
          type: 'textarea',
          label: '文本域',
          key: 'remark',
          isRequired: true,
          props: {
            // disabled: true,
            placeholder: '9999',
            resize: 'none'
            // autosize: true
          }
        },
        // 6.1 日期 选择器
        {
          span: 6,
          type: 'datePicker',
          label: '日期 选择',
          key: 'date',
          isRequired: true
        },
        // 6.2 日期 时分秒 选择器
        {
          span: 6,
          type: 'datePicker',
          label: '日期时间 选择',
          key: 'datetime',
          isRequired: true,
          props: {
            type: 'datetime',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }
        },
        // 7 日期 时间段 选择器
        {
          span: 12,
          type: 'dateRangePicker',
          label: '日期时间 选择',
          key: 'daterange',
          isRequired: true,
          props: {},
          events: {
            change(val) {
              console.log(val)
            }
          }
        },
        // 8 固定 时分秒 选择器
        {
          span: 6,
          type: 'timeSelect',
          label: '固定 时分秒',
          key: 'timeSelect1',
          isRequired: true,
          props: {
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          }
        },
        // 9 任意 时分秒 选择器
        {
          span: 6,
          type: 'timePicker',
          label: '任意 时分秒',
          key: 'timePicker1',
          isRequired: true,
          props: {
            'picker-options': {
              selectableRange: '18:30:00-20:30:00'
            }
          }
        },
        // 11 任意 时分秒 时间段 选择器
        {
          span: 6,
          type: 'timeRangePicker',
          label: '时分秒时间段',
          key: 'timeRangePicker1',
          isRequired: true,
          props: {}
        },
        // 12 单选按钮组
        {
          span: 8,
          type: 'radioGroup',
          label: 'my_radio',
          key: 'my_radio',
          isRequired: true,
          // props: { disabled: true },
          defaultValue: '1',
          options: [
            { value: '1', label: '显示111' },
            { value: '2', label: '显示222' }
          ]
        }
      ],
      toggleFields: [
        {
          // type:'input',// 默认类型
          label: '用户名222',
          key: 'name22',
          span: 12
        }
      ]
    }
  },
  methods: {
    onSubmit(form, valid) {
      console.log('校验结果', { ...form }, valid)
      // const { moreConditions, ...rest } = form
      // // recude报错->moreCoditions未成功获取值或者没判断为undefined的情况
      // const temp = moreConditions.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {})
      // this.$message.info(
      //   `校验结果：${valid} 表单数据：` +
      //     JSON.stringify({
      //       ...rest,
      //       ...temp
      //     })
      // )
    },
    setForm() {
      var temp_obj = {
        name: 111,
        isAgree: false,
        hobby: [2, 3],
        inputNumber: 5,
        remark: 'remark',
        date: '2021-12-18',
        datetime: '2021-12-14 04:10:44',
        daterange: ['2021-12-03', '2021-12-04'],
        timeSelect1: '09:23',
        timePicker1: '19:12:23'
      }
      this.$refs.aaa.setForm(temp_obj)
    }
  }
}
</script>

<style lang="sass" scoped></style>
