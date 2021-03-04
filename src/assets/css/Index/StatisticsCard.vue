<template>
    <div class="statisticsCard">
        <div class="cardName">
            <span>{{ title }}</span>
            <div class="float-right">
                <slot name="icon"></slot>
            </div>
            <slot name="count"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StatisticsCard",
        props:{
            title:String
        }
    }
</script>

<style scoped>

</style>
