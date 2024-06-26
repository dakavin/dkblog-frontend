<script setup>
import {onMounted} from 'vue'
import {initTooltips} from "flowbite";
import {useBlogSettingsStore} from "@/stores/blogsettings.js";

// 初始化 Flowbit 组件
onMounted(() => {
    initTooltips();
})

// 引入博客设置信息 store
const blogSettingsStore = useBlogSettingsStore()

// 点击跳转通用设置
const jump = (url) => {
    // 在新窗口访问新的链接地址
    window.open(url,'_blank')
}
</script>

<template>
    <!-- 博主信息 -->
    <div
        class="w-full py-5 px-2 mb-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center">
            <!-- 博主头像 -->
            <img style="width: 80px; height: 80px;" class="mb-3 rounded-full shadow"
                 :src="blogSettingsStore.blogSettings.avatar"/>
            <!-- 博主昵称 -->
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {{ blogSettingsStore.blogSettings.author }}
            </h5>
            <!-- 介绍语 -->
            <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ blogSettingsStore.blogSettings.introduction }}
            </span>
            <!-- 第三方平台主页跳转（如 GitHub 等） -->
            <div class="flex justify-center gap-3">
                <!-- GitHub -->
                <svg v-if="blogSettingsStore.blogSettings.githubHomepage"
                     @click="jump(blogSettingsStore.blogSettings.githubHomepage)"
                     t="1715738815971" data-tooltip-target="github-tooltip-bottom"
                     data-tooltip-placement="bottom" class="icon mt-5 w-7 h-7" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2362" width="200" height="200">
                    <path
                        d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0 231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314 0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822 31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829 3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417 57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508 32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095 52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939 53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109 17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579 138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158 258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051 0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959 234.942803 794.673558 0 512 0"
                        fill="#1296db" p-id="2363"
                        data-spm-anchor-id="a313x.search_index.0.i0.2f753a81VUt1wb" class="selected"></path>
                </svg>
                <div id="github-tooltip-bottom" role="tooltip"
                     class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    我的 GitHub
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <!-- Gitee -->
                <svg v-if="blogSettingsStore.blogSettings.giteeHomepage"
                     @click="jump(blogSettingsStore.blogSettings.giteeHomepage)"
                     t="1715738489969" data-tooltip-target="gitee-tooltip-bottom"
                     data-tooltip-placement="bottom" class="icon mt-5 w-7 h-7" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1464" width="200" height="200">
                    <path
                        d="M512 1024c282.752 0 512-229.248 512-512S794.752 0 512 0 0 229.248 0 512s229.248 512 512 512z"
                        fill="#1296db" p-id="1465"
                        data-spm-anchor-id="a313x.search_index.0.i0.55d53a812S5u1E" class="selected"></path>
                    <path
                        d="M771.285333 455.253333h-290.773333a25.301333 25.301333 0 0 0-25.301333 25.258667v63.189333c0 13.994667 11.306667 25.301333 25.258666 25.301334h177.024c13.952 0 25.301333 11.306667 25.301334 25.301333v12.629333c0 41.898667-33.962667 75.861333-75.861334 75.861334h-240.213333a25.301333 25.301333 0 0 1-25.301333-25.301334V417.28A75.861333 75.861333 0 0 1 417.28 341.504h353.92a25.344 25.344 0 0 0 25.301333-25.301333V253.013333a25.258667 25.258667 0 0 0-25.216-25.301333H417.28a189.610667 189.610667 0 0 0-189.610667 189.653333v353.962667c0 13.952 11.306667 25.258667 25.301334 25.258667h372.906666a170.666667 170.666667 0 0 0 170.666667-170.666667v-145.365333a25.301333 25.301333 0 0 0-25.258667-25.301334z"
                        fill="#FFFFFF" p-id="1466"></path>
                </svg>
                <div id="gitee-tooltip-bottom" role="tooltip"
                     class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    我的 Gitee
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <!-- Email -->
                <svg v-if="blogSettingsStore.blogSettings.email"
                     @click="jump(blogSettingsStore.blogSettings.email)"
                     t="1715738618829" data-tooltip-target="emial-tooltip-bottom"
                     data-tooltip-placement="bottom" class="icon mt-5 w-7 h-7" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3151" width="200" height="200">
                    <path
                        d="M1023.049143 202.605714L505.270857 501.540571 0.438857 209.92A146.285714 146.285714 0 0 1 146.285714 73.142857h731.282286a146.285714 146.285714 0 0 1 145.408 129.462857zM1024 309.686857v454.948572a146.285714 146.285714 0 0 1-146.285714 146.358857H146.285714a146.285714 146.285714 0 0 1-146.285714-146.285715V317.44l482.157714 278.381714c16.603429 9.508571 36.571429 7.753143 50.980572-2.925714 0.731429-0.219429 1.243429-0.585143 1.901714-1.024L1024 309.686857z"
                        fill="#1296db" p-id="3152"></path>
                </svg>
                <div id="emial-tooltip-bottom" role="tooltip"
                     class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    我的 Email
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <!-- Music -->
                <svg v-if="blogSettingsStore.blogSettings.otherHomepage"
                     @click="jump(blogSettingsStore.blogSettings.otherHomepage)"
                     t="1715738709512" data-tooltip-target="music-tooltip-bottom"
                     data-tooltip-placement="bottom" class="icon mt-5 w-7 h-7" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4464" width="200" height="200">
                    <path
                        d="M1001.172979 15.015883a63.871501 63.871501 0 0 0-52.255592-14.015891l-544.05975 95.99925A63.935501 63.935501 0 0 0 351.99405 160.00675v549.435707C319.514304 685.890641 277.370633 672.00275 230.586999 672.00275c-27.199788 0-54.399575 4.511965-80.927368 13.311896-60.735526 20.255842-109.439145 60.863525-133.630956 111.487129-18.687854 39.135694-21.087835 81.695362-6.847946 119.871063C33.532538 981.888329 102.715998 1024 185.435352 1024c27.199788 0 54.399575-4.447965 80.895368-13.311896 60.703526-20.191842 109.407145-60.799525 133.598956-111.35913A158.814759 158.814759 0 0 0 415.385555 832.0015h0.575996V320.0055c3.679971 0 7.423942-0.319998 11.135913-0.927993l532.955836-94.047265V613.443207c-32.511746-23.551816-74.623417-37.439708-121.439051-37.439707-27.199788 0-54.431575 4.511965-80.927368 13.311896-60.735526 20.255842-109.439145 60.863525-133.566957 111.487129-18.687854 39.135694-21.119835 81.695362-6.879946 119.871063C641.623788 885.889079 710.743248 928.00075 793.494601 928.00075a254.71801 254.71801 0 0 0 80.927368-13.311896c60.671526-20.191842 109.375146-60.799525 133.566956-111.35913A158.846759 158.846759 0 0 0 1023.476804 736.00225h0.575996V64.0075c0-18.879853-8.383935-36.863712-22.879821-48.991617zM246.042878 950.016578c-76.671401 25.5678-155.934782 0.575996-176.926618-55.679565-21.055836-56.31956 24.031812-122.687042 100.671214-148.254842 76.671401-25.5678 155.934782-0.639995 176.926618 55.679565 21.087835 56.28756-23.999813 122.687042-100.671214 148.254842z m606.875259-95.99925c-76.735401 25.5678-155.998781 0.575996-176.990617-55.679565-21.055836-56.31956 24.063812-122.687042 100.671213-148.254842 76.735401-25.5678 155.998781-0.639995 176.990617 55.679565 21.087835 56.28756-23.967813 122.687042-100.671213 148.254842zM958.74131 160.00675L414.681561 256.006V160.00675L958.74131 64.0075v95.99925z"
                        fill="#1296db" p-id="4465"></path>
                </svg>
                <div id="music-tooltip-bottom" role="tooltip"
                     class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    我的 音乐
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>