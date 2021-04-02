<template>
    <div class="home">
        <div class="asideMain pt-3">
            <div class="aside position-relative">
                <div class="logo">
                    <img src="../assets/img/logo.png" alt="logo"/>
                </div>
                <div class="mt-5 mb-3" style="text-align: center">
                    <div class="d-inline-block" v-if="$store.state.UserManage.adminMessage">
                        <el-avatar class="adminAv"
                                   :src="$store.state.targetURL + $store.state.UserManage.adminMessage.userAvatar">
                        </el-avatar>
                        <div>
                            <span class="adminName">{{ $store.state.UserManage.adminMessage.username }}</span>
                        </div>
                    </div>
                </div>
                <ul class="navList pl-0 mt-4">
                    <li @click="toRoute('/index')">
                        <list-aside path="/index">
                            <i class="bi bi-joystick" slot="icon"></i>
                            <span slot="name">首页管理</span>
                        </list-aside>
                    </li>
                    <li @click="toRoute('/teacher')">
                        <list-aside path="/teacher">
                            <i class="bi bi-diagram-3-fill" slot="icon"></i>
                            <span slot="name">教师管理</span>
                        </list-aside>
                    </li>
                    <li @click="toRoute('/user')">
                        <list-aside path="/user">
                            <i class="bi bi-person-lines-fill" slot="icon"></i>
                            <span slot="name">用户管理</span>
                        </list-aside>
                    </li>
                    <li @click="toRoute('/curriculum')">
                        <list-aside path="/curriculum">
                            <i class="bi bi-stack" slot="icon"></i>
                            <span slot="name">课程管理</span>
                        </list-aside>
                    </li>
                    <li @click="toRoute('/login')">
                        <list-aside>
                            <i class="bi bi-x-diamond-fill" slot="icon"></i>
                            <span slot="name">退出登录</span>
                        </list-aside>
                    </li>
                </ul>
                <div class="beian">
                    <a href="https://beian.miit.gov.cn/" target="_blank" class="text-black-50">陕ICP备2021004077号-1</a>
                </div>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import ListAside from "../components/Home/ListAside";
    export default {
        name: "Home",
        components:{
            ListAside
        },
        created() {
            this.$store.dispatch('getUserMessage')
        },
        mounted() {
            this.homeWidth()
            window.onresize = () => {
                return (() => {
                    this.homeWidth()
                })()
            }
        },
        methods:{
            toRoute(path){
                this.$router.push(path)
            },
            homeWidth(){
                $(".main").css({
                    "width": $(window).width() - 228 + "px"
                })
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/Home/Home";
</style>
