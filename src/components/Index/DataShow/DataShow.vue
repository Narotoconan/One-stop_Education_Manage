<template>
    <div class="dataShow">
        <div class="row" v-if="$store.state.Statistic.statisticData">
            <div class="col w-50">
                <card-one></card-one>
            </div>
            <div class="col w-50">
                <card-two></card-two>
            </div>
            <div class="w-100"></div>
            <div class="col w-50">
                <card-three></card-three>
            </div>
            <div class="col w-50">
                <card-four></card-four>
            </div>
        </div>
        <div class="col w-100 h-100" v-else>
            <data-loading></data-loading>
        </div>
    </div>
</template>

<script>
    import CardOne from "./CardOne";
    import CardTwo from "./CardTwo";
    import CardThree from "./CardThree";
    import CardFour from "./CardFour";
    import DataLoading from "./DataLoading";

    export default {
        name: "DataShow",
        components: {
            DataLoading,
            CardOne,
            CardTwo,
            CardThree,
            CardFour
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped>

</style>
