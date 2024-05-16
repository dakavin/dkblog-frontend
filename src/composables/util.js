import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import {ElMessage, ElMessageBox} from "element-plus";
import nprogress from "nprogress";
import {onMounted, onBeforeUnmount} from 'vue';

// 封装Element Plus 的 ElMessage方法
export function showMessage(message = '提示内容', type='success', customClass = '') {
    return ElMessage({
        type: type,
        message,
        customClass,
        showClose: false,
        center: true,
        duration: 1500,
    })
}

// 显示页面加载 Loading
export function showPageLoading() {
    nprogress.start()
}

// 隐藏页面加载 Loading
export function hidePageLoading() {
    nprogress.done()
}

// 弹出确认框
export function showModel(content = '提示内容', type = 'warning', title = ''){
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '干了！',
            cancelButtonText: '不干！',
            type,
        }
    )
}

// 键盘监听
export function keyboardListen(enterMethod){
    // 按回车键后，执行登录事件
    function onKeyUp(e) {
        // 监听键盘操作
        // console.log(e)
        if (e.key == 'Enter') {
            enterMethod()
        }
    }

    // 添加键盘监听
    onMounted(() => {
        // console.log('添加键盘监听')
        document.addEventListener('keyup', onKeyUp)
    })

    // 移除键盘监听
    onBeforeUnmount(() => {
        document.removeEventListener('keyup', onKeyUp)
    })
}