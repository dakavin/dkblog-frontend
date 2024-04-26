// 导入 全局状态管理 pinia
import {createPinia} from "pinia";
// 导入 pinia数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建pinia对象
const pinia = createPinia()
// pinia使用数据持久化（避免刷新网页后数据丢失）
pinia.use(piniaPluginPersistedstate)

// 暴露出去
export default pinia