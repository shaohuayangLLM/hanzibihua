// 第一单元：进位加法和退位减法
import type { Lesson, Unit } from '../types';
import {
  generate,
  make9PlusN,
  make87PlusN,
  makeSmallPlusBig,
  makeLevelTen,
  makeBreakTen,
  makeAddThinkSub,
  makeQuickSub,
  makeCountBack,
  makeWordProblem,
} from '../practiceHelpers';

const lessons: Lesson[] = [
  {
    id: 'u1-l1-add9',
    title: '凑十法 · 9 加几',
    subtitle: '把另一个数拆出 1 来，先凑成 10',
    icon: '🔟',
    cards: [
      {
        title: '什么是凑十法？',
        content: [
          '把一个加数分成两部分，让其中一部分和另一个加数凑成 10。',
          '再用 10 加上剩下的部分，就能很快算出答案。',
        ],
        keywords: ['凑十法'],
        tip: '看到 9，就找伙伴 1。',
      },
      {
        title: '例子：9 + 7 = ?',
        content: [
          '把 7 分成 1 和 6。',
          '9 + 1 = 10，再 10 + 6 = 16。',
        ],
        visual: { kind: 'make-ten', base: 9, addend: 7, splitToTen: 1, splitRest: 6 },
      },
    ],
    practiceFactory: () => generate(make9PlusN, 6),
  },
  {
    id: 'u1-l2-add87',
    title: '凑十法 · 8、7 加几',
    subtitle: '8 找 2，7 找 3',
    icon: '🎯',
    cards: [
      {
        title: '8 加几怎么算？',
        content: ['看到 8，先找伙伴 2 凑成 10。', '例如 8 + 7：把 7 分成 2 和 5，8 + 2 = 10，10 + 5 = 15。'],
        visual: { kind: 'make-ten', base: 8, addend: 7, splitToTen: 2, splitRest: 5 },
        keywords: ['凑十法'],
      },
      {
        title: '7 加几怎么算？',
        content: ['看到 7，先找伙伴 3 凑成 10。', '例如 7 + 8：把 8 分成 3 和 5，7 + 3 = 10，10 + 5 = 15。'],
        visual: { kind: 'make-ten', base: 7, addend: 8, splitToTen: 3, splitRest: 5 },
        tip: '可以拆小数凑大数，也可以拆大数凑小数。',
      },
    ],
    practiceFactory: () => generate(make87PlusN, 6),
  },
  {
    id: 'u1-l3-add-small',
    title: '凑十法 · 6/5/4/3/2 加几',
    subtitle: '拆小数、凑大数，更方便',
    icon: '↔️',
    cards: [
      {
        title: '为什么要拆小数？',
        content: ['当一个数比较小（2-6），另一个数比较大时：', '把小数拆开，凑大数成 10，剩下的部分更少，算起来更快。'],
        keywords: ['拆小数', '凑大数'],
      },
      {
        title: '例子：6 + 9 = ?',
        content: ['把 6 拆成 1 和 5。', '9 + 1 = 10，10 + 5 = 15。'],
        visual: { kind: 'make-ten', base: 9, addend: 6, splitToTen: 1, splitRest: 5 },
        tip: '也可以利用「交换律」：知道 9 + 6 = 15，就知道 6 + 9 = 15。',
      },
    ],
    practiceFactory: () => generate(makeSmallPlusBig, 6),
  },
  {
    id: 'u1-l4-count-back',
    title: '退位减法 · 倒着数法',
    subtitle: '从被减数往前数',
    icon: '⬅️',
    cards: [
      {
        title: '倒着数怎么算？',
        content: [
          '从被减数往前一个一个倒着数。',
          '减数是几，就倒着数几个，停在哪里就是答案。',
        ],
      },
      {
        title: '例子：14 - 9 = ?',
        content: ['从 14 倒着数 9 个：13、12、11、10、9、8、7、6、5。', '停在 5，所以 14 - 9 = 5。'],
        visual: { kind: 'count-on', from: 14, to: 5, highlight: 5 },
      },
    ],
    practiceFactory: () => generate(makeCountBack, 5),
  },
  {
    id: 'u1-l5-level-ten',
    title: '退位减法 · 平十法',
    subtitle: '把减数拆成两步，两次都用减法',
    icon: '🟰',
    cards: [
      {
        title: '什么是平十法？',
        content: [
          '把减数拆成两部分：第一部分等于被减数的个位，第二部分是剩下的。',
          '先把被减数减到 10，再用 10 减剩下的部分。',
        ],
        keywords: ['平十法', '两次都用减法'],
      },
      {
        title: '例子：16 - 9 = ?',
        content: ['16 的个位是 6，所以把 9 拆成 6 和 3。', '16 - 6 = 10，10 - 3 = 7。'],
        visual: { kind: 'level-ten', minuend: 16, subtrahend: 9, samePart: 6, rest: 3 },
        tip: '平十法用两次减法：先减到 10，再从 10 减。',
      },
    ],
    practiceFactory: () => generate(makeLevelTen, 6),
  },
  {
    id: 'u1-l6-break-ten',
    title: '退位减法 · 破十法',
    subtitle: '把被减数拆成 10 和一位数',
    icon: '🔨',
    cards: [
      {
        title: '什么是破十法？',
        content: [
          '把被减数分成 1 个 10 和 1 个一位数。',
          '先用 10 减去减数，再把得到的差和那个一位数相加。',
        ],
        keywords: ['破十法', '先用减法，再用加法'],
      },
      {
        title: '例子：15 - 7 = ?',
        content: ['把 15 拆成 10 和 5。', '10 - 7 = 3，3 + 5 = 8。'],
        visual: { kind: 'break-ten', minuend: 15, subtrahend: 7, tensPart: 10, onesPart: 5, bridge: 3 },
        tip: '破十法：先减后加，最常用。',
      },
    ],
    practiceFactory: () => generate(makeBreakTen, 6),
  },
  {
    id: 'u1-l7-add-think-sub',
    title: '退位减法 · 想加算减',
    subtitle: '想加法口诀，倒推减法',
    icon: '🧠',
    cards: [
      {
        title: '什么是想加算减？',
        content: [
          '看到减法 a − b = ?，想：「b 加几等于 a？」',
          '那个「几」就是答案。',
        ],
      },
      {
        title: '例子：17 - 9 = ?',
        content: ['想：9 加几等于 17？', '因为 9 + 8 = 17，所以 17 - 9 = 8。'],
        visual: { kind: 'add-think-sub', a: 9, b: 8, sum: 17 },
        tip: '加法口诀越熟，减法就算得越快。',
      },
    ],
    practiceFactory: () => generate(makeAddThinkSub, 6),
  },
  {
    id: 'u1-l8-quick-sub',
    title: '退位减法 · 巧算规律',
    subtitle: '十几 - 9 = 几 + 1',
    icon: '⚡',
    cards: [
      {
        title: '神奇的规律',
        content: [
          '十几 − 9 = 几 + 1',
          '十几 − 8 = 几 + 2',
          '十几 − 7 = 几 + 3',
          '十几 − 6 = 几 + 4',
          '减数和补数加起来正好是 10！',
        ],
        keywords: ['减数', '补数', '10'],
        tip: '看到 9，加 1；看到 8，加 2；看到 7，加 3 ...',
      },
      {
        title: '例子：13 - 9 = ?',
        content: ['十几的「几」是 3。', '9 的伙伴是 1。', '3 + 1 = 4，所以 13 - 9 = 4。'],
      },
    ],
    practiceFactory: () => generate(makeQuickSub, 6),
  },
  {
    id: 'u1-l9-word-problem',
    title: '解决实际问题',
    subtitle: '看关键字判断加减法',
    icon: '🔑',
    cards: [
      {
        title: '加法关键字',
        content: [
          '题目里出现这些词，用加法：',
          '一共、总共、共、原有、合起来',
        ],
        keywords: ['一共', '总共', '原有'],
        tip: '已知一部分 + 另一部分 → 求总数 → 用加法',
      },
      {
        title: '减法关键字',
        content: [
          '题目里出现这些词，用减法：',
          '还剩、还有、应找回、剩下',
        ],
        keywords: ['还剩', '还有', '应找回'],
        tip: '已知总数 + 一部分 → 求另一部分 → 用减法',
      },
      {
        title: '解题三步走',
        content: [
          '① 认真读题，找出已知条件和问题。',
          '② 圈出有用的数字和关键字。',
          '③ 判断用加法还是减法，列式计算。',
        ],
      },
    ],
    practiceFactory: () => generate(makeWordProblem, 6),
  },
];

export const unit1: Unit = {
  id: 'unit1-arithmetic',
  index: 1,
  title: '进位加法和退位减法',
  subtitle: '凑十法 · 平十法 · 破十法',
  icon: '➕',
  colorClass: 'bg-rose-500',
  accentClass: 'border-rose-200 bg-rose-50',
  description: '20 以内加减法的 9 种核心方法，从凑十法到巧算规律。',
  lessons,
};
