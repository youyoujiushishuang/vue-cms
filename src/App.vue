<template>
  <div id="app">
    <!-- 头部  -->
    <mt-header fixed title="固定在顶部"></mt-header>
    <!-- 页面组件 -->
    <router-view/>
    <!-- 底部tabbar 使用的是MUI 中的组件,需要引入MUI中的css样式文件-->
    <nav class="mui-bar mui-bar-tab">
      <!-- 将此处的a标签改造成 router-link标签,路由链接,优点是点击当前连接自动添加高亮类名 router-link-active -->
			<router-link class="mui-tab-item" to="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="#tabbar-with-chat">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="#tabbar-with-contact">
        <!-- 这里的购物车图标在 mui的扩展图标中,需要引入扩展图标的css文件,还要依赖以字体图标文件,需要将字体图标文件复制到项目文件夹中 -->
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="#tabbar-with-map">
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
  margin-bottom: 60px;
}
</style>
