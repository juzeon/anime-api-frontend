import Vue from 'vue'
import Vuex from 'vuex'
import {userConfig} from "@/plugins/config"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseUrl: userConfig.baseUrl
    },
    mutations: {
        setBaseUrl(state, value: string) {
            userConfig.baseUrl = value
            state.baseUrl = value
        }
    },
    actions: {},
    modules: {}
})
