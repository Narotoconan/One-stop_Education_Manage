import Vue from 'vue'
import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:() => import('../views/Home'),
    children:[
      {
        path:'',
        redirect:'/index'
      },
      {
        path: '/index',
        component:() => import('../views/Index'),
      },
      {
        path: '/teacher',
        component:() => import('../views/Teacher'),
      },
      {
        path: '/user',
        component:() => import('../views/User'),
      },
      {
        path: '/curriculum',
        component:() => import('../views/Curriculum'),
      },
    ]
  },
  {
    path: '/login',
    component:() => import('../views/Login')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop;
    } else {
      return {x: 0, y: 0}
    }
  },
})

export default router
