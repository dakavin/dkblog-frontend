<script setup>
// 引入 Element Plus 中的用户、锁图标
import {Lock, User} from '@element-plus/icons-vue'
import {login} from '@/api/admin/user.js'
import {reactive, ref} from 'vue';
import router from "@/router/index.js";
import {keyboardListen, showMessage} from "@/composables/util.js";
import {setToken} from "@/composables/cookie.js";
import {useUserStore} from "@/stores/user.js";

// 创建用户仓库的对象
const userStore = useUserStore();

// 定义响应式的表单对象
const form = reactive({
    username: '',
    password: ''
})

// 表单引用
const formRef = ref(null);
// 表单验证规则
const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ]
}

// 登录按钮加载动画
const loading = ref(false)

// 登录
const onSubmit = () => {
    // console.log('登录')
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false;
        }
        //开始加载
        loading.value = true
        // 调用登录接口
        login(form.username, form.password).then((res) => {
            // console.log(res);
            //判断是否成功
            if (res.success === true) {
                // 提示登录成功
                showMessage('登录成功！')
                // 存储 token 到 Cookie中去
                let token = res.data.token
                setToken(token)
                // 获取用户信息，并存储到全局状态中（调用另外一个接口 /admin/user/info）
                userStore.setUserInfo()
                // 跳转到后台首页
                router.push("/admin/index")
            } else {
                // 获取服务端返回的错误信息
                let message = res.msg
                // 提示信息
                showMessage(res.msg, 'error')
                // todo 判断错误信息
                
            }
        }).finally(() => {
            // 结束加载
            loading.value = false
        })
    })
}

// 调用键盘enter键监听
keyboardListen(onSubmit)

</script>

<template>
    <!-- 使用 grid 网格布局，并指定列数为 2，高度占满全屏 -->
    <div class="grid grid-cols-2 h-screen">
        <!-- 默认先适配移动端，占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端）；背景色为黑色 -->
        <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900">
            <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
            <div
                class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInLeft animate__fast">
                <!-- 默认占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端） -->
                <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900">
                    <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
                    <div class="flex justify-center items-center h-full flex-col">
                        <h2 class="font-bold text-4xl mb-7 text-white">DK Blog 后台登录</h2>
                        <p class="text-white">一款由 Spring Boot + Mybaits Plus + Vue 3.2 + Vite 4
                            开发的前后端分离博客。</p>
                        <!-- 指定图片宽度为父级元素的 1/2 -->
                        <img src="@/assets/developer.png" class="w-1/2">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
            <!-- flex-col 用于指定子元素垂直排列 -->
            <div
                class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast">
                <!-- 大标题，设置字体粗细、大小、下边距 -->
                <h1 class="font-bold text-4xl mb-5">😃欢迎回来！</h1>
                <!-- 设置 flex 布局，内容垂直水平居中，文字颜色，以及子内容水平方向 x 轴间距 -->
                <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
                    <!-- 左边横线，高度为 1px, 宽度为 16，背景色设置 -->
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                    <span>😎请输入账户和密码</span>
                    <!-- 右边横线 -->
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                </div>
                <!-- 引入 Element Plus 表单组件，移动端设置宽度为 5/6 PC端设置为 2/5 -->
                <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="form">
                    
                    <!-- 输入框组件 -->
                    <el-form-item prop="username">
                        <el-input size="large" v-model="form.username" placeholder="请输入用户名" :prefix-icon="User"
                                  clearable/>
                    </el-form-item>
                    
                    <!-- 密码框组件 -->
                    <el-form-item prop="password">
                        <el-input size="large" v-model="form.password" type="password" placeholder="请输入密码"
                                  :prefix-icon="Lock"
                                  clearable show-password/>
                    </el-form-item>
                    
                    <!-- 登录按钮组件 -->
                    <el-form-item>
                        <!-- 登录按钮，宽度设置为 100% -->
                        <el-button class="w-full mt-2" size="large" :loading="loading" type="primary" @click="onSubmit">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>