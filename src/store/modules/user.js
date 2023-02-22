import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: {
      corpName: '', //   所属公司
      loginUser: '', //   账号
      status: '', //   状态 0 正常 1 禁用
      userLastip: '', //   最后登录IP
      userLasttime: '', //   最后登录时间
      userMail: '', //   邮箱
      userMemo: '', //   用户描述
      userMobile: '', //   号码
      userName: '', //   用户姓名
      userPic: '', //   头像
      userRegtime: '', //   注册时间
      userType: '', //   角色 0：普通用户 1：管理员
    },
    userStatus: '0', // 0:正常 1 未提交认证 2 未认证
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_USERSTATUS: (state, userStatus) => {
    state.userStatus = userStatus
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { principal, credentials, sessionUUID, validCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ principal, credentials, sessionUUID, validCode })
        .then((response) => {
          const { token_type, access_token, userStatus } = response

          const token__ = token_type + access_token
          commit('SET_USERSTATUS', userStatus)
          window.sessionStorage.setItem('temp_token', token__)
          if (userStatus === '0') {
            setToken(token__)
            commit('SET_TOKEN', token__)
          }
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const data = response

          if (!data) return Promise.reject(new Error('Verification failed, please Login again.'))

          const { userName, userPic } = data

          commit('SET_NAME', userName)
          commit('SET_AVATAR', userPic)
          commit('SET_USERINFO', data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
