import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//引入路由模块
import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import shopcarComponent from '../pages/shopcar'
import searchComponent from '../pages/search'
import newsListComponent from '../pages/newsList'
import newsInfoComponent from '../pages/newsInfo'
import photoList from '../pages/photos'
import photoInfo from '../pages/photoInfo'
import goodsList from '../pages/goods'
import goodsInfo from '../pages/goodsInfo'
import goodsDesc from '../pages/goodsDesc'
import goodsComments from '../pages/goodsComments'

export default new Router({
  routes: [
    { path:"/", redirect:"/home" },
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/shopcar', component: shopcarComponent },
    { path: '/search', component: searchComponent },
    { path: '/home/newslist', component: newsListComponent },
    { path: '/home/newsInfo/:id', component: newsInfoComponent },
    { path: '/home/photoList', component: photoList },
    { path: '/home/photoInfo/:id', component: photoInfo },
    { path: '/home/goodsList', component: goodsList },
    { path: '/home/goodsInfo/:id', component: goodsInfo },
    { path: '/home/goodsDesc/:id', component: goodsDesc },
    { path: '/home/goodsComments/:id', component: goodsComments },
  ],
  //将路由链接的点击高亮类名改为 mui-active , 因为引入了mui中的样式文件,其中就有mui-active的高亮样式,不需要我们自己额外写
  linkActiveClass:"mui-active"
})
