<template>
    <div class="itemCard loading">
    </div>
</template>

<script>
    import { Loading } from 'element-ui';
    export default {
        name: "DataLoading",
        mounted() {
            const loadingInstance=Loading.service({
                text:"加载中请稍候",
                target:document.querySelector('.loading')
            })
        }
    }
</script>

<style scoped>

</style>
