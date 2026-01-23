# 一年级数学题目生成器 - 目录结构

## 完整文件列表

```
src/data/math/generators/
│
├── 📄 核心文件（新系统）
│   ├── question-types-schema.ts        (6.4K) - 类型定义
│   ├── sample-questions.ts             (15K)  - 示例题库
│   ├── question-generator.ts           (17K)  - 题目生成器
│   ├── new-generators-index.ts         (7.0K) - 统一导出
│   └── example-usage.ts                (8.8K) - 使用示例
│
├── 📊 分析文档
│   ├── math_analysis_report.md         (14K)  - 完整分析报告
│   ├── README.md                       (6.6K) - 使用指南
│   ├── PROJECT_SUMMARY.md              (6.4K) - 项目总结
│   └── DIRECTORY_STRUCTURE.md          (本文档)
│
├── 🔧 工具脚本
│   └── parse_ppt.py                    (6.7K) - PPT解析脚本
│
├── 💾 数据文件
│   └── ppt_analysis_result.json        (24K)  - PPT解析结果
│
└── 📁 旧系统（保留）
    ├── index.ts                        (2.9K) - 旧版导出
    ├── placeValueGenerator.ts          (5.0K) - 数位生成器
    ├── pictureOperationGenerator.ts    (20K)  - 看图运算生成器
    ├── calculationGenerator.ts         (6.9K) - 计算生成器
    └── queueGenerator.ts               (11K)  - 排队生成器

总计: 15个文件, 约155KB
```

## 文件分类

### 📘 核心系统文件

| 文件 | 大小 | 说明 |
|------|------|------|
| question-types-schema.ts | 6.4K | TypeScript类型定义，包含所有接口 |
| sample-questions.ts | 15K | 示例题目库，29道示例题 |
| question-generator.ts | 17K | 题目生成器实现 |
| new-generators-index.ts | 7K | 统一导出和便捷工具 |
| example-usage.ts | 8.8K | 10个使用场景示例 |

### 📊 分析文档

| 文件 | 大小 | 说明 |
|------|------|------|
| math_analysis_report.md | 14K | 完整的分析报告（推荐首先阅读） |
| README.md | 6.6K | 快速入门指南 |
| PROJECT_SUMMARY.md | 6.4K | 项目总结和统计数据 |
| DIRECTORY_STRUCTURE.md | - | 本文档（目录结构说明） |

### 🔧 工具和数据

| 文件 | 大小 | 说明 |
|------|------|------|
| parse_ppt.py | 6.7K | Python PPT解析脚本 |
| ppt_analysis_result.json | 24K | 原始PPT解析数据 |

### 🗂️ 旧系统文件

| 文件 | 大小 | 说明 |
|------|------|------|
| index.ts | 2.9K | 旧版导出文件 |
| placeValueGenerator.ts | 5K | 数位相关题目生成器 |
| pictureOperationGenerator.ts | 20K | 看图运算题目生成器 |
| calculationGenerator.ts | 6.9K | 计算题目生成器 |
| queueGenerator.ts | 11K | 排队问题生成器 |

## 推荐阅读顺序

### 🎯 快速上手
1. **README.md** - 了解项目基本用法
2. **example-usage.ts** - 查看实际代码示例
3. **new-generators-index.ts** - 查看导出的API

### 📖 深入理解
1. **math_analysis_report.md** - 完整的分析报告
2. **question-types-schema.ts** - 类型系统设计
3. **question-generator.ts** - 生成器实现原理

### 🔧 扩展开发
1. **PROJECT_SUMMARY.md** - 项目总结
2. **sample-questions.ts** - 题目数据结构示例
3. **parse_ppt.py** - 如何解析新的PPT

## 文件依赖关系

### 新系统依赖图

```
question-types-schema.ts (类型定义)
    ↑
    ├──→ sample-questions.ts (示例题目)
    │
    └──→ question-generator.ts (生成器)
            ↑
            └──→ new-generators-index.ts (导出)
                    ↑
                    └──→ example-usage.ts (示例)
```

### 数据流向

```
PPT文件
    ↓
parse_ppt.py (解析)
    ↓
ppt_analysis_result.json (原始数据)
    ↓
math_analysis_report.md (分析报告)
    ↓
question-types-schema.ts (类型设计)
    ↓
question-generator.ts (生成器实现)
    ↓
sample-questions.ts (示例题目)
```

## 按用途分类

### 📝 如果你想...

#### 了解题目类型和分析结果
→ 阅读 `math_analysis_report.md`

#### 快速开始使用生成器
→ 阅读 `README.md` 和 `example-usage.ts`

#### 理解数据结构
→ 查看 `question-types-schema.ts`

#### 查看示例题目
→ 查看 `sample-questions.ts`

#### 扩展新题型
→ 参考 `question-generator.ts`

#### 解析新的PPT文件
→ 运行 `parse_ppt.py`

#### 集成到项目中
→ 使用 `new-generators-index.ts`

## 文件更新时间

| 文件 | 创建时间 | 最后更新 |
|------|----------|----------|
| parse_ppt.py | 2026-01-18 | 2026-01-18 |
| ppt_analysis_result.json | 2026-01-18 | 2026-01-18 |
| math_analysis_report.md | 2026-01-18 | 2026-01-18 |
| question-types-schema.ts | 2026-01-18 | 2026-01-18 |
| sample-questions.ts | 2026-01-18 | 2026-01-18 |
| question-generator.ts | 2026-01-18 | 2026-01-18 |
| new-generators-index.ts | 2026-01-18 | 2026-01-18 |
| example-usage.ts | 2026-01-18 | 2026-01-18 |
| README.md | 2026-01-18 | 2026-01-18 |
| PROJECT_SUMMARY.md | 2026-01-18 | 2026-01-18 |
| DIRECTORY_STRUCTURE.md | 2026-01-18 | 2026-01-18 |

## 空间占用统计

```
核心系统文件:  54.2K (35%)
分析文档:      27.0K (17%)
工具和数据:    30.7K (20%)
旧系统文件:    45.8K (28%)
─────────────────────────
总计:         157.7K (100%)
```

## 安装和使用

### 前置要求

```bash
# Python（用于解析PPT）
python3 --version  # 需要 3.6+

# Node.js（用于运行生成器）
node --version     # 需要 14+

# TypeScript
tsc --version      # 需要 4.5+
```

### 快速开始

```bash
# 1. 进入目录
cd src/data/math/generators

# 2. 查看文档
cat README.md

# 3. 运行示例（需要先编译TypeScript）
npm run build
node example-usage.js

# 4. 解析新的PPT
python3 parse_ppt.py
```

## 支持和反馈

- 📧 问题反馈: GitHub Issues
- 📖 文档: README.md
- 💬 讨论: GitHub Discussions

---

**文档版本**: 1.0.0
**最后更新**: 2026-01-18
**维护者**: Claude Code
