<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="mui-card" v-for="(item, i) in shopcarGoodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="goodsSelected[item.id]"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="right_info">
                        <h3>{{item.title}}</h3>
                        <div class="info">
                            <span class="now_price">¥{{item.sell_price}}</span>
                            <div class="num_box">
                                <input type="button" value="-"
                                @click="decrease(item.id)">
                                <input type="text" :value="goodsCount[item.id]">
                                <input type="button" value="+" 
                                @click="increase(item.id)">
                            </div>
                            <a href="#" @click="remove(item.id,i)">删除</a>
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
            shopcarGoodsList:[],    //购物车商品列表信息
            goodsCount:this.$store.getters.goodsCount,   //商品的id与对应的商品购买数量{88:2,89:1}
            goodsSelected:this.$store.getters.goodsSelected     //商品id与对应商品的勾选状态
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
        },
        increase(id){ //点击商品的加号,增加数量
            //点击加号,该商品数量加1,在实现页面的数据改变之后,还要修改Vuex中的数据和本地缓存中的数据
            //this.goodsCount[id] 是goodsCount这个对象中找到属性名为 id(商品id) 的属性值(商品数量)
            this.goodsCount[id]++
            //this.goodsCount是这个组件的值,可以自加,但是它是从getters中获取的而getters中的值是不能修改的
            this.$store.commit('updateCount',{id:id , count:this.goodsCount[id]})

        },
        decrease(id){   //点击商品的减号,减少数量
            //只有在商品数量大于1,才能自减
            this.goodsCount[id] >1 && this.goodsCount[id]--
            //this.goodsCount是这个组件的值,可以自加,但是它是从getters中获取的而getters中的值是不能修改的
            this.$store.commit('updateCount',{id:id , count:this.goodsCount[id]})
        },
        remove(id,i){ //点击删除,完成删除功能
            //要删除页面上渲染出来的商品,所以在shopcarGoodsList:[] 中要删除该商品,由于是按照数组的顺序渲染出来的,可以直接按照索引删除
            //要在Vuex的数据和本地缓存中删除该商品,这里的shopcarGoodsList数组和state中的数组的顺序不一定是一样的,所以state中不能根据索引删除,而是根据商品id删除
            this.shopcarGoodsList.splice(i,1)
            this.$store.commit('removeFromCart',id)
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
