import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Index from '@/views/Index.vue'
import Settings from "@/views/Settings.vue"
import Search from "@/views/Search.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/search/:searchTextPassed',
        name: 'Search',
        component: Search,
        props: true
    }
]

const router = new VueRouter({
    mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
    routes
})

export default router
