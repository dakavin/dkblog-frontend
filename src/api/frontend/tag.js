import axios from "@/axios.js"

// 获取标签列表
export function getTagList(data) {
    return axios.post("/tag/list",data)
}