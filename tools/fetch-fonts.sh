#!/usr/bin/env bash
# =========================================================
# 把 Google Fonts 的 woff2 下载到 assets/fonts/，供 style.css 的
# @font-face 本地加载（离线可用、不依赖 Google CDN）。
# 重跑即刷新；改动字重 / brand 中文文字后按需改下面的列表再跑。
#
# 说明：
#   - 拉丁字体只取 latin 子集（本站只用到英文 + 中文）；
#   - 思源宋体（Noto Serif SC）用 text= 参数按字子集化，只打包
#     brand 用到的字 —— 以后改了 config.js 里的中文 brand，记得把
#     新的字加进 NOTO_TEXT 再重跑，否则新字会回退到系统宋体。
# =========================================================
set -euo pipefail
cd "$(dirname "$0")/.."

UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
mkdir -p assets/fonts

# 从 css2 的返回里取 latin 块（unicode-range 含 U+0000-00FF）的 woff2 地址。
# @font-face 是多行块，用 awk 以 } 为记录分隔按块匹配（tr/grep 按行切会丢 url）
latin_url() {
  awk 'BEGIN { RS = "}" } /U\+0000-00FF/ {
    if (match($0, /https:[^)]*\.woff2/)) { print substr($0, RSTART, RLENGTH); exit }
  }'
}

fetch() { # $1 = family 查询串   $2 = 保存文件名
  local url
  url=$(curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=$1&display=swap" | latin_url || true)
  [ -n "$url" ] || { echo "✗ 没拿到 $1 的 woff2 地址" >&2; exit 1; }
  curl -s -o "assets/fonts/$2" "$url"
  echo "✓ $2  ($(du -h "assets/fonts/$2" | cut -f1))"
}

# ---- 拉丁字体（站点实际用到的家族与字重，与 index.html 原引的 Google 链接一致） ----
fetch "EB+Garamond:ital,wght@1,700" "eb-garamond-italic-700.woff2"   # 导航品牌名（粗斜体）
fetch "Montserrat:wght@400"         "montserrat-400.woff2"           # h1/h2 标题
fetch "Montserrat:wght@700"         "montserrat-700.woff2"           # h3+ 标题 / 论文标题
fetch "Roboto:wght@400"             "roboto-400.woff2"               # 正文
fetch "Roboto:wght@700"             "roboto-700.woff2"               # 正文 <strong>
fetch "Roboto:ital,wght@1,400"      "roboto-italic-400.woff2"        # 正文 <em>
fetch "Roboto+Mono"                 "roboto-mono-400.woff2"          # Cite 弹窗代码

# ---- 思源宋体 700：只子集化 brand 的中文用字 ----
NOTO_TEXT="张亚州的学术主页·—、。（）"
url=$(curl -s -A "$UA" -G "https://fonts.googleapis.com/css2" \
      --data "family=Noto+Serif+SC:wght@700" --data-urlencode "text=${NOTO_TEXT}" --data "display=swap" \
      | grep -o 'https://[^)]*' | head -1 || true)
[ -n "$url" ] || { echo "✗ 没拿到 Noto Serif SC 的 woff2 地址" >&2; exit 1; }
curl -s -o "assets/fonts/noto-serif-sc-700-subset.woff2" "$url"
echo "✓ noto-serif-sc-700-subset.woff2  ($(du -h assets/fonts/noto-serif-sc-700-subset.woff2 | cut -f1))"

echo "完成：共 $(ls assets/fonts | wc -l) 个文件，许可均为 SIL OFL 1.1（可自由再分发）。"
