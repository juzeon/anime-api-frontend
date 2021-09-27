import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Index from '@/views/Index.vue'
import Settings from "@/views/Settings.vue"

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
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
