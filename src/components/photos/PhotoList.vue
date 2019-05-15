<template>
  <div>
    <!-- 顶部滑动导航条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id===0?'mui-active':'']"
            v-for="item in imgcategory"
            :key="item.id"
            @tap="getPhotoByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in images" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">  
        <img v-lazy="item.img_url">
        <div class="info">
            <h1 class="info-title">{{item.title}}</h1>
            <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      imgcategory: [], //存放从api获取到的数据
      images: [] //存放图文信息
    };
  },
  created() {
    this.getimgcategory();
    this.getPhotoByCateId(0);
  },
  methods: {
    getimgcategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          //   console.log(result.body)
          result.body.message.unshift({ id: 0, title: "全部" }); //手动创建一个“全部”选项
          this.imgcategory = result.body.message;
        } else {
          Toast("获取图片分类失败。。。");
        }
      });
    },
    getPhotoByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.images = result.body.message;
        } else {
          Toast("获取图文详情失败。。。");
        }
      });
    }
  },
  mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>


<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
  li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px;
    position: relative;
    img[lazy="loading"] {
        width: 40px;
        height: 300px;
      margin: auto;
    }
    img {
        width: 100%;
        vertical-align: middle;
    }

    .info{
        color:white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.4);
        max-height: 84px;
        .info-title{
            font-size: 14px;

        }
        .info-body{
            font-size: 13px;
        }
    }
  }
}
</style>
