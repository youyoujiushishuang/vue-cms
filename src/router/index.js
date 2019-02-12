import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

  ],
  //将路由链接的点击高亮类名改为 mui-active , 因为引入了mui中的样式文件,其中就有mui-active的高亮样式,不需要我们自己额外写
  linkActiveClass:"mui-active"
})
