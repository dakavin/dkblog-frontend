import {defineStore} from "pinia";
import {ref} from 'vue'
import {getUserInfo} from "@/api/admin/user";

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
    return { userInfo, setUserInfo }
})