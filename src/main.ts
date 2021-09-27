import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import {appAxios} from "@/plugins/axios"
import {ISwal, swal} from "@/plugins/swal"
import {AxiosInstance} from "axios"

Vue.config.productionTip = false

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance,
        $swal: ISwal
    }
}
Vue.prototype.$axios = appAxios
Vue.prototype.$swal = swal

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
