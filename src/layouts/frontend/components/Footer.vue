<script setup>
const fullYear = new Date().getFullYear();
const siteStartDate = "2023-4-28";
</script>

<template>
    <ElFooter class="font-bold flex flex-col md:flex-row md:justify-between items-center bg-white py-5 px-4 md:px-10 text-sm gradient-text">
        <!-- Copyright -->
        <div class="copyright mb-4 md:mb-0">
            <span v-if="siteStartDate?.length >= 4">
                Copyright © {{ siteStartDate.substring(0, 4) }} -
            </span>
            {{ fullYear }}
        </div>
        <!-- Made by -->
        <div class="mb-4 md:mb-0">
            Made By
            <a href="https://gitee.com/Dakkk_mike" target="_blank" class="underline gradient-text">
                dakkk
            </a>
        </div>
        <!-- ICP Record -->
        <div class="icp md:mb-0 hidden md:block gradient-text">
            备案号:
            <a href="https://beian.miit.gov.cn" target="_blank" class="underline gradient-text">
                粤ICP备2024241387号-1
            </a>
        </div>
    </ElFooter>
</template>

<style scoped>
.gradient-text {
    background: linear-gradient(to right, #3b82f6, rgba(124, 124, 124, 0.66)); /* 从鲜明的蓝色过渡到白色 */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
    footer {
        flex-direction: column;
        justify-content: center;
        padding: 3px;
    }
    footer > div {
        margin-bottom: 3px;  /* 增加每个部分之间的间隔 */
        display: block;      /* 确保所有内容都显示 */
    }
    footer a {
        padding: 3px; /* 增加链接的点击区域 */
    }
}

/* 增加版权和备案号的边距 */
.copyright{
    margin-left: 480px;  /* 调整左右的内边距 */
}
.icp {
    margin-right: 480px;  /* 调整左右的内边距 */
}
@media (max-width: 768px) {
    .copyright, .icp {
        margin-left: 0;  /* 手机端取消左边距 */
        margin-right: 0;  /* 手机端取消右边距 */
    }
}
</style>
