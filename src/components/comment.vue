<template>
    <div class="comment-container">
        <h1>发表评论</h1>
        <hr>
        <textarea placeholder="最多BB120字" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="comment-content">
            <ul>
                <li v-for="(item,index) in comments" :key="item.index">
                    <div class="comment-info">
                        <span>第{{index+1}}楼</span>
                        <span>用户:{{item.user_name}}</span>
                        <span>发表时间:{{item.add_time | dateFormat}}</span>
                    </div>
                    <div class="content">{{item.content == 'undefined'? '此用户很懒,没有评论': item.content}}</div>
                </li>
            </ul>
        </div>
        <mt-button type="danger" size="large" plain class="loadmore" @click="loadMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1,
            comments:[],
            msg:""
        }
    },
    props:["artid"],
    created(){
        this.getComment()
    },
    methods:{
        getComment(){   //获取评论
            this.$http.get('api/getcomments/'+this.artid+'?pageindex='+this.pageIndex).then(result=>{
                // console.log(result.body.message);
                // this.comments = result.body.message
                //每当加载更多的时候,不要直接把之前的数据清空,而是将新数据跟老数据进行拼接
                this.comments = this.comments.concat(result.body.message)
            },err=>{
                Toast("获取评论失败")
            })
        },
        loadMore(){ //加载更多评论
            this.pageIndex++
            this.getComment()
        },
        postComment(){  //发表评论
            //1.把用户提交的内容提交给服务器-- v-model 双向数据绑定
            // 提交的评论内容做非空校验
            if(this.msg.trim().length == 0) return Toast("评论内容不能为空")
            // 发送请求,提交内容
                //post请求: this.$http.post(请求地址,[请求体参数],[配置])
            this.$http.post('api/postcomment/'+this.artid,{content:this.msg})
            .then(result=>{
                console.log(result.body);
                Toast("发表评论成功")
                //2.将用户评论的内容放在一楼
                //2.1方法1.手动拼一个数据,加到数据的最前面
                /* this.comments.unshift({
                    add_time:Date.now(),
                    content:this.msg,
                    user_name:"匿名用户"
                })
                this.msg="" */

                //2.2 方法2 :重新调用getComment() , 这种方法在工作中使用较多,但是由于重新获取了评论,会闪一下
                // 注意:原有数据需要清空,否则会出现重复拼接,还要将pageIndex重置为1
                this.comments = []
                this.pageIndex = 1
                this.getComment()
                this.msg = "" 
            })
            

        }
    }
}
</script>

<style lang="less" scoped>
    .comment-container{
        h1{
            font-size: 16px;
            font-weight: 700;
        }
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
                    .content{
                       text-indent: 32px; 
                    }
                }
            }
        }
        .loadmore{
            margin: 15px 0;
        }
    }
</style>

