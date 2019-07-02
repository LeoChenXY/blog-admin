<template>
    <div class="manager-list">

        <!-- 搜索栏 -->
        <el-input 
        placeholder="请输入内容" 
        class="input-with-select" 
        v-model="query" 
        @keyup.native.enter="initList">
                <el-button 
                slot="append" 
                icon="el-icon-search"
                class="all_btn" 
                @click="initList">搜索</el-button>
        </el-input>

        <!-- 新增按钮 -->
        <el-button 
        icon="el-icon-plus"
        type="primary"
        class="all_btn"
        @click="managerManage(manager='',type='insert')">新增</el-button>

        <!-- 用户数据 -->
        <template>
            <el-table
                :data="managerData"
                border
                highlight-current-row
                @row-click="click"
                style="width: 100%"
                :row-class-name="rowClassName">

                <el-table-column
                prop="index"
                label="序号"
                width="50">
                </el-table-column>

                <el-table-column
                v-if="show"
                prop="manager_id"
                label="id"
                width="50">
                </el-table-column>

                <el-table-column
                prop="manager_name"
                label="管理员名"
                width="100">
                </el-table-column>

                <el-table-column
                prop="role_name"
                label="管理员角色"
                width="100">
                    <template>
                        普通用户
                    </template>
                </el-table-column>

                <el-table-column
                prop="telphone_num"
                label="手机号"
                width="140">
                    <template slot-scope="manager">
                        <i class="el-icon-mobile-phone"></i>
                        <span style="margin-left: 10px">{{ manager.row.telphone_num }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="real_name"
                label="真实姓名"
                width="100">
                </el-table-column>

                <el-table-column
                prop="email"
                label="邮箱">
                    <template slot-scope="manager">
                        <i class="el-icon-message"></i>
                        <span style="margin-left: 10px">{{ manager.row.email }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="register_time"
                label="创建时间">
                    <template slot-scope="manager">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ manager.row.register_time }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="manager_status"
                label="是否启用"
                width="80">
                    <template slot-scope="manager">
                        <el-switch
                        v-model="manager.row.manager_status"
                        active-color="#13CE66"
                        inactive-color="#ff4949"
                        @change="statusChange(user)">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                label="操作"
                fixed="right"
                width="100">
                    <!-- 作用域插槽 获得组件中的 当前行的id -->
                    <template slot-scope="manager">
                        <!-- 修改用户数据 -->
                        <el-button 
                        type="text" 
                        class="table_btn" 
                        icon="el-icon-edit"
                        size="small"
                        title="修改" 
                        @click="managerManage(manager,type='edit')"></el-button>
                        <!-- 设置 -->
                        <el-button 
                        type="text" 
                        class="table_btn" 
                        icon="el-icon-setting"
                        size="small"
                        title="分配用户角色"
                        @click="roleUser(manager)"
                        ></el-button>
                        <!-- 删除用户 -->
                        <el-button 
                        type="text" 
                        class="table_btn" 
                        icon="el-icon-delete"
                        size="small"
                        title="删除" 
                        @click="delManager(manager)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!-- 分页栏 -->
        <template>
            <div class="page">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </template>

        <!-- 管理员管理对话框 -->
        <el-dialog 
        :title="dialogTitle" 
        :visible.sync="managerDialog" 
        width="30%">
            <el-form :model="managerForm" :rules="rules" ref="vaildForm">
                <el-form-item prop="manager_name">
                    <el-input
                    prefix-icon="el-icon-user"
                    v-model="managerForm.manager_name"
                    placeholder="请输入管理员名"
                    autocomplete="off"
                    :disabled="nameEnbel"></el-input>
                </el-form-item>

                <el-form-item prop="real_name">
                    <el-input
                    prefix-icon="el-icon-key"
                    v-model="managerForm.real_name"
                    placeholder="请输入管理员真实姓名"
                    autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="telphone_num">
                    <el-input
                    prefix-icon="el-icon-mobile-phone"
                    v-model="managerForm.telphone_num"
                    placeholder="请输入管理员手机号"
                    autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="email">
                    <el-input
                    prefix-icon="el-icon-message"
                    v-model="managerForm.email"
                    placeholder="请输入管理员邮箱"
                    autocomplete="off"></el-input>
                </el-form-item>

                <el-alert
                    title="初始密码为：123456"
                    type="success"
                    :closable="false">
                </el-alert>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="managerSubmit">提 交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
// 引入自定义后台交互api文件
/* 
addManager          新增管理员
delManager          删除管理员
getManagerList      查询所有管理员
getManagerById         根据管理员id查询对应管理员信息
editManager         修改管理员 
changeUserState     改变管理员状态（启用）
getUserRole         查询分配管理员角色
getUserRoleById     根据id查询分配管理员角色
*/
import {
    addManager,
    delManager,
    getManagerList,
    getManagerById,
    editManager,
    changeUserState,
    getUserRole,
    getUserRoleById
} from '@/api/axios.js'

/*
公共方法api
comMsg 消息提示,
formatDateTime 时间格式化 
*/
import {comMsg,formatDateTime,validPhone} from '@/api/commonAPI.js'
    export default {
        data() {
            return {
                // 搜索关键字
                query:'',
                /* 
                *分页相关 
                * @params {pagenum} int 当前页码
                * @params {pagesize} int 当前每页显示数据数
                * @params {total} int 总数据数
                */
                pagenum: 1,
                pagesize: 10,
                total: 0,
                // 打开的对话框标题
                dialogTitle: '',
                // 对话框开关控制变量
                managerDialog: false,
                // 管理员表单状态设置
                nameEnbel: false,
                // 提交状态（新增、修改）
                submitType: '',
                // 管理员表单数据
                managerForm: {
                    manager_name: '',
                    real_name: '',
                    email: '',
                    telphone_num: ''
                },
                // 用户列表数据
                managerData: [],
                // 隐藏列
                show: false,
                // 管理员启用状态
                manager_status: false,
                // 管理员id
                manager_id: 0,
                // 自定义表单验证规则
                rules: {
                    manager_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' }
                        ],
                        real_name: [
                            { required: true, message: '请输入用户真实姓名', trigger: 'blur' },
                            { min: 2, max: 30, message: '长度在 2 到 30 个字符之间', trigger: 'blur' }
                        ],
                        telphone_num: [
                            { required: true, trigger: 'blur', validator: validTelPhone }//这里需要用到全局变量
                        ],
                        email: [
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]
                }
            }
        },    
        methods: {
            // 设置table序号
            rowClassName({row, rowIndex}) {
                //把每一行的索引放进row.id
                row.index = rowIndex+1;
            },
            // 判断操作者需要打开新增页面还是修改页面
            managerManage (manager,type) {
                // 格式化表单
                this.clearForm()
                // 对话框开关控制变量
                this.managerDialog = true
                switch (type) {
                    // 如果是新增
                    case 'insert':
                        // console.log(manager)
                        // 设置dialog title
                        this.dialogTitle = '新增管理员'
                        // 设置提交状态
                        this.submitType = 'insert'
                        break;
                    // 如果是修改
                    case 'edit':
                        // console.log(manager)
                        // 禁用管理员名名输入框
                        this.nameEnbel = true
                        // 设置dialog title
                        this.dialogTitle = '修改管理员'
                        // 设置提交状态
                        this.submitType = 'edit'
                        // 绑定表单数据
                        this.managerForm = {
                            manager_name: manager.row.manager_name,
                            real_name: manager.row.real_name,
                            telphone_num: manager.row.telphone_num,
                            email: manager.row.email,
                        }
                        // 绑定管理员id
                        this.manager_id = manager.row.manager_id
                        break;
                }
            },
            // 提交用户数据
            managerSubmit () {
                switch (this.submitType) {
                    // 新增
                    case 'insert':
                        // 调用新增用户方法
                        this.addSubmit()
                        break;
                    // 修改
                    case 'edit':
                        // 调用新增用户方法
                        this.editSubmit()
                        break;
                }
            },
            // 确定新增用户
            addSubmit () {
                this.$refs['vaildForm'].validate((valid) => {
                    if (valid) {
                        // console.log("进来了")      
                        addManager(this.managerForm).then(res => {
                            // console.log(res)
                            if (res.meta.status == 2001) {
                                /* 
                                创建成功
                                消息提示 
                                */
                                comMsg(this,'success',res.meta.msg)
                                // 关闭对话框
                                this.managerDialog = false
                                // 清空表单数据
                                this.clearForm()
                                // 修改搜索关键字为新账号名
                            //   this.query = res.data.username
                                // 刷新用户列表
                                this.initList()
                            } else {
                                /* 
                                创建成功
                                消息提示 
                                */
                                comMsg(this,'error',res.meta.msg)
                            }
                        })
                    } else {
                        // console.log('error submit!!');
                        // comMsg(this,'error','请先完善表单！')
                        return false;
                    }
                })
            },
            // 删除用户数据
            delManager (manager) {
                // console.log(manager)
                this.$confirm('确定删除此数据？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delManager(manager.row.manager_id).then(res => {
                        // console.log(res)
                        if (res.meta.status == 2000) {
                            /* 
                            删除成功
                            消息提示 
                            */
                            comMsg(this,'success',res.meta.msg)
                            // 刷新数据表
                            this.initList()
                        } else {
                            /* 
                            删除失败
                            消息提示 
                            */
                            comMsg(this,'error',res.meta.msg)
                        }
                    })
                }).catch(() => {
                    // 弹出提示信息
                    comMsg(this,'info','年轻人不要搞四情！')
                })
            },
            // 确定修改用户数据
            editSubmit () {
                this.$refs['vaildForm'].validate((valid) => {
                    if (valid) {
                        // console.log("进来了")      
                        editManager(this.manager_id, this.managerForm).then(res => {
                            // console.log(res)
                            if (res.meta.status == 2000) {
                                /* 
                                修改成功
                                消息提示 
                                */
                                comMsg(this,'success',res.meta.msg)
                                // 关闭对话框
                                this.managerDialog = false
                                // 清空表单数据
                                this.clearForm()
                                // 修改搜索关键字为新账号名
                            //   this.query = res.data.username
                                // 刷新用户列表
                                this.initList()
                            } else {
                                /* 
                                创建成功
                                消息提示 
                                */
                                comMsg(this,'error',res.meta.msg)
                            }
                        })
                    } else {
                        // console.log('error submit!!');
                        // comMsg(this,'error','请先完善表单！')
                        return false;
                    }
                })
            },
            // 初始化用户数据方法
            initList () {
                // console.log(this.pagenum + ' ' + this.pagesize)
                getManagerList(this.pagenum,this.pagesize,this.query).then(res => {
                    // console.log(res)
                    if (res.meta.status == 2000) {
                        // console.log(res)
                        // 保存用户数组信息
                        this.managerData = res.data.data
                        // 查询总数据
                        this.total = res.data.total
                        // 当前页码
                        this.pagenum = res.data.pagenum
                    }
                })
            },
            /**
             * 其他操作
             */
            // 关闭对话框
            closeDialog () {
                // 清空表单数据
                this.clearForm()
                // 关闭窗口
                this.managerDialog = false
            },
            // 清空表单数据
            clearForm () {
                // 启用管理员名名输入框
                this.nameEnbel = false
                this.managerForm = {
                    manager_name:'',
                    real_name:'',
                    email:'',
                    telphone_num:''
                }
            },
            // 每页显示数量改变事件
            handleSizeChange (size) {
                this.pagesize = size
                this.initList()
            },
            // 当前页码改变事件
            handleCurrentChange (page) {
                this.pagenum = page
                this.initList()

            },
            // 点击table某一行后，获取当前行数据
            click (row, column, event) {
                // comMsg(this,'success',row)
                // console.log(row)
            },
            // 更改用户状态
            statusChange (user) {
                // console.log(user.row.user_status)
            }
        },
        created () {
            // 设置浏览器标签页名称
            document.title = '用户列表 - 小确幸 - 后台管理系统'
            // 调用初始化用户数据方法
            this.initList()
        }
    }
    // 验证手机号码
    var validTelPhone = (rule,value,callback) => {
        // console.log(value)
        if (!value) {
            callback(new Error('请输入用户手机号码'))
        } else  if (!validPhone(value)){
            callback(new Error('请输入正确的11位手机号码'))
        }else {
            callback()
        }
    }
</script>

<style lang="scss" scoped>
    .manager-list{
        margin: 20px;

        // 搜索区域样式
        .input-with-select{
            width: 400px;
            margin-bottom: 10px;
        }

        // 分页栏
        .page {
            padding: 0;
            border-radius: 5px;
            margin-top: 10px;
        }
    }
</style>