<template>
    <div class="curriculumPage">
        <div class="itemCard">
            <h4 class="pt-3">课程管理</h4>
            <div class="mt-4 pb-4 operation">
                <div>
                    <span class="mr-3">搜索课程</span>
                    <div class="d-inline-block">
                        <el-input v-model="curriculumTitle" placeholder="课程名称"
                                  @keypress.enter.native="getCurriculum(1)"></el-input>
                    </div>
                </div>
                <div>
                    <span class="mr-3">课程类型</span>
                    <el-select v-model="category" placeholder="请选择课程类型" @change="getCurriculum(1)">
                        <el-option label="全部课程" value=""></el-option>
                        <el-option label="数学课程" value="math"></el-option>
                        <el-option label="英语课程" value="english"></el-option>
                        <el-option label="编程课程" value="program"></el-option>
                    </el-select>
                </div>
                <div class="float-right">
                    <el-button type="success" plain round @click="dialogAddCur =true">添加课程</el-button>
                    <el-button type="danger" plain round class="ml-3" @click="deleteCurs">批量删除</el-button>
                    <el-button type="info" plain class="ml-3" icon="el-icon-refresh-right" circle
                               @click="getCurriculum(page)"></el-button>
                </div>
            </div>
        </div>
        <div class="itemCard mt-4 pt-4 pb-4">
            <el-table
                    :data="curriculumList"
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
                        prop="courseId"
                        label="课程ID"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="img"
                        label="课程封面"
                        align="center"
                        width="160">
                    <template slot-scope="scope">
                        <img :src="$store.state.targetURL + scope.row.img"
                             style="width: 100%;border-radius: 10px;"
                             alt="cover">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="课程名称"
                        show-overflow-tooltip
                        align="center"
                        width="480">
                </el-table-column>
                <el-table-column
                        prop="categoryParent"
                        label="课程类型"
                        align="center"
                        width="220">
                    <template slot-scope="scope">
                        <el-tag type="success">{{ scope.row.categoryParent }}</el-tag>
                        <el-tag type="warning" class="ml-3">{{ scope.row.categoryChildren }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="teacherName"
                        label="任课老师"
                        show-overflow-tooltip
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="startTime"
                        label="创建时间"
                        show-overflow-tooltip
                        align="center">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作"
                        width="220">
                    <template slot-scope="scope">
                        <el-button type="info" icon="el-icon-edit" circle plain @click="edit(scope.row)"></el-button>
                        <el-button type="success" icon="el-icon-video-camera" circle plain
                                   @click="getVideos(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle plain
                                   @click="deleteCur(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-4" style="text-align: center" v-if="total">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="getCurriculum"
                        :page-size="size"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="修改课程信息"
                :visible.sync="dialogEdit"
                :lock-scroll="false"
                :close-on-click-modal="false"
                width="700px">
            <el-form :model="editCurMessage">
                <el-form-item label="课程ID" :label-width="formLabelWidth">
                    <el-input :value="editCurMessage.courseId" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="课程封面" :label-width="formLabelWidth">
                    <img :src="$store.state.targetURL + img" alt="cover" style="height: 100px;border-radius: 10px">
                </el-form-item>
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="editCurMessage.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程介绍" :label-width="formLabelWidth">
                    <el-input v-model="editCurMessage.description" type="textarea" autocomplete="off"
                              autosize></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEdit = false">取 消</el-button>
            <el-button type="primary" @click="toChangeMessage">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="添加课程"
                :visible.sync="dialogAddCur"
                :lock-scroll="false"
                :close-on-click-modal="false"
                width="700px">
            <el-form :model="addCur.message">
                <el-form-item label="课程封面" :label-width="formLabelWidth">
                    <up-img @imgBlob="getBlob" ref="avatarBlob" :theWidth="216" :theHeight="120"></up-img>
                </el-form-item>
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="addCur.message.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" :label-width="formLabelWidth">
                    <el-cascader
                            v-model="curType"
                            clearable
                            @change="getTeacher(curType[0])"
                            :props="{ expandTrigger: 'hover' }"
                            :options="options">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="课程老师" :label-width="formLabelWidth">
                    <el-select v-model="addCur.message.teacherId" placeholder="请选择老师">
                        <el-option v-for="item in teachers" :value="item.teacherId" :label="item.teacherName">
                            <img :src="$store.state.targetURL+item.teacherAvatar"
                                 alt=""
                                 style="border-radius: 50%;height: 25px;width: 25px">
                            <span class="ml-2">{{ item.teacherName }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程介绍" :label-width="formLabelWidth">
                    <el-input v-model="addCur.message.description" type="textarea" autocomplete="off"
                              autosize></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddCur = false">取 消</el-button>
            <el-button type="primary" @click="addCurriculum">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="课程视频" :visible.sync="dialogVideoList">
            <div style="text-align: center;margin: 2rem 0">
                <el-button type="success" icon="el-icon-upload" @click="dialogVideoAdd= true">上传视频</el-button>
            </div>
            <el-table :data="curVideoList">
                <el-table-column property="lesson" align="center" label="课程顺序">
                    <template slot-scope="scope">
                        {{ 'Lesson'+scope.row.lesson }}
                    </template>
                </el-table-column>
                <el-table-column property="vid" align="center" label="视频ID"></el-table-column>
                <el-table-column property="title" align="center" show-overflow-tooltip label="视频名称"></el-table-column>
                <el-table-column property="bv" align="center" label="B站视频">
                    <template slot-scope="scope">
                        {{ scope.row.bv+'---'+scope.row.page }}
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" round @click="delVideo(scope.row)">删除视频</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="添加视频" :visible.sync="dialogVideoAdd" width="500px" style="text-align: center">
            <el-form :model="videoMg" style="width: 90%;margin-top: 2rem">
                <el-form-item label="视频标题" :label-width="formLabelWidth">
                    <el-input v-model="videoMg.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="BV号" :label-width="formLabelWidth">
                    <el-input v-model="videoMg.bv" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分P" :label-width="formLabelWidth">
                    <el-input v-model="videoMg.page" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程内容" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="videoMg.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVideoVisible = false">取 消</el-button>
                <el-button type="primary" @click="addVideo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import upImg from "../components/Common/upImg";

    export default {
        name: "Curriculum",
        components: {
            upImg
        },
        data() {
            return {
                formLabelWidth: "120px",
                /*对话框*/
                dialogEdit: false,
                dialogAddCur: false,
                dialogVideoList: false,
                dialogVideoAdd: false,
                /*对话框*/
                curriculumTitle: '',
                category: '',
                /*编辑课程*/
                editCurMessage: {
                    courseId: '',
                    title: '',
                    description: '',
                },
                img: '',
                /*编辑课程*/
                /*添加课程*/
                curType: ['00', '0'],
                options: [
                    {
                        value: 10,
                        label: '数学课程',
                        children: [
                            {
                                value: 11,
                                label: '高考数学',
                            },
                            {
                                value: 12,
                                label: '高等数学',

                            },
                            {
                                value: 13,
                                label: '线性代数',
                            },
                            {
                                value: 14,
                                label: '概率论'
                            },
                        ]
                    },
                    {
                        value: 20,
                        label: '英语课程',
                        children: [
                            {
                                label: '高考英语',
                                value: 21
                            },
                            {
                                label: '考研英语',
                                value: 22
                            },
                            {
                                label: '英语四级',
                                value: 23
                            },
                            {
                                label: '英语六级',
                                value: 24
                            },
                        ]
                    },
                    {
                        value: 30,
                        label: '代码编程',
                        children: [
                            {
                                label: 'Java',
                                value: 31
                            },
                            {
                                label: 'C语言',
                                value: 32
                            },
                            {
                                label: 'Python',
                                value: 33
                            },
                            {
                                label: 'HTML前端',
                                value: 34
                            },
                        ]
                    },
                ],
                teachers: [],
                addCur: {
                    message: {
                        title: '',
                        categoryParent: '',
                        categoryChildren: '',
                        description: '',
                        teacherId: ''
                    },
                    coverBlob: null,
                },
                /*添加课程*/

                /*添加视频*/
                videoMg: {
                    courseId: '',
                    title: '',
                    bv: '',
                    content: '',
                    page: '1'
                },
                /*添加视频*/

                deleteList: [],
                page: 1,
                size: 6
            }
        },
        computed: {
            ...mapState({
                curriculumList: state => state.CurriculumManage.curriculumList,
                curVideoList: state => state.CurriculumManage.curVideoList,
                total: state => state.CurriculumManage.total,
                teacherList: state => state.TeacherManage.teacherList,
                /*状态判断*/
                isChangeSuccess: state => state.CurriculumManage.isChangeSuccess,
                isNewCur: state => state.CurriculumManage.isNewCur,
                isDelCur: state => state.CurriculumManage.isDelCur,
                isDelVideo: state => state.CurriculumManage.isDelVideo,
                isNewVideo: state => state.CurriculumManage.isNewVideo,
            })
        },
        created() {
            this.getCurriculum(1)
        },
        watch: {
            'isChangeSuccess': {
                handler: function (val) {
                    if (val) {
                        this.dialogEdit = false
                        this.editCurMessage = this.$options.data().editCurMessage
                        this.img = ''
                        this.$store.commit('putCurState', {
                            statusName: 'isChangeSuccess',
                            status: false
                        })
                        this.getCurriculum(this.page)
                    }
                }
            },
            'isNewCur': {
                handler: function (val) {
                    if (val) {
                        this.dialogAddCur = false
                        this.addCur = this.$options.data().addCur
                        this.$store.commit('putCurState', {
                            statusName: 'isNewCur',
                            status: false
                        })
                        this.getCurriculum(this.page)
                    }
                }
            },
            'isDelCur': {
                handler: function (val) {
                    if (val) {
                        this.$store.commit('putCurState', {
                            statusName: 'isDelCur',
                            status: false
                        })
                        this.getCurriculum(this.page)
                    }
                }
            },
            'isDelVideo': {
                handler: function (val) {
                    if (val) {
                        this.$store.commit('putCurState', {
                            statusName: 'isDelVideo',
                            status: false
                        })
                        this.getVideos(this.videoMg)
                    }
                }
            },
            'isNewVideo': {
                handler: function (val) {
                    if (val) {
                        this.dialogVideoAdd = false
                        this.$store.commit('putCurState', {
                            statusName: 'isNewVideo',
                            status: false
                        })
                        this.getVideos(this.videoMg)
                    }
                }
            },
            'teacherList': {
                handler: function (val) {
                    this.teachers = val
                }
            },
            curType: function (newData) {
                this.addCur.message.categoryParent = newData[0];
                this.addCur.message.categoryChildren = newData[1]
            }
        },
        methods: {
            getCurriculum(page) {
                this.page = page
                this.$store.dispatch('getCurriculumList', {
                    c: page,
                    size: this.size,
                    title: this.curriculumTitle,
                    par: this.category
                })
            },
            edit(row) {  //打开编辑课程
                this.dialogEdit = true
                this.editCurMessage.description = row.description
                this.editCurMessage.title = row.title
                this.editCurMessage.courseId = String(row.courseId)
                this.img = row.img
            },
            toChangeMessage() {  //编辑课程信息
                for (let key of Object.values(this.editCurMessage)) {
                    if (!key) {
                        this.$message.warning('相关信息不能为空')
                        return
                    }
                }
                this.$store.dispatch('changeCurriculum', this.editCurMessage)
            },
            deleteCur(row) {
                this.$confirm('是否确认删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    lockScroll: false,
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delCur', [row.courseId])
                }).catch(() => {
                    this.$message.info('已取消删除')
                });
            },
            deleteCurs() {
                if (!this.deleteList.length) {
                    this.$message.warning('请选择删除课程')
                    return
                }
                this.$confirm('是否确认删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    lockScroll: false,
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delCur', this.deleteList)
                }).catch(() => {
                    this.$message.info('已取消删除')
                });
            },
            selectionChange(val) {   //获取删除列表
                this.deleteList = []
                for (let item of val) {
                    this.deleteList.push(item.courseId)
                }
            },
            getTeacher(categoryId) {
                if (!categoryId) return
                this.teachers = []
                this.addCur.teacherId = ''
                this.$store.dispatch('getTeacherList', {
                    categoryId
                })
            },
            getBlob(theBlog) {
                this.addCur.coverBlob = theBlog
            },
            addCurriculum() {
                for (let key of Object.values(this.addCur.message)) {
                    if (!key) {
                        this.$message.warning('相关信息不能为空')
                        return
                    }
                }
                this.$store.dispatch('creatCurriculum', this.addCur)
            },
            getVideos(row) {
                this.dialogVideoList = true
                this.videoMg.courseId = row.courseId
                this.$store.dispatch('getCurVideo', {
                    courseId: row.courseId,
                    asc: false
                })
            },
            addVideo() {
                for (let key of Object.values(this.videoMg)) {
                    if (!key) {
                        this.$message.warning('相关信息不能为空')
                        return
                    }
                }
                this.$store.dispatch('addCurVideo', this.videoMg)
            },
            delVideo(row) {
                this.$store.dispatch('delCurVideo', [row.vid])
            }
        }
    }
</script>

<style scoped lang="less">
    .operation {
        > div {
            display: inline-block;
            margin-right: 3rem;
        }
    }
</style>
