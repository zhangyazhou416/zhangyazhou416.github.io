#!/usr/bin/env node
/* =========================================================
 * 从 ORCID 公开 API 同步论文 → config.js 的 research.items
 * ---------------------------------------------------------
 * 用法（需要 Node 18+，只在本机跑，不影响网站本身零依赖）：
 *   node tools/sync-orcid.js            预览：抓取并在 orcid-import.js 生成可粘贴的条目
 *   node tools/sync-orcid.js --merge    直接合并进 config.js（自动备份为 config.js.bak）
 *   node tools/sync-orcid.js 0000-0000-0000-0000   临时指定其他 ORCID iD
 *
 * 说明：
 *   - ORCID iD 默认从 config.js 的 bio.social 里 icon 为 "orcid" 的 href 读取；
 *   - 同步是“构建期”的：抓完写进 config.js 再部署，页面保持纯静态
 *     （file:// 双击可用、无 JS/爬虫也能看到论文；运行时抓取两者都做不到）；
 *   - 已存在于 research.items 的论文按标题去重，不会重复插入；
 *   - ORCID 没有摘要/缩略图/PDF 链接，导入后可手工补 abstract / image / PDF 按钮；
 *   - bibtex 优先用 ORCID 里存的 citation，没有则按元数据生成。
 * ========================================================= */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CONFIG = path.join(ROOT, "config.js");
const IMPORT_FILE = path.join(ROOT, "orcid-import.js");
const API = "https://pub.orcid.org/v3.0";
const HEADERS = {
  "Accept": "application/json",
  "User-Agent": "academic-homepage-orcid-sync (mailto:zhangyazhou@xao.ac.cn)",
};

/* ---------- 小工具 ---------- */
function fail(msg) { console.error("✗ " + msg); process.exit(1); }

async function getJSON(url) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 15000);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: ctl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally { clearTimeout(timer); }
}

/* 读 config.js（经典脚本：window.SITE_CONFIG = {...}） */
function loadConfig() {
  global.window = {};
  // eslint-disable-next-line no-eval
  eval(fs.readFileSync(CONFIG, "utf8"));
  return global.window.SITE_CONFIG;
}

/* "Ya-zhou Zhang" → { given: "Ya-zhou", family: "Zhang" }；单名视为 family */
function splitName(s) {
  const m = String(s).trim().match(/^(.+)\s+(\S+)$/);
  return m ? { given: m[1], family: m[2] } : { given: "", family: String(s).trim() };
}

/* 标题归一化（去重用）：小写、只留字母数字 */
function normTitle(t) {
  return String(t).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/* JS 双引号字符串转义 */
function jsStr(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/* bibtex 内容里去掉反引号和 ${（config 的模板字面量约束） */
function bibSafe(s) { return String(s).replace(/`|\$\{/g, ""); }

/* ---------- ORCID iD ---------- */
function findOrcidId(cfg, arg) {
  if (arg && /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(arg)) return arg;
  const social = (cfg.bio && cfg.bio.social) || [];
  for (const s of social) {
    if (s && s.icon === "orcid") {
      const m = /(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/.exec(s.href || "");
      if (m) return m[1];
    }
  }
  return null;
}

/* ---------- 抓取 ---------- */
async function fetchWorks(orcidId) {
  const data = await getJSON(`${API}/${orcidId}/works`);
  const groups = data.group || [];
  const works = [];
  for (const g of groups) {
    // 一组可能是同一作品的多来源摘要，取信息最全的一条（有 journal/DOI 的优先）
    const summaries = g["work-summary"] || [];
    const hasDoi = (s) => ((s["external-ids"] || {})["external-id"] || []).some((e) => e["external-id-type"] === "doi");
    let best = null;
    for (const s of summaries) {
      if (!best) { best = s; continue; }
      if (hasDoi(s) && !hasDoi(best)) { best = s; continue; }
      if ((s["journal-title"] || {}).value && !(best["journal-title"] || {}).value) best = s;
    }
    if (best) works.push(best);
  }
  return works;
}

async function fetchWorkDetail(orcidId, putCode) {
  try { return await getJSON(`${API}/${orcidId}/work/${putCode}`); }
  catch (e) { console.warn(`  ! 作者信息获取失败（${putCode}）：${e.message}`); return null; }
}

/* ---------- ORCID 作品 → research.items 条目 ---------- */
const BIB_TYPE = {
  "journal-article": "article",
  "conference-paper": "inproceedings",
  "conference-abstract": "inproceedings",
  "book-chapter": "incollection",
  book: "book",
  "edited-book": "book",
  "monograph": "book",
  "report": "techreport",
  "dissertation": "phdthesis",
  "thesis": "phdthesis",
  "working-paper": "misc",
  "preprint": "misc",
  "dataset": "misc",
  "other": "misc",
};

function workToEntry(work, detail, usedKeys) {
  const title = ((work.title || {}).title || {}).value || "(untitled)";
  const journal = (work["journal-title"] || {}).value || "";
  const pd = work["publication-date"] || {};
  const year = (pd.year || {}).value || "";
  const month = (pd.month || {}).value || "";
  const extIds = ((work["external-ids"] || {})["external-id"] || []);
  const doiEntry = extIds.find((e) => e["external-id-type"] === "doi");
  const doi = doiEntry ? doiEntry["external-id-value"] : "";
  const doiUrl = doi ? ((doiEntry["external-id-url"] || {}).value || `https://doi.org/${doi}`) : "";
  const workUrl = (work.url || {}).value || "";

  /* 作者（来自单条详情；没有就留空字段，渲染器自动省略该行） */
  let displayAuthors = "";
  let bibAuthors = "";
  const contributors = ((detail || {}).contributors || {}).contributor || [];
  const names = contributors
    .map((c) => ((c["credit-name"] || {}).value) || "")
    .filter(Boolean);
  if (names.length) {
    displayAuthors = names.join(", ");
    bibAuthors = names.map((n) => {
      const { given, family } = splitName(n);
      return given ? `${family}, ${given}` : family;
    }).join(" and ");
  }

  /* venue：期刊 + 年份 */
  const venueParts = [];
  if (journal) venueParts.push(journal);
  if (year) venueParts.push(year);
  const venue = venueParts.join(", ") || undefined;

  /* bibtex：优先用 ORCID 存的 citation，否则按元数据生成 */
  let bibtex = "";
  const storedCitation = (detail && detail.citation && detail.citation["citation-value"]) || "";
  if (storedCitation) {
    bibtex = bibSafe(storedCitation).trim();
  } else {
    /* 引用键：第一作者姓 + 年份 + 标题首词，冲突时追加 b/c… */
    const surname = (names.length ? splitName(names[0]).family : "work")
      .toLowerCase().replace(/[^a-z]/g, "");
    const firstWord = (title.split(/[^A-Za-z0-9]+/).filter(Boolean)[0] || "work").toLowerCase();
    const base = `${surname}${year || "noy"}${firstWord}`;
    let k = base, n = 1;
    while (usedKeys.has(k)) k = base + String.fromCharCode(96 + (++n)); // …b, …c
    usedKeys.add(k);

    const bibType = BIB_TYPE[work.type] || "misc";
    const fields = [`  title     = {${bibSafe(title)}}`];
    if (bibAuthors) fields.push(`  author    = {${bibSafe(bibAuthors)}}`);
    if (journal) fields.push(bibType === "article" ? `  journal   = {${bibSafe(journal)}}` : `  booktitle = {${bibSafe(journal)}}`);
    if (year) fields.push(`  year      = {${year}}`);
    if (month) fields.push(`  month     = {${month}}`);
    if (doi) fields.push(`  doi       = {${doi}}`);
    bibtex = `@${bibType}{${k},\n${fields.join(",\n")}\n}`;
  }

  /* 组装条目（字段名与 config.js 的 research.items 完全一致） */
  const entry = { title: jsStr(title) };
  const lines = [];
  lines.push(`      {\n        title: "${entry.title}",`);
  if (doiUrl || workUrl) lines.push(`        link: "${jsStr(doiUrl || workUrl)}",`);
  if (venue) lines.push(`        venue: "${jsStr(venue)}",`);
  if (displayAuthors) lines.push(`        authors: "${jsStr(displayAuthors)}",`);
  /* 按钮行：DOI 链接 + Cite（bibtex 总是会有：存的 citation 或按元数据生成） */
  const linkLines = [];
  if (doiUrl) linkLines.push(`          { label: "DOI", href: "${jsStr(doiUrl)}" },`);
  linkLines.push(`          { cite: true },`);
  lines.push(`        links: [\n${linkLines.join("\n")}\n        ],`);
  lines.push(`        bibtex: \`${bibtex.replace(/\r/g, "")}\`,`);
  lines.push(`      },`);
  return lines.join("\n");
}

/* ---------- 主流程 ---------- */
(async () => {
  const argIdx = process.argv.findIndex((a) => /^[0-9X-]{19}$/.test(a));
  const doMerge = process.argv.includes("--merge");

  const cfg = loadConfig();
  const orcidId = findOrcidId(cfg, argIdx >= 0 ? process.argv[argIdx] : null);
  if (!orcidId) fail("没有找到 ORCID iD：请在 config.js 的 bio.social 里配置 { icon: \"orcid\", href: \"https://orcid.org/…\" }，或作为命令行参数传入。");
  console.log(`ORCID iD: ${orcidId}\n`);

  console.log("抓取作品列表…");
  const works = await fetchWorks(orcidId);
  if (!works.length) fail("该 ORCID 记录里没有公开作品。");
  console.log(`共 ${works.length} 条作品，抓取详情（作者/引用）…`);

  /* 按发表时间倒序（最新在前） */
  works.sort((a, b) => {
    const d = (w) => {
      const p = w["publication-date"] || {};
      return `${(p.year || {}).value || "0000"}-${(p.month || {}).value || "00"}-${(p.day || {}).value || "00"}`;
    };
    return d(b).localeCompare(d(a));
  });

  const existing = new Set(((cfg.research || {}).items || []).map((it) => {
    const t = typeof it.title === "string" ? it.title : (it.title && (it.title.en || it.title.zh)) || "";
    return normTitle(t);
  }));
  const usedKeys = new Set();
  const entries = [];
  let skipped = 0;
  for (const w of works) {
    const title = ((w.title || {}).title || {}).value || "";
    if (existing.has(normTitle(title))) { skipped++; continue; }
    const detail = await fetchWorkDetail(orcidId, w["put-code"]);
    entries.push(workToEntry(w, detail, usedKeys));
  }

  if (!entries.length) {
    console.log(`\n完成：${works.length} 条作品全部已存在于 config.js（按标题去重），无需插入。`);
    return;
  }

  /* 生成 orcid-import.js（预览/手工粘贴用） */
  fs.writeFileSync(IMPORT_FILE,
    `/* 由 tools/sync-orcid.js 生成于 ${new Date().toISOString().slice(0, 10)}（ORCID ${orcidId}）\n` +
    ` * 共 ${entries.length} 条新论文。可手动粘贴进 config.js 的 research.items，\n` +
    ` * 或直接运行 node tools/sync-orcid.js --merge 自动插入。 */\n\n` +
    `[ // eslint-disable-line\n${entries.join("\n")}\n];\n`,
    "utf8");
  console.log(`\n✓ 新论文 ${entries.length} 条（已存在跳过 ${skipped} 条）→ 已写入 orcid-import.js`);

  if (!doMerge) {
    console.log("预览模式（未改动 config.js）。确认无误后运行：node tools/sync-orcid.js --merge");
    return;
  }

  /* --merge：插入到 research.items 顶部（最新论文显示在前） */
  const src = fs.readFileSync(CONFIG, "utf8");
  fs.writeFileSync(CONFIG + ".bak", src, "utf8"); // 改前备份
  const rIdx = src.indexOf("  research: {");
  if (rIdx < 0) fail("config.js 里找不到 research 区块，已停止（备份仍为 config.js.bak）。");
  const itemsIdx = src.indexOf("items: [", rIdx);
  if (itemsIdx < 0) fail("config.js 里找不到 research.items 数组。");
  const lineEnd = src.indexOf("\n", itemsIdx);
  const merged = src.slice(0, lineEnd + 1) + entries.join("\n") + "\n" + src.slice(lineEnd + 1);
  fs.writeFileSync(CONFIG, merged, "utf8");
  console.log(`✓ 已插入 ${entries.length} 条到 research.items 顶部（原文件备份为 config.js.bak）`);
  console.log("  提示：模板自带的示例论文（Example 字样）记得手动删除；摘要/缩略图/PDF 链接可按需补齐。");
})().catch((e) => fail(e.message));
