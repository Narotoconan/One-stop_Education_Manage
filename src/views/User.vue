<template>
    <div class="userPage">
        <div class="itemCard">
            <h4 class="pt-3">用户管理</h4>
            <div class="mt-4 pb-4 operation">
                <div>
                    <span class="mr-3">搜索用户ID</span>
                    <div class="d-inline-block">
                        <el-input v-model="searchUserId" placeholder="用户ID"  @keypress.enter.native="searchUser"></el-input>
                    </div>
                </div>
                <div class="float-right">
                    <el-button type="danger" plain round class="ml-3" @click="delUsers">批量删除</el-button>
                    <el-button type="info"  plain class="ml-3" icon="el-icon-refresh-right" circle @click="getUser(page)"></el-button>
                </div>
            </div>
        </div>
        <div class="itemCard mt-4 pt-4 pb-4">
            <el-table
                    :data="userList"
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
                        prop="userId"
                        label="用户ID"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="userAvatar"
                        label="用户头像"
                        align="center"
                        width="160">
                    <template slot-scope="scope">
                        <img :src="$store.state.targetURL + scope.row.userAvatar"
                             style="width: 78px;height: 78px;border-radius: 50%"
                             alt="userAvatar">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="用户名"
                        show-overflow-tooltip
                        align="center"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="userGender"
                        label="性别"
                        align="center"
                        width="160">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userGender === 1">男</span>
                        <span v-else>女</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="userEmail"
                        label="用户邮箱"
                        show-overflow-tooltip
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="userRegTime"
                        label="注册时间"
                        show-overflow-tooltip
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="userTel"
                        label="电话号码"
                        show-overflow-tooltip
                        align="center">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle plain @click="delUser(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-4" style="text-align: center" v-if="total">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="getUser"
                        :page-size="size"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "User",
        computed:{
            ...mapState({
                userList:state => state.UserManage.userList,
                total:state => state.UserManage.total,
            })
        },
        data(){
          return{
              searchUserId:'',
              deleteList:[],
              size:6,
              page:1
          }
        },
        created() {
            this.getUser(1)
        },
        methods:{
            getUser(page){
                this.page = page
                this.$store.dispatch('getUserList',{
                    c:page,
                    s:this.size
                })
            },
            selectionChange(val){   //获取删除列表
                this.deleteList = []
                for (let item of val) {
                    this.deleteList.push(item.userId)
                }
            },
            searchUser(){
                if (!this.searchUserId){
                    this.getUser(1)
                }else {
                    this.$store.dispatch('searchUserMessage',Number(this.searchUserId))
                }
            },
            delUser(row){
                this.$confirm('是否确认删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    lockScroll:false,
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delUserAccount',[row.userId])
                }).catch(() => {
                    this.$message.info('已取消删除')
                });
            },
            delUsers(){
                this.$confirm('是否确认删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    lockScroll:false,
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delUserAccount',this.deleteList)
                }).catch(() => {
                    this.$message.info('已取消删除')
                });
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/css/User/User";
</style>
