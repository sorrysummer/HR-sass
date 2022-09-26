import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
import store from '@/store'
import router from '@/router'


const timeout = 3000

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, /* 开发环境/api，生产环境/prod-api */
  timeout: 5000   /* 设置时长，超时报错 */
}

)
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 检查时间戳
    if (computedTime()) {
      // 先清除token，并且退出登录
      store.dispatch('user/logout')
      router.push('/login')  /* 跳转到登录页面 */
      return Promise.reject(new Error('token超时了'))

    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config /* config必须要返回 */
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(response => {
  // axios默认加了一层data需要结构出来
  const { success, data, message } = response.data
  if (success) {
    return data
  } else {
    // 错误返回错误消息message，不能进入then()
    Message.error(message)
    // return一个错误进入catch
    return Promise.reject(new Error(message))
  }
}, error => {

  if (error.response && error.response.data && error.response.data.code === 10002) {
    // code=10002后端判断token超时

    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
  /* 返回reject终止执行链，进入catch */
})

function computedTime() {
  // 计算时间差，判断时间戳是否超时
  let currentTime = Date.now()
  let timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > timeout
}
export default service
