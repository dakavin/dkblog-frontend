import {ref, onMounted, onBeforeUnmount} from 'vue';

// 状态定义
const paginationLayout = ref('prev, pager, next, jumper, total, sizes');
const small = ref(false)

// 调整分页布局以适应不同屏幕尺寸
function adjustPaginationLayout() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) { // 对应手机屏幕
        paginationLayout.value = 'prev, pager, next, sizes';
        small.value = true
    } else { // 对应桌面屏幕
        paginationLayout.value = 'prev, pager, next, jumper, total, sizes';
        small.value = false
    }
}

export function setupPagination() {
    onMounted(() => {
        adjustPaginationLayout();
        window.addEventListener('resize', adjustPaginationLayout);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', adjustPaginationLayout);
    });

    return { paginationLayout,small };
}



