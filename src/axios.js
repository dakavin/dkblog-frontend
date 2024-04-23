import axios from "axios";

// 创建 axios 实例
const instance = axios.create({
    // API（接口）的前缀 URL
    baseURL:"http://localhost:8080",
    // 请求超时时间
    timeout: 7000
})

// 暴露出去
export default instance;