import UserApi from "../../apis/modules/UserApi";
import verify from "../../assets/js/verify"
import login from "../../assets/js/login";

export default {
    state: {
        adminMessage: null,
        userList: null,
        total: null
    },
    mutations: {
        putMessage(state, payload) {
            state.adminMessage = payload
        },
        putList(state, payload) {
            state.userList = payload.userDetails
            state.total = payload.total
        },
    },
    actions: {
        getUserMessage(context) { //获取用户信息
            UserApi.userMessage(login.getAdminId())
                .then(res => {
                    if (!verify.resultCode(res, 1140)) return
                    context.commit('putMessage', res.data.userDetails)
                }).catch(err => {
                verify.showErr('获取用户信息')
                console.log(err)
            })
        },
        getUserList(context, payload) {   //获取用户列表
            UserApi.userList(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1140)) return
                    context.commit('putList', res.data)
                }).catch(err => {
                verify.showErr('获取用户列表')
                console.log(err)
            })
        },
        searchUserMessage(context) { //获取搜索用户信息
            UserApi.userMessage(login.getAdminId())
                .then(res => {
                    if (!verify.resultCode(res, 1140)) return
                    context.commit('putList', res.data)
                }).catch(err => {
                verify.showErr('获取用户信息')
                console.log(err)
            })
        },
        delUserAccount(context, payload){
            UserApi.delUsers(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1140)) return
                    verify.showSuccess('删除用户')
                }).catch(err => {
                verify.showErr('获取用户列表')
                console.log(err)
            })
        },
    },
    getters: {},
}
