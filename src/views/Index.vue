<template>
    <div class="index">
        <div class="itemCard">
            <h4>信息统计</h4>
            <statistics></statistics>
        </div>
        <data-show></data-show>
    </div>
</template>

<script>
    import Statistics from "../components/Index/Statistics";
    import DataShow from "../components/Index/DataShow/DataShow";
    export default {
        name: "Index",
        components:{
            Statistics,
            DataShow
        }
    }
</script>

<style lang="less">
    @import "../assets/css/Index/index";
</style>
