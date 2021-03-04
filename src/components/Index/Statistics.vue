<template>
    <div class="statistics">
        <div class="row">
            <div class="col">
                <StatisticsCard title="总播放量">
                    <i class="bi bi-play-btn-fill" :style="'color: '+color[0]" slot="icon"></i>
                    <div id="playCount" class="count mt-3"  slot="count">
                        2000
                    </div>
                </StatisticsCard>
            </div>
            <div class="col">
                <StatisticsCard title="用户数量">
                    <i class="bi bi-people-fill" :style="'color: '+color[1]" slot="icon"></i>
                    <div id="userCount" class="count mt-3"  slot="count">
                        124652
                    </div>
                </StatisticsCard>
            </div>
            <div class="col">
                <StatisticsCard title="课程数目">
                    <i class="bi bi-kanban" :style="'color: '+color[2]" slot="icon"></i>
                    <div id="curCount" class="count mt-3"  slot="count">
                        874251
                    </div>
                </StatisticsCard>
            </div>
            <div class="col">
                <StatisticsCard title="总收藏量">
                    <i class="bi bi-bookmark-star-fill" :style="'color: '+color[3]" slot="icon"></i>
                    <div id="favoritesCount" class="count mt-3"  slot="count">
                        4125
                    </div>
                </StatisticsCard>
            </div>
        </div>
    </div>
</template>

<script>
    import StatisticsCard from "../../assets/css/Index/StatisticsCard";
    import { CountUp } from 'countup.js'
    export default {
        name: "Statistics",
        components:{
            StatisticsCard
        },
        data(){
            return {
                color:[
                    '#46c3db',
                    '#21e6c1',
                    '#f3558e',
                    '#3d5af1'
                ]
            }
        },
        mounted() {
            this.countUp()
        },
        methods:{
          countUp(){
              let playCount = new CountUp('playCount', 2000)
              let userCount = new CountUp('userCount', 124652)
              let curCount = new CountUp('curCount', 874251)
              let favoritesCount = new CountUp('favoritesCount', 4125)
              playCount.start()
              userCount.start()
              curCount.start()
              favoritesCount.start()
          }
        }
    }
</script>

<style scoped>

</style>
