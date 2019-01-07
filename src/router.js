import Vue from 'vue'
import Router from 'vue-router'
import Order from './views/Order.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/',
      name: 'order',
      component: Order
    },
    {
      path: '/goodList',
      name: 'goodList',
      component: () => import(/* webpackChunkName: "goodList" */ './views/GoodList.vue')
    },
    {
      path: '/goodClassify',
      name: 'goodClassify',
      component: () => import(/* webpackChunkName: "goodClassify" */ './views/GoodClassify.vue')
    },
  ]
})
router.beforeEach((to, from, next) => {
  const whiteList = ['/goodList'] // 路由白名单
  const login = sessionStorage.getItem('login')
  if (login == "true") {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next('/login')
      }
    }
  }
});
export default router
