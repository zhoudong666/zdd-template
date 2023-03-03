import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

// 重写路由的 push 和 replace 方法, 防止点击面包屑报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch((err) => err)
}
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const isHideDemo = false
const exampleRoutes = [
  {
    hidden: isHideDemo,
    path: '/demo',
    component: Layout,
    redirect: '/demo/SvgIcon',
    meta: { title: 'demo', icon: 'tree' },
    children: [
      {
        path: 'index',
        name: 'SvgIconDemo',
        component: () => import('@/components/SvgIcon/demo.vue'),
        meta: { title: 'SvgIcon', icon: 'form' },
      },
      {
        path: 'ZFormDemo',
        name: 'ZFormDemo',
        component: () => import('@/demos/ZFormDemo/index'),
        meta: { title: 'ZForm', icon: 'tree' },
        children: [
          {
            path: 'ZformTypes',
            name: 'ZformTypes',
            component: () => import('@/demos/ZFormDemo/ZformTypes'),
            meta: { title: 'ZformTypes', icon: 'tree' },
          },
          {
            path: 'RequestData',
            name: 'RequestData',
            component: () => import('@/demos/ZTableDemo/RequestData'),
            meta: { title: 'RequestData', icon: 'tree' },
          },
        ],
      },
      {
        path: 'ZDialogDemo',
        name: 'ZDialogDemo',
        component: () => import('@/demos/ZDialogDemo/index'),
        meta: { title: 'ZDialog', icon: 'tree' },
      },
      {
        path: 'ZTableDemo',
        name: 'ZTableDemo',
        component: () => import('@/demos/ZTableDemo/index'),
        meta: { title: 'ZTable', icon: 'table' },
        children: [
          {
            path: 'LocalData',
            name: 'LocalData',
            component: () => import('@/demos/ZTableDemo/LocalData'),
            meta: { title: 'LocalData', icon: 'tree' },
          },
          {
            path: 'RequestData',
            name: 'RequestData',
            component: () => import('@/demos/ZTableDemo/RequestData'),
            meta: { title: 'RequestData', icon: 'tree' },
          },
        ],
      },
      {
        path: 'ZAreaDemo',
        name: 'ZAreaDemo',
        component: () => import('@/demos/ZAreaDemo/index'),
        meta: { title: 'ZArea', icon: 'tree' },
      },
      {
        path: 'VueQrDemo',
        name: 'VueQrDemo',
        component: () => import('@/demos/VueQrDemo/index'),
        meta: { title: 'VueQr', icon: 'tree' },
      },
      {
        path: 'SplitPaneDemo',
        name: 'SplitPaneDemo',
        component: () => import('@/demos/SplitPaneDemo/index'),
        meta: { title: 'SplitPane', icon: 'tree' },
      },
      {
        path: 'SelectTreeDemo',
        name: 'SelectTreeDemo',
        component: () => import('@/demos/SelectTreeDemo/index'),
        meta: { title: 'SelectTree', icon: 'tree' },
      },
      {
        path: 'TreeDemo',
        name: 'TreeDemo',
        component: () => import('@/demos/TreeDemo/index'),
        meta: { title: 'Tree', icon: 'tree' },
      },
      {
        path: '/css',
        name: 'CSS',
        component: () => import('@/demos/css-demo/index'),
        meta: { title: 'CSS', icon: 'el-icon-s-help' },
        children: [
          {
            path: 'demo1',
            name: 'demo1',
            component: () => import('@/demos/css-demo/demo1-colorful-border'),
            meta: { title: 'demo1', icon: 'form' },
          },
          {
            path: 'demo2',
            name: 'demo2',
            component: () => import('@/demos/css-demo/demo2'),
            meta: { title: 'demo2', icon: 'form' },
          },
        ],
      },
    ],
  },
]

const projConstRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: isHideDemo,
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('@/pages/otherPages/regist/index'),
    hidden: isHideDemo,
  },
  {
    path: '/waiting',
    name: 'waiting',
    component: () => import('@/pages/otherPages/waiting/index'),
    hidden: isHideDemo,
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/pages/otherPages/forget/index'),
    hidden: isHideDemo,
  },
  {
    path: '/authority',
    name: 'authority',
    component: () => import('@/pages/otherPages/authority/index'),
    hidden: isHideDemo,
  },

  {
    // hidden: isHideDemo,
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '欢迎页', icon: 'dashboard' },
      },
    ],
  },

  {
    hidden: isHideDemo,
    // path: 'external-link',
    path: '',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },
]
export const constantRoutes = exampleRoutes.concat(projConstRoutes)

export const asyncRoutes = [
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/personSetting',
    name: '系统设置',
    meta: { title: '系统设置', icon: 'el-icon-setting', menuCode: 'm30000' },
    children: [
      {
        path: 'personSetting',
        name: 'personSetting',
        component: () => import('@/pages/setting/personSetting/index'),
        meta: { title: '物流人员设置', icon: 'dashboard', menuCode: 'm32000' },
      },
      {
        path: 'countManage',
        name: 'countManage',
        component: () => import('@/pages/setting/countManage/index'),
        meta: { title: '系统账号管理', icon: 'dashboard', menuCode: 'm33000' },
      },
      {
        // hidden: true,
        path: 'myInfo',
        name: 'myInfo',
        component: () => import('@/pages/setting/myInfo/index'),
        meta: { title: '个人信息修改', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/404',
    component: Layout,
    hidden: true,
    // component: () => import('@/views/404'),
    redirect: '/404/404',
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/404'),
        meta: { title: '404', icon: 'form' },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

// hash 模式 和 history 模式的区别
// 当我们在用vue-router 中的hash模式，最后打包生成的文件，不需要后台做什么更改。直接可以用、
// 但是History模式，后台部署时类似于nginx这种，就要加些代码、
// e.g
// location / {
//   root  /Users/jhj/Desktop/mall;
//   index index.html index.htm;
//   try_files $uri $uri/ /index.html;
// }
// 这段代码的意思就是告诉服务器，前边请求啥你都去找index.html, 其他你都不要干涉、
// 不加这段的话，当代码部署的时候就会发现你的路由失效了。不能刷新等等情况。

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
