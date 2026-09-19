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
    html += blocks("p", bio.nameNote, "about-name-cn"); // 单语言：<p lang="en" class="about-name-cn">
    html += `<p class="about-degree">${spans(bio.degree)}</p>`; // 行内 span 对包在 classed p 里
    html += `<p class="about-role">${spans(bio.role)}</p>`;
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
