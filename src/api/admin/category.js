import axios from "@/axios.js";

// 获取分类分页的数据
export function getCategoryPageList(data){
    return axios.post("/admin/category/list",data)
}