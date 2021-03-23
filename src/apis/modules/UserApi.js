import http from '../http'

export default {
    userMessage: uid => http.get('/user/details/' + uid), //获取用户信息
    userList: userMessage => http.get('/user/details/query',userMessage), // 获取用户列表
    delUsers: userId => http.post('/user/del',userId) //删除用户信息

}
