<template>
    <div>
        <comment :artid="id"></comment>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,   //携带的商品id
        }
    }
}
</script>