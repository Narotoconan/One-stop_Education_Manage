<template>
    <div class="itemCard">
        <div id="cardTwo" class="h-100"></div>
    </div>
</template>

<script>
    import * as echarts from "echarts";

    export default {
        name: "CardTwo",
        mounted() {
            this.chartTwo()
        },
        methods:{
            chartTwo(){
                let chartTwo = echarts.init(document.getElementById('cardTwo'));
                chartTwo.setOption({
                    title: {
                        text: '课程数量',
                        left:'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: '5%',
                        left: 'left'
                    },
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

                            data: [
                                {value: 1048, name: '数学课程'},
                                {value: 735, name: '英语课程'},
                                {value: 580, name: '代码编程'},

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
