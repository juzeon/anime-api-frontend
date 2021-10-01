export let userConfig = {
    get baseUrl() {
        return localStorage.getItem("animeBaseUrl") || ''
    },
    set baseUrl(value: string) {
        localStorage.setItem("animeBaseUrl", value)
    },
    get forbidDanmakuList() {
        let storage = localStorage.getItem("animeForbidDanmakuList")
        let results: RegExp[] = []
        if (storage) {
            let arr = JSON.parse(storage)
            for (let str of arr) {
                results.push(new RegExp(str))
            }
        }
        return results
    },
    set forbidDanmakuList(value: RegExp[]) {
        let arr: string[] = []
        for (let regexp of value) {
            arr.push(regexp.toString().substring(1, regexp.toString().length - 1))
        }
        localStorage.setItem('animeForbidDanmakuList', JSON.stringify(arr))
    }
}
