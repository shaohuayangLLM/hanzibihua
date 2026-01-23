import { BaseQuestion, MathQuestionType } from '../types';

// 生成期末测评题目
export function generateFinalExamQuestions(count: number = 10): BaseQuestion[] {
  const questions: BaseQuestion[] = [];
  const generators = [
    generatePatternQuestion,        // 规律题
    generateAdjacentNumberQuestion,  // 相邻数题
    generateFillUnknownQuestion,     // 填未知数题
    generateSymbolFillQuestion,      // 符号填空题
    generateInequalityQuestion,      // 不等式填空题
    generateOverlapQuestion,         // 重叠问题（排队）
    generateCountObjectsQuestion,    // 数物对应
    generateSequenceCalcQuestion,    // 连加连减
    generateClockQuestion,           // 认识钟表
    generatePositionQuestion,        // 位置方向
    generateWordProblemQuestion,     // 应用题
    generateMultiStepQuestion,       // 多步应用题
    generateCompareQuestion,         // 比较应用题
    generateReasoningQuestion,       // 推理问题
  ];

  for (let i = 0; i < count; i++) {
    const generator = generators[i % generators.length];
    questions.push(generator(`${i + 1}`));
  }

  return shuffleArray(questions);
}

// 1. 规律题
function generatePatternQuestion(id: string): BaseQuestion {
  const patternType = Math.floor(Math.random() * 3); // 0: 图形, 1: 数列, 2: 算式

  if (patternType === 0) {
    // 图形规律
    const shapes = ['△', '□'];
    const next1 = shapes[1];
    const next2 = shapes[0];
    const next3 = shapes[1];

    return {
      id: `pattern-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `找规律填空：
△□△□△(  )(  )(  )`,
      answer: `${next1}${next2}${next3}`,
      options: generateStringOptions(`${next1}${next2}${next3}`, [`${next1}${next1}${next2}`]),
      hint: '观察图形变化规律，△□△□△...接下来应该是□△□',
      explanation: '规律是△和□交替出现，接下来是□△□',
      difficulty: 'medium' as const,
    };
  } else if (patternType === 1) {
    // 数列规律（递减）
    const start = Math.floor(Math.random() * 3) + 7; // 7-9
    const sequence = [start, start - 2, start - 4];
    const next1 = start - 6;
    const next2 = start - 8;

    return {
      id: `pattern-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `找规律填空：
${sequence[0]}，(  )，${sequence[2]}，(  )`,
      answer: `${sequence[1]}，${next1}`,
      options: generateStringOptions(`${sequence[1]}，${next1}`, [`${start - 1}，${next2}`]),
      hint: '每次减少2，按照这个规律继续',
      explanation: `规律是每次减2：${start}→${sequence[1]}→${sequence[2]}→${next1}→${next2}`,
      difficulty: 'medium' as const,
    };
  } else {
    // 算式规律（递减）
    const firstNum = Math.floor(Math.random() * 3) + 8; // 8-10
    const subtract = Math.floor(Math.random() * 2) + 6; // 6-7
    const patterns = [
      `${firstNum}-${subtract}`,
      `${firstNum - 1}-${subtract - 1}`,
      `${firstNum - 2}-${subtract - 2}`,
    ];
    const next1 = `${firstNum - 3}-${subtract - 3}`;
    const next2 = `${firstNum - 4}-${subtract - 4}`;

    return {
      id: `pattern-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `找规律填空：
${patterns.join('，')}，(  )，(  )`,
      answer: `${next1}，${next2}`,
      options: generateStringOptions(`${next1}，${next2}`, [
        `${firstNum - 5}-${subtract - 4}，${firstNum - 6}-${subtract - 5}`,
      ]),
      hint: '被减数减1，减数也减1，差不变',
      explanation: `规律：被减数依次减1，减数也依次减1，结果差不变。接下来是${next1}和${next2}`,
      difficulty: 'hard' as const,
    };
  }
}

// 2. 相邻数题
function generateAdjacentNumberQuestion(id: string): BaseQuestion {
  const questionType = Math.floor(Math.random() * 3);

  if (questionType === 0) {
    // 求前一个和后一个数
    const target = Math.floor(Math.random() * 8) + 1; // 1-8
    const prev = target - 1;
    const next = target + 1;

    return {
      id: `adjacent-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `${target}前面的第一个数是(  )，${target}后面的第一个数是(  )。`,
      answer: `${prev}，${next}`,
      options: generateStringOptions(`${prev}，${next}`, [
        `${prev}，${target}`,
      ]),
      hint: '按照数数顺序，前面的数比它小1，后面的数比它大1',
      explanation: `${target}前面的数是${prev}，后面的数是${next}`,
      difficulty: 'easy' as const,
    };
  } else if (questionType === 1) {
    // 给出相邻的两个数，求中间的数
    const middle = Math.floor(Math.random() * 8) + 1; // 1-8
    const prev = middle - 1;
    const next = middle + 1;

    return {
      id: `adjacent-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `和${middle}相邻的两个数分别是(  )和(  )。`,
      answer: `${prev}，${next}`,
      options: generateStringOptions(`${prev}，${next}`, [
        `${middle}，${next}`,
      ]),
      hint: '相邻的两个数分别是比它小1和大1的数',
      explanation: `${middle}相邻的两个数是${prev}和${next}`,
      difficulty: 'easy' as const,
    };
  } else {
    // 在0-10范围内，比某数大/小的数有多少个
    const target = Math.floor(Math.random() * 5) + 3; // 3-7
    const greaterCount = 10 - target;
    const smallerCount = target;

    const askGreater = Math.random() > 0.5;

    if (askGreater) {
      return {
        id: `adjacent-${id}`,
        type: MathQuestionType.QUEUE_LEAVE_EFFECT,
        question: `在0～10中，比${target}大的数有(  )个。`,
        answer: String(greaterCount),
        options: generateNumberOptionsWithExclude(greaterCount, 1, 9, [greaterCount]),
        hint: `比${target}大的数有：${target + 1}，${target + 2}...10，共${greaterCount}个`,
        explanation: `比${target}大的数是${target + 1}到10，共${greaterCount}个`,
        difficulty: 'medium' as const,
      };
    } else {
      return {
        id: `adjacent-${id}`,
        type: MathQuestionType.QUEUE_LEAVE_EFFECT,
        question: `在0～10中，比${target}小的数有(  )个。`,
        answer: String(smallerCount),
        options: generateNumberOptionsWithExclude(smallerCount, 1, 10, [smallerCount]),
        hint: `比${target}小的数有：0，1，2...${target - 1}，共${smallerCount}个`,
        explanation: `比${target}小的数是0到${target - 1}，共${smallerCount}个`,
        difficulty: 'medium' as const,
      };
    }
  }
}

// 3. 填未知数题
function generateFillUnknownQuestion(id: string): BaseQuestion {
  const questionType = Math.floor(Math.random() * 2);

  if (questionType === 0) {
    // 加法填未知数
    const result = Math.floor(Math.random() * 7) + 3; // 3-9
    const known = Math.floor(Math.random() * (result - 1)) + 1; // 1 to result-1
    const unknown = result - known;

    return {
      id: `fill-${id}`,
      type: MathQuestionType.NUMBER_COMPOSITION,
      question: `${known}＋(  )＝${result}`,
      answer: String(unknown),
      options: generateNumberOptionsWithExclude(unknown, 1, result - 1, [unknown]),
      hint: `想：${unknown}和${known}组成${result}`,
      explanation: `${known}＋${unknown}＝${result}`,
      difficulty: 'easy' as const,
    };
  } else {
    // 减法填未知数
    const result = Math.floor(Math.random() * 8) + 2; // 2-9
    const subtrahend = Math.floor(Math.random() * (result - 1)) + 1; // 1 to result-1
    const unknown = result + subtrahend;

    return {
      id: `fill-${id}`,
      type: MathQuestionType.NUMBER_COMPOSITION,
      question: `(  )－${subtrahend}＝${result}`,
      answer: String(unknown),
      options: generateNumberOptionsWithExclude(unknown, result + 1, 15, [unknown]),
      hint: `想：几减${subtrahend}等于${result}？${unknown}减${subtrahend}等于${result}`,
      explanation: `${unknown}－${subtrahend}＝${result}`,
      difficulty: 'medium' as const,
    };
  }
}

// 4. 符号填空题
function generateSymbolFillQuestion(id: string): BaseQuestion {
  const questions = [
    { a: 6, b: 4, op: '-', result: 2 },
    { a: 0, b: 10, op: '+', result: 10 },
    { a: 7, b: 2, op: '+', result: 9 },
    { a: 9, b: 3, op: '-', result: 6 },
  ];

  const selected = questions[Math.floor(Math.random() * questions.length)];

  return {
    id: `symbol-${id}`,
    type: MathQuestionType.OPERATION_DISTINGUISH,
    question: `在○里填上"＋"或"－"：
${selected.a}○${selected.b}＝${selected.result}`,
    answer: selected.op,
    options: shuffleArray(['+', '-']),
    hint: `想：${selected.a}${selected.op === '+' ? '加' : '减'}${selected.b}等于${selected.result}`,
    explanation: `${selected.a} ${selected.op} ${selected.b} = ${selected.result}`,
    difficulty: 'easy' as const,
  };
}

// 5. 不等式填空题
function generateInequalityQuestion(id: string): BaseQuestion {
  const questionType = Math.floor(Math.random() * 4);

  if (questionType === 0) {
    // 8＞□
    const correct = Math.floor(Math.random() * 3) + 5; // 5-7

    return {
      id: `inequality-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `在□里填上合适的数：
8＞□`,
      answer: String(correct),
      options: generateNumberOptionsWithExclude(correct, 0, 7, [correct]),
      hint: `填比8小的数，答案是${correct}`,
      explanation: `${correct}＜8，所以填${correct}是对的`,
      difficulty: 'easy' as const,
    };
  } else if (questionType === 1) {
    // 5＋2＞□
    const result = 7;
    const correct = Math.floor(Math.random() * 5); // 0-4

    return {
      id: `inequality-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `在□里填上合适的数：
5＋2＞□`,
      answer: String(correct),
      options: generateNumberOptionsWithExclude(correct, 0, 6, [correct]),
      hint: `5＋2＝7，填比7小的数，答案是${correct}`,
      explanation: `5＋2＝7，${correct}＜7，所以填${correct}`,
      difficulty: 'medium' as const,
    };
  } else if (questionType === 2) {
    // □＞8
    const correct = Math.floor(Math.random() * 2) + 9; // 9-10
    const wrong = Math.floor(Math.random() * 7); // 0-6

    return {
      id: `inequality-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `在□里填上合适的数：
□＞8`,
      answer: String(correct),
      options: shuffleArray([String(correct), String(wrong)]),
      hint: `填比8大的数，答案是${correct}`,
      explanation: `${correct}＞8`,
      difficulty: 'easy' as const,
    };
  } else {
    // 等式填空：7＝□＋4
    const left = 7;
    const rightKnown = 4;
    const correct = left - rightKnown;
    const wrong = correct + Math.floor(Math.random() * 3) + 1;

    return {
      id: `inequality-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `在□里填上合适的数：
7＝□＋4`,
      answer: String(correct),
      options: shuffleArray([String(correct), String(wrong)]),
      hint: `想：几加4等于7？3＋4＝7`,
      explanation: `3＋4＝7，所以填3`,
      difficulty: 'medium' as const,
    };
  }
}

// 6. 重叠问题（排队）
function generateOverlapQuestion(id: string): BaseQuestion {
  const position = Math.floor(Math.random() * 3) + 2; // 2-4
  const total = position * 2 - 1;

  return {
    id: `overlap-${id}`,
    type: MathQuestionType.QUEUE_POSITION_FROM_SIDE,
    question: `小明排队给奶奶拜年，从前往后数他是第${position}个，从后往前数也是第${position}个，排队的一共有多少人？`,
    answer: String(total),
    options: generateNumberOptionsWithExclude(total, total - 2, total + 3, [total]),
    hint: `从前往后第${position}个，从后往前第${position}个，说明他数了两次，所以要减1`,
    explanation: `${position}＋${position}－1＝${total}（人）`,
    difficulty: 'hard' as const,
  };
}

// 7. 数物对应题（看图写数）
function generateCountObjectsQuestion(id: string): BaseQuestion {
  const objects = ['🍎', '🍊', '🍌', '🐱', '🐶', '⭐', '🌸'];
  const obj = objects[Math.floor(Math.random() * objects.length)];
  const count = Math.floor(Math.random() * 8) + 3; // 3-10

  const display = obj.repeat(count);

  return {
    id: `count-${id}`,
    type: MathQuestionType.PLACE_VALUE_TENS_UNITS,
    question: `数一数，下面有(  )个${obj}：
${display}`,
    answer: String(count),
    options: generateNumberOptionsWithExclude(count, 1, 10, [count]),
    hint: `一个一个数，共有${count}个`,
    explanation: `数一数，共有${count}个${obj}`,
    difficulty: 'easy' as const,
  };
}

// 8. 连加连减题
function generateSequenceCalcQuestion(id: string): BaseQuestion {
  const isAddition = Math.random() > 0.5;

  if (isAddition) {
    // 连加：如 2+2+2
    const num = Math.floor(Math.random() * 3) + 2; // 2-4
    const times = 3;
    const result = num * times;

    return {
      id: `sequence-${id}`,
      type: MathQuestionType.NUMBER_COMPOSITION,
      question: `${num}＋${num}＋${num}＝(  )`,
      answer: String(result),
      options: generateNumberOptionsWithExclude(result, result - 2, result + 3, [result]),
      hint: `${num}＋${num}＝${num * 2}，再加${num}等于${result}`,
      explanation: `${num}＋${num}＋${num}＝${result}`,
      difficulty: 'medium' as const,
    };
  } else {
    // 连减：如 9-2-2
    const start = Math.floor(Math.random() * 3) + 7; // 7-9
    const subtract = Math.floor(Math.random() * 2) + 2; // 2-3
    const result = start - subtract * 2;

    return {
      id: `sequence-${id}`,
      type: MathQuestionType.NUMBER_COMPOSITION,
      question: `${start}－${subtract}－${subtract}＝(  )`,
      answer: String(result),
      options: generateNumberOptionsWithExclude(result, 0, result + 3, [result]),
      hint: `${start}－${subtract}＝${start - subtract}，再减${subtract}等于${result}`,
      explanation: `${start}－${subtract}－${subtract}＝${result}`,
      difficulty: 'medium' as const,
    };
  }
}

// 9. 认识钟表题
function generateClockQuestion(id: string): BaseQuestion {
  const hour = Math.floor(Math.random() * 12) + 1; // 1-12

  return {
    id: `clock-${id}`,
    type: MathQuestionType.QUEUE_LEAVE_EFFECT,
    question: `当时针指向${hour}，分针指向12时，时间是(  )。`,
    answer: `${hour}时`,
    options: generateStringOptions(`${hour}时`, [`${hour === 12 ? 1 : hour + 1}时`]),
    hint: `分针指向12，时针指向几就是几时`,
    explanation: `分针指向12，时针指向${hour}，时间是${hour}时`,
    difficulty: 'easy' as const,
  };
}

// 10. 位置方向题
function generatePositionQuestion(id: string): BaseQuestion {
  const questionType = Math.floor(Math.random() * 2);

  if (questionType === 0) {
    // 前后位置
    const total = Math.floor(Math.random() * 5) + 5; // 5-9
    const position = Math.floor(Math.random() * (total - 2)) + 2; // 2到total-1

    return {
      id: `position-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `一排小朋友有${total}人，小明从前面数排第${position}，小明前面有(  )人。`,
      answer: String(position - 1),
      options: generateNumberOptionsWithExclude(position - 1, 1, position, [position - 1]),
      hint: `从前面数第${position}，说明前面有${position - 1}人`,
      explanation: `从前面数第${position}，前面有${position - 1}人`,
      difficulty: 'medium' as const,
    };
  } else {
    // 左右位置
    const left = Math.floor(Math.random() * 4) + 3; // 3-6
    const right = Math.floor(Math.random() * 4) + 3; // 3-6
    const total = left + right + 1; // 加上中间的自己

    return {
      id: `position-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `一排小朋友，小红的左边有${left}人，右边有${right}人，这排一共有(  )人。`,
      answer: String(total),
      options: generateNumberOptionsWithExclude(total, total - 2, total + 3, [total]),
      hint: `左边${left}人＋右边${right}人＋自己1人＝${total}人`,
      explanation: `${left}＋${right}＋1＝${total}（人）`,
      difficulty: 'hard' as const,
    };
  }
}

// 11. 基础应用题
function generateWordProblemQuestion(id: string): BaseQuestion {
  const problemType = Math.floor(Math.random() * 3);

  if (problemType === 0) {
    // 加法应用：原来有一些，又来了/买来/收到
    const original = Math.floor(Math.random() * 6) + 3; // 3-8
    const add = Math.floor(Math.random() * 4) + 2; // 2-5
    const total = original + add;
    const scenarios = [
      { verb: '又飞来', subject: '小鸟' },
      { verb: '又买来', subject: '铅笔' },
      { verb: '又收到', subject: '礼物' },
      { verb: '又摘了', subject: '苹果' },
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
      id: `word-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `小明有${original}个${scenario.subject}，${scenario.verb}${add}个，现在一共有(  )个${scenario.subject}。`,
      answer: String(total),
      options: generateNumberOptionsWithExclude(total, original + 1, original + add + 3, [total]),
      hint: `${original}＋${add}＝${total}`,
      explanation: `原来${original}个，${scenario.verb}${add}个，一共${original}＋${add}＝${total}个`,
      difficulty: 'medium' as const,
    };
  } else if (problemType === 1) {
    // 减法应用：原来有一些，用掉/送人/吃了/飞走
    const original = Math.floor(Math.random() * 6) + 5; // 5-10
    const use = Math.floor(Math.random() * 4) + 1; // 1-4
    const remain = original - use;
    const scenarios = [
      { verb: '用掉', object: '铅笔' },
      { verb: '送给', object: '同学' },
      { verb: '吃了', object: '糖果' },
      { verb: '飞走', object: '小鸟' },
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
      id: `word-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `小红有${original}个${scenario.object}，${scenario.verb}${use}个，还剩下(  )个${scenario.object}。`,
      answer: String(remain),
      options: generateNumberOptionsWithExclude(remain, 0, original - 1, [remain]),
      hint: `${original}－${use}＝${remain}`,
      explanation: `原来${original}个，${scenario.verb}${use}个，还剩${original}－${use}＝${remain}个`,
      difficulty: 'medium' as const,
    };
  } else {
    // 分配问题：把一些东西平均分
    const total = Math.floor(Math.random() * 4) + 1; // 1-4
    const people = Math.floor(Math.random() * 3) + 2; // 2-4人
    const each = total * people;
    const scenarios = [
      { item: '糖果', action: '分给' },
      { item: '铅笔', action: '平均分给' },
      { item: '贴纸', action: '分给' },
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
      id: `word-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `妈妈买了${each}个${scenario.item}，${scenario.action}${people}个小朋友，每个小朋友分(  )个。`,
      answer: String(total),
      options: generateNumberOptionsWithExclude(total, 1, each, [total]),
      hint: `${each}里面有${total}个${people}`,
      explanation: `${each}÷${people}＝${total}（个）`,
      difficulty: 'hard' as const,
    };
  }
}

// 12. 多步应用题
function generateMultiStepQuestion(id: string): BaseQuestion {
  const problemType = Math.floor(Math.random() * 3);

  if (problemType === 0) {
    // 先增加后减少
    const start = Math.floor(Math.random() * 5) + 3; // 3-7
    const add = Math.floor(Math.random() * 3) + 2; // 2-4
    const remove = Math.floor(Math.random() * 3) + 1; // 1-3
    const final = start + add - remove;

    return {
      id: `multistep-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `盘子里有${start}个苹果，妈妈又买了${add}个，爸爸吃了${remove}个，现在还有(  )个苹果。`,
      answer: String(final),
      options: generateNumberOptionsWithExclude(final, start - remove, start + add, [final]),
      hint: `先算：${start}＋${add}＝${start + add}，再算：${start + add}－${remove}＝${final}`,
      explanation: `${start}＋${add}－${remove}＝${final}（个）`,
      difficulty: 'hard' as const,
    };
  } else if (problemType === 1) {
    // 两人之间的比较
    const person1 = Math.floor(Math.random() * 5) + 5; // 5-9
    const diff = Math.floor(Math.random() * 4) + 2; // 2-5
    const person2_more = Math.random() > 0.5;
    const person2 = person2_more ? person1 + diff : person1 - diff;
    const name1 = ['小明', '小红', '小刚', '小丽'][Math.floor(Math.random() * 4)];
    const name2 = ['小华', '小强', '小美', '小军'][Math.floor(Math.random() * 4)];

    return {
      id: `multistep-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `${name1}有${person1}个苹果，${name2}比${name1}${person2_more ? '多' : '少'}${diff}个，${name2}有(  )个苹果。`,
      answer: String(person2),
      options: generateNumberOptionsWithExclude(person2, Math.max(1, person2 - 3), person2 + 3, [person2]),
      hint: `${name2}${person2_more ? '多' : '少'}，所以要${person2_more ? '加' : '减'}：${person1}${person2_more ? '＋' : '－'}${diff}＝${person2}`,
      explanation: `${person1}${person2_more ? '＋' : '－'}${diff}＝${person2}（个）`,
      difficulty: 'hard' as const,
    };
  } else {
    // 三部分求和
    const part1 = Math.floor(Math.random() * 3) + 2; // 2-4
    const part2 = Math.floor(Math.random() * 3) + 2; // 2-4
    const part3 = Math.floor(Math.random() * 3) + 2; // 2-4
    const total = part1 + part2 + part3;

    return {
      id: `multistep-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `三种颜色的气球，红色${part1}个，蓝色${part2}个，黄色${part3}个，一共有(  )个气球。`,
      answer: String(total),
      options: generateNumberOptionsWithExclude(total, total - 3, total + 3, [total]),
      hint: `${part1}＋${part2}＋${part3}＝${total}`,
      explanation: `${part1}＋${part2}＋${part3}＝${total}（个）`,
      difficulty: 'hard' as const,
    };
  }
}

// 13. 比较应用题
function generateCompareQuestion(id: string): BaseQuestion {
  const problemType = Math.floor(Math.random() * 2);

  if (problemType === 0) {
    // 求差值
    const larger = Math.floor(Math.random() * 4) + 6; // 6-9
    const smaller = Math.floor(Math.random() * 4) + 2; // 2-5
    const diff = larger - smaller;
    const scenarios = [
      { name1: '哥哥', name2: '弟弟', item: '糖果' },
      { name1: '一班', name2: '二班', item: '学生' },
      { name1: '红气球', name2: '蓝气球', item: '个' },
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
      id: `compare-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `${scenario.name1}有${larger}个${scenario.item}，${scenario.name2}有${smaller}个${scenario.item}，${scenario.name1}比${scenario.name2}多(  )个。`,
      answer: String(diff),
      options: generateNumberOptionsWithExclude(diff, 1, larger - smaller + 2, [diff]),
      hint: `求差值：${larger}－${smaller}＝${diff}`,
      explanation: `${larger}－${smaller}＝${diff}（个）`,
      difficulty: 'medium' as const,
    };
  } else {
    // 已知差值求另一个数
    const known = Math.floor(Math.random() * 5) + 4; // 4-8
    const diff = Math.floor(Math.random() * 3) + 2; // 2-4
    const known_more = Math.random() > 0.5;
    const unknown = known_more ? known - diff : known + diff;
    const scenarios = [
      { name1: '小红', name2: '小明', item: '朵花' },
      { name1: '左边', name2: '右边', item: '只兔子' },
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
      id: `compare-${id}`,
      type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
      question: `${scenario.name1}有${known}${scenario.item}，比${scenario.name2}${known_more ? '多' : '少'}${diff}${scenario.item === '朵花' ? '朵' : '只'}，${scenario.name2}有(  )${scenario.item === '朵花' ? '朵' : '只'}。`,
      answer: String(unknown),
      options: generateNumberOptionsWithExclude(unknown, unknown - 2, unknown + 3, [unknown]),
      hint: `${scenario.name2}${known_more ? '少' : '多'}，所以：${known}${known_more ? '－' : '＋'}${diff}＝${unknown}`,
      explanation: `${known}${known_more ? '－' : '＋'}${diff}＝${unknown}`,
      difficulty: 'hard' as const,
    };
  }
}

// 14. 推理问题
function generateReasoningQuestion(id: string): BaseQuestion {
  const problemType = Math.floor(Math.random() * 2);

  if (problemType === 0) {
    // 排队问题（已知从左数和从右数的位置）
    const fromLeft = Math.floor(Math.random() * 5) + 3; // 3-7
    const fromRight = Math.floor(Math.random() * 5) + 3; // 3-7
    const total = fromLeft + fromRight - 1;

    return {
      id: `reasoning-${id}`,
      type: MathQuestionType.QUEUE_POSITION_FROM_SIDE,
      question: `同学们排队做操，小红军旗从左数排第${fromLeft}，从右数排第${fromRight}，这排一共有(  )人。`,
      answer: String(total),
      options: generateNumberOptionsWithExclude(total, total - 3, total + 3, [total]),
      hint: `从左数第${fromLeft}，从右数第${fromRight}，重复数了一次，所以要减1`,
      explanation: `${fromLeft}＋${fromRight}－1＝${total}（人）`,
      difficulty: 'hard' as const,
    };
  } else {
    // 数数推理
    const total = Math.floor(Math.random() * 5) + 8; // 8-12
    const before = Math.floor(Math.random() * (total - 3)) + 2; // 2到total-2
    const after = total - before;

    return {
      id: `reasoning-${id}`,
      type: MathQuestionType.QUEUE_LEAVE_EFFECT,
      question: `排队时，小刚前面有${before}人，后面有${after}人，这排一共有(  )人。`,
      answer: String(total),
      options: generateNumberOptionsWithExclude(total, total - 3, total + 3, [total]),
      hint: `前面${before}人＋小刚自己1人＋后面${after}人＝${total}人`,
      explanation: `${before}＋1＋${after}＝${total}（人）`,
      difficulty: 'hard' as const,
    };
  }
}

// 工具函数：生成数字选项（排除特定值）
function generateNumberOptionsWithExclude(correct: number, min: number, max: number, exclude: number[]): string[] {
  const options = new Set<number>([correct]);

  let attempts = 0;
  const maxAttempts = 100;

  while (options.size < 2 && attempts < maxAttempts) {
    attempts++;
    const opt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!exclude.includes(opt)) {
      options.add(opt);
    }
  }

  while (options.size < 2) {
    for (let i = min; i <= max && options.size < 2; i++) {
      if (!exclude.includes(i)) {
        options.add(i);
      }
    }
  }

  return shuffleArray(Array.from(options).map(String));
}

// 工具函数：生成字符串选项
function generateStringOptions(correct: string, wrongs: string[]): string[] {
  const options = new Set<string>([correct]);
  if (wrongs.length > 0) {
    options.add(wrongs[0]);
  }
  return shuffleArray(Array.from(options));
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
