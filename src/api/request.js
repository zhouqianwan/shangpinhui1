// 对axios的二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// start:进度条开始  done：进度条结束

// 利用axios对象的create方法 创建一个axios实例
// request 就是axios只不过稍微配置了一下

// 引入store
import store from '@/store'
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径中会出现api
  baseURL: '/api',
  // 请求超时
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  // 如果仓库中有uuid就把他传到服务器中，以便于使用游客身份访问到购物车中的数据
  if (store.state.detail.uuid_token) {
    // 在请求头添加一个字段（userTempId）这个不能随便添加 要和后台商量好
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 如果有token就将他带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }

  // 发起请求之前，进度条开始动
  nprogress.start()
  // config:配置对象，对象里面有一个属性很重要，headers请求头
  return config;
})

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功传回数据之后，进度条结束
    nprogress.done()
    // 成功的回调函数：服务器中的数据获取过来之后，响应拦截器可以检测到，可以做一些事情
    return res.data;
  }, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
  })


// 对外暴露axios
export default requests;