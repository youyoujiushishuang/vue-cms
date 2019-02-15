<template>
    <div>
        <div class="photoInfo" v-for="(item,index) in photoInfoList" :key="index">
            <div class="info-title">{{item.title}}</div>
            <div class="info-subTitle">
                <span>发表时间:{{item.add_time | dateFormat}}</span>
                <span>点击{{item.click}}次</span>
            </div>
            <hr>
            <!-- 图片缩略图区域 -->
            <!-- vue中有这个包 vue-pic-preview 是 vue-preview的包的以前的版本,更好用 --> 
            <div class="thumbs">
                <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="index">
            </div>
            <div class="info-content" v-html="item.content"></div>
        </div>
        <!-- 评论组件 ,要展示关于此图片的评论,需要传入相应的id-->
        <comment :id="id"></comment>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoInfoList:[],
            list:[]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getthumbs()
    },
    methods:{
        getPhotoInfo(){ //获取图片的描述信息
            this.$http.get("api/getimageInfo/"+this.id)
            .then(result=>{
                this.photoInfoList = result.body.message
            })
        },
        getthumbs(){
            this.$http.get('api/getthumimages/'+this.id)
            .then(result=>{
                console.log(result.body.message);
                //获取的结果的每一项只有图片的src 但是预加载的插件要求每一项数据还要有 w h 这两个属性,所以要手动添加
                result.body.message.forEach(item=>{
                    item.w = 600,
                    item.h = 400
                })
                this.list = result.body.message
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .photoInfo{
        background-color: #fff;
        padding: 10px;
        .info-title{
            font-size: 13px;
            font-weight: 700;
            text-align: center;
            margin: 5px 0;
        }
        .info-subTitle{
            color: #226aff;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }
        .info-content{
            text-indent: 32px;
            font-size: 13px;
            line-height: 32px;
        }
        .thumbs{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
                width: 60px;
                height: 40px;
            }
        }
    }
</style>


