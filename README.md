# 聚合查词 dict-aggr

- 代码
  - [Github Repo 链接](https://github.com/zinc0x1E/dict-aggr)
- 访问地址
  - 部署于 Github Pages
  - [链接](https://zinc0x1e.github.io/dict-aggr/)
  - 由于在前端项目中直接爬了人人词典的数据，所以【需要在浏览器端开启 CORS 才可以使用】，否则会提示 "LOOK UP FAILED"
    - Chrome 浏览器可以使用 CORS 插件开启 CORS
  - Github Pages 页面【仅供演示，请勿滥用】，Collins API 只接受每天 1000 次以内的查询

## 聚合的 API / 网站及被利用的数据

- Collins Dictionary
  - 词语定义
  - 几乎所有数据
- 人人词典（未提供API，爬取的数据）
  - 考纲信息，所查单词是否是四级 / 六级考纲词汇

## 开发过程

由于所有数据都来自于其他网站 / 服务，所以本项目被设计为一个纯前端的项目，所有的数据都在浏览器内收集和处理。项目借助 Github Pages 部署，所以也完全无需提供简单的服务端。

数据获取方式有 API 调用和爬虫两部分。API 调用方面使用了 axios。爬虫侧使用了 jsdom 和 jquery 的轻量化替代方案 cheerio。由于人人词典的页面似乎是原生开发的，所以 class name 和 dom 结构清晰可读，数据简单易爬，简单分析所需数据位置就可以爬出来。

UI 上为了简化开发直接使用了 Antd 组件库的 Modal 组件完成弹窗功能。

项目借助 `gh-pages` 插件直接傻瓜式部署上仓库的 github pages 页面。

## 运行

1. 克隆本仓库
2. 新建 `src/secret.json` 文件
3. 在该文件中配置你的 Collins API Key

```json
{
  "COLINS_DICTIONARY_API_KEY": "4c546e37-c9e5-4840-945c-b4f14e3a57b6"
}
```

4. `npm install` & `npm run start`

## Credit

- Collins
- 人人词典
- Github
- React
- Cheerio
- Axios
- Antd