// 权限跳转在路由守卫
// main.js已经引入代码，不需要导出，只要执行就好

import router from '@/router'
import store from '@/store' /* 引入store和组件中this.$store是一样的 */
import nprogress from 'nprogress' /* 引入进度条 */
import 'nprogress/nprogress.css'  /* 进度条样式 */

const whiteList = ['/login', '/404'] /* 定义白名单 */


// 前置守卫
router.beforeEach(async (to, from, next) => {
    nprogress.start()  /* 开启进度条 */
    // 如果有token
    if (store.getters.token) {
        // 如果去登录页，跳转到主页
        if (to.path === '/login') {
            next('/')
        } else {

            // 如果没有用户id表示没有获取用户资料
            if (!store.getters.userId) {
                await store.dispatch('user/getUserInfo') /* await强制等待，避免没有加载完数据就跳转 */
            }
            // 不是登陆页，放过通行
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next()    /* 在白名单，放行 */
        } else {
            next('/login')
        }
    }
    nprogress.done()  /* 解决手动切换地址时进度条不关闭的问题 */
})


// 后置守卫
router.afterEach(() => {
    nprogress.done()  /* 关闭进度条 */
})