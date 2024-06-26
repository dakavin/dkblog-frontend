<script setup>
import Header from '@/layouts/frontend/components/Header.vue'
import Footer from '@/layouts/admin/components/AdminFooter.vue'
import UserInfoCard from "@/layouts/frontend/components/UserInfoCard.vue";
import TagCard from "@/layouts/frontend/components/TagCard.vue";
import CategoryListCard from "@/layouts/frontend/components/CategoryListCard.vue";
import {ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {getArticleDetail} from "@/api/frontend/article.js";

const route = useRoute()
const router = useRouter()

// 文章数据
const article = ref({})

// 获取文章详情
function refreshArticleDetail(articleId) {
    getArticleDetail(articleId).then((res) => {
        if (res.success) {
            article.value = res.data
        }
    })
}

refreshArticleDetail(route.params.articleId)

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（分类 ID、分类名称）
    router.push({path: '/category/article/list', query: {id, name}})
}
// 跳转标签文章列表页
const goTagArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（标签 ID、标签名称）
    router.push({path: '/tag/article/list', query: {id, name}})
}
// 监听路由
watch(route, (newRoute, oldRoute) => {
    // 重新渲染文章详情，实现上一篇和下一篇文章的跳转
    refreshArticleDetail(newRoute.params.articleId)
})
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header/>
        
        <!-- 主内容区域 -->
        <main class="container max-w-screen-xl mx-auto p-4 px-6">
            <!-- grid 表格布局，分为 4 列 -->
            <div class="grid grid-cols-4 gap-7">
                <!-- 左边栏，占用 3 列 -->
                <div class="col-span-4 md:col-span-3 mb-3">
                    <!-- 文章详情 -->
                    <!-- 文章卡片父容器 -->
                    <div
                        class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <!-- 面包屑 -->
                        <nav class="flex text-gray-400" aria-label="Breadcrumb">
                            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                                <li class="inline-flex items-center">
                                    <a href="#"
                                       class="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        <svg class="w-3 h-3 mr-2.5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                        </svg>
                                        首页
                                    </a>
                                </li>
                                <li>
                                    <div class="flex items-center">
                                        /
                                        <a href="#"
                                           class="ml-1 text-sm font-medium md:ml-3 dark:text-gray-400 dark:hover:text-white">正文</a>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <!-- 文章 -->
                        <article>
                            <!-- 文章标题 -->
                            <h1 class="mt-4 font-bold text-3xl">{{ article.title }}</h1>
                            <!-- 文章 meta 信息，如发布时间等 -->
                            <div class="text-gray-400 flex items-center mt-5 text-sm">
                                <!-- 发布时间 -->
                                <svg class="inline w-3 h-3 mr-2 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                                </svg>
                                <span class="hidden md:inline mr-1">发表于</span> {{ article.createTime }}
                                
                                <!-- todo：更新时间 -->
                                
                                <!-- 分类 -->
                                <svg class="inline w-3 h-3 ml-5 mr-2 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M1 5v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1Zm0 0V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H1Z"/>
                                </svg>
                                <span class="hidden md:inline mr-1">分类于</span>
                                <a @click="goCategoryArticleListPage(article.categoryId, article.categoryName)"
                                   class="hover:underline">
                                    {{ article.categoryName }}
                                </a>
                                
                                <!-- 阅读量 -->
                                <svg class="inline w-3 h-3 ml-5 mr-2 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                       stroke-width="2">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                    </g>
                                </svg>
                                <span class="hidden md:inline mr-1">阅读量</span> {{ article.readNum }}
                            </div>
                            <!-- 正文 -->
                            <div class="mt-5" v-html="article.content"></div>
                            <!-- 标签集合 -->
                            <div v-if="article.tags && article.tags.length>0" class="mt-5">
                                <span @click="goTagArticleListPage(tag.id, tag.name)"
                                      v-for="(tag, index) in article.tags" :key="index"
                                      class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
                                    # {{ tag.name }}
                                </span>
                            </div>
                            <!-- 上下篇 -->
                            <nav class="flex flex-row mt-7">
                                <!-- basis-1/2 用于占用 flex 布局的一半空间 -->
                                <div class="basis-1/2">
                                    <!-- h-full 指定高度占满 -->
                                    <a v-if="article.preArticle" @click="router.push('/article/' + article.preArticle.articleId)"
                                       class="flex flex-col h-full p-4 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <div>
                                            <svg class="inline w-3.5 h-3.5 mr-2 mb-1" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
                                            </svg>
                                            上一篇
                                        </div>
                                        <div>{{ article.preArticle.title }}</div>
                                    </a>
                                </div>
                                
                                <div class="basis-1/2">
                                    <!-- text-right 指定文字居右显示 -->
                                    <a v-if="article.nextArticle" @click="router.push('/article/' + article.nextArticle.articleId)"
                                       class="flex flex-col h-full text-right p-4 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <div>
                                            下一篇
                                            <svg class="inline w-3.5 h-3.5 ml-2 mb-1" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path>
                                            </svg>
                                        </div>
                                        <div>{{ article.nextArticle.title }}</div>
                                    </a>
                                </div>
                            </nav>
                        </article>
                    </div>
                </div>
                
                <!-- 右边侧边栏，占用一列 -->
                <aside class="col-span-4 md:col-span-1">
                    <!-- 博主信息 -->
                    <UserInfoCard/>
                    <!-- 分类列表 -->
                    <CategoryListCard/>
                    <!-- 标签 -->
                    <TagCard/>
                </aside>
            </div>
        
        </main>
        
        <Footer class="mt-auto"></Footer>
    </div>
</template>

