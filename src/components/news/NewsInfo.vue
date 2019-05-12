<template>
    <div class="newsinfo-container">
        <!-- 标题区域 -->
        <h3 class="title">{{newinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newinfo.add_time | dataFormat('YYYY-MM-DD')}}</span>
            <span>点击：{{newinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html='newinfo.content'>
        </div>
        <!-- 评论区 -->
        <div class="comment">
            <comment-box :id="this.id"></comment-box>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
// 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
      return  {
          id: this.$route.params.id,//将接口中传来的id挂载到data中方便使用
          newinfo: {}
      }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status === 0){
                    // console.log(result);
                    this.newinfo = result.body.message[0];
                }else{
                    Toast('获取详情页失败')
                }
            })
        }
    },
    components:{
        // 用来注册子组件的节点
        'comment-box': comment
    }
}
</script>


<style lang="scss" scoped>
    .newsinfo-container{
        padding: 0 4px;

        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }

        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
