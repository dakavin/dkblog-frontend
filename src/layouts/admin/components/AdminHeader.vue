<script setup>
import {useMenuStore} from '@/stores/menu.js'
import {Expand, Refresh} from "@element-plus/icons-vue";
import {useFullscreen} from "@vueuse/core";
import {useUserStore} from "@/stores/user.js";
import {useRouter} from "vue-router";
import {showMessage, showModel} from "@/composables/util.js";

// 引入pinia中的菜单store
const menuStore = useMenuStore()
// icon点击事件
const handleMenuWidth = () => {
    // 动态设置菜单的宽度大小
    menuStore.handleMenuWidth()
}

// isFullScreen 表示当前是否处于全屏，toggle 用于动态切换全屏和非全屏
const {isFullscreen, toggle} = useFullscreen()

// 刷新页面
const handleRefresh = () => location.reload()

// 引入用户store
const userStore = useUserStore()
// 引入 router
const router = useRouter()

// 下拉菜单事件处理
const handleCommand = (command) =>{
    // 更新密码
    if (command == 'updatePassword'){
        // todo
    }else if (command = 'logout'){
        logout()
    }
}

// 退出登录
function logout(){
    showModel('确认退出登录吗？').then(()=>{
        userStore.logout()
        showMessage('退出登录成功!')
        // 跳转登录页面
        router.push('/login')
    })
}
</script>

<template>
    <!-- 通过 flex 指定水平布局 -->
    <!-- 设置背景色为白色、高度为 64px，padding-right 为 4， border-bottom 为 slate 200 -->
    <div class="bg-white h-[64px] flex pr-4 border-b border-slate-100">
        <!-- 左边栏收缩、展开 -->
        <div @click="handleMenuWidth"
             class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200">
            <el-icon>
                <!-- 实现收缩和展开时，显示不同的图标 -->
                <Fold v-if="menuStore.menuWidth === '250px'"/>
                <Expand v-else/>
            </el-icon>
        </div>
        
        <!-- 右边容器，通过 ml-auto 让其在父容器的右边 -->
        <div class="ml-auto flex">
            <!-- 点击刷新页面 -->
            <el-tooltip class="box-item" effect="dark" content="刷新当前页面" placement="bottom">
                <div @click="handleRefresh"
                     class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200">
                    <el-icon>
                        <Refresh/>
                    </el-icon>
                </div>
            </el-tooltip>
            
            <!-- 点击全屏展示 -->
            <el-tooltip v-if="!isFullscreen" class="box-item" effect="dark" content="全屏" placement="bottom">
                <div @click="toggle"
                     class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-5 hover:bg-gray-200">
                    <el-icon>
                        <FullScreen/>
                    </el-icon>
                </div>
            </el-tooltip>
            <!-- 点击退出全屏展示 -->
            <el-tooltip v-else class="box-item" effect="dark" content="退出全屏" placement="bottom">
                <div @click="toggle"
                     class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200">
                    <el-icon>
                        <Aim/>
                    </el-icon>
                </div>
            </el-tooltip>
            
            <!-- 登录用户头像 -->
            <el-dropdown class="flex items-center justify-center" @command="handleCommand">
                <span class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs">
                    <!-- 头像 Avatar -->
                    <el-avatar class="mr-2" :size="25" src="./src/assets/default_avatar.webp"/>
                    {{userStore.userInfo.username}}
                    <el-icon class="el-icon--right">
                        <arrow-down/>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command='updatePassword'>修改密码</el-dropdown-item>
                        <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style scoped>

</style>