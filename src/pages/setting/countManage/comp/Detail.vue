<template>
  <ZDialog
    :title="title"
    :visible.sync="visible"
    :before-close="() => $emit('update:visible', false)"
    :hasFooter="false"
    @cancelBtn="cancelBtn"
    @sureBtn="sureBtn"
    @close="close"
    v-if="visible"
  >
    <MyCard style="height: 70vh; min-height: 630px; overflow: auto">
      <!-- 步骤 1  -->
      <div>
        <ZForm ref="addFormRef" :fields="fields" :hasControl="false" labelWidth="190px" :disabled="isCheck">
          <div class="flex justify-center align-center m-15" slot="userPic" slot-scope="{ data }">
            <ZImageUpload v-model="data.userPic" :limit="1">
              <div style="line-height: 30px">
                <div><el-avatar icon="el-icon-s-custom"></el-avatar></div>
                <div>点击上传头像</div>
              </div>
            </ZImageUpload>
          </div>
        </ZForm>
      </div>

      <!-- 步骤 2  -->
      <div style="padding: 0 180px">
        <div class="mt-10 mb-10"><strong>权限菜单选择</strong></div>
        <div class="pt-10 pb-10" style="height: calc(70vh - 260px); min-height: 340px; border: 1px solid #eee">
          <el-scrollbar>
            <el-tree
              :data="menuTreeData"
              show-checkbox
              default-expand-all
              :expand-on-click-node="false"
              check-on-click-node
              node-key="menuCode"
              ref="menuTreeRef"
              highlight-current
              :props="defaultProps"
            >
            </el-tree>
          </el-scrollbar>
        </div>

        <div class="mt-10 mb-10"><strong>仓库数据权限选择</strong></div>
        <el-checkbox-group v-model="checkList" :disabled="isCheck">
          <el-checkbox v-for="i in storeList" :label="i.whNo" :key="i.whNo">{{ i.whName }}</el-checkbox>
        </el-checkbox-group>

        <div class="mt-10 mb-10">
          <strong class="mr-15">状态</strong>
          <el-switch
            v-model="status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="isCheck"
          >
          </el-switch>
        </div>

        <div class="flex justify-center mb-20">
          <el-button type="primary" @click="toFinish" v-if="!isCheck">提交完成</el-button>
          <el-button type="primary" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
    </MyCard>
  </ZDialog>
</template>

<script>
import { fileServer } from '@/components/ZUpload/uploadAPI.js'
import { httpchooseWhs, httpchooseMenuTree, httpinfo, httpaddUser, httpeditUser } from '@/api/setting/countManage'

export default {
  name: 'Detail',
  props: {
    visible: { type: Boolean, default: false },
    dialogType: { type: String, default: 'add' },
    userCode: { type: String },
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        const titleEnum = { add: '新增系统账号', edit: '编辑系统账号', check: '查看系统账号' }
        this.title = titleEnum[this.dialogType]
        if (!val) return (this.active = 0)
        httpchooseWhs().then((res) => (this.storeList = res))
        httpchooseMenuTree().then((res) => {
          function ddd(arr) {
            arr.forEach((i) => {
              i.disabled = true
              if (i.list) ddd(i.list)
            })
            return arr
          }
          if (this.isCheck) {
            res = ddd(res)
          }
          this.menuTreeData = res
        })
        if (!val || this.dialogType === 'add') return // 新增时候不查详情接口
        httpinfo(this.userCode).then((res) => {
          // 为表单赋值
          for (const k in this.fields) this.$refs.addFormRef.form[k] = res[k]
          this.status = res.status
          this.checkList = res.authWh
          this.$refs.menuTreeRef.setCheckedKeys(res.authMenu) // 设置选中的节点
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
      active: 0,
      title: '',
      fields: {
        userPic: { span: 20, type: 'slot', label: '头像', isRequired: true },
        userName: { type: 'input', span: 20, label: '用户真实姓名', isRequired: true },
        userMail: { type: 'input', span: 20, label: '邮箱', isRequired: true },
        userMobile: { type: 'input', span: 20, label: '手机号', isRequired: true },
        password: {
          type: 'input',
          span: 20,
          label: '密码 ',
          isRequired: true,
          isShow: (form) => {
            return this.isAdd
          },
        },
        password2: {
          type: 'input',
          span: 20,
          label: '确认密码',
          isShow: (form) => {
            return this.isAdd
          },
          rule: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value !== this.$refs.addFormRef.form.password) callback(new Error('两次密码输入不一致!'))
                callback()
              },
              trigger: 'blur',
            },
          ],
        },
        userMemo: { type: 'textarea', span: 20, label: '备注信息' },
      },

      checkList: [],
      storeList: [], // 仓库候选项
      status: 0,

      menuTreeData: [],
      defaultProps: {
        children: 'list',
        label: 'menuName',
      },
    }
  },
  methods: {
    async toFinish() {
      const valid = await this.$refs.addFormRef.submit()
      if (!valid) return

      const userMenu = this.$refs.menuTreeRef.getCheckedKeys() // 用户选中的菜单数据

      // 对文件地址单独处理
      const imgKeyArr = ['userPic']
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
      if (!userMenu.length) return this.$message.error('请选择菜单权限')
      if (!this.checkList.length) return this.$message.error('请选择仓库数据权限')
      const obj = {
        ...this.$refs.addFormRef.form,
        userWh: this.checkList,
        userMenu,
        status: this.status,
      }
      if (this.isEdit) obj.userCode = this.userCode
      ;(this.isAdd ? httpaddUser : httpeditUser)(obj).then((res) => {
        this.$message.success(`${this.isAdd ? '新增' : '编辑'}成功!`)
        this.$emit('refresh')
        this.active = 3
        // this.$emit('update:visible', false)
      })
    },
    cancelBtn() {
      this.$emit('update:visible', false)
    },
    close() {},

    sureBtn() {
      console.log({ ...this.$refs.addFormRef.form })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding-bottom: 0;
}
::v-deep .el-switch__core {
  width: 55px !important;
}
.el-switch {
  &:after {
    content: '关闭';
    font-size: 10px;
    color: #fff;
    position: absolute;
    left: 22px;
  }
  &.is-checked:after {
    content: '开启';
    font-size: 10px;
    color: #fff;
    position: absolute;
    left: 8px;
  }
}
</style>
