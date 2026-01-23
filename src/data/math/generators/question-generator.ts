/**
 * 一年级数学题目生成器
 * 用于自动生成各类数学题目
 */

import {
  MathQuestion,
  FillQuestion,
  CalculateQuestion,
  PatternQuestion,
  ApplicationQuestion,
  QuestionType,
  DifficultyLevel,
  KnowledgePoint,
  GeneratorConfig,
} from './question-types-schema';

// ============ 工具函数 ============

/**
 * 生成随机整数
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 从数组中随机选择一个元素
 */
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 生成唯一ID
 */
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 洗牌算法
 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ============ 填空题生成器 ============

/**
 * 生成数的比较填空题
 */
export function generateCompareFillQuestion(): FillQuestion {
  const num1 = randomInt(1, 10);
  const num2 = randomInt(1, 10);

  let operator: '>' | '<' | '=';
  if (num1 > num2) operator = '>';
  else if (num1 < num2) operator = '<';
  else operator = '=';

  return {
    id: generateId('fill_compare'),
    type: 'fill',
    difficulty: 1,
    knowledgePoints: ['number_compare'],
    estimatedTime: 20,
    content: {
      question: `${num1} ○ ${num2}`,
      blanks: [
        { index: 0, answer: operator, type: 'text' },
      ],
    },
  };
}

/**
 * 生成相邻数填空题
 */
export function generateAdjacentNumberQuestion(): FillQuestion {
  const middle = randomInt(2, 8);
  const left = middle - 1;
  const right = middle + 1;

  return {
    id: generateId('fill_adjacent'),
    type: 'fill',
    difficulty: 1,
    knowledgePoints: ['number_sequence'],
    estimatedTime: 25,
    content: {
      question: `和${middle}相邻的两个数分别是(　　)和(　　)。`,
      blanks: [
        { index: 0, answer: left.toString(), type: 'number' },
        { index: 1, answer: right.toString(), type: 'number' },
      ],
    },
  };
}

/**
 * 生成填未知数题目
 */
export function generateUnknownNumberQuestion(): FillQuestion {
  const types = ['a + b = c', 'c - b = a', 'c - a = b'];
  const type = randomChoice(types);

  let a: number, b: number, c: number;
  let unknownIndex: number;
  let question: string;

  switch (type) {
    case 'a + b = c':
      a = randomInt(1, 5);
      b = randomInt(1, 5);
      c = a + b;
      unknownIndex = randomChoice([0, 1]);
      if (unknownIndex === 0) {
        question = `(　　) + ${b} = ${c}`;
      } else {
        question = `${a} + (　　) = ${c}`;
      }
      break;
    case 'c - b = a':
      c = randomInt(5, 10);
      b = randomInt(1, c - 1);
      a = c - b;
      question = `${c} - (　　) = ${a}`;
      unknownIndex = 0;
      break;
    case 'c - a = b':
      c = randomInt(5, 10);
      a = randomInt(1, c - 1);
      b = c - a;
      question = `(　　) - ${a} = ${b}`;
      unknownIndex = 0;
      break;
  }

  const answer = unknownIndex === 0 ? a : b;

  return {
    id: generateId('fill_unknown'),
    type: 'fill',
    difficulty: 2,
    knowledgePoints: ['unknown_number', 'number_composition'],
    estimatedTime: 30,
    content: {
      question,
      blanks: [
        { index: 0, answer: answer.toString(), type: 'number' },
      ],
    },
  };
}

/**
 * 生成符号填空题
 */
export function generateSymbolFillQuestion(): FillQuestion {
  const problems = [
    { left: 6, right: 4, result: 2, operator: '-' },
    { left: 7, right: 2, result: 9, operator: '+' },
    { left: 9, right: 3, result: 6, operator: '-' },
    { left: 0, right: 10, result: 10, operator: '+' },
    { left: 5, right: 5, result: 0, operator: '-' },
    { left: 4, right: 4, result: 8, operator: '+' },
  ];

  const problem = randomChoice(problems);

  return {
    id: generateId('fill_symbol'),
    type: 'fill',
    difficulty: 2,
    knowledgePoints: ['addition_subtraction'],
    estimatedTime: 25,
    content: {
      question: `${problem.left} ○ ${problem.right} = ${problem.result}`,
      blanks: [
        { index: 0, answer: problem.operator, type: 'text' },
      ],
    },
  };
}

// ============ 计算题生成器 ============

/**
 * 生成基础加法题
 */
export function generateAdditionQuestion(max: number = 10): CalculateQuestion {
  const a = randomInt(0, max);
  const b = randomInt(0, max - a);

  return {
    id: generateId('calc_add'),
    type: 'calculate',
    difficulty: 1,
    knowledgePoints: ['addition_subtraction'],
    estimatedTime: 15,
    content: {
      expression: `${a} + ${b} =`,
      answer: a + b,
      category: 'addition',
    },
  };
}

/**
 * 生成基础减法题
 */
export function generateSubtractionQuestion(max: number = 10): CalculateQuestion {
  const result = randomInt(0, max);
  const b = randomInt(0, max - result);
  const a = result + b;

  return {
    id: generateId('calc_sub'),
    type: 'calculate',
    difficulty: 1,
    knowledgePoints: ['addition_subtraction'],
    estimatedTime: 15,
    content: {
      expression: `${a} - ${b} =`,
      answer: result,
      category: 'subtraction',
    },
  };
}

/**
 * 生成连加题
 */
export function generateChainAdditionQuestion(): CalculateQuestion {
  const a = randomInt(1, 4);
  const b = randomInt(1, 4);
  const c = randomInt(1, 4);

  return {
    id: generateId('calc_chain_add'),
    type: 'calculate',
    difficulty: 2,
    knowledgePoints: ['calculation_chain'],
    estimatedTime: 25,
    content: {
      expression: `${a} + ${b} + ${c} =`,
      answer: a + b + c,
      category: 'chain',
    },
  };
}

/**
 * 生成加减混合题
 */
export function generateMixedCalculationQuestion(): CalculateQuestion {
  const types = [
    'a + b - c',
    'a - b + c',
    'a - b - c',
  ];

  const type = randomChoice(types);
  let a: number, b: number, c: number;
  let expression: string;
  let answer: number;

  switch (type) {
    case 'a + b - c':
      a = randomInt(1, 5);
      b = randomInt(1, 5);
      c = randomInt(1, a + b);
      expression = `${a} + ${b} - ${c} =`;
      answer = a + b - c;
      break;
    case 'a - b + c':
      a = randomInt(3, 8);
      b = randomInt(1, a - 2);
      c = randomInt(0, 5);
      expression = `${a} - ${b} + ${c} =`;
      answer = a - b + c;
      break;
    case 'a - b - c':
      a = randomInt(5, 10);
      b = randomInt(1, a - 3);
      c = randomInt(1, a - b - 1);
      expression = `${a} - ${b} - ${c} =`;
      answer = a - b - c;
      break;
  }

  return {
    id: generateId('calc_mixed'),
    type: 'calculate',
    difficulty: 2,
    knowledgePoints: ['calculation_chain'],
    estimatedTime: 30,
    content: {
      expression,
      answer,
      category: 'mixed',
    },
  };
}

// ============ 规律题生成器 ============

/**
 * 生成图形规律题
 */
export function generateShapePatternQuestion(): PatternQuestion {
  const patterns = [
    {
      template: ['△', '□', '△', '□'],
      next: ['△', '□'],
      description: 'ABAB重复',
    },
    {
      template: ['△', '□', '□', '△', '□', '□'],
      next: ['△', '□', '□'],
      description: 'ABBABB重复',
    },
    {
      template: ['○', '○', '△', '○', '○', '△'],
      next: ['○', '○', '△'],
      description: 'AAB AAB重复',
    },
  ];

  const pattern = randomChoice(patterns);
  const blanks = pattern.template.length;
  const sequence = [...pattern.template, ...Array(pattern.next.length).fill(null)];

  return {
    id: generateId('pattern_shape'),
    type: 'pattern',
    difficulty: 3,
    knowledgePoints: ['pattern_shape'],
    estimatedTime: 45,
    content: {
      patternType: 'shape',
      sequence,
      blanks: Array.from({ length: pattern.next.length }, (_, i) => blanks + i),
      hint: `观察图形的${pattern.description}规律`,
    },
  };
}

/**
 * 生成数列规律题
 */
export function generateNumberPatternQuestion(): PatternQuestion {
  const patterns = [
    {
      start: 9,
      step: -2,
      count: 5,
      description: '每次减少2',
    },
    {
      start: 10,
      step: -1,
      count: 5,
      description: '每次减少1',
    },
    {
      start: 0,
      step: 2,
      count: 5,
      description: '每次增加2',
    },
  ];

  const pattern = randomChoice(patterns);
  const sequence: Array<number | null> = [];
  const blanks: number[] = [];

  for (let i = 0; i < pattern.count; i++) {
    // 随机隐藏一些数字
    if (Math.random() > 0.6) {
      sequence.push(null);
      blanks.push(i);
    } else {
      sequence.push(pattern.start + pattern.step * i);
    }
  }

  // 确保至少有2个空
  if (blanks.length < 2) {
    sequence[sequence.length - 1] = null;
    sequence[sequence.length - 2] = null;
    blanks.push(sequence.length - 1, sequence.length - 2);
  }

  return {
    id: generateId('pattern_number'),
    type: 'pattern',
    difficulty: 3,
    knowledgePoints: ['pattern_number'],
    estimatedTime: 40,
    content: {
      patternType: 'number',
      sequence,
      blanks,
      hint: pattern.description,
    },
  };
}

// ============ 应用题生成器 ============

/**
 * 生成加法应用题
 */
export function generateAdditionWordProblem(): ApplicationQuestion {
  const scenarios = [
    {
      template: '{name}有{a}个{item1}，妈妈又给他买了{b}个{item1}，{name}现在一共有多少个{item1}？',
      names: ['小明', '小红', '小刚', '小丽'],
      items: ['苹果', '橘子', '铅笔', '橡皮'],
    },
    {
      template: '树上有{a}只{item1}，又飞来了{b}只{item1}，现在树上一共有多少只{item1}？',
      names: [],
      items: ['小鸟', '蝴蝶', '蜜蜂'],
    },
    {
      template: '停车场有{a}辆{item1}，又开来了{b}辆{item1}，现在停车场一共有多少辆{item1}？',
      names: [],
      items: ['汽车', '公交车', '自行车'],
    },
  ];

  const scenario = randomChoice(scenarios);
  const name = scenario.names.length > 0 ? randomChoice(scenario.names) : '';
  const item = randomChoice(scenario.items);
  const a = randomInt(3, 7);
  const b = randomInt(2, 5);

  let question = scenario.template
    .replace('{name}', name)
    .replace('{a}', a.toString())
    .replace('{b}', b.toString())
    .replace('{item1}', item)
    .replace('{item1}', item);

  return {
    id: generateId('word_add'),
    type: 'application',
    difficulty: 2,
    knowledgePoints: ['word_problem_add'],
    estimatedTime: 60,
    content: {
      scenario: question.split('？')[0] + '。',
      question: question.split('？')[1] || '一共有多少？',
      answer: {
        value: a + b,
        expression: `${a} + ${b} = ${a + b}`,
      },
      steps: [
        `已知有${a}${item}`,
        `又来了${b}${item}`,
        `求总数用加法：${a} + ${b} = ${a + b}`,
      ],
      explanation: '求总数用加法计算',
    },
  };
}

/**
 * 生成减法应用题
 */
export function generateSubtractionWordProblem(): ApplicationQuestion {
  const scenarios = [
    {
      template: '{name}有{c}个{item}，吃了{b}个{item}，还剩多少个{item}？',
      names: ['小明', '小红', '小刚', '小丽'],
      items: ['苹果', '橘子', '饼干', '糖果'],
    },
    {
      template: '树上有{c}只{item}，飞走了{b}只{item}，还剩多少只{item}？',
      names: [],
      items: ['小鸟', '蝴蝶'],
    },
    {
      template: '盘子里有{c}个{item}，拿走了{b}个{item}，还剩多少个{item}？',
      names: [],
      items: ['梨', '桃子', '鸡蛋'],
    },
  ];

  const scenario = randomChoice(scenarios);
  const name = scenario.names.length > 0 ? randomChoice(scenario.names) : '';
  const item = randomChoice(scenario.items);
  const c = randomInt(6, 10);
  const b = randomInt(2, c - 2);
  const a = c - b;

  let question = scenario.template
    .replace('{name}', name)
    .replace('{c}', c.toString())
    .replace('{b}', b.toString())
    .replace('{item}', item);

  return {
    id: generateId('word_sub'),
    type: 'application',
    difficulty: 2,
    knowledgePoints: ['word_problem_subtract'],
    estimatedTime: 60,
    content: {
      scenario: question.split('？')[0] + '。',
      question: question.split('？')[1] || '还剩多少？',
      answer: {
        value: a,
        expression: `${c} - ${b} = ${a}`,
      },
      steps: [
        `一共有${c}${item}`,
        `用掉了${b}${item}`,
        `求剩余用减法：${c} - ${b} = ${a}`,
      ],
      explanation: '求剩余用减法计算',
    },
  };
}

// ============ 通用题目生成器 ============

/**
 * 生成指定类型的题目
 */
export function generateQuestion(
  type: QuestionType,
  difficulty?: DifficultyLevel
): MathQuestion {
  switch (type) {
    case 'fill':
      const fillTypes = ['compare', 'adjacent', 'unknown', 'symbol'];
      const fillType = randomChoice(fillTypes);
      switch (fillType) {
        case 'compare':
          return generateCompareFillQuestion();
        case 'adjacent':
          return generateAdjacentNumberQuestion();
        case 'unknown':
          return generateUnknownNumberQuestion();
        case 'symbol':
          return generateSymbolFillQuestion();
      }
      break;

    case 'calculate':
      const calcTypes = ['add', 'sub', 'chain_add', 'mixed'];
      const calcType = randomChoice(calcTypes);
      switch (calcType) {
        case 'add':
          return generateAdditionQuestion();
        case 'sub':
          return generateSubtractionQuestion();
        case 'chain_add':
          return generateChainAdditionQuestion();
        case 'mixed':
          return generateMixedCalculationQuestion();
      }
      break;

    case 'pattern':
      const patternTypes = ['shape', 'number'];
      const patternType = randomChoice(patternTypes);
      switch (patternType) {
        case 'shape':
          return generateShapePatternQuestion();
        case 'number':
          return generateNumberPatternQuestion();
      }
      break;

    case 'application':
      const appTypes = ['add', 'sub'];
      const appType = randomChoice(appTypes);
      switch (appType) {
        case 'add':
          return generateAdditionWordProblem();
        case 'sub':
          return generateSubtractionWordProblem();
      }
      break;

    default:
      // 默认生成加法题
      return generateAdditionQuestion();
  }

  return generateAdditionQuestion();
}

/**
 * 批量生成题目
 */
export function generateQuestions(config: GeneratorConfig): MathQuestion[] {
  const questions: MathQuestion[] = [];
  const { count, questionTypes, difficulty, knowledgePoints } = config;

  for (let i = 0; i < count; i++) {
    const type = randomChoice(questionTypes);
    const question = generateQuestion(type);

    // 应用过滤器
    if (difficulty && !difficulty.includes(question.difficulty)) {
      i--; // 重新生成
      continue;
    }

    if (knowledgePoints.length > 0) {
      const hasKnowledgePoint = question.knowledgePoints.some(kp =>
        knowledgePoints.includes(kp)
      );
      if (!hasKnowledgePoint) {
        i--; // 重新生成
        continue;
      }
    }

    questions.push(question);
  }

  return shuffle(questions);
}

/**
 * 生成综合练习题集
 */
export function generateMixedPractice(
  count: number = 20
): MathQuestion[] {
  const types: QuestionType[] = ['fill', 'calculate', 'calculate', 'pattern', 'application'];

  return generateQuestions({
    count,
    questionTypes: types,
    difficulty: [1, 2, 2, 3], // 按比例分配难度
    knowledgePoints: [],
  });
}

/**
 * 生成口算练习题集
 */
export function generateMentalMathPractice(
  count: number = 30
): CalculateQuestion[] {
  const questions: CalculateQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const type = randomChoice(['add', 'sub', 'mixed']);
    let question: CalculateQuestion;

    switch (type) {
      case 'add':
        question = generateAdditionQuestion();
        break;
      case 'sub':
        question = generateSubtractionQuestion();
        break;
      case 'mixed':
        question = generateMixedCalculationQuestion();
        break;
      default:
        question = generateAdditionQuestion();
    }

    questions.push(question);
  }

  return shuffle(questions);
}

/**
 * 按知识点生成练习题
 */
export function generatePracticeByKnowledgePoint(
  knowledgePoint: KnowledgePoint,
  count: number = 10
): MathQuestion[] {
  const questions: MathQuestion[] = [];
  let attempts = 0;
  const maxAttempts = count * 3; // 防止无限循环

  while (questions.length < count && attempts < maxAttempts) {
    const question = generateQuestion('calculate');

    if (question.knowledgePoints.includes(knowledgePoint)) {
      questions.push(question);
    }

    attempts++;
  }

  return questions;
}
