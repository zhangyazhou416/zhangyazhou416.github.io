# 学术主页模板

模仿 [Yuanming Hu 的学术主页](https://yuanming.taichi.graphics/)（Wowchemy Academic 主题风格）编写的**纯静态模板**：只有 HTML + CSS + 原生 JS，无框架、无构建步骤，直接丢进 GitHub Pages 就能用。

内置 **深色模式** 与 **中英双语切换**。全部内容集中在 `config.js`，日常更新**不需要改 HTML**。

## 本地预览

```bash
# 在仓库根目录下任选其一
python3 -m http.server 8000
# 或者直接双击 index.html 用浏览器打开（功能也正常）
```

然后访问 <http://localhost:8000>。

## 目录结构

```
.
├── index.html              # 页面骨架（导航/弹窗外壳），日常不需要编辑
├── config.js               # ★ 全部页面内容 —— 日常唯一需要编辑的文件
├── assets
│   ├── css/style.css       # 样式；配色在顶部 :root 变量里（含深色模式块）
│   ├── js/render.js        # 读取 config.js，把内容渲染成页面
│   ├── js/main.js          # 移动端菜单 / 滚动高亮 / Cite 弹窗 / 深色模式 / 中英切换
│   └── img/                # 头像、论文缩略图、favicon（当前全是 SVG 占位图）
└── README.md
```

## 如何改成你自己的

**打开 `config.js`，把占位内容换成你的信息即可**，每个字段都有注释说明：

| 内容 | 怎么改 |
| --- | --- |
| 名字 / 标题 / 导航品牌 | `meta.title`、`brand`（中英两份都要改） |
| 头像 | 图片放到 `assets/img/`，改 `bio.portrait.src`，建议 270×370（约 3:4 竖版） |
| 简介、新闻、Email | `bio` 里 `intro` / `callout` / `update` / `newsGroups` / `email` 各字段，不需要的整段删掉即可 |
| 教育 / 兴趣 / News 折叠面板 | `bio.accordions` 数组，可增删整块 |
| 论文 | 在 `research.items` 数组里加一个对象：标题、venue、摘要、作者、链接、BibTeX |
| 教学 / 报告 | `teaching.items` / `talks.items` 数组 |
| 主题色 | `assets/css/style.css` 顶部的 `--primary`（浅色默认 `#1111aa`，与原站一致；深色下自动提亮为 `#8b93ff`） |
| 深色配色 | `style.css` 中 `:root[data-theme="dark"]` 一块 |
| 字体 | `<head>` 里的 Google Fonts 链接 + `style.css` 顶部 `--font-*` 变量 |
| favicon | `assets/img/favicon.svg` |

三个最常见的操作示例：

```js
// ① 加一篇论文：往 research.items 数组末尾追加一个对象
{
  title: { en: "My New Paper", zh: "我的新论文" },
  link: "https://doi.org/…",
  image: "assets/img/new-paper.png",      // 省略则无缩略图
  venue: "SIGGRAPH 2027",
  abstract: { en: "One-sentence summary.", zh: "一句话摘要。" },
  authors: "Your Name, X. Someone",
  links: [
    { label: "PDF", href: "papers/new.pdf" },
    { cite: true },                        // Cite 按钮，配合下面的 bibtex
    { label: "Code", href: "https://github.com/…" },
  ],
  bibtex: `@inproceedings{you2027new,
    title     = {My New Paper},
    author    = {You, Your Name and Someone, X.},
    booktitle = {SIGGRAPH},
    year      = {2027}
  }`,
}

// ② 加一条动态：往 bio.newsGroups 某个组的 items 里追加
{ en: "(Jan 2027) Paper accepted!", zh: "（2027 年 1 月）论文被接收！" }

// ③ 暂时隐藏教学栏：把 teaching.items 清空（连导航入口一起隐藏）
teaching: { title: { en: "Teaching", zh: "教学" }, items: [] },
```

## 双语怎么写

`config.js` 里的文本字段有三种形态：

```js
{ en: "English text", zh: "中文内容" }  // 中英各一份，点导航按钮自动切换
{ en: "中文补充说明" }                   // 只在英文模式显示（反之亦然）
"不分语言的纯文本"                       // 两种模式下都显示（作者、venue、按钮文字等）
```

渲染器会把前两种生成带 `lang` 属性的元素，CSS 按 `html[data-lang]` 自动显隐对应语言，**不需要**维护任何文案字典。字段值里可以写内联 HTML（`<strong>` `<a>` `<em>` …）。

- 访客首次打开时跟随浏览器语言（`navigator.language`），点导航栏的「中文 / EN」按钮后偏好存入 localStorage；
- `nav` 数组控制栏目与导航的顺序；某栏目 `items` 为空时，栏目与导航入口自动一起隐藏。

## 架构与注意事项

- 三支脚本在 `<body>` 末尾**按序同步加载**：`config.js`（定义 `window.SITE_CONFIG`）→ `render.js`（渲染内容）→ `main.js`（绑定交互）。**不要**给它们加 `async`/`defer`，也不要改用 `fetch` 读 JSON —— `file://` 协议下 fetch 会被 CORS 拦截，而 `<script>` 标签没有这个问题。
- `config.js` 的内容按 HTML 原样插入（与直接改 HTML 的信任模型相同），请自己保证写法正确；`bibtex` 用反引号模板字符串书写，内容里不能出现 `` ` `` 和 `${`。
- **无 JS / SEO 降级**：内容已移出 HTML，禁用 JS 时正文为空（页面会显示双语提示）；不执行 JS 的爬虫（包括 Google Scholar 的抓取器）抓不到内容。这是「日常不改 HTML」换来的代价，若极看重搜索引擎收录请知悉。

## 功能说明

- **内容配置化**：全部内容在 `config.js`，渲染器生成与原静态页完全一致的 DOM，样式零特殊处理。
- **深色模式**：默认跟随系统 `prefers-color-scheme`，手动切换后记忆偏好；`<head>` 里的启动脚本在首帧渲染前就设好主题，**刷新不闪白**；浏览器深浅色实时变化时自动跟随（未手动选择时）。
- **中英双语**：CSS 显隐方案，零依赖；页面标题（`<title>`）也随语言切换。
- **滚动高亮导航**：滚动页面时导航栏自动点亮当前所在小节（IntersectionObserver）。
- **Cite 弹窗**：点击论文的 *Cite* 按钮弹出 BibTeX，支持一键 Copy 和下载 `.bib`。
- **折叠面板**：Education / Interests / News 用原生 `<details>` 实现，无 JS 依赖。
- **移动端适配**：窄屏下汉堡菜单、单栏布局。
- **无任何外部 JS 依赖**；唯一的网络请求是 Google Fonts（国内访问慢可删除该 `<link>`，会自动退回系统字体）。

## 部署到 GitHub Pages

1. 把文件推到 `zhangyazhou416/zhangyazhou416.github.io` 仓库的默认分支；
2. Settings → Pages 选择「Deploy from a branch」即可，无需 Actions。

## 说明

- 页面布局模仿自 Yuanming Hu 的主页（Wowchemy 主题观感），页脚已附来源致谢；仅供个人主页参考使用。
- 所有示例论文、课程均为占位内容，发布前记得在 `config.js` 里替换。
