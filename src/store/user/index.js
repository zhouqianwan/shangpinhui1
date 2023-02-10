import { reqVerifyCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
// 在utils中获取存储token的函数
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  // 未登录的时候没有token，相当于空字符串  登陆之后在localStorage中永久存储
  // 这里的getToken()是一个函数，他们获取当前的token值
  token: getToken(),
  loginName: ''
}
const mutations = {
  GETVERIFYCODE(state, value) {
    state.code = value
  },
  REQLOGIN(state, value) {
    state.token = value
  },
  // 获取用户信息
  GETUSERINFO(state, value) {
    state.loginName = value
  },
  // 退出登录
  LOGOUT(state) {
    // 清除state中关于用户信息的数据
    state.code = '',
      state.token = ''
    state.loginName = ''
    // 将localStorage中的token也清除   这是引入的清除localStorage中token的函数
    removeToken()
  }
}
const actions = {
  // 获取注册时的手机验证码
  async getVerifyCode({ commit }, phone) {
    let res = await reqVerifyCode(phone)
    if (res.code == 200) {
      commit('GETVERIFYCODE', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async getRegister({ commit }, data) {
    let res = await reqRegister(data)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录
  async reqLogin({ commit }, data) {
    let res = await reqLogin(data)
    if (res.code == 200) {
      commit('REQLOGIN', res.data.token)
      // 持久化存储token
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let res = await reqUserInfo()
    // 将获取过来的用户信息存储到state中
    commit('GETUSERINFO', res.data.loginName)
  },
  // 用户退出登录
  async logout({ commit }) {
    let res = await reqLogout()
    // 提交到mutations中将state中关于用户信息的数据全部清除
    if (res.code == 200) {
      commit('LOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  getters,
  actions
}