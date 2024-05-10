import {defineStore} from "pinia";
import {ref} from 'vue'
import {getBlogSettingsDetail} from "@/api/frontend/blogsettings.js";

export const useBlogSettingsStore = defineStore('blogsettings', () => {
    // 博客设置信息
    const blogSettings = ref({})

    // 获取博客设置信息
    function getBlogSettings() {
        // 调用后台获取博客设置信息接口
        getBlogSettingsDetail().then((res) => {
            if (res.success) {
                blogSettings.value = res.data
            }
        })
    }

    return {blogSettings, getBlogSettings}

}, {
    // 开启持久化
    persist: true,
})