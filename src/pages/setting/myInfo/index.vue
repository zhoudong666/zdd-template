<template>
  <MyCard class="flex justify-center">
    <div style="width: 600px">
      <ZForm ref="addFormRef" :fields="fields" :hasControl="false">
        <div class="flex justify-center align-center m-15" slot="userPic" slot-scope="{ data }">
          <ZImageUpload v-model="data.userPic" :limit="1">
            <div style="line-height: 30px">
              <div><el-avatar icon="el-icon-s-custom"></el-avatar></div>
              <div>点击上传头像</div>
            </div>
          </ZImageUpload>
        </div>
      </ZForm>

      <div class="text-center">
        <el-button type="primary" @click="saveInfo">保存</el-button>
      </div>
    </div>
  </MyCard>
</template>

<script>
import { fileServer } from '@/components/ZUpload/uploadAPI.js'
import { httpuserInfo, httpmodSelfUser } from '@/api/setting/myInfo'
export default {
  name: 'myInfo',
  created() {
    httpuserInfo().then((res) => {
      for (const k in this.fields) this.$refs.addFormRef.form[k] = res[k]
    })
  },
  data() {
    return {
      fields: {
        userPic: { type: 'slot', label: '头像', isRequired: true },
        loginUser: { type: 'input', span: 20, label: '账号', props: { disabled: true } },
        userName: { type: 'input', span: 20, label: '用户姓名', isRequired: true },
        userMobile: { type: 'input', span: 20, label: '联系方式', props: { disabled: true } },
        userMail: { type: 'input', span: 20, label: '邮箱' },
        userMemo: { type: 'input', span: 20, label: '描述' },
      },
    }
  },
  methods: {
    saveInfo() {
      this.$refs.addFormRef.submit().then((valid) => {
        if (!valid) return
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

        httpmodSelfUser(this.$refs.addFormRef.form).then((res) => {
          this.$message.success('编辑成功!')
          // this.$emit('update:visible', false)
          // this.$emit('refresh')
          this.$store.dispatch('user/getInfo')
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
