<template>
    <div class="news-container">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.add_time}}</span>
                            <span>点击: {{item.click}} 次</span>
                        </p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            newslist:[]
        }
    },
    created() {
        
    },
    methods:{
        getNewsList(){
            this.$http.get('/api/getNewsList').then(result=>{
                this.newslist = result.body.message
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
