<template>
  <ZDialog
    :title="title"
    cancelBtnText="关闭"
    width="80%"
    :visible.sync="visible"
    :before-close="() => $emit('update:visible', false)"
    @cancelBtn="cancelBtn"
    @sureBtn="sureBtn"
    @close="close"
    :oneBtn="isCheck"
    v-if="visible"
  >
    <MyCard>
      <div slot="header">基本信息</div>
      <ZForm ref="addFormRef" :fields="fields" :hasControl="false" labelWidth="120px" :disabled="isExist || isCheck">
        <template slot="circuIdCard" slot-scope="{ data }">
          <input
            type="search"
            v-model.trim="data.circuIdCard"
            class="like-input"
            @change="circuIdCardChange"
            :disabled="isCheck"
          />
        </template>

        <template slot="circuIdCardImg" slot-scope="{ data }">
          <ZImageUpload :limit="2" v-model="data.circuIdCardImg" :disabled="isCheck"></ZImageUpload>
        </template>
        <template slot="envProcTrainCert" slot-scope="{ data }">
          <ZFileUpload :limit="2" v-model="data.envProcTrainCert" :disabled="isCheck"></ZFileUpload>
        </template>
        <template slot="carryTrainCert" slot-scope="{ data }">
          <ZFileUpload :limit="2" v-model="data.carryTrainCert" :disabled="isCheck"></ZFileUpload>
        </template>
      </ZForm>
    </MyCard>
  </ZDialog>
</template>

<script>
import { fileServer } from '@/components/ZUpload/uploadAPI.js'
import {
  httpchooseVehs,
  httpcheckCircu,
  httpaddCircu,
  httpeditCircu,
  httpcircuDetail,
} from '@/api/setting/personSetting'
export default {
  name: 'Detail',
  props: {
    visible: { type: Boolean, default: false },
    dialogType: { type: String, default: 'add' },
    circuNo: { type: String },
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        const titleEnum = { add: '新增人员', edit: '编辑人员', check: '查看人员' }
        this.title = titleEnum[this.dialogType]
        if (!val) return
        httpchooseVehs().then((res) => {
          this.fields.vehType.options = res.map((i) => ({ value: i.code, label: i.name }))
        })
        if (!val || this.dialogType === 'add') return // 新增时候不查详情接口

        httpcircuDetail(this.circuNo).then((res) => {
          // 为表单赋值
          for (const k in this.fields) this.$refs.addFormRef.form[k] = res[k]
          this.$nextTick(() => {
            // 为省市区级联赋值
            for (const k in this.areaObj) this.areaObj[k] = res[k]
          })
        })
      },
    },
  },
  computed: {
    isCheck() {
      return this.dialogType === 'check'
    },
    isAdd() {
      return this.dialogType === 'add'
    },
    isEdit() {
      return this.dialogType === 'edit'
    },
  },
  data() {
    return {
      title: '',
      isExist: false, // 仓库是否包含人员
      fields: {
        circuNo: { type: 'input', span: 8, label: '人员编号', props: { disabled: true, placeholder: '自动填充' } },
        circuIdCard: { type: 'slot', span: 8, label: '身份证号', isRequired: true },

        circuName: { type: 'input', span: 8, label: '物流人员名称' },
        circuSex: {
          type: 'radioGroup',
          span: 8,
          label: '性别 ',
          defaultValue: 'M',
          options: [
            { label: '男', value: 'M' },
            { label: '女', value: 'F' },
          ],
        },
        circuMobile: { type: 'input', span: 8, label: '联系电话' },
        vehType: { type: 'select', span: 8, label: '车辆类别', options: [{ label: '111', value: '1' }] },
        circuType: {
          type: 'select',
          span: 8,
          label: '人员性质',
          options: [
            { value: 0, label: '直营人员' },
            { value: 1, label: '外包人员' },
          ],
        },
        bankCard: { type: 'input', span: 8, label: '银行卡号' },
        circuMail: { type: 'input', span: 8, label: '邮箱' },
        vehNo: { type: 'input', span: 8, label: '车牌号' },
        userMemo: { type: 'textarea', span: 16, label: '描述' },

        circuIdCardImg: { span: 24, type: 'slot', label: '身份证正反面照片', isRequired: true },
        envProcTrainCert: { span: 24, type: 'slot', label: '环保应急知识培训附件' },
        carryTrainCert: { span: 24, type: 'slot', label: '运输安全知识培训附件' },
      },
    }
  },
  methods: {
    circuIdCardChange(e) {
      const val = e.target.value
      if (!val) {
        this.isExist = false
        this.$refs.addFormRef.reset()
        return
      }
      httpcheckCircu(val).then((res) => {
        const { existFlag, circu } = res
        this.fields.circuName.props = { disabled: true }
        if (existFlag === '0') {
          this.isExist = false
        } else {
          this.$message.success('仓库中已存在该人员,信息不可修改!')
          this.isExist = true
          for (const k in this.$refs.addFormRef.form) {
            this.$refs.addFormRef.form[k] = circu[k]
          }
        }
      })
    },
    cancelBtn() {
      this.$emit('update:visible', false)
    },
    close() {},

    sureBtn() {
      this.$refs.addFormRef.submit().then((valid) => {
        if (!valid) return
        // 对文件地址单独处理
        const imgKeyArr = ['circuIdCardImg', 'envProcTrainCert', 'carryTrainCert']
        for (const k in this.$refs.addFormRef.form) {
          const item = this.$refs.addFormRef.form[k]
          if (imgKeyArr.includes(k) && item) {
            const urlArr = item.split(',')
            this.$refs.addFormRef.form[k] = urlArr
              .map((i) => {
                const urlStr = i.split(fileServer)
                return urlStr.length === 2 ? urlStr[1] : urlStr
              })
              .join(',')
          }
        }
        ;(this.isAdd ? httpaddCircu : httpeditCircu)(this.$refs.addFormRef.form).then((res) => {
          this.$message.success(`${this.isAdd ? '新增' : '编辑'}成功!`)
          this.$emit('update:visible', false)
          this.$emit('refresh')
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding-bottom: 0;
}
::v-deep .el-select {
  width: 100%;
}
.like-input {
  width: 100%;
  outline: 0;
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  &:focus {
    border: 1px solid #409eff;
  }
}
</style>
