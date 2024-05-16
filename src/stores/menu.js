import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useMenuStore = defineStore('menu', () => {
    const menuWidth = ref("250px");
    const isMobile = ref(window.innerWidth <= 768);
    const menuVisible = ref(false); // 默认在移动端隐藏


    // 控制菜单宽度和可见性的函数
    function handleMenuWidth() {
        if (isMobile.value) {
            menuVisible.value = !menuVisible.value; // 切换菜单的可见性
            menuWidth.value = menuVisible.value ? '250px' : '0px'; // 根据可见性调整宽度
        } else {
            // PC端时，宽度在64px和250px之间切换，菜单始终可见
            menuWidth.value = menuWidth.value === '250px' ? '64px' : '250px';
        }
    }

    // 响应窗口大小变化，更新设备类型和菜单状态
    function updateMenuWidthForDevice() {
        isMobile.value = window.innerWidth <= 768;
        if (isMobile.value) {
            // 手机端默认不显示菜单
            menuVisible.value = false;
            menuWidth.value = '0px';
        } else {
            // PC端根据当前宽度设置
            menuWidth.value = menuVisible.value ? '250px' : '64px';
        }
    }

    window.addEventListener('resize', updateMenuWidthForDevice);

    return { menuWidth, handleMenuWidth, menuVisible,isMobile};
}, {
    persist: true
});
