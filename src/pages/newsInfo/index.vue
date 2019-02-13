<template>
    <div class="newsInfo-container">
        <h1 class="title">{{newsInfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{newsInfo.add_time | dateFormat}}</span>
            <span>点击: {{newsInfo.click}} 次</span>
        </p>
        <hr>
        <div class="news-content" v-html="newsInfo.content"></div>

        <comment></comment>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                this.newsInfo = result.body.message[0]
            })
        }
    }
}
</script>

<style lang="less">
/* scoped 的作用: 限制此处写的样式只在该组件内有效----原理:组件里一开始就有的标签上会自动加上一个唯一标识符data-v-1fdaa4e8
    并且在写样式的时候,会帮助我们将选择器自动改造成属性选择器,例如:
    .newsInfo-container .title[data-v-1fdaa4e8] {} 
    但是有v-html 渲染出来的标签上没有这个 data-v 的属性,我们想给渲染出来的标签添加样式,还是会自动使用属性选择器,所以写的样式没有作用
    解决方法: 将 scoped 去掉, 项目较小,类名冲突可能性不大
*/
    .newsInfo-container{
        padding:0 4px;
        .title{
            font-size: 15px;
            font-weight: 700;
            text-align: center;
        }
        .subtitle{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .news-content{
            img{
                width: 100%;
            }
        }
    }
</style>


