// 一年级下册 1-3 单元复习模块类型定义
// 数据驱动：每个单元由若干 lesson 组成，每个 lesson 包含知识讲解卡 + 互动练习

export type Grade1Vol2UnitId = 'unit1-arithmetic' | 'unit2-shapes' | 'unit3-classification';

// 知识讲解卡（图文）
export interface KnowledgeCard {
  title: string;
  // 段落或步骤
  content: string[];
  // 视觉化示意（小棒、数轴、图形等）
  visual?:
    | { kind: 'count-on'; from: number; to: number; highlight: number }       // 接着数法 / 倒着数法
    | { kind: 'make-ten'; base: number; addend: number; splitToTen: number; splitRest: number } // 凑十法
    | { kind: 'level-ten'; minuend: number; subtrahend: number; samePart: number; rest: number } // 平十法
    | { kind: 'break-ten'; minuend: number; subtrahend: number; tensPart: 10; onesPart: number; bridge: number } // 破十法
    | { kind: 'add-think-sub'; a: number; b: number; sum: number }            // 想加算减
    | { kind: 'shape-gallery'; shape: 'rectangle' | 'square' | 'triangle' | 'circle' | 'parallelogram' }
    | { kind: 'shape-from-solid'; solid: 'cuboid' | 'cube' | 'cylinder' | 'sphere'; result: string[] }
    | { kind: 'shape-split'; original: 'rectangle'; ways: Array<'horizontal' | 'vertical' | 'diagonal'> }
    | { kind: 'shape-combine'; from: 'two-triangles'; results: Array<'triangle' | 'square' | 'rectangle' | 'parallelogram'> }
    | { kind: 'count-shapes'; rows: number; layers: { label: string; count: number }[] }
    | { kind: 'classify-table'; headers: string[]; rows: Array<{ label: string; value: string | number }[]> };
  tip?: string;
  // 红色重点术语（PDF 里红字标注的，自动加色）
  keywords?: string[];
}

// 练习题类型——按交互形态而非数学子分类
export type PracticeKind =
  | 'choice'            // 选择题（A/B/C/D）
  | 'fill'              // 填空题（数字键盘）
  | 'shape-pick'        // 选图形（多个图形里挑符合条件的）
  | 'classify'          // 分类拖拽（拖到对应桶）
  | 'count-shapes';     // 数图形（输入数量）

export interface BasePractice {
  id: string;
  kind: PracticeKind;
  prompt: string;        // 题干
  hint?: string;
  explanation?: string;  // 答错时显示
}

export interface ChoicePractice extends BasePractice {
  kind: 'choice';
  options: string[];
  answer: string;        // 正确答案文本
}

export interface FillPractice extends BasePractice {
  kind: 'fill';
  answer: number;        // 数字答案
  // 可选：分步填空（凑十法的 3 个空）
  steps?: { label: string; value?: number; blank?: boolean }[];
}

export interface ShapePickPractice extends BasePractice {
  kind: 'shape-pick';
  // 候选图形池
  candidates: Array<{ shape: 'rectangle' | 'square' | 'triangle' | 'circle' | 'parallelogram'; id: string }>;
  // 正确答案 id 列表
  answer: string[];
  // 是否多选
  multiple?: boolean;
}

export interface ClassifyPractice extends BasePractice {
  kind: 'classify';
  // 待分类项目
  items: Array<{ id: string; label: string; emoji: string; category: string }>;
  // 分类桶
  buckets: Array<{ id: string; label: string; emoji: string }>;
  // 期望计数（每桶应有几个）
  expected: Record<string, number>;
}

export interface CountShapesPractice extends BasePractice {
  kind: 'count-shapes';
  // 由若干水平条组成的长方形（PDF 第 7 页例子）
  rows: number;          // 横线分成几行（rows=3 → 内含 3 个最小长方形）
  answer: number;        // 总数（如 rows=3 时应为 6）
  // 提示分组：单个、2连、3连...
  layers: { size: number; count: number }[];
}

export type Practice =
  | ChoicePractice
  | FillPractice
  | ShapePickPractice
  | ClassifyPractice
  | CountShapesPractice;

// Lesson 元数据
export interface Lesson {
  id: string;
  title: string;
  // 一句话副标题，鼓励性表达
  subtitle: string;
  // emoji 图标
  icon: string;
  // 知识讲解卡（1-N 张，按顺序展示）
  cards: KnowledgeCard[];
  // 练习题列表（动态生成 or 静态）
  // 函数形式：每次进入按种子生成，避免孩子背答案
  practiceFactory: () => Practice[];
}

export interface Unit {
  id: Grade1Vol2UnitId;
  index: number;        // 1, 2, 3
  title: string;
  subtitle: string;
  icon: string;
  // tailwind class，用于卡片配色
  colorClass: string;   // 如 'bg-rose-500'
  accentClass: string;  // 如 'border-rose-200 bg-rose-50'
  description: string;
  lessons: Lesson[];
}
