<template>
  <MyCard>
    <ZForm ref="formRef" :fields="fields" submitText="查询" @submit="queryList" @reset="queryList"></ZForm>

    <el-row class="mb-15">
      <el-button type="primary" @click="addDetail"><i class="el-icon-plus"></i> 新建</el-button>
      <!-- <el-button><i class="el-icon-download"></i> 导出</el-button> -->
    </el-row>

    <ZTable :columns="columns" :query="query" :isSelection="false">
      <template slot="userPic" slot-scope="{ data: { row } }">
        <el-avatar :size="40" :src="row.userPic" shape="square"></el-avatar>
      </template>
      <template slot="status" slot-scope="{ data: { row } }"> {{ statusEnum[row.status] }} </template>
      <template slot="userType" slot-scope="{ data: { row } }"> {{ userTypeEnum[row.userType] }} </template>
      <template slot="operate" slot-scope="{ data: { row } }">
        <el-button type="text" @click="checkDetail(row)"> 查看 </el-button>
        <el-button type="text" @click="editDetail(row)"> 编辑 </el-button>
        <el-button type="text" @click="del(row)" class="text-red"> 删除 </el-button>
      </template>
    </ZTable>

    <Detail :visible.sync="isDetail" :dialogType="dialogType" :userCode="userCode" @refresh="queryList" />
    <CheckQR v-if="isCheckQR" :visible.sync="isCheckQR" :qrText="qrText"></CheckQR>
  </MyCard>
</template>

<script>
import { httpuserList, httpdeleteUser } from '@/api/setting/countManage'
import Detail from './comp/Detail'
import CheckQR from './comp/CheckQR'
export default {
  name: 'countManage',
  components: { Detail, CheckQR },
  data() {
    return {
      fields: {
        userMobile: { type: 'input', span: 6, label: '用户号码' },
        userName: { span: 6, type: 'input', label: '用户名字' },
      },
      statusEnum: { 0: '正常', 1: '禁用' },
      userTypeEnum: { 0: '普通用户', 1: '管理员' },
      columns: [
        { label: '用户编号', prop: 'userCode', minWidth: 150 },
        { label: '用户姓名', prop: 'userName' },
        { label: '头像', __slotName: 'userPic' },
        { label: '联系电话', prop: 'userMobile' },
        { label: '邮箱', prop: 'userMail' },
        { label: '启用状态', __slotName: 'status' },
        { label: '注册时间', prop: 'userRegtime', minWidth: 150 },
        { label: '角色', __slotName: 'userType', minWidth: 150 },
        { label: '最后登录时间', prop: 'userLasttime', minWidth: 150 },
        { label: '最后登录IP', prop: 'userLastip' },
        { label: '操作', __slotName: 'operate', fixed: 'right', width: 160 },
      ],
      query: httpuserList(),
      isDetail: false,
      isCheckQR: false,
      qrText: '',

      userCode: '',
      dialogType: 'add',
    }
  },
  methods: {
    queryList(form, valid) {
      this.query.queryParam = { ...this.$refs.formRef.form }
    },

    addDetail(row) {
      this.isDetail = true
      // this.userCode = row.userCode
      this.dialogType = 'add'
    },
    editDetail(row) {
      this.isDetail = true
      this.userCode = row.userCode
      this.dialogType = 'edit'
    },
    checkDetail(row) {
      this.isDetail = true
      this.userCode = row.userCode
      this.dialogType = 'check'
    },
    del(row) {
      this.zConfirm('确认删除当前行数据?', () => {
        httpdeleteUser(row.userCode).then(() => {
          this.$message.success('删除成功!')
          this.queryList()
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
