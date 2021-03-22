<template>
    <div class="statistics">
        <div class="row">
            <div class="col">
                <StatisticsCard title="总播放量">
                    <i class="bi bi-play-btn-fill" :style="'color: '+color[0]" slot="icon"></i>
                    <div id="playCount" class="count mt-3"  slot="count">
                        <span v-if="statisticCount">
                           {{ statisticCount.viewCounts }}
                        </span>
                        <span v-else>0</span>
                    </div>
                </StatisticsCard>
            </div>
            <div class="col">
                <StatisticsCard title="用户数量">
                    <i class="bi bi-people-fill" :style="'color: '+color[1]" slot="icon"></i>
                    <div id="userCount" class="count mt-3"  slot="count">
                        <span v-if="statisticCount">
                            {{ statisticCount.userCounts }}
                        </span>
                        <span v-else>0</span>
                    </div>
                </StatisticsCard>
            </div>
            <div class="col">
                <StatisticsCard title="课程数目">
                    <i class="bi bi-kanban" :style="'color: '+color[2]" slot="icon"></i>
                    <div id="curCount" class="count mt-3"  slot="count">
                        <span v-if="statisticCount">
                         {{ statisticCount.courseCounts }}
                        </span>
                        <span v-else>0</span>
                    </div>
                </StatisticsCard>
            </div>
            <div class="col">
                <StatisticsCard title="总收藏量">
                    <i class="bi bi-bookmark-star-fill" :style="'color: '+color[3]" slot="icon"></i>
                    <div id="favoritesCount" class="count mt-3"  slot="count">
                        <span v-if="statisticCount">
                            {{ statisticCount.favoriteCounts }}
                        </span>
                        <span v-else>0</span>
                    </div>
                </StatisticsCard>
            </div>
        </div>
    </div>
</template>

<script>
    import StatisticsCard from "../../assets/css/Index/StatisticsCard";
    import { CountUp } from 'countup.js'
    import {mapState} from 'vuex'
    export default {
        name: "Statistics",
        components:{
            StatisticsCard
        },
        data(){
            return {
                color:[
                    'rgb(66, 153, 244)',
                    'rgb(234, 67, 53)',
                    'rgb(251, 188, 5)',
                    'rgb(52, 168, 83)',
                ],
            }
        },
        computed:{
            ...mapState({
                statisticCount:state => state.Statistic.statisticData
            })
        },
        mounted() {

        },
        watch:{
            'statisticCount': {
                handler: function (val){
                    this.countUp()
                }
            },
        },
        methods:{
            countUp(){
                if (!this.statisticCount) return
                let viewCounts = new CountUp('playCount', this.statisticCount.viewCounts)
                let userCounts = new CountUp('userCount', this.statisticCount.userCounts)
                let courseCounts = new CountUp('curCount', this.statisticCount.courseCounts)
                let favoriteCounts = new CountUp('favoritesCount', this.statisticCount.favoriteCounts)
                viewCounts.start()
                userCounts.start()
                courseCounts.start()
                favoriteCounts.start()
            },
        }
    }
</script>

<style scoped>

</style>
