// 社保路由
import Layout from '@/layout'
export default {
    path: '/social',
    name: 'social',  /* 权限使用 */
    component: Layout,
    children: [{
        // 默认子路由
        path: '',
        component: () => import('@/views/social'),
        // 路由元信息，存储数据的地方
        meta: {
            title: '社保',   /* 左侧导航读取这里的信息 */
            icon: 'table'
        }
    }]
}