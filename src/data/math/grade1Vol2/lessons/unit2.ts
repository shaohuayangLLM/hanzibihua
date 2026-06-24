// 第二单元：图形的初步认识（二）
import type { ChoicePractice, CountShapesPractice, Lesson, ShapePickPractice, Unit } from '../types';
import { numberOptions } from '../practiceHelpers';

// 选图形：从 5 种图形里挑出指定形状
const pickShape = (
  i: number,
  target: 'rectangle' | 'square' | 'triangle' | 'circle' | 'parallelogram',
  targetLabel: string,
): ShapePickPractice => {
  const all: ShapePickPractice['candidates'] = [
    { shape: 'rectangle', id: `${i}-r1` },
    { shape: 'square', id: `${i}-s1` },
    { shape: 'triangle', id: `${i}-t1` },
    { shape: 'circle', id: `${i}-c1` },
    { shape: 'parallelogram', id: `${i}-p1` },
    { shape: target, id: `${i}-correct` },
  ];
  return {
    id: `pick-${target}-${i}`,
    kind: 'shape-pick',
    prompt: `下面哪些是${targetLabel}？（可多选）`,
    candidates: all.sort(() => Math.random() - 0.5),
    answer: all.filter((c) => c.shape === target).map((c) => c.id),
    multiple: true,
    explanation: `${targetLabel}有特定的边和角的特征。`,
  };
};

// 立体画平面：球体不能画圆陷阱
const solidToShape = (i: number): ChoicePractice => {
  const cases = [
    { solid: '长方体', options: ['长方形', '圆', '三角形'], answer: '长方形', tip: '长方体的面是长方形（或正方形）。' },
    { solid: '正方体', options: ['正方形', '圆', '三角形'], answer: '正方形', tip: '正方体的 6 个面都是正方形。' },
    { solid: '圆柱', options: ['圆', '正方形', '三角形'], answer: '圆', tip: '圆柱的上下底是圆。' },
    { solid: '球', options: ['什么都画不出', '圆', '正方形'], answer: '什么都画不出', tip: '球体表面是弯的，不能画出圆。' },
  ];
  const c = cases[i % cases.length];
  return {
    id: `solid-shape-${i}`,
    kind: 'choice',
    prompt: `用「${c.solid}」可以在纸上画出什么图形？`,
    options: c.options.sort(() => Math.random() - 0.5),
    answer: c.answer,
    hint: c.tip,
    explanation: c.tip,
  };
};

// 图形拼组
const shapeCombineQuiz = (i: number): ChoicePractice => {
  const cases = [
    { q: '两个完全一样的三角形可以拼成什么图形？', options: ['长方形', '圆', '只有三角形'], answer: '长方形', exp: '可以拼成三角形、正方形、长方形或平行四边形。' },
    { q: '一个长方形可以分成两个完全一样的图形，下面哪种分法不可以？', options: ['横着对折', '竖着对折', '随便斜着切'], answer: '随便斜着切', exp: '只有沿对称轴或对角线才能分成两个完全一样的图形。' },
    { q: '两个完全一样的三角形拼起来，不可能拼出哪个图形？', options: ['圆', '正方形', '平行四边形'], answer: '圆', exp: '三角形是直边，拼不出曲线的圆。' },
  ];
  const c = cases[i % cases.length];
  return {
    id: `combine-${i}`,
    kind: 'choice',
    prompt: c.q,
    options: c.options.sort(() => Math.random() - 0.5),
    answer: c.answer,
    explanation: c.exp,
  };
};

// 图形找规律
const patternQuiz = (i: number): ChoicePractice => {
  const cases = [
    { q: '△△○ △△○ △△○ △△? 缺的是？', options: ['△', '○', '□'], answer: '○' },
    { q: '◇△○ ◇△○ ◇△○ ?△○ 缺的是？', options: ['◇', '△', '○'], answer: '◇' },
    { q: '○○△ ○○△ ○○△ ○?△ 缺的是？', options: ['○', '△', '◇'], answer: '○' },
  ];
  const c = cases[i % cases.length];
  return {
    id: `pattern-${i}`,
    kind: 'choice',
    prompt: c.q,
    options: c.options.sort(() => Math.random() - 0.5),
    answer: c.answer,
    hint: '先找出几个图形是一组，再看每组按什么规律。',
    explanation: '先观察组数，再观察每组规律。',
  };
};

// 数图形（PDF 第 7 页例子）
const countShapesQuiz = (i: number): CountShapesPractice => {
  // 一个长方形被横线分成 N 行（N=2/3/4），求所有长方形的个数
  // 公式：1 行有 N 个单格 + (N-1) 个 2 连 + (N-2) 个 3 连 ... = N*(N+1)/2
  const N = (i % 3) + 2; // 2、3、4
  const total = (N * (N + 1)) / 2;
  const layers = Array.from({ length: N }, (_, k) => ({ size: k + 1, count: N - k }));
  return {
    id: `count-shapes-${i}`,
    kind: 'count-shapes',
    rows: N,
    answer: total,
    layers,
    prompt: `数一数，下面图里一共有几个长方形？`,
    hint: '先数 1 个格的，再数 2 个格连起来的，再数 3 个格连起来的 ... 最后相加。',
    explanation: layers.map((l) => `${l.count} 个 ${l.size} 格长方形`).join(' + ') + ` = ${total}`,
  };
};

const lessons: Lesson[] = [
  {
    id: 'u2-l1-shapes',
    title: '认识 5 种平面图形',
    subtitle: '长方形 · 正方形 · 三角形 · 圆 · 平行四边形',
    icon: '🔷',
    cards: [
      {
        title: '长方形',
        content: ['有 4 条直直的边、4 个直直的角。', '相对的两条边长度相等。'],
        visual: { kind: 'shape-gallery', shape: 'rectangle' },
        keywords: ['4 条直边', '4 个直角'],
      },
      {
        title: '正方形',
        content: ['有 4 条直直的边、4 个直直的角。', '4 条边一样长。'],
        visual: { kind: 'shape-gallery', shape: 'square' },
        keywords: ['4 条边一样长'],
      },
      {
        title: '三角形',
        content: ['有 3 条直直的边、3 个尖尖的角。'],
        visual: { kind: 'shape-gallery', shape: 'triangle' },
      },
      {
        title: '圆',
        content: ['由一条弯弯的封闭曲线围成。', '没有边，没有角。'],
        visual: { kind: 'shape-gallery', shape: 'circle' },
      },
      {
        title: '平行四边形',
        content: ['有 4 条边、4 个斜斜的角。', '相对的两条边长度相等。'],
        visual: { kind: 'shape-gallery', shape: 'parallelogram' },
      },
    ],
    practiceFactory: () => [
      pickShape(1, 'rectangle', '长方形'),
      pickShape(2, 'triangle', '三角形'),
      pickShape(3, 'parallelogram', '平行四边形'),
      pickShape(4, 'circle', '圆'),
    ],
  },
  {
    id: 'u2-l2-from-solid',
    title: '从立体物体画平面图形',
    subtitle: '面在体上 · 球体不能画圆',
    icon: '🧊',
    cards: [
      {
        title: '面在体上',
        content: ['长方体、正方体、圆柱的「面」就是平面图形。', '把它们的面印在纸上，就能得到平面图形。'],
        keywords: ['面在体上'],
      },
      {
        title: '能画出什么？',
        content: [
          '长方体 → 一般可以画出 3 种长方形（如果有一个面是正方形，就能画 1 个正方形 + 2 种长方形）。',
          '正方体 → 6 个面都画出一样大的正方形。',
          '圆柱 → 上下底可以画出圆。',
          '球 → 表面是弯的，什么都画不出来。',
        ],
        visual: { kind: 'shape-from-solid', solid: 'sphere', result: ['❌'] },
        tip: '球体不能画出圆——这是常考陷阱！',
      },
    ],
    practiceFactory: () => Array.from({ length: 4 }, (_, i) => solidToShape(i)),
  },
  {
    id: 'u2-l3-combine',
    title: '图形拼一拼、分一分',
    subtitle: '一个长方形可以分成两个完全一样的图形',
    icon: '🧩',
    cards: [
      {
        title: '长方形怎么分？',
        content: [
          '一个长方形可以分成 2 个完全一样的图形，有 3 种分法：',
          '① 横着对折 → 2 个长方形',
          '② 竖着对折 → 2 个长方形',
          '③ 沿对角线切 → 2 个三角形',
        ],
        visual: { kind: 'shape-split', original: 'rectangle', ways: ['horizontal', 'vertical', 'diagonal'] },
      },
      {
        title: '两个三角形怎么拼？',
        content: [
          '两个完全一样的三角形可以拼成新图形。',
          '可能是：三角形、正方形、长方形或平行四边形。',
        ],
        visual: { kind: 'shape-combine', from: 'two-triangles', results: ['triangle', 'square', 'rectangle', 'parallelogram'] },
      },
    ],
    practiceFactory: () => Array.from({ length: 3 }, (_, i) => shapeCombineQuiz(i)),
  },
  {
    id: 'u2-l4-pattern',
    title: '图形找规律',
    subtitle: '先看几个一组，再看每组规律',
    icon: '🔁',
    cards: [
      {
        title: '找规律的两步',
        content: [
          '① 先观察几个图形是一组。',
          '② 再观察每一组按什么规律摆放。',
          '③ 接着用规律推出后面缺的图形。',
        ],
        keywords: ['一组', '规律'],
      },
      {
        title: '例子',
        content: [
          '△△○ △△○ △△○ — 每 3 个图形是一组。',
          '每组按「2 个三角形 + 1 个圆」排列。',
          '所以下一个缺的应该是 △△○ 中的某个。',
        ],
      },
    ],
    practiceFactory: () => Array.from({ length: 3 }, (_, i) => patternQuiz(i)),
  },
  {
    id: 'u2-l5-count-shapes',
    title: '数图形',
    subtitle: '用分类法数，不重复不遗漏',
    icon: '🔍',
    cards: [
      {
        title: '为什么要分类数？',
        content: [
          '直接数容易漏掉或重复。',
          '分类数：先数最小的，再数 2 个组合的，再数 3 个组合的 ...',
          '最后把每类的数量加起来，就是总数。',
        ],
        keywords: ['分类'],
      },
      {
        title: '例子',
        content: [
          '一个长方形被分成 3 行：',
          '· 单个长方形：3 个',
          '· 2 行组合的长方形：2 个',
          '· 3 行组合的长方形：1 个',
          '总数：3 + 2 + 1 = 6 个',
        ],
        visual: {
          kind: 'count-shapes',
          rows: 3,
          layers: [
            { label: '单个', count: 3 },
            { label: '2 行连', count: 2 },
            { label: '3 行连', count: 1 },
          ],
        },
      },
    ],
    practiceFactory: () => Array.from({ length: 3 }, (_, i) => countShapesQuiz(i)),
  },
];

export const unit2: Unit = {
  id: 'unit2-shapes',
  index: 2,
  title: '图形的初步认识（二）',
  subtitle: '5 种平面图形 · 拼组 · 数图形',
  icon: '🔷',
  colorClass: 'bg-teal-500',
  accentClass: 'border-teal-200 bg-teal-50',
  description: '认识平面图形，玩转图形的分、拼、数。',
  lessons,
};
