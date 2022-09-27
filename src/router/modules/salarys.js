// 工资路由
import Layout from '@/layout'
export default {
    path: '/salarys',
    name: 'salarys',  /* 权限使用 */
    component: Layout,
    children: [{
        // 默认子路由
        path: '',
        component: () => import('@/views/salarys'),
        // 路由元信息，存储数据的地方
        meta: {
            title: '工资',   /* 左侧导航读取这里的信息 */
            icon: 'money'
        }
    }]


}