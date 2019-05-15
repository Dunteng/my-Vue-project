import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import goodslist from './components/goods/GoodsList.vue'
import goodsinfo from './components/goods/GoodsInfo.vue'
import goodsdesc from './components/goods/GoodsDesc.vue'
import goodscomment from './components/goods/GoodsComment.vue'

// 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/', redirect: '/home'},
    {path:'/home', component:HomeContainer},
    {path:'/member', component:MemberContainer},
    {path:'/shopcar', component:ShopcarContainer},
    {path:'/search', component:SearchContainer},
    {path:'/home/newslist', component:NewsList},
    {path:'/home/newsinfo/:id', component:NewsInfo},//冒号:id表示参数，不能直接写id
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},//冒号:id表示参数，不能直接写id
    {path:'/home/goodslist',component:goodslist},
    {path:'/home/goodsinfo/:id',component:goodsinfo, name:"goodsinfo"},
    {path:'home/goodsdesc/:id',component:goodsdesc, name:"goodsdesc"}, //使用编程式导航要用name
    {path:'/home/goodscomment/:id',component:goodscomment, name:"goodscomment"}
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router