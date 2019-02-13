<template>
    <div class="newsInfo-container">
        <h1>新闻详情页面--{{id}}</h1>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id
        }
    }
}
</script>

<style lang="less" scoped>

</style>


