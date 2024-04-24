import 'element-plus/es/components/message/style/css'
import {ElMessage} from "element-plus";

// 封装Element Plus 的 ElMessage方法
export function showMessage(message='提示内容',type='success',customClass=''){
    return ElMessage({
        type: type,
        message,
        customClass,
        showClose: true,
    })
}