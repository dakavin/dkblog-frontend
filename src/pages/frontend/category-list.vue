<script setup>
import Header from '@/layouts/frontend/components/Header.vue'
import Footer from '@/layouts/admin/components/AdminFooter.vue'
import UserInfoCard from "@/layouts/frontend/components/UserInfoCard.vue";
import TagCard from "@/layouts/frontend/components/TagCard.vue";
import CagegoryListCard from "@/layouts/frontend/components/CategoryListCard.vue";
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
                    <!-- 分类列表 -->
                    <CagegoryListCard></CagegoryListCard>
                </div>
                
                <!-- 右边侧边栏，占用一列 -->
                <aside class="col-span-4 md:col-span-1">
                    <!-- 博主信息 -->
                    <UserInfoCard/>
                    <!-- 标签 -->
                    <TagCard/>
                </aside>
            </div>
        
        </main>
        
        <Footer class="mt-auto"></Footer>
    </div>
</template>

