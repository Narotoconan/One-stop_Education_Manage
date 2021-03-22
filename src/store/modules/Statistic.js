import StatisticApi from "../../apis/modules/StatisticApi";
import verify from "../../assets/js/verify";
import {Message} from "element-ui";

export default {
    state: {
        statisticData: null
    },
    mutations: {
        putStatisticData(state, payload) {
            state.statisticData = payload
        },
    },
    actions: {
        getStatisticCount(context) {
            StatisticApi.statistic()
                .then(res => {
                    if (!verify.resultCode(res, 1600)) return
                    context.commit('putStatisticData', res.data)
                }).catch(err => {
                    Message.error('获取统计信息失败')
                    console.log(err)
            })
        }
    },
    getters: {
        returnStatisticData(state){
            return state.statisticData
        }
    },
}
