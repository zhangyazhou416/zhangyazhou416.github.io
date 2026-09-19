/* =========================================================
 * Academic homepage template — interactions
 * 移动端菜单 / 滚动高亮导航 / Cite(BibTeX) 弹窗 / 深色模式 / 中英切换
 * ========================================================= */
(() => {
  "use strict";

  const root = document.documentElement;

  function readStorage(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function writeStorage(key, value) {
    try { localStorage.setItem(key, value); } catch { /* 隐私模式下忽略 */ }
  }

  /* ---------- 深色模式 ----------
   * <head> 的启动脚本已在首帧前设好 data-theme，这里只负责：
   * 1) 同步 <meta name="theme-color">
   * 2) 响应切换按钮（手动选择写入 localStorage，之后不再跟随系统）
   * 3) 未手动选择时，跟随系统 prefers-color-scheme 的实时变化 */
  const themeBtn = document.getElementById("theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeMeta) {
      themeMeta.setAttribute("content", t === "dark" ? "#17181d" : "#ffffff");
    }
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    writeStorage("theme", next);
  });

  systemDark.addEventListener("change", (e) => {
    if (!readStorage("theme")) applyTheme(e.matches ? "dark" : "light");
  });

  /* ---------- 中英切换 ----------
   * 内容显隐完全由 CSS（html[data-lang] + [lang]）完成；
   * JS 只负责切换属性、写入偏好，并同步 <html lang> 给屏幕阅读器 */
  const langBtn = document.getElementById("lang-toggle");

  function applyLang(l) {
    root.setAttribute("data-lang", l);
    root.lang = l === "zh" ? "zh-CN" : "en";
    // 页面标题随语言切换（内容来自 config.js）
    const t = window.SITE_CONFIG && window.SITE_CONFIG.meta && window.SITE_CONFIG.meta.title;
    if (t && t[l]) document.title = t[l];
  }

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-lang") === "zh" ? "en" : "zh";
      applyLang(next);
      writeStorage("lang", next);
    });
  }

  /* ---------- 移动端菜单 ---------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // 点击菜单里的链接后自动收起（移动端）
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 滚动高亮导航（Scrollspy） ---------- */
  const links = Array.from(menu.querySelectorAll(".nav-link"));
  const sections = links
    .map((l) => document.querySelector(l.hash))
    .filter(Boolean);

  function setActive(id) {
    links.forEach((l) => {
      const isActive = l.hash === "#" + id;
      l.classList.toggle("active", isActive);
      if (isActive) {
        l.setAttribute("aria-current", "true");
      } else {
        l.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      // 只有一段内容穿过屏幕中部区域时才点亮对应菜单
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));

    // 兜底：滚到页面底部时点亮最后一项（最后一节较短时可能碰不到中部区域）
    window.addEventListener(
      "scroll",
      () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
          setActive(sections[sections.length - 1].id);
        }
      },
      { passive: true }
    );
  }

  /* ---------- Cite 弹窗 ---------- */
  const modal = document.getElementById("cite-modal");
  const citeCode = document.getElementById("cite-code");
  const copyBtn = document.getElementById("cite-copy");
  const downloadBtn = document.getElementById("cite-download");
  let currentBib = "";

  function openModal(bib) {
    currentBib = bib.trim();
    citeCode.textContent = currentBib;
    modal.hidden = false;
    document.body.style.overflow = "hidden"; // 弹窗打开时禁止页面滚动
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // Cite 按钮由 render.js 动态生成，这里用 document 级事件委托，与渲染时序解耦
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".cite-btn");
    if (!btn) return;
    const holder = btn.closest(".pub");
    const bib = holder && holder.querySelector(".bibtex-src");
    if (bib) openModal(bib.textContent);
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* 复制成功提示：只替换 .btn-label 的内容，避免破坏按钮里的双语 <span> 结构 */
  function flash(btn) {
    const label = btn.querySelector(".btn-label");
    if (!label) return;
    const old = label.innerHTML;
    label.innerHTML = '<span lang="en">Copied!</span><span lang="zh">已复制！</span>';
    setTimeout(() => (label.innerHTML = old), 1500);
  }

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(currentBib);
      flash(copyBtn);
    } catch {
      // 老浏览器 / 非HTTPS 环境的降级方案
      const range = document.createRange();
      range.selectNodeContents(citeCode);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
      flash(copyBtn);
    }
  });

  downloadBtn.addEventListener("click", () => {
    const blob = new Blob([currentBib], { type: "text/x-bibtex" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "citation.bib";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  /* ---------- 页脚年份自动更新 ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
