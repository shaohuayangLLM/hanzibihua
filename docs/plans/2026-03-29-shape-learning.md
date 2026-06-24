# 图形学习模块 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为一年级下册数学新增「认识图形」交互式学习模块，包含图形认知、折叠动画、拖拽拼组、规律填空四个学习区，核心强调形状之间的转换关系。

**Architecture:** 独立页面 `/math/shapes`，不走现有数学 quiz 框架。页面内 4 个 Tab 切换学习区。拼一拼使用 SVG 画布 + 网格吸附 + 90° 步进旋转 + 翻转，纯前端实现无后端依赖。数据层按学习区分文件，组件层按功能拆分。

**Tech Stack:** React + TypeScript + SVG (内联) + Tailwind CSS + shadcn/ui (已有)。无新依赖。

---

## 整体文件结构

```
src/
├── data/math/shapes/
│   ├── types.ts                    # 图形类型定义
│   ├── shapeRecognition.ts         # 认识图形数据（5种图形 + 实物连线）
│   ├── foldAnimations.ts           # 折一折关卡数据
│   ├── puzzleLevels.ts             # 拼一拼关卡数据（入门/进阶/挑战）
│   └── patternSequences.ts         # 找规律题目数据
├── components/shapes/
│   ├── SVGShape.tsx                # 原子组件：渲染单个 SVG 图形（支持旋转/翻转/颜色）
│   ├── GridCanvas.tsx              # 网格画布（SVG），支持拖放接收
│   ├── DraggablePiece.tsx          # 可拖拽图形块（包裹 SVGShape）
│   ├── PieceToolbar.tsx            # 选中图形后的操作栏（旋转/翻转/删除）
│   ├── ShapeCard.tsx               # 认识图形的展示卡片
│   ├── FoldDemo.tsx                # 折叠动画演示组件
│   ├── PuzzleBoard.tsx             # 拼一拼的完整拼图板（画布+图形库+目标轮廓）
│   ├── FreeCanvas.tsx              # 自由创作模式画布
│   └── PatternQuestion.tsx         # 找规律题目组件
└── pages/math/
    └── ShapeLearning.tsx           # 主页面（Tab 切换 4 个学习区）
```

---

## Task 1: 类型定义与数据层

**Files:**
- Create: `src/data/math/shapes/types.ts`
- Create: `src/data/math/shapes/shapeRecognition.ts`
- Create: `src/data/math/shapes/foldAnimations.ts`
- Create: `src/data/math/shapes/puzzleLevels.ts`
- Create: `src/data/math/shapes/patternSequences.ts`

### Step 1: 创建类型定义

```typescript
// src/data/math/shapes/types.ts

/** 5 种基本平面图形 */
export type ShapeType = 'rectangle' | 'square' | 'triangle' | 'circle' | 'parallelogram';

/** 图形在网格上的表示 */
export interface GridShape {
  type: ShapeType;
  /** 网格宽度（格数） */
  gridW: number;
  /** 网格高度（格数） */
  gridH: number;
  /** SVG path data，相对于 gridW×gridH 的 viewBox */
  path: string;
  /** 显示颜色 */
  color: string;
  /** 显示名称 */
  label: string;
}

/** 画布上已放置的图形实例 */
export interface PlacedPiece {
  id: string;
  shape: GridShape;
  /** 网格列位置 */
  gridX: number;
  /** 网格行位置 */
  gridY: number;
  /** 旋转角度（0/90/180/270） */
  rotation: 0 | 90 | 180 | 270;
  /** 是否水平翻转 */
  flipH: boolean;
  /** 是否垂直翻转 */
  flipV: boolean;
}

// ============ 认识图形 ============

export interface ShapeInfo {
  type: ShapeType;
  name: string;
  /** 特征描述，供教学卡片展示 */
  features: string[];
  /** 边数（圆为 0） */
  sides: number;
  /** 现实生活中的例子 */
  realWorldExamples: Array<{ name: string; emoji: string }>;
  /** SVG path（固定 100×100 viewBox 内） */
  svgPath: string;
  /** 主题色 */
  color: string;
}

export interface RecognitionQuestion {
  id: string;
  /** 题目描述 */
  question: string;
  /** 需要辨认的图形混合列表 */
  shapes: Array<{ type: ShapeType; id: string }>;
  /** 正确答案的 ShapeType */
  answer: ShapeType;
}

// ============ 折一折 ============

export interface FoldStep {
  /** 步骤描述文字 */
  description: string;
  /** 该步骤的 SVG 状态（折线、切割线等） */
  svgElements: Array<{
    type: 'shape' | 'foldLine' | 'cutLine' | 'arrow';
    path: string;
    color: string;
    opacity?: number;
    dashArray?: string;
  }>;
}

export interface FoldLesson {
  id: string;
  title: string;
  /** 起始图形 */
  sourceShape: ShapeType;
  /** 结果图形 */
  resultShapes: ShapeType[];
  /** 折法描述 */
  method: string;
  /** 动画步骤 */
  steps: FoldStep[];
  /** 转换关系总结 */
  summary: string;
}

// ============ 拼一拼 ============

export type PuzzleDifficulty = 'beginner' | 'intermediate' | 'challenge';

export interface PuzzleLevel {
  id: string;
  title: string;
  difficulty: PuzzleDifficulty;
  /** 网格尺寸 */
  gridSize: { cols: number; rows: number };
  /** 目标轮廓（SVG path，用于半透明底图） */
  targetOutline: string;
  /** 可用图形块 */
  availablePieces: GridShape[];
  /** 参考答案（用于验证） */
  solutionPlacements: Array<{
    shapeIndex: number;
    gridX: number;
    gridY: number;
    rotation: 0 | 90 | 180 | 270;
    flipH: boolean;
  }>;
  /** 完成后展示的转换关系 */
  transformHint: string;
}

// ============ 找规律 ============

export interface PatternQuestion {
  id: string;
  /** 已展示的图形序列 */
  sequence: Array<{ type: ShapeType; color: string; size?: 'small' | 'medium' | 'large' }>;
  /** 缺失位置的索引 */
  missingIndex: number;
  /** 正确答案 */
  answer: { type: ShapeType; color: string; size?: 'small' | 'medium' | 'large' };
  /** 干扰选项（含正确答案） */
  options: Array<{ type: ShapeType; color: string; size?: 'small' | 'medium' | 'large' }>;
  /** 规律描述 */
  patternRule: string;
}
```

### Step 2: 创建认识图形数据

```typescript
// src/data/math/shapes/shapeRecognition.ts
import type { ShapeInfo, RecognitionQuestion } from './types';

export const SHAPE_INFO_LIST: ShapeInfo[] = [
  {
    type: 'rectangle',
    name: '长方形',
    features: ['有 4 条边', '对边相等', '有 4 个直角'],
    sides: 4,
    realWorldExamples: [
      { name: '书本', emoji: '📕' },
      { name: '门', emoji: '🚪' },
      { name: '电视', emoji: '📺' },
    ],
    svgPath: 'M10,20 L90,20 L90,80 L10,80 Z',
    color: '#60a5fa', // blue-400
  },
  {
    type: 'square',
    name: '正方形',
    features: ['有 4 条边', '4 条边一样长', '有 4 个直角'],
    sides: 4,
    realWorldExamples: [
      { name: '魔方', emoji: '🧊' },
      { name: '棋盘格', emoji: '♟️' },
      { name: '窗户', emoji: '🪟' },
    ],
    svgPath: 'M15,15 L85,15 L85,85 L15,85 Z',
    color: '#4ade80', // green-400
  },
  {
    type: 'triangle',
    name: '三角形',
    features: ['有 3 条边', '有 3 个角'],
    sides: 3,
    realWorldExamples: [
      { name: '三角尺', emoji: '📐' },
      { name: '山', emoji: '⛰️' },
      { name: '三明治切角', emoji: '🥪' },
    ],
    svgPath: 'M50,10 L90,90 L10,90 Z',
    color: '#fb923c', // orange-400
  },
  {
    type: 'circle',
    name: '圆',
    features: ['没有直边', '到中心距离处处相等', '没有角'],
    sides: 0,
    realWorldExamples: [
      { name: '钟表', emoji: '🕐' },
      { name: '硬币', emoji: '🪙' },
      { name: '车轮', emoji: '🛞' },
    ],
    svgPath: 'M50,10 A40,40 0 1,1 49.99,10 Z',
    color: '#f472b6', // pink-400
  },
  {
    type: 'parallelogram',
    name: '平行四边形',
    features: ['有 4 条边', '对边平行且相等', '没有直角'],
    sides: 4,
    realWorldExamples: [
      { name: '橡皮擦侧面', emoji: '📦' },
      { name: '梯子台阶', emoji: '🪜' },
    ],
    svgPath: 'M30,20 L90,20 L70,80 L10,80 Z',
    color: '#a78bfa', // violet-400
  },
];

/** 连一连 / 辨认练习题 */
export const RECOGNITION_QUESTIONS: RecognitionQuestion[] = [
  {
    id: 'rq-1',
    question: '下面哪些是三角形？',
    shapes: [
      { type: 'triangle', id: 's1' },
      { type: 'rectangle', id: 's2' },
      { type: 'triangle', id: 's3' },
      { type: 'circle', id: 's4' },
      { type: 'square', id: 's5' },
      { type: 'triangle', id: 's6' },
    ],
    answer: 'triangle',
  },
  {
    id: 'rq-2',
    question: '下面哪些是正方形？',
    shapes: [
      { type: 'square', id: 's1' },
      { type: 'rectangle', id: 's2' },
      { type: 'parallelogram', id: 's3' },
      { type: 'square', id: 's4' },
      { type: 'triangle', id: 's5' },
      { type: 'square', id: 's6' },
    ],
    answer: 'square',
  },
  {
    id: 'rq-3',
    question: '下面哪些是长方形？',
    shapes: [
      { type: 'rectangle', id: 's1' },
      { type: 'square', id: 's2' },
      { type: 'rectangle', id: 's3' },
      { type: 'parallelogram', id: 's4' },
      { type: 'rectangle', id: 's5' },
      { type: 'circle', id: 's6' },
    ],
    answer: 'rectangle',
  },
  {
    id: 'rq-4',
    question: '下面哪些是圆？',
    shapes: [
      { type: 'circle', id: 's1' },
      { type: 'square', id: 's2' },
      { type: 'circle', id: 's3' },
      { type: 'triangle', id: 's4' },
      { type: 'rectangle', id: 's5' },
      { type: 'circle', id: 's6' },
    ],
    answer: 'circle',
  },
  {
    id: 'rq-5',
    question: '下面哪些是平行四边形？',
    shapes: [
      { type: 'parallelogram', id: 's1' },
      { type: 'rectangle', id: 's2' },
      { type: 'square', id: 's3' },
      { type: 'parallelogram', id: 's4' },
      { type: 'triangle', id: 's5' },
      { type: 'parallelogram', id: 's6' },
    ],
    answer: 'parallelogram',
  },
];
```

### Step 3: 创建折一折数据

```typescript
// src/data/math/shapes/foldAnimations.ts
import type { FoldLesson } from './types';

export const FOLD_LESSONS: FoldLesson[] = [
  {
    id: 'fold-1',
    title: '长方形横着对折',
    sourceShape: 'rectangle',
    resultShapes: ['rectangle', 'rectangle'],
    method: '横着对折',
    steps: [
      {
        description: '这是一张长方形纸',
        svgElements: [
          { type: 'shape', path: 'M10,20 L190,20 L190,100 L10,100 Z', color: '#86efac', opacity: 0.8 },
        ],
      },
      {
        description: '沿中间横线对折',
        svgElements: [
          { type: 'shape', path: 'M10,20 L190,20 L190,100 L10,100 Z', color: '#86efac', opacity: 0.8 },
          { type: 'foldLine', path: 'M10,60 L190,60', color: '#ef4444', dashArray: '6,4' },
          { type: 'arrow', path: 'M100,90 L100,65', color: '#ef4444' },
        ],
      },
      {
        description: '变成了两个小长方形！',
        svgElements: [
          { type: 'shape', path: 'M10,20 L90,20 L90,100 L10,100 Z', color: '#86efac', opacity: 0.8 },
          { type: 'shape', path: 'M110,20 L190,20 L190,100 L110,100 Z', color: '#6ee7b7', opacity: 0.8 },
        ],
      },
    ],
    summary: '1 个长方形 → 横着对折 → 2 个小长方形',
  },
  {
    id: 'fold-2',
    title: '长方形竖着对折',
    sourceShape: 'rectangle',
    resultShapes: ['square', 'square'],
    method: '竖着对折',
    steps: [
      {
        description: '这是一张长方形纸',
        svgElements: [
          { type: 'shape', path: 'M10,10 L190,10 L190,100 L10,100 Z', color: '#93c5fd', opacity: 0.8 },
        ],
      },
      {
        description: '沿中间竖线对折',
        svgElements: [
          { type: 'shape', path: 'M10,10 L190,10 L190,100 L10,100 Z', color: '#93c5fd', opacity: 0.8 },
          { type: 'foldLine', path: 'M100,10 L100,100', color: '#ef4444', dashArray: '6,4' },
          { type: 'arrow', path: 'M150,55 L105,55', color: '#ef4444' },
        ],
      },
      {
        description: '变成了两个正方形！',
        svgElements: [
          { type: 'shape', path: 'M10,10 L90,10 L90,100 L10,100 Z', color: '#93c5fd', opacity: 0.8 },
          { type: 'shape', path: 'M110,10 L190,10 L190,100 L110,100 Z', color: '#60a5fa', opacity: 0.8 },
        ],
      },
    ],
    summary: '1 个长方形 → 竖着对折 → 2 个正方形',
  },
  {
    id: 'fold-3',
    title: '长方形斜着对折',
    sourceShape: 'rectangle',
    resultShapes: ['triangle', 'triangle'],
    method: '斜着对折',
    steps: [
      {
        description: '这是一张正方形纸',
        svgElements: [
          { type: 'shape', path: 'M10,10 L190,10 L190,190 L10,190 Z', color: '#fca5a5', opacity: 0.8 },
        ],
      },
      {
        description: '沿对角线对折',
        svgElements: [
          { type: 'shape', path: 'M10,10 L190,10 L190,190 L10,190 Z', color: '#fca5a5', opacity: 0.8 },
          { type: 'cutLine', path: 'M10,10 L190,190', color: '#ef4444', dashArray: '6,4' },
          { type: 'arrow', path: 'M140,60 L105,95', color: '#ef4444' },
        ],
      },
      {
        description: '变成了两个三角形！',
        svgElements: [
          { type: 'shape', path: 'M10,10 L190,10 L10,190 Z', color: '#fca5a5', opacity: 0.8 },
          { type: 'shape', path: 'M190,10 L190,190 L10,190 Z', color: '#f87171', opacity: 0.8 },
        ],
      },
    ],
    summary: '1 个正方形 → 沿对角线剪 → 2 个三角形',
  },
  {
    id: 'fold-4',
    title: '两个三角形拼正方形',
    sourceShape: 'triangle',
    resultShapes: ['square'],
    method: '拼合',
    steps: [
      {
        description: '两个完全一样的三角形',
        svgElements: [
          { type: 'shape', path: 'M10,10 L90,10 L10,90 Z', color: '#fdba74', opacity: 0.8 },
          { type: 'shape', path: 'M120,90 L200,90 L200,10 Z', color: '#fb923c', opacity: 0.8 },
        ],
      },
      {
        description: '把它们拼在一起',
        svgElements: [
          { type: 'shape', path: 'M10,10 L90,10 L10,90 Z', color: '#fdba74', opacity: 0.8 },
          { type: 'shape', path: 'M90,10 L90,90 L10,90 Z', color: '#fb923c', opacity: 0.8 },
          { type: 'arrow', path: 'M160,50 L95,50', color: '#ef4444' },
        ],
      },
      {
        description: '变成了一个正方形！',
        svgElements: [
          { type: 'shape', path: 'M10,10 L90,10 L90,90 L10,90 Z', color: '#fdba74', opacity: 0.6 },
          { type: 'foldLine', path: 'M10,90 L90,10', color: '#9ca3af', dashArray: '4,3' },
        ],
      },
    ],
    summary: '2 个三角形 → 拼合 → 1 个正方形',
  },
  {
    id: 'fold-5',
    title: '四个正方形拼长方形',
    sourceShape: 'square',
    resultShapes: ['rectangle'],
    method: '拼合',
    steps: [
      {
        description: '四个完全一样的正方形',
        svgElements: [
          { type: 'shape', path: 'M10,10 L45,10 L45,45 L10,45 Z', color: '#86efac', opacity: 0.8 },
          { type: 'shape', path: 'M55,10 L90,10 L90,45 L55,45 Z', color: '#4ade80', opacity: 0.8 },
          { type: 'shape', path: 'M100,10 L135,10 L135,45 L100,45 Z', color: '#34d399', opacity: 0.8 },
          { type: 'shape', path: 'M145,10 L180,10 L180,45 L145,45 Z', color: '#22c55e', opacity: 0.8 },
        ],
      },
      {
        description: '一个一个排成一排',
        svgElements: [
          { type: 'shape', path: 'M10,20 L45,20 L45,55 L10,55 Z', color: '#86efac', opacity: 0.8 },
          { type: 'shape', path: 'M45,20 L80,20 L80,55 L45,55 Z', color: '#4ade80', opacity: 0.8 },
          { type: 'shape', path: 'M80,20 L115,20 L115,55 L80,55 Z', color: '#34d399', opacity: 0.8 },
          { type: 'shape', path: 'M115,20 L150,20 L150,55 L115,55 Z', color: '#22c55e', opacity: 0.8 },
        ],
      },
      {
        description: '变成了一个长方形！',
        svgElements: [
          { type: 'shape', path: 'M10,20 L150,20 L150,55 L10,55 Z', color: '#86efac', opacity: 0.6 },
          { type: 'foldLine', path: 'M45,20 L45,55', color: '#9ca3af', dashArray: '3,3' },
          { type: 'foldLine', path: 'M80,20 L80,55', color: '#9ca3af', dashArray: '3,3' },
          { type: 'foldLine', path: 'M115,20 L115,55', color: '#9ca3af', dashArray: '3,3' },
        ],
      },
    ],
    summary: '4 个正方形 → 排成一排 → 1 个长方形',
  },
];
```

### Step 4: 创建拼一拼关卡数据

```typescript
// src/data/math/shapes/puzzleLevels.ts
import type { PuzzleLevel, GridShape } from './types';

// ========== 基础图形块库 ==========

const UNIT_SQUARE: GridShape = {
  type: 'square', gridW: 1, gridH: 1,
  path: 'M0,0 L1,0 L1,1 L0,1 Z',
  color: '#60a5fa', label: '正方形',
};

const UNIT_TRIANGLE_BR: GridShape = {
  type: 'triangle', gridW: 1, gridH: 1,
  path: 'M0,0 L1,0 L1,1 Z',          // 右上三角
  color: '#fb923c', label: '三角形',
};

const UNIT_TRIANGLE_BL: GridShape = {
  type: 'triangle', gridW: 1, gridH: 1,
  path: 'M0,0 L1,0 L0,1 Z',          // 左上三角
  color: '#f472b6', label: '三角形',
};

const RECT_2x1: GridShape = {
  type: 'rectangle', gridW: 2, gridH: 1,
  path: 'M0,0 L2,0 L2,1 L0,1 Z',
  color: '#4ade80', label: '长方形',
};

const LARGE_TRIANGLE: GridShape = {
  type: 'triangle', gridW: 2, gridH: 2,
  path: 'M1,0 L2,2 L0,2 Z',
  color: '#a78bfa', label: '大三角形',
};

const PARALLELOGRAM_2x1: GridShape = {
  type: 'parallelogram', gridW: 2, gridH: 1,
  path: 'M0.5,0 L2,0 L1.5,1 L0,1 Z',
  color: '#facc15', label: '平行四边形',
};

// ========== 关卡定义 ==========

export const PUZZLE_LEVELS: PuzzleLevel[] = [
  // ---------- 入门 ----------
  {
    id: 'p-b1',
    title: '2 个三角形 → 正方形',
    difficulty: 'beginner',
    gridSize: { cols: 2, rows: 2 },
    targetOutline: 'M0,0 L2,0 L2,2 L0,2 Z',
    availablePieces: [
      { ...UNIT_TRIANGLE_BR, color: '#fdba74' },
      { ...UNIT_TRIANGLE_BL, color: '#fb923c' },
    ],
    solutionPlacements: [
      { shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 1, gridX: 0, gridY: 0, rotation: 180, flipH: false },
    ],
    transformHint: '🔍 发现：2 个三角形可以拼成 1 个正方形！',
  },
  {
    id: 'p-b2',
    title: '2 个正方形 → 长方形',
    difficulty: 'beginner',
    gridSize: { cols: 2, rows: 1 },
    targetOutline: 'M0,0 L2,0 L2,1 L0,1 Z',
    availablePieces: [
      { ...UNIT_SQUARE, color: '#86efac' },
      { ...UNIT_SQUARE, color: '#4ade80' },
    ],
    solutionPlacements: [
      { shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 0, flipH: false },
    ],
    transformHint: '🔍 发现：2 个正方形排一排就变成了长方形！',
  },
  {
    id: 'p-b3',
    title: '2 个三角形 → 长方形',
    difficulty: 'beginner',
    gridSize: { cols: 2, rows: 1 },
    targetOutline: 'M0,0 L2,0 L2,1 L0,1 Z',
    availablePieces: [
      { ...UNIT_TRIANGLE_BR, color: '#93c5fd' },
      { ...UNIT_TRIANGLE_BL, color: '#60a5fa' },
    ],
    solutionPlacements: [
      { shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 0, flipH: false },
    ],
    transformHint: '🔍 发现：2 个三角形也能拼成长方形！',
  },
  // ---------- 进阶 ----------
  {
    id: 'p-i1',
    title: '4 个正方形 → 大正方形',
    difficulty: 'intermediate',
    gridSize: { cols: 2, rows: 2 },
    targetOutline: 'M0,0 L2,0 L2,2 L0,2 Z',
    availablePieces: [
      { ...UNIT_SQUARE, color: '#86efac' },
      { ...UNIT_SQUARE, color: '#4ade80' },
      { ...UNIT_SQUARE, color: '#34d399' },
      { ...UNIT_SQUARE, color: '#22c55e' },
    ],
    solutionPlacements: [
      { shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 2, gridX: 0, gridY: 1, rotation: 0, flipH: false },
      { shapeIndex: 3, gridX: 1, gridY: 1, rotation: 0, flipH: false },
    ],
    transformHint: '🔍 发现：4 个小正方形可以拼成 1 个大正方形！',
  },
  {
    id: 'p-i2',
    title: '4 个三角形 → 大三角形',
    difficulty: 'intermediate',
    gridSize: { cols: 4, rows: 2 },
    targetOutline: 'M2,0 L4,2 L0,2 Z',
    availablePieces: [
      { ...UNIT_TRIANGLE_BR, color: '#fdba74' },
      { ...UNIT_TRIANGLE_BL, color: '#fb923c' },
      { ...UNIT_TRIANGLE_BR, color: '#f97316' },
      { ...UNIT_TRIANGLE_BL, color: '#ea580c' },
    ],
    solutionPlacements: [
      { shapeIndex: 0, gridX: 1, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 1, gridX: 2, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 2, gridX: 0, gridY: 1, rotation: 0, flipH: false },
      { shapeIndex: 3, gridX: 3, gridY: 1, rotation: 0, flipH: false },
    ],
    transformHint: '🔍 发现：4 个小三角形可以拼成 1 个大三角形！',
  },
  {
    id: 'p-i3',
    title: '2 个三角形 → 平行四边形',
    difficulty: 'intermediate',
    gridSize: { cols: 3, rows: 2 },
    targetOutline: 'M1,0 L3,0 L2,2 L0,2 Z',
    availablePieces: [
      { ...LARGE_TRIANGLE, color: '#c4b5fd' },
      { ...LARGE_TRIANGLE, color: '#a78bfa' },
    ],
    solutionPlacements: [
      { shapeIndex: 0, gridX: 0, gridY: 0, rotation: 0, flipH: false },
      { shapeIndex: 1, gridX: 1, gridY: 0, rotation: 180, flipH: false },
    ],
    transformHint: '🔍 发现：2 个三角形还能拼成平行四边形！',
  },
  // ---------- 挑战 ----------
  {
    id: 'p-c1',
    title: '拼一个小房子',
    difficulty: 'challenge',
    gridSize: { cols: 4, rows: 4 },
    targetOutline: 'M1,0 L3,0 L3,1 L4,1 L4,4 L0,4 L0,1 L1,1 Z',
    availablePieces: [
      { ...UNIT_SQUARE, color: '#fca5a5' },
      { ...UNIT_SQUARE, color: '#f87171' },
      { ...UNIT_SQUARE, color: '#ef4444' },
      { ...RECT_2x1, color: '#93c5fd' },
      { ...RECT_2x1, color: '#60a5fa' },
      { ...UNIT_TRIANGLE_BR, color: '#fdba74' },
      { ...UNIT_TRIANGLE_BL, color: '#fb923c' },
    ],
    solutionPlacements: [],
    transformHint: '🏠 厉害！你用不同的图形拼出了一栋小房子！',
  },
  {
    id: 'p-c2',
    title: '拼一棵圣诞树',
    difficulty: 'challenge',
    gridSize: { cols: 4, rows: 5 },
    targetOutline: '',
    availablePieces: [
      { ...LARGE_TRIANGLE, color: '#86efac' },
      { ...LARGE_TRIANGLE, color: '#4ade80' },
      { ...LARGE_TRIANGLE, color: '#34d399' },
      { ...UNIT_SQUARE, color: '#a16207' },
    ],
    solutionPlacements: [],
    transformHint: '🎄 太棒了！三角形叠起来就像圣诞树！',
  },
];

// ========== 自由创作可用的图形库 ==========

export const FREE_MODE_SHAPES: GridShape[] = [
  UNIT_SQUARE,
  { ...UNIT_SQUARE, gridW: 2, gridH: 2, path: 'M0,0 L2,0 L2,2 L0,2 Z', color: '#60a5fa', label: '大正方形' },
  RECT_2x1,
  { ...RECT_2x1, gridW: 1, gridH: 2, path: 'M0,0 L1,0 L1,2 L0,2 Z', color: '#4ade80', label: '竖长方形' },
  UNIT_TRIANGLE_BR,
  UNIT_TRIANGLE_BL,
  LARGE_TRIANGLE,
  PARALLELOGRAM_2x1,
];

export const FREE_MODE_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4',
];
```

### Step 5: 创建找规律数据

```typescript
// src/data/math/shapes/patternSequences.ts
import type { PatternQuestion } from './types';

export const PATTERN_QUESTIONS: PatternQuestion[] = [
  {
    id: 'pat-1',
    sequence: [
      { type: 'circle', color: '#ef4444' },
      { type: 'square', color: '#3b82f6' },
      { type: 'circle', color: '#ef4444' },
      { type: 'square', color: '#3b82f6' },
      { type: 'circle', color: '#ef4444' },
      { type: 'square', color: '#3b82f6' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'square', color: '#3b82f6' },
    options: [
      { type: 'square', color: '#3b82f6' },
      { type: 'circle', color: '#ef4444' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'rectangle', color: '#f97316' },
    ],
    patternRule: '圆和正方形交替出现：圆 → 正方形 → 圆 → 正方形 → …',
  },
  {
    id: 'pat-2',
    sequence: [
      { type: 'triangle', color: '#22c55e' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'circle', color: '#ef4444' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'circle', color: '#ef4444' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'circle', color: '#ef4444' },
    options: [
      { type: 'circle', color: '#ef4444' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'square', color: '#3b82f6' },
      { type: 'rectangle', color: '#f97316' },
    ],
    patternRule: '每 3 个一组：三角 → 三角 → 圆 → 三角 → 三角 → 圆 → …',
  },
  {
    id: 'pat-3',
    sequence: [
      { type: 'square', color: '#ef4444', size: 'small' },
      { type: 'square', color: '#3b82f6', size: 'medium' },
      { type: 'square', color: '#22c55e', size: 'large' },
      { type: 'square', color: '#ef4444', size: 'small' },
      { type: 'square', color: '#3b82f6', size: 'medium' },
      { type: 'square', color: '#22c55e', size: 'large' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'square', color: '#22c55e', size: 'large' },
    options: [
      { type: 'square', color: '#22c55e', size: 'large' },
      { type: 'square', color: '#ef4444', size: 'small' },
      { type: 'square', color: '#3b82f6', size: 'medium' },
      { type: 'circle', color: '#22c55e', size: 'large' },
    ],
    patternRule: '形状相同但颜色和大小变化：红小 → 蓝中 → 绿大 → 红小 → …',
  },
  {
    id: 'pat-4',
    sequence: [
      { type: 'circle', color: '#ef4444' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'square', color: '#3b82f6' },
      { type: 'circle', color: '#ef4444' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'square', color: '#3b82f6' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'square', color: '#3b82f6' },
    options: [
      { type: 'square', color: '#3b82f6' },
      { type: 'circle', color: '#ef4444' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'rectangle', color: '#8b5cf6' },
    ],
    patternRule: '三种图形轮流出现：圆 → 三角 → 正方 → 圆 → 三角 → 正方 → …',
  },
  {
    id: 'pat-5',
    sequence: [
      { type: 'square', color: '#3b82f6' },
      { type: 'rectangle', color: '#3b82f6' },
      { type: 'square', color: '#22c55e' },
      { type: 'rectangle', color: '#22c55e' },
      { type: 'square', color: '#ef4444' },
      { type: 'rectangle', color: '#ef4444' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'rectangle', color: '#ef4444' },
    options: [
      { type: 'rectangle', color: '#ef4444' },
      { type: 'square', color: '#ef4444' },
      { type: 'rectangle', color: '#22c55e' },
      { type: 'triangle', color: '#ef4444' },
    ],
    patternRule: '正方形和长方形成对出现，每对换一种颜色',
  },
  {
    id: 'pat-6',
    sequence: [
      { type: 'triangle', color: '#ef4444' },
      { type: 'circle', color: '#ef4444' },
      { type: 'triangle', color: '#3b82f6' },
      { type: 'circle', color: '#3b82f6' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'circle', color: '#22c55e' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'circle', color: '#22c55e' },
    options: [
      { type: 'circle', color: '#22c55e' },
      { type: 'triangle', color: '#22c55e' },
      { type: 'circle', color: '#3b82f6' },
      { type: 'square', color: '#22c55e' },
    ],
    patternRule: '三角和圆成对出现，每对同色，颜色依次变化',
  },
  {
    id: 'pat-7',
    sequence: [
      { type: 'square', color: '#3b82f6', size: 'small' },
      { type: 'square', color: '#3b82f6', size: 'medium' },
      { type: 'square', color: '#3b82f6', size: 'large' },
      { type: 'triangle', color: '#ef4444', size: 'small' },
      { type: 'triangle', color: '#ef4444', size: 'medium' },
      { type: 'triangle', color: '#ef4444', size: 'large' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'triangle', color: '#ef4444', size: 'large' },
    options: [
      { type: 'triangle', color: '#ef4444', size: 'large' },
      { type: 'triangle', color: '#ef4444', size: 'small' },
      { type: 'square', color: '#3b82f6', size: 'large' },
      { type: 'circle', color: '#ef4444', size: 'large' },
    ],
    patternRule: '先蓝色正方形从小到大，再红色三角形从小到大',
  },
  {
    id: 'pat-8',
    sequence: [
      { type: 'circle', color: '#ef4444' },
      { type: 'circle', color: '#3b82f6' },
      { type: 'square', color: '#ef4444' },
      { type: 'square', color: '#3b82f6' },
      { type: 'triangle', color: '#ef4444' },
      { type: 'triangle', color: '#3b82f6' },  // missing
    ],
    missingIndex: 5,
    answer: { type: 'triangle', color: '#3b82f6' },
    options: [
      { type: 'triangle', color: '#3b82f6' },
      { type: 'triangle', color: '#ef4444' },
      { type: 'circle', color: '#3b82f6' },
      { type: 'square', color: '#3b82f6' },
    ],
    patternRule: '每种图形红蓝成对，图形依次变化：圆 → 正方 → 三角',
  },
];
```

### Step 6: 验证数据文件编译

Run: `cd "/Users/ysh/Manual Library/ClaudeCode/portfolio-2025/K12-Education" && npx tsc --noEmit src/data/math/shapes/types.ts`

### Step 7: Commit

```bash
git add src/data/math/shapes/
git commit -m "feat(shapes): add type definitions and data for shape learning module"
```

---

## Task 2: SVG 原子组件 — SVGShape

**Files:**
- Create: `src/components/shapes/SVGShape.tsx`

### Step 1: 实现 SVGShape 渲染组件

这是所有图形渲染的基础组件。接收 ShapeType + 变换参数，输出 SVG `<g>` 元素。

```tsx
// src/components/shapes/SVGShape.tsx
import type { ShapeType } from '@/data/math/shapes/types';

interface SVGShapeProps {
  type: ShapeType;
  /** 自定义 SVG path（覆盖内置路径） */
  path?: string;
  color: string;
  /** 渲染宽度（px） */
  width: number;
  height: number;
  rotation?: 0 | 90 | 180 | 270;
  flipH?: boolean;
  flipV?: boolean;
  opacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}

/** 内置形状路径（100×100 viewBox） */
const DEFAULT_PATHS: Record<ShapeType, string> = {
  rectangle: 'M10,25 L90,25 L90,75 L10,75 Z',
  square: 'M15,15 L85,15 L85,85 L15,85 Z',
  triangle: 'M50,10 L90,90 L10,90 Z',
  circle: 'M50,10 A40,40 0 1,1 49.99,10 Z',
  parallelogram: 'M30,20 L90,20 L70,80 L10,80 Z',
};

export const SVGShape = ({
  type, path, color, width, height,
  rotation = 0, flipH = false, flipV = false,
  opacity = 1, strokeColor = 'rgba(0,0,0,0.2)', strokeWidth = 1.5,
  className = '', onClick,
}: SVGShapeProps) => {
  const d = path || DEFAULT_PATHS[type];
  const cx = 50, cy = 50; // viewBox center

  const transforms: string[] = [];
  if (rotation) transforms.push(`rotate(${rotation} ${cx} ${cy})`);
  if (flipH) transforms.push(`translate(100, 0) scale(-1, 1)`);
  if (flipV) transforms.push(`translate(0, 100) scale(1, -1)`);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      <g transform={transforms.join(' ')} opacity={opacity}>
        <path
          d={d}
          fill={color}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
```

### Step 2: 验证编译

Run: `cd "/Users/ysh/Manual Library/ClaudeCode/portfolio-2025/K12-Education" && npx tsc --noEmit src/components/shapes/SVGShape.tsx`

### Step 3: Commit

```bash
git add src/components/shapes/SVGShape.tsx
git commit -m "feat(shapes): add SVGShape atom component for rendering shapes"
```

---

## Task 3: Tab 1 — 认识图形

**Files:**
- Create: `src/components/shapes/ShapeCard.tsx`
- Create: `src/components/shapes/RecognitionGame.tsx`

### Step 1: 创建 ShapeCard 教学卡片

翻转式卡片：正面显示图形 SVG + 名称，点击后翻转显示特征和生活实例。

```tsx
// src/components/shapes/ShapeCard.tsx
import { useState } from 'react';
import type { ShapeInfo } from '@/data/math/shapes/types';
import { SVGShape } from './SVGShape';

interface ShapeCardProps {
  shape: ShapeInfo;
  isActive?: boolean;
  onClick?: () => void;
}

export const ShapeCard = ({ shape, isActive, onClick }: ShapeCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative w-full aspect-square cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] ${
        flipped ? '[transform:rotateY(180deg)]' : ''
      }`}
      onClick={() => { setFlipped(!flipped); onClick?.(); }}
    >
      {/* 正面 */}
      <div className={`absolute inset-0 rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] ${
        isActive ? 'border-primary bg-primary/10' : 'border-border bg-card'
      }`}>
        <SVGShape type={shape.type} color={shape.color} width={80} height={80} />
        <span className="text-lg font-bold">{shape.name}</span>
        <span className="text-xs text-muted-foreground">{shape.sides > 0 ? `${shape.sides} 条边` : '没有直边'}</span>
      </div>

      {/* 背面 */}
      <div className="absolute inset-0 rounded-2xl border-2 border-border bg-card p-4 flex flex-col gap-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <h4 className="font-bold text-base">{shape.name}的特征</h4>
        <ul className="text-sm space-y-1">
          {shape.features.map((f, i) => <li key={i}>✅ {f}</li>)}
        </ul>
        <div className="mt-auto">
          <p className="text-xs text-muted-foreground mb-1">在生活中：</p>
          <div className="flex gap-2 flex-wrap">
            {shape.realWorldExamples.map((ex, i) => (
              <span key={i} className="text-sm">{ex.emoji} {ex.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Step 2: 创建辨认练习组件

点选式：显示一组混合图形，点击选出所有目标图形。

```tsx
// src/components/shapes/RecognitionGame.tsx
import { useState, useMemo } from 'react';
import type { RecognitionQuestion } from '@/data/math/shapes/types';
import { SHAPE_INFO_LIST } from '@/data/math/shapes/shapeRecognition';
import { SVGShape } from './SVGShape';
import { Button } from '@/components/ui/button';

interface RecognitionGameProps {
  questions: RecognitionQuestion[];
}

export const RecognitionGame = ({ questions }: RecognitionGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const q = questions[currentIndex];
  const correctIds = useMemo(
    () => new Set(q.shapes.filter(s => s.type === q.answer).map(s => s.id)),
    [q],
  );
  const targetName = SHAPE_INFO_LIST.find(s => s.type === q.answer)?.name ?? '';
  const allCorrect = submitted && [...correctIds].every(id => selected.has(id))
    && [...selected].every(id => correctIds.has(id));

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = () => setSubmitted(true);

  const handleNext = () => {
    setCurrentIndex(i => Math.min(i + 1, questions.length - 1));
    setSelected(new Set());
    setSubmitted(false);
  };

  const shapeInfo = (type: string) => SHAPE_INFO_LIST.find(s => s.type === type);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">第 {currentIndex + 1} / {questions.length} 题</p>
        <h3 className="text-xl font-bold">{q.question}</h3>
        <p className="text-sm text-muted-foreground mt-1">点击选出所有 <strong>{targetName}</strong></p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
        {q.shapes.map(s => {
          const info = shapeInfo(s.type);
          const isSelected = selected.has(s.id);
          const isCorrectShape = correctIds.has(s.id);

          let borderClass = 'border-border';
          if (submitted) {
            borderClass = isCorrectShape
              ? (isSelected ? 'border-green-500 bg-green-50' : 'border-red-300 bg-red-50')
              : (isSelected ? 'border-red-500 bg-red-50' : 'border-border');
          } else if (isSelected) {
            borderClass = 'border-primary bg-primary/10';
          }

          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${borderClass}`}
            >
              <SVGShape
                type={s.type}
                color={info?.color ?? '#9ca3af'}
                width={56}
                height={56}
              />
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={selected.size === 0}>确认答案</Button>
        ) : (
          <>
            <p className={`text-lg font-bold ${allCorrect ? 'text-green-600' : 'text-red-500'}`}>
              {allCorrect ? '✅ 全部正确！' : '❌ 再想想哦'}
            </p>
            {currentIndex < questions.length - 1 && (
              <Button onClick={handleNext}>下一题 →</Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
```

### Step 3: Commit

```bash
git add src/components/shapes/ShapeCard.tsx src/components/shapes/RecognitionGame.tsx
git commit -m "feat(shapes): add ShapeCard and RecognitionGame components"
```

---

## Task 4: Tab 2 — 折一折动画

**Files:**
- Create: `src/components/shapes/FoldDemo.tsx`

### Step 1: 实现折叠动画组件

步骤式动画播放器：点击"下一步"逐步展示折叠过程，每步有 SVG 过渡动画。

```tsx
// src/components/shapes/FoldDemo.tsx
import { useState } from 'react';
import type { FoldLesson, FoldStep } from '@/data/math/shapes/types';
import { Button } from '@/components/ui/button';

interface FoldDemoProps {
  lessons: FoldLesson[];
}

export const FoldDemo = ({ lessons }: FoldDemoProps) => {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const lesson = lessons[lessonIndex];
  const step = lesson.steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === lesson.steps.length - 1;

  const handlePrev = () => setStepIndex(i => Math.max(0, i - 1));
  const handleNext = () => setStepIndex(i => Math.min(lesson.steps.length - 1, i + 1));
  const handleSelectLesson = (index: number) => {
    setLessonIndex(index);
    setStepIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* 课程选择 */}
      <div className="flex gap-2 flex-wrap justify-center">
        {lessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => handleSelectLesson(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              i === lessonIndex
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {l.title}
          </button>
        ))}
      </div>

      {/* 动画区域 */}
      <div className="bg-card rounded-2xl border-2 border-border p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">{lesson.title}</h3>
          <span className="text-sm text-muted-foreground">
            步骤 {stepIndex + 1} / {lesson.steps.length}
          </span>
        </div>

        {/* SVG 画布 */}
        <div className="bg-muted/30 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 200 120" className="w-full h-auto">
            {step.svgElements.map((el, i) => {
              if (el.type === 'arrow') {
                const [, x1, y1] = el.path.match(/M(\d+),(\d+)/) || [];
                const [, x2, y2] = el.path.match(/L(\d+),(\d+)/) || [];
                return (
                  <g key={i}>
                    <defs>
                      <marker id={`arrow-${i}`} markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <polygon points="0 0, 6 2, 0 4" fill={el.color} />
                      </marker>
                    </defs>
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={el.color} strokeWidth="2"
                      markerEnd={`url(#arrow-${i})`}
                      className="transition-all duration-500"
                    />
                  </g>
                );
              }
              return (
                <path
                  key={i}
                  d={el.path}
                  fill={el.type === 'shape' ? el.color : 'none'}
                  stroke={el.type !== 'shape' ? el.color : 'rgba(0,0,0,0.15)'}
                  strokeWidth={el.type !== 'shape' ? 2 : 1}
                  strokeDasharray={el.dashArray}
                  opacity={el.opacity ?? 1}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
        </div>

        {/* 步骤描述 */}
        <p className="text-center text-base font-medium mb-4">{step.description}</p>

        {/* 总结（最后一步显示） */}
        {isLastStep && (
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 mb-4 text-center">
            <p className="text-sm font-bold text-amber-800 dark:text-amber-200">{lesson.summary}</p>
          </div>
        )}

        {/* 步骤控制 */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={isFirstStep}>
            ← 上一步
          </Button>
          <Button size="sm" onClick={handleNext} disabled={isLastStep}>
            下一步 →
          </Button>
        </div>
      </div>
    </div>
  );
};
```

### Step 2: Commit

```bash
git add src/components/shapes/FoldDemo.tsx
git commit -m "feat(shapes): add FoldDemo step-by-step animation component"
```

---

## Task 5: Tab 3 — 拼一拼（核心交互）

**Files:**
- Create: `src/components/shapes/GridCanvas.tsx`
- Create: `src/components/shapes/DraggablePiece.tsx`
- Create: `src/components/shapes/PieceToolbar.tsx`
- Create: `src/components/shapes/PuzzleBoard.tsx`
- Create: `src/components/shapes/FreeCanvas.tsx`

### Step 1: 创建网格画布

SVG 网格画布，接收放置的图形块数组，渲染网格线和目标轮廓。支持触摸和鼠标事件。

```tsx
// src/components/shapes/GridCanvas.tsx
import type { PlacedPiece } from '@/data/math/shapes/types';

interface GridCanvasProps {
  cols: number;
  rows: number;
  cellSize: number;
  pieces: PlacedPiece[];
  targetOutline?: string;
  selectedPieceId?: string | null;
  onCellClick?: (gridX: number, gridY: number) => void;
  onPieceClick?: (pieceId: string) => void;
}

export const GridCanvas = ({
  cols, rows, cellSize, pieces,
  targetOutline, selectedPieceId,
  onCellClick, onPieceClick,
}: GridCanvasProps) => {
  const svgW = cols * cellSize;
  const svgH = rows * cellSize;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onCellClick) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gridX = Math.floor((x / rect.width) * cols);
    const gridY = Math.floor((y / rect.height) * rows);
    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
      onCellClick(gridX, gridY);
    }
  };

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="bg-white dark:bg-zinc-900 rounded-xl border-2 border-border"
      onClick={handleClick}
      style={{ maxWidth: svgW, touchAction: 'none' }}
    >
      {/* 网格线 */}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * cellSize} y1={0}
          x2={i * cellSize} y2={svgH}
          stroke="#e5e7eb" strokeWidth="1"
        />
      ))}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0} y1={i * cellSize}
          x2={svgW} y2={i * cellSize}
          stroke="#e5e7eb" strokeWidth="1"
        />
      ))}

      {/* 目标轮廓 */}
      {targetOutline && (
        <path
          d={targetOutline}
          fill="rgba(139,92,246,0.08)"
          stroke="#a78bfa"
          strokeWidth="2"
          strokeDasharray="6,4"
          transform={`scale(${cellSize})`}
        />
      )}

      {/* 已放置的图形 */}
      {pieces.map(piece => {
        const px = piece.gridX * cellSize;
        const py = piece.gridY * cellSize;
        const pw = piece.shape.gridW * cellSize;
        const ph = piece.shape.gridH * cellSize;
        const cx = pw / 2;
        const cy = ph / 2;

        const transforms: string[] = [`translate(${px}, ${py})`];
        if (piece.rotation) transforms.push(`rotate(${piece.rotation} ${cx} ${cy})`);
        if (piece.flipH) transforms.push(`translate(${pw}, 0) scale(-1, 1)`);
        if (piece.flipV) transforms.push(`translate(0, ${ph}) scale(1, -1)`);

        const isSelected = selectedPieceId === piece.id;

        return (
          <g
            key={piece.id}
            transform={transforms.join(' ')}
            onClick={(e) => { e.stopPropagation(); onPieceClick?.(piece.id); }}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={piece.shape.path}
              fill={piece.shape.color}
              stroke={isSelected ? '#7c3aed' : 'rgba(0,0,0,0.15)'}
              strokeWidth={isSelected ? 3 : 1.5}
              strokeLinejoin="round"
              transform={`scale(${cellSize})`}
            />
            {isSelected && (
              <rect
                x={-2} y={-2}
                width={pw + 4} height={ph + 4}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                strokeDasharray="4,3"
                rx="4"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
```

### Step 2: 创建操作工具栏

选中图形后显示的浮动工具栏：旋转、水平翻转、垂直翻转、删除。

```tsx
// src/components/shapes/PieceToolbar.tsx
import { RotateCw, FlipHorizontal, FlipVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PieceToolbarProps {
  visible: boolean;
  onRotate: () => void;
  onFlipH: () => void;
  onFlipV: () => void;
  onDelete: () => void;
}

export const PieceToolbar = ({ visible, onRotate, onFlipH, onFlipV, onDelete }: PieceToolbarProps) => {
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-2 animate-fade-in">
      <Button variant="outline" size="sm" onClick={onRotate} title="旋转 90°">
        <RotateCw className="h-4 w-4 mr-1" /> 旋转
      </Button>
      <Button variant="outline" size="sm" onClick={onFlipH} title="水平翻转">
        <FlipHorizontal className="h-4 w-4 mr-1" /> 翻转
      </Button>
      <Button variant="outline" size="sm" onClick={onFlipV} title="垂直翻转">
        <FlipVertical className="h-4 w-4 mr-1" /> 上下
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete} title="删除">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
```

### Step 3: 创建可拖拽图形块

从图形库中选择图形放到画布上。

```tsx
// src/components/shapes/DraggablePiece.tsx
import type { GridShape } from '@/data/math/shapes/types';
import { SVGShape } from './SVGShape';

interface DraggablePieceProps {
  shape: GridShape;
  size?: number;
  used?: boolean;
  onClick?: () => void;
}

export const DraggablePiece = ({ shape, size = 48, used = false, onClick }: DraggablePieceProps) => {
  return (
    <button
      onClick={onClick}
      disabled={used}
      className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
        used
          ? 'border-muted bg-muted/30 opacity-40 cursor-not-allowed'
          : 'border-border bg-card hover:border-primary hover:shadow-md active:scale-95 cursor-pointer'
      }`}
    >
      <SVGShape
        type={shape.type}
        path={shape.path}
        color={shape.color}
        width={size}
        height={size}
      />
      <span className="text-xs text-muted-foreground">{shape.label}</span>
    </button>
  );
};
```

### Step 4: 创建拼图板组件（目标关卡模式）

整合画布 + 图形库 + 工具栏 + 关卡逻辑。

```tsx
// src/components/shapes/PuzzleBoard.tsx
// 此组件整合 GridCanvas + DraggablePiece + PieceToolbar
// 管理状态：当前关卡、已放置图形、选中图形、关卡完成判定
// 核心交互流程：
//   1. 用户点击图形库中的图形 → 进入"放置模式"
//   2. 用户点击画布网格 → 图形吸附到该格子
//   3. 用户点击已放置的图形 → 选中，显示工具栏
//   4. 工具栏操作：旋转/翻转/删除
//   5. 所有图形放完 → 检查是否填满目标轮廓 → 显示成功提示 + 转换关系卡片
//
// 详细实现代码约 200 行，包含 useState 管理 pieces/selectedId/activePiece 等状态。
// 完整实现在执行阶段编写，此处描述核心逻辑。
```

### Step 5: 创建自由创作画布

```tsx
// src/components/shapes/FreeCanvas.tsx
// 与 PuzzleBoard 共享 GridCanvas/PieceToolbar/DraggablePiece
// 区别：无目标轮廓，无完成判定
// 额外功能：
//   - 颜色选择器（8 色）
//   - 图形大小选择（small/medium）
//   - 清空画布按钮
//   - 画布截图保存（使用 SVG → Canvas → PNG 导出）
```

### Step 6: Commit

```bash
git add src/components/shapes/
git commit -m "feat(shapes): add interactive puzzle components (GridCanvas, DraggablePiece, PieceToolbar, PuzzleBoard, FreeCanvas)"
```

---

## Task 6: Tab 4 — 找规律

**Files:**
- Create: `src/components/shapes/PatternQuestion.tsx`

### Step 1: 实现找规律题目组件

显示图形序列，缺失位置用虚线框标记，底部显示选项，选择后即时反馈。

```tsx
// src/components/shapes/PatternQuestion.tsx
// 核心结构：
//   - 图形序列横向排列，缺失位置显示 "?" 虚线框
//   - 4 个选项在底部显示
//   - 选择后：正确 → 绿色高亮 + 规律描述；错误 → 红色 + 提示
//   - 支持"上一题/下一题"导航
//   - 结果统计（正确率）
```

### Step 2: Commit

```bash
git add src/components/shapes/PatternQuestion.tsx
git commit -m "feat(shapes): add PatternQuestion component for shape pattern finding"
```

---

## Task 7: 主页面 + 路由 + 入口接入

**Files:**
- Create: `src/pages/math/ShapeLearning.tsx`
- Modify: `src/App.tsx` (添加路由)
- Modify: `src/pages/Index.tsx` (数学首页添加入口)

### Step 1: 创建主页面

Tab 切换 4 个学习区：认识图形 / 折一折 / 拼一拼 / 找规律。

```tsx
// src/pages/math/ShapeLearning.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShapeCard } from '@/components/shapes/ShapeCard';
import { RecognitionGame } from '@/components/shapes/RecognitionGame';
import { FoldDemo } from '@/components/shapes/FoldDemo';
import { PuzzleBoard } from '@/components/shapes/PuzzleBoard';
import { FreeCanvas } from '@/components/shapes/FreeCanvas';
import { PatternQuestion } from '@/components/shapes/PatternQuestion';
import { SHAPE_INFO_LIST, RECOGNITION_QUESTIONS } from '@/data/math/shapes/shapeRecognition';
import { FOLD_LESSONS } from '@/data/math/shapes/foldAnimations';
import { PUZZLE_LEVELS } from '@/data/math/shapes/puzzleLevels';
import { PATTERN_QUESTIONS } from '@/data/math/shapes/patternSequences';

type TabId = 'recognize' | 'fold' | 'puzzle' | 'pattern';

const TABS: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'recognize', label: '认识图形', icon: '🔷' },
  { id: 'fold', label: '折一折', icon: '📐' },
  { id: 'puzzle', label: '拼一拼', icon: '🧩' },
  { id: 'pattern', label: '找规律', icon: '🔍' },
];

const ShapeLearning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('recognize');
  const [puzzleMode, setPuzzleMode] = useState<'levels' | 'free'>('levels');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-button text-xl">
            🔷
          </div>
          <h1 className="text-xl font-bold text-foreground">认识图形</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'recognize' && (
          <div className="space-y-8">
            {/* 图形卡片浏览 */}
            <section>
              <h2 className="text-lg font-bold mb-4">五种平面图形</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {SHAPE_INFO_LIST.map(shape => (
                  <ShapeCard key={shape.type} shape={shape} />
                ))}
              </div>
            </section>
            {/* 辨认练习 */}
            <section>
              <h2 className="text-lg font-bold mb-4">辨认练习</h2>
              <RecognitionGame questions={RECOGNITION_QUESTIONS} />
            </section>
          </div>
        )}

        {activeTab === 'fold' && (
          <FoldDemo lessons={FOLD_LESSONS} />
        )}

        {activeTab === 'puzzle' && (
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              <Button
                variant={puzzleMode === 'levels' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPuzzleMode('levels')}
              >
                🎯 目标关卡
              </Button>
              <Button
                variant={puzzleMode === 'free' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPuzzleMode('free')}
              >
                🎨 自由创作
              </Button>
            </div>
            {puzzleMode === 'levels' ? (
              <PuzzleBoard levels={PUZZLE_LEVELS} />
            ) : (
              <FreeCanvas />
            )}
          </div>
        )}

        {activeTab === 'pattern' && (
          <PatternQuestion questions={PATTERN_QUESTIONS} />
        )}
      </main>
    </div>
  );
};

export default ShapeLearning;
```

### Step 2: 在 App.tsx 添加懒加载路由

在 `src/App.tsx` 中添加：

```typescript
// 在 lazy imports 区域添加
const ShapeLearning = lazy(() => import("./pages/math/ShapeLearning"));

// 在 Math Module Routes 区域添加
<Route path="/math/shapes" element={<ShapeLearning />} />
```

### Step 3: 在 Index.tsx 添加数学首页入口

在 `src/pages/Index.tsx` 的 `MATH_LEARNING_GROUPS` 中添加新分组：

```typescript
// 在 MATH_LEARNING_GROUPS 数组中新增
{
  id: "shape-geometry",
  title: "图形与几何",
  description: "认识平面图形，通过折叠和拼组理解图形变换",
  moduleIds: ["shapes"],
},
```

同时需要在 `MATH_MODULES`（`src/data/math/modules.ts`）中添加 shapes 模块配置，**但由于 shapes 是独立页面不走 quiz 框架，所以改为在 Index.tsx 中添加特殊处理**——当 moduleId 是 `shapes` 时，导航到 `/math/shapes` 而非 `/math/module/shapes`。

或更简单：在数学首页的渲染逻辑中，为 `shapes` 模块单独处理 onClick 导航。

### Step 4: 构建验证

Run: `cd "/Users/ysh/Manual Library/ClaudeCode/portfolio-2025/K12-Education" && npm run build`

### Step 5: Commit

```bash
git add src/pages/math/ShapeLearning.tsx src/App.tsx src/pages/Index.tsx src/data/math/modules.ts
git commit -m "feat(shapes): add ShapeLearning page with routing and math home entry"
```

---

## Task 8: 集成测试与优化

### Step 1: 启动开发服务器验证

Run: `npm run dev`

验证清单：
- [ ] `http://localhost:8080/k12/` 数学首页出现"图形与几何"分组和入口卡片
- [ ] 点击入口卡片跳转到 `/math/shapes`
- [ ] 4 个 Tab 切换正常
- [ ] 认识图形：5 个卡片翻转正常，辨认练习选择和提交正常
- [ ] 折一折：5 个课程切换正常，步骤动画过渡流畅
- [ ] 拼一拼 (目标关卡)：图形放置、旋转、翻转、删除均正常
- [ ] 拼一拼 (自由创作)：图形放置和颜色选择正常
- [ ] 找规律：选择答案后反馈正确/错误，显示规律描述
- [ ] 移动端响应式布局正常

### Step 2: 构建验证

Run: `npm run build`
Expected: 构建成功无 TypeScript 错误

### Step 3: Commit

```bash
git add -A
git commit -m "feat(shapes): polish integration and verify all tabs"
```

---

## 执行顺序总结

| Task | 内容 | 预计时间 |
|------|------|---------|
| 1 | 类型定义 + 数据层（5 个文件） | 15 min |
| 2 | SVGShape 原子组件 | 5 min |
| 3 | Tab 1 认识图形（ShapeCard + RecognitionGame） | 15 min |
| 4 | Tab 2 折一折（FoldDemo） | 10 min |
| 5 | Tab 3 拼一拼（GridCanvas + PuzzleBoard + FreeCanvas）**核心** | 30 min |
| 6 | Tab 4 找规律（PatternQuestion） | 10 min |
| 7 | 主页面 + 路由 + 入口接入 | 10 min |
| 8 | 集成测试 + 优化 | 15 min |

总计约 **1.5-2 小时**。
