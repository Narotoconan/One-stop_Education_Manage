import http from '../http'
export default {
    statistic: () => http.get('/statistic/') //信息统计
}
