import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router/index'
import store from './store'

import '@/icons' // icon

import '@/router/permission' // permission control
import './utils/directives.js'

// 自定义组件 全局注册
import CustomDialog from '@/components/CustomDialog'

Vue.component('CustomDialog', CustomDialog)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN     size : medium | small | mini
// Vue.use(ElementUI, { locale, size: 'mini' })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
