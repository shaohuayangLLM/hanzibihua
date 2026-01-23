# K12-Education 项目开发进度

## 2025-01-23 - 笔画名称表功能重构

### 重大更新
- **笔画名称表重构** (`/stroke-names`)
  - **全新的视觉设计**：采用卡片网格布局，清晰展示笔画缩略图
  - **动态笔画演示**：新增 `StrokeAnimation` 组件，可动态演示特定笔画的书写路径（红字高亮）
  - **静态缩略图**：新增 `StrokeCardDisplay` 组件，并在缩略图中高亮目标笔画
  - **详细的弹窗学习**：
    - 左侧：大尺寸动态笔画演示，高亮显示目标笔画
    - 右侧：详细的笔画名称、拼音、书写要点讲解
    - 底部：更多例字展示，点击可查看
  - **书写要点数据完善**：更新了 20 个基本笔画的详细书写指导（如"从左到右，平平的"）

### 新增文件
```
src/components/strokes/
  ├── StrokeCardDisplay.tsx      # 静态笔画卡片展示（SVG高亮）
  └── StrokeAnimation.tsx        # 动态笔画书写演示（HanziWriter集成）
```

### 修改文件
```
src/pages/StrokeNames.tsx        # 重写笔画名称表页面
src/data/strokeNames.ts          # 更新笔画数据，添加详细的书写要点
```

### 技术实现
- 使用 `hanzi-writer` 的 `getScalingTransform` 精确控制 SVG 路径渲染
- SVG `path` 操控实现静态高亮效果（目标笔画红色，背景灰色）
- 动态演示逻辑：在灰色轮廓上单独绘制红色高亮的目标笔画动画

---

## 2025-01-19 - 数学模块知识扩展与路由修复

### 新增功能
- **数学模块基础知识扩展**
  - 数位与位数模块：新增 3 个知识点
    - 十位和个位怎么分清？（右左=个十）
    - 一位数 vs 两位数快速判断（数字个数=位数）
    - 你的左手和右手（用双手帮助记忆）
  - 排队与位置模块：新增 4 个知识点
    - 前面走了，你变第几？（前面走人，位置减）
    - 从左数 vs 从右数 - 怎么不混淆？（标记起始方向）
    - 什么是"一行"？什么是"一列"？（横行竖列）
    - 题目中的"它"是指什么？（指上一步算出的结果）
  - 看图列算式模块：强化 3 个知识点
    - 加法还是减法？一看关键词（记住5个加法词）
    - 减法还是加法？一看关键词（记住7个减法词）
    - 应用题中的"我"（你也是人，要算进去）
  - 计算与凑十法模块：新增完整模块 5 个知识点
    - 什么是数轴？（数轴像尺子）
    - 数轴加法：向右跳（加法=向右箭头）
    - 数轴减法：向左跳（减法=向左箭头）
    - 根据算式画数轴（先标起点，再画跳跃方向）
    - 凑十法是什么？（见9想1，见8想2，见7想3）

### 新增文件
```
src/data/math/knowledge.ts                    # 数学模块知识讲解数据（15个新知识点）
```

### 修改文件
```
src/pages/math/ModulePage.tsx                 # 集成知识讲解入口按钮
src/App.tsx                                   # 添加知识页面路由
portfolio-2025/vercel.json                    # 修复路由配置
portfolio-2025/K12-Education/vite.config.ts   # 添加 PWA 自动更新配置
portfolio-2025/K12-Education/src/main.tsx     # 添加 Service Worker 更新处理
```

### 重要修复

#### 1. Vercel 路由配置修复
**问题**: 生产环境 `/k12/math/*` 路由返回 404
**原因**: `vercel.json` 中的 `routes` 配置干扰了 SPA 路由
**解决**:
- 移除 `routes` 配置
- 只保留 `rewrites` 确保所有 `/k12/*` 路径返回 `index.html`
- 让 React Router 处理前端路由

#### 2. PWA Service Worker 缓存问题修复
**问题**: 浏览器缓存旧版本 JS 文件，导致更新不生效
**解决**:
- 添加 `skipWaiting: true` 和 `clientsClaim: true` 强制立即更新
- 添加自定义 Service Worker 注册逻辑
- 新版本可用时自动刷新页面
- 清理 `vercel.json` 末尾无效注释

### 技术实现
- 知识点数据结构：title, content, examples, tips
- 模块启用配置：KNOWLEDGE_ENABLED_MODULES
- 知识页面路由：`/math/knowledge/:moduleId`
- 模块页面集成"📚 先学习知识"按钮

### 部署记录
**提交历史**:
```
46de6c0 - feat: 扩展数学模块基础知识讲解
937d86e - fix: 修复 vercel.json 路由配置，支持 k12 SPA 路由
bf3930f - fix: 移除 vercel.json 末尾的注释符号
2828d68 - fix: 修复 PWA Service Worker 更新问题
```

**构建信息**:
- 构建文件: `index-C-VA2Unx.js` (722.98 KB)
- 样式文件: `index-DDVJuJaV.css` (84.48 KB)
- 生产环境: https://ainside.cn/k12/

### 使用说明
1. 访问 `/math` 选择数学模块
2. 点击模块卡片进入详情页
3. 点击"📚 先学习知识"查看知识点
4. 或直接访问 `/math/knowledge/:moduleId`

---

## 2025-01-11 - 发音测试功能

### 新增功能
- **发音测试模式** (`pronunciation` mode in quiz)
  - 实时语音识别评测拼音发音
  - 使用浏览器 Web Speech API (zh-CN)
  - 智能拼音匹配算法（支持声调识别）
  - 自动评分并给出反馈（✓ 正确 / ✗ 重试）
  - 正确后自动进入下一题
  - 实时显示录音状态和识别结果

### 新增文件
```
src/hooks/useSpeechRecognition.ts              # Web Speech API Hook
src/hooks/useBaiduVercelSpeech.ts              # 百度语音识别Hook（备用）
src/hooks/useBaiduSpeech.ts                    # 百度语音Hook（备用）
src/hooks/useXunfeiSpeech.ts                   # 讯飞语音Hook（备用）
src/components/quiz/PronunciationTestCard.tsx  # 发音测试卡片组件
src/utils/pinyinMatcher.ts                     # 拼音匹配算法
api/baidu-speech.js                            # Vercel Serverless Function（未使用）
supabase/functions/baidu-speech/               # Supabase Edge Function（未使用）
CLEAR_CACHE.md                                 # 浏览器缓存清除指南
setup-vercel-env.md                            # Vercel环境变量配置指南
```

### 修改文件
```
src/pages/PinyinQuiz.tsx                       # 集成发音测试模式
src/components/quiz/QuizModeSelector.tsx       # 添加发音测试选项
src/data/types.ts                              # 添加发音测试相关类型
```

### 技术实现

#### 语音识别方案选择
**最终方案：Web Speech API**
- ✅ 零配置，无需后端服务
- ✅ Chrome/Edge 对中文识别良好
- ✅ 低延迟，本地识别
- ✅ 无需音频格式转换

**曾尝试的方案：**
1. 百度语音识别 API
   - ❌ webm 格式不兼容
   - ❌ 需要音频转码
   - ❌ 后端 API 配置复杂

2. Vercel Serverless Functions
   - ❌ 环境变量配置繁琐
   - ❌ 音频上传失败（错误 3312）

#### 核心算法
**拼音匹配算法** (`src/utils/pinyinMatcher.ts`)
- 去除标点符号和空格
- 声调规范化处理
- 支持多音字匹配
- 模糊匹配得分计算（Levenshtein距离）

**Web Speech API 配置**
```typescript
{
  lang: 'zh-CN',           // 中文识别
  continuous: false,       // 单次识别
  interimResults: true,    // 显示中间结果
  maxAlternatives: 3,      // 获取多个候选结果
}
```

### 遇到的问题及解决

#### 1. useCallback 初始化顺序错误
**错误**: `Cannot access 'v' before initialization`
**原因**: `handleFinalResult` 使用 `resetTranscript`，但该函数在后面才定义
**解决**: 调整代码顺序，先调用 hook 再定义依赖它的回调

#### 2. 百度 API 音频格式不兼容
**错误**: `音频上传失败` (错误码 3312)
**原因**: 百度 API 不支持 webm 容器格式
**解决**: 切换到 Web Speech API，避免音频格式转换

#### 3. Vercel 运行时配置错误
**错误**: `Function Runtimes must have a valid version`
**原因**: `runtime: "nodejs18.x"` 格式在新版 Vercel 不支持
**解决**: 移除 `functions` 配置，Vercel 自动检测 `/api` 目录

#### 4. 浏览器缓存旧版本
**现象**: 页面仍调用旧的 `index-Dpb6GCoP.js`
**原因**: 浏览器缓存未更新
**解决**: 创建 `CLEAR_CACHE.md` 指导用户强制刷新

### 部署记录
**提交历史**:
```
ab4e7a0 - Switch to browser Web Speech API for pronunciation test
0be8842 - Fix Baidu Speech API call format
badd671 - Fix Vercel deployment: remove invalid runtime config
25db5f9 - Add Vercel environment variables setup guide
3f9db9e - Add Baidu speech recognition API endpoint
38ce2a4 - Fix variable initialization order in PinyinQuiz
968021a - Fix K12 app build to resolve useCallback error
```

**构建信息**:
- 构建文件: `index-BZv0omZC.js` (687.90 KB)
- 样式文件: `index-CWeLY1mw.css` (72.87 KB)
- 构建时间: ~2.3秒

### 使用说明
1. 访问 `/quiz` 页面
2. 选择 **"发音测试"** 模式
3. 点击 **开始训练**
4. 点击麦克风图标 🎤
5. 允许麦克风权限
6. 等待 1 秒后大声朗读汉字
7. 查看识别结果（✓ 正确自动进入下一题 / ✗ 可重试）

### 兼容性
- ✅ Chrome / Edge (推荐)
- ⚠️ Safari (支持但识别率较低)
- ❌ Firefox (不支持 Web Speech API)

---

## 2025-01-11 - 偏旁学习功能

### 新增功能
- **偏旁部首学习页面** (`/radicals`)
  - 29个一年级上册偏旁数据（来自 Excel 文件）
  - 偏旁选择器（网格布局，12列自适应）
  - 偏旁详情展示（名称、含义关联、例字）
  - 例字田字格展示 + 拼音显示 + 发音功能
  - 学习小贴士

### 新增文件
```
src/data/radicalData.ts                    # 偏旁数据（29个偏旁）
src/pages/RadicalLearning.tsx              # 偏旁学习页面
src/components/radicals/
  ├── RadicalSelector.tsx                  # 偏旁选择器
  └── RadicalDisplay.tsx                   # 偏旁详情展示
一年级上偏旁关联.xlsx                      # 偏旁数据源文件
一年级上偏旁关联.xlsx.bak                  # 备份文件
```

### 修改文件
```
src/App.tsx                                # 添加 /radicals 路由
src/pages/Index.tsx                        # 添加"偏旁学习"入口按钮
```

### 技术实现
- 偏旁数据结构：radical, name, relation, examples
- 例字自动解析为数组（按顿号分隔）
- 集成 usePinyinSpeech Hook 实现朗读
- 集成 getCharacterInfo 获取例字拼音

---

## 2025-01-11 - 拼音发音功能

### 新增功能
- **拼音发音功能** (Web Speech API)
  - 创建 `usePinyinSpeech` Hook 封装语音合成逻辑
  - 支持中文语音朗读（自动选择中文语音）
  - 可配置语速和音调参数
  - 浏览器兼容性检测和错误提示

- **拼音卡片发音**
  - 悬停时显示发音按钮（右上角喇叭图标）
  - 点击按钮朗读当前拼音
  - 不干扰原有点击查看详情功能

- **拼音详情弹窗发音**
  - 标题栏添加拼音发音按钮
  - 例字田字格左侧显示发音按钮
  - 点击可朗读对应汉字

- **拼音测试汉字发音**
  - 测试页面田字格下方添加"读音"按钮
  - 点击可朗读测试中的汉字

### 新增文件
```
src/hooks/usePinyinSpeech.ts          # 拼音发音Hook
```

### 修改文件
```
src/components/pinyinBasics/PinyinCard.tsx         # 添加发音按钮
src/components/pinyinBasics/PinyinDetailDialog.tsx # 添加发音按钮
src/components/quiz/QuestionCard.tsx               # 添加汉字读音按钮
```

### 技术实现
- Web Speech API (`SpeechSynthesisUtterance`)
- 自动加载中文语音列表
- 异步语音加载处理 (`onvoiceschanged`)
- 语速配置：拼音 0.8, 汉字 0.7

---

## 2025-01-10 (晚间) - 生产环境部署

### 部署工作
- **集成到个人主页** (`https://ainside.cn`)
  - 重新构建项目最新版本 (`npm run build`)
  - 将构建产物从 `K12-Education/dist/` 复制到 `portfolio-2025/k12/`
  - 更新了最新的资源文件（CSS、JS、PWA文件）

- **Vercel 路由配置**
  - 创建 `vercel.json` 配置文件
  - 配置 `/k12` 路由规则确保 SPA 正确访问
  - 支持子路径 `/k12/*` 的动态路由

- **Git 仓库管理**
  - 更新 `.gitignore` 排除 K12-Education 源代码目录
  - 只提交构建产物到 portfolio-2025 仓库
  - 提交信息: "Update K12-Education project with latest build"
  - 提交哈希: c725e64

- **生产部署**
  - 推送到 GitHub 远程仓库 (shaohuayangLLM/portfolio-2025)
  - Vercel 自动构建和部署
  - 部署成功并绑定到自定义域名 `https://ainside.cn`

### 访问地址
- 🌐 **生产环境**: https://ainside.cn/k12/
- 💻 **本地开发**: http://localhost:8080/k12/
- 📱 **主页入口**: https://ainside.cn (查看"K12 汉字学习"卡片)

### 部署架构
```
portfolio-2025/                    # 主仓库
├── k12/                          # K12应用构建产物
│   ├── assets/                   # 静态资源
│   │   ├── index-B99zuzaU.css   # 样式文件 (最新)
│   │   └── index-Bt21lxRu.js    # 脚本文件 (最新)
│   ├── index.html               # 入口文件
│   ├── pwa-*.png                # PWA 图标
│   └── sw.js                    # Service Worker
├── K12-Education/               # 源代码目录 (已加入.gitignore)
├── index.html                   # 个人主页
└── vercel.json                  # Vercel 路由配置
```

### 技术细节
- **构建工具**: Vite 5.4.19
- **构建时间**: ~3秒
- **构建大小**:
  - CSS: 70.96 KB (gzip: 12.61 KB)
  - JS: 669.48 KB (gzip: 204.79 KB)
  - 总计: ~740 KB (gzip: ~217 KB)
- **部署平台**: Vercel
- **CDN**: 全球 CDN 加速
- **域名**: ainside.cn (自定义域名)

### 下次更新流程
1. 在 `K12-Education/` 目录开发新功能
2. 运行 `npm run build` 构建
3. 复制 `dist/*` 到 `../k12/`
4. Git 提交并推送到远程
5. Vercel 自动部署

---

## 2025-01-10 (白天) - 功能开发

### 新增功能
- **拼音基础学习页面** (`/pinyin-basics`)
  - 23个声母 (b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s, y, w)
  - 24个韵母 (a, o, e, i, u, ü, ai, ei, ui, ao, ou, iu, ie, üe, er, an, en, in, un, ün, ang, eng, ing, ong)
  - 16个整体认读音节 (zhi, chi, shi, ri, zi, ci, si, yi, wu, yu, ye, yue, yuan, yin, yun, ying)
  - 卡片网格布局展示
  - 点击卡片查看例字（田字格显示）
  - 三种主题色区分类型：橙色（声母）、绿色（韵母）、紫色（整体认读）

### 功能优化
- **拼音测试页面**
  - 鼻音区分模式：前后鼻音二选一（正确 + 相对错误选项）
  - 舌位区分模式：平翘舌音二选一（正确 + 相对错误选项）
  - 修复空白页面问题（缺失 Button 导入）
  - 修复导航错误（返回主页路径问题）

### 样式改进
- 全站字体改为楷书 (Kaiti)
- 田字格样式优化
  - 黑色外框
  - 浅灰色虚线中线
  - z-index 分层确保文字在网格上方
- 拼音测试页面汉字显示使用田字格
- 拼音卡片悬停动画效果

### 新增文件
```
src/data/pinyinBasics.ts                    # 拼音基础数据
src/pages/PinyinBasics.tsx                  # 拼音基础学习页面
src/components/pinyinBasics/
  ├── PinyinTypeSelector.tsx                # 类型选择器（声母/韵母/整体认读）
  ├── PinyinGrid.tsx                        # 拼音网格布局
  ├── PinyinCard.tsx                        # 拼音卡片
  └── PinyinDetailDialog.tsx                # 详情弹窗（田字格例字）
```

### 修改文件
```
src/App.tsx              # 添加 /pinyin-basics 路由
src/pages/Index.tsx      # 添加 "拼音基础" 入口按钮
src/index.css            # 添加拼音卡片样式、楷书字体
src/pages/PinyinQuiz.tsx # 修复导航路径
src/data/characterInfo.ts # 添加前后鼻音、平翘舌音转换逻辑
```

### 技术实现
- `removeTones()`: 去除拼音声调用于模式匹配
- `extractTone()`: 提取拼音声调编号 (1-4)
- `applyTone()`: 将声调应用到第一个元音
- `convertNasal()`: 前后鼻音转换 (ang↔an, eng↔en, ing↔in, ong↔on)
- `convertTongue()`: 平翘舌音转换 (zh↔z, ch↔c, sh↔s, r→z)

---

## 功能清单

### 已完成
- [x] 汉字笔顺学习
- [x] 汉字详情展示（拼音、释义、部首、结构、组词、例句）
- [x] 田字格汉字显示
- [x] 笔画动画展示
- [x] 笔画步骤分解
- [x] 拼音测试（综合模式）
- [x] 鼻音区分专项测试（二选一）
- [x] 舌位区分专项测试（二选一）
- [x] 发音测试模式（语音识别评测）
- [x] 拼音基础学习（声母、韵母、整体认读音节）
- [x] 教材版本选择（人教版、北师大版、苏教版）
- [x] 按教材筛选汉字
- [x] 拼音发音功能（Web Speech API）
- [x] 偏旁部首学习（29个一年级上册偏旁）

### 待开发
- [ ] 发音口型动画
- [ ] 拼音组合练习
- [ ] 声调标注学习
- [ ] 拼音书写练习
- [ ] 用户学习进度保存
- [ ] 错题本功能
- [ ] 学习统计报告
