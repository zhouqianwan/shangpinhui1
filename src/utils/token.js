// 向外暴露一个函数，存储token
export const setToken = (token) => {
  localStorage.setItem('token', token)
}

// 向外暴露一个函数，获取token
export const getToken = () => localStorage.getItem('token')

// 向外暴露函数，将token进行清除
export const removeToken = () => {
  localStorage.removeItem('token')
}