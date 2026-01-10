# K12-Education 汉字笔画学习

> 一年级小学生汉字笔画学习应用，支持笔顺动画、拼音、组词、例句等功能

## 项目简介

这是一个专为小学一年级学生设计的汉字笔画学习 Web 应用。通过生动的笔画动画、清晰的笔顺演示和丰富的汉字信息，帮助小朋友掌握正确的汉字书写方法。

## 主要功能

### 核心功能

| 功能 | 说明 |
|------|------|
| 🖊️ **笔画动画** | 使用 HanziWriter 库展示汉字的逐笔书写动画 |
| 📝 **笔顺步骤** | 分步骤展示每一笔的书写顺序 |
| 🔤 **拼音释义** | 显示汉字的拼音、含义、部首、结构 |
| 📚 **教材筛选** | 支持按一年级上册/下册筛选生字 |
| 📖 **组词例句** | 提供常用词语和例句帮助理解 |
| 🤖 **AI 智能获取** | 本地数据库无数据时，通过 Supabase Edge Function 调用 AI 获取 |

### 特色功能

- **多音字支持**：展示一个汉字的多种读音和对应含义
- **响应式设计**：适配桌面端和移动端
- **PWA 支持**：可安装到桌面，支持离线使用
- **教材生字表**：包含一年级上下册所有生字

## 技术栈

### 前端框架

- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **React Router** - 路由管理

### UI 组件与样式

- **shadcn/ui** - 高质量 React 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Radix UI** - 无障碍组件基础库
- **Lucide React** - 图标库

### 功能库

- **hanzi-writer** - 汉字笔画动画
- **Supabase** - 后端服务和 AI 调用
- **React Query** - 数据请求管理
- **React Hook Form** - 表单管理
- **Zod** - 数据校验

### 开发工具

- **ESLint** - 代码检查
- **Prettier** - 代码格式化（通过 ESLint 集成）
- **TypeScript ESLint** - TypeScript 语法检查

## 项目结构

```
K12-Education/
├── public/                 # 静态资源
│   ├── pwa-192x192.png    # PWA 图标
│   └── pwa-512x512.png
├── src/
│   ├── components/        # React 组件
│   │   ├── ui/           # shadcn/ui 基础组件
│   │   ├── CharacterDetails.tsx    # 汉字详情卡片
│   │   ├── CharacterFilter.tsx     # 汉字筛选器
│   │   ├── CharacterGrid.tsx       # 汉字网格展示
│   │   ├── CharacterInput.tsx      # 汉字输入框
│   │   ├── StrokeDisplay.tsx       # 笔画动画组件
│   │   ├── StrokeSteps.tsx         # 笔顺步骤展示
│   │   └── TextbookSelector.tsx    # 教材选择器
│   ├── data/              # 数据文件
│   │   ├── baseCharacters.ts       # 基础汉字数据
│   │   ├── characterInfo.ts        # 汉字信息获取逻辑
│   │   ├── grade1Vol1Characters.ts # 一年级上册生字
│   │   ├── grade1Vol2Characters.ts # 一年级下册生字
│   │   └── types.ts                # TypeScript 类型定义
│   ├── hooks/             # 自定义 Hooks
│   ├── integrations/      # 第三方集成
│   │   └── supabase/     # Supabase 客户端配置
│   ├── lib/              # 工具函数
│   ├── pages/            # 页面组件
│   │   ├── Index.tsx     # 首页
│   │   ├── Install.tsx   # 安装页
│   │   └── NotFound.tsx  # 404 页面
│   ├── App.tsx           # 应用入口
│   ├── main.tsx          # React 挂载点
│   └── index.css         # 全局样式
├── supabase/             # Supabase 配置（服务端）
├── .env                  # 环境变量
├── package.json          # 项目依赖
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── tailwind.config.ts    # Tailwind 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env` 文件并配置 Supabase 相关变量：

```bash
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
VITE_SUPABASE_URL="your-supabase-url"
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:8080

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 数据说明

### 本地数据库

项目包含三个本地数据文件：

| 文件 | 说明 |
|------|------|
| `baseCharacters.ts` | 常用基础汉字（约 200 个） |
| `grade1Vol1Characters.ts` | 一年级上册生字（约 300 个） |
| `grade1Vol2Characters.ts` | 一年级下册生字（约 400 个） |

### 汉字信息数据结构

```typescript
interface CharacterInfo {
  character: string;              // 汉字
  pinyin: string;                 // 拼音
  meaning: string;                // 释义
  strokeCount: number;            // 笔画数
  radicalInfo: string;            // 部首信息
  structure?: string;             // 字体结构
  words: Array<{                  // 组词
    word: string;
    pinyin: string;
    meaning: string;
  }>;
  sentences: string[];            // 例句
  additionalReadings?: Array<{    // 多音字其他读音
    pinyin: string;
    meaning: string;
    words: Array<{ ... }>;
  }>;
}
```

### AI 获取流程

当本地数据库没有汉字信息时：

1. 调用 Supabase Edge Function `get-character-info`
2. Edge Function 调用 AI 模型获取汉字信息
3. 返回结构化的汉字数据
4. 前端展示 AI 返回的结果

## 组件说明

### CharacterInput

汉字输入组件，支持：
- 单个汉字输入
- 输入验证（只接受汉字）
- Enter 键提交

### StrokeDisplay

笔画动画组件，基于 HanziWriter：
- 自动书写动画
- 手动书写模式
- 笔画高亮显示

### StrokeSteps

笔顺步骤组件：
- 分步骤展示每一笔
- 当前步骤高亮
- 支持前进/后退导航

### CharacterDetails

汉字详情卡片，展示：
- 拼音和释义
- 笔画数和部首
- 字体结构
- 组词列表
- 例句
- 多音字其他读音

### CharacterGrid

汉字网格展示：
- 按教材筛选
- 网格布局
- 点击查看详情

### TextbookSelector

教材选择器：
- 全部生字
- 一年级上册
- 一年级下册

## 样式系统

### 颜色变量

项目使用 Tailwind CSS，主要颜色：

```css
--primary: 220 90% 56%;      /* 主色调 */
--background: 0 0% 100%;     /* 背景色 */
--foreground: 222 47% 11%;   /* 前景色 */
--card: 0 0% 100%;           /* 卡片背景 */
--border: 214 32% 91%;       /* 边框色 */
```

### 动画效果

```css
.animate-fade-in    /* 淡入 */
.animate-scale-in   /* 缩放进入 */
.animate-slide-up   /* 上滑进入 */
```

## 部署

### Vercel 部署

1. Fork 本项目到你的 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

### Netlify 部署

1. 连接 GitHub 仓库
2. 配置构建命令：`npm run build`
3. 配置发布目录：`dist`
4. 添加环境变量

### Supabase 部署

项目配置了 Supabase，需要：

1. 创建 Supabase 项目
2. 创建 Edge Function `get-character-info`
3. 配置环境变量

## 开发指南

### 添加新的汉字数据

在对应的 `data/` 文件中添加：

```typescript
export const characterData: CharacterDatabase = {
  "汉": {
    character: "汉",
    pinyin: "hàn",
    meaning: "汉族；汉语；男子",
    strokeCount: 5,
    radicalInfo: "氵（三点水）",
    structure: "左右结构",
    words: [
      { word: "汉字", pinyin: "hàn zì", meaning: "记录汉语的文字" },
    ],
    sentences: [
      "我爱学汉字。",
    ],
  },
  // ... 更多汉字
};
```

### 修改样式

1. 全局样式：`src/index.css`
2. 组件样式：使用 Tailwind CSS 类名
3. 主题配置：`tailwind.config.ts`

### 添加新页面

1. 在 `src/pages/` 创建新组件
2. 在 `src/App.tsx` 添加路由

## 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/xxx`
3. 提交更改：`git commit -m 'feat: xxx'`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

### 提交规范

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具相关

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提 Issue。

---

**快乐学汉字，一笔一画成长！** ❤️
