<template>
    <div class="goodsInfo-container">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 商品图片轮播图:可以直接用mint-ui中的插件,但是之前首页也用到了轮播图,试着把那个轮播图抽离出来,封装成新的组件,在这里复用 -->
                    <swipe :banner="banner"></swipe>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header goods-title">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        市场价: &nbsp; &nbsp;<del>¥{{goodsInfo.market_price}}</del> &nbsp; &nbsp;&nbsp; &nbsp;
                        销售价: &nbsp; &nbsp;<span class="now_price">¥{{goodsInfo.sell_price}}</span>
                    </div>
                    <div class="buy-count">
                        <span>购买数量:</span>
                        <input type="button" value="-" 
                        @click="buyCount--" 
                        >
                        <input type="text" v-model="buyCount">
                        <input type="button" value="+" 
                        @click="buyCount++">
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card goods-params">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div>商品货号:  {{goodsInfo.goods_no}}</div>
                    <div>库存情况:  {{goodsInfo.stock_quantity}}件</div>
                    <div>上架时间:  {{goodsInfo.add_time | dateFormat}}</div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文详情</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">查看评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            goodsInfo:{},    //商品的详细信息
            buyCount:1,
            banner:[]
        }
    },
    created(){
        this.getBanner()
        this.getGoodsInfo()
    },
    methods:{
        getBanner(){    //获取第一个卡片中的轮播图
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status === 0){
                    //这里获取到的数据时图片的src,但是封装的swipe组件中使用的是 url
                    //所以在 swipe组件中用: <img :src="item.img || item.src" alt>
                    this.banner = result.body.message
                }
            })
        },
        getGoodsInfo(){ //获取商品详细信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.goodsInfo = result.body.message[0]
                }
            })
        },
        goDesc(id){ //点击图文介绍跳转
            this.$router.push('/home/goodsDesc/'+id)
        },
        goComment(id){  //点击商品评论
            this.$router.push('/home/goodsComments/'+id)
        }
    }
}
</script>

<style lang="less" scoped>
.mui-card-footer, .mui-card-header{
    display: block;
    button{
        margin: 15px 0;
    }
}
.goodsInfo-container{
    .goods-title{
        color:#226aff;
        font-size: 16px;
    }
    .price{
        color:#999;
        font-size: 12px;
        .now_price{
            color:red;
            font-weight: 700;
            font-size: 18px;
        }
    }
    .buy-count{
        font-size: 13px;
        margin-top: 10px;
        color: #999;  
        display: flex;
        line-height: 30px;
        input{
            font-size: 14px;
            text-align: center;
            margin: 0;
            padding: 0;
            width: 30px;
            height: 30px;
            &[type="text"]{
                border-left: none;
                border-right: none;
            } 
        }
        
        
    }
    .goods-params{
        font-size: 12px;
        color:#999;
    }
}
</style>
