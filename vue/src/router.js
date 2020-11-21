import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// default
import CMain from '@/components/CMain'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

// system
import User from '@/views/system/User'
import Role from '@/views/system/Role'
// article
import Article from '@/views/blog/Article'

import repo from '@/api'
import store from '@/store'

Vue.use(Router)

export const publicRoutes = [
  {
    name: ' 主页',
    path: '',
    component: CMain,
    children: [{
      name: '首页',
      path: 'home',
      component: Home,
      icon: 'el-icon-document'
    }]
  }, {
    name: '登录',
    path: '/login',
    component: Login
  }, {
    name: '404',
    path: '/404',
    component: () => import('./views/NotFound.vue')
  }
]

export const needPermRoutes = [
  {
    name: '系统模块',
    path: '/system',
    redirect: '/system/user',
    component: CMain,
    icon: 'el-icon-success',
    children: [{
      name: '用户管理',
      path: 'user',
      component: User,
      icon: 'el-icon-setting',
      permCode: 'user:list'
    }, {
      name: '角色管理',
      path: 'role',
      component: Role,
      icon: 'el-icon-picture-outline',
      permCode: 'role:list'
    }]
  }, {
    name: '博客模块',
    path: '/blog',
    redirect: '/blog/article',
    component: CMain,
    icon: 'el-icon-success',
    children: [{
      name: '文章管理',
      path: 'article',
      component: Article,
      icon: 'el-icon-setting',
      permCode: 'article:list'
    }]
  },
  { path: '*', redirect: '/404' }
]

const router = new Router({
  // mode: 'history',
  routes: publicRoutes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const user = repo.system.GET_TOKEN()
  if (user) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else if (!store.getters.gUserPermCodes || !store.getters.gUserPermCodes.length) {
      store.dispatch('aSetUser', user)
      store.dispatch('aListUserPerm').then((routes) => {
        router.addRoutes(routes)
        next({ ...to })
      })
    } else {
      next()
    }
  } else if (['/login', '/404'].indexOf(to.path) !== -1) {
    next()
  } else {
    store.commit('mResetUser')
    next('/login')
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
