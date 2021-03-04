<template>
    <div class="itemCard">
        <div id="cardOne" class="h-100"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "CardOne",
        mounted() {
            this.chartOne()
        },
        methods:{
            chartOne(){
                let chartOne = echarts.init(document.getElementById('cardOne'));
                chartOne.setOption({
                    title: {
                        text: '课程收藏排行',
                        left:'center'
                    },
                    tooltip: {
                        trigger: 'axis',
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
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '40%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                })
            }
        }
    }
</script>

<style scoped>

</style>
