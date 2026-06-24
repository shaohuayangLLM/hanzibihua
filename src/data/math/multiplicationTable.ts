// 九九乘法表核心逻辑（纯函数）
// 口诀规则已通过断言验证：积<10 用「得」、积=10 读「一十」、小因数排前。

const CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

export const cnNum = (n: number): string => CN[n];

// 通用中文读数 1..81：10→十、20→二十、21→二十一
export const cnProduct = (p: number): string => {
  if (p < 10) return cnNum(p);
  const t = Math.floor(p / 10);
  const o = p % 10;
  return (t === 1 ? '' : cnNum(t)) + '十' + (o ? cnNum(o) : '');
};

// 算式：按传入顺序，formula(3,7) -> "3×7=21"
export const formula = (a: number, b: number): string => `${a}×${b}=${a * b}`;

// 口诀：内部把小因数排前；积<10 用「得」；积=10 读「一十」（口诀特例，如二五一十）
export const kouJue = (a: number, b: number): string => {
  const x = Math.min(a, b);
  const y = Math.max(a, b);
  const p = x * y;
  const tail = p === 10 ? '一十' : cnProduct(p);
  return cnNum(x) + cnNum(y) + (p < 10 ? '得' : '') + tail;
};

// 乘法即连加：a 个 b 相加（a≤6 展开算式，否则文字描述）
export const additionText = (a: number, b: number): string =>
  a <= 6 ? `${Array(a).fill(b).join(' + ')} = ${a * b}` : `${a} 个 ${b} 相加 = ${a * b}`;

export interface QuizLevel {
  name: string;
  factors: number[];
  optionCount: number;
}

// 闯关由易到难：先 2/5 三选一，逐关加入更多组、加大干扰
export const LEVELS: QuizLevel[] = [
  { name: '第 1 关', factors: [2, 5], optionCount: 3 },
  { name: '第 2 关', factors: [2, 3, 5], optionCount: 3 },
  { name: '第 3 关', factors: [2, 3, 4, 5], optionCount: 4 },
  { name: '第 4 关', factors: [2, 3, 4, 5, 6], optionCount: 4 },
  { name: '第 5 关', factors: [2, 3, 4, 5, 6, 7, 8, 9], optionCount: 4 },
];

export interface Question {
  a: number;
  b: number;
  answer: number;
  options: number[];
}

export const makeQuestion = (level: QuizLevel): Question => {
  const a = level.factors[Math.floor(Math.random() * level.factors.length)];
  const b = 1 + Math.floor(Math.random() * 9);
  const answer = a * b;
  const opts = new Set<number>([answer]);
  let guard = 0;
  while (opts.size < level.optionCount && guard++ < 200) {
    const d = answer + (Math.floor(Math.random() * 9) - 4); // 正确答案附近
    if (d < 1 || d > 81 || d === answer) continue;
    opts.add(d);
  }
  let f = 1; // 极端情况兜底补满
  while (opts.size < level.optionCount) {
    if (f !== answer) opts.add(f);
    f++;
  }
  const options = [...opts];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { a, b, answer, options };
};

export const QUESTIONS_PER_LEVEL = 10;
