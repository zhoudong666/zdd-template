<template>
  <MyCard style="padding-bottom: 150px">
    <div slot="header">demo - form</div>
    <z-form
      :fields="fields1"
      :toggleFields="toggleFields"
      label-position="right"
      label-width="140px"
      @submit="onSubmit"
      ref="formRef"
      :controlSpan="24"
    >
      <div slot="type1">input</div>
      <div slot="type2">checkbox</div>
      <div slot="type3">checkboxGroup</div>
      <div slot="type4">inputNumber</div>
      <div slot="type5">textarea</div>
      <div slot="type61">datePicker</div>
      <div slot="type62">monthPicker</div>
      <div slot="type63">yearPicker</div>
      <div slot="type64">quarterPicker</div>
      <div slot="type7">dateRangePicker</div>
      <div slot="type8">timeSelect</div>
      <div slot="type9">timePicker</div>
      <div slot="type10">timeRangePicker</div>
      <div slot="type11">switch</div>
      <div slot="type12">radioGroup</div>
      <div slot="type13">select</div>
      <div slot="type14">mulSelect</div>

      <div slot="defSlot" slot-scope="{ data }" @click="clickSlot(data)">{{ JSON.stringify(data) }}</div>
    </z-form>

    <hr />
    <h4>外部按钮</h4>
    <el-button @click="getForm">取值</el-button>
    <el-button @click="setForm">设置值</el-button>
    <el-button @click="validForm">校验值</el-button>
  </MyCard>
</template>

<script>
import ZForm from '@/components/ZForm'
export default {
  name: 'ZformTypes',
  components: { ZForm },
  created() {
    // 模拟请求回来的数据
    setTimeout(() => {
      this.fields1.hobby.options = [
        { value: 1, label: '足球' },
        { value: 2, label: '篮球' },
        { value: 3, label: '排球' },
      ]
    })
  },
  data() {
    return {
      fields1: {
        // sslot22222222: {
        //   type: 'slot',
        //   label: 'slotsss222',
        //   name: 'slot2'
        // },
        type1: { span: 24, type: 'slot' },
        // 1 默认输入类型为input
        name1: {
          span: 12,
          label: '默认类型',
          isRequired: true,
        },
        name2: {
          span: 12,
          type: 'input', // 默认类型
          label: '用户名',
          isShow: function (form) {
            return true
          },
          // isRequired: true, 与 rule 互斥
          rule: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (value === '') callback(new Error('请输入XXX'))
                callback()
              },
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                if (value === '111222') callback(new Error('值不可为111222'))
                callback()
              },
              trigger: 'change',
            },
          ],
          defaultValue: 'defaultValue',
          props: { placeholder: '8888' /* disabled: true */ },
          events: {
            input(event) {
              console.log('input', event)
            },
          },
        },
        type2: { span: 24, type: 'slot' },
        // 2 单个 checkbox
        isAgree: {
          span: 12,
          type: 'checkbox',
          label: '是否同意协议',
          defaultValue: true,
          // defaultValue: 'off',
          // props: {
          //   'true-label': 'on', // 默认 true
          //   'false-label': 'off', //  默认 false
          // },
        },
        type3: { span: 24, type: 'slot' },
        // 3 多个 checkbox
        hobby: {
          span: 24,
          type: 'checkboxGroup',
          label: '爱好',
          defaultValue: [1, 2],
          options: [], // 可异步获取赋值
          events: {
            change(val) {
              console.log('更改后的值', val)
            },
          },
        },
        type4: { span: 24, type: 'slot' },
        // 4 数字输入框
        inputNumber: {
          span: 12,
          type: 'inputNumber',
          label: '数字输入框',
          defaultValue: 3,
          props: {
            min: 1,
            max: 10,
            precision: 2,
            step: 2,
          },
        },
        type5: { span: 24, type: 'slot' },
        // 5 多行文本
        remark: {
          span: 24,
          type: 'textarea',
          label: '文本域',
          isRequired: true,
          props: {
            // disabled: true,
            placeholder: '9999',
            resize: 'none', // 是否可拖拽
            autosize: true,
            rows: 5, // 与autosize互斥
          },
        },
        type61: { span: 24, type: 'slot' },
        // 6 日期 选择器
        date: {
          span: 12,
          type: 'datePicker',
          label: '日期 选择',
          isRequired: true,
        },
        // 6 日期 时分秒 选择器
        datetime: {
          span: 12,
          type: 'datePicker',
          label: '日期时间 选择',
          isRequired: true,
          props: {
            type: 'datetime',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
          },
        },
        type62: { span: 24, type: 'slot' },
        month: {
          span: 12,
          type: 'monthPicker',
          label: '月份 选择',
          isRequired: true,
        },
        type63: { span: 24, type: 'slot' },
        year: {
          span: 12,
          type: 'yearPicker',
          label: '年 选择',
          isRequired: true,
        },
        type64: { span: 24, type: 'slot' },
        quarterPicker: {
          span: 12,
          type: 'quarterPicker',
          label: '季度 选择',
          isRequired: true,
        },
        type7: { span: 24, type: 'slot' },
        // 7 日期 时间段 选择器
        daterange: {
          span: 12,
          type: 'dateRangePicker',
          label: '时间范围',
          isRequired: true,
          props: {},
          events: {
            change(val) {
              console.log(val)
            },
          },
        },
        type8: { span: 24, type: 'slot' },
        // 8 固定 时分秒 选择器
        timeSelect: {
          span: 12,
          type: 'timeSelect',
          label: '固定 时分秒',
          isRequired: true,
          props: {
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30',
            },
          },
        },
        type9: { span: 24, type: 'slot' },
        // 9 任意时间点 时间选择器
        timePicker: {
          span: 12,
          type: 'timePicker',
          label: '任意 时分秒',
          isRequired: true,
          props: {
            'picker-options': {
              selectableRange: '18:30:00-20:30:00',
            },
          },
        },
        type10: { span: 24, type: 'slot' },
        // 10 任意 时分秒 时间段 选择器
        timeRangePicker1: {
          span: 12,
          type: 'timeRangePicker',
          label: '时分秒时间段',
          isRequired: true,
          props: {},
        },
        type11: { span: 24, type: 'slot' },
        switch: {
          span: 12,
          type: 'switch',
          label: '开关',
          isRequired: true,
          defaultVal: 0,
          props: {
            activeValue: 1,
            inactiveValue: 0,
          },
        },
        type12: { span: 24, type: 'slot' },
        // 12 单选按钮组
        myRadio: {
          span: 12,
          type: 'radioGroup',
          label: '单选按钮组',
          isRequired: true,
          // props: { disabled: true },
          defaultValue: '1',
          options: [
            { value: '1', label: '显示111' },
            { value: '2', label: '显示222' },
          ],
        },
        type13: { span: 24, type: 'slot' },
        // 13 单选下拉
        BaseSelect: {
          span: 12,
          type: 'select',
          label: '单选下拉',
          isRequired: true,
          props: { valueText: 'code', allowCreate: true },
          // props: { valueKey: 'value', filterable: true },
          defaultValue: '2',
          options: [
            { code: '1', label: '下拉显示111' },
            { code: '2', label: '下拉显示222' },
            { code: '3', label: '下拉显示333', disabled: true },
          ],
        },
        type14: { span: 24, type: 'slot' },
        // 14 多选下拉
        mulSelect: {
          span: 12,
          type: 'mulSelect',
          label: '多选下拉',
          isRequired: true,
          // props: { valueKey: 'value',  },
          props: {
            'collapse-tags': true,
            // tagMaxWidth: '80px',
          },
          defaultValue: ['2'],
          options: [
            { value: '1', label: '下拉显下拉显下拉显下拉显示111' },
            { value: '3', label: '下拉显示333' },
            { value: '2', label: '下拉显示222' },
          ],
          events: {
            change(val, b) {
              console.log(val, b)
              console.log(this)
              // this.fields1[0].defaultValue = '444'
            },
          },
        },
        // 14 多选下拉
        mulSelect2: {
          span: 12,
          type: 'mulSelect',
          label: '多选下拉2',
          isRequired: true,
          // props: { valueKey: 'value',  },
          props: {
            tagMaxWidth: '120px', // 表示tag最大宽度
            'collapse-tags': true,
          },
          defaultValue: ['2', '3'],
          options: [
            { value: '1', label: '下拉显下拉显下拉显下拉显示111' },
            { value: '3', label: '下拉显示333' },
            { value: '2', label: '下拉显示222' },
          ],
        },

        defSlot: {
          span: 24,
          type: 'slot',
          label: '自定义slot',
          events: {
            click: function (e) {
              console.log(e)
            },
          },
        },
      },
      // toggleFields 用于控制多查询条件,展开与收起的切换字段,内容同fields
      toggleFields: {
        tField1: { label: '切换字段1', span: 12 },
        tField2: { label: '切换字段2', span: 12 },
        tField3: { label: '切换字段3', span: 12 },
      },
    }
  },
  methods: {
    clickSlot(e) {
      console.log('clickSlot', e)
    },
    onSubmit(form, valid) {
      console.log('校验结果', valid, { ...form })
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
        myRadio: '2',
        // BaseSelect: { value: '1', label: '下拉显示111' }
        BaseSelect: '2',
      }
      this.$refs.formRef.setForm(temp_obj)
    },
    getForm() {
      console.log('取值', this.$refs.formRef.form)
    },
    validForm() {
      this.$refs.formRef.submit().then((valid) => {
        // console.log('校验结果', valid)
        if (!valid) return
        this.$message.success('校验通过!')
      })
    },
  },
}
</script>

<style lang="sass" scoped></style>
