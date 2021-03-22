<template>
    <div class="itemCard">
        <div id="cardFour" class="h-100"></div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import {mapState} from "vuex";

    export default {
        name: "CardFour",
        mounted() {
            this.chartFour()
        },
        computed: {
            ...mapState({
                teacherCategory: state => state.Statistic.statisticData.teacherCategory
            })
        },
        methods: {
            chartFour() {
                let chartThree = echarts.init(document.getElementById('cardFour'));
                chartThree.setOption({
                    title: {
                        text: '课程老师',
                        left: 'center'
                    },
                    color:'#c798de',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: [
                            this.teacherCategory[0].categoryName,
                            this.teacherCategory[1].categoryName,
                            this.teacherCategory[2].categoryName,
                        ]
                    },
                    series: [
                        {
                            name: '老师数量',
                            type: 'bar',
                            data: [
                                this.teacherCategory[0].teacherCounts,
                                this.teacherCategory[1].teacherCounts,
                                this.teacherCategory[2].teacherCounts,
                            ]
                        },

                    ]
                })
            }
        }
    }
</script>


<style scoped>

</style>
