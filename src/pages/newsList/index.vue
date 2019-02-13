<template>
    <div class="newslist-container">
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
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get('api/getnewslist').then(result=>{
                this.newslist = result.body.message
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .newslist-container{
        padding: 0 4px;
        .mui-table-view{
            li{
                .mui-media-body{
                    h1{
                        font-size: 14px;
                    }
                    .mui-ellipsis{
                        font-size: 13px;
                        color:#226aff;
                        display: flex;
                        justify-content: space-between;
                    }

                }
            }
        }
    }
</style>
