// 入口文件
console.log("ok")
import Vue from 'vue';

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由模块
Vue.use(VueRouter)


// 导入格式化时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat',function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
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
  el:"#app",
  render: c => c(app),
  // 1.4 挂载路由对象到vm实例上 
  router 
});