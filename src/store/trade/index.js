import { reqGetAddress, reqOrderInfo } from '@/api'
const state = {
  orderInfo: {}
}
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let res = await reqGetAddress()
    if (res.code == 200) {
      commit('GETUSERADDRESS', res.data)
    }
  },
  // 获取用户订单信息
  async getOrderInfo({ commit }) {
    let res = await reqOrderInfo()
    if (res.code == 200) {
      commit('GETORDERINFO', res.data)
    }
  }
}
const getters = {}
const mutations = {
  GETUSERADDRESS(state, value) {
    // state.address = value
  },
  // 将获取的订单信息存储到state中
  GETORDERINFO(state, value) {
    state.orderInfo = value
  }
}

export default {
  actions,
  getters,
  state,
  mutations
}