import axios from "@/axios.js";

// 获取文章分页的数据
export function getArticlePageList(data){
    return axios.post("/admin/article/list",data)
}

// 添加文章
export function addArticle(data){
    return axios.post('/admin/article/add',data)
}

//删除文章
export function deleteArticle(id){
    return axios.post('/admin/article/delete',{id})
}

// 修改文章
export function updateArticle(data){
    return axios.post('/admin/article/update',data)
}