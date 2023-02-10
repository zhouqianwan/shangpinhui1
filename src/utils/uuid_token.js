//本质就是一个函数   当localStorage中有uuid就不生成了，如果没有就自动生成，并return出去
import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串，且每次执行不能发生改变，游客身份持久存储
export const getUUID = () => {
  // 先从本地获取uuid （看本地存储中是否有这个东西）
  let uuid_token = localStorage.getItem('uuid_token')
  // 如果没有
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4()
    // 本地存储新创建的uuid_token
    localStorage.setItem('uuid_token', uuid_token)
  }
  // 向外暴露
  return uuid_token
}