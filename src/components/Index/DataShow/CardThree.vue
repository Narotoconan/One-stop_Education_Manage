<template>
    <div class="itemCard">
        <div id="cardThree" class="h-100"></div>
    </div>
</template>

<script>
    import * as echarts from "echarts";

    export default {
        name: "CardThree",
        mounted() {
            this.chartThree()
        },
        methods:{
            chartThree(){
                let chartThree = echarts.init(document.getElementById('cardThree'));
                chartThree.setOption({
                    title: {
                        text: '用户增长',
                        left:'center'
                    },
                    tooltip: {
                        type: 'cross'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        boundaryGap: false,
                        axisPointer:{
                            show:true,
                            type:'line',
                            snap:true
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [82, 114, 254, 298, 410, 450, 600],
                        type: 'line',
                        smooth: true,
                        areaStyle: {}
                    }],

                })
            }
        }
    }
</script>

<style scoped>

</style>
