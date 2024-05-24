import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 实现Element Plus 的按需导入组件
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            // 定义一个别名 '@' 该别名对于当前 JavaScript 模块文件所在目录下的 'src' 目录的绝对文件路径
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 设置正向代理，使用 /api 代替后端完整的请求地址
    // 从而解决dev环境下的跨域问题
    server: {
        proxy: {
            // 对于前端的url地址中有 /api 的，就会被此代理规则处理
            '/api': {
                // 实际要转发的服务器（后端服务器）
                target: 'http://localhost:8081',
                // 在转发请求时，修改请求头中的 Origin 和 Host 字段，使其与后端服务器地址相匹配
                changeOrigin: true,
                // 正则：对于以 /api 为开始的url，将其替换
                // 如：访问前端 localhost:3000/api/user 就会正向代理到后端 localhost:8080/user
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
