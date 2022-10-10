// 员工路由
import Layout from '@/layout'
export default {
    path: '/employees',
    name: 'employees',  /* 权限使用 */
    component: Layout,
    children: [{
        // 默认子路由
        path: '',
        component: () => import('@/views/employees'),
        name: "employees",
        // 路由元信息，存储数据的地方
        meta: {
            title: '员工管理',  /* 左侧导航读取这里的信息 */
            icon: 'people'
        }
    },
    {
        path: 'detail/:id'    /* 加了？表示传不传id都可以访问 */,
        component: () => import('@/views/employees/components/detail.vue'),
        hidden: true,  /* 不在左侧菜单栏显示 */
        meta: {
            title: '员工详情'
        }
    },
    {
        path: 'print/:id',
        component: () => import('@/views/employees/print'),
        hidden: true,
        meta: {
            title: '打印'
        }
    }
    ]


}