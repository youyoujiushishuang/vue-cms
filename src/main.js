import Vue from 'vue'
import App from './App'
import router from './router'

//引入 css 初始化文件
import './css/common.css'

//完整引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//将mint-ui中的所有组件都注册到vue全局中
Vue.use(MintUI)

//引入MUI样式文件
import './lib/mui/css/mui.min.css'
//引入mui字体图标扩展样式文件
import './lib/mui/css/icons-extra.css'

//下载并导入 vue-resource 包 , 使用 $http 发送请求,向后台获取数据
import VueRouter from 'vue-resource'
//注册
Vue.use(VueRouter)
//设置全局请求根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899'

Vue.config.productionTip = false

//设置全局过滤器,格式化时间
import moment from 'moment'
// Vue.filter('过滤器名称',function(管道符左边的数据){})
Vue.filter('dateFormat',function(date){
  return moment(date).format("YYYY-MM-DD HH:mm:ss")
})

//注册全局组件,注册后,该组件可以使用标签形式展示在页面上
//评论功能在多个页面上都有,需要单独抽离出来,注册为全局组件,多次使用
import comment from './components/comment.vue'
Vue.component('comment',comment)

//全局注册轮播图组件
import swipe from './components/swipe.vue'
Vue.component('swipe',swipe)

//图片预加载
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

//安装Vuex 包,用来存储全局数据,任何组件都可以调用此数据并对数据进行处理,一旦数据改变,任何运用到此数据的地方都会自动改变
import Vuex from 'vuex'
Vue.use(Vuex)

//一进入main.js就从本地缓存中获取数据
// var shopcart = JSON.parse(localStorage.getItem('cart') || '[]')
// console.log(JSON.parse(localStorage.getItem('cart') || '[]'));

var shopcart = [{id:88,price:5780, count:2,selected:true}]
//Vuex安装后,还需要创建一个store仓库来存储数据,传入一个对象
const store = new Vuex.Store({
  state:{
    // cart数组中存储购物车中的数据,每个元素都是一个商品的信息
    //每个商品信息包含:{id:商品的id, price:商品的单价, count:商品的数量, selected:是否选中此商品}
    cart:shopcart
  },
  mutations:{
    //想要对state中的数据进行处理都要在 mutations 中进行,里面的方法的第一个参数都是 state,第二个参数是要用到的数据
    addToCart(state,goodsInfo){
      let index = state.cart.findIndex(item => item.id == goodsInfo.id)
      if(index != -1){
        //购物车中已存在此商品,只改变数量
        state.cart[index].count += parseInt(goodsInfo.count)
      }else{
        //如果购物车中不存在此商品,加把商品添加到购物车中
        state.cart.push(goodsInfo)
      }
      //在刷新页面之后,重新加载 main.js cart中又没有数据了,所以要把数据存储到本地缓存中,
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
  },
  getters:{
    totalCount(state){
      //计算购物车商品数量,遍历 cart 将count属性值累加
      let sum = 0
      state.cart.forEach(item=> sum += item.count)
      return sum
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  //将Vuex的store仓库挂载到全局vm实例上,不然组件中无法使用store中的数据
  store
})
