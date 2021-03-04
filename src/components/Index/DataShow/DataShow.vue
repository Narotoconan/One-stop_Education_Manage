<template>
    <div class="dataShow">
        <div class="row">
            <div class="col w-50">
                <card-one></card-one>
            </div>
            <div class="col w-50">
                <card-two></card-two>
            </div>
            <div class="w-100"></div>
            <div class="col">
                <card-three></card-three>
            </div>
        </div>

    </div>
</template>

<script>
    import CardOne from "./CardOne";
    import CardTwo from "./CardTwo";
    import CardThree from "./CardThree";
    import CardFour from "./CardFour";

    export default {
        name: "DataShow",
        components:{
            CardOne,
            CardTwo,
            CardThree,
            CardFour
        },
        mounted() {

        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
