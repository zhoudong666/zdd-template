import Vue from 'vue'

import App from './App'
import router from './router/index'
import store from './store'

import '@/icons' // icon
import '@/router/permission' // permission control
import '@/components/index.js' // 全局组件引入
import '@/components-project/index.js' // 全局组件-针对本项目 引入

import plugins from './plugins' // global css
Vue.use(plugins)

// import agelForm from '@/agelComponent'
// Vue.use(agelForm)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
