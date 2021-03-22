import UserApi from "../../apis/modules/UserApi";
import verify from "../../assets/js/verify"
import {Message} from "element-ui"
import login from "../../assets/js/login";

export default {
    state: {
        adminMessage: null
    },
    mutations: {
        putMessage(state, payload) {
            state.adminMessage = payload
        }
    },
    actions: {
        getUserMessage(context) {
            UserApi.userMessage(login.getAdminId())
                .then(res => {
                    if (!verify.resultCode(res, 1140)) return
                    context.commit('putMessage', res.data.userDetails)
                }).catch(err => {
                    Message.error('获取用户信息失败')
                    console.log(err)
            })
        }
    },
    getters: {},
}
