import Vue from 'vue'
import Vuex from 'vuex'
import {userConfig} from "@/plugins/config"
import {IEngineModule} from "@/types"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseUrl: userConfig.baseUrl,
        searchText: '',
        engineModule: undefined as undefined | IEngineModule
    },
    mutations: {
        setBaseUrl(state, value: string) {
            userConfig.baseUrl = value
            state.baseUrl = value
        },
        setSearchText(state, value: string) {
            state.searchText = value
        },
        setEngineModule(state, value: IEngineModule) {
            state.engineModule = value
        }
    },
    actions: {},
    modules: {}
})
