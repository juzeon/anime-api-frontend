export let userConfig = {
    get baseUrl() {
        return localStorage.getItem("animeBaseUrl") || ''
    },
    set baseUrl(value: string) {
        localStorage.setItem("animeBaseUrl", value)
    }
}
