import router from "@/router/index.js";
import {getToken} from "@/composables/auth.js";
import {showMessage} from "@/composables/util.js";

// 全局路由前置守卫
router.beforeEach((to,from,next)=>{
    console.log('===>全局路由前置守卫开始工作啦')
    next()
})

// 全局路由后置守卫
router.afterEach((to,from)=>{
    // 动态设置页面 title
    let title = (to.meta.title?to.meta.title:'')
    document.title = title
})