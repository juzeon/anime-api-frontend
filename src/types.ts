export interface IAnimeBySearch {
    category: string,
    cover_url: string,
    description: string,
    engine: string,
    score: number
    title: string
    url: string
}

export interface IEngineModule {
    anime: IAnimeItemOfEngineModule[],
    danmaku: IDanmakuItemOfEngineModule[],
    comic: any[],
    music: any[]
}

export interface IAnimeItemOfEngineModule {
    enable: boolean,
    module: string,
    name: string,
    notes: string,
    quality: number,
    type: string[]
}

export interface IDanmakuItemOfEngineModule {
    enable: boolean,
    module: string,
    name: string,
    notes: string,
    quality: number
}
