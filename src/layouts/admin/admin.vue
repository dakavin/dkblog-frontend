<script setup>
//引入布局组件
import AdminFooter from "@/layouts/admin/components/AdminFooter.vue";
import AdminHeader from "@/layouts/admin/components/AdminHeader.vue";
import AdminMenu from "@/layouts/admin/components/AdminMenu.vue";
import AdminTagList from "@/layouts/admin/components/AdminTagList.vue";
import {useMenuStore} from "@/stores/menu.js";
import {showMessage} from "@/composables/util.js";

// 同步菜单store中menu的宽度
const menuStore = useMenuStore()

// 欢迎语
showMessage('欢迎来到Admin管理页面！🌸撒花🌸')
showMessage('😀DK Blog 祝你有美好的心情！😀')
</script>

<template>
    <!-- 外层容器 -->
    <el-container>
        
        <!-- 左边侧边栏 -->
        <el-aside :width="menuStore.menuWidth" class="transition-all">
            <AdminMenu/>
        </el-aside>
        
        <!-- 右边区域主要内容 -->
        <el-container>
            <!-- 右边顶栏 -->
            <el-header>
                <AdminHeader/>
            </el-header>
            
            <!-- 右边容器 -->
            <el-main>
                <!-- 标签导航栏 -->
                <AdminTagList/>
                
                <!-- 主内容（根据路由动态展示不同页面） -->
                <router-view v-slot="{ Component }">
                    <!-- 用于优化路由跳转时，组件的加载css，即组件的过渡效果 -->
                    <Transition name="fade">
                        <!-- 用于缓存vue组件，不用每次加载组件的时候，都要和后端请求数据 -->
                        <!-- max 指定最多缓存 10 个组件 -->
                        <KeepAlive :max="10">
                            <component :is="Component"></component>
                        </KeepAlive>
                    </Transition>
                </router-view>
            </el-main>
            
            <!-- 右边页脚 -->
            <el-footer>
                <AdminFooter/>
            </el-footer>
        </el-container>
    
    </el-container>
</template>

<style scoped>
.el-header {
    padding: 0 !important;
}

.el-footer {
    padding: 0 !important;
}

/* 内容区域过渡动画：淡入淡出效果 */
/* 刚开始进入时 */
.fade-enter-from {
    /* 透明度 */
    opacity: 0;
}

/* 刚开始结束 */
.fade-enter-to {
    opacity: 1;
}

/* 刚开始离开 */
.fade-leave-from {
    opacity: 1;
}

/* 离开已结束 */
.fade-leave-to {
    opacity: 0;
}

/* 离开进行中 */
.fade-leave-active {
    transition: all 0.3s;
}

/* 进入进行中 */
.fade-enter-active {
    transition: all 0.3s;
    transition-delay: 0.3s;
}
</style>