<template>
  <div class="component-upload-image">
    <el-upload
      multiple
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      ref="imageUpload"
      :on-remove="handleDelete"
      :show-file-list="true"
      :headers="headers"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :class="{ hide: this.fileList.length >= this.limit || disabled }"
      :accept="acceptLimit"
      name="filePath"
      :data="uploadData"
      v-bind="$attrs"
      :disabled="disabled"
    >
      <div class="inner-content">
        <slot><i class="el-icon-plus"></i></slot>
      </div>
    </el-upload>

    <!-- 上传提示 -->
    <div class="el-upload__tip" slot="tip" v-if="showTip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
      </template>
      的文件
    </div>

    <el-dialog :visible.sync="dialogVisible" title="预览" width="800" append-to-body>
      <img :src="dialogImageUrl" style="display: block; max-width: 100%; margin: 0 auto" />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { fileServer, fileUploadUrlStr } from '@/api/upload'

export default {
  name: 'ZImageUpload',
  props: {
    value: [String, Object, Array],
    // 图片数量限制
    limit: { type: Number, default: 5 },
    // 大小限制(MB)
    fileSize: { type: Number, default: 50 },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg'],
    },
    // 是否显示提示
    isShowTip: { type: Boolean, default: false },
    disabled: { type: Boolean },
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadImgUrl: process.env.VUE_APP_BASE_API + fileUploadUrlStr, // 上传的图片服务器地址
      headers: { Authorization: getToken() },
      fileList: [],
      isResponseStr: true,
      uploadData: { originalFileName: '' },
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',')
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === 'string') {
              this.isResponseStr = true
              // =========== 本项目特殊处理,图片地址不包含域名,再此加上可回显
              if (item.indexOf(fileServer) === -1) item = fileServer + item
              // if (item.indexOf(this.baseUrl) === -1) {
              //     item = { name: this.baseUrl + item, url: this.baseUrl + item };
              // } else {
              item = { name: item, url: item }
              // }
            } else {
              this.isResponseStr = false
            }
            return item
          })
        } else {
          this.fileList = []
          return []
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize)
    },
    // 用于控制文件选择框过滤文件
    acceptLimit() {
      return this.fileType.map((i) => '.' + i).join()
    },
  },
  methods: {
    // 上传前loading加载
    handleBeforeUpload(file) {
      this.uploadData.originalFileName = file.name.split('.')[0]
      let isImg = false
      if (this.fileType.length) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        isImg = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
      } else {
        isImg = file.type.indexOf('image') > -1
      }

      if (!isImg) {
        this.$message.error(`文件格式不正确, 请上传${this.fileType.join('/')}图片格式文件!`)
        return false
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传头像图片大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      this.$modal.loading('正在上传图片，请稍候...')
      this.number++
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`)
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      // if (res.code === 200) {
      if (typeof res === 'string') {
        this.uploadList.push({ name: res, url: fileServer + res })
        this.uploadedSuccessfully()
      } else {
        this.number--
        this.$modal.closeLoading()
        this.$message.error(res.msg)
        this.$refs.imageUpload.handleRemove(file)
        this.uploadedSuccessfully()
      }
    },
    // 删除图片
    handleDelete(file) {
      const findex = this.fileList.map((f) => f.name).indexOf(file.name)
      if (findex > -1) {
        this.fileList.splice(findex, 1)
        const urlData = this.isResponseStr ? this.listToString(this.fileList) : this.fileList
        this.$emit('input', urlData)
      }
    },
    // 上传失败
    handleUploadError() {
      this.$message.error('上传图片失败，请重试')
      this.$modal.closeLoading()
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList)
        this.uploadList = []
        this.number = 0
        const urlData = this.isResponseStr ? this.listToString(this.fileList) : this.fileList
        this.$emit('input', urlData)
        this.$modal.closeLoading()
      }
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = ''
      separator = separator || ','
      for (const i in list) {
        if (list[i].url) {
          strs += list[i].url.replace(this.baseUrl, '') + separator
          // strs += list[i].url + separator
        }
      }
      return strs !== '' ? strs.substr(0, strs.length - 1) : ''
    },
  },
}
</script>
<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
::v-deep.hide .el-upload--picture-card {
  display: none;
}
// 去掉动画效果
::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: all 0s;
}

::v-deep .el-list-enter,
.el-list-leave-active {
  opacity: 0;
  transform: translateY(0);
}
.inner-content {
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
