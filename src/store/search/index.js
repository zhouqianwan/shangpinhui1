// search仓库
// 引入请求数据的方法
import { reqGetSearchInfo } from '@/api'
const state = {
  searchlist: {}
}

const actions = {
  // 获取search模块数据 给params一个默认值（空数组）  params中传递的就是searchParams对象
  async getSearchList({ commit }, params = {}) {
    // 将searchParams作为实参传递   发起请求
    let res = await reqGetSearchInfo(params)
    if (res.code == 200) {
      commit('GETSEARCHLIST', res.data)
    }
  }
}

const mutations = {
  GETSEARCHLIST(state, value) {
    state.searchlist = value
  }
}
// 作用：简化仓库中的数据
// 可以把我们将来在组件中使用的数据进行简化（将来在组件中获取数据源就方便多了）
const getters = {
  goodsList(state) {
    // 如果没有网络，那么strate.searchList.goodsList应该返回的是undefined
    return state.searchlist.goodsList || []
  },
  trademarkList() {
    return state.searchlist.trademarkList || []
  },
  attrsList() {
    return state.searchlist.attrsList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}