<template>
    <div>
        <!-- 顶部滑动条, 使用的是 mui 中的代码,注意,这里一引入这些代码,滑动条和home中的顶部重合了,所以删除了 mui-fullscreen -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']"  data-wid="tab-top-subpage-1.html" v-for="item in categories" :key="item.id" @click="getPhotoList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表 : 这里用到了图片懒加载技术,在 mint-ui 中有lazy-load组件,但是只有全局注册组件才有用 -->
        <ul class="photoList">
          <router-link v-for="(item,index) in list" :key="index" tag="li" :to="'/home/photoInfo/'+item.id">
            <img v-lazy="item.img_url">
            <div class="info">
              <h1 class="info-title">{{item.title}}</h1>
              <div class="info-content">{{item.zhaiyao}}</div>
            </div>
          </router-link>
        </ul>
    </div>
</template>
<script>
//顶部的滑动条需要有滑动效果,需要引入mui的js文件
import mui from '@/lib/mui/js/mui.min.js'
//bug1 : 但是引入了该js文件之后会报错:
//Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.d.extend
//报错: 在严格模式下无法使用'caller', 'callee', and 'arguments' 这些属性
//但是webpack打包的bundle.js中会默认是严格模式的,所以需要修改webpack的默认严格模式
//在webpack3的时候,可以关闭严格模式,但是在webpack4中已经不能关闭了,但是babel可以选择忽略对某个文件的转译
//在babelrc文件中添加对某个文件的忽略
/* "ignore": [
    "./src/lib/mui/js/mui.min.js"
  ] */

//bug2 : 点击图片分享第一次进入页面时,不能滑动,刷新后才可以
//解决方法:要将组件初始化代码挂载到 mounted钩子函数中

//bug3: 这样一进入页面可以滑动,但是tabbar切换不起作用了,解决方法是:将 App.vue中的tabbar中的mui-tab-item 类名改成另一个,并将原来相关的样式全都复制给新类名

/* //初始化scroll控件：
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
}); */
export default {
  data(){
    return {
      categories:[],
      list:[]
    }
  },
  created(){
    this.getCategories()
    //一进入页面就要获取全部的图片列表,分类的id为0
    this.getPhotoList(0)
  },
  mounted(){  //在 DOM元素全都加载完毕之后,再初始化组件
    //初始化scroll控件：
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods:{
    getCategories(){  //获取顶部滑动区域的所有分类
      this.$http.get('api/getimgcategory')
      .then(result=>{
        result.body.message.unshift({id:0,title:"全部"})
        this.categories = result.body.message
      })
    },
    getPhotoList(cateid){ //获取图片列表,根据顶部的分类获取
      this.$http.get('api/getimages/'+cateid).then(result=>{
        console.log(result.body.message);
        this.list = result.body.message
      })

    }
  }
}
</script>
<style lang="less" scoped>
  //让滑动更加流畅
  *{
      touch-action: pan-y;
  }
  .photoList{
    text-align: center;
    padding: 0 4px;
    li{
      background-color: #ccc;
      position: relative;
      margin-top: 10px;
      //图片懒加载中的图片样式
      img{
        width: 100%;
        vertical-align: middle;
      }
      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info{
        position: absolute;
        text-align: left;
        bottom: 0;
        color: #fff;
        max-height: 84px;
        background-color: rgba(0,0,0,0.5);
        .info-title{
          font-size: 14px;
          font-weight: 700;
        }
        .info-content{
          font-size: 13px;
        }
      }
    }
    
  }
  
</style>
