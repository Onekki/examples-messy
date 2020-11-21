import Vue from 'vue'
import Router from 'vue-router'
import Main from '../view/main'
import Error_404 from '../view/404'
import Home from '../view/home'
import Login from '../view/sys/login'
import User from '../view/sys/user'

import repo from '@/repository'
import store from "@/store";

Vue.use(Router)

export const publicRouteMap = [
    {
        name: '首页',
        path: '/',
        component: Main,
        children: [{
            path: 'home',
            component: Home
        }]
    }, {
        name: '登录',
        path: '/login',
        component: Login
    }, {
        name: 'not found',
        path: '/404',
        component: Error_404
    }
]
export const needPermRouteMap = [
    {
        name: '系统功能',
        path: '/sys',
        component: Main,
        meta: {
            title: '用户权限',
            icon: 'table'
        },
        children: [
            {
                name: '用户列表',
                path: '/user',
                component: User,
                meta: {
                    title: '用户列表',
                    icon: 'user'
                },
                permCode: 'user:list'
            }, {
                name: '角色管理',
                path: '/home',
                component: Main,
                meta: {
                    title: '角色管理',
                    icon: 'password'
                },
                permCode: 'role:list'
            }
        ]
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new Router({
    mode: 'history',
    routes: publicRouteMap
})

console.log("router0", router)

router.beforeEach((to, from, next) => {
    console.log("0", to, from)
    if (repo.appRepo.hasLogin()) {
        console.log("1")
        if (to.path === '/login') {
            console.log("2")
            next('/')
        } else if (!store.getters.gUserPerms || !store.getters.gUserPerms.length) {
            console.log("3")
            store.dispatch('aListUserPerm').then(() => {
                console.log("4")
                console.log(router)
                next({...to})
            })
        } else {
            console.log("5")
            console.log(router)
            next()
        }
    } else if (['/login', '/404'].indexOf(to.path) !== -1) {
        console.log("6")
        next()
    } else {
        console.log("7")
        store.commit('maResetUser')
        next('/login')
    }
})

export default router

