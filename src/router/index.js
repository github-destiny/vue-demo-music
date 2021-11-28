import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home/home'
import Listened from '../pages/listened/listened'
import Recommend from '../pages/recommend/recommend'
import Search from '../pages/search/search'

Vue.use(VueRouter)

export default new VueRouter({
    routes : [
        // 默认主页
        {
            path : '/',
            component : Listened
        },
        {
            path : '/home',
            component : Home
        },
        {
            path : '/listened',
            component : Listened
        },
        {
            path : '/recommend',
            component : Recommend
        },
        {
            path : '/search',
            component : Search
        }
    ]
})
