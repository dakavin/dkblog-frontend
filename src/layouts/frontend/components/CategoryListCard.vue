<script setup>
import { ref } from 'vue'
import {getCategoryList} from "@/api/frontend/category.js";
import {useRouter} from "vue-router";

// 获取所有分类
const categories = ref([])
getCategoryList().then((res)=>{
    if (res.success){
        categories.value = res.data
    }
})

// 点击分类跳转功能实现
// 引入路由
const router = useRouter()
// 跳转分类文章列表页
const goCategoryArticleListPage = (id,name)=>{
    // 跳转时通过 query 携带参数（分类id、分类名称）
    router.push({path:'/category/article/list',query:{id,name}})
}
</script>

<template>
    <!-- 分类 -->
    <div v-if="categories.length > 0"
        class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <!-- 分类标题 -->
        <h2 class="flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white">
            <!-- 文件夹图标 -->
            <svg t="1716036447916" class="icon w-5 h-5 mr-2" viewBox="0 0 1204 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3524" width="200" height="200"><path d="M561.63235285 164.57352927h335.01838211c27.29779432 0 49.63235285 22.33455854 49.63235366 49.63235284v62.04044147c0 27.29779432-22.33455854 49.63235285-49.63235366 49.63235284H561.63235285c-27.29779432 0-49.63235285-22.33455854-49.63235285-49.63235284v-62.04044147c0-27.29779432 22.33455854-49.63235285 49.63235285-49.63235284z" fill="#AFFCFE" p-id="3525"></path><path d="M983.50735284 933.875H189.38970568c-54.59558862 0-99.26470568-44.66911789-99.26470568-99.26470568V189.38970568c0-54.59558862 44.66911789-99.26470568 99.26470568-99.26470568h285.38602928c68.24448496 18.61213211 54.59558862 53.35477927 99.2647065 99.26470568l31.02021992 49.63235286H983.50735284c54.59558862 0 99.26470568 44.66911789 99.26470569 99.2647065v496.32352928c0 54.59558862-44.66911789 99.26470568-99.26470569 99.26470568z" fill="#2F77F1" p-id="3526"></path></svg>
            分类
        </h2>
        <!-- 分类列表 -->
        <div
            class="text-sm font-medium text-gray-600 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <a @click="goCategoryArticleListPage(category.id,category.name)"
                v-for="(category,index) in categories" :key="index"
               class="flex items-center w-full px-4 py-2 rounded-lg border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                <svg class="w-3.5 h-3.5 mr-1.5 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5"/>
                </svg>
                {{ category.name }}
            </a>
        </div>
    </div>
</template>

<style scoped>

</style>