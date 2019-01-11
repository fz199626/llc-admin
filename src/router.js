import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ './views/Order.vue')
    },
    {
      path: '/allOrders',
      name: 'allOrders',
      component: () => import(/* webpackChunkName: "allOrders" */ './views/AllOrders.vue')
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
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import(/* webpackChunkName: "feedback" */ './views/Feedback.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const whiteList = [] // 路由白名单
  const login = sessionStorage.getItem('login')
  if (login == "true") {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      if (to.path === '/') {
        next()
      } else {
        next('/')
      }
    }
  }
});
export default router
