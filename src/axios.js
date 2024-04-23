import axios from "axios";

// 创建 axios 实例
const instance = axios.create({
    // API（接口）的前缀 URL
    // 在全局配置文件中，使用了正向代理，所以修改为对应的代理规则处理的前缀
    baseURL:"/api",
    // 请求超时时间
    timeout: 7000
})

// 暴露出去
export default instance;