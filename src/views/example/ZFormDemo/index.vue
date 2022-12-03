<template>
  <div class="padding-15">
    <el-card>
      <div slot="header">form title</div>
      <z-form :fields="fields1" :toggleFields="toggleFields" label-position="right" @submit="onSubmit" ref="formRef">
        <div slot="slot1" slot-scope="scope" @click="uuu">{{ JSON.stringify(scope) }}uuuu</div>
      </z-form>

      <el-button @click="getForm">取值</el-button>
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
      this.fields1.hobby.options = [
        { value: 1, label: '足球' },
        { value: 2, label: '篮球' },
        { value: 3, label: '排球' }
      ]
    })
  },
  data: function () {
    return {
      fields1: {
        // 1 默认输入类型为input
        name: {
          span: 6,
          type: 'input', // 默认类型
          label: '用户名用户名',
          options: [
            { value: 1, label: '足球' },
            { value: 2, label: '篮球' },
            { value: 3, label: '排球' }
          ],
          isShow: function (form) {
            return true
          },
          // isRequired: true, 与 rule 互斥
          rule: [
            {
              validator: (rule, value, callback) => {
                if (value === '') callback(new Error('请输入XXX'))
                callback()
              },
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (value === '111222') callback(new Error('值不可为111222'))
                callback()
              },
              trigger: 'change'
            }
          ],
          defaultValue: 'defaultValue',
          props: { placeholder: '8888' /* disabled: true */ },
          events: {
            input(event) {
              console.log('input', event)
            }
          }
        },
        // 2 单个 checkbox
        isAgree: {
          span: 6,
          type: 'checkbox',
          label: '是否同意协议',
          defaultValue: true
          // defaultValue: 'on',
          // props: {
          //   'true-label': 'on',  // 默认 true
          //   'false-label': 'off',  //  默认 false
          // }
        },
        // 3 多个 checkbox
        hobby: {
          span: 8,
          type: 'checkboxGroup',
          label: '爱好',
          defaultValue: [1, 2],
          options: [],
          events: {
            change(val) {
              console.log('更改后的值', val)
            }
          }
        },
        // 4 数字输入框
        inputNumber: {
          span: 6,
          type: 'inputNumber',
          label: '数字输入框',
          defaultValue: 3,
          props: {
            min: 1,
            max: 10,
            precision: 2,
            step: 2
          }
        },
        // 5 多行文本
        remark: {
          span: 12,
          type: 'textarea',
          label: '文本域',
          isRequired: true,
          props: {
            // disabled: true,
            placeholder: '9999',
            resize: 'none',
            autosize: true
          }
        },
        // 6.1 日期 选择器
        date: {
          span: 6,
          type: 'datePicker',
          label: '日期 选择',
          isRequired: true
        },
        // 6.2 日期 时分秒 选择器
        datetime: {
          span: 6,
          type: 'datePicker',
          label: '日期时间',
          isRequired: true,
          props: {
            type: 'datetime',
            valueFormat: 'yyyy-MM-dd hh:mm:ss'
          }
        },
        // 7 日期 时间段 选择器
        daterange: {
          span: 6,
          type: 'dateRangePicker',
          label: '时间范围',
          isRequired: true,
          props: {},
          events: {
            change(val) {
              console.log(val)
            }
          }
        },
        // 8 固定 时分秒 选择器
        timeSelect1: {
          span: 6,
          type: 'timeSelect',
          label: '固定 时分秒',
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
        timePicker1: {
          span: 6,
          type: 'timePicker',
          label: '任意 时分秒',
          isRequired: true,
          props: {
            'picker-options': {
              selectableRange: '18:30:00-20:30:00'
            }
          }
        },
        // 11 任意 时分秒 时间段 选择器
        timeRangePicker1: {
          span: 6,
          type: 'timeRangePicker',
          label: '时分秒时间段',
          isRequired: true,
          props: {}
        },
        // 12 单选按钮组
        my_radio: {
          span: 6,
          type: 'radioGroup',
          label: 'my_radio',
          isRequired: true,
          // props: { disabled: true },
          defaultValue: '1',
          options: [
            { value: '1', label: '显示111' },
            { value: '2', label: '显示222' }
          ]
        },
        // 13 单选下拉
        BaseSelect: {
          span: 6,
          type: 'select',
          label: 'BaseSelect',
          isRequired: true,
          props: { valueText: 'code', allowCreate: true },
          // props: { valueKey: 'value', filterable: true },
          defaultValue: '2',
          options: [
            { code: '1', label: '下拉显示111' },
            { code: '2', label: '下拉显示222' },
            { code: '3', label: '下拉显示333', disabled: true }
          ]
        },
        // 14 多选下拉
        mulSelect: {
          span: 6,
          type: 'mulSelect',
          label: '多选下拉',
          isRequired: true,
          // props: { valueKey: 'value',  },
          props: {
            'collapse-tags': true
            // tagMaxWidth: '80px',
          },
          defaultValue: ['2'],
          options: [
            { value: '1', label: '下拉显下拉显下拉显下拉显示111' },
            { value: '3', label: '下拉显示333' },
            { value: '2', label: '下拉显示222' }
          ],
          events: {
            change(val, b) {
              console.log(val, b)
              console.log(this)
              // this.fields1[0].defaultValue = '444'
            }
          }
        },
        // 14 多选下拉
        mulSelect2: {
          span: 6,
          type: 'mulSelect',
          label: '多选下拉2',
          isRequired: true,
          // props: { valueKey: 'value',  },
          props: {
            tagMaxWidth: '80px',
            'collapse-tags': true
          },
          defaultValue: ['2', '3'],
          options: [
            { value: '1', label: '下拉显下拉显下拉显下拉显示111' },
            { value: '3', label: '下拉显示333' },
            { value: '2', label: '下拉显示222' }
          ]
        },
        // // 13 单选下拉
        // BaseSelect:{
        //   span: 6,
        //   type: 'select',
        //   label: 'BaseSelect',
        //   key: 'BaseSelect',
        //   isRequired: true,
        //   // props: { disabled: true },
        //   defaultValue: '1',
        //   options: [
        //     { value: '1', label: '下拉显示111' },
        //     { value: '2', label: '下拉显示222' }
        //   ]
        // }
        sslot1111111: {
          span: 6,
          type: 'slot',
          label: 'slotsss111',
          name: 'slot1',
          data: { aa: '11' },
          events: {
            click: function (e) {
              console.log(e)
            }
          }
        }
      },
      toggleFields: {
        name22: {
          // type:'input',// 默认类型
          label: '用户名222',
          span: 6
        },
        name3: {
          // type:'input',// 默认类型
          label: '用户名3',
          span: 6
        },
        name4: {
          // type:'input',// 默认类型
          label: '用户名4',
          span: 6
        }
      }
    }
  },
  methods: {
    uuu(e) {
      console.log(e)
    },
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
    // 调用子组件里的设值方法
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
        timePicker1: '19:12:23',
        timeRangePicker1: ['08:12:43', '18:33:34'],
        my_radio: '2',
        // BaseSelect: { value: '1', label: '下拉显示111' }
        BaseSelect: '2'
      }
      this.$refs.formRef.setForm(temp_obj)
    },
    getForm() {
      console.log(this.$refs.formRef.form)
    }
  }
}
</script>

<style lang="sass" scoped></style>
