<template>
  <div>
    <!-- 轮播图  必须设置高度，否则显示不出来 -->
    <shouyelunbotu :swiperList="swiperList" :isFull="true"></shouyelunbotu>

    <!-- 九宫格到六宫格的改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcomponents/swiper.vue'

export default {
  data() {
    return {
      swiperList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    getSwipe() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          // console.log(result)
          if (result.body.status === 0) {
            this.swiperList = result.body.message;
          } else {
            Toast({
              message: "加载失败",
              position: "middle",
              duration: 3000
            });
          }
        });
    }
  },
  components:{
    'shouyelunbotu': swiper
  }
};
</script>


<style lang="scss" scoped>

.mui-grid-view.mui-grid-9{
    background-color: white;
    border: none;

    img{
        width: 60px;
        // height: 60px;
    }

    .mui-media-body{
        font-size: 13px;
    }
}

</style>

