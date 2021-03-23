import http from "../http";

export default {
    getCurList: curMessage => http.get('/course/query/', curMessage), //获取课程列表
    editCur: curMessage => http.post('/course/alter/', curMessage),  //修改课程
    addNewCur: curMessage => http.post('/course/add/', curMessage),  //添加课程
    addNewCurCover: (curId, avatar) => http.imgPost('/course/cover/upload/' + curId, avatar),  //添加课程封面
    delCurriculum: curId => http.post('/course/delete/', curId),   //删除课程
    getCurriculumVideo: curId => http.get('/video/query/', curId),     //获取视频
    addCurriculumVideo: videoMessage => http.post('/video/add/', videoMessage),     //获取视频
    delCurriculumVideo: videoId => http.post('/video/delete/', videoId)     //删除视频
}
