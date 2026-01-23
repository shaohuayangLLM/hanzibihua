# 一年级数学题目生成器使用指南

本项目提供了一年级数学上册题目的完整分析和生成系统，基于对北师大版期末综合素质测评的深入分析。

## 文件说明

### 1. math_analysis_report.md
完整的分析报告，包含：
- 题型分类与详细分析（9大题型）
- 具体题目示例
- 知识点汇总
- 难度分级标准
- 创新题型推荐
- 在线练习系统功能建议

### 2. question-types-schema.ts
TypeScript类型定义文件，包含：
- 所有题型接口定义（10种题型）
- 知识点枚举（20个知识点）
- 难度等级定义
- 题目数据结构
- 练习会话和进度跟踪接口

### 3. sample-questions.ts
示例题目库，包含：
- 填空题示例（7题）
- 选择题示例（3题）
- 计算题示例（7题）
- 规律题示例（3题）
- 应用题示例（5题）
- 时钟题示例（2题）
- 比较题示例（2题）

### 4. question-generator.ts
题目生成器实现，包含：
- 工具函数（随机数、选择、洗牌等）
- 填空题生成器（4种）
- 计算题生成器（4种）
- 规律题生成器（2种）
- 应用题生成器（2种）
- 批量生成函数
- 综合练习生成器
- 口算练习生成器
- 按知识点练习生成器

### 5. parse_ppt.py
PPT解析脚本，用于提取PPT中的题目内容。

### 6. ppt_analysis_result.json
原始PPT解析结果（JSON格式）。

## 快速开始

### 安装依赖（如果需要解析PPT）

```bash
pip install python-pptx
```

### 解析新的PPT文件

```bash
python3 parse_ppt.py
```

### 在TypeScript项目中使用

```typescript
import {
  generateMentalMathPractice,
  generateMixedPractice,
  generatePracticeByKnowledgePoint
} from './question-generator';

// 生成30道口算题
const mentalMath = generateMentalMathPractice(30);

// 生成20道综合练习题
const mixedPractice = generateMixedPractice(20);

// 按知识点生成练习（例如：加减法）
const additionPractice = generatePracticeByKnowledgePoint(
  'addition_subtraction',
  10
);

// 使用题目
mentalMath.forEach(question => {
  console.log(question.content.expression);
  console.log('答案:', question.content.answer);
});
```

## 题型分类

### 1. 填空题 (fill)
- 数的比较
- 相邻数
- 填未知数
- 符号填空

### 2. 选择题 (choice)
- 分类选择
- 图形选择
- 问题选择

### 3. 计算题 (calculate)
- 基础加减法
- 连加连减
- 加减混合

### 4. 连线题 (match)
- 数物对应
- 算式配对

### 5. 比较题 (compare)
- 数量比较
- 大小比较

### 6. 规律题 (pattern)
- 图形规律
- 数列规律
- 算式规律

### 7. 图形题 (shape)
- 认识图形
- 数图形

### 8. 应用题 (application)
- 加法应用
- 减法应用
- 排队问题
- 推理问题

### 9. 分类题 (classify)
- 单标准分类
- 多标准分类

### 10. 时钟题 (clock)
- 认识整时

## 知识点覆盖

| 模块 | 知识点 | 题型 |
|------|--------|------|
| 数的认识 | 0-10的认识 | 填空、连线 |
| 数的认识 | 数序、相邻数 | 填空 |
| 数的认识 | 数的大小比较 | 填空、比较 |
| 数的认识 | 数的分解与组成 | 填空、计算 |
| 加减法 | 10以内加减法 | 计算、填空 |
| 加减法 | 连加连减 | 计算 |
| 加减法 | 填未知数 | 填空 |
| 规律 | 图形规律 | 填空 |
| 规律 | 数列规律 | 填空 |
| 规律 | 算式规律 | 填空 |
| 图形 | 认识图形 | 图形、填空 |
| 图形 | 数图形 | 填空 |
| 位置 | 前后、左右 | 填空 |
| 钟表 | 认识整时 | 填空 |
| 分类 | 分类标准 | 填空 |
| 应用 | 加法应用 | 应用 |
| 应用 | 减法应用 | 应用 |
| 应用 | 排队问题 | 应用 |

## 难度分级

### 一级（基础）- 30%
- 直观、单一知识点
- 示例：数物对应、简单计数、10以内直接运算

### 二级（中等）- 50%
- 需要理解、2-3个知识点综合
- 示例：填未知数、连加连减、简单应用题

### 三级（较难）- 15%
- 需要推理、多个知识点综合
- 示例：规律填空、重叠问题、两步应用题

### 四级（挑战）- 5%
- 创新型、需要深入思考
- 示例：复杂推理、开放性答案

## 创新题型推荐

1. **互动式数数题** - 点击计数
2. **拖拽配对题** - 算式与答案拖拽匹配
3. **时钟拨动题** - 交互式时钟
4. **图形拼搭题** - 七巧板拼图
5. **数字规律接龙** - 动态数列
6. **生活情境动画题** - 动画展示应用题
7. **口算挑战** - 限时模式
8. **错题收集本** - 自动记录错题
9. **小组PK模式** - 多人竞技
10. **语音答题** - 语音识别答案

## 题目数据结构示例

### 填空题
```typescript
{
  id: 'fill_001',
  type: 'fill',
  difficulty: 2,
  knowledgePoints: ['number_compare', 'number_0_10'],
  estimatedTime: 30,
  content: {
    question: '在○里填上">"、"<"或"＝"。',
    blanks: [
      { index: 0, answer: '<', type: 'text' },
    ],
  },
}
```

### 计算题
```typescript
{
  id: 'calc_001',
  type: 'calculate',
  difficulty: 1,
  knowledgePoints: ['addition_subtraction'],
  estimatedTime: 15,
  content: {
    expression: '3 + 2 =',
    answer: 5,
    category: 'addition',
  },
}
```

### 应用题
```typescript
{
  id: 'app_001',
  type: 'application',
  difficulty: 2,
  knowledgePoints: ['word_problem_add'],
  estimatedTime: 60,
  content: {
    scenario: '树上有8只小鸟，飞走了5只。',
    question: '还剩几只小鸟？',
    answer: {
      value: 3,
      expression: '8 - 5 = 3',
      unit: '只',
    },
    explanation: '求剩余用减法',
  },
}
```

## 扩展建议

### 1. 添加新题型
在 `question-types-schema.ts` 中添加新的题型接口，然后在 `question-generator.ts` 中实现生成器。

### 2. 添加新知识点
在 `KnowledgePoint` 类型中添加新的知识点枚举值。

### 3. 自定义题目
参考 `sample-questions.ts` 中的示例，创建自己的题库。

### 4. 图片资源
题目中的 `image` 字段可以指向实际的图片资源，建议使用SVG格式以获得更好的清晰度。

### 5. 音频资源
对于适合低年级的题目，可以添加音频朗读功能，在 `content` 中添加 `audio` 字段。

## 技术栈建议

### 前端
- React / Vue - UI框架
- TypeScript - 类型安全
- Canvas / SVG - 图形渲染
- Web Speech API - 语音识别

### 后端（可选）
- Node.js + Express - API服务
- MongoDB / PostgreSQL - 题库存储
- JWT - 用户认证

### 部署
- Vercel / Netlify - 前端部署
- GitHub Pages - 静态托管

## 许可证

本项目基于对北师大版一年级数学上册期末测评的分析，仅供教育学习使用。

## 贡献

欢迎提交问题和改进建议！

## 联系方式

如有问题，请通过GitHub Issues联系。
