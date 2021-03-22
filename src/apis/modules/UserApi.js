import http from '../http'
export default {
    userMessage: (uid) =>http.get('/user/details/' + uid)
}
