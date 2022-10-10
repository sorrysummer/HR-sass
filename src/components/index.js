
// 组件全局注册
import PageTools from './pageTools'
import Excel from './updateExcel'
import ImageUpload from './imageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './screenFull'
import ThemePicker from './ThemePicker'
import TagsView from './TagsView'
import LangSelect from './Lang'
export default {
    install(Vue) {
        Vue.component('PageTools', PageTools)
        Vue.component('Excel', Excel)
        Vue.component('ImageUpload', ImageUpload)
        Vue.component('ScreenFull', ScreenFull)
        Vue.component('ThemePicker', ThemePicker)
        Vue.component('TagsView', TagsView)
        Vue.component('LangSelect', LangSelect)
        Vue.use(Print)
    }
}