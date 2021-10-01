import {userConfig} from "@/plugins/config"
import store from '../store/index'

export class Helper {
    getWebsocketBaseUrl(): string {
        if (userConfig.baseUrl.startsWith('https://')) {
            return 'wss://' + userConfig.baseUrl.substring(8, userConfig.baseUrl.length)
        } else {
            return 'ws://' + userConfig.baseUrl.substring(7, userConfig.baseUrl.length)
        }
    }

    translateAnimeEngine(module: string) {
        return store.state.engineModule!.anime.find(value => value.module === module)?.name || module
    }
}
