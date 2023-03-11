<template>
  <ZDialog
    :title="title"
    :visible.sync="visible"
    :before-close="() => $emit('update:visible', false)"
    :append-to-body="true"
    @sureBtn="sureBtn"
    @cancelBtn="cancelBtn"
    @close="close"
    :width="width"
  >
    <ZForm ref="addFormRef" :fields="fields" :hasControl="false" labelWidth="128px"></ZForm>
  </ZDialog>
</template>

<!-- 使用 -->
<!-- <ZTextareaDialog
        inputType="input"
        title="该出库单未填写联单号，是否现在填写"
        label="出库联单号"
        v-model="transNo"
        :visible.sync="isZTextareaDialog"
        @sureBtn="textareaSure"
        @cancelBtn="textareaCancel"
      />

      isZTextareaDialog: false,
      transNo: '',

      textareaSure() {
        console.log('确认按钮')
      },
      textareaCancel() {
        console.log('取消按钮')
      },

      -->

<script>
export default {
  name: 'ZTextareaDialog',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: 'my title' },
    label: { type: String, default: 'label' },
    width: { type: String, default: '400px' },
    isRequired: { type: Boolean, default: false },
    inputType: { type: String, default: 'textarea' },
    value: { type: String, default: '' },
  },
  modal: {
    prop: 'value',
    event: 'input',
  },
  created() {},
  data() {
    return {
      fields: {
        someValue: {
          span: 24,
          type: this.inputType,
          label: this.label,
          isRequired: this.isRequired,
          defaultValue: this.value,
          props: {},
        },
      },
    }
  },

  methods: {
    sureBtn() {
      this.$refs.addFormRef.submit().then((valid) => {
        if (!valid) return
        this.$emit('update:visible', false)
        this.$emit('input', this.$refs.addFormRef.form.someValue)
        this.$emit('sureBtn')
      })
    },
    cancelBtn() {
      this.$emit('update:visible', false)
      this.$emit('cancelBtn')
    },
    close() {},
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  min-width: 600px;
  margin-top: 32vh !important;
}
</style>
