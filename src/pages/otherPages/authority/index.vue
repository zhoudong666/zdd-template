<template>
  <div>
    <div class="logo-box">
      <img src="~@/assets/logo.png" alt="" />
      {{ title }}
    </div>

    <div class="form-box">
      <ZForm
        class="mb-10"
        ref="formRef"
        :fields="fields"
        submitText="查询"
        :controlSpan="24"
        :hasControl="false"
        labelWidth="200px"
      >
        <template slot="pcaCode">
          <div><ZArea :areaObj="areaObj" @change="areaChange"></ZArea></div>
        </template>
        <template slot="corpLic" slot-scope="{ data }">
          <ZImageUpload v-model="data.corpLic"></ZImageUpload>
        </template>
        <template slot="corpLogo" slot-scope="{ data }">
          <ZImageUpload v-model="data.corpLogo" :limit="1"></ZImageUpload>
        </template>
        <template slot="corpPhotos" slot-scope="{ data }">
          <ZImageUpload v-model="data.corpPhotos"></ZImageUpload>
        </template>
        <template slot="busLic" slot-scope="{ data }">
          <ZImageUpload v-model="data.busLic"></ZImageUpload>
        </template>
        <template slot="eiaReply" slot-scope="{ data }">
          <ZImageUpload v-model="data.eiaReply"></ZImageUpload>
        </template>
        <template slot="emergencyFile" slot-scope="{ data }">
          <ZImageUpload v-model="data.emergencyFile"></ZImageUpload>
        </template>
        <template slot="filing" slot-scope="{ data }">
          <ZImageUpload v-model="data.filing"></ZImageUpload>
        </template>
      </ZForm>
    </div>
    <div class="form-box2">
      <div class="p-20 text-center">
        <el-button type="primary" style="width: 370px" @click="toAuth">立即认证</el-button>
        <!-- <el-button class="fr mt-20" type="text" @click="waiting">去等待页</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { fileServer } from '@/components/ZUpload/uploadAPI.js'
import { httpcorpInfo } from '@/api/user'
import { httptoAuthCorp } from '@/api/register'
import { title } from '@/settings'
export default {
  name: 'authority',
  created() {
    httpcorpInfo().then((res) => {
      for (const k in res) if (res[k]) this.$refs.formRef.form[k] = res[k]
      this.$nextTick(() => {
        // 为省市区级联赋值
        for (const k in this.areaObj) this.areaObj[k] = res[k]
      })
    })
  },
  data() {
    return {
      title,
      areaObj: {
        province: '', // 所在省
        city: '', // 所在市
        area: '', // 所在区县
        pcaCode: '', //  '130000000000/130300000000/130303000000', // 省市区代码
      },
      fields: {
        // authDep: '', // 认证部门
        // authDepCode: '', // 认证部门编号
        // authDepUser: '', // 认证人
        // authDepUserCode: '', // 认证人员编号
        // authTime: '', // 认证时间
        // corpStatus: '', // 状态 0:未提交认证 1 未认证 2 已认证 3 认证不通过
        // createTime: '', // 创建时间
        // recoLimit: '', // 年回收量，单位kg
        // updateTime: '', // 更新时间

        corpName: { span: 24, type: 'input', label: '公司名称', props: { disabled: true } },
        corpNo: { span: 24, type: 'input', label: '单位编号', props: { disabled: true } },
        uscc: { span: 24, type: 'input', label: '单位统一信用代码', props: { disabled: true } },
        pcaCode: { span: 24, type: 'slot', label: '经营地', isRequired: true },

        address: { span: 24, type: 'input', label: '联系地址', isRequired: true },
        legal: { span: 24, type: 'input', label: '法人', isRequired: true },
        industry: { span: 24, type: 'input', label: '行业分类', isRequired: true },
        capital: { span: 24, type: 'input', label: '注册资金(万元)', isRequired: true },
        intro: { span: 24, type: 'input', label: '公司简介', isRequired: true },
        manaUser: { span: 24, type: 'input', label: '联系人', isRequired: true },
        manaTel: { span: 24, type: 'input', label: '联系人电话', isRequired: true },
        // lng: { span: 24, type: 'input', label: '经度' },
        // lat: { span: 24, type: 'input', label: '纬度' },
        cateCode: { span: 24, type: 'input', label: '危险类别代码', isRequired: true },
        eiaReplyNo: { span: 24, type: 'input', label: '环评文件号', isRequired: true },
        filingNo: { span: 24, type: 'input', label: '排污许可证文件号', isRequired: true },

        corpLic: { span: 24, type: 'slot', label: '营业执照图片', isRequired: true },
        corpLogo: { span: 24, type: 'slot', label: '公司logo', isRequired: true },
        corpPhotos: { span: 24, type: 'slot', label: '公司相册', isRequired: true },

        busLic: { span: 24, type: 'slot', label: '危险废物经营许可证', isRequired: true },
        busLicTermStr: { span: 24, type: 'datePicker', label: '危险废物经营许可证有效期', isRequired: true },

        eiaReply: { span: 24, type: 'slot', label: '环评文件', isRequired: true },
        eiaReplyTermStr: { span: 24, type: 'datePicker', label: '环评文件有效期', isRequired: true },

        emergencyFile: { span: 24, type: 'slot', label: '应急预案附件', isRequired: true },
        emergencyFileTermStr: { span: 24, type: 'datePicker', label: '应急预案有效期', isRequired: true },

        filing: { span: 24, type: 'slot', label: '排污许可证文件', isRequired: true },
        filingTermStr: { span: 24, type: 'datePicker', label: '排污许可证文件有效期', isRequired: true },
      },

      imgKeyArr: ['corpLic', 'corpLogo', 'corpPhotos', 'busLic', 'eiaReply', 'emergencyFile', 'filing'],
    }
  },
  methods: {
    areaChange(obj) {
      for (const k in obj) this.$refs.formRef.form[k] = obj[k]
    },
    toAuth() {
      this.$refs.formRef.submit().then((valid) => {
        if (!valid) return
        // 对图片地址单独处理
        for (const k in this.$refs.formRef.form) {
          const item = this.$refs.formRef.form[k]
          if (this.imgKeyArr.includes(k) && item) {
            const urlArr = item.split(',')
            this.$refs.formRef.form[k] = urlArr
              .map((i) => {
                const urlStr = i.split(fileServer)
                return urlStr.length === 2 ? urlStr[1] : urlStr
              })
              .join(',')
          }
        }
        httptoAuthCorp(this.$refs.formRef.form).then((res) => {
          this.$message.success('认证消息提交成功!')
          this.$router.push('/waiting')
        })
      })
    },
    waiting() {
      this.$router.push('/waiting')
    },
  },
}
</script>

<style lang="scss" scoped>
.logo-box {
  font-size: 18px;
  padding: 0 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  img {
    vertical-align: middle;
    width: 60px;
  }
}
.form-box {
  width: 660px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: hidden;
  // background: red;
  // border: 1px solid red;
  margin: 40px auto 0;
}
.img-container {
  .left-label {
    width: 200px;
    padding-right: 10px;
    font-size: 14px;
    text-align: right;
    color: #606266;
  }
  .right-img {
    flex: 1;
  }
}
</style>
