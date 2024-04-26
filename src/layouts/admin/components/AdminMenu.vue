<script setup>
import {useRoute, useRouter} from "vue-router"
import {ref, computed} from 'vue'
import {useMenuStore} from "@/stores/menu.js";

const menus = [
  {
    'name': '监控台',
    'icon': 'Monitor',
    'path': '/admin/index'
  },
  {
    'name': '文章管理',
    'icon': 'Document',
    'path': '/admin/article/list',
  },
  {
    'name': '分类管理',
    'icon': 'FolderOpened',
    'path': '/admin/category/list',
  },
  {
    'name': '标签管理',
    'icon': 'PriceTag',
    'path': '/admin/tag/list',
  },
  {
    'name': '博客设置',
    'icon': 'Setting',
    'path': '/admin/blog/setting',
  },
]

// 用于获取关于当前路由的信息，如当前的路径、查询参数等
const route = useRoute()
// 路由对象，使用它可以实现页面的跳转
const router = useRouter()

// 根据路由地址判断那个菜单被选中，从而保持常亮
const defaultActive = ref(route.path)

// 菜单选择事件，实现跳转
// path来自于上面menu对象中的path！
const handleSelect = (path) => {
  router.push(path)
}

// 获取菜单的store
// 实现Header页面缩放按钮的事件，可以调解菜单页面的宽度（pinia全局统一了菜单的宽度！）
const menuStore = useMenuStore()
// 获取菜单是否折叠，避免折叠的时候，文字没有折叠
const isCollapse = computed(() => !(menuStore.menuWidth === '250px'))
</script>

<template>
  <div :style="{width:menuStore.menuWidth}"
       class="bg-slate-800 h-screen text-white menu-container transition-all">
    <!-- 顶部 Logo, 指定高度为 64px, 和右边的 Header 头保持一样高 -->
    <div class="flex items-center justify-center h-[64px]">
      <img v-if="menuStore.menuWidth === '250px'"
           src="/src/assets/AdminLogoBig.png" class="h-[70px]">
      <img v-else src="/src/assets/AdminLogoMini.png" class="h-[70px]">
    </div>

    <!-- 下方菜单 -->
    <el-menu :default-active="defaultActive" @select="handleSelect"
             :collapse="isCollapse" :collapse-transition="false">
      <template v-for="(item,index) in menus" :key="index">
        <el-menu-item :index="item.path">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu {
  background-color: rgb(30 41 59 / 1);
  border-right: 0;
}

.el-sub-menu__title {
  color: #fff;
}

.el-sub-menu__title:hover {
  background-color: #ffffff10;
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary);
  color: #fff;
}

.el-menu-item.is-active:hover {
  background-color: var(--el-color-primary);
}

.el-menu-item {
  color: #fff;
}

.el-menu-item:hover {
  background-color: #ffffff10;
}

</style>