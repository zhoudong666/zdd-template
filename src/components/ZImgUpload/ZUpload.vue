<template>
  <div>
    <el-upload
      action="/corp/user/upload/element"
      list-type="picture-card"
      multiple
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="uploadImage"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { httpupload } from '@/api/upload'
export default {
  name: 'ZUpload',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 照片上传前校验
    beforeAvatarUpload(file) {
      const isPic = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5
      // if (!isPic) this.$message.error('照片只能为jpg , png 图片格式!')
      if (!isLt2M) this.$message.error('上传图片大小不能超过 5MB!')
      return isPic && isLt2M
    },
    // 上传图片方法
    uploadImage(param) {
      // // 上传前校验通过
      // // 本地预览 预览 start // 转base64
      // var reader = new FileReader()
      // var _this = this
      // reader.onload = function (e) {
      //   // _this.img_src = e.target.result // 将图片路径赋值给src
      // }
      // reader.readAsDataURL(param.file)
      // // 本地预览 预览 end

      // 通过axios 调接口实现上传, 需要将文件添加到new 出来的 formData 里面
      const formData = new FormData()
      formData.append('filePath', param.file)
      formData.append('originalFileName', param.file.name.split('.')[0]) // 文件原始名称，不带后缀

      httpupload(formData)
        .then((response) => {
          // this.addShopForm.shopLogo = response
        })
        .catch((response) => {
          this.$message.error('图片上传失败')
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
