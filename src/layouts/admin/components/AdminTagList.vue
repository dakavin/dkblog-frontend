<script setup>
import {ref} from 'vue'
import {useMenuStore} from "@/stores/menu.js";
import {useRoute} from "vue-router";

// 获取菜单store，同步菜单伸缩
const menuStore = useMenuStore()
// 获取一个route对象，用于获取path
const route = useRoute()

// 当前被选中的tab
const activeTab = ref(route.path)
// 标签数组，定义tab标签栏的内容
const tabList = ref([
    {
        title: '控制台',
        path: "/admin/index"
    },
    {
        title: '文章管理',
        path: "/admin/article/list"
    },
    {
        title: '分类管理',
        path: "/admin/category/list"
    },
    {
        title: '标签管理',
        path: "/admin/tag/list"
    },
    {
        title: '博客设置',
        path: "/admin/blog/setting"
    }
])

// 删除 Tab 标签
const removeTab = (targetName) => {
}
</script>

<template>
    <div
        class="fixed top-[64px] h-[44px] px-2 right-0 z-50 flex items-center bg-white transition-all duration-300 shadow"
        :style="{left: menuStore.menuWidth}">
        <!-- 左边：标签导航栏 -->
        <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-remove="removeTab"
                 style="min-width: 10px;">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path" :closable="item.path != '/admin/index'">
            </el-tab-pane>
        </el-tabs>
        
        <!-- 右侧：下拉菜单 -->
        <span class="ml-auto flex items-center justify-center h-[32px] w-[32px]">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>关闭其他</el-dropdown-item>
                        <el-dropdown-item>关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div class="h-[44px]"></div>
</template>

<style>
.el-tabs__item {
    font-size: 12px;
    border: 1px solid #d8dce5 !important;
    border-radius: 3px !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
    margin-left: 0.1rem !important;
    margin-right: 0.1rem !important;
}

.el-tabs__item.is-active {
    background-color: var(--el-color-primary) !important;
    color: #fff;
}

.el-tabs__item.is-active::before {
    content: "";
    background-color: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 4px;
}

.el-tabs {
    height: 32px;
}

.el-tabs__header {
    margin-bottom: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
    height: 32px;
    line-height: 32px;
    border: 0;
    background: #fff;
}

.el-tabs--card > .el-tabs__header {
    border: 0;
}

.el-tabs__nav-prev, .el-tabs__nav-next {
    line-height: 35px;
}

.is-disabled {
    cursor: not-allowed;
    color: #d1d5db;
}

</style>