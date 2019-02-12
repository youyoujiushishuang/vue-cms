<template>
  <div class="home-container">
    <!-- 轮播图 : 注意,直接显示在页面上时,默认高度为0,需要自己手动设置高度,此时的类名在调试时可以看到-->
    <mt-swipe :auto="4000">
      <!-- vue项目中使用v-for循环一定要使用 :key 不然会报错 -->
      <mt-swipe-item v-for="(item,index) in banner" :key="index">
        <!-- 这里的 href  src  属性前面如果不加冒号,后面的值就默认是字符串,加了冒号是属性绑定,后面的值就是表达式 -->
        <a :href="item.url">
          <img :src="item.img" alt>
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 六宫格 , 使用的是 MUI中的模板 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: []
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$http.get("http://www.lovegf.cn:8899/api/getlunbo").then(result => {
        this.banner = result.body.message;
      });
    }
  }
};
</script>

<style lang="less" scoped>
    .home-container {
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
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        .mui-table-view-cell{
            padding:0 12px;
        }
        img{
            width: 60%;
        }
        .mui-media-body{
            font-size: 12px;
        }

    }
</style>


