<template>
    <div class="loginPage">
        <div class="loginBox">
            <div class="logo">
                <img src="../assets/img/logo.png" alt="" >
                <div class="title mt-3">管理员登录</div>
            </div>
            <form class="inputGroup mt-5">
                <div class="">
                    <input type="text" :placeholder="adminNameMessage" autocomplete="off"
                           v-model="loginMessage.adminName"
                           :class="{inputItem:true,errInput:adminNameStatus}">
                </div>
                <div class="mt-3">
                    <input type="password" :placeholder="adminPasswordMessage" autocomplete="off"
                           v-model="loginMessage.adminPassword"
                           :class="{inputItem:true,errInput:adminPasswordStatus}">
                </div>
                <div class="mt-4">
                    <el-button type="primary" plain round class="submitBtn" @click="toLogin"> 登 录 </el-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loginMessage:{
                    adminName:'',
                    adminPassword:''
                },
                adminNameStatus:false,
                adminNameMessage:'请输入账号',
                adminPasswordStatus:false,
                adminPasswordMessage:'请输入密码'
            }
        },
        mounted() {
            this.$login.delCookie('access_token')
        },
        watch:{
            'loginMessage.adminName': {
                handler: function (val){
                    if (val){
                        this.adminNameStatus=false
                        this.adminNameMessage='请输入账号'
                    }
                }
            },
            'loginMessage.adminPassword': {
                handler: function (val){
                    if (val){
                        this.adminPasswordStatus=false
                        this.adminNameMessage='请输入密码'
                    }
                }
            },
        },
        methods:{
            toLogin(){
                if (!this.loginMessage.adminName){
                    this.$message.error('用户名不能为空')
                    this.adminNameStatus=true
                    this.adminNameMessage='用户名不能为空'
                    return
                }
                if (!this.loginMessage.adminPassword){
                    this.$message.error('密码不能为空')
                    this.adminPasswordStatus=true
                    this.adminNameMessage='密码不能为空'
                    return
                }
                this.$store.dispatch('adminLogin',{
                    loginName:this.loginMessage.adminName,
                    password:this.loginMessage.adminPassword
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/css/Login/Login";
</style>
