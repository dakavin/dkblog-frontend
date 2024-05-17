import { defineStore } from "pinia";
import { ref, watch, onUnmounted } from 'vue';

export const useMenuStore = defineStore('menu', () => {
    const menuWidth = ref("250px");
    const isMobile = ref(window.innerWidth <= 768);
    const menuVisible = ref(false); // 默认在移动端隐藏

    // 控制菜单宽度和可见性的函数
    function handleMenuWidth() {
        if (isMobile.value) {
            menuVisible.value = !menuVisible.value;
            menuWidth.value = menuVisible.value ? '250px' : '0px';
        } else {
            menuWidth.value = menuWidth.value === '250px' ? '64px' : '250px';
        }
    }

    // 响应窗口大小变化，更新设备类型和菜单状态
    function updateMenuWidthForDevice() {
        isMobile.value = window.innerWidth <= 768;
        menuWidth.value = isMobile.value ? '0px' : (menuVisible.value ? '250px' : '64px');
        if (isMobile.value) {
            menuVisible.value = false;
        }
    }

    // 监听窗口大小变化并使用防抖处理
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateMenuWidthForDevice, 150);
    }
    window.addEventListener('resize', handleResize);

    // 组件卸载时移除事件监听
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    // 监听isMobile变化
    watch(isMobile, (newValue) => {
        if (!newValue) {
            menuVisible.value = true; // PC端默认显示菜单
        }
    });

    return { menuWidth, handleMenuWidth, menuVisible, isMobile };
}, {
    persist: true
});
