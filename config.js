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
    title:       { en: "Yazhou Zhang's Academic Homepage", zh: "张亚州的个人学术页面" },
    description: { en: "Academic homepage of Yazhou Zhang.", zh: "张亚州的学术主页。" },
    author:      "Yazhou Zhang",
  },

  /* ---------- 导航栏左侧品牌名 ---------- */
  brand: { en: "Yazhou Zhang", zh: "张亚州" },

  /* ---------- 栏目顺序（可用 id：bio / teaching / research / talks） ---------- */
  nav: ["bio", "teaching", "research", "talks"],

  /* ---------- Bio 简介 ---------- */
  bio: {
    navLabel: { en: "Bio", zh: "简介" },  // 导航文案（Bio 栏没有大标题，单独配一份）

    portrait: {                            // 头像：建议 270×370 竖版（约 3:4）
      src: "assets/img/avatar.svg",
      alt: "Photo of Yazhou Zhang",
      width: 270,
      height: 370,
    },

    name:     { en: "Yazhou Zhang", zh: "张亚州" },
    degree:   { en: "Ph.D., Xinjiang Astronomical Observatory", zh: "新疆天文台 天文技术与方法博士" },
    role:     { en: "Engineer", zh: "中级工程师" },

    // 头像下方的社交图标（点击跳转）；icon 可选：
    //   zhihu / bilibili / github / gitlab / gitee / orcid / email / homepage / scholar
    // 不需要的整行删掉，href 换成你自己的主页链接
    social: [
      { icon: "zhihu",    href: "https://www.zhihu.com/people/zhangyazhou416", title: "知乎" },        // TODO: 换成知乎个人主页
      { icon: "bilibili", href: "https://space.bilibili.com/99076000", title: "哔哩哔哩" },     // TODO: 换成 B 站个人主页
      { icon: "github",   href: "https://github.com/zhangyazhou416", title: "GitHub" },
      { icon: "gitlab",   href: "https://gitlab.com/zhangyazhou416", title: "GitLab" },      // TODO: 换成 GitLab 个人主页
      { icon: "gitee",    href: "https://gitee.com/zhangyazhou416", title: "Gitee" },       // TODO: 换成 Gitee 个人主页
      { icon: "orcid",    href: "https://orcid.org/0000-0001-6046-2950", title: "ORCID" },  // TODO: 换成你的 ORCID 主页（https://orcid.org/xxxx-xxxx-xxxx-xxxx）
    ],

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
      en: "<strong>Email</strong>: zhangyazhou <em>at</em> xao <em>dot</em> ac <em>dot</em> cn",
      zh: "<strong>邮箱</strong>：zhangyazhou <em>at</em> xao <em>dot</em> ac <em>dot</em> cn",
    },

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
        title: "INGAD: Asynchronous acknowledgment channel decoupling for high-throughput data archiving in radio astronomy",
        link: "https://doi.org/10.1016/j.ascom.2026.101192",
        venue: "Astronomy and Computing, 2027",
        authors: "Jie Wang, Hai-long Zhang, Bo Wang, Xin-chen Ye, Ya-zhou Zhang, Hong-mei Tang, Ting Zhang, Wan-qiong Wang, Jia Li, Xu Du, Wen-na Cai, Yu-yue Jiao",
        links: [
          { label: "DOI", href: "https://doi.org/10.1016/j.ascom.2026.101192" },
          { cite: true },
        ],
        bibtex: `@article{wang2027ingad,
  title     = {INGAD: Asynchronous acknowledgment channel decoupling for high-throughput data archiving in radio astronomy},
  author    = {Wang, Jie and Zhang, Hai-long and Wang, Bo and Ye, Xin-chen and Zhang, Ya-zhou and Tang, Hong-mei and Zhang, Ting and Wang, Wan-qiong and Li, Jia and Du, Xu and Cai, Wen-na and Jiao, Yu-yue},
  journal   = {Astronomy and Computing},
  year      = {2027},
  month     = {01},
  doi       = {10.1016/j.ascom.2026.101192}
}`,
      },
      {
        title: "An Oversampled Polyphase Filter Bank Channelization Algorithm for Molecular Spectral Line Data",
        link: "https://doi.org/10.1088/1674-4527/ae6a78",
        venue: "Research in Astronomy and Astrophysics, 2026",
        authors: "Ting Zhang, Hai-Long Zhang, Ya-Zhou Zhang, Jie Wang, Hong-Mei Tang, Jian Li, Xin-Chen Ye, Xu Du, Wen-Na Cai, Yu-Yue Jiao",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ae6a78" },
          { cite: true },
        ],
        bibtex: `@article{zhang2026an,
  title     = {An Oversampled Polyphase Filter Bank Channelization Algorithm for Molecular Spectral Line Data},
  author    = {Zhang, Ting and Zhang, Hai-Long and Zhang, Ya-Zhou and Wang, Jie and Tang, Hong-Mei and Li, Jian and Ye, Xin-Chen and Du, Xu and Cai, Wen-Na and Jiao, Yu-Yue},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2026},
  month     = {11},
  doi       = {10.1088/1674-4527/ae6a78}
}`,
      },
      {
        title: "A CAViT-UNet Hybrid Architecture Method for Radio Frequency Interference Segmentation",
        link: "https://doi.org/10.1088/1674-4527/aea1ef",
        venue: "Research in Astronomy and Astrophysics, 2026",
        authors: "Hongmei TANG, hailong zhang, Yuyue JIAO, Zhang Yazhou, Jie WANG, Xinchen YE, Jia LI, Wanqiong WANG, Ting ZHANG, Xu Du, Wen-na CAI",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/aea1ef" },
          { cite: true },
        ],
        bibtex: `@article{tang2026a,
  title     = {A CAViT-UNet Hybrid Architecture Method for Radio Frequency Interference Segmentation},
  author    = {TANG, Hongmei and zhang, hailong and JIAO, Yuyue and Yazhou, Zhang and WANG, Jie and YE, Xinchen and LI, Jia and WANG, Wanqiong and ZHANG, Ting and Du, Xu and CAI, Wen-na},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2026},
  month     = {09},
  doi       = {10.1088/1674-4527/aea1ef}
}`,
      },
      {
        title: "An UWB digital backend system based on OS-PFB algorithm for QTT",
        link: "https://doi.org/10.1088/1674-4527/aea0b4",
        venue: "Research in Astronomy and Astrophysics, 2026",
        authors: "hailong zhang, Zhang Yazhou, Xinchen YE, Shaocong GUO, Hao Yan, Jianping Yuan, Na Wang, Qiao Meng, Jian Li, Jie WANG, Hongmei TANG, Xu Du, Wen-na CAI, Ting ZHANG, Yuyue JIAO",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/aea0b4" },
          { cite: true },
        ],
        bibtex: `@article{zhang2026anb,
  title     = {An UWB digital backend system based on OS-PFB algorithm for QTT},
  author    = {zhang, hailong and Yazhou, Zhang and YE, Xinchen and GUO, Shaocong and Yan, Hao and Yuan, Jianping and Wang, Na and Meng, Qiao and Li, Jian and WANG, Jie and TANG, Hongmei and Du, Xu and CAI, Wen-na and ZHANG, Ting and JIAO, Yuyue},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2026},
  month     = {08},
  doi       = {10.1088/1674-4527/aea0b4}
}`,
      },
      {
        title: "The Design and Implementation of an Ultrawideband Digital Backend Visualization Control System Based on gRPC",
        link: "https://doi.org/10.3847/1538-3881/ae7b35",
        venue: "The Astronomical Journal, 2026",
        authors: "Xin-chen Ye, Hai-long Zhang, Ya-zhou Zhang, Shao-cong Guo, Jie Wang, Hong-mei Tang, Jian Li, Xu Du, Wen-na Cai, Ting Zhang, Yu-yue Jiao",
        links: [
          { label: "DOI", href: "https://doi.org/10.3847/1538-3881/ae7b35" },
          { cite: true },
        ],
        bibtex: `@article{ye2026the,
  title     = {The Design and Implementation of an Ultrawideband Digital Backend Visualization Control System Based on gRPC},
  author    = {Ye, Xin-chen and Zhang, Hai-long and Zhang, Ya-zhou and Guo, Shao-cong and Wang, Jie and Tang, Hong-mei and Li, Jian and Du, Xu and Cai, Wen-na and Zhang, Ting and Jiao, Yu-yue},
  journal   = {The Astronomical Journal},
  year      = {2026},
  month     = {08},
  doi       = {10.3847/1538-3881/ae7b35}
}`,
      },
      {
        title: "Data Products and Retrieval Methods of 74 Pulsars from the Nanshan 25 m Radio Telescope",
        link: "https://doi.org/10.1088/1674-4527/ae5619",
        venue: "Research in Astronomy and Astrophysics, 2026",
        authors: "Hai-Long Zhang, Jie Wang, Jian-Ping Yuan, Ya-Zhou Zhang, Ju-Mei Yao, Na Wang, Xin-Chen Ye, Hong-Mei Tang, Wan-Qiong Wang, Jia Li, Xu Du, Wen-Na Cai, Ting Zhang, Yu-Yue Jiao, Bo Wang",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ae5619" },
          { cite: true },
        ],
        bibtex: `@article{zhang2026data,
  title     = {Data Products and Retrieval Methods of 74 Pulsars from the Nanshan 25 m Radio Telescope},
  author    = {Zhang, Hai-Long and Wang, Jie and Yuan, Jian-Ping and Zhang, Ya-Zhou and Yao, Ju-Mei and Wang, Na and Ye, Xin-Chen and Tang, Hong-Mei and Wang, Wan-Qiong and Li, Jia and Du, Xu and Cai, Wen-Na and Zhang, Ting and Jiao, Yu-Yue and Wang, Bo},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2026},
  month     = {07},
  doi       = {10.1088/1674-4527/ae5619}
}`,
      },
      {
        title: "URANUS: Ultra-wideband Radio Astronomy Novel Utility for Shared Ring Buffer Pipeline",
        link: "https://doi.org/10.3847/1538-3881/ae6066",
        venue: "The Astronomical Journal, 2026",
        authors: "Ya-Zhou Zhang, Hai-Long Zhang, Xin-Chen Ye, Shao-Cong Guo, Jie Wang, Hong-Mei Tang, Jian Li, Xu Du, Wen-Na Cai, Ting Zhang, Yu-Yue Jiao",
        links: [
          { label: "DOI", href: "https://doi.org/10.3847/1538-3881/ae6066" },
          { cite: true },
        ],
        bibtex: `@article{zhang2026uranus,
  title     = {URANUS: Ultra-wideband Radio Astronomy Novel Utility for Shared Ring Buffer Pipeline},
  author    = {Zhang, Ya-Zhou and Zhang, Hai-Long and Ye, Xin-Chen and Guo, Shao-Cong and Wang, Jie and Tang, Hong-Mei and Li, Jian and Du, Xu and Cai, Wen-Na and Zhang, Ting and Jiao, Yu-Yue},
  journal   = {The Astronomical Journal},
  year      = {2026},
  month     = {06},
  doi       = {10.3847/1538-3881/ae6066}
}`,
      },
      {
        title: "Research on Multiclassification Algorithm of Ultrawideband Pulsar RFI Based on MobileNetV2",
        link: "https://doi.org/10.3847/1538-3881/ae2ad5",
        venue: "The Astronomical Journal, 2026",
        authors: "Wenna Cai, Hailong Zhang, Yazhou Zhang, Jie Wang, Xu Du, Ting Zhang, Yuyue Jiao, Hongmei Tang, Xinchen Ye, Wanqiong Wang, Jia Li",
        links: [
          { label: "DOI", href: "https://doi.org/10.3847/1538-3881/ae2ad5" },
          { cite: true },
        ],
        bibtex: `@article{cai2026research,
  title     = {Research on Multiclassification Algorithm of Ultrawideband Pulsar RFI Based on MobileNetV2},
  author    = {Cai, Wenna and Zhang, Hailong and Zhang, Yazhou and Wang, Jie and Du, Xu and Zhang, Ting and Jiao, Yuyue and Tang, Hongmei and Ye, Xinchen and Wang, Wanqiong and Li, Jia},
  journal   = {The Astronomical Journal},
  year      = {2026},
  month     = {02},
  doi       = {10.3847/1538-3881/ae2ad5}
}`,
      },
      {
        title: "A Dual Polyphase Decomposition Overlapped Polyphase Filter Bank and Its Implementation in a Field-programmable Gate Array",
        link: "https://doi.org/10.3847/1538-4365/ade236",
        venue: "The Astrophysical Journal Supplement Series, 2025",
        authors: "Shaocong Guo, Qiao Meng, Hailong Zhang, Yazhou Zhang, Chenye Zhou, Gaojing Li, Jie Wu, Jianxun Shao",
        links: [
          { label: "DOI", href: "https://doi.org/10.3847/1538-4365/ade236" },
          { cite: true },
        ],
        bibtex: `@article{guo2025a,
  title     = {A Dual Polyphase Decomposition Overlapped Polyphase Filter Bank and Its Implementation in a Field-programmable Gate Array},
  author    = {Guo, Shaocong and Meng, Qiao and Zhang, Hailong and Zhang, Yazhou and Zhou, Chenye and Li, Gaojing and Wu, Jie and Shao, Jianxun},
  journal   = {The Astrophysical Journal Supplement Series},
  year      = {2025},
  month     = {08},
  doi       = {10.3847/1538-4365/ade236}
}`,
      },
      {
        title: "Research on Rationally Oversampled Channelization Algorithm for Ultra-wideband Signals",
        link: "https://doi.org/10.1088/1674-4527/adbb56",
        venue: "Research in Astronomy and Astrophysics, 2025",
        authors: "Xu Du, Hai-Long Zhang, Shao-Cong Guo, Ya-Zhou Zhang, Jie Wang, Xin-Chen Ye, Jian Li, Wen-Na Cai, Han Wu, Ting Zhang",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/adbb56" },
          { cite: true },
        ],
        bibtex: `@article{du2025research,
  title     = {Research on Rationally Oversampled Channelization Algorithm for Ultra-wideband Signals},
  author    = {Du, Xu and Zhang, Hai-Long and Guo, Shao-Cong and Zhang, Ya-Zhou and Wang, Jie and Ye, Xin-Chen and Li, Jian and Cai, Wen-Na and Wu, Han and Zhang, Ting},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2025},
  month     = {03},
  doi       = {10.1088/1674-4527/adbb56}
}`,
      },
      {
        title: "An Ultrawide Bandwidth Digital Backend System Based on PFB Algorithm for QTT",
        link: "https://doi.org/10.3847/1538-3881/ad7fe0",
        venue: "The Astronomical Journal, 2024",
        authors: "Hai-long Zhang, Ya-zhou Zhang, Shao-cong Guo, Xu Du, Na Wang, Jie Wang, Xin-chen Ye, Han Wu, Jian Li, Xin Pei, Qiao Meng",
        links: [
          { label: "DOI", href: "https://doi.org/10.3847/1538-3881/ad7fe0" },
          { cite: true },
        ],
        bibtex: `@article{zhang2024an,
  title     = {An Ultrawide Bandwidth Digital Backend System Based on PFB Algorithm for QTT},
  author    = {Zhang, Hai-long and Zhang, Ya-zhou and Guo, Shao-cong and Du, Xu and Wang, Na and Wang, Jie and Ye, Xin-chen and Wu, Han and Li, Jian and Pei, Xin and Meng, Qiao},
  journal   = {The Astronomical Journal},
  year      = {2024},
  month     = {11},
  doi       = {10.3847/1538-3881/ad7fe0}
}`,
      },
      {
        title: "Research on a Multi-source RFI Mitigation Algorithm Using a Reference Antenna Array",
        link: "https://doi.org/10.1088/1674-4527/ad86a9",
        venue: "Research in Astronomy and Astrophysics, 2024",
        authors: "Han Wu, Hai-Long Zhang, Ya-Zhou Zhang, Jie Wang, Xin-Chen Ye, Xu Du, Ting Zhang",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ad86a9" },
          { cite: true },
        ],
        bibtex: `@article{wu2024research,
  title     = {Research on a Multi-source RFI Mitigation Algorithm Using a Reference Antenna Array},
  author    = {Wu, Han and Zhang, Hai-Long and Zhang, Ya-Zhou and Wang, Jie and Ye, Xin-Chen and Du, Xu and Zhang, Ting},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2024},
  month     = {11},
  doi       = {10.1088/1674-4527/ad86a9}
}`,
      },
      {
        title: "UWLPIPE: Ultra-wide Bandwidth Low-frequency Pulsar Data Processing Pipeline",
        link: "https://doi.org/10.1088/1674-4527/ad4fc4",
        venue: "Research in Astronomy and Astrophysics, 2024",
        authors: "Ya-Zhou Zhang, Hai-Long Zhang, Jie Wang, Jian Li, Xin-Chen Ye, Shuang-Qiang Wang, Xu Du, Han Wu, Ting Zhang, Shao-Cong Guo",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ad4fc4" },
          { cite: true },
        ],
        bibtex: `@article{zhang2024uwlpipe,
  title     = {UWLPIPE: Ultra-wide Bandwidth Low-frequency Pulsar Data Processing Pipeline},
  author    = {Zhang, Ya-Zhou and Zhang, Hai-Long and Wang, Jie and Li, Jian and Ye, Xin-Chen and Wang, Shuang-Qiang and Du, Xu and Wu, Han and Zhang, Ting and Guo, Shao-Cong},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2024},
  month     = {07},
  doi       = {10.1088/1674-4527/ad4fc4}
}`,
      },
      {
        title: "A Cross-matching Service for Data Center of Xinjiang Astronomical Observatory",
        link: "https://doi.org/10.1088/1674-4527/ad08e8",
        venue: "Research in Astronomy and Astrophysics, 2024",
        authors: "Hai-Long Zhang, Jie Wang, Xin-Chen Ye, Wan-Qiong Wang, Jia Li, Ya-Zhou Zhang, Xu Du, Han Wu, Ting Zhang",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ad08e8" },
          { cite: true },
        ],
        bibtex: `@article{zhang2024a,
  title     = {A Cross-matching Service for Data Center of Xinjiang Astronomical Observatory},
  author    = {Zhang, Hai-Long and Wang, Jie and Ye, Xin-Chen and Wang, Wan-Qiong and Li, Jia and Zhang, Ya-Zhou and Du, Xu and Wu, Han and Zhang, Ting},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2024},
  month     = {01},
  doi       = {10.1088/1674-4527/ad08e8}
}`,
      },
      {
        title: "Research on Ultra-wide Bandwidth Low-frequency Signal Channelization for Xinjiang 110 m Radio Telescope",
        link: "https://doi.org/10.1088/1674-4527/ad0427",
        venue: "Research in Astronomy and Astrophysics, 2023",
        authors: "Hai-Long Zhang, Ya-Zhou Zhang, Meng Zhang, Jie Wang, Jian Li, Xin-Chen Ye, Xin Pei",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ad0427" },
          { cite: true },
        ],
        bibtex: `@article{zhang2023research,
  title     = {Research on Ultra-wide Bandwidth Low-frequency Signal Channelization for Xinjiang 110 m Radio Telescope},
  author    = {Zhang, Hai-Long and Zhang, Ya-Zhou and Zhang, Meng and Wang, Jie and Li, Jian and Ye, Xin-Chen and Pei, Xin},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2023},
  month     = {12},
  doi       = {10.1088/1674-4527/ad0427}
}`,
      },
      {
        title: "PSRDP: A parallel processing method for pulsar baseband data",
        link: "https://doi.org/10.1088/1674-4527/ad0e99",
        venue: "Research in Astronomy and Astrophysics, 2023",
        authors: "Zhang Yazhou, hailong zhang, Jie WANG, Xinchen YE, ShuangQiang Wang, Xu Du, Han Wu, Ting ZHANG",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ad0e99" },
          { cite: true },
        ],
        bibtex: `@article{yazhou2023psrdp,
  title     = {PSRDP: A parallel processing method for pulsar baseband data},
  author    = {Yazhou, Zhang and zhang, hailong and WANG, Jie and YE, Xinchen and Wang, ShuangQiang and Du, Xu and Wu, Han and ZHANG, Ting},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2023},
  month     = {11},
  doi       = {10.1088/1674-4527/ad0e99}
}`,
      },
      {
        title: "The RFI Fast Mitigation Algorithm Based on Block LMS Filter",
        link: "https://doi.org/10.1088/1674-4527/ad05e9",
        venue: "Research in Astronomy and Astrophysics, 2023",
        authors: "Han Wu, hailong zhang, Zhang Yazhou, Jie WANG, Xu Du, Ting ZHANG, Xinchen YE",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ad05e9" },
          { cite: true },
        ],
        bibtex: `@article{wu2023the,
  title     = {The RFI Fast Mitigation Algorithm Based on Block LMS Filter},
  author    = {Wu, Han and zhang, hailong and Yazhou, Zhang and WANG, Jie and Du, Xu and ZHANG, Ting and YE, Xinchen},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2023},
  month     = {10},
  doi       = {10.1088/1674-4527/ad05e9}
}`,
      },
      {
        title: "Research on Channelization Techniques of Radio Astronomical Wideband Signal with Oversampled Polyphase Filter Banks",
        link: "https://doi.org/10.1088/1674-4527/acd73b",
        venue: "Research in Astronomy and Astrophysics, 2023",
        authors: "Meng Zhang, Hai-Long Zhang, Ya-Zhou Zhang, Jie Wang, Shao-Cong Guo, Qiao Meng",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/acd73b" },
          { cite: true },
        ],
        bibtex: `@article{zhang2023researchb,
  title     = {Research on Channelization Techniques of Radio Astronomical Wideband Signal with Oversampled Polyphase Filter Banks},
  author    = {Zhang, Meng and Zhang, Hai-Long and Zhang, Ya-Zhou and Wang, Jie and Guo, Shao-Cong and Meng, Qiao},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2023},
  month     = {08},
  doi       = {10.1088/1674-4527/acd73b}
}`,
      },
      {
        title: "Investigation of Traffic Classification Applied to an Astronomical Data Transmission Network of the XAO Using Deep Learning",
        link: "https://doi.org/10.1088/1674-4527/acafc5",
        venue: "Research in Astronomy and Astrophysics, 2023",
        authors: "Jie Wang, Hai-Long Zhang, Na Wang, Xin-Chen Ye, Wan-Qiong Wang, Jia Li, Meng Zhang, Ya-Zhou Zhang, Xu Du",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/acafc5" },
          { cite: true },
        ],
        bibtex: `@article{wang2023investigation,
  title     = {Investigation of Traffic Classification Applied to an Astronomical Data Transmission Network of the XAO Using Deep Learning},
  author    = {Wang, Jie and Zhang, Hai-Long and Wang, Na and Ye, Xin-Chen and Wang, Wan-Qiong and Li, Jia and Zhang, Meng and Zhang, Ya-Zhou and Du, Xu},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2023},
  month     = {03},
  doi       = {10.1088/1674-4527/acafc5}
}`,
      },
      {
        title: "Research on a Coherent Dedispersion Algorithm for Pulsar Baseband Data",
        link: "https://doi.org/10.1088/1674-4527/aca8ee",
        venue: "Research in Astronomy and Astrophysics, 2023",
        authors: "Hai-Long Zhang, Ya-Zhou Zhang, Meng Zhang, Jie Wang, Ting Zhang, Shuang-Qiang Wang, Jian-ping Yuan, Xin-Chen Ye, Jian Li",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/aca8ee" },
          { cite: true },
        ],
        bibtex: `@article{zhang2023researchc,
  title     = {Research on a Coherent Dedispersion Algorithm for Pulsar Baseband Data},
  author    = {Zhang, Hai-Long and Zhang, Ya-Zhou and Zhang, Meng and Wang, Jie and Zhang, Ting and Wang, Shuang-Qiang and Yuan, Jian-ping and Ye, Xin-Chen and Li, Jian},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2023},
  month     = {01},
  doi       = {10.1088/1674-4527/aca8ee}
}`,
      },
      {
        title: "Simulation Study of Network Reconfiguration and Load-balancing Method for the Xinjiang Astronomical Observatory Data Center",
        link: "https://doi.org/10.1088/1674-4527/ac846a",
        venue: "Research in Astronomy and Astrophysics, 2022",
        authors: "Jie Wang, Hailong Zhang, Na Wang, Xinchen Ye, Wanqiong Wang, Jia Li, Meng Zhang, Yazhou Zhang, Xu Du",
        links: [
          { label: "DOI", href: "https://doi.org/10.1088/1674-4527/ac846a" },
          { cite: true },
        ],
        bibtex: `@article{wang2022simulation,
  title     = {Simulation Study of Network Reconfiguration and Load-balancing Method for the Xinjiang Astronomical Observatory Data Center},
  author    = {Wang, Jie and Zhang, Hailong and Wang, Na and Ye, Xinchen and Wang, Wanqiong and Li, Jia and Zhang, Meng and Zhang, Yazhou and Du, Xu},
  journal   = {Research in Astronomy and Astrophysics},
  year      = {2022},
  month     = {09},
  doi       = {10.1088/1674-4527/ac846a}
}`,
      },
      {
        title: "The data center construction of the Xinjiang Astronomical Observatory based on virtual observatory standards",
        link: "https://doi.org/10.1016/j.ascom.2022.100578",
        venue: "Astronomy and Computing, 2022",
        authors: "H. Zhang, J. Wang, M. Demleitner, X. Ye, M. Zhang, Y. Zhang, W. Wang, J. Li, X. Du",
        links: [
          { label: "DOI", href: "https://doi.org/10.1016/j.ascom.2022.100578" },
          { cite: true },
        ],
        bibtex: `@article{zhang2022the,
  title     = {The data center construction of the Xinjiang Astronomical Observatory based on virtual observatory standards},
  author    = {Zhang, H. and Wang, J. and Demleitner, M. and Ye, X. and Zhang, M. and Zhang, Y. and Wang, W. and Li, J. and Du, X.},
  journal   = {Astronomy and Computing},
  year      = {2022},
  month     = {04},
  doi       = {10.1016/j.ascom.2022.100578}
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
    name: { en: "Yazhou Zhang", zh: "张亚州" },
    note: {
      en: "Yazhou Zhang's personal academic homepage",
      zh: "张亚州的个人学术主页",
    },
  },
};
