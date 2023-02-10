import { reqShopCartList, reqAddShopCart, deleteCart, reqUpdataChecked } from '@/api'
const state = {
  shopCartList: []
}
const actions = {
  // 获取购物车商品列表并将获取过来的数据存储到state中
  async getShopCartList({ commit }) {
    let res = await reqShopCartList()
    if (res.code == 200) {
      commit('GETSHOPCARTLIST', res.data)
    }
  },
  async updatgeShopcartNum({ commit }, { skuId, skuNum }) {
    let res = await reqAddShopCart(skuId, skuNum)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async deleteGoods({ commit }, skuId) {
    let res = await deleteCart(skuId)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 购物车中商品的选中状态
  async shopcartCheckState({ commit }, { skuID, isChecked }) {
    let res = await reqUpdataChecked(skuID, isChecked)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除购物车中全部选中的商品
  deleteAllCheckedGoods(context) {
    // 就是购物车中的所有商品
    let promiseAll = []
    context.state.shopCartList[0].cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? context.dispatch('deleteGoods', item.skuId) : ''
      // 将每一次返回的promise添加到数组中
      promiseAll.push(promise)
    });
    // 查看promiseAll数组中的promise是否全部成功   只有其中有一个失败就失败
    return Promise.all(promiseAll)
  }
}
const mutations = {
  GETSHOPCARTLIST(state, value) {
    state.shopCartList = value
  }
}
const getters = {
  // shopCartList是一个数组，只使用他的第零项,使用getters简化数据
  cartList(state) {
    return state.shopCartList[0] || {}
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}