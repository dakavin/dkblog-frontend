import router from "@/router/index.js";
import {getToken} from "@/composables/cookie.js";
import {showMessage, showPageLoading, hidePageLoading} from "@/composables/util.js";
import {useBlogSettingsStore} from "@/stores/blogsettings.js";

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    // 显示页面加载loading条
    showPageLoading()

    // 若用户未登录，访问后台页面
    // 则强制调整登录页
    let token = getToken()
    if (!token && to.path.startsWith('/admin')) {
        showMessage("请先登录哈！", "warning")
        next({path: '/login'})
    } else if (token && to.path === '/login') {
        // 若用户已经登录，且重复访问登录页
        showMessage('请勿重复登录哈！', 'warning')
        // 跳转后台首页
        next({path: '/admin/index'})
    } else if (!to.path.startsWith('/admin')) {
        // 如果访问的非 /amdmin 前缀路由
        // 引入博客设置 store
        let blogSettingsStore = useBlogSettingsStore()
        // 获取博客设置信息，并保存到全局状态中
        blogSettingsStore.getBlogSettings()
        next()
    } else {
        next()
    }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    // 动态设置页面 title
    let title = (to.meta.title ? to.meta.title : '')
    document.title = title

    // 隐藏页面加载 Loading
    hidePageLoading()
})