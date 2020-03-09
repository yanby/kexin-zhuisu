import Vue from 'vue'
import Router from 'vue-router'

//登录注册
import home from '@/components/home'
import viewer from '@/components/viewer'
import guide from '@/components/guide'


Vue.use(Router)


const router = new Router({
  mode: "history",
  scrollBehavior: ()=>({y:0}),//路由切换以后返回到顶部
  routes: [
    {
      path: '*',
      component: guide
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/viewer',
      component: viewer
    },
    {
      path: '/guide',
      component: guide
    }
  ]
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
//router.beforeEach((from, to, next) => {
//  if (from.meta.requireAuth) { // 判断跳转的路由是否需要登录
//    if (localStorage.token) { // vuex.state判断token是否存在
//      next() // 已登录
//    } else {
//      next({
//        path: '/login',
//        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//      })
//    }
//  } else {
//    next()
//  }
//})

export default router;
