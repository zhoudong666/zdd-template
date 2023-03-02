import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss'

// import cache from './cache'
import modal from './modal'
// import download from './download'

// # use as global component
import splitPane from 'vue-splitpane' // 可拖拽组件

export default {
  install(Vue) {
    // 缓存对象
    // Vue.prototype.$cache = cache
    // 模态框对象
    Vue.prototype.$modal = modal
    // 下载文件
    // Vue.prototype.$download = download

    Vue.component('split-pane', splitPane)

    // set ElementUI lang to EN     size : medium | small | mini
    // Vue.use(ElementUI, { locale, size: 'mini' })
    // 如果想要中文版 element-ui，按如下方式声明
    Vue.use(ElementUI, { size: 'mini' })
  },
}
