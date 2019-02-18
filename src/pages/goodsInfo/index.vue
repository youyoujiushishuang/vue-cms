<template>
    <div class="goodsInfo-container">
        <transition name="ballAnimate"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">    
            <div class="ball" v-show="ballShow" ref="ball"></div>
        </transition>
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
                        <!-- 这里给 - 和 + 都带上范围,超过范围之后,按钮禁用 -->
                        <input type="button" value="-" 
                        @click="buyCount--" 
                        :disabled="buyCount <= 1">
                        <input type="text" v-model="buyCount" @change="changeValue">
                        <input type="button" value="+" 
                        @click="buyCount++"
                        :disabled="buyCount >= goodsInfo.stock_quantity">
                    </div>
                    <div class="buyOrCart">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
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
            id:this.$route.params.id,   //路由携带的商品id
            goodsInfo:{},    //商品的详细信息
            buyCount:1,     //购买数量,双向数据流
            banner:[],  //轮播图信息
            ballShow:false,  //小球是否显示,默认不显示
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
        },
        changeValue(){  //商品数量需要限定在一定的范围里面
            if(this.buyCount >= this.goodsInfo.stock_quantity){
                this.buyCount = this.goodsInfo.stock_quantity
            }
            if(this.buyCount <= 1){
                this.buyCount = 1
            }
        },
        addToCart(){    //点击加入购物车,完成小球动画
            //点击加入购物车,让小球显示,再由包裹它的transition标签自动帮助它完成动画
            //注意,由于组件切换也用到了动画,已经写了v- 的类样式,这个小球也会运用这个动画,所以把之前的类名前缀改一下,让两个动画不要冲突
            this.ballShow = !this.ballShow
            //调用Vuex中的mutations中的方法,第一个参数是方法名,第二个参数是传递的参数
            this.$store.commit('addToCart',{
                id:this.id,
                price:this.goodsInfo.sell_price,
                count:this.buyCount,
                selected:true
            })
        },
        //下面是小球的动画,是半场动画,用钩子函数实现
        beforeEnter(el){  //动画开始之前,定义好小球动画的起始位置
            el.style.transform = "translate(0,0)"
        },
        enter(el,done){    //动画进行时
            el.offsetWidth; //必须要写这一句
            //获取小球和购物车图标在页面上的位置,将横纵坐标相减,得到小球要移动的距离
            //domObject.getBoundingClientRect() 新出的方法,可以获取元素左上角距离视口左上角的距离,移动要用到dom元素
            //获取小球的位置
            const ballDist = this.$refs.ball.getBoundingClientRect()
            //获取购物车的位置 注意: 获取dom元素不受组件的限制,可以获取到其他组件中的元素
            const cartDist = document.getElementById('shopCart').getBoundingClientRect()
            const moveX = cartDist.left - ballDist.left
            const moveY = cartDist.top - ballDist.top
            console.log(moveX,moveY);
            
            el.style.transform = `translate(${moveX}px,${moveY}px)`
            el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){   //动画结束之后,将小球隐藏
            this.ballShow = !this.ballShow
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
    .ball{
        width: 15px;
        height: 15px;
        background-color: red;
        position: absolute;
        border-radius: 50%;
        z-index: 99;
        left: 117px;
        top: 407px;
    }
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
    .buyOrCart{
        margin-top: 10px;
    }
    .goods-params{
        font-size: 12px;
        color:#999;
    }
}
</style>
