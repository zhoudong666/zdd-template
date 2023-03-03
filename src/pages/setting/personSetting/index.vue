<template>
  <MyCard>
    <ZForm
      ref="formRef"
      :fields="fields"
      submitText="查询"
      @submit="queryList"
      @reset="queryList"
      :controlSpan="24"
    ></ZForm>

    <el-row class="mb-15">
      <el-button type="primary" @click="addDetail"><i class="el-icon-plus"></i> 新建</el-button>
      <!-- <el-button><i class="el-icon-download"></i> 导出</el-button> -->
    </el-row>

    <ZTable :columns="columns" :query="query" :isSelection="false">
      <template slot="circuSex" slot-scope="{ data: { row } }">
        {{ circuSexEnum[row.circuSex] }}
      </template>
      <template slot="circuType" slot-scope="{ data: { row } }">
        {{ circuTypeEnum[row.circuType] }}
      </template>
      <template slot="corpBind" slot-scope="{ data: { row } }">
        {{ corpBindEnum[row.corpBind] }}
      </template>
      <template slot="status" slot-scope="{ data: { row } }">
        {{ statusEnum[row.status] }}
      </template>
      <template slot="qr" slot-scope="{ data: { row } }">
        <el-button type="text" @click="seeQr(row.qrBean)"> 预览 </el-button>
        <el-button type="text" @click="previewQR(row)"> 下载 </el-button>
      </template>
      <template slot="operate" slot-scope="{ data: { row } }">
        <el-button type="text" @click="checkDetail(row)"> 查看 </el-button>
        <el-button type="text" @click="editDetail(row)"> 编辑 </el-button>
        <el-button type="text" @click="del(row)" class="text-red"> 删除 </el-button>
      </template>
    </ZTable>

    <Detail :visible.sync="isDetail" :dialogType="dialogType" :circuNo="circuNo" @refresh="queryList" />
    <CheckQR v-if="isCheckQR" :visible.sync="isCheckQR" :qrText="qrText"></CheckQR>
    <MyQrDialog :visible.sync="isMyQrDialog" :qrObj="qrObj"></MyQrDialog>
  </MyCard>
</template>

<script>
import { httpcircuList, httpdeleteCircu } from '@/api/setting/personSetting'
import Detail from './comp/Detail'
import CheckQR from './comp/CheckQR'
export default {
  name: 'personSetting',
  components: { Detail, CheckQR },
  data() {
    return {
      fields: {
        circuMobile: { type: 'input', span: 8, label: '人员手机号码' },
        circuName: { type: 'input', span: 8, label: '人员名称' },
        circuNo: { type: 'input', span: 8, label: '人员编号' },
        circuType: {
          type: 'select',
          span: 8,
          label: '人员性质',
          defaultValue: 0,
          options: [
            { value: 0, label: '全部' },
            { value: 1, label: '直营人员' },
            { value: 2, label: '外包人员' },
          ],
          events: {
            change: (val) => {
              if (!val) this.$refs.formRef.form.circuType = 0
            },
          },
        },
        corpBind: {
          type: 'select',
          span: 8,
          label: '公司绑定状态',
          defaultValue: 0,
          options: [
            { value: 0, label: '全部' },
            { value: 1, label: '待绑定' },
            { value: 2, label: '已绑定' },
            { value: 3, label: '已解绑' },
          ],
          events: {
            change: (val) => {
              if (!val) this.$refs.formRef.form.corpBind = 0
            },
          },
        },
        status: {
          type: 'select',
          span: 8,
          label: '审核状态',
          defaultValue: 0,
          options: [
            { value: 0, label: '全部' },
            { value: 1, label: '未认证' },
            { value: 2, label: '已认证' },
            { value: 3, label: '认证不通过' },
          ],
          events: {
            change: (val) => {
              if (!val) this.$refs.formRef.form.status = 0
            },
          },
        },
      },
      circuSexEnum: { M: '男', F: '女' },
      circuTypeEnum: { 0: '直营人员', 1: '外包人员' },
      corpBindEnum: { 0: '待绑定', 1: '已绑定', 2: '已解绑' },
      statusEnum: { 0: '未认证', 1: '已认证', 2: '认证不通过' },
      columns: [
        { label: '物流人员编号', prop: 'circuNo' },
        { label: '物流人员名称', prop: 'circuName' },
        { label: '人员性质', __slotName: 'circuType' },
        { label: '身份证号', prop: 'circuIdCard', minWidth: 200 },
        { label: '性别', __slotName: 'circuSex' },
        { label: '关联公司状态', __slotName: 'corpBind' },
        { label: '联系电话', prop: 'circuMobile' },
        { label: '车辆类型', prop: 'vehTypeDesc' },
        { label: '车牌号', prop: 'vehNo' },
        { label: '审核状态', __slotName: 'status' },
        { label: '二维码', __slotName: 'qr', fixed: 'right', width: 100 },
        { label: '操作', __slotName: 'operate', fixed: 'right', width: 130 },
      ],
      query: httpcircuList(),
      isDetail: false,
      isCheckQR: false,
      qrText: '',
      circuNo: '',
      dialogType: 'add',

      qrObj: {},
      isMyQrDialog: false,
    }
  },
  methods: {
    queryList(form, valid) {
      this.query.queryParam = { ...this.$refs.formRef.form }
    },

    addDetail(row) {
      this.isDetail = true
      // this.circuNo = row.circuNo
      this.dialogType = 'add'
    },
    editDetail(row) {
      this.isDetail = true
      this.circuNo = row.circuNo
      this.dialogType = 'edit'
    },
    checkDetail(row) {
      this.isDetail = true
      this.circuNo = row.circuNo
      this.dialogType = 'check'
    },
    // 预览二维码
    previewQR(row) {
      this.isCheckQR = true
      // this.qrText = row.name
      this.qrText = row.qr
    },
    del(row) {
      this.zConfirm('确认删除当前行数据?', () => {
        httpdeleteCircu(row.circuNo).then(() => {
          this.$message.success('删除成功!')
          this.queryList()
        })
      })
    },

    seeQr(obj) {
      if (!obj || !Object.keys(obj).length) return this.$message.warning('暂无信息')
      this.isMyQrDialog = true
      const { circuName, qr, circuType, circuNo, corpName, vehTypeDesc, circuMobile, vehNo, userPeriod } = obj
      this.qrObj = {
        title: circuName,
        No: circuNo,
        qr,
        infoArr: [
          { label: '人员编号', value: circuNo },
          { label: '隶属公司', value: corpName },
          { label: '人员性质', value: circuType ? '外包人员' : '直营人员' },
          { label: '手机号码', value: circuMobile },
          { label: '车辆类别', value: vehTypeDesc },
          { label: '车牌号', value: vehNo },
          { label: '有效期', value: userPeriod },
        ],
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
