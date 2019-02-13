<template>
    <div class="comment-container">
        <hr>
        <h1>发表评论</h1>
        <textarea placeholder="最多BB120字" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="comment-content">
            <ul>
                <li v-for="(item,index) in comments" :key="item.index">
                    <div class="comment-info">
                        <span>第{{index+1}}楼</span>
                        <span>用户:{{item.user_name}}</span>
                        <span>发表时间:{{item.add_time | dateFormat}}</span>
                    </div>
                    <div class="content">{{item.content}}</div>
                </li>
            </ul>
        </div>
        <mt-button type="danger" size="large" plain class="loadmore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // id:this.$route.params
            comments:[]
        }
    },
    props:["artid"],
    created(){
        this.getComment()
    },
    methods:{
        getComment(){
            this.$http.get('api/getcomments/'+this.artid+'?pageindex=1').then(result=>{
                console.log(result.body.message);
                this.comments = result.body.message
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .comment-container{
        padding: 0 4px;
        .comment-content{
            margin-top: 15px;
            ul{
                li{
                    .comment-info{
                        background-color: #ccc;
                        font-size: 13px;
                        border-radius: 2px;
                        margin-top: 10px;
                    }
                }
            }
        }
        .loadmore{
            margin-top: 15px;
        }
    }
</style>

