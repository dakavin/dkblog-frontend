import '@/assets/main.css'
import 'animate.css';

// 引入 creatApp 方法
import { createApp } from 'vue'
// 引入 App.vue 组件
import App from '@/App.vue'
// 导入路由
import router from "@/router/index.js";
// 导入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建应用，并将 App 根组件挂载到 <div id="#app"></div> 中
const app = createApp(App);
// 应用路由
app.use(router);
// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');