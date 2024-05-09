import axios from "@/axios.js";

// 获取分类分页的数据
export function getCategoryPageList(data){
    return axios.post("/admin/category/list",data)
}

// 添加分类
export function addCategory(data){
    return axios.post('/admin/category/add',data)
}

//删除分类
export function deleteCategory(id){
    return axios.post('/admin/category/delete',{id})
}

// 修改分类
export function updateCategory(data){
    return axios.post('/admin/category/update',data)
}

// 获取分类 select 数据（创建文章的时候使用）
export function getCategorySelectList(){
    return axios.post('/admin/category/select/list')
}