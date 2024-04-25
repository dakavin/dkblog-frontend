<script setup>
  //引入布局组件
  import AdminFooter from "@/layouts/admin/components/AdminFooter.vue";
  import AdminHeader from "@/layouts/admin/components/AdminHeader.vue";
  import AdminMenu from "@/layouts/admin/components/AdminMenu.vue";
  import AdminTagList from "@/layouts/admin/components/AdminTagList.vue";
</script>

<template>
  <!-- 外层容器 -->
  <el-container>

    <!-- 左边侧边栏 -->
    <el-aside>
      <AdminMenu/>
    </el-aside>

    <!-- 右边区域主要内容 -->
    <el-container>
      <!-- 右边顶栏 -->
      <el-header>
        <AdminHeader/>
      </el-header>

      <!-- 右边容器 -->
      <el-main>
        <!-- 标签导航栏 -->
        <AdminTagList/>

        <!-- 主要内容（根据路由动态展示不同页面） -->
        <router-view/>
      </el-main>

      <!-- 右边页脚 -->
      <el-footer>
        <AdminFooter/>
      </el-footer>
    </el-container>

  </el-container>
</template>

<style scoped>

</style>