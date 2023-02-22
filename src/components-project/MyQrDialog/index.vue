<template>
  <div>
    <ZDialog
      title="二维码"
      cancelBtnText="关闭"
      width="600px"
      :visible.sync="visible"
      :before-close="() => $emit('update:visible', false)"
      @cancelBtn="() => $emit('update:visible', false)"
      @sureBtn="sureBtn"
      @close="() => $emit('update:visible', false)"
      sureBtnText="下载"
      append-to-body
    >
      <div class="qr-outer" ref="content">
        <div class="qr-box">
          <div class="qr-box-top">
            <div class="qr-title">{{ qrObj.title }}</div>
            <div v-for="i in qrObj.infoArr" :key="i.label">{{ i.label }}：{{ i.value }}</div>
          </div>
          <div class="qr-box-bottom">
            <vue-qr :text="qrObj.qr || ''" :margin="0" colorLight="#fff" :size="200"></vue-qr>
          </div>
        </div>
      </div>
    </ZDialog>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import html2canvas from 'html2canvas'
import { jsPDF as JsPDF } from 'jspdf'
export default {
  name: 'MyQrDialog',
  components: { vueQr },
  props: {
    visible: { type: Boolean },
    qrObj: {
      type: Object,
      default: () => ({
        title: '示例demo',
        qr: '二维码展示的内容',
        infoArr: [
          { label: 'xx1', field: '', value: 'info 值1' },
          { label: 'xx2', field: '', value: 'info 值2' },
          { label: 'xx3', field: '', value: 'info 值3' },
        ],
      }),
    },
  },
  data() {
    return {
      size: 4,
    }
  },
  methods: {
    sureBtn() {
      // 当分辨率是72像素/英寸时，A4纸长宽像素分别是842×595。
      const obj = {
        A4: { width: 592.28, height: 841.89 },
        A5: { width: 841.89 / 2, height: 592.28 },
        A6: { width: 592.28 / 2, height: 841.89 / 2 },
      }
      const el = this.$refs.content
      const sss = this.size - 3
      const paperType = 'A' + this.size
      const paperSizeObj = obj['A' + this.size]

      html2canvas(el, {
        background: '#f7f7f7',
        useCORS: true, // 解决图片跨越的问题
        taintTest: false,
        height: el.offsetHeight,
        width: el.offsetWidth,
        scale: 2,
      }).then((canvas) => {
        var contentWidth = canvas.width
        var contentHeight = canvas.height
        // 一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / paperSizeObj.width) * paperSizeObj.height
        // 未生成pdf的html页面高度
        var leftHeight = contentHeight
        // 页面偏移
        var position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = paperSizeObj.width - 90 / sss
        var imgHeight = ((paperSizeObj.width - 60 / sss) / contentWidth) * contentHeight

        var pageData = canvas.toDataURL('image/png', 1.0)
        var pdf = new JsPDF('', 'pt', paperType)

        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'PNG', 40 / sss, 60 / sss, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'PNG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(`${this.qrObj.title} ${this.qrObj.No ? `(${this.qrObj.No})` : ''}.pdf`)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.qr-outer {
  width: 560px;
  padding: 20px 80px;
  .qr-box {
    // border: 1px solid red;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    line-height: 26px;
    overflow: hidden;
    color: #fff;
    margin: 0 auto;
    .qr-box-top {
      background-color: #2c7de9;
      padding: 20px;
      .qr-title {
        font-size: 22px;
        margin-bottom: 10px;
      }
    }
    .qr-box-bottom {
      text-align: center;
      padding: 30px;
      background-color: #eee;
    }
  }
}

::v-deep .el-dialog {
  min-width: 600px !important;
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }
}
</style>
