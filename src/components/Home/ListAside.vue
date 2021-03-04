<template>
    <div :class="{listAside:true,listAsideActive:isActive}">
        <slot name="icon"></slot>
        <slot name="name"></slot>
    </div>
</template>

<script>
    export default {
        name: "ListAside",
        props:{
            path:String
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1
            }
        }
    }
</script>

<style scoped>

</style>
