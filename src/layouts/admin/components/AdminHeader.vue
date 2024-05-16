<script setup>
import {useMenuStore} from '@/stores/menu.js'
import {Expand, Refresh} from "@element-plus/icons-vue";
import {useFullscreen} from "@vueuse/core";
import {useUserStore} from "@/stores/user.js";
import {useRouter} from "vue-router";
import {showMessage, showModel} from "@/composables/util.js";
import {reactive, ref, watch} from 'vue'
import {updateAdminPassword} from "@/api/admin/user.js";
import AdminTagList from "@/layouts/admin/components/AdminTagList.vue";
// 引入对话框弹出组件
import FormDialog from "@/components/FormDialog.vue";


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


// 表单引用
const formRef = ref(null)

// 修改密码的表单引用
const form = reactive({
    username: userStore.userInfo.username || '',
    password: '',
    originPassword: '',
    rePassword: '',
})

// 校验规则
const rules = {
    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
    password: [{required: true, message: '新密码不能为空', trigger: 'blur'}],
    originPassword: [{required: true, message: '旧密码不能为空', trigger: 'blur'}],
    rePassword: [
        {required: true, message: '确认密码不能为空', trigger: 'blur'},
    ],
}

// 修改密码对话框是否显示
// const dialogVisible = ref(false)
const formDialogRef = ref(null)
// 修改密码按钮点击事件
const changePwdBtnClick = () => {
    formDialogRef.value.open()
}

// 修改密码提交操作
const onSubmit = () => {
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }
        if (form.password !== form.rePassword) {
            showMessage('两次输入的密码不一致！', 'warning')
            return
        }
        if (form.originPassword === form.password) {
            showMessage('新密码不能和旧密码相同！', 'warning')
            return
        }
        // 显示提交loading
        formDialogRef.value.showBtnLoading()
        // 调用修改用户密码接口
        updateAdminPassword(form).then((res) => {
            // console.log(res)
            // 判断是否成功
            if (res.success === true) {
                showMessage('密码重置成功，请重新登录！')
                // 退出登录
                userStore.logout()
                // 隐藏对话框
                formDialogRef.value.close()
                // 跳转登录页面
                router.push('/login')
            } else {
                // 获取服务端返回的错误消息
                let msg = res.msg
                // 提示消息
                showMessage(msg, 'error')
            }
            
        }).finally(() => formDialogRef.value.closeBtnLoading()) // 隐藏提交loading
    })
}

// 监听 pinia store 中的某个值的变化
watch(() => userStore.userInfo.username, (newValue, oldValue) => {
    // 在这里处理变化后的值
    // console.log('新值:', newValue);
    // console.log('旧值:', oldValue);
    // 可以在这里执行你需要的任何逻辑
    // 重新将新的值，设置回 form 对象中
    form.username = newValue
})

// 下拉菜单事件处理
const handleCommand = (command) => {
    // 更新密码
    if (command == 'updatePassword') {
        // 显示修改密码对话框
        formDialogRef.value.open()
    } else if (command = 'logout') {
        logout()
    }
    return command
}

// 调用键盘enter键监听
// keyboardListen(onSubmit)

// 退出登录
function logout() {
    showModel('确认退出登录吗？').then(() => {
        userStore.logout()
        showMessage('退出登录成功!')
        // 跳转登录页面
        router.push('/login')
    }).catch(() => {
        showMessage('取消退出啦!', 'info')
    })
}
</script>

<template>
    <!-- 固钉组件，通过设置 offset 属性来改变吸顶距离，默认值为 0。 -->
    <el-affix :offset="0">
        <!-- 通过 flex 指定水平布局 -->
        <!-- 设置背景色为白色、高度为 64px，padding-right 为 4， border-bottom 为 slate 200 -->
        <div class="bg-white h-[64px] flex pr-6 border-b border-slate-100">
            <!-- 左边栏收缩、展开 -->
            <div @click="handleMenuWidth"
                 class="menu-toggle w-[42px] h-[64px] cursor-pointer  flex items-center justify-center text-gray-700 hover:bg-gray-200">
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
                         class="hide-on-mobile w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-5 hover:bg-gray-200">
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
                        <span class="font-bold">{{ userStore.userInfo.username }}</span>
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
                
                <!-- 修改密码弹窗 -->
                <FormDialog ref="formDialogRef" title="修改密码" destoryOnClose @submit="onSubmit">
                    <!-- 修改密码表单 -->
                    <el-form ref="formRef" :rules="rules" :model="form">
                        <el-form-item label="用户名" prop="username" label-width="100px">
                            <!-- 输入框组件 -->
                            <el-input size="large" v-model="form.username" placeholder="请输入用户名" clearable
                                      disabled/>
                        </el-form-item>
                        <el-form-item label="旧密码" prop="originPassword" label-width="100px">
                            <el-input size="large" type="password" v-model="form.originPassword"
                                      placeholder="请输入旧密码"
                                      clearable show-password/>
                        </el-form-item>
                        <el-form-item label="新密码" prop="password" label-width="100px">
                            <el-input size="large" type="password" v-model="form.password" placeholder="请设置新密码"
                                      clearable show-password/>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="rePassword" label-width="100px">
                            <el-input size="large" type="password" v-model="form.rePassword"
                                      placeholder="请再次输入新密码"
                                      clearable show-password/>
                        </el-form-item>
                    </el-form>
                </FormDialog>
            </div>
        </div>
        <div>
        <AdminTagList/>
        </div>
    </el-affix>
</template>

<style>
/*手机端隐藏菜单栏伸缩按钮*/
@media (max-width: 768px) {
    .menu-toggle {
        display: none;
    }
}
</style>