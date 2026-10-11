# ziwei.x-haose.com

紫微斗数文档站与品牌站，部署在 <https://ziwei.x-haose.com>。

本仓库就是这个站点。Next.js + Fumadocs 应用在**仓库根目录**，不在 `docs/` 子目录里。
排盘引擎仍在 [x-haose/x-iztro](https://github.com/x-haose/x-iztro)；这里只放站点。

## Vercel

Root Directory 设为仓库根（`.` / 留空）。**不要**设成 `docs/`——那是引擎仓库里的旧位置，这个仓库没有那一层。

推到 `main` 即发布正式站。站点绝对地址默认 `https://ziwei.x-haose.com`（`lib/site.ts`），预览环境可用 `NEXT_PUBLIC_SITE_URL` 覆盖。

`/mcp`、`/mcp/*`、`/healthz`、`/install` 在**构建期**反代到 Dokploy 上的 MCP 源站。
默认 `https://xziwei-xziwei-e0rno8-e6d7d0-161-118-223-190.sslip.io`，用 `ZIWEI_MCP_ORIGIN` 覆盖。
文档首页 `/` 不在反代范围内。`ZIWEI_MCP_ORIGIN` 要在构建时可见，只配运行时环境变量不会改写目标。

Node.js 20.9 及以上。

## 安装

```bash
npm install
```

`postinstall` 会运行 `fumadocs-mdx`，生成 `.source/`（已在 `.gitignore` 中）。

```bash
npm run dev          # http://localhost:3000
npm run types:check
npm run build
python3 scripts/check-links.py
```

技术栈：fumadocs v16 + Next.js 16（Turbopack）+ Tailwind v4 + React 19。中文为默认语言，URL 始终带 `/zh` 或 `/en`。

## 目录

| 路径 | 内容 |
| --- | --- |
| `content/docs/` | 文档正文。无后缀为中文，`.en.mdx` 为英文 |
| `content/docs/guide/mcp.mdx` | 给 Cursor / Claude 的 MCP 指南 |
| `lib/layout.shared.tsx` | 顶栏。`给 AI 用` / `For AI` 指向 MCP 指南 |
| `proxy.ts` | 语言协商；`/mcp`、`/healthz`、`/install` 不进协商 |
| `next.config.mjs` | 上述三条路径的反代，以及文档页 `.md` 原文 |
| `app/[lang]/` | 页面路由 |
| `app/global.css` | 亮色宣纸、暗色深靛，共用紫微紫 |

## 新增一页

1. 在 `content/docs/<章节>/` 下建 `<页面>.mdx`，写 frontmatter 的 `title` 与 `description`
2. 在该章节的 `meta.json` 与 `meta.en.json` 的 `pages` 数组里加上文件名（不含扩展名）
3. 英文版同名加 `.en` 后缀：`<页面>.en.mdx`
