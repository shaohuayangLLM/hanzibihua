import { PlaceValueQuestion, MathQuestionType } from '../types';

// 生成数位与位数题目
export function generatePlaceValueQuestions(count: number = 10): PlaceValueQuestion[] {
  const questions: PlaceValueQuestion[] = [];
  const generators = [
    generateTensUnitsQuestion,
    generatePositionQuestion,
    generateDigitCountQuestion,
    generateLeftRightQuestion,
  ];

  for (let i = 0; i < count; i++) {
    const generator = generators[i % generators.length];
    questions.push(generator(`${i + 1}`));
  }

  return shuffleArray(questions);
}

// 1. 十位个位识别
function generateTensUnitsQuestion(id: string): PlaceValueQuestion {
  const number = Math.floor(Math.random() * 90) + 10; // 10-99
  const tensPlace = Math.floor(number / 10);
  const unitsPlace = number % 10;
  const askTens = Math.random() > 0.5;

  return {
    id: `pv-tu-${id}`,
    type: MathQuestionType.PLACE_VALUE_TENS_UNITS,
    question: `${number} 的${askTens ? '十位' : '个位'}是几？`,
    answer: String(askTens ? tensPlace : unitsPlace),
    options: generateOptions(askTens ? tensPlace : unitsPlace, 0, 9),
    hint: askTens
      ? '十位上的数字表示有几个十，在左边'
      : '个位上的数字表示有几个一，在右边',
    explanation: `${number} 中，十位是 ${tensPlace}（表示${tensPlace}个十），个位是 ${unitsPlace}（表示${unitsPlace}个一）`,
    difficulty: 'easy',
    number,
    tensPlace,
    unitsPlace,
    visualData: {
      leftValue: tensPlace,
      rightValue: unitsPlace,
    },
  };
}

// 2. 数位位置（左/右）
function generatePositionQuestion(id: string): PlaceValueQuestion {
  const number = Math.floor(Math.random() * 90) + 10;
  const tensPlace = Math.floor(number / 10);
  const unitsPlace = number % 10;
  const askLeft = Math.random() > 0.5;

  return {
    id: `pv-pos-${id}`,
    type: MathQuestionType.PLACE_VALUE_POSITION,
    question: `在 ${number} 中，${askLeft ? '左边' : '右边'}的数字是几？`,
    answer: String(askLeft ? tensPlace : unitsPlace),
    options: generateOptions(askLeft ? tensPlace : unitsPlace, 0, 9),
    hint: '左边的数字是十位，右边的数字是个位',
    explanation: `${number} 中，左边是十位数字 ${tensPlace}，右边是个位数字 ${unitsPlace}`,
    difficulty: 'easy',
    number,
    tensPlace,
    unitsPlace,
    visualData: {
      leftValue: tensPlace,
      rightValue: unitsPlace,
    },
  };
}

// 3. 位数判断（一位数/两位数）
function generateDigitCountQuestion(id: string): PlaceValueQuestion {
  const isTwoDigit = Math.random() > 0.4;
  const number = isTwoDigit
    ? Math.floor(Math.random() * 90) + 10
    : Math.floor(Math.random() * 9) + 1;
  const correctAnswer = isTwoDigit ? '两位数' : '一位数';

  return {
    id: `pv-dc-${id}`,
    type: MathQuestionType.PLACE_VALUE_DIGIT_COUNT,
    question: `${number} 是一位数还是两位数？`,
    answer: correctAnswer,
    options: ['一位数', '两位数'],
    hint: '一位数只有1个数字（1-9），两位数有2个数字（10-99）',
    explanation: `${number} ${isTwoDigit ? '有两位，是两位数' : '只有一位，是一位数'}`,
    difficulty: 'easy',
    number,
    visualData: {
      leftValue: isTwoDigit ? Math.floor(number / 10) : 0,
      rightValue: number % 10,
    },
  };
}

// 4. 左右方位认知
function generateLeftRightQuestion(id: string): PlaceValueQuestion {
  const number = Math.floor(Math.random() * 90) + 10;
  const tensPlace = Math.floor(number / 10);
  const unitsPlace = number % 10;
  const description = Math.random() > 0.5 ? '十位' : '个位';
  const correctSide = description === '十位' ? '左边' : '右边';

  return {
    id: `pv-lr-${id}`,
    type: MathQuestionType.PLACE_VALUE_LEFT_RIGHT,
    question: `在 ${number} 中，${description}在左边还是右边？`,
    answer: correctSide,
    options: ['左边', '右边'],
    hint: '十位在左边，个位在右边',
    explanation: `${number} 中，${description}在${correctSide}`,
    difficulty: 'easy',
    number,
    tensPlace,
    unitsPlace,
    visualData: {
      leftValue: tensPlace,
      rightValue: unitsPlace,
    },
  };
}

// 工具函数：生成选项
function generateOptions(correct: number, min: number, max: number): string[] {
  const options = new Set<number>([correct]);
  let attempts = 0;
  const maxAttempts = 100;

  while (options.size < 2 && attempts < maxAttempts) {
    attempts++;
    const opt = Math.floor(Math.random() * (max - min + 1)) + min;
    options.add(opt);
  }

  // 如果还是不足2个，手动添加
  while (options.size < 2) {
    for (let i = min; i <= max && options.size < 2; i++) {
      options.add(i);
    }
  }

  return shuffleArray(Array.from(options).map(String));
}

// 工具函数：打乱数组
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
