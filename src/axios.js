import axios from "axios";
import {getToken} from "@/composables/auth.js";
import {showMessage} from "@/composables/util.js";

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
        console.log('统一添加请求头中的token' + token)

        // 当token不为空时
        if (token){
            // 添加请求头，key 为 Authorization value 值的前缀为 'Bearer’
            config.headers['Authorization'] = 'Bearer' + token
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
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

        // 若后台有错误提示就用提示文字，默认提示为 ‘请求失败’
        let errorMsg = error.response.data.msg || '请求失败了哈😰'
        showMessage(errorMsg,'error')

        return Promise.reject(error)
    }
);

// 暴露出去
export default instance