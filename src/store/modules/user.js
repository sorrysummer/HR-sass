import { getToken, setToken, removeToken } from '@/utils/auth'
import { userLoginApi } from '@/api'
const state = {
  token: getToken()  /* 初始化token的时候从缓存读取 */
}
const mutations = {
  setToken(state, token) {
    state.token = token /* 更换vuex里边的token */
    setToken(token)   /* 同步缓存 */
  },
  removeToken(state) {
    state.token = null /* 将vuex数据置空 */
    removeToken()     /* 同步到缓存 */
  }
}
const actions = {
  async login(context, data) {
    const { result } = await userLoginApi(data)
    if (result.success) {
      context.commit('setToken', result.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

