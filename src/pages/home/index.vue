<template>
  <div class="home-container">
    <!-- 轮播图 : 注意,直接显示在页面上时,默认高度为0,需要自己手动设置高度,此时的类名在调试时可以看到-->
    <swipe :banner="banner"></swipe>

    <!-- 六宫格 , 使用的是 MUI中的模板 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="@/assets/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="@/assets/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="@/assets/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
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
      this.$http.get("api/getlunbo").then(result => {
        this.banner = result.body.message;
      });
    }
  }
};
</script>

<style lang="less" scoped>
    /* .home-container {
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
    } */
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


