import TeacherApi from "../../apis/modules/TeacherApi"
import verify from "../../assets/js/verify";

export default {
    state: {
        teacherList: null,
        total: 0,
        newUserId:null,
        isNewTeacher:false,
        isChangeTeacher:false
    },
    mutations: {
        putTeacherList(state, payload) {
            state.teacherList = payload.teachers
            state.total = payload.total
        },
        putNewUserId(state, payload){
            state.newUserId = payload
        },
        putState(state, payload){
            state[payload.statusName] = payload.status
        },
        localDelTeachers(state, payload) {
            for (let i = 0; i < payload.length; i++) {
                state.teacherList.splice(state.teacherList.findIndex(e => e.teacherId === payload[i]), 1)
            }
        }
    },
    actions: {
        getTeacherList(context, payload) {
            TeacherApi.getTeacher(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1410)) return
                    context.commit('putTeacherList', res.data)
                }).catch(err => {
                verify.showErr('获取教师')
                console.log(err)
            })
        },
        delTeachers(context, payload) {
            TeacherApi.delTeacher(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1440)) return
                    verify.showSuccess('删除教师')
                    context.commit('localDelTeachers', payload)
                }).catch(err => {
                verify.showErr('删除教师')
                console.log(err)
            })
        },
        changeTeacher(context, payload){
            TeacherApi.editTeacher(payload)
                .then(res => {
                    if (!verify.resultCode(res,1430)) return
                    verify.showSuccess('修改教师信息')
                    context.commit('putState',{
                        statusName:'isChangeTeacher',
                        status:true
                    })
                }).catch(err => {
                    verify.showErr('修改教师信息')
                    console.log(err)
            })
        },
        newTeacher(context, payload){
            TeacherApi.addNewTeacher(payload.message)
                .then(res => {
                    if (!verify.resultCode(res,1400)) return
                    context.commit('putNewUserId',res.data.teacherId)
                    context.dispatch('newAvatar',payload.blobImg)
                }).catch(err => {
                    verify.showErr('添加教师信息')
                    console.log(err)
            })
        },
        newAvatar(context, payload){
            let formData = new FormData()
            formData.append('teacherAvatar', payload)
            TeacherApi.addNewTeacherAvatar(
                context.state.newUserId,
                formData
            ).then(res => {
                if (!verify.resultCode(res,1420)) return
                context.commit('putState',{
                    statusName:'isNewTeacher',
                    status:true
                })
                verify.showSuccess('添加教师')
            }).catch(err => {
                verify.showErr('添加头像信息')
                console.log(err)
            })
        }
    },
    getters: {},
}
