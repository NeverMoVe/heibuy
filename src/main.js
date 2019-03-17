import Vue from 'vue'
import App from './App.vue'
// 导入elemeui插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 静态资源的样式
import './assets/statics/site/css/style.css'
// 导入axios组件，发ajax请求
import axios from 'axios'
// 设置基地址
axios.defaults.baseURL='http://111.230.232.110:8899/'
axios.defaults.withCredentials = true
// 给vue的原型添加$http
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 导入日期格式化插件
import moment from 'moment'

// 过滤器传参
Vue.filter('filtertime', (value,filterMsg)=>{
  if(filterMsg){
    return moment(value).format(filterMsg)
  }else{
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
 
})
// 把router导入
import router from './router/router'

import store from './router/store'
new Vue({
    // 渲染内容
  
    render: h => h(App),
    // 使用声明周期钩子在项目启动时候判断是否有登录，判断仓库的islogin是否为true

    async beforeCreate() {
      let res =await this.$http.get('site/account/islogin')
      if(res.data.code==='logined'){
        this.$store.commit('changeLogin',true)
      }else{
        this.$store.commit('changeLogin',false)
      }
    },
    router,
    store
  })
  // 等同于el:#app
  .$mount('#app')