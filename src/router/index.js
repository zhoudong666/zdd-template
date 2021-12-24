// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)
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
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/icon-demo',
    component: Layout,
    hidden: false,
    redirect: '/icon-demo/index',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/components/SvgIcon/demo.vue'),
        meta: { title: 'IconDemo', icon: 'form' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'vueQr',
        name: 'vueQr',
        component: () => import('@/views/example/vueQr/index'),
        meta: { title: 'vueQr', icon: 'tree' }
      },
      {
        path: 'splitPaneDemo',
        name: 'splitPaneDemo',
        component: () => import('@/views/example/splitPaneDemo/index'),
        meta: { title: 'splitPaneDemo', icon: 'tree' }
      },
      // {
      //   path: 'agelForm',
      //   name: 'agelForm',
      //   component: () => import('@/views/example/agelForm/index'),
      //   meta: { title: 'agelForm', icon: 'tree' }
      // },
      {
        path: 'ZFormDemo',
        name: 'ZFormDemo',
        component: () => import('@/views/example/ZFormDemo/index'),
        meta: { title: 'ZFormDemo', icon: 'tree' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'dialogDrag',
        name: 'dialogDrag',
        component: () => import('@/views/example/dialogDrag/index'),
        meta: { title: 'dialogDrag', icon: 'table' }
      },
      {
        path: 'my-table',
        name: 'MyTable',
        component: () => import('@/views/my-table/index'),
        meta: { title: 'MyTable', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'ZDialog',
        name: 'ZDialog',
        component: () => import('@/views/example/ZDialog/index'),
        meta: { title: 'ZDialog', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'myTable',
        name: 'myTable',
        component: () => import('@/views/form/index'),
        meta: { title: 'myTable', icon: 'form' }
      }
    ]
  },

  {
    path: '/css',
    component: Layout,
    redirect: '/css/demo1',
    name: 'CSS',
    meta: { title: 'CSS', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo1',
        name: 'demo1',
        component: () => import('@/views/css-demo/demo1-colorful-border'),
        meta: { title: 'demo1', icon: 'form' }
      },
      {
        path: 'demo2',
        name: 'demo2',
        component: () => import('@/views/css-demo/demo2'),
        meta: { title: 'demo2', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    // path: 'external-link',
    path: '',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
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
        meta: { title: '404', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
    routes: constantRoutes
  })

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
