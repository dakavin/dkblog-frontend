<script setup>
import {ref} from 'vue'

const dialogVisible = ref(false)

// 对外暴露属性
const props = defineProps({
    title: String, // 字段类型
    width: {
        type: String,
        default: '40%' // 默认值
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type: String,
        default: '提交'
    }
})

// 打开
const open = () => dialogVisible.value = true
// 关闭
const close = () => dialogVisible.value = false

// 确认按钮加载 loading
const btnLoading = ref(false)
// 显示loading
const showBtnLoading = () => btnLoading.value = true
const closeBtnLoading = () => btnLoading.value = false


// 对外暴露一个 submit 方法
const emit = defineEmits(['submit'])
const submit = () => emit('submit')

// 对外暴露方法
defineExpose({
    open,
    close,
    showBtnLoading,
    closeBtnLoading
})
</script>

<template>
    <el-dialog v-model="dialogVisible" :title="title" :width="width" :draggable="true"
               :close-on-click-modal="false" :close-on-press-escape="false"
               align-center center>
        <!-- 插槽 -->
        <slot></slot>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit" :loading="btnLoading">
                    {{ confirmText }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>