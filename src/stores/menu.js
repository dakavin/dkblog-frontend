import {defineStore} from "pinia";
import {ref, watch} from 'vue'

export const useMenuStore = defineStore('menu', () => {
        const menuWidth = ref("250px")
        const isMobile = ref(window.innerWidth <= 768)

        function handleMenuWidth() {
            if (!isMobile.value) {
                menuWidth.value = menuWidth.value === '250px' ? '64px' : '250px';
            }
        }

        function updateMenuWidthForDevice() {
            isMobile.value = window.innerWidth <= 768;
            menuWidth.value = isMobile.value ? '64px' : '250px';
        }

        window.addEventListener('resize', updateMenuWidthForDevice);

        watch(isMobile, (newVal) => {
            menuWidth.value = newVal ? '64px' : '250px';
        });

        return {menuWidth, handleMenuWidth}
    },
    {
        persist: true
    });
