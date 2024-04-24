import Index from '@/pages/frontend/index.vue'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import {createRouter,createWebHashHistory} from "vue-router";

// 统一在这里声明所有路由
const routes = [
    {
        // 路由路径，首页
        path: '/',
        // 对应组件
        component: Index,
        // meta信息
        meta: {
            // 页面标题
            title: 'DK Blog 首页'
        }
    },
    {
        // 后台登录页
        path: '/login',
        component: Login,
        meta: {
            title: 'DK Blog 后台登录页'
        }
    },
    {
        // 后台首页
        path: '/admin/index',
        component: AdminIndex,
        meta: {
            title: 'DK Blog 后台管理页'
        }
    }
]

// 创建路由
const router = createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#） 进行标识
    history: createWebHashHistory(),
    // routes： routes 的缩写
    routes,
})

// ES6模块导出语句，它用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router;