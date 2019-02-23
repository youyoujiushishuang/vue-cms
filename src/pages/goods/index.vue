<template>
    <scroller 
    ref="sc"
    :on-refresh="refresh"
    :on-infinite="infinite"
    refreshText="用点力拉啊"
    noDataText="没有更多数据了">
    <!-- content goes here -->
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
        </div>
    </scroller>
    
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
    mounted(){
        // this.$refs.sc.triggerPullToRefresh()
    },
    methods:{
        getGoodsList(refresh){
            return this.$http.get('api/getgoods?pageindex='+this.pageIndex)
            .then(result=>{
                if(refresh){    //如果是上拉刷新的话,就不拼接了
                    //点击加载更多的时候,要将之前的数据拼接到一起,而不是覆盖
                    console.log("下拉刷新");
                    this.goodsList = result.body.message
                } else{ //如果是加载更多时获取数据,就要拼接
                    console.log("上拉加载",this.goodsList)
                    this.goodsList = this.goodsList.concat(result.body.message)
                }
            })
        },
        goGoodsInfo(id){    //点击每一项商品,进入该商品详情页面,传入商品的id, 没有将标签进行改造,而是直接用 编程式导航
            this.$router.push('/home/goodsInfo/'+id)
        },
        refresh(){  //下拉刷新
            setTimeout(()=>{
                //下拉刷新,就是重新加载列表页,而且只加载第一页
                this.pageIndex = 1
                //重新请求数据,成功后,结束下拉刷新finishPullToRefresh  但这个这个scroller组件的实例的方法,并不是这个页面组件的方法,所以要先获取这个scroller组件,用$refs
                //这里调用getGoodsList的方法的时候,只获取第一页,不用拼接,所以传入true
                this.getGoodsList(true).then(()=>this.$refs.sc.finishPullToRefresh())
            },2000)
        },
        infinite(){ //上拉加载
            setTimeout(()=>{
                this.pageIndex++
                this.getGoodsList().then(()=>this.$refs.sc.finishInfinite(this.goodsList.length === 15))
            },2000)
        }
    }
}
</script>

<style lang="less">
.pull-to-refresh-layer{
    margin-top: -20px !important;
}
._v-content {
  padding-bottom: 40px;
}
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
                color:#226aff;
            }
            .goods-info{
                margin: 2px;
                padding:4px;
                background-color: #eee;
                .goods-price{
                    .now{
                        font-size: 13px;
                        font-weight: 700;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        color:#999;
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

