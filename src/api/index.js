// 当前这个模块：对SPI进行统一管理
import requests from './request'
import mockRequest from './mockRequest'
// 导出商品列表的请求，使用时引入直接使用即可
// 请求地址： /api/product/getBaseCategoryList  GET请求   不携带参数
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发送ajax请求，获取三级菜单的数据
export const reqCategoryList = () => {
  // 发请求
  return requests({ url: '/product/getBaseCategoryList', method: 'get' });
}


// 这就是向外导出，获取banner数据的函数（调用它就能直接拿到获取的数据）为了模块化开发
// 后面获取的就是axios.get
export const reqGetBannerList = () => mockRequest.get('/banner')

// 对外暴露一个函数，只要调用这个函数，就发起请求，获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索模块的数据  地址：/api/list  请求方式：post  参数:需要携带参数
// 当前这个接口,发送post请求，需要携带params参数，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params })

// 获取产品详细信息的接口  URL:   /api/item/{skuId}
export const reqGoodsInfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' })

// post方法，点击添加都购物车，将所选的数据发送到服务器   URL:/api/cart/addToCart
export const reqAddShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表
// url:/api/cart/cartList    METHOD:GET
export const reqShopCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 通过skuId,删除购物车中的商品
// url:/api/cart/deleteCart/{skuId}    method：delete
export const deleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 选中状态的请求
//    url:/api/cart/checkCart/{skuID}/{isChecked}    method:get
export const reqUpdataChecked = (skuID, isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })

// 获取验证码的请求
//  url:   /api/user/passport/sendCode/{phone}    method:get
export const reqVerifyCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 用户注册
//     url:/api/user/passport/register    method:post
export const reqRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data })

// 用户登录    url:/api/user/passport/login    method:post
export const reqLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息（带着用户的token向服务器要用户信息）  url:/api/user/passport/auth/getUserInfo   method:get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录   url:/api/user/passport/logout   method:get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息
//   url:/api/user/userAddress/auth/findUserAddressList   method:get
export const reqGetAddress = () => requests({ url: 'user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取订单交易页信息
//   url:/api/order/auth/trade    method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单
//      url:/api/order/auth/submitOrder?tradeNo={tradeNo}    method:post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取订单支付信息
//    url:/api/payment/weixin/createNative/{orderId}     method：get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}` })

// 查询订单支付状态
//  url:/api/payment/weixin/queryPayStatus/{orderId}      method:get
export const reqOrderState = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取我的订单
//    url:/api/order/auth/{page}/{limit}    method:get
export const reqGetMyOrder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })