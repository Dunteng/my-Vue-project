// 入口文件
console.log("ok")
import Vue from 'vue';

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由模块
Vue.use(VueRouter)
// 导入vuex
import Vuex from "vuex"
Vue.use(Vuex)

// 每次刚进入网站，调用main.js的时候，先从本地存储中获取购物车的数据放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息保存到store中的car上
      // 如果购物车中之前就有这个对应的商品，则只需要更新数量，
      // 如果没有，则直接把商品数据push到car中即可

      // 假设再购物车中没有找到对应的商品
      var flag = false;
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true;
          return true;//终止循环
        }
      })
      // 如果最终循环完毕flag还是false
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当更新完car之后，把car数组以字符串格式存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中的商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      // 记得本地缓存中也要同时修改哦
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id) {
      // 根据id，从state中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          console.log(444);
          state.car.splice(i, 1)
          return true;
        }
      });
      // 记得本地缓存中也要同时修改哦
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      });
      // 记得本地缓存中也要同时修改哦
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o;
    },
    getGoodsSelected(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;/* 把对象返回出去 */
    },
    getGoodsCountAndAmount(state){
      var o = {
        count:0,//勾选的数量
        amount:0//勾选的总价
      };
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count;
          o.amount+=item.price*item.count
        }
      });
      return o;
    }

  }
})
// 导入格式化时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})


// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue resource
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005'//这俩项配置必须再Vue.use(VueResource)之后写
// 启用该选项后，请求会以application/x-www-form-urlencoded作为Content-Type，就像普通的HTML表单一样。
Vue.http.options.emulateJSON = true


// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入mint-ui中的组件
// import {Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// 因为按需导入的话懒加载的小图标显示不出来，mint-ui也是挺垃圾的。。。，所以我们还是完整导入mint-ui吧
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// 1.3 导入自己的router.js路由模块
import router from "./router.js";

// 带入vue-VuePreview插件，实现图片预览功能
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入App根组件
import app from "./App.vue"

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  // 1.4 挂载路由对象到vm实例上 
  router,
  store, //挂载vuex的store状态管理实例对象 

});