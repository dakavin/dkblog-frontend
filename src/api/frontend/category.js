import axios from "@/axios";

// 获取分类列表
export function getCategoryList(data) {
    return axios.post("/category/list", data)
}

// 获取分类对应的文章列表
export function getCategoryArticlePageList(data){
    return axios.post("/category/article/list",data)
}