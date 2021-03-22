import http from "../http";
export default {
    AdminLogin: (adminMessage,encryptKey) =>　http.passwordPost('/user/login',adminMessage,encryptKey)
}
