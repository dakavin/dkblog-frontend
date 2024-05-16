<script setup>
// 引入所需图标
import {RefreshRight, Search} from "@element-plus/icons-vue";
import {reactive, ref,computed} from 'vue'
import moment from "moment";
import {addCategory, deleteCategory, getCategoryPageList, updateCategory} from "@/api/admin/category.js";
import {showMessage, showModel} from "@/composables/util.js";
// 引入对话框弹出组件
import FormDialog from "@/components/FormDialog.vue";
import {setupPagination} from "@/composables/pagination.js";
import {useWindowSize} from "@/api/frontend/useWindowSize.js";

// 分页查询的分类名称
const searchCategoryName = ref('')
// 分类查询的日期
const pickDate = ref('')

// 查询条件：开始和结束时间
const startDate = reactive({})
const endDate = reactive({})

// 监听日期组件改变事件，并将开始和结束时间设置到变量中
const datePickerChange = (e) => {
    startDate.value = moment(e[0]).format('YYYY-MM-DD HH:mm:ss')
    endDate.value = moment(e[1]).format('YYYY-MM-DD HH:mm:ss')
    // console.log('开始时间：' + startDate.value + ', 结束时间：' + endDate.value)
}
// 快捷选择日期
const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]

// 表格数据
const tableData = ref([])
// 当前页面，默认值为1
const current = ref(1)
// 总数据量，默认值为0
const total = ref(0)
// 每页显示的数据，默认值为10
const size = ref(10)

// 表格加载 Loading
const tableLoading = ref(false)

// 调用接口，获取后端的分类分页数据
function getTableData() {
    // 显示表格 loading
    tableLoading.value = true
    
    // 调用后台对应的接口
    getCategoryPageList({
        current: current.value, size: size.value, startDateTime: startDate.value,
        endDateTime: endDate.value, name: searchCategoryName.value
    }).then((res) => {
        if (res.success === true) {
            tableData.value = res.data
            current.value = res.current
            size.value = res.size
            total.value = res.total
        }
    }).finally(()=>tableLoading.value=false) // 隐藏表格 loading
}

getTableData()

// 每页展示数量变更事件
const handleSizeChange = (chooseSize) => {
    size.value = chooseSize
    getTableData()
}

// 重置查询条件
const reset = () => {
    searchCategoryName.value = ''
    pickDate.value = ''
    startDate.value = null
    endDate.value = null
    getTableData()
}

// 新增分类对话框是否显示
const formDialogRef = ref(null)

// 新增分类按钮点击事件
const addCategoryBtnClick = () => {
    formDialogRef.value.open()
}

// 表单引用
const formRef = ref(null)

// 添加文章分类的表单对象
const form = reactive({
    name: '',
    description:''
})

// 校验规则
const rules = {
    name: [
        {required: true, message: '分类名称不能为空', trigger: 'blur'},
        {min: 1, max: 20, message: '分类名称字数要求大于 1 个字符，小于 20 个字符', trigger: 'blur'}
    ],
    description:[
        {max: 100, message: '分类描述字数要求小于 100 个字符', trigger: 'blur'}
    ]
}

// 添加分类提交操作
const onSubmit = () => {
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }
        // 显示提交按钮 loading
        formDialogRef.value.showBtnLoading()
        // 请求添加分类接口
        addCategory(form).then((res) => {
            if (res.success === true) {
                showMessage('添加成功')
                // 将表单中分类名称和描述置空
                form.name = ''
                form.description = ''
                // 隐藏对话框
                formDialogRef.value.close()
                // 重新请求分页接口，渲染新的数据
                getTableData()
            } else {
                // 获取服务端返回的错误消息
                let msg = res.msg
                // 提示消息
                showMessage(msg, 'error')
            }
        }).finally(() => formDialogRef.value.closeBtnLoading()) // 隐藏提交按钮 loading
    })
}
// 删除分类事件
const deleteCategorySubmit = (row) => {
    // console.log(row.id)
    showModel('是否确定要删除分类？').then(() => {
        deleteCategory(row.id).then((res) => {
            // console.log(res);
            if (res.success === true) {
                showMessage(`删除分类【${row.name}】成功！`)
                // 重新请求分页接口，渲染数据
                getTableData()
            } else {
                // 获取服务端返回的错误消息
                let msg = res.msg
                // 提示消息
                showMessage(msg, 'error')
            }
        })
    }).catch(() => {
        showMessage(`取消删除分类【${row.name}】`, 'info')
    })
}

// 新增分类对话框是否显示
const updateFromDialogRef = ref(null)

// 新增分类按钮点击事件
const updateCategoryBtnClick = (row) => {
    // 绑定分类的id、name、description
    updateForm.id = row.id
    updateForm.name = row.name
    updateForm.description = row.description
    updateFromDialogRef.value.open()
}

// 表单引用
const updateFormRef = ref(null)

// 新增文章分类的表单对象
const updateForm = reactive({
    id: '',
    name: '',
    description:''
})

// 校验规则
const updateRules = {
    name: [
        {required: true, message: '分类名称不能为空', trigger: 'blur'},
        {min: 1, max: 20, message: '分类名称字数要求大于 1 个字符，小于 20 个字符', trigger: 'blur'}
    ],
    description:[
        {max: 100, message: '分类描述字数要求小于 100 个字符', trigger: 'blur'}
    ]
}
// 修改分类提交操作
const onUpdateSubmit = () => {
    // 先验证 form 表单字段
    updateFormRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }
        // 显示提交按钮 loading效果
        updateFromDialogRef.value.showBtnLoading()
        // 请求添加分类接口
        updateCategory(updateForm).then((res) => {
            if (res.success === true) {
                showMessage('修改成功')
                // 将表单中分类名称和描述置空
                updateForm.id = 0
                updateForm.name = ''
                updateForm.description = ''
                // 隐藏对话框
                updateFromDialogRef.value.close()
                // 重新请求分页接口，渲染新的数据
                getTableData()
            } else {
                // 获取服务端返回的错误消息
                let msg = res.msg
                // 提示消息
                showMessage(msg, 'error')
            }
        }).finally(() => updateFromDialogRef.value.closeBtnLoading()) // 隐藏提交按钮 loading
    })
}

// 调整分页在不同客户端的样式
const {paginationLayout,small } = setupPagination()
// 响应式布局，调整表单内容显示和操作显示
const {width} = useWindowSize()
const colunmWidth = computed(()=>{
    if (width.value<=768){
        return 110
    }else if (width.value <= 1477){
        return 180
    }else{
        return ''
    }
})
const btnSize = computed(()=>{
    return width.value <= 1527 ? 'small':'default'
})
</script>

<template>
    <div>
        <!-- 表头分页查询条件，shadow指定card 卡片组件没有阴影 -->
        <el-card shadow="never" class="mb-3">
            <!-- flex布局，内容垂直居中 -->
            <div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5">
                <!-- 分类名称 -->
                <div class="flex flex-col md:flex-row md:items-center w-full">
                    <div class="flex items-center md:w-auto ml-5">
                        <el-text class="text-left w-13 hide-on-mobile">分类名称</el-text>
                        <el-input v-model="searchCategoryName" placeholder="请输入分类名称（支持模糊查询）" class="ml-3" style="width: 300px;"/>
                    </div>
                </div>
                
                <!-- 创建日期 -->
                <div class="flex flex-col md:flex-row md:items-center w-full mt-3 md:mt-0">
                    <div class="flex items-center w-full md:w-auto hide-on-mobile">
                        <el-text class="text-left w-13 ">创建日期</el-text>
                        <el-date-picker v-model="pickDate" type="daterange" range-separator="至"
                                        start-placeholder="开始时间" @change="datePickerChange"
                                        end-placeholder="结束时间" class="ml-3" style="width: 300px;"
                                        size="default" :shortcuts="shortcuts"/>
                    </div>
                </div>
                
                <!-- 查询和重置按钮 -->
                <div class="flex flex-row justify-center mt-3 md:mt-0 md:ml-5 space-x-3">
                    <el-button type="primary" :icon="Search" @click="getTableData">
                        <span >查询</span>
                    </el-button>
                    <el-button :icon="RefreshRight" @click="reset">
                        <span >重置</span>
                    </el-button>
                </div>
            </div>
        </el-card>
        
        <el-card shadow="never">
            <!-- 分类数据的分页列表 -->
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="tableLoading">
                <el-table-column type="index" label="序号" width="60" align="center"/>
                <el-table-column prop="name" label="分类名称" width="120" align="center"/>
                <el-table-column prop="description" label="分类描述" width="300" align="center"/>
                <el-table-column prop="createTime" label="创建时间" width="180" align="center"/>
                <el-table-column prop="updateTime" label="更新时间" width="180" align="center"/>
                <el-table-column label="操作" align="center" :width="colunmWidth">
                    <template #default="scope">
                        <div class="action-buttons">
                            <el-button :size="btnSize" @click="showArticleUpdateEditor(scope.row)">
                                <el-icon class="">
                                    <Edit/>
                                </el-icon>
                                <span class="hide-on-mobile">编辑</span>
                            </el-button>
                            <el-button :size="btnSize" type="danger" @click="deleteArticleSubmit(scope.row)">
                                <el-icon class="">
                                    <Delete/>
                                </el-icon>
                                <span class="hide-on-mobile">删除</span>
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 新增分类按钮 -->
            <el-button class="mt-4" type="primary" style="width: 100%" @click="addCategoryBtnClick">
                <el-icon class="mr-1">
                    <Plus/>
                </el-icon>
                新增分类
            </el-button>
            
            <!-- 分页的页码，数量等数据展示，页面跳转等事件 -->
            <div class="mt-10 flex justify-center">
                <el-pagination v-model:current-page="current" v-model:page-size="size"
                               :page-sizes="[5,10,20,50]" :small="small" :background="true"
                               :layout="paginationLayout" :total="total"
                               @size-change="handleSizeChange" @current-change="getTableData"/>
            </div>
        </el-card>
        
        <!-- 添加分类表单 -->
        <FormDialog ref="formDialogRef" title="添加文章分类" destroyOnClose @submit="onSubmit" height="40px">
            <!-- 输入框组件 -->
            <el-form ref="formRef" :rules="rules" :model="form">
                <el-form-item label="分类名称" prop="name" label-width="80px" size="large">
                    <el-input size="large" v-model="form.name" placeholder="请输入分类名称" maxlength="20"
                              show-word-limit clearable/>
                </el-form-item>
                <el-form-item label="分类描述" prop="description" label-width="80px" size="large">
                    <el-input size="large" v-model="form.description" placeholder="请输入分类描述(非必须)" maxlength="100"
                              show-word-limit clearable/>
                </el-form-item>
            </el-form>
        </FormDialog>
        
        <!-- 修改分类表单 -->
        <FormDialog ref="updateFromDialogRef" title="修改文章分类" destroyOnClose @submit="onUpdateSubmit" height="40px">
            <!-- 输入框组件 -->
            <el-form ref="updateFormRef" :rules="updateRules" :model="updateForm">
                <el-form-item label="修改分类名称" prop="name" label-width="120px" size="large">
                    <el-input size="large" v-model="updateForm.name" maxlength="20"
                              show-word-limit clearable/>
                </el-form-item>
                <el-form-item label="修改分类描述" prop="description" label-width="120px" size="large">
                    <el-input size="large" v-model="updateForm.description" maxlength="100"
                              show-word-limit clearable/>
                </el-form-item>
            </el-form>
        </FormDialog>
    
    </div>
</template>

<style scoped>
.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-button:last-child {
    margin-right: 0;
}
</style>