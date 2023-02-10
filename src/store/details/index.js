// 引入获取商品信息的请求
import { reqGoodsInfo, reqAddShopCart } from "@/api"
// 导入生成uuid_token的函数
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodsInfo: {},
  //游客的访问身份  调用这个函数，返回一个uuid_token state中就有uuid_token了
  uuid_token: getUUID()
}
const actions = {
  // 获取产品信息
  async getGoodsInfo({ commit }, skuid) {
    let res = await reqGoodsInfo(skuid)
    if (res.code == 200) {
      commit('GETGOODSINFO', res.data)
    }
  },
  // 点击购物车，将所选的参数发送到服务器，并进行路由跳转
  async addOrUpdataShopCart({ commit }, { skuId, skuNum }) {
    let res = await reqAddShopCart(skuId, skuNum)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETGOODSINFO(state, value) {
    // 将获取来的商品数据，放到vuex中的details小仓库中
    state.goodsInfo = value
  }
}
const getters = {
  // 如果state.goodsInfo为空，那么空对象的catgegoryView指定为undefined，传过去的就是undefined
  // undefined里面没有categoryName这个属性，就会报错
  // 给他加上一个空对象，至少不会报错
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}