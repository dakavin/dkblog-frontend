import {defineStore} from "pinia";
import {ref} from 'vue'
import {getUserInfo} from "@/api/admin/user";
import {removeToken} from "@/composables/cookie.js";

export const useUserStore = defineStore('user', () => {
    // 用户信息
    const userInfo = ref({})

    // 设置用户信息
    function setUserInfo() {
        // 调用后端获取用户信息的接口
        getUserInfo().then(res => {
            if (res.success === true) {
                userInfo.value = res.data
            }
        })
    }

    // 退出登录（删除前端保存的token）
    function logout() {
        // 删除 cookie 中的 token 令牌
        removeToken()
        // 删除 登录用户信息
        userInfo.value = {}
    }

    return { userInfo, setUserInfo, logout }
},
{
    // 开启持久化
    persist: true,
})