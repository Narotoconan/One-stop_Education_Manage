import Vue from 'vue'
import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('../views/Home'),
        children: [
            {
                path: '',
                redirect: '/index'
            },
            {
                path: '/index',
                component: () => import('../views/Index'),
                meta: {
                    title: '信息统计'
                },
            },
            {
                path: '/teacher',
                component: () => import('../views/Teacher'),
                meta: {
                    title: '教师管理'
                },
            },
            {
                path: '/user',
                component: () => import('../views/User'),
                meta: {
                    title: '用户管理'
                },
            },
            {
                path: '/curriculum',
                component: () => import('../views/Curriculum'),
                meta: {
                    title: '课程管理'
                }
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../views/Login'),
        meta: {
            title: '管理员登录',
            isLoginPage:true
        },
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
