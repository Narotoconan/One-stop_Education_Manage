import CurriculumApi from "../../apis/modules/CurriculumApi";
import verify from "../../assets/js/verify";

export default {
    state: {
        curriculumList: null,
        curVideoList: null,
        total: null,
        newCurId: null,
        isChangeSuccess: false,
        isNewCur: false,
        isDelCur: false,
        isNewVideo: false,
        isDelVideo: false
    },
    mutations: {
        putList(state, payload) {
            state.curriculumList = payload.courses
            state.total = payload.total
        },
        putVideo(state, payload) {
            state.curVideoList = payload
        },
        putCurState(state, payload) {
            state[payload.statusName] = payload.status
        },
        putNewCurId(state, payload) {
            state.newCurId = payload
        }
    },
    actions: {
        getCurriculumList(context, payload) {
            CurriculumApi.getCurList(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1210)) return
                    context.commit('putList', res.data)
                }).catch(err => {
                verify.showErr('获取课程列表')
                console.log(err)
            })
        },
        changeCurriculum(context, payload) {
            CurriculumApi.editCur(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1250)) return
                    context.commit('putCurState', {
                        statusName: 'isChangeSuccess',
                        status: true
                    })
                    verify.showSuccess('修改课程')
                }).catch(err => {
                verify.showErr('修改课程')
                console.log(err)
            })
        },
        creatCurriculum(context, payload) {
            CurriculumApi.addNewCur(payload.message)
                .then(res => {
                    if (!verify.resultCode(res, 1230)) return
                    context.commit('putNewCurId', res.data.course.courseId)
                    context.dispatch('addCurCover', payload.coverBlob)
                }).catch(err => {
                verify.showErr('添加课程信息')
                console.log(err)
            })
        },
        addCurCover(context, payload) {
            let formData = new FormData()
            formData.append('courseCover', payload)
            CurriculumApi.addNewCurCover(
                context.state.newCurId,
                formData
            ).then(res => {
                if (!verify.resultCode(res, 1260)) return
                context.commit('putCurState', {
                    statusName: 'isNewCur',
                    status: true
                })
                verify.showSuccess('添加课程')
            }).catch(err => {
                verify.showErr('添加课程封面')
                console.log(err)
            })
        },
        delCur(context, payload) {
            CurriculumApi.delCurriculum(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1240)) return
                    context.commit('putCurState', {
                        statusName: 'isDelCur',
                        status: true
                    })
                    verify.showSuccess('删除课程')
                }).catch(err => {
                verify.showErr('删除课程')
                console.log(err)
            })
        },
        getCurVideo(context, payload) {
            context.commit('putVideo',[])
            CurriculumApi.getCurriculumVideo(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1510)) return
                    context.commit('putVideo', res.data.videos)
                }).catch(err => {
                verify.showErr('获取课程视频')
                console.log(err)
            })
        },
        addCurVideo(context, payload) {
            CurriculumApi.addCurriculumVideo(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1500)) return
                    context.commit('putCurState', {
                        statusName: 'isNewVideo',
                        status: true
                    })
                    verify.showSuccess('添加视频')
                }).catch(err => {
                verify.showErr('添加视频')
                console.log(err)
            })
        },
        delCurVideo(context, payload) {
            CurriculumApi.delCurriculumVideo(payload)
                .then(res => {
                    if (!verify.resultCode(res, 1530)) return
                    context.commit('putCurState', {
                        statusName: 'isDelVideo',
                        status: true
                    })
                    verify.showSuccess('删除视频')
                }).catch(err => {
                verify.showErr('删除视频')
                console.log(err)
            })

        }
    },
    getters: {},
}
