<template>
    <div class="home-container">
        <!-- 轮播图 : 注意,直接显示在页面上时,默认高度为0,需要自己手动设置高度,此时的类名在调试时可以看到-->
        <mt-swipe :auto="4000">
            <!-- vue项目中使用v-for循环一定要使用 :key 不然会报错 -->
            <mt-swipe-item v-for="(item,index) in banner" :key="index">
                <!-- 这里的 href  src  属性前面如果不加冒号,后面的值就默认是字符串,加了冒号是属性绑定,后面的值就是表达式 -->
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return {
            banner:[]
        }
    },
    created(){
        this.getBanner()
    },
    methods:{
        getBanner(){
            this.$http.get('http://www.lovegf.cn:8899/api/getlunbo')
            .then(result=>{
                this.banner = result.body.message
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .home-container{
        .mint-swipe {
            height: 200px;
            .mint-swipe-item{
                a{
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>


