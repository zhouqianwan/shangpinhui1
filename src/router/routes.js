// 因为routes中的东西太多了，所以新建一个文件，将数组放到这里，将数据暴露出出去
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// 引入商品信息组件
import Details from '@/pages/Detail'
// 引入购物车组件
import AddCartSuccess from '@/pages/AddCartSuccess'
// 引入购物车组件
import ShopCart from '@/pages/ShopCart'
// 引入支付成功组件
import Paysuccess from '@/pages/PaySuccess'
// 引入center组件
import Center from '@/pages/Center'
// 引入center组件的子组件
import MyOrder from '@/pages/Center/MyOrder'
import GounpOrder from '@/pages/Center/GroupOrder'



// 不直接引入，直接important引入，会一次性都引入；使用路由懒加载技术就是按需引入
export default [
  {
    path: '/center', name: 'center', component: Center, meta: { show: true }, children: [
      { path: 'grouporder', component: GounpOrder },
      { path: 'myorder', component: MyOrder },
      // 二级路由重定向，默认显示myorder的内容
      { path: '/center', redirect: '/center/myorder' },
    ]
  },

  { path: '/paysuccess', name: 'paysuccess', component: Paysuccess, meta: { show: true } },
  { path: '/pay', name: 'pay', component: () => import('@/pages/Pay'), meta: { show: true } },
  {
    path: '/trade', name: 'trade', component: () => import('@/pages/Trade'), meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面  必须从购物车中来
      if (from.path == '/shopcart') {
        next()
      } else {
        // 从其他路由组件来，停留
        next(false)
      }
    }
  },
  { path: '/shopcart', name: 'shopcart', component: ShopCart, meta: { show: true } },
  { path: '/addcartsuccess', name: 'addcartsuccess', component: AddCartSuccess, meta: { show: true } },
  { path: '/home', component: Home, meta: { show: true } },
  { path: '/search/:keyword?', component: Search, meta: { show: true }, name: 'search' },
  { path: '/login', component: Login, meta: { show: false } },
  { path: '/register', component: Register, meta: { show: false } },
  { path: '/', redirect: '/home' },
  { path: '/details/:skuid', component: Details, meta: { show: true } }
]
