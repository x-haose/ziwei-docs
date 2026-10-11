import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import { zhCN } from '@fumadocs/language/zh-cn';
import { Logo } from '@/components/logo';
import { Boxes, Braces, Cog } from 'lucide-react';

/** 界面文案：中文界面用 fumadocs 官方简体词表，英文取内置默认。 */
export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .preset('zh', zhCN());

/**
 * 排盘引擎仓库。导航栏 GitHub 图标与页脚「GitHub」指向这里，
 * 读者要的是库本身，不是文档站的源码。
 */
export const LIBRARY_URL = 'https://github.com/x-haose/x-iztro';

/**
 * 文档站仓库。页面上「在 GitHub 上查看」指向这里：
 * 正文在本仓库根目录的 `content/docs/`，不在引擎仓库的 `docs/` 下。
 */
export const DOCS_REPO_URL = 'https://github.com/x-haose/ziwei-docs';

/**
 * 紫微斗数入门教程的外部站点。
 *
 * 本站的概念页只讲「读懂 API 返回的数据需要知道的部分」；
 * 想系统学习这门术数本身（星耀性情、格局、古籍）到这里，
 * 那是另一个领域的内容，不在本站的范围内。
 */
export const LEARN_URL = 'https://iztro.com/learn/basis.html';

const nav = {
  zh: {
    guide: '指南',
    api: 'API 参考',
    forAI: '给 AI 用',
    learn: '紫微扫盲',
    rust: { text: 'Rust', desc: '核心库，Python 与 Go 绑定都调用它' },
    python: { text: 'Python', desc: 'dataclass 与 StrEnum 构成的类型化 API' },
    go: { text: 'Go', desc: '内嵌 wasm，无 cgo，交叉编译不受影响' },
  },
  en: {
    guide: 'Guide',
    api: 'API',
    forAI: 'For AI',
    learn: 'Learn Zi Wei',
    rust: { text: 'Rust', desc: 'The core library behind all bindings' },
    python: { text: 'Python', desc: 'Typed API of dataclasses and StrEnums' },
    go: { text: 'Go', desc: 'Embedded wasm, no cgo, cross-compiles cleanly' },
  },
} as const;

/** 顶栏「给 AI 用 / For AI」：进本语言的 MCP 指南，不进 /install。 */
export function forAILink(locale: string) {
  const t = nav[locale as keyof typeof nav] ?? nav.en;
  return {
    type: 'main' as const,
    text: t.forAI,
    url: `/${locale}/docs/guide/mcp`,
    active: 'url' as const,
  };
}

/**
 * 导航栏与页脚的共享配置。
 *
 * 三个语言的 API 参考收在一个下拉里而非并列成三个顶级菜单：
 * 它们是同一件事的三种实现，与「指南」不属于同一层级；
 * 下拉项带描述，首次访问者能一眼看出三者的分工。
 * 文档内部的栏目切换由侧栏 tab 承担。
 */
export function baseOptions(locale: string): BaseLayoutProps {
  const t = nav[locale as keyof typeof nav] ?? nav.en;
  const api = (
    key: 'rust' | 'python' | 'go',
    icon: React.ReactNode,
  ) => ({
    icon,
    text: t[key].text,
    description: t[key].desc,
    url: `/${locale}/docs/${key}`,
    active: 'nested-url' as const,
  });

  return {
    nav: {
      title: <Logo />,
      url: `/${locale}`,
    },
    githubUrl: LIBRARY_URL,
    links: [
      {
        type: 'main',
        text: t.guide,
        url: `/${locale}/docs/guide`,
        active: 'nested-url',
      },
      forAILink(locale),
      {
        type: 'menu',
        text: t.api,
        items: [
          api('rust', <Cog />),
          api('python', <Braces />),
          api('go', <Boxes />),
        ],
      },
      {
        type: 'main',
        text: t.learn,
        url: LEARN_URL,
        external: true,
      },
    ],
  };
}
