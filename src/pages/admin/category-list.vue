<script setup>
// 引入所需图标
import {Search, RefreshRight} from "@element-plus/icons-vue";
import {ref} from 'vue'

// 分页查询的分类名称
const searchCategoryName = ref('')
// 分类查询的日期
const pickDate = ref('')
// 当前页面，默认值为1
const current = ref(1)
// 总数据量，默认值为0
const total = ref(0)
// 每页显示的数据，默认值为10
const size = ref(10)

// 表格数据
const tableData = [
    {createTime: '2016-05-03 12:00:00', name: 'Java'},
    {createTime: '2016-05-03 12:00:00', name: 'Minio'},
]
</script>

<template>
    <div>
        <!-- 表头分页查询条件，shadow指定card 卡片组件没有阴影 -->
        <el-card shadow="never" class="mb-5">
            <!-- flex布局，内容垂直居中 -->
            <div class="flex items-center">
                <el-text>分类名称</el-text>
                <div class="ml-3 w-60 mr-5">
                    <el-input v-model="searchCategoryName" placeholder="请输入分类名称（支持模糊查询）"/>
                </div>
                
                <el-text>创建日期</el-text>
                <div class="ml-3 w-30 mr-5">
                    <el-date-picker v-model="pickDate" type="daterange" range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间" size="default"/>
                </div>
                
                <el-button type="primary" class="ml-3" :icon="Search">查询</el-button>
                <el-button class="ml-3" :icon="RefreshRight">重置</el-button>
            </div>
        </el-card>
        
        <el-card shadow="never">
            <!-- 新增按钮 -->
            <div class="mb-5">
                <el-button type="primary">
                    <el-icon class="mr-1">
                        <Plus/>
                    </el-icon>
                    新增
                </el-button>
            </div>
            
            <!-- 分类数据的分页列表 -->
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="name" label="分类名称" width="180"/>
                <el-table-column prop="createTime" label="创建时间" width="180"/>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="danger" size="default">
                            <el-icon class="mr-1">
                                <Delete/>
                            </el-icon>
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页的页码，数量等数据展示，页面跳转等事件 -->
            <div class="mt-10 flex justify-center">
                <el-pagination v-model:current-page="current" v-model:page-size="size"
                               :page-sizes="[10, 20, 50]"
                               :small="false" :background="true"
                               layout="prev, pager, next, jumper,total,sizes"
                               :total="total"/>
            </div>
        </el-card>
    
    
    </div>
</template>

<style scoped>

</style>