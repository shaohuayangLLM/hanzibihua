import type {
  ChoicePractice,
  FillPractice,
  Practice,
} from './types';

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const pickN = <T,>(arr: T[], n: number): T[] => {
  const copy = [...arr];
  const result: T[] = [];
  while (result.length < n && copy.length) {
    result.push(copy.splice(rand(0, copy.length - 1), 1)[0]);
  }
  return result;
};

// 生成数字选项（含正确答案 + 干扰项）
export const numberOptions = (correct: number, range = 3, count = 4): string[] => {
  const set = new Set<number>([correct]);
  while (set.size < count) {
    const candidate = correct + rand(-range, range);
    if (candidate >= 0 && candidate !== correct) set.add(candidate);
  }
  return [...set].sort(() => Math.random() - 0.5).map(String);
};

// ========== 进位加法（凑十法）==========

// 9 加几
export const make9PlusN = (i: number): FillPractice => {
  const addend = rand(2, 9);
  const result = 9 + addend;
  const splitToTen = 1;
  const splitRest = addend - splitToTen;
  return {
    id: `9plus-${i}`,
    kind: 'fill',
    prompt: `9 + ${addend} = ?`,
    answer: result,
    hint: `把 ${addend} 拆成 1 和 ${splitRest}，先凑 10。`,
    explanation: `9 + 1 = 10，再 10 + ${splitRest} = ${result}`,
    steps: [
      { label: `把 ${addend} 分成 1 和 ${splitRest}` },
      { label: '9 + 1', value: 10 },
      { label: `10 + ${splitRest}`, value: result, blank: true },
    ],
  };
};

// 8 / 7 加几
export const make87PlusN = (i: number): FillPractice => {
  const base = rand(7, 8);
  const addend = rand(11 - base, 9);
  const splitToTen = 10 - base;
  const splitRest = addend - splitToTen;
  const result = base + addend;
  return {
    id: `87plus-${i}`,
    kind: 'fill',
    prompt: `${base} + ${addend} = ?`,
    answer: result,
    hint: `把 ${addend} 拆成 ${splitToTen} 和 ${splitRest}，先和 ${base} 凑成 10。`,
    explanation: `${base} + ${splitToTen} = 10，再 10 + ${splitRest} = ${result}`,
    steps: [
      { label: `把 ${addend} 分成 ${splitToTen} 和 ${splitRest}` },
      { label: `${base} + ${splitToTen}`, value: 10 },
      { label: `10 + ${splitRest}`, value: result, blank: true },
    ],
  };
};

// 6 / 5 / 4 / 3 / 2 加几（拆小数凑大数）
export const makeSmallPlusBig = (i: number): FillPractice => {
  const small = rand(2, 6);
  const big = rand(11 - small, 9);
  // 用交换律思路：拆小数（small）凑成 10
  const splitToTen = 10 - big;
  const splitRest = small - splitToTen;
  const result = small + big;
  return {
    id: `small-plus-big-${i}`,
    kind: 'fill',
    prompt: `${small} + ${big} = ?`,
    answer: result,
    hint: `把小数 ${small} 拆成 ${splitToTen} 和 ${splitRest}，凑大数 ${big} 成 10。`,
    explanation: `${big} + ${splitToTen} = 10，再 10 + ${splitRest} = ${result}`,
    steps: [
      { label: `把 ${small} 分成 ${splitToTen} 和 ${splitRest}` },
      { label: `${big} + ${splitToTen}`, value: 10 },
      { label: `10 + ${splitRest}`, value: result, blank: true },
    ],
  };
};

// ========== 退位减法 ==========

// 平十法：减数拆成两部分（与个位相同 + 其余）
export const makeLevelTen = (i: number): FillPractice => {
  const onesPart = rand(2, 8);            // 被减数个位
  const minuend = 10 + onesPart;          // 11-18
  const subtrahend = rand(onesPart + 1, 9); // 减数大于个位（需退位）
  const samePart = onesPart;              // 拆出来与个位相同
  const rest = subtrahend - samePart;     // 剩余部分
  const result = 10 - rest;
  return {
    id: `level-ten-${i}`,
    kind: 'fill',
    prompt: `用平十法：${minuend} - ${subtrahend} = ?`,
    answer: result,
    hint: `把减数 ${subtrahend} 拆成 ${samePart} 和 ${rest}，先减到 10，再减 ${rest}。`,
    explanation: `${minuend} - ${samePart} = 10，再 10 - ${rest} = ${result}`,
    steps: [
      { label: `把 ${subtrahend} 分成 ${samePart} 和 ${rest}` },
      { label: `${minuend} - ${samePart}`, value: 10 },
      { label: `10 - ${rest}`, value: result, blank: true },
    ],
  };
};

// 破十法：被减数拆成 10 + 一位数
export const makeBreakTen = (i: number): FillPractice => {
  const onesPart = rand(1, 8);
  const minuend = 10 + onesPart;
  const subtrahend = rand(onesPart + 1, 9);
  const bridge = 10 - subtrahend;
  const result = bridge + onesPart;
  return {
    id: `break-ten-${i}`,
    kind: 'fill',
    prompt: `用破十法：${minuend} - ${subtrahend} = ?`,
    answer: result,
    hint: `把 ${minuend} 拆成 10 和 ${onesPart}，先 10 - ${subtrahend} = ${bridge}，再加 ${onesPart}。`,
    explanation: `10 - ${subtrahend} = ${bridge}，再 ${bridge} + ${onesPart} = ${result}`,
    steps: [
      { label: `把 ${minuend} 拆成 10 和 ${onesPart}` },
      { label: `10 - ${subtrahend}`, value: bridge },
      { label: `${bridge} + ${onesPart}`, value: result, blank: true },
    ],
  };
};

// 想加算减
export const makeAddThinkSub = (i: number): FillPractice => {
  const subtrahend = rand(4, 9);
  const result = rand(2, 9);
  const minuend = subtrahend + result;
  if (minuend < 11 || minuend > 18) return makeAddThinkSub(i);
  return {
    id: `add-think-sub-${i}`,
    kind: 'fill',
    prompt: `${minuend} - ${subtrahend} = ?  (想：${subtrahend} + ? = ${minuend})`,
    answer: result,
    hint: `想：${subtrahend} 加几等于 ${minuend}？`,
    explanation: `因为 ${subtrahend} + ${result} = ${minuend}，所以 ${minuend} - ${subtrahend} = ${result}`,
  };
};

// 减法巧算：十几 - 9/8/7... = 几 + 1/2/3...
export const makeQuickSub = (i: number): ChoicePractice => {
  const ones = rand(2, 9);
  const minuend = 10 + ones;
  const subtrahend = rand(2, 9);
  if (subtrahend <= ones) return makeQuickSub(i);
  const correct = minuend - subtrahend;
  const trick = ones + (10 - subtrahend);
  return {
    id: `quick-sub-${i}`,
    kind: 'choice',
    prompt: `${minuend} - ${subtrahend} = ?`,
    options: numberOptions(correct, 3, 4),
    answer: String(correct),
    hint: `巧算：${ones} + ${10 - subtrahend} = ${trick}`,
    explanation: `十几 - ${subtrahend} = 几 + ${10 - subtrahend}`,
  };
};

// ========== 实际问题（关键字判断）==========

const ADD_TEMPLATES = [
  (a: number, b: number) => ({ q: `小红有 ${a} 个气球，又得到 ${b} 个，一共有几个？`, op: '+' }),
  (a: number, b: number) => ({ q: `树上原有 ${a} 只小鸟，又飞来 ${b} 只，一共有几只？`, op: '+' }),
  (a: number, b: number) => ({ q: `班里有 ${a} 个男生和 ${b} 个女生，总共有几人？`, op: '+' }),
];

const SUB_TEMPLATES = [
  (a: number, b: number) => ({ q: `妈妈买了 ${a} 个苹果，吃了 ${b} 个，还剩几个？`, op: '-' }),
  (a: number, b: number) => ({ q: `池塘里有 ${a} 只鸭子，游走了 ${b} 只，还有几只？`, op: '-' }),
  (a: number, b: number) => ({ q: `小明有 ${a} 元钱，付了 ${b} 元，应找回几元？`, op: '-' }),
];

export const makeWordProblem = (i: number): ChoicePractice => {
  const isAdd = Math.random() < 0.5;
  const tpls = isAdd ? ADD_TEMPLATES : SUB_TEMPLATES;
  const tpl = tpls[rand(0, tpls.length - 1)];
  const a = isAdd ? rand(5, 9) : rand(11, 18);
  const b = isAdd ? rand(2, 9) : rand(2, Math.min(9, a - 1));
  const { q } = tpl(a, b);
  const correct = isAdd ? a + b : a - b;
  return {
    id: `word-${i}`,
    kind: 'choice',
    prompt: q,
    options: numberOptions(correct, 3, 4),
    answer: String(correct),
    hint: isAdd ? '看到「一共」「总共」用加法。' : '看到「还剩」「还有」「应找回」用减法。',
    explanation: isAdd ? `已知部分 + 部分 = 总数：${a} + ${b} = ${correct}` : `总数 - 一部分 = 另一部分：${a} - ${b} = ${correct}`,
  };
};

// 倒着数法
export const makeCountBack = (i: number): FillPractice => {
  const minuend = rand(11, 16);
  const subtrahend = rand(2, 6);
  const result = minuend - subtrahend;
  return {
    id: `count-back-${i}`,
    kind: 'fill',
    prompt: `从 ${minuend} 往前倒着数 ${subtrahend} 个，到几？`,
    answer: result,
    hint: `${minuend} → ${minuend - 1} → ${minuend - 2} ...一共数 ${subtrahend} 步。`,
    explanation: `${minuend} - ${subtrahend} = ${result}`,
  };
};

// 工具：批量生成
export const generate = (factory: (i: number) => Practice, count: number): Practice[] =>
  Array.from({ length: count }, (_, i) => factory(i + 1));
