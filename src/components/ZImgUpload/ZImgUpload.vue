<template>
  <div class="upload-file">
    <el-upload
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      list-type="picture-card"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :show-file-list="true"
      :headers="headers"
      class="upload-file-uploader"
      ref="upload"
      name="filePath"
      :data="uploadData"
      :class="{ hide: this.fileList.length >= this.limit }"
    >
      <i class="el-icon-plus"></i>
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
    </el-upload>

    <!-- 文件列表 -->
    <!-- <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
      <li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in fileList"> -->
    <!-- <el-link :href="`${baseUrl}${file.url}`" :underline="false" target="_blank">
          <span class="el-icon-document"> {{ getFileName(file.name) }} </span>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link :underline="false" @click="handleDelete(index)" type="danger">删除</el-link>
        </div> -->
    <!-- <img :src="file.url" alt="" />
      </li>
    </transition-group> -->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { fileServer, fileUploadUrlStr } from '@/api/upload'

export default {
  name: 'ZImgUpload',
  props: {
    // 值
    value: [String, Object, Array],
    // 数量限制
    limit: { type: Number, default: 2 },
    // 大小限制(MB)
    fileSize: { type: Number, default: 5 },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg'],
      // default: () => ['doc', 'xls', 'ppt', 'txt', 'pdf'],
    },
    // 是否显示提示
    isShowTip: { type: Boolean, default: false },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadFileUrl: process.env.VUE_APP_BASE_API + fileUploadUrlStr, // 上传的图片服务器地址
      headers: { Authorization: getToken() },
      fileList: [],
      uploadData: { originalFileName: '' },
      dialogImageUrl: '',
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',')
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === 'string') {
              if (item.indexOf(fileServer) === -1) item = fileServer + item
              item = { name: item, url: item }
            }
            item.uid = item.uid || new Date().getTime() + temp++
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
  },
  methods: {
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url
      // this.dialogVisible = true
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      this.uploadData.originalFileName = file.name.split('.')[0]
      if (this.fileType) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join('/')}格式文件!`)
          return false
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      return true
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`)
    },
    // 上传失败
    handleUploadError() {
      this.$message.error('上传失败, 请重试')
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      this.$message.success('上传成功')
      this.fileList.push({ name: res, url: fileServer + res })
      this.$emit('input', this.listToString(this.fileList))
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1)
      this.$emit('input', this.listToString(this.fileList))
    },
    handleRemove(file) {
      const index = this.fileList.findIndex((i) => i.uid === file.uid)
      this.fileList.splice(index, 1)
      this.$emit('input', this.listToString(this.fileList))
    },
    // 获取文件名称
    getFileName(name) {
      if (name?.lastIndexOf('/') > -1) {
        return name.slice(name.lastIndexOf('/') + 1).toLowerCase()
      } else {
        return ''
      }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = ''
      separator = separator || ','
      for (const i in list) {
        strs += list[i].url + separator
      }
      return strs !== '' ? strs.substr(0, strs.length - 1) : ''
    },
  },
}
</script>

<style scoped lang="scss">
// .upload-file-uploader {
//   margin-bottom: 5px;
// }
// .upload-file-list .el-upload-list__item {
//   border: 1px solid #e4e7ed;
//   line-height: 2;
//   margin-bottom: 10px;
//   position: relative;
// }
// .upload-file-list .ele-upload-list__item-content {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   color: inherit;
// }
// .ele-upload-list__item-content-action .el-link {
//   margin-right: 10px;
// }
// .el-upload--picture-card 控制加号部分
::v-deep.hide .el-upload--picture-card {
  display: none;
}
/*去除upload组件过渡效果*/
.el-upload-list__item {
  transition: none !important;
}
.el-upload-list__item-thumbnail {
  /* 图片在方框内显示长边 */
  object-fit: scale-down !important;
}
/*去除upload组件过渡效果*/
::v-deep .el-upload-list__item {
  transition: none !important;
}
::v-deep .el-upload-list__item-thumbnail {
  /* 图片在方框内显示长边 */
  object-fit: scale-down !important;
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
</style>
