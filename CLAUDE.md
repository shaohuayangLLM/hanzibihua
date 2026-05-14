# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此代码仓库中工作时提供项目指引。

## ⚠️ 改代码前必读

1. **不要生成新的过程文档**。不写 RELEASE_NOTES / IMPLEMENTATION_SUMMARY / FEATURE_STATUS / *_REFACTOR / *_FIX 之类的 md。**改了什么写 commit message + CHANGELOG.md 就够了**。历史归档在 `docs/archive/`。
2. **不要随便加新依赖**。已经有 40+ Radix UI，绝大多数 UI 需求可在 `src/components/ui/` 复用。
3. **每个模块都有对应的 data 文件**（见底部"数据文件"清单）。改逻辑前先看 data 形状。
4. **修 bug 优先于加新功能**。看到无关 bug 顺手记到 `BUG-TRIAGE.md`（如果存在），不要边修边扩范围。
5. **路由都在 `src/App.tsx` 一个文件里，懒加载**。加新模块时新增一行 `lazy + Suspense` 即可。

## 项目概述

K12-Education 是一款面向小学生的汉字学习应用，包含笔顺动画（HanziWriter）、拼音练习、语文/数学/英语教学功能，以及与教材对齐的汉字练习。以子目录 SPA 形式部署在 `/k12/` 路径下。

**线上地址**：https://ainside.cn/k12/

## 开发命令

```bash
# 启动开发服务器（运行于 http://localhost:8080/k12/）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 数据校验（词语搭配）
npm run validate:collocation
npm run report:collocation

# 数据校验（组词训练）
npm run validate:word-building
npm run report:word-building

# 数据校验（同音词辨义）
npm run validate:homophone-meaning
npm run report:homophone-meaning
```

**注意**：开发服务器运行于 `http://localhost:8080/k12/`，而非根路径。所有路由均含 `/k12/` 前缀。

## 部署架构

本应用以**子目录**形式部署在父级 portfolio 仓库中：

```
portfolio-2025/
├── k12/                    # K12-Education/dist/ 的构建产物
├── K12-Education/          # 源代码（本仓库，在父级 .gitignored）
├── vercel.json             # 将 /k12/* 路由指向 k12/*
└── index.html              # 主 portfolio 页面（含 K12 入口卡片）
```

**部署流程：**
1. 在 `K12-Education/` 中执行：`npm run build`
2. 将 `dist/*` 复制到 `../k12/`
3. 在 `portfolio-2025/` 中执行：`git add k12/ && git commit && git push`
4. Vercel 自动部署

## 高层架构

### 路由

使用 React Router v6，`basename="/k12"`，路由在 `src/App.tsx` 中定义：

**语文模块：**
| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | `Index.tsx` | 主页（语文/数学/英语入口） |
| `/stroke-learning` | `StrokeLearning.tsx` | 汉字笔画学习 |
| `/stroke-names` | `StrokeNames.tsx` | 笔画名称学习 |
| `/pinyin-basics` | `PinyinBasics.tsx` | 拼音基础 |
| `/pinyin-combination` | `PinyinCombination.tsx` | 声韵母拼合练习 |
| `/quiz` | `PinyinQuiz.tsx` | 拼音测验（reducer 状态管理） |
| `/radicals` | `RadicalLearning.tsx` | 偏旁部首学习 |
| `/polyphone` | `PolyphonePractice.tsx` | 多音字练习 |
| `/similar-characters` | `SimilarCharacters.tsx` | 形近字辨析 |
| `/quantity-words` | `QuantityWordPractice.tsx` | 量词练习 |
| `/antonym-synonym` | `AntonymSynonymPractice.tsx` | 反义词/近义词 |
| `/homophone-meaning` | `HomophoneMeaningPractice.tsx` | 同音词辨义 |
| `/connective-words` | `ConnectiveWordsPractice.tsx` | 连接词学习 |
| `/character-finder` | `CharacterFinder.tsx` | 汉字查找 |
| `/find-different` | `FindDifferentGame.tsx` | 找不同游戏 |
| `/puzzle-game` | `PuzzleGame.tsx` | 拼图游戏 |

**形状学习（数学衍生）：**

| 路径 | 组件 | 说明 |
|------|------|------|
| `/math/shapes/...` | `src/components/shapes/scenes/` | 33 个折/剪/拼形状动画场景 |

**Pretext 演示页（实验性）：**

| 路径 | 组件 | 说明 |
|------|------|------|
| `/pretext-demo` | `PretextDemo.tsx` | Pretext 库实验 |
| `/pretext-editorial` | `PretextEditorial.tsx` | 编辑式排版 |
| `/pretext-masonry` | `PretextMasonry.tsx` | 瀑布流排版 |

**数学模块：**
| 路径 | 说明 |
|------|------|
| `/math` | 数学首页 |
| `/math/module/:moduleId` | 模块学习页 |
| `/math/knowledge/:moduleId` | 知识点讲解页 |
| `/math/test/:moduleId` | 模块测验页 |
| `/math/result/:sessionId` | 测验结果页 |

**其他：**
| 路径 | 说明 |
|------|------|
| `/install` | PWA 安装引导 |
| `/voice-test` | 阿里云 TTS 音色测试 |

### 数据层（两级缓存）

**本地优先，AI 兜底：**
1. **本地字库**（`src/data/characterInfo.ts`）—— 汇总自多个文件，约 900+ 字
2. **AI 兜底**：通过 Supabase Edge Function（`get-character-info`）处理本地未收录的字

```typescript
// characterInfo.ts 中的数据合并模式
export const characterDatabase = {
  ...baseCharacters,
  ...grade1Vol1Characters,
  ...grade1Vol2Characters,
  // ...更多字库文件
};

export const getCharacterInfo = (char: string) => {
  // 先查本地，再调用 Supabase AI
};
```

**汉字数据结构：**
```typescript
interface CharacterInfo {
  character: string;
  pinyin: string;
  meaning: string;
  strokeCount: number;
  radicalInfo: string;
  structure?: string;
  words: Array<{word: string; pinyin: string; meaning: string}>;
  sentences: string[];
  additionalReadings?: PinyinReading[];  // 多音字
  quizContexts?: QuizContext[];
}
```

### 测验系统（Reducer 模式）

`PinyinQuiz.tsx` 使用 `useReducer` 管理复杂测验状态：

```typescript
type QuizAction =
  | { type: 'START'; questions: QuizQuestion[] }
  | { type: 'ANSWER'; answer: QuizAnswer }
  | { type: 'NEXT' | 'RESTART' | 'EXIT' };

// 出题模式：
// - 综合模式：从所有汉字随机抽取
// - 前后鼻音：ang/an、eng/en、ing/in 对比
// - 平翘舌：zh/z、ch/c、sh/s 对比
```

### 核心算法（`src/data/characterInfo.ts`）

- `removeTones()` —— 去除声调标记，用于拼音匹配
- `extractTone()` —— 提取声调编号（1-4）
- `applyTone()` —— 将声调应用到第一个韵母
- `convertNasal()` —— 前后鼻音转换（用于生成干扰项）
- `convertTongue()` —— 平翘舌转换（用于生成干扰项）

### 组件架构

**容器/展示组件分离模式：**
- 页面组件（`src/pages/`）：负责状态管理、数据请求、路由导航
- UI 组件（`src/components/`）：负责展示与用户交互

```typescript
// Index.tsx（容器组件）
const [character, setCharacter] = useState("");
const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(null);
// 负责数据获取和加载状态管理

// CharacterDetails.tsx（展示组件）
interface Props { info: CharacterInfo; }
// 只负责展示数据，不包含获取逻辑
```

### 专用组件

**HanziWriter 集成**（`StrokeDisplay.tsx`）：
```typescript
HanziWriter.create(container, character, {
  strokeAnimationSpeed: 1,
  delayBetweenStrokes: 300,
  strokeColor: "#3d3226",
  drawingColor: "#e04a3a",
});
```

**田字格**（`index.css` 纯 CSS 实现）：
```css
.mizige {
  border: 2px solid #333;
  /* 通过 repeating-linear-gradient 实现虚线十字线 */
}
```

## 配置详情

### 路径别名（`tsconfig.json`）
```typescript
"@/*": ["./src/*"]
// 使用示例：import { Button } from "@/components/ui/button"
```

### Vite 配置（`vite.config.ts`）
- `base: '/k12/'` —— 子目录部署
- 端口：8080
- PWA：使用 `vite-plugin-pwa`（服务工作线程自动更新）

### 环境变量（`.env`）
```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

## 样式系统

**CSS 变量**（`index.css`）：
```css
--primary: 25 95% 55%;        /* 橙红色调 */
--accent: 160 60% 45%;        /* 绿色调 */
--radius: 1rem;
```

**字体策略：**
- 主字体：系统楷书（教育场景的真实感）
- 降级字体：Google Fonts（马善政、龙藏）
- CSS 类：`.font-kaiti`、`.font-brush`

**语音系统：**
- 主要：阿里云 TTS（Aixia 音色，适合儿童）
- 降级：Web Speech API（浏览器内置）
- 缓存：相同内容第二次播放几乎即时（localStorage 缓存）

## 特有约定

1. **拼音声调处理** —— 使用自定义算法处理声调变换，不依赖正则
2. **无表单库** —— 使用简单受控输入，适合儿童友好的 UX
3. **shadcn/ui** —— 复制粘贴式组件（非 npm 包），位于 `src/components/ui/`
4. **文字转语音** —— Web Speech API 直接在组件中调用，未抽象为服务层
5. **教材筛选** —— 支持按教材版本筛选汉字（人教版、北师大版、苏教版）
6. **懒加载路由** —— 所有页面均使用 `lazy + Suspense`，降低首屏加载压力
7. **质量门禁脚本** —— 各题库均有对应的 validate/report 脚本，PR 前需通过校验

## 数据文件

### 汉字字库

| 文件 | 用途 | 字数 |
|------|------|------|
| `src/data/types.ts` | 所有 TypeScript 类型定义（集中管理） | — |
| `src/data/baseCharacters.ts` | 基础常用字 | ~56 字 |
| `src/data/commonCharacters.ts` | 扩充常用字 | ~75 字 |
| `src/data/curriculumCharacters.ts` | 小学 1-2 年级课本高频字 | ~127 字 |
| `src/data/grade1Vol1Characters.ts` | 一年级上册字 | ~300 字 |
| `src/data/grade1Vol2Characters.ts` | 一年级下册字 | ~400 字 |
| `src/data/grade2Vol1Characters.ts` | 二年级上册字 | ~45 字 |
| `src/data/grade2Vol2Characters.ts` | 二年级下册字 | ~63 字 |
| `src/data/radicalCharacters.ts` | 偏旁部首相关字 | ~151 字 |
| `src/data/characterInfo.ts` | 数据访问层 + 测验生成 | — |

### 拼音数据

| 文件 | 用途 |
|------|------|
| `src/data/pinyinBasics.ts` | 23 声母、24 韵母、16 整体认读音节 |
| `src/data/pinyin/` | 声韵母拼合数据（按声母分组） |

### 语文题库

| 文件 | 用途 |
|------|------|
| `src/data/polyphoneData.ts` | 多音字数据 |
| `src/data/similarCharacters.ts` | 形近字数据 |
| `src/data/quantityWordData.ts` | 量词练习数据 |
| `src/data/antonymSynonymData.ts` | 反义词/近义词数据 |
| `src/data/homophoneMeaningV2Bank.ts` | 同音词辨义题库（120题） |
| `src/data/connectiveWordsData.ts` | 连接词学习数据（28组，56题） |
| `src/data/wordBuildingQuestions.ts` | 组词训练题库（400题） |
| `src/data/strokeNames.ts` | 笔画名称数据 |

### 数学/英语数据

| 文件 | 用途 |
|------|------|
| `src/data/math/` | 数学模块（题型、知识点、生成器） |
| `src/data/english/` | 英语模块（字母发音、拼读规则） |
| `src/data/chinese/modules.ts` | 语文模块入口配置 |
