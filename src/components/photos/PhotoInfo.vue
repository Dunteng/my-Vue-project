<template>
  <div class="photoinfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoInfo.add_time | dataFormat('YYYY-MM-DD')}}</span>
      <span>点击：{{photoInfo.click}}次</span>
    </p>
    <hr>

    <!-- 略缩图区域 -->
    <div class="thumbs">
    <img
      class="preview-img"
      v-for="(item, index) in list"
      :src="item.src"
      height="100"
      @click="$preview.open(index, list)"
      :key="item.src"
    >
    </div>

    <!-- 图片内容区域 -->

    <div class="content" v-html="photoInfo.content"></div>
    <!-- 放置一个评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1、导入评论子组件
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: [],
      list: [] //缩略图数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          // console.log(result.body);
          this.photoInfo = result.body.message[0];
        } else {
          Toast("获取数据出错。。。");
        }
      });
    },
    getThumbs() {
      // 获取略缩图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环每个图片数据，添加补全图片的宽高属性
          result.body.message.forEach(element => {
            element.w = 600;
            element.h = 400;
          });
          // 把完整的数据保存到list中
          this.list = result.body.message;
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>


<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a5ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs img{
      margin:10px;
      box-shadow: 0 0 8px #999; 
  }
}
</style>
