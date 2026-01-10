# K12-Education 项目开发进度

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
- [x] 拼音基础学习（声母、韵母、整体认读音节）
- [x] 教材版本选择（人教版、北师大版、苏教版）
- [x] 按教材筛选汉字

### 待开发
- [ ] 拼音发音功能（Web Speech API）
- [ ] 发音口型动画
- [ ] 拼音组合练习
- [ ] 声调标注学习
- [ ] 拼音书写练习
- [ ] 用户学习进度保存
- [ ] 错题本功能
- [ ] 学习统计报告
