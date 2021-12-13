<template>
  <div>
    <div>123</div>
    <z-form :fields="fields1" :toggleFields="toggleFields" label-width="160px" @submit="onSubmit" ref="aaa"> </z-form>
  </div>
</template>

<script>
import ZForm from '@/components/ZForm'
export default {
  components: { ZForm },
  data() {
    return {
      fields1: [
        // 1 默认输入类型为input
        {
          // type:'input',// 默认类型
          label: '用户名',
          key: 'name',
          // isRequired: true,
          isShow: function (form) {
            console.log(form)
            return true
          },
          rule: [
            {
              validator: (rule, value, callback) => {
                if (value === '') callback(new Error('请输入XXX'))
              },
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (value === '111222') callback(new Error('值不可为111222'))
              },
              trigger: 'change'
            }
          ],
          span: 12,
          defaultValue: 'defaultValue',
          props: { placeholder: '8888' /* disabled: true */ }
        }
        // // 2 单个 checkbox
        // { type: 'checkbox', title: '是否同意协议', key: 'isAgree', isRequired: true }
      ],
      toggleFields: [
        {
          // type:'input',// 默认类型
          label: '用户名222',
          key: 'name22'
        }
      ]
    }
  },
  methods: {
    onSubmit(form, valid) {
      console.log(form, valid)
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
