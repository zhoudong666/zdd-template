import Vue from 'vue'
import ZForm from '@/components/ZForm'
import ZTable from '@/components/ZTable'
import ZDialog from '@/components/ZDialog'
import ZQrCode from '@/components/ZQrCode'
import ZArea from '@/components/ZArea'
import ZImgUpload from '@/components/ZImgUpload/ZImgUpload'
import ZImageUpload from '@/components/ZImgUpload/ZImageUpload'
import ZFileUpload from '@/components/ZUpload/ZFileUpload'
import ZTextareaDialog from '@/components/ZTextareaDialog'

import { confirm } from '@/components/ZConfirm'
Vue.prototype.zConfirm = confirm

Vue.component(ZForm.name, ZForm)
Vue.component(ZTable.name, ZTable)
Vue.component(ZDialog.name, ZDialog)
Vue.component(ZQrCode.name, ZQrCode)
Vue.component(ZArea.name, ZArea)
Vue.component(ZImgUpload.name, ZImgUpload)
Vue.component(ZImageUpload.name, ZImageUpload)
Vue.component(ZFileUpload.name, ZFileUpload)
Vue.component(ZTextareaDialog.name, ZTextareaDialog)
