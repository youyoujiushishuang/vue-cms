<template>
    <mt-swipe :auto="4000">
      <!-- vue项目中使用v-for循环一定要使用 :key 不然会报错 -->
      <mt-swipe-item v-for="(item,index) in banner" :key="index">
        <!-- 这里的 href  src  属性前面如果不加冒号,后面的值就默认是字符串,加了冒号是属性绑定,后面的值就是表达式 -->
        <a :href="item.url">
          <img :src="item.img || item.src" alt>
        </a>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    //由父组件获取要轮播的图片传递给轮播子组件
    props:["banner"]
}
</script>

<style lang="less" scoped>
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        a {
            img {
            height: 100%;
            width: 100%;
            }
        }
    }
}
</style>

