import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import i18n from './lang'
import App from './App'
import store from './store'
import router from './router'
import Component from './components'
import '@/icons' // icon

// 控制登陆权限
import '@/permission' // permission control


import * as directives from '@/directives'
import * as filters from '@/filters'
import CheckPermission from '@/mixins/checkPermission'



Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */


// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 全局混入检查对象
Vue.mixin(CheckPermission)
// 使用的按钮引入，可以通过points来判断有没有操控权限

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]) /* 注册自定义指令 */
})

Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
