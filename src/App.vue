<script setup>
/*
js 代码, setup 标识通常和组合式 API 搭配使用,
用于告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API
*/
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import cursorInit from "@/composables/cursor.js";
import cursorInit from '@/composables/cursor-new.js'
import {onMounted} from "vue";

const locale = zhCn

onMounted(() => {
    // 自定义鼠标
    cursorInit();
    
    // 屏蔽右键
    document.oncontextmenu = () => {
        ElMessage({
            message: "为了浏览体验，本站禁用右键",
            grouping: true,
            duration: 2000,
        });
        return false;
    };
    
    // 控制台输出
    const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
    const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
    const styleContent = "color: rgb(30,152,255);";
    const title1 = "Dakkkの博客";
    const title2 = "\n被你发现了┗|｀O′|┛ 嗷~~";
    const content = `\n\n版本: v0.0.1 \n主页: www.dakkk.top \nGithub: https://github.com/dakavin`;
    console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
});
</script>

<template>
    <div class="custom-cursor">
    <!-- 默哀的时候开启 -->
    <!--<div class="custom-cursor grayscale">-->
        <!-- html 代码 -->
        <el-config-provider :locale="locale">
            <router-view/>
        </el-config-provider>
    </div>
</template>

<style scoped>
/*
css 代码， scoped 表示节点内 css 样式只针对此组件有效，不影响其他组件
*/

/* 自定义顶部加载 Loading 颜色 */
#nprogress .bar {
    background: #409eff !important;
}
</style>