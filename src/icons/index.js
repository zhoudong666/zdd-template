import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

let fileNames = []
const requireAll2 = requireContext => {
  fileNames = (requireContext.keys())
}
requireAll2(req)
export default fileNames
