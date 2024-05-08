<script setup>

const fullYear = new Date().getFullYear();

// 加载配置数据
const siteStartDate = "2023-4-28";
</script>

<template>
    <div class="bg-white py-5 flex items-center justify-center text-sm text-gray-500 shadow-none">
        <span>
          Copyright&nbsp;&copy;
          <span v-if="siteStartDate?.length >= 4">
            {{ siteStartDate.substring(0, 4) }}
            -
          </span>
          {{ fullYear }}
        </span>
        <!-- 以下信息请不要修改哦 -->
        <span >
          &nbsp;& Made&nbsp;by
          <a href="https://gitee.com/Dakkk_mike" target="_blank">
            dakkk
          </a>
        </span>
        <!-- 站点备案 -->
        <a href="https://beian.miit.gov.cn" target="_blank">
            &nbsp;&amp;
            粤ICP备2024241387号-1
        </a>
    </div>
</template>

<style lang="scss" scoped>
#footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 46px;
    line-height: 46px;
    text-align: center;
    z-index: 0;
    font-size: 14px;
    .power {
        animation: fade 0.3s;
    }
    .lrc {
        padding: 0 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .lrc-all {
            width: 98%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .lrc-text {
                margin: 0 8px;
            }
            .i-icon {
                width: 18px;
                height: 18px;
                display: inherit;
            }
        }
    }
    &.blur {
        backdrop-filter: blur(10px);
        background: rgb(0 0 0 / 25%);
        font-size: 16px;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.15s ease-in-out;
    }
    @media (max-width: 720px) {
        font-size: 0.85rem;
        &.blur {
            font-size: 0.85rem;
        }
    }
    @media (max-width: 480px) {
        .hidden {
            display: none;
        }
    }
}
</style>