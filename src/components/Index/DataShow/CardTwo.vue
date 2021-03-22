<template>
    <div class="itemCard">
        <div id="cardTwo" class="h-100"></div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import {mapState} from "vuex";

    export default {
        name: "CardTwo",
        computed: {
            ...mapState({
                courseCategory: state => state.Statistic.statisticData.courseCategory
            })
        },
        mounted() {
            this.chartTwo()
        },
        methods: {
            chartTwo() {
                let chartTwo = echarts.init(document.getElementById('cardTwo'));
                chartTwo.setOption({
                    title: {
                        text: '课程数量',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: '5%',
                        left: 'left'
                    },
                    color: [
                        '#5884de',
                        '#17cc8c',
                        '#fad95f'
                    ],
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },

                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },

                            data: this.courseCategory
                        }
                    ]
                })
            }
        }
    }
</script>

<style scoped>

</style>
