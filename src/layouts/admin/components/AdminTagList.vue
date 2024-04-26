<script setup>
import {ref} from 'vue'
import {useMenuStore} from "@/stores/menu.js";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {getTabList, setTabList} from "@/composables/tag-list.js";

// 获取菜单store，同步菜单伸缩
const menuStore = useMenuStore()
// 获取一个route对象，用于获取path
const route = useRoute()
// 当前被选中的tab
const activeTab = ref(route.path)
// 路由对象
const router = useRouter()
// 标签数组，定义tab标签栏的内容
const tabList = ref([
    {
        title: '控制台',
        path: "/admin/index"
    },
])

// 动态添加tab标签页
function addTab(tab) {
    // 标签是否不存在
    let isTabNotExisted = tabList.value.findIndex(item => item.path === tab.path) === -1
    // 如果不存在
    if (isTabNotExisted) {
        // 添加标签
        tabList.value.push(tab)
    }
    // 存储 tabList 到 Cookie中
    setTabList(tabList.value)
}

function initTabList() {
    // 从cookie中获取缓存起来的标签导航栏数据
    let tabs = getTabList()
    // 若不为空，则赋值
    if (tabs) {
        tabList.value = tabs
    }
}

// 调用上面的方法，初始化标签导航栏
initTabList()

// 在路由切换前被调用的钩子函数
onBeforeRouteUpdate((to, from) => {
    // 设置被激活的Tab标签
    activeTab.value = to.path
    // 添加Tab标签页
    addTab({
        title: to.meta.title,
        path: to.path
    })
})

// 点击标签可以切换页面
const tabChange = (path) => {
    // 设置被激活的 Tab 标签
    activeTab.value = path
    // 路由跳转
    router.push(path)
}

// 删除 Tab 标签
const removeTab = (path) => {
    let tabs = tabList.value
    // 当前被选中的tab标签
    let actTab = activeTab.value
    
    // 如果要删除的是当前被选中的标签页，则需要判断被删除后，需要激活那个tab标签页
    if (actTab === path) {
        //循环tabList
        tabs.forEach((tab, index)=>{
            // 获取被选中的tab
            if (tab.path === path) {
                // 拿到被选中的标签页下标，如果它后面还有标签页，则取下一个标签页，否则取上一个
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    actTab = nextTab.path
                }
            }
        })
        
    }
    // 需要被激活的标签页
    activeTab.value = actTab
    // 过滤掉被删除的标签页，重新设置回去
    tabList.value = tabList.value.filter((tab) => tab.path != path)
    // 存储到 cookie中
    setTabList(tabList.value)
    // 切换标签页（注意是value）
    tabChange(activeTab.value)
}

// 处理关闭标签菜单事件
const handleCloseTab = (command) => {
    // 首页路由
    let indexPath = '/admin/index'
    // 处理关闭其他
    if (command=='closeOthers'){
        // 仅过滤出首页和当前页
        tabList.value = tabList.value.filter((tab)=>tab.path === indexPath || tab.path=== activeTab.value)
    // 处理关闭所有
    }else if(command=='closeAll'){
        // 先切换回首页
        activeTab.value = indexPath
        // 只保留首页
        tabList.value = tabList.value.filter((tab)=>tab.path === indexPath)
        // 切换标签页
        tabChange(activeTab.value)
    }
    // 将当前tabList设置到Cookie中
    setTabList(tabList.value)
}
</script>

<template>
    <div
        class="fixed top-[64px] h-[44px] px-2 right-0 z-50 flex items-center bg-white transition-all duration-300 shadow"
        :style="{left: menuStore.menuWidth}">
        <!-- 左边：标签导航栏 -->
        <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-remove="removeTab" @tab-change="tabChange"
                 style="min-width: 10px;">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
                         :closable="item.path != '/admin/index'">
            </el-tab-pane>
        </el-tabs>
        
        <!-- 右侧：下拉菜单 -->
        <span class="ml-auto flex items-center justify-center h-[32px] w-[32px]">
            <el-dropdown @command="handleCloseTab">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down/>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
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