// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入routes组件
import routes from './routes'
// 引入store
import store from '@/store/index.js'

// 先把VueRouter原型对象上的push保存一份
const originPush = VueRouter.prototype.push

// 重写push和replace方法
// 第一个参数：篡改函数的上下文
// 第二个参数 告诉原来的push方法 你往哪里跳转(传递那些参数)
// 后两个就是 成功和失败的回调函数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
VueRouter.prototype.push = function (location, resolve, reject) {
  // 如果有成功和失败的回调函数，就使用之前的回调函数
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    // 否则就手动加上成功和失败的回调函数
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  // 如果有成功和失败的回调函数，就使用之前的回调函数
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    // 否则就手动加上成功和失败的回调函数
    originPush.call(this, location, () => { }, () => { })
  }
}

// call和apply的区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文
// 不同点：call和apply传递的参数：call传递参数用逗号隔开，apply方法，传递数组

// 使用插件
Vue.use(VueRouter)
// 引入路由组件
let router = new VueRouter({
  routes,

  // 导航条的滚动行为
  scrollBehavior() {
    return { y: 0 }
  }
})
// 全局前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转到那个路由的信息
  // from:可以获取到你从哪里来的信息
  // next:放行函数
  let name = store.state.user.loginName
  // 通过有没有token来判断是否进行登录
  if (store.state.user.token) {
    // 已经登录了，就把不能在进入登录页面
    if (to.path == '/login') {
      next('/home')
    } else {
      // 这里说明：已经登录，去别的页面了
      // 如果已经登陆了（通过有没有userInfo中的name来进行判断）    这里其实不用写，是在header中发的请求，仅作为练习用
      if (name) {
        // 说明即使跳转页面，还是有登录信息
        next()
      } else {
        // 没有用户的登录信息，要重新获取一下
        // 这里也要分两种情况  成功获取登录信息成功   获取登录信息失败：token失效
        try {
          await store.dispatch('getUserInfo')
        } catch (error) {
          // 这是token失效的情况  1 将关于用户的信息清除（派发登出请求==清楚数据）2 token失效，跳转到login页面重新登录
          await store.dispatch('logout')
          next('/login')
        }
      }
    }
  } else {
    // 没登录的情况,不能取交易相关，不能去支付相关（pay,paysuccess） 不能去个人中心
    //未登录去以上路由要跳转到等了页面
    let path = to.path
    // 看路由地址中是否包含这些页面  如果包含就跳转到登录页面
    if (path.indexOf('/trade') !== -1 || path.indexOf('/pay') !== -1 || path.indexOf('/center') !== -1) {
      // path中的路径是想要去的路径，登录完成后在取到path地址中
      next('/login?redirect=' + path)
    } else {
      // 去的和交易页面无关 直接放行即可
      next()
    }

  }
  next()

})


export default router
