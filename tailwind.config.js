/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index/html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1296db',  // 添加自定义的颜色名称和值
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

