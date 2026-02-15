import { CalculationQuestion, MathQuestionType } from '../types';

// 生成凑十法与破十法题目
export function generateCalculationQuestions(count: number = 10): CalculationQuestion[] {
  const questions: CalculationQuestion[] = [];
  const generators = [generateMakeTenMethodQuestion, generateBreakTenMethodQuestion];

  for (let i = 0; i < count; i++) {
    const generator = generators[i % generators.length];
    questions.push(generator(`${i + 1}`));
  }

  return shuffleArray(questions);
}

// 1. 凑十法：任意跨十加法（如 5+8）
function generateMakeTenMethodQuestion(id: string): CalculationQuestion {
  const base = Math.floor(Math.random() * 8) + 2; // 2-9
  const minAddend = 11 - base; // 保证和大于10
  const addend = Math.floor(Math.random() * (9 - minAddend + 1)) + minAddend;

  const splitToTen = 10 - base;
  const splitRest = addend - splitToTen;
  const tenResult = 10;
  const finalResult = base + addend;

  return {
    id: `calc-mt-${id}`,
    type: MathQuestionType.MAKE_TEN_METHOD,
    question: `用凑十法计算：${base} + ${addend} = ?`,
    answer: String(finalResult),
    options: generateNumberOptions(finalResult, Math.max(10, finalResult - 3), Math.min(20, finalResult + 3), 4),
    hint: `把 ${addend} 拆成 ${splitToTen} 和 ${splitRest}，先和 ${base} 凑成 10。`,
    explanation: `${base} + ${addend} = ${base} + ${splitToTen} + ${splitRest} = 10 + ${splitRest} = ${finalResult}。`,
    difficulty: 'medium',
    operand1: base,
    operand2: addend,
    targetNumber: 10,
    visualData: {
      makeTenTemplate: {
        base,
        addend,
        splitToTen,
        splitRest,
        tenResult,
        finalResult,
      },
      steps: [
        { label: `${addend} 分成 ${splitToTen} 和 ${splitRest}`, value: addend },
        { label: `${base} + ${splitToTen} = 10`, value: tenResult },
        { label: `10 + ${splitRest} = ${finalResult}`, value: finalResult },
      ],
    },
  };
}

// 2. 破十法：20以内退位减法
function generateBreakTenMethodQuestion(id: string): CalculationQuestion {
  const onesPart = Math.floor(Math.random() * 8) + 1; // 1-8
  const minuend = 10 + onesPart; // 11-18
  const subtrahend = Math.floor(Math.random() * (9 - (onesPart + 1) + 1)) + (onesPart + 1); // ones+1..9

  const bridge = 10 - subtrahend;
  const finalResult = bridge + onesPart;

  return {
    id: `calc-break10-${id}`,
    type: MathQuestionType.ADDITION_WITHIN_20_CARRY,
    question: `用破十法计算：${minuend} - ${subtrahend} = ?`,
    answer: String(finalResult),
    options: generateNumberOptions(finalResult, Math.max(0, finalResult - 3), Math.min(20, finalResult + 3), 4),
    hint: `先看个位 ${onesPart} 不够减，先破十：10 - ${subtrahend} = ${bridge}，再加 ${onesPart}。`,
    explanation: `${minuend} = 10 + ${onesPart}，先算 10 - ${subtrahend} = ${bridge}，再算 ${bridge} + ${onesPart} = ${finalResult}。`,
    difficulty: 'medium',
    operand1: minuend,
    operand2: subtrahend,
    visualData: {
      breakTenTemplate: {
        minuend,
        subtrahend,
        tenPart: 10,
        onesPart,
        bridge,
        finalResult,
      },
      steps: [
        { label: `${minuend} 分成 10 和 ${onesPart}`, value: minuend },
        { label: `10 - ${subtrahend} = ${bridge}`, value: bridge },
        { label: `${bridge} + ${onesPart} = ${finalResult}`, value: finalResult },
      ],
    },
  };
}

function generateNumberOptions(correct: number, min: number, max: number, desiredCount: number): string[] {
  const normalizedMin = Math.max(0, min);
  const normalizedMax = Math.max(normalizedMin + desiredCount - 1, max);
  const options = new Set<number>([correct]);

  for (const delta of [-2, -1, 1, 2, -3, 3]) {
    const candidate = correct + delta;
    if (candidate >= normalizedMin && candidate <= normalizedMax) {
      options.add(candidate);
    }
    if (options.size >= desiredCount) break;
  }

  if (options.size < desiredCount) {
    for (let i = normalizedMin; i <= normalizedMax && options.size < desiredCount; i++) {
      options.add(i);
    }
  }

  return shuffleArray(Array.from(options).slice(0, desiredCount).map(String));
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
