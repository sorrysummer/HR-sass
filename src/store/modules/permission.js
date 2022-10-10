import { constantRoutes, asyncRoutes } from "@/router"

const state = {
    routes: constantRoutes,  /* 当前路由所拥有的的所有路由权限  */
}
const mutations = {
    setRoutes(state, newRoutes) {
        // 在静态路由的基础上添加新路由
        state.routes = [...constantRoutes, ...newRoutes]
    }
}
const actions = {
    filterRoutes(context, menus) {
        const routes = []
        // 遍历权限名单
        menus.forEach(key => {
            // 筛选出名单中的对应的路由权限
            routes.push(...asyncRoutes.filter(item => item.name === key))
        });
        // 提交给mutations，在左侧菜单使用
        context.commit('setRoutes', routes)
        return routes  /* 返回给路由的addroutes使用 */
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}