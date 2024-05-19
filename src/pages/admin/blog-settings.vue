<script setup>
import {reactive, ref} from "vue";
import {Check, Close} from "@element-plus/icons-vue";
import {getBlogSettingsDetail, updateBlogSettings} from "@/api/admin/blogsettings.js";
import {uploadFile} from "@/api/admin/file.js";
import {showMessage} from "@/composables/util.js";

// 表单对象
const form = reactive({
    name: '',
    author: '',
    logo: '',
    avatar: '',
    introduction: '',
    githubHomepage: '',
    giteeHomepage: '',
    email: '',
    otherHomepage: '',
})

// 表单规则校验
const rules = {
    name: [{required: true, message: '请输入博客名称', trigger: 'blur'}],
    author: [{required: true, message: '请输入作者名', trigger: 'blur'}],
    logo: [{required: true, message: '请上传博客 LOGO', trigger: 'blur'}],
    avatar: [{required: true, message: '请上传作者头像', trigger: 'blur'}],
    introduction: [{required: true, message: '请输入介绍语', trigger: 'blur'}],
}

// 是否开启 GitHub
const isGithubChecked = ref(false)
// 是否开启 Gitee
const isGiteeChecked = ref(false)
// 是否开启知乎
const isEmailChecked = ref(false)
// 是否开启 CSDN
const isOtherChecked = ref(false)

// 监听 Github Switch 改变事件
const githubSwitchChange = (checked) => {
    if (checked == false) {
        form.githubHomepage = ''
    }
}

// 监听 Gitee Switch 改变事件
const giteeSwitchChange = (checked) => {
    if (checked == false) {
        form.giteeHomepage = ''
    }
}

// 监听Email Switch 改变事件
const emailSwitchChange = (checked) => {
    if (checked == false) {
        form.email = ''
    }
}

// 监听 Other Switch 改变事件
const otherSwitchChange = (checked) => {
    if (checked == false) {
        form.otherHomepage = ''
    }
}

// 初始化博客设置数据，并渲染到页面上
function initBlogSettings() {
    //请求后台，获取后台数据
    getBlogSettingsDetail().then((res) => {
        // console.log(res)
        if (res.success === true) {
            // 设置表单数据
            form.name = res.data.name
            form.author = res.data.author
            form.logo = res.data.logo
            form.avatar = res.data.avatar
            form.introduction = res.data.introduction
            
            // 第三方平台信息设置，先判断后端返回平台链接是否为空，若不为空，则将 switch 组件置为选中状态，并设置表单对应数据
            if (res.data.githubHomepage) {
                isGithubChecked.value = true
                form.githubHomepage = res.data.githubHomepage
            }
            
            if (res.data.giteeHomepage) {
                isGiteeChecked.value = true
                form.giteeHomepage = res.data.giteeHomepage
            }
            
            if (res.data.email) {
                isEmailChecked.value = true
                form.email = res.data.email
            }
            
            if (res.data.otherHomepage) {
                isOtherChecked.value = true
                form.otherHomepage = res.data.otherHomepage
            }
        }
    })
}

// 手动调用一下初始化方法
initBlogSettings()

// 上传 logo 图片
const handleLogoChange = (file) => {
    // 表单对象
    let formData = new FormData()
    // 添加 file 字段，并将文件传入
    formData.append('file', file.raw)
    uploadFile(formData).then((res) => {
        // 响参失败，提示错误消息
        if (res.success === false) {
            let msg = res.msg
            showMessage(msg, 'error')
            return
        }
        // 成功则 后台上传图片，并获取图片链接
        if (form.logo === res.data.url) {
            showMessage("请勿重复上传LOGO", 'warning')
        } else {
            form.logo = res.data.url
            showMessage("LOGO上传成功,请保存设置", 'info')
        }
    })
}

// 上传 用户头像
const handleAvatarChange = (file) => {
    // 表单对象
    let formData = new FormData()
    // 添加 file 字段，并将文件传入
    formData.append('file', file.raw)
    uploadFile(formData).then((res) => {
        // 响参失败，提示错误消息
        if (res.success === false) {
            let msg = res.msg
            showMessage(msg, 'error')
            return
        }
        // 成功则 后台上传图片，并获取图片链接
        if (form.avatar === res.data.url) {
            showMessage("请勿重复上传头像", 'warning')
        } else {
            form.avatar = res.data.url
            showMessage("头像上传成功,请保存设置", 'info')
        }
    })
}

// ---表单提交方法（更新博客设置）---

// 是否显示保存按钮的 loading 状态，默认为false
const btnLoading = ref(false)
// 表单引用
const formRef = ref(null)
// 保存当前博客设置
const onSubmit = () => {
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }
        
        // 显示保存按钮 loading
        btnLoading.value = true
        updateBlogSettings(form).then((res) => {
            if (res.success === false){
                // 获取服务端返回的错误消息
                let msg = res.msg
                // 提示错误消息
                showMessage(msg, 'error')
                return
            }
            // 重新渲染页面中的数据
            initBlogSettings()
            showMessage('保存成功！')
        }).finally(()=>btnLoading.value =false) // 隐藏保存按钮 loading
    })
}
</script>

<template>
    <div>
        <!-- 卡片组件，nerver指定卡片组件没有阴影 -->
        <el-card shadow="never">
            <!-- 内容区域 -->
            <el-form ref="formRef" :model="form" label-width="160px" :rules="rules">
                <el-form-item label="博客名称" prop="name">
                    <el-input v-model="form.name" clearable/>
                </el-form-item>
                <el-form-item label="作者名" prop="author">
                    <el-input v-model="form.author" clearable/>
                </el-form-item>
                
                <el-form-item label="博客 LOGO" prop="logo">
                    <el-upload class="avatar-uploader" action="#"
                               :on-change="handleLogoChange" :auto-upload="false"
                               :show-file-list="false">
                        <img v-if="form.logo" :src="form.logo" class="avatar"/>
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus/>
                        </el-icon>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="作者头像" prop="avatar">
                    <el-upload class="avatar-uploader" action="#"
                               :on-change="handleAvatarChange" :auto-upload="false"
                               :show-file-list="false">
                        <img v-if="form.avatar" :src="form.avatar" class="avatar"/>
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus/>
                        </el-icon>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="介绍语" prop="introduction">
                    <el-input v-model="form.introduction" type="textarea"/>
                </el-form-item>
                
                <!-- 开启 Github 访问 -->
                <el-form-item label="GihHub 访问">
                    <el-switch v-model="isGithubChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                               @change="githubSwitchChange"/>
                </el-form-item>
                <el-form-item label="GitHub 主页访问地址" v-if="isGithubChecked">
                    <el-input v-model="form.githubHomepage" clearable placeholder="请输入 GitHub 主页访问的 URL"/>
                </el-form-item>
                
                <!-- 开启 Gitee 访问 -->
                <el-form-item label="Gitee 访问">
                    <el-switch v-model="isGiteeChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                               @change="giteeSwitchChange"/>
                </el-form-item>
                <el-form-item label="Gitee 主页访问地址" v-if="isGiteeChecked">
                    <el-input v-model="form.giteeHomepage" clearable placeholder="请输入 Gitee 主页访问的 URL"/>
                </el-form-item>
                
                <!-- 开启邮箱访问 -->
                <el-form-item label="邮箱访问">
                    <el-switch v-model="isEmailChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                               @change="emailSwitchChange"/>
                </el-form-item>
                <el-form-item label="邮箱主页访问地址" v-if="isEmailChecked">
                    <el-input v-model="form.email" clearable placeholder="请输入知乎主页访问的 URL"/>
                </el-form-item>
                
                <!-- 开启 其他主页 访问 -->
                <el-form-item label="其他主页 访问">
                    <el-switch v-model="isOtherChecked" inline-prompt :active-icon="Check" :inactive-icon="Close"
                               @change="otherSwitchChange"/>
                </el-form-item>
                <el-form-item label="其他主页访问地址" v-if="isOtherChecked">
                    <el-input v-model="form.otherHomepage" clearable placeholder="请输入 其他主页 访问的 URL"/>
                </el-form-item>
                
                
                <el-form-item>
                    <el-button type="primary" :loading="btnLoading" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style>
/* 解决 textarea :focus 状态下，边框消失的问题 */
.el-textarea__inner:focus {
    outline: 0 !important;
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
}
</style>

<style scoped>
.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>