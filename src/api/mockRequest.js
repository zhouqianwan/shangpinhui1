// 这是含有   /mock的  
// 对axios的二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// start:进度条开始  done：进度条结束

// 利用axios对象的create方法 创建一个axios实例
// request 就是axios只不过稍微配置了一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径中会出现api
  baseURL:'/mock',
  // 请求超时
  timeout:5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
  // 发起请求之前，进度条开始动
  nprogress.start()
  // config:配置对象，对象里面有一个属性很重要，headers请求头
  return config;
})

// 响应拦截器
requests.interceptors.response.use(
  (res)=>{
    // 成功传回数据之后，进度条结束
    nprogress.done()
  // 成功的回调函数：服务器中的数据获取过来之后，响应拦截器可以检测到，可以做一些事情
  return res.data;
  },(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
  })


// 对外暴露axios
export default requests;