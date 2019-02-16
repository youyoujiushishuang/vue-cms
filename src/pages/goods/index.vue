<template>
    <div class="goodsList-container">
        <div class="goods-list">
            <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goGoodsInfo(item.id)">
                <img :src="item.img_url">
                <h3>{{item.title}}</h3>
                <div class="goods-info">
                    <div class="goods-price">
                        <span class="now">¥{{item.sell_price}}</span>
                        <span class="old">¥{{item.market_price}}</span>
                    </div>
                    <p class="sell">
                        <span>热卖商品</span>
                        <span>剩余{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore" class="loadMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1,
            goodsList:[],   //商品列表信息
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageIndex)
            .then(result=>{
                if(result.body.status == 0){
                    //点击加载更多的时候,要将之前的数据拼接到一起,而不是覆盖
                    this.goodsList = this.goodsList.concat(result.body.message)
                    if(result.body.message.length == 0) {
                        Toast("已经加载全部了")
                    }
                }
            })
        },
        getMore(){
            this.pageIndex++
            this.getGoodsList()
        },
        goGoodsInfo(id){    //点击每一项商品,进入该商品详情页面,传入商品的id, 没有将标签进行改造,而是直接用 编程式导航
            this.$router.push('/home/goodsInfo/'+id)
        }
    }
}
</script>

<style lang="less" scoped>
.goodsList-container{
    padding: 7px;
    background-color: #fff;
    .goods-list{
        background-color: #fff;
        
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item{
            min-height: 150px;
            margin: 4px 0;
            width: 49%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid #ccc;
            box-shadow: 0 0 5px #999;
            img{
                width: 100%;
            }
            h3{
                font-weight: 700;
                font-size: 14px;
            }
            .goods-info{
                margin: 2px;
                padding:4px;
                background-color: #ccc;
                .goods-price{
                    .now{
                        font-size: 13px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;

                }
            }
        }
    }
}
</style>

