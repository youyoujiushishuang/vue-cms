<template>
    <div>
        <!-- 顶部滑动条, 使用的是 mui 中的代码,注意,这里一引入这些代码,滑动条和home中的顶部重合了,所以删除了 mui-fullscreen -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
                        推荐
                    </a>
                    <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
                        热点
                    </a>
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
                        北京
                    </a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
                        社会
                    </a>
                    <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
                        娱乐
                    </a>
                    <!--<a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
                        科技
                    </a>-->
                </div>
            </div>
        </div>
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

    }
  },
  mounted(){  //在 DOM元素全都加载完毕之后,再初始化组件
    //初始化scroll控件：
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
}
</script>
<style lang="less" scoped>
  //让滑动更加流畅
  *{
      touch-action: pan-x;
  }
</style>
