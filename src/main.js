import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入仓库 
import store from '@/store/index.js'
// 把三级联动注册为全局组件
import TypeNav from '@/components/TypeNav'
// 引入mockSearve.js ----mock数据
import '@/mock/mockServe'
// 引入swiper样式，在main.js中引入，所有的组件都能使用
// 在main.js中引入swiper样式，让所有的组件都能用swiper的样式
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
// 在main.js中，将carousel注册为全局组件
import Carousel from '@/components/Carousel'
// 引入分页器，将他注册为全局组件
import Pagination from '@/components/Pagination'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入懒加载使用的图片
const image = require('@/assets/22.jpg')
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: image,
})

// 引入表单验证插件
import '@/plugins/veevalidata'



// 引入aoi文件夹中的所有接口
import * as API from '@/api'
// 引入button
import { Button, MessageBox } from 'element-ui'

// 第一个参数全勤局组件的名字，第二个参数 那一个组件
Vue.component("TypeNav", TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
Vue.component(Button.name, Button)
Vue.config.productionTip = false

// 商品列表的请求在这里进行测试
// import { reqCategoryList } from './api'
// reqCategoryList()
new Vue({
  // 全局事件总线$bus的配置
  beforeCreate() {
    // 在vue原型对象上，创建一个方法，并将实例对象赋值给他
    Vue.prototype.$bus = this
    // 将所有的api接口挂栽到vue的原型对象上
    Vue.prototype.$api = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  router,
  // 注冊仓库：组件实例的身上会多一个属性$store属性
  store,
  render: h => h(App),


}).$mount('#app')
