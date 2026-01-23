import { CalculationQuestion, MathQuestionType } from '../types';

// 数的分与合映射表（2-10）
const NUMBER_COMPOSITIONS: Record<number, Array<[number, number]>> = {
  2: [[1, 1]],
  3: [[1, 2], [2, 1]],
  4: [[1, 3], [2, 2], [3, 1]],
  5: [[1, 4], [2, 3], [3, 2], [4, 1]],
  6: [[1, 5], [2, 4], [3, 3], [4, 2], [5, 1]],
  7: [[1, 6], [2, 5], [3, 4], [4, 3], [5, 2], [6, 1]],
  8: [[1, 7], [2, 6], [3, 5], [4, 4], [5, 3], [6, 2], [7, 1]],
  9: [[1, 8], [2, 7], [3, 6], [4, 5], [5, 4], [6, 3], [7, 2], [8, 1]],
  10: [[1, 9], [2, 8], [3, 7], [4, 6], [5, 5], [6, 4], [7, 3], [8, 2], [9, 1]],
};

// 生成计算与凑十法题目
export function generateCalculationQuestions(count: number = 10): CalculationQuestion[] {
  const questions: CalculationQuestion[] = [];
  const generators = [
    generateNumberCompositionQuestion,
    generateMakeTenMethodQuestion,
    generateAdditionWithin20CarryQuestion,
    // generateNumberLineQuestion, // 暂时禁用数轴题目
  ];

  const availableGenerators = generators.slice(0, 3); // 只用前3个生成器

  for (let i = 0; i < count; i++) {
    const generator = availableGenerators[i % availableGenerators.length];
    questions.push(generator(`${i + 1}`));
  }

  return shuffleArray(questions);
}

// 1. 数的分与合
function generateNumberCompositionQuestion(id: string): CalculationQuestion {
  const targetNumber = Math.floor(Math.random() * 9) + 2; // 2-10
  const compositions = NUMBER_COMPOSITIONS[targetNumber];
  const selectedComp = compositions[Math.floor(Math.random() * compositions.length)];

  return {
    id: `calc-comp-${id}`,
    type: MathQuestionType.NUMBER_COMPOSITION,
    question: `${targetNumber} 可以分成 ${selectedComp[0]} 和几？`,
    answer: String(selectedComp[1]),
    options: generateNumberOptions(selectedComp[1], 1, targetNumber - 1),
    hint: `${targetNumber} 的分法：${compositions.map(c => `${c[0]}和${c[1]}`).join('、')}`,
    explanation: `${targetNumber} 可以分成 ${selectedComp[0]} 和 ${selectedComp[1]}`,
    difficulty: 'easy',
    targetNumber,
    visualData: {
      compositionPairs: compositions,
    },
  };
}

// 2. 凑十法
function generateMakeTenMethodQuestion(id: string): CalculationQuestion {
  // 例如：9 + 5 = ?
  // 凑十法：9 + 1 = 10，5 - 1 = 4，10 + 4 = 14
  const firstNum = 8 + Math.floor(Math.random() * 2); // 8 或 9
  const secondNum = Math.floor(Math.random() * 8) + 2; // 2-9
  const makeTenAmount = 10 - firstNum;
  const remaining = secondNum - makeTenAmount;
  const answer = firstNum + secondNum;

  return {
    id: `calc-mt-${id}`,
    type: MathQuestionType.MAKE_TEN_METHOD,
    question: `用凑十法计算：${firstNum} + ${secondNum} = ?`,
    answer: String(answer),
    options: generateNumberOptions(answer, answer - 3, answer + 3),
    hint: `${firstNum} 凑 ${makeTenAmount} 变成 10，${secondNum} 分成 ${makeTenAmount} 和 ${remaining}`,
    explanation: `凑十法：${firstNum} + ${makeTenAmount} = 10，${secondNum} - ${makeTenAmount} = ${remaining}，10 + ${remaining} = ${answer}`,
    difficulty: 'medium',
    operand1: firstNum,
    operand2: secondNum,
    targetNumber: 10,
    visualData: {
      steps: [
        { label: `${firstNum} + ${secondNum}`, value: firstNum + secondNum },
        { label: `${firstNum} + ${makeTenAmount} = 10`, value: 10 },
        { label: `${secondNum} - ${makeTenAmount} = ${remaining}`, value: remaining },
        { label: `10 + ${remaining} = ${answer}`, value: answer },
      ],
    },
  };
}

// 3. 20以内进位加法
function generateAdditionWithin20CarryQuestion(id: string): CalculationQuestion {
  // 进位加法：和 >= 10
  const a = Math.floor(Math.random() * 9) + 1; // 1-9
  const b = Math.floor(Math.random() * 9) + 1; // 1-9
  // 确保是进位加法
  const isCarry = a + b >= 10;

  const operand1 = isCarry ? a : Math.floor(Math.random() * 5) + 5;
  const operand2 = isCarry ? b : Math.floor(Math.random() * 5) + 5;
  const answer = operand1 + operand2;

  return {
    id: `calc-add20-${id}`,
    type: MathQuestionType.ADDITION_WITHIN_20_CARRY,
    question: `${operand1} + ${operand2} = ?`,
    answer: String(answer),
    options: generateNumberOptions(answer, Math.max(10, answer - 2), Math.min(18, answer + 2)),
    hint: answer >= 10 ? '这是进位加法，个位相加满10要进位' : '直接相加即可',
    explanation: `${operand1} + ${operand2} = ${answer}${answer >= 10 ? '（个位满十进一）' : ''}`,
    difficulty: answer >= 10 ? 'medium' : 'easy',
    operand1,
    operand2,
    visualData: {
      steps: [
        { label: `${operand1} + ${operand2}`, value: answer },
      ],
    },
  };
}

// 4. 数轴计算
function generateNumberLineQuestion(id: string): CalculationQuestion {
  // 数轴加减法 - 使用迭代代替递归避免栈溢出
  let attempts = 0;
  let start, isAddition, jump, end;

  do {
    attempts++;
    if (attempts > 100) {
      // 如果尝试太多次，返回一个简单的加法题目
      start = 5;
      isAddition = true;
      jump = 2;
      end = start + jump;
      break;
    }

    start = Math.floor(Math.random() * 10); // 0-9
    isAddition = Math.random() > 0.5;
    jump = Math.floor(Math.random() * 5) + 1; // 1-5
    end = isAddition ? start + jump : start - jump;
  } while (end < 0);

  return {
    id: `calc-nl-${id}`,
    type: MathQuestionType.NUMBER_LINE_CALCULATION,
    question: `在数轴上，从 ${start} ${isAddition ? '向右' : '向左'}跳 ${jump} 格，到达几？`,
    answer: String(end),
    options: generateNumberOptions(end, Math.max(0, end - 3), end + 3),
    hint: isAddition ? `向右跳表示加法：${start} + ${jump}` : `向左跳表示减法：${start} - ${jump}`,
    explanation: `从 ${start} ${isAddition ? '向右' : '向左'}跳 ${jump} 格，${start} ${isAddition ? '+' : '-'} ${jump} = ${end}`,
    difficulty: 'medium',
    operand1: start,
    operand2: jump,
    visualData: {
      numberLine: {
        start: Math.max(0, end - 5),
        end: Math.min(20, end + 5),
        arrows: [
          {
            from: start,
            to: end,
            label: `${isAddition ? '+' : '-'}${jump}`,
          },
        ],
      },
    },
  };
}

// 工具函数：生成数字选项
function generateNumberOptions(correct: number, min: number, max: number): string[] {
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
