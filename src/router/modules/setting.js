// 公司路由
import Layout from '@/layout'
export default {
    path: '/setting',
    name: 'settings',  /* 权限使用 */
    component: Layout,
    children: [{
        // 默认子路由
        path: '',
        component: () => import('@/views/setting'),
        name: 'settings',
        // 路由元信息，存储数据的地方
        meta: {
            title: '公司设置',   /* 左侧导航读取这里的信息 */
            icon: 'setting'
        }
    }]


}