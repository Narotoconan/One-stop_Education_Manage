import http from '../http'
export default {
    getTeacher: teacherMessage => http.get('/teacher/',teacherMessage), //获取老师列表
    delTeacher: teacherMessage => http.post('/teacher/del',teacherMessage), //删除教师
    editTeacher: teacherMessage => http.post('/teacher/alter',teacherMessage), //修改教师
    addNewTeacher: teacherMessage => http.post('/teacher/',teacherMessage), //添加教师
    addNewTeacherAvatar: (teacherId,avatar) => http.imgPost('/teacher/avatar/upload/'+teacherId,avatar), //添加教师头像
}
