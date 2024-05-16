<script setup>
// 引入所需图标
import {RefreshRight, Search} from "@element-plus/icons-vue";
import {reactive, ref, computed} from 'vue'
import moment from "moment";
import {showMessage, showModel} from "@/composables/util.js";
import {setupPagination} from "@/composables/pagination.js";
// 引入对话框弹出组件
import {
    deleteArticle,
    getArticleDetail,
    getArticlePageList,
    publishArticle,
    updateArticle
} from "@/api/admin/article.js";
import {MdEditor} from "md-editor-v3";
import 'md-editor-v3/lib/style.css'
import {uploadFile} from "@/api/admin/file.js";
import {getCategorySelectList} from "@/api/admin/category.js";
import {getTagSelectList, searchTags} from "@/api/admin/tag.js";
import {useWindowSize} from "@/api/frontend/useWindowSize.js";


// --> 下面是查询文章的操作 <--

// 分页模糊查询的文章名称
const searchArticleTitle = ref('')
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
    getArticlePageList({
        current: current.value, size: size.value, startDateTime: startDate.value,
        endDateTime: endDate.value, title: searchArticleTitle.value
    }).then((res) => {
        if (res.success === true) {
            tableData.value = res.data
            current.value = res.current
            size.value = res.size
            total.value = res.total
        }
    }).finally(() => tableLoading.value = false) // 隐藏表格 loading
}

getTableData()

// 每页展示数量变更事件
const handleSizeChange = (chooseSize) => {
    size.value = chooseSize
    getTableData()
}

// 重置查询条件
const reset = () => {
    searchArticleTitle.value = ''
    pickDate.value = ''
    startDate.value = null
    endDate.value = null
    getTableData()
}

// --> 下面是删除文章的操作 <--

// 删除文章事件
const deleteArticleSubmit = (row) => {
    // console.log(row.id)
    showModel('是否确定要删除文章？').then(() => {
        deleteArticle(row.id).then((res) => {
            if (res.success === true) {
                showMessage(`删除文章【${row.title}】成功！`)
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
        showMessage(`取消删除文章【${row.title}】`, 'info')
    })
}

// --> 下面是发布文章的操作 <--

// 是否显示文章发布对话框
const isArticlePublishEditorShow = ref(false)
// 发布文章表达引用
const publishArticleFormRef = ref(null)
// 发布文章的表单对象
const form = reactive({
    id: null,
    title: '',
    content: '请输入内容',
    cover: '',
    categoryId: null,
    tags: [],
    summary: ''
})
// 发布文章的表单校验规则
const rules = {
    title: [
        {required: true, message: '请输入文章标题', trigger: 'blur'},
        {min: 1, max: 40, message: '文章标题要求大于1个字符，小于40个字符', trigger: 'blur'},
    ],
    content: [{required: true}],
    cover: [{required: true}],
    categoryId: [{required: true, message: '请选择文章分类', trigger: 'blur'}],
    tags: [{required: true, message: '请选择文章标签', trigger: 'blur'}],
}

// 上传文章封面图片
const handleCoverChange = (file) => {
    // 表单对象
    let formData = new FormData()
    // 添加 file字段，并将文件传入
    formData.append('file', file.raw)
    uploadFile(formData).then((res) => {
        // 响参失败，提示错误信息
        if (res.success === false) {
            let msg = res.msg
            showMessage(msg, 'error')
            return
        }
        // 成功则设置表达对象中的封面链接，并提示上传成功
        // 成功则 后台上传图片，并获取图片链接
        if (form.cover === res.data.url) {
            showMessage("请勿重复上传封面图", 'warning')
        } else {
            form.cover = res.data.url
            showMessage("封面图上传成功,请保存设置", 'info')
        }
    })
}

// 文章中的图片上传（编辑器图片上传）
const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise((rev, rej) => {
                console.log('==> 编辑器中的文件开始上传...')
                let formData = new FormData()
                formData.append("file", file)
                uploadFile(formData).then((res) => {
                    // console.log(res);
                    console.log('访问路径：' + res.data.url)
                    // 调用 callback 函数，回显上传图片
                    callback([res.data.url]);
                })
            })
        })
    )
}

// 文章分类下拉列表数据获取
const categories = ref([])
getCategorySelectList().then((res) => {
    categories.value = res.data
})

// 文章标签模糊查询后的 列表数据获取

// 标签 select Loading 状态，默认不显示
const tagSelectLoading = ref(false)
// 文章标签
const tags = ref([])
// 根据用户输入的标签名称，异步模糊查询（发布文章时的标签模糊查询）
const remoteMethod = (query) => {
    // console.log('远程搜索：' + tags.value)
    // 如果用户的查询关键词不为空
    if (query) {
        // 显示loading
        tagSelectLoading.value = true
        // 调用标签模糊查询接口
        searchTags(query).then((res) => {
            if (res.success === true) {
                // 设置到 tags 变量中
                tags.value = res.data
            }
        }).finally(() => tagSelectLoading.value = false) // 隐藏 loading
    }
}

// --> 下面是发布文章的操作 <--
const publishArticleSubmit = () => {
    // console.log('提交 md 内容：' + form.content)
    // 校验表单
    publishArticleFormRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        
        publishArticle(form).then((res) => {
            if (res.success == false) {
                // 获取服务端返回的错误消息
                let msg = res.msg
                // 提示错误消息
                showMessage(msg, 'error')
                return
            }
            
            showMessage('发布成功')
            // 隐藏发布文章对话框
            isArticlePublishEditorShow.value = false
            // 将 form 表单字段置空
            form.title = ''
            form.content = ''
            form.cover = ''
            form.summary = ''
            form.categoryId = null
            form.tags = []
            // 重新请求分页接口，渲染列表数据
            getTableData()
        })
    })
}
// --> 下面是更新文章的操作 <--
// 是否显示更新文章对话框
const isArticleUpdateEditorShow = ref(false)
// 编辑文章表单引用
const updateArticleFormRef = ref(null)
// 修改文章表单对象
const updateArticleForm = reactive({
    id: null,
    title: '',
    content: '请输入内容',
    cover: '',
    categoryId: null,
    tags: [],
    summary: ""
})
// 编辑文章：上传文章封面图片
const handleUpdateCoverChange = (file) => {
    // 表单对象
    let formData = new FormData()
    // 添加 file字段，并将文件传入
    formData.append('file', file.raw)
    uploadFile(formData).then((res) => {
        // 响参失败，提示错误信息
        if (res.success === false) {
            let msg = res.msg
            showMessage(msg, 'error')
            return
        }
        // 成功则设置表达对象中的封面链接，并提示上传成功
        // 成功则 后台上传图片，并获取图片链接
        if (updateArticleForm.cover === res.data.url) {
            showMessage("请勿重复上传封面图", 'warning')
        } else {
            updateArticleForm.cover = res.data.url
            showMessage("封面图上传成功,请保存设置", 'info')
        }
    })
}
// 编辑文章按钮点击事件，获取文章详细信息
const showArticleUpdateEditor = (row) => {
    // 显示编辑文章对话框
    isArticleUpdateEditorShow.value = true;
    // 拿到文章的ID
    let articleId = row.id
    // 获取文章详细信息
    getArticleDetail(articleId).then((res) => {
        if (res.success === true) {
            // 设置更新表单数据
            updateArticleForm.id = res.data.id
            updateArticleForm.title = res.data.title
            updateArticleForm.cover = res.data.cover
            updateArticleForm.content = res.data.content
            updateArticleForm.categoryId = res.data.categoryId
            updateArticleForm.tags = res.data.tagIds // 此时获得的是标签的id，我们还需要转换一下
            updateArticleForm.summary = res.data.summary
        } else {
            let msg = res.msg
            showMessage(msg, 'error')
        }
    })
}
// 渲染标签数据（id 变为 name）
getTagSelectList().then(res => {
    tags.value = res.data
})

// 保存更新/编辑后的文章
const updateSubmit = () => {
    updateArticleFormRef.value.validate((valid) => {
        // 校验表单
        if (!valid) {
            return false
        }
        // 请求更新文章接口
        updateArticle(updateArticleForm).then((res) => {
            if (res.success === false) {
                // 获取服务端返回的错误信息
                let message = res.message
                // 提示错误消息
                showMessage(message, 'error')
                return
            }
            
            showMessage('文章更新成功')
            // 隐藏编辑框
            isArticleUpdateEditorShow.value = false
            // 重新请求分页接口，渲染列表数据
            getTableData()
        })
    })
}
// 调整分页在不同客户端的样式
const {paginationLayout, small} = setupPagination()
// 响应式布局，调整表单内容显示和操作显示
const {width} = useWindowSize()
const colunmWidth = computed(() => {
    if (width.value <= 768) {
        return 110
    } else if (width.value <= 1477) {
        return 180
    } else {
        return ''
    }
})
const btnSize = computed(() => {
    return width.value <= 1527 ? 'small' : 'default'
})


</script>

<template>
    <div>
        <!-- 表头分页查询条件，shadow指定card 卡片组件没有阴影 -->
        <el-card shadow="never" class="mb-3">
            <!-- flex布局，内容垂直居中 -->
            <div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5">
                <!-- 文章名称 -->
                <div class="flex flex-col md:flex-row md:items-center w-full">
                    <div class="flex items-center md:w-auto ml-5">
                        <el-text class="text-left w-13 hide-on-mobile">文章名称</el-text>
                        <el-input v-model="searchArticleTitle" placeholder="请输入文章标题（支持模糊查询）" class="ml-3"
                                  style="width: 300px"/>
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
                        <span>查询</span>
                    </el-button>
                    <el-button :icon="RefreshRight" @click="reset">
                        <span>重置</span>
                    </el-button>
                </div>
            </div>
        </el-card>
        
        <el-card shadow="never">
            <!-- 文章数据的分页列表 -->
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="tableLoading">
                <el-table-column type="index" label="序号" width="60" align="center"/>
                <el-table-column prop="title" label="标题" width="180" align="center"/>
                <!--增加文章的所属标签和分类-->
                <el-table-column prop="categoryName" label="所属分类" width="100" align="center"/>
                <el-table-column prop="tagIds" label="所属标签" width="200" align="center">
                    <template #default="scope">
                        <el-tag style="margin-right: 1px; margin-top: 1px"
                                type="success" v-for="item in scope.row.tagNames">{{ item }}
                        </el-tag>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="summary" label="文章概要" width="200" align="center"/>-->
                <el-table-column prop="cover" label="封面" width="130" align="center">
                    <template #default="scope">
                        <el-image style="width: 80px" :src="scope.row.cover"/>
                    </template>
                </el-table-column>
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
            
            <!-- 新增文章按钮 -->
            <el-button class="mt-4" type="primary" style="width: 100%" @click="isArticlePublishEditorShow = true">
                <el-icon class="mr-1">
                    <EditPen/>
                </el-icon>
                写文章
            </el-button>
            
            <!-- 分页的页码，数量等数据展示，页面跳转等事件 -->
            <div class="mt-10 flex justify-center">
                <el-pagination v-model:current-page="current" v-model:page-size="size"
                               :page-sizes="[5,10,20,50]" :small="small" :background="true"
                               :layout="paginationLayout" :total="total"
                               @size-change="handleSizeChange" @current-change="getTableData"/>
            </div>
        </el-card>
        
        <!-- 发布文章弹窗 -->
        <el-dialog v-model="isArticlePublishEditorShow" :show-close="false" :fullscreen="true"
                   :close-on-press-escape="false">
            <template #header="{close,titleId,titleClass}">
                <!-- 固定组件，固定到顶部 -->
                <el-affix :offset="18" style="width: 100%">
                    <!-- 指定flex布局，高度为10，背景为白色 -->
                    <div class="flex h-1 bg-white">
                        <!-- 字体加粗 -->
                        <h4 :id="titleId" class="font-bold">写文章啦</h4>
                        <!-- 靠右对齐 -->
                        <div class="ml-auto flex">
                            <el-button type="warning" @click="isArticlePublishEditorShow = false">
                                <el-icon class="mr-1">
                                    <CloseBold/>
                                </el-icon>
                                取消
                            </el-button>
                            <el-button type="primary" @click="publishArticleSubmit">
                                <el-icon class="mr-1">
                                    <Promotion/>
                                </el-icon>
                                发布
                            </el-button>
                        </div>
                    </div>
                </el-affix>
            </template>
            <!-- label-position="top" 用于指定 label 元素在上面 -->
            <el-form :model="form" ref="publishArticleFormRef" label-position="top" size="large" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" autocomplete="off" size="large" maxlength="40" show-word-limit
                              clearable/>
                </el-form-item>
                
                <el-form-item label="内容" prop="content">
                    <!-- Markdown 编辑器 -->
                    <MdEditor v-model="form.content" @onUploadImg="onUploadImg" editorId="publishArticleEditor"/>
                </el-form-item>
                
                <el-form-item label="封面" prop="cover">
                    <el-upload class="avatar-uploader border" action="#" :on-change="handleCoverChange"
                               :auto-upload="false" :show-file-list="false">
                        <img v-if="form.cover" :src="form.cover" class="avatar"/>
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus/>
                        </el-icon>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="摘要" prop="summary">
                    <!-- :rows="3" 指定 textarea 默认显示 3 行 -->
                    <el-input v-model="form.summary" :rows="3" type="textarea" placeholder="请输入文章摘要"/>
                </el-form-item>
                
                <el-form-item label="分类" prop="categoryId">
                    <el-select v-model="form.categoryId" clearable placeholder="---请选择---" size="large">
                        <el-option v-for="item in categories" :key="item.value" :label="item.label"
                                   :value="item.value"/>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="标签" prop="tags">
                    <!-- 标签选择 -->
                    <span class="w-60">
                        <!-- 标签选择 -->
                        <el-select v-model="form.tags" multiple filterable remote reserve-keyword
                                   placeholder="请输入文章标签"
                                   remote-show-suffix allow-create default-first-option :remote-method="remoteMethod"
                                   :loading="tagSelectLoading"
                                   size="large">
                            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </span>
                </el-form-item>
            </el-form>
        </el-dialog>
        
        <!-- 编辑文章弹窗 -->
        <el-dialog v-model="isArticleUpdateEditorShow" :show-close="false" :fullscreen="true"
                   :close-on-press-escape="false">
            <template #header="{close,titleId,titleClass}">
                <!-- 固定组件，固定到顶部 -->
                <el-affix :offset="18" style="width: 100%">
                    <!-- 指定flex布局，高度为10，背景为白色 -->
                    <div class="flex h-1 bg-white">
                        <!-- 字体加粗 -->
                        <h4 :id="titleId" class="font-bold">编辑文章</h4>
                        <!-- 靠右对齐 -->
                        <div class="ml-auto flex">
                            <el-button type="warning" @click="isArticleUpdateEditorShow = false">
                                <el-icon class="mr-1">
                                    <CloseBold/>
                                </el-icon>
                                取消
                            </el-button>
                            <el-button type="primary" @click="updateSubmit">
                                <el-icon class="mr-1">
                                    <Promotion/>
                                </el-icon>
                                保存
                            </el-button>
                        </div>
                    </div>
                </el-affix>
            </template>
            <!-- label-position="top" 用于指定 label 元素在上面 -->
            <el-form :model="updateArticleForm" ref="updateArticleFormRef" label-position="top" size="large"
                     :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="updateArticleForm.title" autocomplete="off" size="large" maxlength="40"
                              show-word-limit
                              clearable/>
                </el-form-item>
                
                <el-form-item label="内容" prop="content">
                    <!-- Markdown 编辑器 -->
                    <MdEditor v-model="updateArticleForm.content" @onUploadImg="onUploadImg"
                              editorId="updateArticleEditor"/>
                </el-form-item>
                
                <el-form-item label="封面" prop="cover">
                    <el-upload class="avatar-uploader border" action="#" :on-change="handleUpdateCoverChange"
                               :auto-upload="false" :show-file-list="false">
                        <img v-if="updateArticleForm.cover" :src="updateArticleForm.cover" class="avatar"/>
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus/>
                        </el-icon>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="摘要" prop="summary">
                    <!-- :rows="3" 指定 textarea 默认显示 3 行 -->
                    <el-input v-model="updateArticleForm.summary" :rows="3" type="textarea"
                              placeholder="请输入文章摘要"/>
                </el-form-item>
                
                <el-form-item label="分类" prop="categoryId">
                    <el-select v-model="updateArticleForm.categoryId" clearable placeholder="---请选择---" size="large">
                        <el-option v-for="item in categories" :key="item.value" :label="item.label"
                                   :value="item.value"/>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="标签" prop="tags">
                    <!-- 标签选择 -->
                    <span class="w-60">
                        <!-- 标签选择 -->
                        <el-select v-model="updateArticleForm.tags" multiple filterable remote reserve-keyword
                                   placeholder="请输入文章标签"
                                   remote-show-suffix allow-create default-first-option :remote-method="remoteMethod"
                                   :loading="tagSelectLoading"
                                   size="large">
                            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </span>
                </el-form-item>
            </el-form>
        </el-dialog>
    
    </div>
</template>

<style scoped>
/* 封面图片样式 */
.avatar-uploader .avatar {
    width: 200px;
    height: 100px;
    display: block;
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 100px;
    text-align: center;
}

/* 指定 select 下拉框宽度 */
.el-select--large {
    width: 600px;
}

.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-button:last-child {
    margin-right: 0;
}
</style>

<style>
.md-editor-footer {
    height: 40px;
}

</style>
