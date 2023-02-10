import Vue from 'vue'
import Vuex from 'vuex'
// 使用一次插件
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
// 引入details小仓库
import detail from './details'
// 引入shopcart小仓库
import shopcart from './shopcart'
// 引入登录注册仓库
import user from './user'
// 引入交易仓库
import trade from './trade'

// 对外暴露一个Store类的实例
export default new Vuex.Store({
  // 实现vuex仓库模块式开发
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})