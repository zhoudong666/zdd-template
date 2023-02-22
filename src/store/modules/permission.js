import { asyncRoutes } from '@/router' //
import { httpnavMenu } from '@/api/user'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.menuCode) {
    return roles.some((role) => route.meta.menuCode.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, roles)
      res.push(tmp)
    }
  })
  return res
}

// // 根据后台传来的权限菜单进行筛选 有权限的数组 ["m11000", "m12000", "m12100", "m12200"]
function getTreeMenuIds(endMenu, arr) {
  // endMenu.forEach((menu) => {
  //   if (menu.menuCode) {
  //     if (menu.list) menu.list = getTreeMenuIds(menu.list, arr)
  //     arr.push(menu.menuCode)
  //   }
  // })
  endMenu.forEach((i) => {
    const { menuLevel, menuCode } = i
    if (menuLevel === '2') endMenu.push({ menuCode: menuCode.substring(0, 2).padEnd(6, '0') })
    if (menuLevel === '3') endMenu.push({ menuCode: menuCode.substring(0, 3).padEnd(6, '0') })
  })
  const menuCodes = endMenu.map((i) => i.menuCode)
  arr = [...new Set(menuCodes)]
  return arr
}

const state = {
  routes: [],
  addRoutes: [],
  roles: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  },
  SET_ROLES: (state, rolesArr) => {
    state.roles = rolesArr
  },
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      // 此接口返回的是 后台筛选过的,用户有权限的菜单一维数组
      httpnavMenu().then((res) => {
        const arr = []
        const roles = getTreeMenuIds(res, arr)
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        commit('SET_ROLES', roles)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
