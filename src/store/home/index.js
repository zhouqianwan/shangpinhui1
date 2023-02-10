// home模块的小仓库

// 在home组件中引入商品列表的请求
// 引入获取banner数据的函数
import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'

const state = {
  count:0,
  categoryList:[],
  bannerList:[],
  floorList:[]
}
  // 这里可以书写业务逻辑 参数不能修改state的值
const actions = {
  // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({commit}){
    let res = await reqCategoryList()
    if(res.code == 200){
      commit('CATEGORYLIST',res.data)
    }
  },
  
  // 获取首页轮播图的数据
  async getBannerList({commit}){
    let res =await reqGetBannerList()
    if(res.code == 200){
      commit('GETBANNERLIST',res.data)
    }
  },
  async getFloorList({commit}){
    let res =await reqFloorList()
    if(res.code == 200){
      commit('GETFLOORLIST',res.data)
    }
  }
}
const mutations = {
  CATEGORYLIST(state,value){
    // 把传递过来的数值，存储到state中
    state.categoryList = value;
  },
  GETBANNERLIST(state,value){
    state.bannerList = value
  },
  GETFLOORLIST(state,value){
    state.floorList = value
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}