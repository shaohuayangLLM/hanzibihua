// 第三单元：数据分类（一）
import type { ChoicePractice, ClassifyPractice, Lesson, Unit } from '../types';

const animalToyClassify = (i: number): ClassifyPractice => ({
  id: `classify-animal-${i}`,
  kind: 'classify',
  prompt: '把下面的物品按「动物」和「玩具」分一分。',
  items: [
    { id: 'sheep', label: '小羊', emoji: '🐑', category: 'animal' },
    { id: 'duck', label: '小鸭', emoji: '🦆', category: 'animal' },
    { id: 'cat', label: '小猫', emoji: '🐱', category: 'animal' },
    { id: 'dog', label: '小狗', emoji: '🐶', category: 'animal' },
    { id: 'bird', label: '小鸟', emoji: '🐦', category: 'animal' },
    { id: 'pig', label: '小猪', emoji: '🐷', category: 'animal' },
    { id: 'moto', label: '摩托', emoji: '🏍️', category: 'toy' },
    { id: 'plane', label: '飞机', emoji: '✈️', category: 'toy' },
    { id: 'top', label: '陀螺', emoji: '🌀', category: 'toy' },
    { id: 'ball', label: '皮球', emoji: '⚽', category: 'toy' },
    { id: 'car', label: '小车', emoji: '🚗', category: 'toy' },
  ],
  buckets: [
    { id: 'animal', label: '动物', emoji: '🐾' },
    { id: 'toy', label: '玩具', emoji: '🎁' },
  ],
  expected: { animal: 6, toy: 5 },
  hint: '看每个物品的特点：会动会叫的是动物，用来玩的是玩具。',
});

const fruitFoodClassify = (i: number): ClassifyPractice => ({
  id: `classify-fruit-${i}`,
  kind: 'classify',
  prompt: '把下面的食物按「水果」和「蔬菜」分一分。',
  items: [
    { id: 'apple', label: '苹果', emoji: '🍎', category: 'fruit' },
    { id: 'banana', label: '香蕉', emoji: '🍌', category: 'fruit' },
    { id: 'grape', label: '葡萄', emoji: '🍇', category: 'fruit' },
    { id: 'pear', label: '梨', emoji: '🍐', category: 'fruit' },
    { id: 'carrot', label: '胡萝卜', emoji: '🥕', category: 'veggie' },
    { id: 'corn', label: '玉米', emoji: '🌽', category: 'veggie' },
    { id: 'broccoli', label: '西兰花', emoji: '🥦', category: 'veggie' },
    { id: 'tomato', label: '西红柿', emoji: '🍅', category: 'veggie' },
  ],
  buckets: [
    { id: 'fruit', label: '水果', emoji: '🍓' },
    { id: 'veggie', label: '蔬菜', emoji: '🥬' },
  ],
  expected: { fruit: 4, veggie: 4 },
});

const standardChoice = (i: number): ChoicePractice => {
  const cases = [
    {
      q: '一组图形：5 个红色五角星、3 个蓝色五角星、4 个红色心形、2 个蓝色心形。按「形状」分，分成几类？',
      options: ['2 类', '3 类', '4 类'],
      answer: '2 类',
      exp: '按形状分：五角星和心形，共 2 类。',
    },
    {
      q: '同样这组图形，按「颜色」分，分成几类？',
      options: ['2 类', '3 类', '4 类'],
      answer: '2 类',
      exp: '按颜色分：红色和蓝色，共 2 类。',
    },
    {
      q: '不同的标准分类，结果一般会怎样？',
      options: ['不同', '相同', '总数不同'],
      answer: '不同',
      exp: '分类标准不同，分出的结果一般不同，但物品总数相同。',
    },
    {
      q: '12 个气球：5 个红、4 个蓝、3 个黄。按颜色分类后，再合起来一共有几个？',
      options: ['12 个', '5 个', '不一定'],
      answer: '12 个',
      exp: '不管怎么分类，总数不会变。',
    },
  ];
  const c = cases[i % cases.length];
  return {
    id: `standard-choice-${i}`,
    kind: 'choice',
    prompt: c.q,
    options: c.options.sort(() => Math.random() - 0.5),
    answer: c.answer,
    explanation: c.exp,
  };
};

const lessons: Lesson[] = [
  {
    id: 'u3-l1-method',
    title: '怎么分类？',
    subtitle: '找相同的特征 / 用途',
    icon: '🗂️',
    cards: [
      {
        title: '分类的方法',
        content: [
          '① 先看一看物品有哪些「相同的特征」或「相同的用途」。',
          '② 把相同类别的物品放在一起。',
        ],
        keywords: ['相同的特征', '相同的用途'],
        tip: '相同特征：颜色、形状、大小……\n相同用途：能吃的、能玩的、能写字的……',
      },
    ],
    practiceFactory: () => [animalToyClassify(1), fruitFoodClassify(1)],
  },
  {
    id: 'u3-l2-count',
    title: '按给定标准分类计数',
    subtitle: '可以用 ✓、△、○ 等表示',
    icon: '🔢',
    cards: [
      {
        title: '怎么计数？',
        content: [
          '按给定标准分好类后，再数一数每一类有几个。',
          '可以用不同图形（✓、△、○）表示，方法不同，结果一样。',
        ],
      },
      {
        title: '例子',
        content: [
          '动物：✓✓✓✓✓ → 5 个',
          '玩具：△△△△ → 4 个',
          '换成 ○ 表示：',
          '动物：○○○○○ → 5 个',
          '玩具：○○○○ → 4 个',
        ],
        visual: {
          kind: 'classify-table',
          headers: ['类别', '个数'],
          rows: [
            [{ label: '动物', value: 6 }],
            [{ label: '玩具', value: 5 }],
          ],
        },
      },
    ],
    practiceFactory: () => [animalToyClassify(2), fruitFoodClassify(2)],
  },
  {
    id: 'u3-l3-different-standards',
    title: '按不同的标准分类',
    subtitle: '标准不同，结果不同；总数不变',
    icon: '🎨',
    cards: [
      {
        title: '同一组物品可以多种分法',
        content: [
          '同样的物品，可以按形状分，也可以按颜色分，也可以按大小分……',
          '不同的标准 → 分得的结果不同。',
          '但不管怎么分，物品的总数不会变。',
        ],
        keywords: ['不同标准', '总数不变'],
      },
      {
        title: '例子',
        content: [
          '12 个图形：7 个五角星 + 5 个心形（按形状分）',
          '12 个图形：8 个蓝色 + 4 个红色（按颜色分）',
          '总数都是 12 个 ✅',
        ],
        visual: {
          kind: 'classify-table',
          headers: ['分法一（按形状）', '个数'],
          rows: [
            [{ label: '五角星', value: 7 }],
            [{ label: '心形', value: 5 }],
          ],
        },
      },
    ],
    practiceFactory: () => Array.from({ length: 4 }, (_, i) => standardChoice(i)),
  },
];

export const unit3: Unit = {
  id: 'unit3-classification',
  index: 3,
  title: '数据分类（一）',
  subtitle: '按标准分类计数 · 多种分法',
  icon: '🗂️',
  colorClass: 'bg-amber-500',
  accentClass: 'border-amber-200 bg-amber-50',
  description: '学会按相同特征分类，按不同标准分类计数。',
  lessons,
};
