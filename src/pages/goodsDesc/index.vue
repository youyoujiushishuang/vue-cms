<template>
    <div class="goodsDesc-container">
        <h1>{{goodsDesc.title}}</h1>
        <hr>
        <div class="content" v-html="goodsDesc.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,   //携带的商品id
            goodsDesc:{}    //商品描述信息
        }
    },
    created(){
        this.getGoodsDesc()
    },
    methods:{
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+this.id)
            .then(result=>{
                if(result.body.status === 0){
                    console.log(result.body.message);
                    this.goodsDesc = result.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="less">
.goodsDesc-container{
    padding: 7px;
    overflow: hidden;
    h1{
        font-size: 14px;
        line-height: 20px;
        color:#226aff;
        font-weight: 700;
        text-align: center;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>
