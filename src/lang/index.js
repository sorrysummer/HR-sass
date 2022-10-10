import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookie from 'js-cookie' // 引入cookie包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入中文包
import customZH from './zh' // 引入自定义包
import customEN from './en'
Vue.use(VueI18n)  /* 完成全局注册 */
export default new VueI18n({
    locale: Cookie.get('language') || 'zh',
    messages: {
        en: {
            ...elementEN, // 将英文语言包引入
            ...customEN
        },
        zh: {
            ...elementZH, // 将中文语言包引入
            ...customZH
        }
    }
})