<template>
  <div id="app">
    <!-- 头部  -->
    <mt-header fixed title="黑马程序员"></mt-header>
    <!-- 页面组件 -->
    <transition>
			<router-view></router-view>
		</transition>
    <!-- 底部tabbar 使用的是MUI 中的组件,需要引入MUI中的css样式文件-->
    <nav class="mui-bar mui-bar-tab">
      <!-- 将此处的a标签改造成 router-link标签,路由链接,优点是点击当前连接自动添加高亮类名 router-link-active -->
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/shopcar">
        <!-- 这里的购物车图标在 mui的扩展图标中,需要引入扩展图标的css文件,还要依赖以字体图标文件,需要将字体图标文件复制到项目文件夹中 -->
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		margin-top: 40px;
		margin-bottom: 50px;
		/* overflow-x: hidden;是为了解决组件切换时有横向滚动条的问题,动画时,两个组件都存在在页面上 */
		overflow-x: hidden;
	}
	.v-enter{
		opacity: 0;
		/* 这里是为了照顾不同宽度的屏幕进行动画 */
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		/* 组件离场时,不占位置,不然组件切换时,两个组件都是块级元素,都要独占一行,入场组件会最后从下面上来 */
		position: absolute;
	}
	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}

	.mui-bar-tab .mui-tab-item1.mui-active {
    color: #007aff;
	}

	.mui-bar-tab .mui-tab-item1 {
			display: table-cell;
			overflow: hidden;
			width: 1%;
			height: 50px;
			text-align: center;
			vertical-align: middle;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #929292;
	}
	.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
	}
</style>
