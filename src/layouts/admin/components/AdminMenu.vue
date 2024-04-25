<script setup>
import {useRoute, useRouter} from "vue-router"
import {ref} from 'vue'

const menus = [
  {    'name':'监控台',
    'icon':'Monitor',
    'path':'/admin/index'
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
const handleSelect = (path)=>{
  router.push(path)
}
</script>

<template>
  <div class="bg-slate-800 h-screen text-white">
    <!-- 顶部 Logo, 指定高度为 64px, 和右边的 Header 头保持一样高 -->
    <div class="flex items-center justify-center h-[64px]">
      <img src="/src/assets/AdminLogo.png" class="h-[70px]">
    </div>

    <!-- 下方菜单 -->
    <el-menu :default-active="defaultActive"  @select="handleSelect">
      <template v-for="(item,index) in menus" :key="index">
        <el-menu-item :index="item.path">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{item.name}}</span>
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