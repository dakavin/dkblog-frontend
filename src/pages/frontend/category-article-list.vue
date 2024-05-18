<script setup>
import Header from '@/layouts/frontend/components/Header.vue'
import Footer from '@/layouts/admin/components/AdminFooter.vue'
import UserInfoCard from "@/layouts/frontend/components/UserInfoCard.vue";
import TagCard from "@/layouts/frontend/components/TagCard.vue";
import CategoryListCard from "@/layouts/frontend/components/CategoryListCard.vue";

import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {getCategoryArticlePageList} from "@/api/frontend/category.js";
import {showMessage} from "@/composables/util.js";

const route = useRoute()
// 分类名称
const categoryName = ref(route.query.name)
// 分类Id
const categoryId = ref(route.query.id)
// 监听路由
watch(route, (newRoute, oldRoute) => {
    categoryName.value = newRoute.query.name
    categoryId.value = newRoute.query.id
    getCategoryArticles(current.value)
})

// 分类下的文章集合
const articles = ref([])
// 当前页码
const current = ref(1)
// 每页显示文章数
const size = ref(8)
// 总文章数
const total = ref(0)
// 总页数
const pages = ref(0)

function getCategoryArticles(currentNo) {
    // 上下页是否本办法点击判断，当要跳转上一页且页码小于1时，则不允许跳转；
    // 当跳转下一页且页码大于总页数时，则不允许跳转
    if (currentNo < 1 || (pages.value) > 0 && currentNo > pages.value) {
        showMessage('页码超出，不允许跳转', 'info')
        return
    }
    // 调用后台接口，获取分类下的文章列表
    getCategoryArticlePageList({current: currentNo, size: size.value,id:categoryId.value}).then((res)=>{
        if (res.success){
            articles.value = res.data
            current.value = res.current
            size.value = res.size
            total.value = res.total
            pages.value = res.pages
        }
    })
}
// 调用上述方法
getCategoryArticles(current.value)
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header/>
        
        <!-- 主内容区域 -->
        <main class="container max-w-screen-xl mx-auto p-4 px-6">
            <!-- grid 表格布局，分为 4 列 -->
            <div class="grid grid-cols-4 gap-7">
                <!-- 左边栏，占用 3 列 -->
                <div class="col-span-4 md:col-span-3 mb-3">
                    <!-- 分类文章列表 -->
                    <div
                        class="p-5 mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                            <!-- 文件夹图标 -->
                            <svg class="inline w-4 h-4 mr-2 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5"/>
                            </svg>
                            {{ categoryName }}
                        </h1>
                        <ol v-if="articles && articles.length > 0"
                            class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li v-for="(article,index) in articles" :key="index">
                                <a href="#"
                                   class="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <img class="w-24 h-12 mb-3 mr-3 rounded-lg sm:mb-0"
                                         :src="article.cover"/>
                                    <div class="text-gray-600 dark:text-gray-400">
                                        <h2 class="text-base font-normal text-gray-900">
                                            {{article.title}}
                                        </h2>
                                        <span
                                            class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                        <svg class="inline w-2.5 h-2.5 mr-2 text-gray-400 dark:text-white"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                                        </svg>
                                        {{article.createDate}}
                                    </span>
                                    </div>
                                </a>
                            </li>
                        </ol>
                        <!-- 该分类下没有文章提示，指定为 flex 布局，内容垂直水平居中，并纵向排列 -->
                        <div v-else class="flex items-center justify-center flex-col">
                            <svg height="512" node-id="1" sillyvg="true" template-height="1024" template-width="1024" version="1.1" viewBox="0 0 1024 1024" width="1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs node-id="55"><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-1" node-id="5" spreadMethod="pad" x1="0.5" x2="0.506" y1="0.0000000000000001110223" y2="0.766"><stop offset="0" stop-color="#f8f8f8" stop-opacity="0.71"/><stop offset="1" stop-color="#e2e7f2" stop-opacity="0"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-2" node-id="8" spreadMethod="pad" x1="0.5" x2="0.5" y1="0" y2="0.6386449"><stop offset="0" stop-color="#2dadad" stop-opacity="0.6203417"/><stop offset="1" stop-color="#ffffff"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-3" node-id="11" spreadMethod="pad" x1="0.5" x2="0.5" y1="0" y2="1"><stop offset="0" stop-color="#eaeef2"/><stop offset="1" stop-color="#e1e6ed"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-4" node-id="14" spreadMethod="pad" x1="0.5" x2="0.5" y1="0" y2="1"><stop offset="0" stop-color="#eaeef2"/><stop offset="1" stop-color="#e1e6ed"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-5" node-id="17" spreadMethod="pad" x1="0.5" x2="0.5" y1="0" y2="1"><stop offset="0" stop-color="#e2e7ed"/><stop offset="1" stop-color="#e3e8ee"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-6" node-id="20" spreadMethod="pad" x1="0.034368683" x2="1.480827" y1="0.5" y2="0.5"><stop offset="0" stop-color="#1296db"/><stop offset="1" stop-color="#26ba84"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-7" node-id="23" spreadMethod="pad" x1="0.034368683" x2="1.480827" y1="0.5" y2="0.5"><stop offset="0" stop-color="#1296db"/><stop offset="1" stop-color="#26ba84"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-9" node-id="29" spreadMethod="pad" x1="0.5" x2="0.5" y1="0" y2="1"><stop offset="0" stop-color="#2dadad" stop-opacity="0.6203417"/><stop offset="1" stop-color="#ffffff"/></linearGradient><linearGradient gradientUnits="objectBoundingBox" id="linearGradient-10" node-id="32" spreadMethod="pad" x1="0.034368683" x2="1.480827" y1="0.5" y2="0.5"><stop offset="0" stop-color="#1296db"/><stop offset="1" stop-color="#26ba84"/></linearGradient></defs><g node-id="110"><g node-id="111"><path d="M 0.00 0.00 L 1024.00 0.00 L 1024.00 1024.00 L 0.00 1024.00 Z" fill="#ffffff" fill-opacity="0" fill-rule="nonzero" group-id="1,2" id="矩形_336" node-id="37" stroke="none" target-height="1024" target-width="1024" target-x="0" target-y="0"/></g><g node-id="112"><path d="M 63.16 779.08 L 62.15 774.56 L 59.56 762.17 L 56.03 743.67 L 52.22 720.83 L 50.43 708.43 L 48.77 695.40 L 47.39 682.26 L 46.34 669.15 L 45.70 656.14 L 45.56 643.83 L 45.79 635.69 L 46.31 628.16 L 47.10 621.21 L 48.28 614.31 L 49.79 608.29 L 51.59 603.06 L 53.34 599.24 L 55.27 596.02 L 57.39 593.33 L 59.69 591.12 L 63.01 588.71 L 66.20 586.86 L 69.28 585.51 L 72.28 584.63 L 76.46 583.99 L 80.51 583.98 L 84.49 584.59 L 88.39 585.72 L 92.19 587.29 L 95.92 589.30 L 101.21 592.88 L 106.17 597.01 L 110.77 601.51 L 114.84 606.02 L 118.55 610.58 L 121.53 614.59 L 125.83 620.99 L 127.35 623.51 L 126.21 619.42 L 123.32 608.26 L 119.49 591.70 L 117.51 582.08 L 115.54 571.39 L 113.78 560.41 L 112.28 548.99 L 111.17 537.49 L 110.53 526.17 L 110.42 518.63 L 110.62 511.44 L 111.11 504.59 L 111.98 497.77 L 113.22 491.56 L 114.81 485.90 L 116.37 481.74 L 118.17 478.03 L 120.20 474.72 L 122.46 471.78 L 125.08 469.15 L 127.99 466.97 L 131.25 465.21 L 134.87 463.88 L 138.67 463.13 L 142.33 462.93 L 145.91 463.28 L 149.44 464.16 L 152.83 465.49 L 156.20 467.26 L 159.56 469.49 L 162.94 472.23 L 167.07 476.24 L 171.18 480.89 L 175.26 486.26 L 179.02 491.86 L 182.70 497.90 L 186.29 504.40 L 191.27 514.40 L 195.92 524.81 L 200.21 535.35 L 204.05 545.64 L 207.57 555.80 L 210.56 565.05 L 215.35 581.19 L 218.30 592.23 L 219.31 596.32 L 218.85 592.24 L 218.04 581.39 L 217.77 574.32 L 217.74 565.90 L 218.04 557.17 L 218.81 547.87 L 219.62 541.64 L 220.73 535.49 L 222.13 529.41 L 223.90 523.45 L 226.04 517.87 L 228.55 512.64 L 230.77 508.90 L 233.23 505.50 L 235.95 502.43 L 238.94 499.67 L 242.19 497.28 L 245.79 495.31 L 249.76 493.75 L 254.15 492.60 L 257.69 492.29 L 261.24 492.61 L 264.85 493.58 L 268.58 495.26 L 272.02 497.35 L 275.55 499.99 L 279.19 503.24 L 282.96 507.16 L 287.53 512.61 L 292.19 518.89 L 296.94 526.07 L 301.38 533.42 L 305.79 541.30 L 310.18 549.74 L 316.40 562.62 L 322.33 575.93 L 327.93 589.36 L 333.06 602.40 L 337.85 615.24 L 342.00 626.89 L 348.81 647.16 L 353.16 660.97 L 354.68 666.07 L 63.16 779.08 Z" fill="url(#linearGradient-1)" fill-rule="nonzero" group-id="1,3" id="路径_63" node-id="38" stroke="none" target-height="316.1515" target-width="309.11807" target-x="45.562042" target-y="462.932"/></g><g node-id="113"><path d="M 1002.00 809.00 C 1002.00 844.80 951.13 879.14 860.59 904.46 C 770.04 929.78 647.24 944.00 519.19 944.00 C 391.14 944.00 268.34 929.78 177.79 904.46 C 87.25 879.14 36.38 844.80 36.38 809.00 C 36.38 773.20 87.25 738.86 177.79 713.54 C 268.34 688.22 391.14 674.00 519.19 674.00 C 647.24 674.00 770.04 688.22 860.59 713.54 C 951.13 738.86 1002.00 773.20 1002.00 809.00 Z" fill="url(#linearGradient-2)" fill-opacity="0.061778482" fill-rule="nonzero" group-id="1,4" id="椭圆_16" node-id="39" stroke="none" target-height="270" target-width="965.618" target-x="36.382" target-y="674"/></g><path d="M 642.88 709.68 L 399.87 709.68 C 386.19 709.69 373.07 704.26 363.40 694.59 C 353.73 684.92 348.31 671.80 348.32 658.13 L 348.32 356.21 C 348.31 342.53 353.73 329.41 363.40 319.74 C 373.07 310.07 386.19 304.65 399.87 304.66 L 449.15 304.66 C 429.90 304.86 414.43 320.59 414.55 339.84 C 414.66 359.10 430.32 374.64 449.57 374.62 L 450.80 374.62 C 470.12 374.73 485.87 359.16 485.99 339.85 C 486.10 320.53 470.54 304.77 451.22 304.66 L 592.75 304.66 C 573.50 304.86 558.03 320.59 558.14 339.84 C 558.26 359.10 573.91 374.64 593.17 374.62 L 594.39 374.62 C 606.89 374.69 618.48 368.09 624.79 357.31 C 631.11 346.52 631.19 333.19 625.00 322.33 C 618.82 311.47 607.31 304.73 594.82 304.66 L 642.88 304.66 C 656.55 304.65 669.67 310.07 679.34 319.74 C 689.01 329.41 694.44 342.53 694.43 356.21 L 694.43 658.13 C 694.44 671.80 689.01 684.92 679.34 694.59 C 669.67 704.26 656.55 709.69 642.88 709.68 L 642.88 709.68 Z" fill="url(#linearGradient-3)" fill-rule="nonzero" group-id="1" id="路径_8758" node-id="40" stroke="none" target-height="405.0406" target-width="346.1328" target-x="348.30658" target-y="304.64685"/><path d="M 347.60 302.93 L 693.47 302.93 L 694.25 303.09 L 694.88 303.52 L 695.31 304.15 L 695.47 304.93 L 695.47 706.27 L 695.31 707.05 L 694.88 707.68 L 694.25 708.11 L 693.47 708.27 L 347.60 708.27 L 346.82 708.11 L 346.19 707.68 L 345.76 707.05 L 345.60 706.27 L 345.60 304.93 L 345.76 304.15 L 346.19 303.52 L 346.82 303.09 L 347.60 302.93 Z" fill="url(#linearGradient-4)" fill-rule="nonzero" group-id="1,5" id="矩形" node-id="42" stroke="none" target-height="405.33337" target-width="349.86667" target-x="345.6" target-y="302.93335"/><path d="M 486.40 347.73 L 486.20 351.50 L 485.65 355.09 L 484.77 358.54 L 483.55 361.85 L 481.43 366.06 L 478.85 369.89 L 475.78 373.38 L 472.29 376.45 L 468.46 379.03 L 464.25 381.15 L 460.94 382.37 L 457.49 383.25 L 453.90 383.80 L 450.13 384.00 L 446.37 383.80 L 442.77 383.25 L 439.33 382.37 L 436.02 381.15 L 431.81 379.03 L 427.98 376.45 L 424.49 373.38 L 421.42 369.89 L 418.83 366.06 L 416.72 361.85 L 415.50 358.54 L 414.61 355.09 L 414.07 351.50 L 413.87 347.73 L 414.07 343.97 L 414.61 340.37 L 415.50 336.93 L 416.72 333.62 L 418.83 329.41 L 421.42 325.58 L 424.49 322.09 L 427.98 319.02 L 431.81 316.43 L 436.02 314.32 L 439.33 313.10 L 442.77 312.21 L 446.37 311.67 L 450.13 311.47 L 453.90 311.67 L 457.49 312.21 L 460.94 313.10 L 464.25 314.32 L 468.46 316.43 L 472.29 319.02 L 475.78 322.09 L 478.85 325.58 L 481.43 329.41 L 483.55 333.62 L 484.77 336.93 L 485.65 340.37 L 486.20 343.97 L 486.40 347.73 Z" fill="#ffffff" fill-rule="evenodd" group-id="1,5" id="椭圆形" node-id="43" stroke="none" target-height="72.533325" target-width="72.533356" target-x="413.86667" target-y="311.46667"/><path d="M 631.47 347.73 L 631.27 351.50 L 630.72 355.09 L 629.84 358.54 L 628.62 361.85 L 626.50 366.06 L 623.91 369.89 L 620.84 373.38 L 617.36 376.45 L 613.53 379.03 L 609.32 381.15 L 606.00 382.37 L 602.56 383.25 L 598.97 383.80 L 595.20 384.00 L 591.43 383.80 L 587.84 383.25 L 584.40 382.37 L 581.08 381.15 L 576.87 379.03 L 573.04 376.45 L 569.56 373.38 L 566.49 369.89 L 563.90 366.06 L 561.78 361.85 L 560.56 358.54 L 559.68 355.09 L 559.13 351.50 L 558.93 347.73 L 559.13 343.97 L 559.68 340.37 L 560.56 336.93 L 561.78 333.62 L 563.90 329.41 L 566.49 325.58 L 569.56 322.09 L 573.04 319.02 L 576.87 316.43 L 581.08 314.32 L 584.40 313.10 L 587.84 312.21 L 591.43 311.67 L 595.20 311.47 L 598.97 311.67 L 602.56 312.21 L 606.00 313.10 L 609.32 314.32 L 613.53 316.43 L 617.36 319.02 L 620.84 322.09 L 623.91 325.58 L 626.50 329.41 L 628.62 333.62 L 629.84 336.93 L 630.72 340.37 L 631.27 343.97 L 631.47 347.73 Z" fill="#ffffff" fill-rule="evenodd" group-id="1,5" id="椭圆形备份" node-id="44" stroke="none" target-height="72.533325" target-width="72.533325" target-x="558.93335" target-y="311.46667"/><path d="M 449.19 263.51 L 449.19 263.51 L 452.71 263.76 L 456.03 264.43 L 459.17 265.53 L 462.15 267.03 L 464.86 268.86 L 467.32 271.03 L 469.49 273.49 L 471.32 276.20 L 472.82 279.18 L 473.92 282.32 L 474.59 285.64 L 474.84 289.16 L 474.84 342.19 L 474.59 345.71 L 473.92 349.03 L 472.82 352.17 L 471.32 355.15 L 469.49 357.86 L 467.32 360.33 L 464.86 362.50 L 462.15 364.33 L 459.17 365.82 L 456.03 366.92 L 452.71 367.59 L 449.19 367.84 L 449.19 367.84 L 445.66 367.59 L 442.35 366.92 L 439.20 365.82 L 436.23 364.33 L 433.52 362.50 L 431.05 360.33 L 428.88 357.86 L 427.05 355.15 L 425.55 352.17 L 424.46 349.03 L 423.78 345.71 L 423.54 342.19 L 423.54 289.16 L 423.78 285.64 L 424.46 282.32 L 425.55 279.18 L 427.05 276.20 L 428.88 273.49 L 431.05 271.03 L 433.52 268.86 L 436.23 267.03 L 439.20 265.53 L 442.35 264.43 L 445.66 263.76 L 449.19 263.51 Z" fill="url(#linearGradient-5)" fill-rule="nonzero" group-id="1,5" id="矩形_302" node-id="45" stroke="none" target-height="104.323" target-width="51.297394" target-x="423.53867" target-y="263.515"/><path d="M 594.16 263.51 L 594.16 263.51 L 597.68 263.76 L 601.00 264.43 L 604.14 265.53 L 607.12 267.03 L 609.83 268.86 L 612.29 271.03 L 614.46 273.49 L 616.29 276.20 L 617.79 279.18 L 618.89 282.32 L 619.56 285.64 L 619.81 289.16 L 619.81 342.19 L 619.56 345.71 L 618.89 349.03 L 617.79 352.17 L 616.29 355.15 L 614.46 357.86 L 612.29 360.33 L 609.83 362.50 L 607.12 364.33 L 604.14 365.82 L 601.00 366.92 L 597.68 367.59 L 594.16 367.84 L 594.16 367.84 L 590.63 367.59 L 587.32 366.92 L 584.17 365.82 L 581.20 364.33 L 578.49 362.50 L 576.02 360.33 L 573.85 357.86 L 572.02 355.15 L 570.52 352.17 L 569.43 349.03 L 568.75 345.71 L 568.51 342.19 L 568.51 289.16 L 568.75 285.64 L 569.43 282.32 L 570.52 279.18 L 572.02 276.20 L 573.85 273.49 L 576.02 271.03 L 578.49 268.86 L 581.20 267.03 L 584.17 265.53 L 587.32 264.43 L 590.63 263.76 L 594.16 263.51 Z" fill="url(#linearGradient-5)" fill-rule="nonzero" group-id="1,5" id="矩形_309" node-id="46" stroke="none" target-height="104.323" target-width="51.297363" target-x="568.50793" target-y="263.515"/><path d="M 431.93 456.85 L 610.81 456.85 C 621.85 456.85 630.81 465.80 630.81 476.85 L 630.81 476.85 C 630.81 487.89 621.85 496.85 610.81 496.85 L 431.93 496.85 C 420.89 496.85 411.93 487.89 411.93 476.85 L 411.93 476.85 C 411.93 465.80 420.89 456.85 431.93 456.85 Z" fill="url(#linearGradient-6)" fill-opacity="0.46709332" fill-rule="nonzero" group-id="1,6" id="矩形_316" node-id="47" stroke="none" target-height="40" target-width="218.87503" target-x="411.934" target-y="456.846"/><path d="M 431.93 537.49 L 521.93 537.49 C 532.98 537.49 541.93 546.44 541.93 557.49 L 541.93 557.49 C 541.93 568.53 532.98 577.49 521.93 577.49 L 431.93 577.49 C 420.89 577.49 411.93 568.53 411.93 557.49 L 411.93 557.49 C 411.93 546.44 420.89 537.49 431.93 537.49 Z" fill="url(#linearGradient-7)" fill-opacity="0.46709332" fill-rule="nonzero" group-id="1,7" id="矩形_317" node-id="48" stroke="none" target-height="40" target-width="130.00003" target-x="411.934" target-y="537.488"/><path d="M 598.35 304.92 C 554.10 304.21 518.59 268.14 518.59 223.88 C 518.59 179.62 554.10 143.55 598.35 142.85 C 608.54 142.84 618.63 144.80 628.08 148.62 C 627.93 146.71 627.86 144.79 627.85 142.85 C 627.52 117.03 641.10 93.02 663.41 80.01 C 685.72 67.00 713.31 67.00 735.62 80.01 C 757.93 93.02 771.51 117.03 771.18 142.85 C 771.19 152.24 769.39 161.55 765.88 170.25 C 777.00 163.47 789.77 159.89 802.79 159.91 C 842.53 160.33 874.53 192.67 874.53 232.41 C 874.53 272.16 842.53 304.50 802.79 304.92 L 598.35 304.92 Z" fill="none" group-id="1" id="联合_67" node-id="49" stroke="none" target-height="237.91922" target-width="355.9391" target-x="518.5922" target-y="66.997444"/><path d="M 197.13 325.16 C 173.18 325.16 153.77 305.36 153.77 280.93 C 153.77 256.51 173.18 236.71 197.13 236.71 C 202.65 236.70 208.11 237.77 213.22 239.86 C 213.14 238.82 213.10 237.77 213.10 236.71 C 212.83 222.67 220.16 209.58 232.28 202.48 C 244.39 195.38 259.40 195.38 271.51 202.48 C 283.63 209.58 290.96 222.67 290.69 236.71 C 290.70 241.83 289.72 246.91 287.82 251.67 C 293.83 247.97 300.75 246.01 307.81 246.02 C 329.35 246.46 346.58 264.04 346.58 285.59 C 346.58 307.13 329.35 324.72 307.81 325.16 L 197.13 325.16 Z" fill="url(#linearGradient-9)" fill-opacity="0.2" fill-rule="nonzero" group-id="1" id="联合_68" node-id="50" stroke="none" target-height="129.77483" target-width="192.81187" target-x="153.769" target-y="195.38197"/><path d="M 909.47 387.77 L 906.49 386.70 L 898.56 384.38 L 893.38 383.21 L 887.21 382.18 L 880.79 381.56 L 873.96 381.46 L 869.39 381.78 L 864.85 382.49 L 860.34 383.59 L 855.99 385.15 L 851.84 387.25 L 847.86 389.92 L 845.16 392.24 L 842.63 394.97 L 840.26 398.14 L 838.05 401.82 L 836.28 405.58 L 834.73 409.92 L 833.44 414.92 L 832.44 420.65 L 830.31 427.26 L 828.15 432.70 L 826.00 437.14 L 823.48 441.40 L 821.06 444.80 L 818.74 447.45 L 816.16 449.87 L 813.77 451.70 L 811.56 453.01 L 808.14 454.50 L 805.33 455.23 L 802.70 455.54 L 800.95 455.53 L 799.29 455.31 L 801.14 455.59 L 803.10 455.70 L 806.01 455.58 L 809.15 455.10 L 812.92 454.02 L 815.40 452.99 L 818.04 451.55 L 820.85 449.63 L 823.44 447.45 L 826.09 444.65 L 828.82 441.16 L 831.19 437.44 L 833.54 432.87 L 835.83 427.33 L 842.44 428.77 L 848.44 429.66 L 853.91 430.06 L 858.89 430.02 L 864.01 429.56 L 868.67 428.77 L 872.92 427.66 L 876.79 426.27 L 881.82 423.90 L 886.24 421.23 L 890.12 418.27 L 893.72 414.95 L 896.83 411.61 L 899.47 408.22 L 902.92 402.97 L 905.42 398.33 L 907.40 393.88 L 908.56 390.78 L 909.47 387.77 Z" fill="url(#linearGradient-10)" fill-rule="nonzero" group-id="1,8,9" id="路径_72备份" node-id="52" stroke="none" target-height="74.2348" target-width="110.18024" target-x="799.29083" target-y="381.4634"/><path d="M 649.05 567.21 L 655.98 569.13 L 662.54 570.53 L 668.76 571.45 L 674.65 571.93 L 680.70 572.02 L 686.32 571.72 L 691.54 571.08 L 696.38 570.10 L 701.26 568.72 L 705.63 567.10 L 709.55 565.24 L 713.06 563.16 L 716.42 560.69 L 719.24 558.09 L 721.59 555.37 L 723.49 552.51 L 725.01 549.40 L 726.00 546.24 L 726.50 542.98 L 726.49 539.60 L 725.98 536.31 L 724.91 532.94 L 723.24 529.46 L 720.87 525.84 L 718.36 523.04 L 716.10 521.29 L 714.05 520.35 L 711.83 519.98 L 709.82 520.18 L 707.92 520.96 L 706.21 522.18 L 704.69 523.79 L 703.34 525.84 L 702.31 528.08 L 701.59 530.52 L 701.17 533.18 L 701.12 535.87 L 701.48 538.53 L 702.26 541.18 L 703.47 543.64 L 705.18 545.91 L 707.47 548.00 L 709.38 549.26 L 711.67 550.33 L 714.41 551.20 L 717.65 551.85 L 720.78 552.13 L 724.44 552.10 L 728.71 551.71 L 733.66 550.89 L 739.96 549.34 L 747.46 546.87 L 756.35 543.32 L 772.36 532.29 L 779.84 526.90 L 786.97 521.26 L 791.50 517.28 L 795.97 512.88 L 800.37 508.06 L 804.46 502.99 L 808.58 497.16 L 812.73 490.52 L 816.48 483.67 L 820.32 475.69 L 824.23 466.47" fill="none" group-id="1,8,10" id="路径-2" node-id="53" stroke="#bcc2c9" stroke-dasharray="2 2" stroke-linecap="round" stroke-width="1" target-height="105.54404" target-width="175.17969" target-x="649.0519" target-y="466.47177"/></g></svg>
                            <p class="mt-2 mb-16 text-gray-400 font-bold">此分类下还未发布文章哟🤣~</p>
                        </div>
                    </div>
                    
                    <!-- 分页 -->
                    <nav v-if="articles && articles.length > 0" aria-label="Page navigation example" class="mt-10 flex justify-center">
                        <ul class="flex items-center -space-x-px h-10 text-base">
                            <!-- 上一页 -->
                            <li>
                                <a @click="getCategoryArticles(current-1)"
                                    class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    
                                    <span class="sr-only">上一页</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="M5 1 1 5l4 4"/>
                                    </svg>
                                </a>
                            </li>
                            <!-- 页码 -->
                            <li v-for="(pageNo,index) in pages" :key="index">
                                <a @click="getCategoryArticles(pageNo)"
                                    class="text-blue-600  bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center px-4 h-10 leading-tight border  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    {{index+1}}
                                </a>
                            </li>
                            <!-- 下一页 -->
                            <li>
                                <a @click="getCategoryArticles(current+1)"
                                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">下一页</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                <!-- 右边侧边栏，占用一列 -->
                <aside class="col-span-4 md:col-span-1">
                    <!-- 博主信息 -->
                    <UserInfoCard/>
                    <!-- 分类 -->
                    <CategoryListCard/>
                    <!-- 标签 -->
                    <TagCard/>
                </aside>
            </div>
        
        </main>
        
        <Footer class="mt-auto"></Footer>
    </div>
</template>

