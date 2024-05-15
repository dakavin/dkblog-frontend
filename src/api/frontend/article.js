import axios from "@/axios.js"

// 获取文章列表
export function getArticlePageList(data) {
    return axios.post('/article/list',data)
}