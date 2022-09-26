import { getToken, setToken, removeToken, setTimeStamp, getTimeStamp } from '@/utils/auth'
import { userLoginApi, getUserInfoApi, getUserPhotoApi } from '@/api'


const state = {
  token: getToken(), /* 初始化token的时候从缓存读取 */
  userInfo: {}, /* 设置为对象防止getters报错 */
}
const mutations = {
  setToken(state, token) {
    state.token = token /* 更换vuex里边的token */
    setToken(token)   /* 同步缓存 */
  },
  removeToken(state) {
    state.token = null /* 将vuex数据置空 */
    removeToken()     /* 同步到缓存 */
  },
  setUserInfo(state, data) {
    state.userInfo = data
  }
  ,
  removeUserInfo(state) {
    state.userInfo = {}
  },


}
const actions = {
  async login(context, data) {
    const result = await userLoginApi(data) /* 拿到token */
    context.commit('setToken', result) /* 设置token */
    setTimeStamp()  /* 设置当前时间戳 */
  },

  async getUserInfo(context) {
    const data = await getUserInfoApi()
    const result = await getUserPhotoApi(data.userId)
    // const obj =  { ...data, ...result } /* 合并对象 */
    context.commit('setUserInfo', { ...data, ...result }) /* 提交到mutation */
    return data  /* 后期权限使用 */
  },
  async logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

