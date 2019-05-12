<template>
    <div class="cmt-container">
        <h3>评论区:</h3>
        <hr>
        <textarea placeholder="开始BB吧(最多BB120字)..." maxlength="120" v-model="msg" @keyup.enter = "postComment"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentsList" :key="i">
                <div class="cmt-title">
                    第{{i+1}}楼:&nbsp;&nbsp;{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dataFormat('YYYY-MM-DD')}}
                </div>
                <div class="cmt-body">
                    {{item.content==="undefined"?"该用户暂未做出评论":item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    // 接受从父组件传来的id
    props:["id"],
    
    data(){
        return {
            pageIndex: 1,//默认展示第一页
            lou:0,//显示多少楼层评论
            commentsList:[],
            msg:""//评论输入的内容
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status===0){
                    // console.log(result.body)
                    // 每次请求到数据就把新数据拼接到旧数据里而非取代掉
                    this.commentsList = this.commentsList.concat(result.body.message);
                }else{
                    Toast("获取评论失败。。。");
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length===0){
                return Toast('评论内容不能为空！')
            }
            this.$http.post('api/postcomment/'+this.id,
                            { content:this.msg.trim()}
            ).then(function(result){
                if(result.body.status === 0){
                    // 1、拼接处一个评论对象
                    var cmt = {
                        user_name: 'OG園長',
                        add_time: new Date(),
                        content: this.msg.trim()
                    };
                    this.commentsList.unshift(cmt);
                    this.msg = ""
                }else {
                    Toast("发布失败。。。")
                }
            })
        }
    }
}
</script>



<style lang="scss" scope>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin:0;
        }

        .cmt-list{
            margin: 10px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>