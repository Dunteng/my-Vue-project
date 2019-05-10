<template>
  <div>
    <!-- 轮播图  必须设置高度，否则显示不出来 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中使用v-for的话一定要加上:key -->
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img" alt>
      </mt-swipe-item>
      <!-- <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>-->
    </mt-swipe>

    <!-- 九宫格到六宫格的改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
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

export default {
  data() {
    return {
      swipeList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    getSwipe() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          // console.log(result)
          if (result.body.status === 0) {
            this.swipeList = result.body.message;
          } else {
            Toast({
              message: "加载失败",
              position: "middle",
              duration: 3000
            });
          }
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: rgb(211, 98, 33);
    }
    &:nth-child(2) {
      background-color: rgb(172, 211, 33);
    }
    &:nth-child(3) {
      background-color: rgb(33, 211, 172);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
};
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

