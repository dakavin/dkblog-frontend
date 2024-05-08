import Index from '@/pages/frontend/index.vue'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import Admin from "@/layouts/admin/admin.vue";
import AdminArticleList from "@/pages/admin/article-list.vue"
import AdminCategoryList from "@/pages/admin/category-list.vue"
import AdminTagList from "@/pages/admin/tag-list.vue"
import AdminBlogSetting from "@/pages/admin/blog-settings.vue"
import AccountSetting from "@/pages/admin/account-setting.vue"
import {createRouter, createWebHashHistory} from "vue-router";

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
        path: '/admin',
        // 对应 admin.vue 布局文件
        component: Admin,
        // 使用到 admin.vue 布局的，都需要放置在其子路由下面
        children: [
            {
                path: "/admin/index",
                component: AdminIndex,
                meta: {
                    title: '控制台'
                }
            },
            {
                path: "/admin/article/list",
                component: AdminArticleList,
                meta: {
                    title: '文章管理'
                }
            },
            {
                path: "/admin/category/list",
                component: AdminCategoryList,
                meta: {
                    title: '分类管理'
                }
            },
            {
                path: "/admin/tag/list",
                component: AdminTagList,
                meta: {
                    title: '标签管理'
                }
            },
            {
                path: "/admin/blog/settings",
                component: AdminBlogSetting,
                meta: {
                    title: '博客设置'
                }
            },
            {
                path: "/admin/account/setting",
                component: AccountSetting,
                meta: {
                    title: '账户设置'
                }
            },
        ],
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