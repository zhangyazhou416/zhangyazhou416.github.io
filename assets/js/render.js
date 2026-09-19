/* =========================================================
 * Academic homepage template — 内容渲染器
 * 读取 window.SITE_CONFIG（config.js），同步渲染出与原静态页
 * 完全一致的 DOM：class 名与 lang 双语结构保持不变，style.css 零改动。
 *
 * 加载顺序（经典脚本，保持同步，勿加 async/defer）：
 *   config.js → render.js（本文件）→ main.js
 * ========================================================= */
(() => {
  "use strict";

  const main = document.getElementById("site-main");

  function fail(msg) {
    console.error("[render] " + msg);
    if (main) {
      main.innerHTML =
        '<div class="noscript-tip">' +
        '<p lang="en">Failed to load page content. Please check <code>config.js</code> and the browser console.</p>' +
        '<p lang="zh">页面内容加载失败，请检查 <code>config.js</code> 与浏览器控制台。</p>' +
        "</div>";
    }
  }

  if (!window.SITE_CONFIG) {
    fail("window.SITE_CONFIG is not defined — check that config.js loads before render.js.");
    return;
  }

  /* ---------- 双语帮助函数 ----------
   * 字段形态：字符串 = 两种语言模式都显示；{en, zh} = 自动切换；
   * 只含一个键的对象（如 {en: "…"}）只渲染该语言的一个元素。
   * 值是站长自己写的可信 HTML，按原样插入，与直接改 HTML 的信任模型相同；
   * 只有 alt 等属性值经 esc() 转义 */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  /* 行内形态：<span lang="en">…</span><span lang="zh">…</span>；字符串原样返回 */
  function spans(field, cls) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    const c = cls ? ` class="${cls}"` : "";
    return ["en", "zh"]
      .filter((l) => field[l] != null)
      .map((l) => `<span lang="${l}"${c}>${field[l]}</span>`)
      .join("");
  }

  /* 块级形态：<p lang="en">…</p><p lang="zh">…</p> 兄弟对；字符串渲染单个不带 lang 的标签 */
  function blocks(tag, field, cls) {
    if (field == null) return "";
    const c = cls ? ` class="${cls}"` : "";
    if (typeof field === "string") return `<${tag}${c}>${field}</${tag}>`;
    return ["en", "zh"]
      .filter((l) => field[l] != null)
      .map((l) => `<${tag} lang="${l}"${c}>${field[l]}</${tag}>`)
      .join("");
  }

  /* 按当前语言取一个纯文本值（title / meta 用） */
  function pick(field, lang) {
    if (field == null) return null;
    if (typeof field === "string") return field;
    if (field[lang] != null) return field[lang];
    return field.en != null ? field.en : field.zh != null ? field.zh : null;
  }

  /* ---------- <title> / <meta> ---------- */
  function renderMeta(meta) {
    if (!meta) return;
    const lang = document.documentElement.getAttribute("data-lang") === "zh" ? "zh" : "en";
    const title = pick(meta.title, lang);
    if (title) document.title = title;
    const descEl = document.querySelector('meta[name="description"]');
    const desc = pick(meta.description, lang);
    if (descEl && desc) descEl.setAttribute("content", desc);
    const authorEl = document.querySelector('meta[name="author"]');
    if (authorEl && meta.author) authorEl.setAttribute("content", meta.author);
  }

  /* ---------- Bio ---------- */
  /* 社交图标注册表（bio.social 的 icon 字段从这里取名；
   * SVG 路径取自 simple-icons / Font Awesome Free，许可证允许内嵌） */
  const ICONS = {
    github: { vb: "0 0 24 24", d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },  // GitHub
    gitlab: { vb: "0 0 24 24", d: "m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z" },  // GitLab
    gitee: { vb: "0 0 24 24", d: "M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z" },  // Gitee
    zhihu: { vb: "0 0 24 24", d: "M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73-.5 1.434-.68 2.11h4.587c.545-.006.445 1.168.445 1.171H9.384a58.104 58.104 0 01-.112 3.797h2.712c.388.023.393 1.251.393 1.266H9.183a9.223 9.223 0 01-.408 2.102l.757-.604c.452.456 1.512 1.712 1.906 2.177.473.681.063 2.081.063 2.081l-2.794-3.382c-.653 2.518-1.845 3.607-1.845 3.607-.523.468-1.58.82-2.64.516 2.218-1.73 3.44-3.917 3.667-6.497H4.491c0-.015.197-1.243.806-1.266h2.71c.024-.32.086-3.254.086-3.797H6.598c-.136.406-.158.447-.268.753-.594 1.095-1.603 1.122-1.907 1.155.906-1.821 1.416-3.6 1.591-4.064.425-1.124 1.671-1.125 1.671-1.125zM13.078 6h6.377v11.33h-2.573l-2.184 1.373-.401-1.373h-1.219zm1.313 1.219v8.86h.623l.263.937 1.455-.938h1.456v-8.86z" },  // 知乎
    bilibili: { vb: "0 0 24 24", d: "M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z" },  // 哔哩哔哩
    email: { vb: "0 0 512 512", d: "M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z" },  // Email
    homepage: { vb: "0 0 496 512", d: "M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z" },  // 主页
    scholar: { vb: "0 0 640 512", d: "M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z" },  // Google Scholar
    orcid: { vb: "0 0 24 24", d: "M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" },  // ORCID
  };

  /* 头像下方的社交图标行（bio.social：[{icon, href, title}]） */
  function renderSocial(social) {
    if (!Array.isArray(social) || !social.length) return "";
    return (
      '<ul class="network-icon">' +
      social
        .map((s) => {
          const ic = s && ICONS[s.icon];
          if (!ic) {
            console.warn(`[render] 未知社交图标 “${s && s.icon}”，可用：${Object.keys(ICONS).join(" / ")}`);
            return "";
          }
          const label = s.title || s.icon;
          return (
            `<li><a href="${esc(s.href || "#")}" target="_blank" rel="noopener"` +
            ` title="${esc(label)}" aria-label="${esc(label)}">` +
            `<svg viewBox="${ic.vb}" aria-hidden="true" focusable="false"><path d="${ic.d}"/></svg>` +
            "</a></li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  function renderAccordion(a) {
    if (!a || a.title == null) return "";
    const items = a.items || [];
    let list;
    if (a.style === "edu") {
      list =
        '<ul class="edu-list">' +
        items
          .map(
            (it) =>
              `<li>${spans(it.degree, "edu-degree")}<br><span class="edu-time">${it.time || ""}</span></li>`
          )
          .join("") +
        "</ul>";
    } else {
      list = '<ul class="plain-list">' + items.map((it) => `<li>${spans(it)}</li>`).join("") + "</ul>";
    }
    return (
      `<details class="accordion"${a.open ? " open" : ""}>` +
      `<summary>${spans(a.title)}</summary>${list}</details>`
    );
  }

  function renderBio(bio) {
    const p = bio.portrait || {};
    let html = '<div class="about"><div class="about-portrait">';
    html +=
      `<img src="${esc(p.src || "")}" alt="${esc(p.alt || "")}"` +
      (p.width ? ` width="${p.width}"` : "") +
      (p.height ? ` height="${p.height}"` : "") +
      ">";
    html += `<h1 class="about-name">${spans(bio.name)}</h1>`;
    html += `<p class="about-degree">${spans(bio.degree)}</p>`; // 行内 span 对包在 classed p 里
    html += `<p class="about-role">${spans(bio.role)}</p>`;
    html += renderSocial(bio.social);
    html += '</div><div class="about-text">';
    (bio.intro || []).forEach((f) => (html += blocks("p", f)));
    if (bio.callout) html += `<div class="callout">${blocks("p", bio.callout)}</div>`;
    (bio.paragraphs || []).forEach((f) => (html += blocks("p", f)));
    if (bio.update) html += "<hr>" + blocks("p", bio.update);
    if (bio.newsGroups && bio.newsGroups.length) {
      html += "<hr>";
      bio.newsGroups.forEach((g) => {
        html += blocks("p", g.heading);
        if (g.items && g.items.length) {
          html += "<ul>" + g.items.map((it) => `<li>${spans(it)}</li>`).join("") + "</ul>";
        }
      });
    }
    if (bio.email) html += "<hr>" + blocks("p", bio.email);
    if (bio.links && bio.links.length) {
      html +=
        '<p class="about-links">' +
        bio.links
          .map((l) => `<a class="btn" href="${esc(l.href || "#")}">${l.label || ""}</a>`)
          .join("") +
        "</p>";
    }
    (bio.accordions || []).forEach((a) => (html += renderAccordion(a)));
    html += "</div></div><!-- /.about -->";
    return html;
  }

  /* ---------- Teaching 卡片 ---------- */
  function renderTeachCard(card) {
    if (!card || card.title == null) {
      console.warn("[render] 跳过一个缺少 title 的 teaching 条目：", card);
      return "";
    }
    const img =
      typeof card.image === "object" && card.image !== null ? card.image : { src: card.image };
    const link = card.link != null ? esc(card.link) : null;
    let html = '<article class="teach-card">';
    if (img && img.src) {
      const imgTag = `<img class="teach-card-img" src="${esc(img.src)}" alt="${esc(img.alt || "")}" loading="lazy">`;
      html += link ? `<a href="${link}" aria-label="Course page">${imgTag}</a>` : imgTag;
    }
    html += '<div class="teach-card-body"><h3 class="teach-card-title">';
    const title = spans(card.title);
    html += link ? `<a href="${link}">${title}</a>` : title;
    html += "</h3>";
    if (card.desc) html += `<p class="teach-card-desc">${spans(card.desc)}</p>`;
    if (card.date) html += `<p class="teach-card-date">${spans(card.date)}</p>`;
    html += "</div></article>";
    return html;
  }

  /* ---------- Research / Talks 共用的条目渲染 ---------- */
  const pendingBibs = [];

  function renderPub(item) {
    if (!item || item.title == null) {
      console.warn("[render] 跳过一个缺少 title 的条目：", item);
      return "";
    }
    const img =
      typeof item.image === "object" && item.image !== null ? item.image : { src: item.image };
    const hasThumb = !!(img && img.src);
    // BibTeX 先登记到 pendingBibs，等 innerHTML 注入后再用 DOM API 补挂（见 attachBibtex）
    const bibAttr = item.bibtex != null ? ` data-bib-index="${pendingBibs.push(item.bibtex) - 1}"` : "";
    let html = `<article class="pub${hasThumb ? "" : " no-thumb"}"${bibAttr}>`;
    if (hasThumb) {
      html +=
        `<a class="pub-thumb" href="${esc(item.link || "#")}">` +
        `<img src="${esc(img.src)}" alt="${esc(img.alt || "")}" loading="lazy" width="150"></a>`;
    }
    html += '<div class="pub-body"><h3 class="pub-title">';
    const title = spans(item.title);
    html += item.link != null ? `<a href="${esc(item.link)}">${title}</a>` : title;
    html += "</h3>";
    if (item.venue) html += `<p class="pub-venue">${spans(item.venue)}</p>`;
    if (item.abstract) html += `<p class="pub-abstract">${spans(item.abstract)}</p>`;
    if (item.authors) html += `<p class="pub-authors">${spans(item.authors)}</p>`;
    if (item.date) html += `<p class="talk-date">${spans(item.date)}</p>`;
    if (item.links && item.links.length) {
      html +=
        '<div class="pub-links">' +
        item.links
          .map((l) => {
            if (!l) return "";
            if (l.cite) {
              // 未配 bibtex 时自动省略 Cite 按钮
              return item.bibtex != null
                ? '<button class="btn cite-btn" type="button">Cite</button>'
                : "";
            }
            if (l.href != null) return `<a class="btn" href="${esc(l.href)}">${l.label || ""}</a>`;
            return "";
          })
          .join("") +
        "</div>";
    }
    html += "</div></article>";
    return html;
  }

  /* <script type="text/plain"> 是 raw-text 元素：innerHTML 拼接会经实体解码
   * （& 变 &amp;）且可能被 </script> 截断，必须 createElement + textContent 补挂 */
  function attachBibtex(root) {
    root.querySelectorAll("[data-bib-index]").forEach((el) => {
      const idx = parseInt(el.getAttribute("data-bib-index"), 10);
      const holder = el.querySelector(".pub-body") || el;
      const s = document.createElement("script");
      s.type = "text/plain";
      s.className = "bibtex-src";
      s.textContent = pendingBibs[idx] != null ? String(pendingBibs[idx]) : "";
      holder.appendChild(s);
      el.removeAttribute("data-bib-index"); // 渲染完清掉临时标记，DOM 与原静态页一致
    });
  }

  /* ---------- 栏目计算与外壳 ---------- */
  const SECTION_IDS = ["bio", "teaching", "research", "talks"];

  function hasItems(sec) {
    return !!sec && Array.isArray(sec.items) && sec.items.length > 0;
  }

  function computeSections(cfg) {
    const content = {};
    if (cfg.bio) {
      content.bio = {
        label: cfg.bio.navLabel || cfg.bio.name,
        html: `<section id="bio" class="section"><div class="container">${renderBio(cfg.bio)}</div></section>`,
      };
    }
    if (hasItems(cfg.teaching)) {
      content.teaching = {
        label: cfg.teaching.title,
        html:
          `<section id="teaching" class="section"><div class="container">` +
          `<h1 class="section-title">${spans(cfg.teaching.title)}</h1>` +
          `<div class="card-grid">${cfg.teaching.items.map(renderTeachCard).join("")}</div>` +
          `</div></section>`,
      };
    }
    if (hasItems(cfg.research)) {
      content.research = {
        label: cfg.research.title,
        html:
          `<section id="research" class="section"><div class="container">` +
          `<h1 class="section-title">${spans(cfg.research.title)}</h1>` +
          `<div class="pub-list">${cfg.research.items.map(renderPub).join("")}</div>` +
          `</div></section>`,
      };
    }
    if (hasItems(cfg.talks)) {
      content.talks = {
        label: cfg.talks.title,
        html:
          `<section id="talks" class="section"><div class="container">` +
          `<h1 class="section-title">${spans(cfg.talks.title)}</h1>` +
          `<div class="pub-list">${cfg.talks.items.map(renderPub).join("")}</div>` +
          `</div></section>`,
      };
    }

    // nav 数组决定栏目与导航的顺序；指向无内容栏目的项忽略并提示
    const navList = Array.isArray(cfg.nav) ? cfg.nav : SECTION_IDS;
    const order = navList.filter((id) => SECTION_IDS.includes(id) && content[id]);
    navList.forEach((id) => {
      if (SECTION_IDS.includes(id) && !content[id]) {
        console.warn(`[render] nav 里的栏目 “${id}” 没有内容（items 为空或缺失），导航项与栏目均不渲染。`);
      }
    });
    // 有内容但没列进 nav 的栏目追加到页尾，避免内容被静默吞掉
    SECTION_IDS.forEach((id) => {
      if (content[id] && !order.includes(id)) {
        console.warn(`[render] 栏目 “${id}” 有内容但未写进 nav，已追加到页面末尾。不想显示请清空它的 items。`);
        order.push(id);
      }
    });
    return { content, order };
  }

  /* ---------- 导航 ---------- */
  function renderNavbar(cfg, order, content) {
    const brand = document.querySelector(".navbar-brand");
    if (brand) {
      if (order.length) brand.setAttribute("href", "#" + order[0]);
      brand.innerHTML = spans(cfg.brand);
    }
    const menu = document.getElementById("nav-menu");
    if (menu) {
      menu.innerHTML = order
        .map(
          (id, i) =>
            `<a href="#${id}" class="nav-link${i === 0 ? " active" : ""}">${spans(content[id].label)}</a>`
        )
        .join("");
    }
  }

  /* ---------- 页脚 ---------- */
  function renderFooter(cfg) {
    const holder = document.getElementById("footer-content");
    if (!holder) return;
    const f = cfg.footer || {};
    let html = `<p>© <span id="year">${new Date().getFullYear()}</span> ${spans(f.name)}</p>`;
    if (f.note) html += `<p class="footer-note">${spans(f.note)}</p>`;
    holder.innerHTML = html;
  }

  /* ---------- 入口 ---------- */
  function render(cfg) {
    renderMeta(cfg.meta);
    const { content, order } = computeSections(cfg);
    renderNavbar(cfg, order, content);
    if (main) {
      main.innerHTML = order.map((id) => content[id].html).join("");
      attachBibtex(main);
    }
    renderFooter(cfg);
  }

  try {
    render(window.SITE_CONFIG);
  } catch (err) {
    fail("渲染出错：" + (err && err.message));
    console.error(err);
  }
})();
