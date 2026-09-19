/* =========================================================
 * 学术主页 — 站点内容配置文件（日常唯一需要编辑的文件）
 * ---------------------------------------------------------
 * 页面全部内容都在这里配置，由 assets/js/render.js 渲染进页面，
 * 日常更新不需要再改 index.html。
 *
 * 双语字段写法（三种形态任选）：
 *   1. { en: "English", zh: "中文" }  → 中英各一份，点导航按钮自动切换
 *   2. { en: "只有英文" }             → 只在该语言模式下显示（反之亦然）
 *   3. "纯字符串"                     → 不分语言，两种模式下都显示
 *                                      （作者、venue、按钮文字等不想翻译的内容）
 *
 * 注意：
 *   - 字段值可以内联 HTML（<strong> <a> <em> …），会原样插入，请自己保证写法正确；
 *   - 可选字段直接省略（或注释掉），对应行/块自动不渲染；
 *   - teaching / research / talks 的 items 为空数组时，整个栏目连同导航入口一起隐藏；
 *   - bibtex 建议用反引号书写（内容里不能出现 ` 和 ${）；
 *   - nav 数组决定栏目与导航的顺序。
 * ========================================================= */

window.SITE_CONFIG = {

  /* ---------- 站点元信息（写入 <title> 与 <meta>，标题随语言切换） ---------- */
  meta: {
    title:       { en: "Your Name", zh: "你的名字" },
    description: { en: "Academic homepage of Your Name.", zh: "你的名字的学术主页。" },
    author:      "Your Name",
  },

  /* ---------- 导航栏左侧品牌名 ---------- */
  brand: { en: "Your Name", zh: "你的名字" },

  /* ---------- 栏目顺序（可用 id：bio / teaching / research / talks） ---------- */
  nav: ["bio", "teaching", "research", "talks"],

  /* ---------- Bio 简介 ---------- */
  bio: {
    navLabel: { en: "Bio", zh: "简介" },  // 导航文案（Bio 栏没有大标题，单独配一份）

    portrait: {                            // 头像：建议 270×370 竖版（约 3:4）
      src: "assets/img/avatar.svg",
      alt: "Photo of Your Name",
      width: 270,
      height: 370,
    },

    name:     { en: "Your Name", zh: "你的名字" },
    nameNote: { en: "中文名 博士" },        // 英文模式下行内补充的中文名，可省略
    degree:   { en: "Ph.D., XX University", zh: "XX 大学 计算机科学 博士" },
    role:     { en: "Founder & CEO, XXX", zh: "XXX 创始人兼 CEO" },

    // 开头自我介绍段落（可多段）
    intro: [
      {
        en: "Hi, I'm a researcher in computer science. This paragraph is a short self-introduction: where you are now, what you work on, and what excites you. Replace everything in this template that says “Your Name” or “example” with your own information.",
        zh: "你好，我是一名计算机领域的研究者。这一段是简短的自我介绍：你现在的职位、 研究方向，以及让你着迷的问题。请把模板中所有 “Your Name”“example” 占位内容 替换成你自己的信息。",
      },
    ],

    // 高亮提示框（招聘等公告）；不需要就删掉或注释掉整个字段
    callout: {
      en: "<strong>We are hiring!</strong> <em>This callout is for announcements such as recruiting: replace or delete it if not needed.</em>",
      zh: "<strong>诚聘英才！</strong> <em>这个高亮提示框可用于招聘等公告，不需要时请替换或删除。</em>",
    },

    // 提示框之后的段落（可多段）
    paragraphs: [
      {
        en: "I received my BEng/BS degree from XX University in 20XX, where I worked on deep learning and computer vision. My research has been supported by example fellowships and gifts.",
        zh: "我于 20XX 年在 XX 大学获得学士学位，期间从事深度学习与计算机视觉方面的研究。 我的研究工作曾获得多项示例奖学金与企业捐赠的支持。",
      },
    ],

    // 「Update」里程碑段落（自动带前置分隔线），可省略
    update: {
      en: "<strong>Update 2026.09:</strong> This is an example “Update” paragraph — use it for milestones such as thesis defense, awards, or big releases.",
      zh: "<strong>2026.09 更新：</strong>这是一个「更新」示例段落 —— 可用于记录答辩、获奖、重要发布等里程碑。",
    },

    // 动态分组（项目动态 / 社区动态…组数不限，共用一条前置分隔线）
    newsGroups: [
      {
        heading: { en: "<strong>Project news</strong>:", zh: "<strong>项目动态</strong>：" },
        items: [
          {
            en: "(Sept 2026) Example news item with a <a href=\"#\">link</a>.",
            zh: "（2026 年 9 月）带<a href=\"#\">链接</a>的示例动态。",
          },
          { en: "(Jun 2026) Another example news item.", zh: "（2026 年 6 月）另一条示例动态。" },
        ],
      },
      {
        heading: { en: "<strong>Community news</strong>:", zh: "<strong>社区动态</strong>：" },
        items: [
          { en: "Example bullet item.", zh: "示例列表项。" },
          { en: "Another example bullet item.", zh: "另一条示例列表项。" },
        ],
      },
    ],

    // 联系方式（自动带前置分隔线），可省略
    email: {
      en: "<strong>Email</strong>: yourname <em>at</em> example <em>dot</em> com",
      zh: "<strong>邮箱</strong>：yourname <em>at</em> example <em>dot</em> com",
    },

    // 简介下方的链接按钮（label 不分语言）
    links: [
      { label: "GitHub",         href: "https://github.com/yourname" },
      { label: "Google Scholar", href: "https://scholar.google.com" },
      { label: "CV",             href: "#" },
    ],

    // 折叠面板（Education / Interests / News…），顺序即显示顺序，可增删
    accordions: [
      {
        title: { en: "Education", zh: "教育经历" },
        open: true,                        // 默认展开；省略则默认收起
        style: "edu",                      // "edu" = 学位 + 时间格式；"list" = 普通列表（默认）
        items: [
          {
            degree: { en: "PhD in Computer Science, XX University", zh: "XX 大学 计算机科学 博士" },
            time: "2021.9 – 2026.6",       // 时间两种语言都显示
          },
          {
            degree: { en: "BEng in Computer Science, YY University", zh: "YY 大学 计算机科学 工学士" },
            time: "2017.9 – 2021.6",
          },
        ],
      },
      {
        title: { en: "Interests", zh: "研究兴趣" },
        items: [
          { en: "Computer graphics",          zh: "计算机图形学" },
          { en: "Compilers",                  zh: "编译器" },
          { en: "Physical simulation",        zh: "物理仿真" },
          { en: "High-performance computing", zh: "高性能计算" },
          { en: "Deep learning",              zh: "深度学习" },
          { en: "Computer vision",            zh: "计算机视觉" },
        ],
      },
      {
        title: { en: "News", zh: "动态" },
        items: [
          {
            en: "Will give an example talk somewhere on Oct 29, 2026. Welcome!",
            zh: "将于 2026 年 10 月 29 日在某处做示例报告，欢迎参加！",
          },
          {
            en: "Will teach an example course at a conference.",
            zh: "将在某学术会议讲授示例课程。",
          },
          { en: "An old example news item.", zh: "一条更早的示例动态。" },
        ],
      },
    ],
  },

  /* ---------- Teaching 教学（items 为空数组时整个栏目隐藏） ---------- */
  teaching: {
    title: { en: "Teaching", zh: "教学" },
    items: [
      {
        image: "assets/img/thumb-1.svg",  // 也可以写 { src: "...", alt: "..." }
        link:  "#",                       // 课程页面链接，可省略
        title: {
          en: "(CS 000) Advanced Topics in Example Systems, 2026",
          zh: "（CS 000）示例系统前沿专题 · 2026",
        },
        desc: {
          en: "Fall 2026 course. The math and code behind example systems, hands-on.",
          zh: "2026 年秋季学期课程。动手实践示例系统背后的数学与代码。",
        },
        date: {
          en: "Last updated on Sep 1, 2026",
          zh: "最后更新于 2026 年 9 月 1 日",
        },
      },
      {
        image: "assets/img/thumb-4.svg",
        link: "#",
        title: {
          en: "Guest Lecture: An Introduction to Academic Homepages",
          zh: "客座讲座：学术主页入门",
        },
        desc: {
          en: "Spring 2026 guest lecture. How to present yourself and your research online.",
          zh: "2026 年春季学期客座讲座。如何在互联网上展示自己与自己的研究。",
        },
        date: {
          en: "Last updated on Mar 12, 2026",
          zh: "最后更新于 2026 年 3 月 12 日",
        },
      },
    ],
  },

  /* ---------- Research 科研（论文列表） ---------- */
  research: {
    title: { en: "Research", zh: "科研" },
    items: [
      {
        title: {
          en: "The Example Thesis: High-Performance and Differentiable Visual Computing",
          zh: "示例博士论文：高性能与可微视觉计算",
        },
        link:  "#",                       // 标题与缩略图共用；省略则不加链接
        image: "assets/img/thumb-2.svg",  // 省略则无缩略图、自动单栏布局
        venue: "Ph.D. Thesis, XX University, 2026",   // 不分语言
        abstract: {
          en: "Everything about the example framework, from language design to compiler implementation.",
          zh: "关于示例框架的一切：从语言设计到编译器实现。",
        },
        authors: "Your Name",             // 不分语言
        links: [                          // 按钮顺序即显示顺序，可写任意自定义按钮
          { label: "PDF", href: "#" },
          { cite: true },                 // Cite 按钮；未配 bibtex 时自动省略
          { label: "Code", href: "#" },
        ],
        bibtex: `@phdthesis{name2026example,
  title  = {The Example Thesis: High-Performance and Differentiable Visual Computing},
  author = {Name, Your},
  school = {XX University},
  year   = {2026}
}`,
      },
      {
        title: {
          en: "An Example Paper: Doing More with Less Memory",
          zh: "示例论文：用更少的内存做更多的事",
        },
        link: "#",
        image: "assets/img/thumb-3.svg",
        venue: "SIGGRAPH 2026",
        abstract: {
          en: "Simulate more with less memory, using an example quantization compiler.",
          zh: "使用示例量化编译器，以更少的内存模拟更多的内容。",
        },
        authors: "Your Name, A. Collaborator, B. Collaborator, C. Collaborator",
        links: [
          { label: "PDF", href: "#" },
          { cite: true },
          { label: "Code", href: "#" },
          { label: "Video", href: "#" },
        ],
        bibtex: `@inproceedings{name2026paper,
  title     = {An Example Paper: Doing More with Less Memory},
  author    = {Name, Your and Collaborator, A. and Collaborator, B. and Collaborator, C.},
  booktitle = {ACM SIGGRAPH 2026},
  year      = {2026}
}`,
      },
      {
        title: {
          en: "A Differentiable Example: End-to-End Learning for Physical Simulation",
          zh: "可微示例：面向物理仿真的端到端学习",
        },
        link: "#",
        image: "assets/img/thumb-4.svg",
        venue: "ICLR 2025 (Spotlight)",
        abstract: {
          en: "A virtual environment for <strong>differentiable</strong> example-based manipulation.",
          zh: "一个面向<strong>可微</strong>示例操作的虚拟环境。",
        },
        authors: "Your Name, A. Collaborator, B. Collaborator, C. Collaborator",
        links: [
          { label: "PDF", href: "#" },
          { cite: true },
          { label: "Code", href: "#" },
          { label: "Video", href: "#" },
        ],
        bibtex: `@inproceedings{name2025differentiable,
  title     = {A Differentiable Example: End-to-End Learning for Physical Simulation},
  author    = {Name, Your and Collaborator, A. and Collaborator, B. and Collaborator, C.},
  booktitle = {ICLR},
  year      = {2025}
}`,
      },
      {
        title: {
          en: "Another Example: A Hands-on Tutorial for Beginners",
          zh: "再来一例：面向初学者的动手教程",
        },
        link: "#",
        image: "assets/img/thumb-1.svg",
        venue: "SIGGRAPH 2025 Courses",
        abstract: {
          en: "An introductory tutorial on the example framework.",
          zh: "示例框架的入门教程。",
        },
        authors: "Your Name",
        links: [
          { label: "PDF", href: "#" },
          { cite: true },
          { label: "Video", href: "#" },
        ],
        bibtex: `@inproceedings{name2025tutorial,
  title     = {Another Example: A Hands-on Tutorial for Beginners},
  author    = {Name, Your},
  booktitle = {SIGGRAPH Courses},
  year      = {2025}
}`,
      },
      {
        title: {
          en: "An Early Example: The First Steps",
          zh: "早期示例：第一步",
        },
        link: "#",
        image: "assets/img/thumb-2.svg",
        venue: "CVPR 2024",
        abstract: {
          en: "A deep-learning-based example algorithm that adaptively selects high-confidence regions.",
          zh: "一种基于深度学习的示例算法，可自适应地选择高置信度区域。",
        },
        authors: "Your Name, A. Collaborator, B. Collaborator",
        links: [
          { label: "PDF", href: "#" },
          { cite: true },
          { label: "Code", href: "#" },
        ],
        bibtex: `@inproceedings{name2024early,
  title     = {An Early Example: The First Steps},
  author    = {Name, Your and Collaborator, A. and Collaborator, B.},
  booktitle = {CVPR},
  year      = {2024}
}`,
      },
    ],
  },

  /* ---------- Talks 报告（结构同 research，date 为双语字段） ---------- */
  talks: {
    title: { en: "Talks", zh: "报告" },
    items: [
      {
        title: {
          en: "How to Build an Academic Homepage with One HTML File",
          zh: "如何用一个 HTML 文件搭建学术主页",
        },
        link: "#",
        image: "assets/img/thumb-2.svg",
        abstract: {
          en: "“An example talk about presenting your research online, step by step.”",
          zh: "「一个关于如何在线展示科研成果的分步示例报告。」",
        },
        date: { en: "Oct 29, 2026", zh: "2026 年 10 月 29 日" },
        links: [
          { label: "Slides", href: "#" },
          { label: "Video", href: "#" },
        ],
      },
      {
        title: {
          en: "Another Example Talk: From Research to Product",
          zh: "另一场示例报告：从科研到产品",
        },
        link: "#",
        image: "assets/img/thumb-3.svg",
        abstract: {
          en: "“An example talk about turning research prototypes into products.”",
          zh: "「一个关于如何把科研原型做成产品的示例报告。」",
        },
        date: { en: "Jul 12, 2025", zh: "2025 年 7 月 12 日" },
        links: [
          { label: "Slides", href: "#" },
        ],
      },
    ],
  },

  /* ---------- 页脚 ---------- */
  footer: {
    name: { en: "Your Name", zh: "你的名字" },
    note: {
      en: "Layout inspired by <a href=\"https://yuanming.taichi.graphics/\">Yuanming Hu's homepage</a>. Built with plain HTML/CSS/JS — no framework, no build step.",
      zh: "页面布局模仿<a href=\"https://yuanming.taichi.graphics/\">胡渊鸣的主页</a>。 纯 HTML/CSS/JS 构建 —— 无框架、无构建步骤。",
    },
  },
};
