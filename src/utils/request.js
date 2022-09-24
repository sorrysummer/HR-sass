import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, /* 开发环境/api，生产环境/prod-api */
  timeout: 5000   /* 设置时长，超时报错 */
}

)
service.interceptors.request.use()
service.interceptors.response.use(response => {
  // axios默认加了一层data需要结构出来
  const { success, data, message } = response.data
  if (success) {
    return data
  } else {
    // 错误返回错误消息message，不能进入then()
    Message.error(message)
    // return一个错误进入catch，
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)  /* 返回reject终止执行链，进入catch */
})
export default service
