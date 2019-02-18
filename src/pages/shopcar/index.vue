<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="mui-card" v-for="item in shopcarGoodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="right_info">
                        <h3>{{item.title}}</h3>
                        <div class="info">
                            <span class="now_price">¥{{item.sell_price}}</span>
                            <div class="num_box">
                                <input type="button" value="-">
                                <input type="text">
                                <input type="button" value="+" >
                            </div>
                            <a href="#">删除</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner allToatl">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>
                        已勾选商品
                        <span class="red">{{ $store.getters.totalCount }}</span> 件， 总价
                        <span class="red">￥{{ $store.getters.totalPrice}}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            shopcarGoodsList:[]
        }
    },
    created(){
        this.getAllShopCarList()
    },
    methods:{
        getAllShopCarList(){
            // this.$http.get('api/goods/getshopcarlist/:ids')
            //注意:这里发送请求传递的参数是购物车中的所有的商品的id,用逗号分割,比如:api/goods/getshopcarlist/87,88,89
            //所以先从vuex的store中把所有的商品的id先获取到,存到数组中,再用数组的join方法,生成用逗号分割的字符串
            var ids = []
            this.$store.state.cart.forEach(item => {
                ids.push(item.id)
            });
            this.$http.get('api/goods/getshopcarlist/'+ids.join(','))
            .then(result=>{
                if(result.body.status == 0){
                    // console.log(result.body.message);
                    this.shopcarGoodsList = result.body.message
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.shopcar-container{
    .mui-card-content-inner{
        display: flex;
        //垂直方向居中对齐
        align-items: center;
        justify-content: space-between;
        img{
            width: 60px;
            height: 60px;
        }
        .right_info{
            h3{
                font-size: 14px;
            }
            .info{
                font-size: 13px;
                display: flex;
                justify-content: space-between;
                line-height: 30px;
                .now_price{
                    color:red;
                    font-weight: 700;
                }
                .num_box{
                    display: flex;
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
                
            }
        }
    }
    .allToatl{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
        }
    }
}
</style>
