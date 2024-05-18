<script setup>
import {ref} from 'vue'
import {getTagList} from "@/api/frontend/tag.js";
import {useRouter} from "vue-router";

// 所有标签
const tags = ref([])
getTagList().then((res) => {
    if (res.success) {
        tags.value = res.data
    }
})

// 点击分类跳转功能实现
// 引入路由
const router = useRouter()
// 跳转标签文章列表页
const goTagArticleListPage = (id,name)=>{
    // 跳转时通过 query 携带参数（标签 ID、标签名称）
    router.push({path:'/tag/article/list',query:{id,name}})
}
</script>

<template>
    <div v-if="tags.length > 0"
         class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <!-- 标签标题 -->
        <h2 class="flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white">
            <!-- 标签图标 -->
            <svg t="1716036518206" class="icon w-5 h-5 mr-2" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5412" width="200" height="200"><path d="M0.257086 118.094877C-3.815151 57.01132 40.979458 5.42965 102.063015 0h16.288948l393.649591 9.501887c25.790835 1.357412 50.224258 12.216711 67.870619 31.220484l414.010775 414.010776c42.079784 42.079784 42.079784 111.307815-1.357412 153.387599L608.377833 992.26845c-42.079784 42.079784-109.950403 42.079784-153.387599 1.357412L40.979458 578.257674c-19.003773-17.646361-29.863072-42.079784-31.220485-67.870619L0.257086 118.094877z" fill="#2F77F1" p-id="5413"></path><path d="M233.732016 225.330455m-108.592991 0a108.59299 108.59299 0 1 0 217.185981 0 108.59299 108.59299 0 1 0-217.185981 0Z" fill="#AFFCFE" p-id="5414"></path></svg>
            标签
        </h2>
        <!-- 标签列表 -->
        <span @click="goTagArticleListPage(tag.id,tag.name)"
            v-for="(tag,index) in tags" :key="index"
              class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5
              py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
            {{ tag.name }}
        </span>
    </div>
</template>

<style scoped>

</style>