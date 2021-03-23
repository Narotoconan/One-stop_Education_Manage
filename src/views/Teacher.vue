<template>
    <div class="teacherPage">
        <div class="itemCard">
            <h4 class="pt-3">教师管理</h4>
            <div class="mt-4 pb-4 operation">
                <div>
                    <span class="mr-3">搜索老师</span>
                    <div class="d-inline-block">
                        <el-input v-model="teacherName" placeholder="老师名称"
                                  @keypress.enter.native="getTeacher(1)"></el-input>
                    </div>
                </div>
                <div>
                    <span class="mr-3">老师类型</span>
                    <el-select v-model="categoryId" placeholder="请选择老师类型" @change="getTeacher(1)">
                        <el-option label="全部老师" value=""></el-option>
                        <el-option label="数学老师" value="10"></el-option>
                        <el-option label="英语老师" value="20"></el-option>
                        <el-option label="编程老师" value="30"></el-option>
                    </el-select>
                </div>
                <div class="float-right">
                    <el-button type="success" plain round @click="dialogAddTeacher = true">添加老师</el-button>
                    <el-button type="danger" plain round class="ml-3" @click="deleteTeachers">批量删除</el-button>
                    <el-button type="info" plain class="ml-3" icon="el-icon-refresh-right" circle
                               @click="getTeacher(page)"></el-button>
                </div>
            </div>
        </div>
        <div class="itemCard mt-4 pt-4 pb-4">
            <el-table
                    :data="teacherList"
                    border
                    @selection-change="selectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="teacherId"
                        label="教师ID"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="teacherAvatar"
                        label="教师头像"
                        align="center"
                        width="160">
                    <template slot-scope="scope">
                        <img :src="$store.state.targetURL + scope.row.teacherAvatar"
                             style="width: 78px;height: 78px;border-radius: 50%"
                             alt="teacherAvatar">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="teacherName"
                        label="教师姓名"
                        align="center"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="teacherCategory"
                        label="教师类型"
                        align="center"
                        width="160">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.teacherCategoryId === 10">{{ scope.row.teacherCategory
                            }}
                        </el-tag>
                        <el-tag type="warning" v-else-if="scope.row.teacherCategoryId === 20">{{
                            scope.row.teacherCategory }}
                        </el-tag>
                        <el-tag type="info" v-else>{{ scope.row.teacherCategory }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="teacherInfo"
                        label="教师简介"
                        show-overflow-tooltip
                        align="center">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button type="info" icon="el-icon-edit" circle plain @click="edit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle plain
                                   @click="deleteTeacher(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-4" style="text-align: center" v-if="total">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="getTeacher"
                        :page-size="size"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="修改老师信息"
                :visible.sync="dialogEdit"
                :lock-scroll="false"
                :close-on-click-modal="false"
                width="700px">
            <el-form :model="editTeacherMessage">
                <el-form-item label="教师ID" :label-width="formLabelWidth">
                    <el-input :value="editTeacherMessage.teacherId" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="教师名称" :label-width="formLabelWidth">
                    <el-input v-model="editTeacherMessage.teacherName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="教师类型" :label-width="formLabelWidth">
                    <el-select v-model="editTeacherMessage.teacherCategoryId" placeholder="请选择老师类型">
                        <el-option label="数学老师" value="10"></el-option>
                        <el-option label="英语老师" value="20"></el-option>
                        <el-option label="编程老师" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教师介绍" :label-width="formLabelWidth">
                    <el-input v-model="editTeacherMessage.teacherInfo" type="textarea" autocomplete="off"
                              autosize></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEdit = false">取 消</el-button>
            <el-button type="primary" @click="toChangeMessage">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="添加老师"
                :visible.sync="dialogAddTeacher"
                :lock-scroll="false"
                :close-on-click-modal="false"
                width="700px">
            <el-form :model="addTeacherMessage.message">
                <el-form-item label="教师头像" :label-width="formLabelWidth">
                    <up-img @imgBlob="getBlob" ref="avatarBlob"></up-img>
                </el-form-item>
                <el-form-item label="教师名称" :label-width="formLabelWidth">
                    <el-input v-model="addTeacherMessage.message.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="教师类型" :label-width="formLabelWidth">
                    <el-select v-model="addTeacherMessage.message.category" placeholder="请选择老师类型">
                        <el-option label="数学老师" value="10"></el-option>
                        <el-option label="英语老师" value="20"></el-option>
                        <el-option label="编程老师" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教师介绍" :label-width="formLabelWidth">
                    <el-input v-model="addTeacherMessage.message.info" type="textarea" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddTeacher = false">取 消</el-button>
            <el-button type="primary" @click="addTeacher">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import upImg from "../components/Common/upImg";
    import {mapState} from 'vuex'

    export default {
        name: "Teacher",
        components: {
            upImg
        },
        data() {
            return {
                dialogEdit: false,
                dialogAddTeacher: false,
                addTeacherMessage: {
                    message: {
                        name: '',
                        category: '',
                        info: '',
                    },
                    blobImg: null
                },
                editTeacherMessage: {
                    teacherCategoryId: '',
                    teacherName: '',
                    teacherInfo: ''
                },
                deleteList: [],
                formLabelWidth: "120px",
                category: '0',
                searchName: '',
                page: 1,
                size: 6,
                categoryId: '',
                teacherName: ''
            }
        },
        created() {
            this.getTeacher(this.page)
        },
        computed: {
            ...mapState({
                teacherList: state => state.TeacherManage.teacherList,
                total: state => state.TeacherManage.total,
                isNewTeacher: state => state.TeacherManage.isNewTeacher,
                isChangeTeacher: state => state.TeacherManage.isChangeTeacher,
            })
        },
        watch: {
            'isNewTeacher': {
                handler: function (val) {
                    if (val) {
                        this.dialogAddTeacher = false
                        this.$refs.avatarBlob.destroy()
                        this.addTeacherMessage = this.$options.data().addTeacherMessage
                        this.$store.commit('putTeacherState', {
                            statusName: 'isNewTeacher',
                            status: false
                        })
                        this.getTeacher(this.page)
                    }
                }
            },
            'isChangeTeacher': {
                handler: function (val) {
                    if (val) {
                        this.dialogEdit = false
                        this.$store.commit('putTeacherState', {
                            statusName: 'isChangeTeacher',
                            status: false
                        })
                        this.getTeacher(this.page)
                    }
                }
            },
        },
        methods: {
            getTeacher(page) { //获取教师
                this.page = page
                this.$store.dispatch('getTeacherList', {
                    categoryId: this.categoryId,
                    teacherName: this.teacherName,
                    c: page,
                    s: this.size
                })
            },
            deleteTeacher(row) { //删除教师（单个）
                this.$confirm('是否确认删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    lockScroll: false,
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delTeachers', [row.teacherId])
                }).catch(() => {
                    this.$message.info('已取消删除')
                });
            },
            deleteTeachers() {   //删除教师（多个）
                if (!this.deleteList.length) {
                    this.$message.warning('请选择教师')
                    return
                }
                this.$confirm('是否确认删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    lockScroll: false,
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delTeachers', this.deleteList)
                }).catch(() => {
                    this.$message.info('已取消删除')
                });
            },
            edit(row) {  //打开编辑教师
                this.dialogEdit = true
                this.editTeacherMessage.teacherId = row.teacherId
                this.editTeacherMessage.teacherName = row.teacherName
                this.editTeacherMessage.teacherCategoryId = String(row.teacherCategoryId)
                this.editTeacherMessage.teacherInfo = row.teacherInfo
            },
            toChangeMessage() {  //编辑教师信息
                for (let key of Object.values(this.editTeacherMessage)) {
                    if (!key) {
                        this.$message.warning('相关信息不能为空')
                        return
                    }
                    //dialogEdit = false
                }
                this.$store.dispatch('changeTeacher', this.editTeacherMessage)
            },
            addTeacher() {   //添加教师
                for (let key of Object.values(this.addTeacherMessage)) {
                    if (!key) {
                        this.$message.warning('相关信息不能为空')
                        return
                    }
                }
                this.$store.dispatch('newTeacher', this.addTeacherMessage)
            },
            getBlob(theBlog) {   //获取blog图像
                this.addTeacherMessage.blobImg = theBlog
            },
            selectionChange(val) {   //获取删除列表
                this.deleteList = []
                for (let item of val) {
                    this.deleteList.push(item.teacherId)
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/Teacher/Teacher";
</style>
