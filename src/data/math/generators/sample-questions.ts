/**
 * 一年级数学上册示例题目库
 * 基于期末综合素质测评分析
 */

import {
  MathQuestion,
  FillQuestion,
  ChoiceQuestion,
  CalculateQuestion,
  MatchQuestion,
  PatternQuestion,
  ApplicationQuestion,
  ClockQuestion,
  CompareQuestion
} from './question-types-schema';

// ============ 填空题示例 ============

const fillQuestions: FillQuestion[] = [
  // 数的比较
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
        { index: 1, answer: '>', type: 'text' },
        { index: 2, answer: '=', type: 'text' },
      ],
      image: 'numbers_compare',
    },
  },

  // 相邻数
  {
    id: 'fill_002',
    type: 'fill',
    difficulty: 1,
    knowledgePoints: ['number_sequence'],
    estimatedTime: 20,
    content: {
      question: '和4相邻的两个数分别是(　　)和(　　)。',
      blanks: [
        { index: 0, answer: '3', type: 'number' },
        { index: 1, answer: '5', type: 'number' },
      ],
    },
  },

  // 数序
  {
    id: 'fill_003',
    type: 'fill',
    difficulty: 2,
    knowledgePoints: ['number_sequence'],
    estimatedTime: 30,
    content: {
      question: '9前面的第一个数是(　　)，9后面的第一个数是(　　)。',
      blanks: [
        { index: 0, answer: '8', type: 'number' },
        { index: 1, answer: '10', type: 'number' },
      ],
    },
  },

  // 填未知数
  {
    id: 'fill_004',
    type: 'fill',
    difficulty: 2,
    knowledgePoints: ['unknown_number', 'number_composition'],
    estimatedTime: 45,
    content: {
      question: '在(　　)里填上合适的数。',
      blanks: [
        { index: 0, answer: '3', type: 'number' },
        { index: 1, answer: '6', type: 'number' },
        { index: 2, answer: '0', type: 'number' },
        { index: 3, answer: '2', type: 'number' },
        { index: 4, answer: '1', type: 'number' },
        { index: 5, answer: '1', type: 'number' },
      ],
      image: 'fill_unknown',
    },
  },

  // 符号填空
  {
    id: 'fill_005',
    type: 'fill',
    difficulty: 2,
    knowledgePoints: ['addition_subtraction'],
    estimatedTime: 40,
    content: {
      question: '在○里填上"＋"或"－"。',
      blanks: [
        { index: 0, answer: '-', type: 'text' },
        { index: 1, answer: '+', type: 'text' },
        { index: 2, answer: '+', type: 'text' },
        { index: 3, answer: '-', type: 'text' },
      ],
      image: 'symbol_fill',
    },
  },

  // 位置填空
  {
    id: 'fill_006',
    type: 'fill',
    difficulty: 2,
    knowledgePoints: ['position'],
    estimatedTime: 30,
    content: {
      question: '小鹿跑在最(　　)面，小鸭跑在最(　　)面。',
      blanks: [
        { index: 0, answer: '前', type: 'text' },
        { index: 1, answer: '后', type: 'text' },
      ],
      image: 'animals_racing',
    },
  },

  // 不等式填空
  {
    id: 'fill_007',
    type: 'fill',
    difficulty: 3,
    knowledgePoints: ['number_compare', 'unknown_number'],
    estimatedTime: 60,
    content: {
      question: '在□里填上合适的数。',
      blanks: [
        { index: 0, answer: '0,1,2,3', type: 'text', width: 'long' },
        { index: 1, answer: '6', type: 'number' },
        { index: 2, answer: '5', type: 'number' },
        { index: 3, answer: '0,1,2,3,4,5,6', type: 'text', width: 'long' },
      ],
      hint: '部分答案不唯一',
    },
  },
];

// ============ 选择题示例 ============

const choiceQuestions: ChoiceQuestion[] = [
  // 分类选择
  {
    id: 'choice_001',
    type: 'choice',
    difficulty: 2,
    knowledgePoints: ['classification'],
    estimatedTime: 30,
    content: {
      question: '下面(　　)与另外两个不是一类的。',
      options: [
        { label: '①', value: 'A', image: 'item_a' },
        { label: '②', value: 'B', image: 'item_b' },
        { label: '③', value: 'C', image: 'item_c' },
      ],
      correctAnswer: 'B',
      explanation: '因为①和③是水果，②是蔬菜',
      image: 'classify_choice',
    },
  },

  // 稳定性选择
  {
    id: 'choice_002',
    type: 'choice',
    difficulty: 2,
    knowledgePoints: ['shape_recognition'],
    estimatedTime: 25,
    content: {
      question: '下列图形摆放最稳的是(　　)。',
      options: [
        { label: '①', value: 'A', image: 'shape_cone' },
        { label: '②', value: 'B', image: 'shape_cube' },
        { label: '③', value: 'C', image: 'shape_cylinder_standing' },
      ],
      correctAnswer: 'C',
      explanation: '圆柱竖着放最稳',
    },
  },

  // 问题选择
  {
    id: 'choice_003',
    type: 'choice',
    difficulty: 3,
    knowledgePoints: ['word_problem_add'],
    estimatedTime: 40,
    content: {
      question: '下面哪个问题可以用"4＋4＝8"来解决？',
      options: [
        { label: '①', value: 'A', content: '一共有多少人' },
        { label: '②', value: 'B', content: '一共有多少棵树' },
        { label: '③', value: 'C', content: '还剩多少人' },
      ],
      correctAnswer: 'A',
      explanation: '求总数用加法',
    },
  },
];

// ============ 计算题示例 ============

const calculateQuestions: CalculateQuestion[] = [
  // 基础加法
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
  },

  // 基础减法
  {
    id: 'calc_002',
    type: 'calculate',
    difficulty: 1,
    knowledgePoints: ['addition_subtraction'],
    estimatedTime: 15,
    content: {
      expression: '7 - 2 =',
      answer: 5,
      category: 'subtraction',
    },
  },

  // 0的运算
  {
    id: 'calc_003',
    type: 'calculate',
    difficulty: 1,
    knowledgePoints: ['addition_subtraction'],
    estimatedTime: 15,
    content: {
      expression: '9 + 0 =',
      answer: 9,
      category: 'addition',
    },
  },

  // 连加
  {
    id: 'calc_004',
    type: 'calculate',
    difficulty: 2,
    knowledgePoints: ['calculation_chain'],
    estimatedTime: 20,
    content: {
      expression: '0 + 6 + 3 =',
      answer: 9,
      category: 'chain',
    },
  },

  // 加减混合
  {
    id: 'calc_005',
    type: 'calculate',
    difficulty: 2,
    knowledgePoints: ['calculation_chain'],
    estimatedTime: 25,
    content: {
      expression: '3 - 3 + 5 =',
      answer: 5,
      category: 'chain',
    },
  },

  // 连加（相同数）
  {
    id: 'calc_006',
    type: 'calculate',
    difficulty: 2,
    knowledgePoints: ['calculation_chain'],
    estimatedTime: 20,
    content: {
      expression: '2 + 2 + 2 =',
      answer: 6,
      category: 'chain',
    },
  },

  // 较难混合运算
  {
    id: 'calc_007',
    type: 'calculate',
    difficulty: 3,
    knowledgePoints: ['calculation_chain'],
    estimatedTime: 30,
    content: {
      expression: '9 - 4 + 5 =',
      answer: 10,
      category: 'mixed',
    },
  },
];

// ============ 规律题示例 ============

const patternQuestions: PatternQuestion[] = [
  // 图形规律
  {
    id: 'pattern_001',
    type: 'pattern',
    difficulty: 3,
    knowledgePoints: ['pattern_shape'],
    estimatedTime: 45,
    content: {
      patternType: 'shape',
      sequence: ['△', '□', '□', '△', '□', '□', '△', null, null, null],
      blanks: [7, 8, 9],
      hint: '观察图形的重复规律',
    },
  },

  // 数列规律（偶数递减）
  {
    id: 'pattern_002',
    type: 'pattern',
    difficulty: 3,
    knowledgePoints: ['pattern_number'],
    estimatedTime: 40,
    content: {
      patternType: 'number',
      sequence: [9, null, 5, null, 1],
      blanks: [1, 3],
      hint: '每次减少2',
    },
  },

  // 算式规律
  {
    id: 'pattern_003',
    type: 'pattern',
    difficulty: 3,
    knowledgePoints: ['pattern_calculation'],
    estimatedTime: 50,
    content: {
      patternType: 'calculation',
      sequence: ['10-7', '9-6', '8-5', null, null, null],
      blanks: [3, 4, 5],
      hint: '被减数和减数每次减少1，差不变',
    },
  },
];

// ============ 应用题示例 ============

const applicationQuestions: ApplicationQuestion[] = [
  // 加法应用（总数）
  {
    id: 'app_001',
    type: 'application',
    difficulty: 2,
    knowledgePoints: ['word_problem_add'],
    estimatedTime: 60,
    content: {
      scenario: '腊八节这天，典典妈妈煮了8碗腊八粥，送给邻居2碗，剩下的典典家刚好一人一碗。',
      question: '典典家有几人？',
      image: 'lab_porridge',
      answer: {
        value: 6,
        expression: '8 - 2 = 6',
        unit: '人',
      },
      steps: [
        '一共有8碗粥',
        '送出2碗',
        '还剩：8 - 2 = 6（碗）',
        '典典家一人一碗，所以有6人',
      ],
      explanation: '用减法求剩余',
    },
  },

  // 凑十法应用
  {
    id: 'app_002',
    type: 'application',
    difficulty: 2,
    knowledgePoints: ['word_problem_add'],
    estimatedTime: 60,
    content: {
      scenario: '典典和好朋友一共10人，每人要吃一个糖瓜。',
      question: '选(　　)号和(　　)号糖瓜正合适。',
      image: 'sugar_melon',
      answer: {
        value: 10,
        expression: '3 + 7 = 10',
      },
      steps: [
        '一共有10人',
        '需要10个糖瓜',
        '找出和为10的两个数',
      ],
    },
  },

  // 排队问题（重叠）
  {
    id: 'app_003',
    type: 'application',
    difficulty: 4,
    knowledgePoints: ['word_problem_queue'],
    estimatedTime: 90,
    content: {
      scenario: '典典排队给奶奶拜年，从前往后数他是第4个，从后往前数也是第4个。',
      question: '排队给奶奶拜年的一共有多少人？',
      image: 'queue_line',
      answer: {
        value: 7,
        expression: '4 + 4 - 1 = 7',
        unit: '人',
      },
      steps: [
        '从前往后数典典是第4个',
        '从后往前数典典也是第4个',
        '典典被数了两次，要减去1',
        '4 + 4 - 1 = 7（人）',
      ],
      explanation: '典典被重复计算了，所以要减1',
      hint: '可以画一画图',
    },
  },

  // 简单减法应用
  {
    id: 'app_004',
    type: 'application',
    difficulty: 2,
    knowledgePoints: ['word_problem_subtract'],
    estimatedTime: 50,
    content: {
      scenario: '树上有8只小鸟，飞走了5只。',
      question: '还剩几只小鸟？',
      image: 'birds_tree',
      answer: {
        value: 3,
        expression: '8 - 5 = 3',
        unit: '只',
      },
      explanation: '求剩余用减法',
    },
  },

  // 挑战题（推理）
  {
    id: 'app_005',
    type: 'application',
    difficulty: 4,
    knowledgePoints: ['reasoning'],
    estimatedTime: 120,
    content: {
      scenario: '爸爸、妈妈和天天一共摘了10个桃子。爸爸和妈妈摘的同样多，天天摘了2个。',
      question: '爸爸、妈妈每人摘了(　　)个桃子，天天摘了(　　)个桃子。',
      image: 'peaches',
      answer: {
        value: 4,
        expression: '10 - 2 = 8, 8 ÷ 2 = 4',
      },
      steps: [
        '一共10个桃子',
        '天天摘了2个',
        '爸爸和妈妈共摘：10 - 2 = 8（个）',
        '爸爸和妈妈摘的一样多',
        '每人摘：8 ÷ 2 = 4（个）',
      ],
      explanation: '先减去天天的，再平均分配',
    },
  },
];

// ============ 时钟题示例 ============

const clockQuestions: ClockQuestion[] = [
  {
    id: 'clock_001',
    type: 'clock',
    difficulty: 1,
    knowledgePoints: ['clock'],
    estimatedTime: 30,
    content: {
      question: '当分针指向12，时针指向7时，时间是(　　)。',
      hour: 7,
      minute: 0,
      answer: '7时',
      showClock: true,
    },
  },

  {
    id: 'clock_002',
    type: 'clock',
    difficulty: 1,
    knowledgePoints: ['clock'],
    estimatedTime: 25,
    content: {
      question: '看时钟，写出时间。',
      hour: 9,
      minute: 0,
      answer: '9时',
      showClock: true,
    },
  },
];

// ============ 比较题示例 ============

const compareQuestions: CompareQuestion[] = [
  {
    id: 'compare_001',
    type: 'compare',
    difficulty: 1,
    knowledgePoints: ['number_compare'],
    estimatedTime: 20,
    content: {
      left: 5,
      right: 3,
      operator: '>',
      question: '在○里填上">"、"<"或"＝"。',
      leftImage: 'five_apples',
      rightImage: 'three_apples',
    },
  },

  {
    id: 'compare_002',
    type: 'compare',
    difficulty: 2,
    knowledgePoints: ['number_compare', 'addition_subtraction'],
    estimatedTime: 30,
    content: {
      left: '6 + 2',
      right: '9',
      operator: '<',
      question: '在○里填上">"、"<"或"＝"。',
    },
  },
];

// ============ 导出所有题目 ============

export const allQuestions: MathQuestion[] = [
  ...fillQuestions,
  ...choiceQuestions,
  ...calculateQuestions,
  ...patternQuestions,
  ...applicationQuestions,
  ...clockQuestions,
  ...compareQuestions,
];

// ============ 按知识点分组 ============

export const questionsByKnowledgePoint = {
  number_0_10: allQuestions.filter(q => q.knowledgePoints.includes('number_0_10')),
  number_sequence: allQuestions.filter(q => q.knowledgePoints.includes('number_sequence')),
  number_compare: allQuestions.filter(q => q.knowledgePoints.includes('number_compare')),
  number_composition: allQuestions.filter(q => q.knowledgePoints.includes('number_composition')),
  addition_subtraction: allQuestions.filter(q => q.knowledgePoints.includes('addition_subtraction')),
  calculation_chain: allQuestions.filter(q => q.knowledgePoints.includes('calculation_chain')),
  unknown_number: allQuestions.filter(q => q.knowledgePoints.includes('unknown_number')),
  pattern_shape: allQuestions.filter(q => q.knowledgePoints.includes('pattern_shape')),
  pattern_number: allQuestions.filter(q => q.knowledgePoints.includes('pattern_number')),
  pattern_calculation: allQuestions.filter(q => q.knowledgePoints.includes('pattern_calculation')),
  shape_recognition: allQuestions.filter(q => q.knowledgePoints.includes('shape_recognition')),
  shape_counting: allQuestions.filter(q => q.knowledgePoints.includes('shape_counting')),
  position: allQuestions.filter(q => q.knowledgePoints.includes('position')),
  clock: allQuestions.filter(q => q.knowledgePoints.includes('clock')),
  classification: allQuestions.filter(q => q.knowledgePoints.includes('classification')),
  word_problem_add: allQuestions.filter(q => q.knowledgePoints.includes('word_problem_add')),
  word_problem_subtract: allQuestions.filter(q => q.knowledgePoints.includes('word_problem_subtract')),
  word_problem_queue: allQuestions.filter(q => q.knowledgePoints.includes('word_problem_queue')),
  reasoning: allQuestions.filter(q => q.knowledgePoints.includes('reasoning')),
};

// ============ 按难度分组 ============

export const questionsByDifficulty = {
  1: allQuestions.filter(q => q.difficulty === 1),
  2: allQuestions.filter(q => q.difficulty === 2),
  3: allQuestions.filter(q => q.difficulty === 3),
  4: allQuestions.filter(q => q.difficulty === 4),
};

// ============ 按题型分组 ============

export const questionsByType = {
  fill: fillQuestions,
  choice: choiceQuestions,
  calculate: calculateQuestions,
  pattern: patternQuestions,
  application: applicationQuestions,
  clock: clockQuestions,
  compare: compareQuestions,
};
