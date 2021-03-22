import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import login from './assets/js/login'

import jquery from 'jquery'
import Popper from 'popper.js'
import bootstrap from  'bootstrap'
import element from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$login = login

Vue.use(element);

new Vue({
  router,
  store,
  jquery,
  Popper,
  bootstrap,
  render: h => h(App)
}).$mount('#app')


router.beforeResolve((to,from,next) => {
  if (to.matched.some(record => record.meta.title)){
    document.title= to.meta.title
  }else {
    document.title="“一站式”在线教育后台管理"
  }
  if (to.matched.some(record => record.meta.isLoginPage)) next()
  if(!login.checkLogin()) next('/login')
  next()
})


import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './theme/index.css'
