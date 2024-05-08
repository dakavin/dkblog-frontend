import axios from "@/axios.js";

// 上传文件
export function uploadFile(form){
    return axios.post("/admin/file/upload",form)
}