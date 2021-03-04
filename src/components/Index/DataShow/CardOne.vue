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
                            data: [
                                {value:20,name:'课程一的名字'},
                                {value:40,name:'课程二的名字'},
                                {value:55,name:'课程三的名字'},
                                {value:60,name:'课程四的名字'},
                                {value:90,name:'课程五的名字'},
                                {value:150,name:'课程六的名字'},
                                {value:178,name:'课程七的名字'},
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
