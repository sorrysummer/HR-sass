// 权限路由
import Layout from '@/layout'
export default {
    path: '/permission',
    name: 'permission',  /* 权限使用 */
    component: Layout,
    children: [{
        // 默认子路由
        path: '',
        component: () => import('@/views/permission'),
        // 路由元信息，存储数据的地方
        meta: {
            title: '权限管理',   /* 左侧导航读取这里的信息 */
            icon: 'lock'
        }
    }]


}