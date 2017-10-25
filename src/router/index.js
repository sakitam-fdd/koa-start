import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import main from '../views/main'
Vue.use(Router)

const userRouter = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: resolve => { require(['../views/login/Login.vue'], resolve) }
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register - 注册'
    },
    component: resolve => { require(['../views/login/Register.vue'], resolve) }
  }
]

const appRouter = [
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: main,
  children: []
}

const routers = [
  ...userRouter,
  otherRouter,
  ...appRouter
]

const router = new Router({
  routes: routers
})
router.beforeEach((to, from, next) => {
  if (!Cookies.get('user') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    })
  } else if (Cookies.get('user') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
    next({
      name: 'main'
    })
  } else {
    next()
  }
})

export default router
