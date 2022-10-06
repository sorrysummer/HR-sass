
// 组件全局注册
import PageTools from './pageTools'
import Excel from './updateExcel'
import ImageUpload from './imageUpload'
import Print from 'vue-print-nb'
export default {
    install(Vue) {
        Vue.component('PageTools', PageTools)
        Vue.component('Excel', Excel)
        Vue.component('ImageUpload', ImageUpload)
        Vue.use(Print)
    }
}