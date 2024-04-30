import axios from "@/axios.js";

// 获取分类分页的数据
export function getTagPageList(data){
    return axios.post("/admin/tag/list",data)
}

// 添加分类
export function addTag(data){
    return axios.post('/admin/tag/add',data)
}

//删除分类
export function deleteTag(id){
    return axios.post('/admin/tag/delete',{id})
}

// 修改分类
export function updateTag(data){
    return axios.post('/admin/tag/update',data)
}