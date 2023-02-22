// import { httplistWhs } from '@/api/storeManage/inStoreRecord'

const state = {
  storeList: [],
}

const mutations = {
  SET_STORELIST: (state, list) => {
    state.storeList = list.map((i) => ({ value: i.whNo, label: i.whName }))
  },
}

const actions = {
  httplistWhs({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_STORELIST', [])
      resolve()
      // httplistWhs()
      //   .then((response) => {
      //     commit('SET_STORELIST', response)
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
