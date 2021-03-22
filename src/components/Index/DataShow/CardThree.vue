<template>
    <div class="itemCard">
        <div id="cardThree" class="h-100"></div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import {mapState} from "vuex";

    export default {
        name: "CardThree",
        mounted() {
            this.chartThree()
        },
        computed: {
            ...mapState({
                userIncrease: state => state.Statistic.statisticData.userIncrease
            })
        },
        methods: {
            chartThree() {
                let chartThree = echarts.init(document.getElementById('cardThree'));
                chartThree.setOption({
                    title: {
                        text: '用户增长',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            snap: true
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.userIncrease.dateList,
                        boundaryGap: false,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color:'#31cfb6',
                    series: [
                        {
                            name: '用户数量',
                            data: this.userIncrease.countsList,
                            type: 'line',
                            smooth: true,
                            areaStyle: {

                            }
                        }
                    ],
                })
            }
        }
    }
</script>

<style scoped>

</style>
