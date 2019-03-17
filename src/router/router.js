// 由于脚手架的缓存机制。vue不会重新导入，依旧是原来的vue
import Vue from 'vue'

// 导入vuerouter包
import VueRouter from 'vue-router'
// Vue对象使用VueRouter
Vue.use(VueRouter)

import index from '../components/index.vue'
import category from '../components/category.vue'
import user from '../components/userCenter.vue'
import order from '../components/userorder.vue'
import singlecenter from '../components/singleCenter.vue'
import ordercontent from '../components/ordercontent.vue'
import cart from '../components/cart.vue'
import fillOrder from '../components/fillOrder.vue'
import login from '../components/login.vue'
// 关联路由与组件
let routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/category/:id',
    component: category
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/fillOrder/:id',
    component: fillOrder,
    meta:{
      checklogin:true
    }
  },
  {
    path: '/user',
    component: user,
    children: [{
        path: '',
        redirect: 'singlecenter'
      }, {
        path: 'singlecenter',
        component: singlecenter
      }, {
        path: 'order',
        component: order
      },
      {
        path: 'ordercontent',
        component: ordercontent
      }
    ]
  }
]
// 创建路由对象
let router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  if (to.meta.checklogin===true) {
     let res=await Vue.prototype.$http.get('site/account/islogin');
     if(res.data.code=='nologin'){
       next('/login')
     }else{
       next();
     }
  }else{
    next()
  }
})
// 把router对象暴露出去
export default router