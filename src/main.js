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
  return moment(date).format("YYYY-MM-DD HH-mm-ss")
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
