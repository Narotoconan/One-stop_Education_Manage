<template>
    <div class="itemCard">
        <div id="cardOne" class="h-100"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    import {mapState} from 'vuex'
    export default {
        name: "CardOne",
        computed:{
          ...mapState({
              courseTop:state => state.Statistic.statisticData.courseTop
          })
        },
        mounted() {
            this.chartOne()
        },
        methods: {
            chartOne() {
                let chartOne = echarts.init(document.getElementById('cardOne'));
                chartOne.setOption({
                    title: {
                        text: '课程收藏排行',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.courseTop.title,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#7c8893',
                                fontSize: 16
                            },
                            interval: 0,
                            formatter: function(value) {
                                return (value.length > 8 ? (value.slice(0,8)+"...") : value )
                            }

                        },
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    color: '#fc5185',
                    series: [
                        {
                            name: '课程信息',
                            type: 'bar',
                            barWidth: '30%',
                            data: [
                                {value: this.courseTop.counts[0], name: this.courseTop.title[0]},
                                {value: this.courseTop.counts[1], name: this.courseTop.title[1]},
                                {value: this.courseTop.counts[2], name: this.courseTop.title[2]},
                                {value: this.courseTop.counts[3], name: this.courseTop.title[3]},
                                {value: this.courseTop.counts[4], name: this.courseTop.title[4]},
                                {value: this.courseTop.counts[5], name: this.courseTop.title[5]},
                                {value: this.courseTop.counts[6], name: this.courseTop.title[6]},
                            ]
                        }
                    ]
                })
            }
        }
    }
</script>

<style scoped>

</style>
