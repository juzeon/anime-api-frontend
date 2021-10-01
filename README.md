![](splash.png)

# 另一个 Anime-API 的前端

整合第三方网站的视频和弹幕资源，提供最舒适的看番追剧体验。

## 上游项目

[zaxtyson/AnimeSearcher](https://github.com/zaxtyson/AnimeSearcher)

[zaxtyson/Anime-API](https://github.com/zaxtyson/Anime-API)

## 特性

- 使用 Vue.js + TypeScript 开发；
- 使用 [NPlayer](https://nplayer.js.org/) 代替 [DPlayer](https://github.com/DIYgod/DPlayer)；
- 支持更丰富的弹幕设置：按类型屏蔽、不透明度、显示区域、弹幕速度、字体大小等，并且可以保存弹幕设定；
- 支持按正则表达式屏蔽弹幕；
- 对 iOS 支持更友好，并支持作为 Web App 添加到主屏幕；

## Demo

<https://anime-api-frontend.pages.dev/>

## 环境

Python 3.8+

Node.js 14+

## 安装

### 1.部署运行Anime-API后端

详见：<https://github.com/zaxtyson/Anime-API>

### 2.编译运行本项目

```bash
npm i
npm run build
# 编译后的东西在 dist/ 文件夹中
```

## License

MIT