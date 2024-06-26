import axios from "axios";
import {getToken} from "@/composables/cookie.js";
import {showMessage} from "@/composables/util.js";
import {useUserStore} from "@/stores/user.js";

// 创建 axios 实例
const instance = axios.create({
    // API（接口）的前缀 URL
    // 在全局配置文件中，使用了正向代理，所以修改为对应的代理规则处理的前缀
    baseURL:"/api",
    // 请求超时时间，单位ms
    timeout: 7000
})

// 添加请求拦截器 请求发送之前
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const token = getToken()
        // console.log('统一添加请求头中的token' + token)

        // 当token不为空时
        if (token){
            // 添加请求头，key 为 Authorization value 值的前缀为 'Bearer’
            config.headers['Authorization'] = 'Bearer' + token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
);

// 添加响应拦截器 数据响应回来
instance.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response.data;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        let status = error.response.status

        // 一般 token失效 或 无效 会触发 后台返回401
        if (status === 401){
            // 直接使用userStore中的logout方法，删除token的同时也会触发路由前置守卫，跳转登录页面
            // 如果只调用removeToken方法，会导致用户信息还存在，如：前台页面就无法用户是否已经退出（通过userStore中的userInfo判断）
            const userStore = useUserStore()
            userStore.logout()
            // 刷新页面
            location.reload()
        }
        // 若后台有错误提示就用提示文字，默认提示为 ‘请求失败’
        let errorMsg = error.response.data.msg || '请求失败了哈😰'
        showMessage(errorMsg,'error')

        return Promise.reject(error)
    }
);

// 暴露出去
export default instance