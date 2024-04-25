import {defineStore} from "pinia";
import { ref } from 'vue'
export const useMenuStore = defineStore('menu',()=>{
    // 左边菜单栏默认宽度
    const menuWidth = ref("250px")

    // 展开或伸缩左边菜单栏
    function handleMenuWidth() {
        menuWidth.value = menuWidth.value === '250px' ? '64px' : '250px'
    }

    return {menuWidth,handleMenuWidth}
})