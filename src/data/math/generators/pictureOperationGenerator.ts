import { PictureOperationQuestion, MathQuestionType } from '../types';

// 物品分类配置
const FLYING_ANIMALS = ['🐦', '🦋', '🐝', '🦅']; // 会飞的动物
const GROUND_ANIMALS = ['🐱', '🐶', '🐰', '🐭']; // 地面动物
const FRUITS = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🥝', '🍑']; // 水果
const STARS = ['🌟', '⭐', '✨']; // 星星

const COLORS = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400'];

// 物品类型
type ItemType = 'flying' | 'ground' | 'fruit' | 'star';

// 生成看图列算式题目
export function generatePictureOperationQuestions(count: number = 10): PictureOperationQuestion[] {
  const questions: PictureOperationQuestion[] = [];
  const generators = [
    generatePictureAdditionQuestion,
    generatePictureSubtractionQuestion,
    generateOperationDistinguishQuestion,
    generateWriteEquationFromPicture,
    generateFindMissingPartProblem,
    generateMultiStepWordProblem,
    generateAppliedIncludeSelfQuestion,
  ];

  for (let i = 0; i < count; i++) {
    const generator = generators[i % generators.length];
    questions.push(generator(`${i + 1}`));
  }

  return shuffleArray(questions);
}

// 1. 看图列加法（又来了）
function generatePictureAdditionQuestion(id: string): PictureOperationQuestion {
  const initialCount = Math.floor(Math.random() * 5) + 2; // 2-6
  const changeAmount = Math.floor(Math.random() * 4) + 1; // 1-4
  const total = initialCount + changeAmount;

  const item = getRandomItem();
  const color1 = getRandomColor();
  const color2 = getRandomColor();

  // 加法对所有物品都用"又来了"
  const itemName = getItemName(item.type, item.emoji);
  const verb = '又来了';

  return {
    id: `po-add-${id}`,
    type: MathQuestionType.PICTURE_ADDITION,
    question: `看图列式计算：左边有 ${initialCount} 个${itemName}，${verb} ${changeAmount} 个${itemName}，现在一共有几个？`,
    answer: `${initialCount} + ${changeAmount} = ${total}`,
    options: generateOperationOptions(initialCount, changeAmount, 'add'),
    hint: '"又来了"表示数量变多了，用加法',
    explanation: `原来有 ${initialCount} 个，${verb} ${changeAmount} 个，列式：${initialCount} + ${changeAmount} = ${total}`,
    difficulty: 'easy',
    initialCount,
    changeAmount,
    operation: 'add',
    visualData: {
      items: [
        ...Array(initialCount).fill(null).map((_, i) => ({ icon: item.emoji, color: color1 })),
        ...Array(changeAmount).fill(null).map((_, i) => ({ icon: item.emoji, color: color2 })),
      ],
    },
  };
}

// 2. 看图列减法（根据物品类型选择合理动词）
function generatePictureSubtractionQuestion(id: string): PictureOperationQuestion {
  const initialCount = Math.floor(Math.random() * 4) + 4; // 4-7
  const leaveAmount = Math.floor(Math.random() * 3) + 1; // 1-3
  const remaining = initialCount - leaveAmount;

  const item = getRandomItem();
  const color1 = getRandomColor();

  // 根据物品类型选择合理的动词
  const verb = getSubtractionVerb(item.type);
  const itemName = getItemName(item.type, item.emoji);
  const unit = getUnit(item.type);

  return {
    id: `po-sub-${id}`,
    type: MathQuestionType.PICTURE_SUBTRACTION,
    question: `看图列式计算：原来有 ${initialCount} ${unit}${itemName}，${verb}${leaveAmount} ${unit}，还剩几${unit}？`,
    answer: `${initialCount} - ${leaveAmount} = ${remaining}`,
    options: generateOperationOptions(initialCount, leaveAmount, 'subtract'),
    hint: `"${verb}"表示数量变少了，用减法`,
    explanation: `原来 ${initialCount} ${unit}，${verb} ${leaveAmount} ${unit}，列式：${initialCount} - ${leaveAmount} = ${remaining}`,
    difficulty: 'easy',
    initialCount,
    changeAmount: leaveAmount,
    operation: 'subtract',
    visualData: {
      items: [
        ...Array(leaveAmount).fill(null).map((_, i) => ({ icon: item.emoji, color: color1, removed: true })),
        ...Array(remaining).fill(null).map((_, i) => ({ icon: item.emoji, color: color1 })),
      ],
    },
  };
}

// 3. 加减法区分（根据物品类型选择合理动词）
function generateOperationDistinguishQuestion(id: string): PictureOperationQuestion {
  const isAddition = Math.random() > 0.5;
  const count1 = Math.floor(Math.random() * 4) + 2;
  const count2 = Math.floor(Math.random() * 3) + 1;

  const item = getRandomItem();
  const itemName = getItemName(item.type, item.emoji);
  const unit = getUnit(item.type);

  let keyword: string;
  if (isAddition) {
    // 加法动词
    keyword = ['又来了', '增加了', '多来了', '又买来'][Math.floor(Math.random() * 4)];
  } else {
    // 减法动词，根据物品类型
    keyword = getSubtractionVerb(item.type);
  }

  return {
    id: `po-dist-${id}`,
    type: MathQuestionType.OPERATION_DISTINGUISH,
    question: `树上有 ${count1} ${unit}${itemName}，${keyword}${count2} ${unit}，应该用什么方法计算？`,
    answer: isAddition ? '加法' : '减法',
    options: ['加法', '减法'],
    hint: isAddition ? '关键词"又来了/增加了"表示数量变多，用加法' : `关键词"${keyword}"表示数量变少，用减法`,
    explanation: `"${keyword}"表示数量${isAddition ? '增加' : '减少'}，所以用${isAddition ? '加法' : '减法'}`,
    difficulty: 'medium',
    initialCount: count1,
    changeAmount: count2,
    operation: isAddition ? 'add' : 'subtract',
    visualData: {
      items: Array(count1 + count2).fill(null).map((_, i) => ({ icon: item.emoji, color: getRandomColor() })),
    },
  };
}

// 4. 看图写算式（写加法和减法）
function generateWriteEquationFromPicture(id: string): PictureOperationQuestion {
  const leftCount = Math.floor(Math.random() * 5) + 3; // 3-7
  const rightCount = Math.floor(Math.random() * 4) + 2; // 2-5
  const total = leftCount + rightCount;

  const item = getRandomItem();

  return {
    id: `po-write-${id}`,
    type: MathQuestionType.PICTURE_ADDITION,
    question: `看图写算式：左边有 ${leftCount} 个${item.emoji}，右边有 ${rightCount} 个${item.emoji}。
请写出加法算式和减法算式。（格式：□+□=□ 和 □-□=□）

答案格式：例如 "5+4=9，9-4=5"`,
    answer: `${leftCount}+${rightCount}=${total}，${total}-${rightCount}=${leftCount}`,
    options: generateEquationOptions(leftCount, rightCount, total, 'both'),
    hint: '加法：把两边的数量加起来；减法：从总数减去一边的数量',
    explanation: `加法算式：${leftCount}+${rightCount}=${total}
减法算式：${total}-${rightCount}=${leftCount}（或${total}-${leftCount}=${rightCount}）`,
    difficulty: 'medium',
    initialCount: leftCount,
    changeAmount: rightCount,
    operation: 'add',
    visualData: {
      left: leftCount,
      right: rightCount,
      total: total,
      items: [
        ...Array(leftCount).fill(null).map((_, i) => ({ icon: item.emoji, color: 'bg-blue-400' })),
        ...Array(rightCount).fill(null).map((_, i) => ({ icon: item.emoji, color: 'bg-green-400' })),
      ],
    },
  };
}

// 5. 已知总数求部分（看图填空）
function generateFindMissingPartProblem(id: string): PictureOperationQuestion {
  const total = Math.floor(Math.random() * 5) + 8; // 8-12
  const leftPart = Math.floor(Math.random() * 3) + 1; // 1-3
  const rightPart = Math.floor(Math.random() * 3) + 2; // 2-4
  const middlePart = total - leftPart - rightPart;

  // 确保中间部分是正数
  if (middlePart <= 0) {
    return generateFindMissingPartProblem(id); // 重新生成
  }

  const item = getRandomItem();
  const itemName = getItemName(item.type, item.emoji);
  const unit = getUnit(item.type);

  return {
    id: `po-missing-${id}`,
    type: MathQuestionType.PICTURE_SUBTRACTION,
    question: `看图填空：一共有 ${total} ${unit}${itemName}，
左边有 ${leftPart} ${unit}，右边有 ${rightPart} ${unit}，中间盒子有？${unit}。

请写出算式。（格式：□○□○□=□）

答案格式：例如 "9-2-3=4"`,
    answer: `${total}-${leftPart}-${rightPart}=${middlePart}`,
    options: generateMissingPartOptions(total, leftPart, rightPart, middlePart),
    hint: '从总数中依次减去已知的部分，就能得到未知的部分',
    explanation: `算式：${total}-${leftPart}-${rightPart}=${middlePart}
（先把左边和右边的${itemName}合起来，从总数中减去，就得到中间的数量）`,
    difficulty: 'hard',
    initialCount: total,
    changeAmount: leftPart + rightPart,
    operation: 'subtract',
    visualData: {
      total: total,
      left: leftPart,
      right: rightPart,
      middle: middlePart,
      items: [
        ...Array(leftPart).fill(null).map((_, i) => ({ icon: item.emoji, color: 'bg-blue-400' })),
        { icon: '📦', color: 'bg-yellow-400', label: `?${unit}` }, // 盒子
        ...Array(rightPart).fill(null).map((_, i) => ({ icon: item.emoji, color: 'bg-green-400' })),
      ],
    },
  };
}

// 生成算式选项
function generateEquationOptions(left: number, right: number, total: number, type: 'both'): string[] {
  const correct = `${left}+${right}=${total}，${total}-${right}=${left}`;
  const options = new Set<string>([correct]);

  // 选项1：加法正确，减法数字错误
  options.add(`${left}+${right}=${total}，${total}-${right}=${left + 1}`);

  return shuffleArray(Array.from(options));
}

// 生成求部分问题的选项
function generateMissingPartOptions(total: number, left: number, right: number, middle: number): string[] {
  const correct = `${total}-${left}-${right}=${middle}`;
  const options = new Set<string>([correct]);

  // 选项1：减法顺序错误
  options.add(`${total}-${right}-${left}=${middle}`);

  return shuffleArray(Array.from(options));
}

// 6. 多步应用题
function generateMultiStepWordProblem(id: string): PictureOperationQuestion {
  // 场景类型：1-饼干分发，2-糖果分享，3-玩具分配
  const scenario = Math.floor(Math.random() * 3);

  let question: string;
  let answer: string;
  let hint: string;
  let explanation: string;
  let visualData: any;

  if (scenario === 0) {
    // 饼干分发问题
    const total = 10;
    const person1Take = Math.floor(Math.random() * 5) + 3; // 3-7
    const person2Take = Math.floor(Math.random() * 3) + 1; // 1-3
    const remaining = total - person1Take - person2Take;

    const wantToGive = Math.floor(Math.random() * 5) + 3; // 3-7
    const actuallyHave = Math.floor(Math.random() * 4) + 2; // 2-5
    const isEnough = actuallyHave >= wantToGive;

    question = `李阿姨买了一盒饼干，盒内装有${total}块，小玲拿出${person1Take}块，小强拿出${person2Take}块。
（1）盒里还剩多少块饼干？（2）李阿姨想再给小强${wantToGive}块，拿来${actuallyHave}块够吗？`;

    answer = `${remaining}块，${isEnough ? '够' : '不够'}`;
    hint = '先计算剩余的饼干，再比较数量是否足够';
    explanation = `（1）${total} - ${person1Take} - ${person2Take} = ${remaining}块
（2）想要${wantToGive}块，只有${actuallyHave}块，${actuallyHave} < ${wantToGive}，所以不够`;

    visualData = {
      steps: [
        { label: `原有${total}块`, value: total },
        { label: `小玲拿${person1Take}块`, value: person1Take },
        { label: `小强拿${person2Take}块`, value: person2Take },
        { label: `剩余${remaining}块`, value: remaining },
      ],
      comparison: {
        want: wantToGive,
        have: actuallyHave,
        result: isEnough ? '够' : '不够',
      },
    };
  } else if (scenario === 1) {
    // 糖果分享问题
    const total = 15;
    const give1 = Math.floor(Math.random() * 6) + 4; // 4-9
    const give2 = Math.floor(Math.random() * 4) + 2; // 2-5
    const remaining = total - give1 - give2;

    const need = Math.floor(Math.random() * 6) + 4; // 4-9
    const have = Math.floor(Math.random() * 4) + 2; // 2-5
    const isEnough = have >= need;

    question = `妈妈买了${total}颗糖，给小明${give1}颗，给小红${give2}颗。
（1）还剩多少颗糖？（2）小明想要${need}颗糖，给他${have}颗够吗？`;

    answer = `${remaining}颗，${isEnough ? '够' : '不够'}`;
    hint = '分步计算，注意比较数量';
    explanation = `（1）${total} - ${give1} - ${give2} = ${remaining}颗
（2）想要${need}颗，只有${have}颗，${have} < ${need}，所以不够`;

    visualData = {
      steps: [
        { label: `原有${total}颗`, value: total },
        { label: `给小明${give1}颗`, value: give1 },
        { label: `给小红${give2}颗`, value: give2 },
        { label: `剩余${remaining}颗`, value: remaining },
      ],
      comparison: {
        want: need,
        have: have,
        result: isEnough ? '够' : '不够',
      },
    };
  } else {
    // 玩具分配问题
    const total = 12;
    const take1 = Math.floor(Math.random() * 5) + 3; // 3-7
    const take2 = Math.floor(Math.random() * 3) + 2; // 2-4
    const remaining = total - take1 - take2;

    const wantToBuy = Math.floor(Math.random() * 5) + 4; // 4-8
    const canBuy = Math.floor(Math.random() * 3) + 2; // 2-4
    const isEnough = canBuy >= wantToBuy;

    question = `老师有${total}个玩具，发给第一组${take1}个，发给第二组${take2}个。
（1）老师还剩多少个玩具？（2）想再给第三组${wantToBuy}个玩具，只有${canBuy}个够吗？`;

    answer = `${remaining}个，${isEnough ? '够' : '不够'}`;
    hint = '先算剩余，再比较数量';
    explanation = `（1）${total} - ${take1} - ${take2} = ${remaining}个
（2）想要${wantToBuy}个，只有${canBuy}个，${canBuy} < ${wantToBuy}，所以不够`;

    visualData = {
      steps: [
        { label: `原有${total}个`, value: total },
        { label: `第一组${take1}个`, value: take1 },
        { label: `第二组${take2}个`, value: take2 },
        { label: `剩余${remaining}个`, value: remaining },
      ],
      comparison: {
        want: wantToBuy,
        have: canBuy,
        result: isEnough ? '够' : '不够',
      },
    };
  }

  return {
    id: `po-multi-${id}`,
    type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF, // 复用现有类型
    question,
    answer,
    options: generateComparisonOptions(answer),
    hint,
    explanation,
    difficulty: 'hard',
    initialCount: 0,
    changeAmount: 0,
    operation: 'add',
    visualData,
  };
}

// 生成比较类选项（够/不够的组合）
function generateComparisonOptions(correct: string): string[] {
  const parts = correct.split('，');
  const numAnswer = parts[0]; // 如 "5块"
  const isEnough = parts[1]; // "够" 或 "不够"

  const oppositeEnough = isEnough === '够' ? '不够' : '够';

  // 生成干扰项
  const options = new Set<string>([correct]);

  // 选项1：数字错误，判断正确
  const wrongNum = parseInt(numAnswer) + 1;
  options.add(`${wrongNum}${numAnswer.slice(-1)}，${isEnough}`);

  // 选项2：数字正确，判断错误
  options.add(`${numAnswer}，${oppositeEnough}`);

  return shuffleArray(Array.from(options));
}

// 7. 应用题（计算自己）
function generateAppliedIncludeSelfQuestion(id: string): PictureOperationQuestion {
  const otherCount = Math.floor(Math.random() * 4) + 2; // 2-5个其他人
  const total = otherCount + 1; // 加上自己

  return {
    id: `po-app-${id}`,
    type: MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
    question: `排队时，小红前面有 ${otherCount} 个人，小红排在第几？`,
    answer: String(total),
    options: generateOptions(total, 2, 8),
    hint: '别忘了算上小红自己哦！',
    explanation: `前面有 ${otherCount} 个人，加上小红自己，${otherCount} + 1 = ${total}，所以小红排第 ${total}`,
    difficulty: 'medium',
    initialCount: otherCount,
    changeAmount: 1,
    operation: 'add',
    visualData: {
      items: [
        ...Array(otherCount).fill(null).map((_, i) => ({ icon: '🧑', color: 'bg-blue-400' })),
        { icon: '👧', color: 'bg-pink-400' }, // 小红
      ],
    },
  };
}

// 工具函数：生成操作选项
function generateOperationOptions(a: number, b: number, operation: 'add' | 'subtract'): string[] {
  const correct = operation === 'add' ? a + b : a - b;
  const options = new Set<string>([`${a} ${operation === 'add' ? '+' : '-'} ${b} = ${correct}`]);

  // 生成干扰项 - 添加最大尝试次数防止无限循环
  let attempts = 0;
  const maxAttempts = 100;

  while (options.size < 2 && attempts < maxAttempts) {
    attempts++;
    const op = Math.random() > 0.5 ? '+' : '-';
    if (op !== (operation === 'add' ? '+' : '-')) {
      const num = operation === 'add' ? a + b : a - b;
      options.add(`${a} ${op} ${b} = ${op === '+' ? a + b : a - b}`);
    }
  }

  // 如果还是不足2个，手动添加不同的值
  while (options.size < 2) {
    const randomOffset = Math.floor(Math.random() * 10) + 1;
    options.add(`${a} + ${b} = ${a + b + randomOffset}`);
  }

  return shuffleArray(Array.from(options));
}

// 工具函数：生成数字选项
function generateOptions(correct: number, min: number, max: number): string[] {
  const options = new Set<number>([correct]);
  let attempts = 0;
  const maxAttempts = 100;

  while (options.size < 2 && attempts < maxAttempts) {
    attempts++;
    const opt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (opt !== correct) {
      options.add(opt);
    }
  }

  // 如果还是不足2个，手动添加
  while (options.size < 2) {
    for (let i = min; i <= max && options.size < 2; i++) {
      if (i !== correct) {
        options.add(i);
      }
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

// 工具函数：获取随机颜色
function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// 获取随机物品
function getRandomItem(): { type: ItemType; emoji: string } {
  const rand = Math.random();
  if (rand < 0.3) {
    // 30% 飞行动物
    const emoji = FLYING_ANIMALS[Math.floor(Math.random() * FLYING_ANIMALS.length)];
    return { type: 'flying', emoji };
  } else if (rand < 0.45) {
    // 15% 地面动物
    const emoji = GROUND_ANIMALS[Math.floor(Math.random() * GROUND_ANIMALS.length)];
    return { type: 'ground', emoji };
  } else if (rand < 0.9) {
    // 45% 水果
    const emoji = FRUITS[Math.floor(Math.random() * FRUITS.length)];
    return { type: 'fruit', emoji };
  } else {
    // 10% 星星
    const emoji = STARS[Math.floor(Math.random() * STARS.length)];
    return { type: 'star', emoji };
  }
}

// 获取物品名称
function getItemName(type: ItemType, emoji: string): string {
  // 对于emoji，直接使用emoji作为名称
  return emoji;
}

// 获取单位
function getUnit(type: ItemType): string {
  switch (type) {
    case 'flying':
    case 'ground':
      return '只';
    case 'fruit':
      return '个';
    case 'star':
      return '颗';
  }
}

// 根据物品类型获取减法动词
function getSubtractionVerb(type: ItemType): string {
  switch (type) {
    case 'flying':
      // 会飞的动物：飞走了、飞到别处
      return ['飞走了', '飞到别处'][Math.floor(Math.random() * 2)];
    case 'ground':
      // 地面动物：跑掉了、走掉了
      return ['跑掉了', '走掉了', '溜走了'][Math.floor(Math.random() * 3)];
    case 'fruit':
      // 水果：吃掉了、拿走了、掉地上
      return ['吃掉了', '拿走了', '掉地上'][Math.floor(Math.random() * 3)];
    case 'star':
      // 星星：消失了
      return '消失了';
  }
}
