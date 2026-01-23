import { QueuePositionQuestion, MathQuestionType } from '../types';

// 生成排队与位置题目
export function generateQueueQuestions(count: number = 10): QueuePositionQuestion[] {
  const questions: QueuePositionQuestion[] = [];
  const generators = [
    generateQueueLeaveEffectQuestion,
    generateQueuePositionFromSideQuestion,
    generateQueuePositionVsCountQuestion,
    generateQueueRowColumnQuestion,
    generatePositionReferenceQuestion,
  ];

  for (let i = 0; i < count; i++) {
    const generator = generators[i % generators.length];
    questions.push(generator(`${i + 1}`));
  }

  return shuffleArray(questions);
}

// 1. 前面人离开后位置变化
function generateQueueLeaveEffectQuestion(id: string): QueuePositionQuestion {
  const totalPeople = Math.floor(Math.random() * 6) + 5; // 5-10人
  const targetPosition = Math.floor(Math.random() * (totalPeople - 2)) + 2; // 第2到第n-1位
  const leaveCount = Math.floor(Math.random() * Math.min(3, targetPosition - 1)) + 1; // 前面离开1-3人
  const newPosition = targetPosition - leaveCount;

  return {
    id: `q-leave-${id}`,
    type: MathQuestionType.QUEUE_LEAVE_EFFECT,
    question: `排队时，小明排第 ${targetPosition}。他前面有 ${leaveCount} 个人离开了，现在小明排第几？`,
    answer: String(newPosition),
    options: generateOptions(newPosition, 1, totalPeople),
    hint: '前面的人离开了，位置会向前移动',
    explanation: `原来第 ${targetPosition}，前面走了 ${leaveCount} 人，${targetPosition} - ${leaveCount} = ${newPosition}，现在排第 ${newPosition}`,
    difficulty: 'medium',
    totalPeople,
    targetPosition,
    leaveCount,
    visualData: {
      positions: Array.from({ length: totalPeople }, (_, i) => ({
        id: i + 1,
        isTarget: i + 1 === targetPosition,
        left: i < targetPosition - 1,
      })),
    },
  };
}

// 2. 从左/右数第几个
function generateQueuePositionFromSideQuestion(id: string): QueuePositionQuestion {
  const totalPeople = Math.floor(Math.random() * 5) + 5; // 5-9人
  const targetPos = Math.floor(Math.random() * totalPeople) + 1; // 1到总人数
  const fromLeft = Math.random() > 0.5;

  if (fromLeft) {
    // 从左数，问从右数是第几
    const fromRight = totalPeople - targetPos + 1;
    return {
      id: `q-side-${id}`,
      type: MathQuestionType.QUEUE_POSITION_FROM_SIDE,
      question: `一排 ${totalPeople} 个同学，小红从左数排第 ${targetPos}，从右数排第几？`,
      answer: String(fromRight),
      options: generateOptions(fromRight, 1, totalPeople),
      hint: '从左数的位置 + 从右数的位置 = 总人数 + 1',
      explanation: `总人数 ${totalPeople}，从左数第 ${targetPos}，从右数第 ${totalPeople} - ${targetPos} + 1 = ${fromRight}`,
      difficulty: 'medium',
      totalPeople,
      targetPosition: targetPos,
      direction: 'right',
      visualData: {
        positions: Array.from({ length: totalPeople }, (_, i) => ({
          id: i + 1,
          isTarget: i + 1 === targetPos,
        })),
      },
    };
  } else {
    // 从右数，问从左数是第几
    const fromRight = targetPos;
    const fromLeftPos = totalPeople - fromRight + 1;
    return {
      id: `q-side-${id}`,
      type: MathQuestionType.QUEUE_POSITION_FROM_SIDE,
      question: `一排 ${totalPeople} 个同学，小刚从右数排第 ${fromRight}，从左数排第几？`,
      answer: String(fromLeftPos),
      options: generateOptions(fromLeftPos, 1, totalPeople),
      hint: '从左数的位置 + 从右数的位置 = 总人数 + 1',
      explanation: `总人数 ${totalPeople}，从右数第 ${fromRight}，从左数第 ${totalPeople} - ${fromRight} + 1 = ${fromLeftPos}`,
      difficulty: 'medium',
      totalPeople,
      targetPosition: fromLeftPos,
      direction: 'left',
      visualData: {
        positions: Array.from({ length: totalPeople }, (_, i) => ({
          id: i + 1,
          isTarget: i + 1 === fromLeftPos,
        })),
      },
    };
  }
}

// 3. 第几个 vs 几个（位置 vs 数量）
function generateQueuePositionVsCountQuestion(id: string): QueuePositionQuestion {
  const position = Math.floor(Math.random() * 7) + 3; // 3-9
  const count = position - 1;

  const askCount = Math.random() > 0.5;

  if (askCount) {
    return {
      id: `q-poscnt-${id}`,
      type: MathQuestionType.QUEUE_POSITION_VS_COUNT,
      question: `排队时，小明排第 ${position}，他前面有几个人？`,
      answer: String(count),
      options: generateOptions(count, 0, position),
      hint: '第几个是位置，前面的人数 = 位置 - 1',
      explanation: `排第 ${position}，前面有 ${position} - 1 = ${count} 个人`,
      difficulty: 'easy',
      totalPeople: position + 2,
      targetPosition: position,
      visualData: {
        positions: Array.from({ length: position + 2 }, (_, i) => ({
          id: i + 1,
          isTarget: i + 1 === position,
        })),
      },
    };
  } else {
    return {
      id: `q-poscnt-${id}`,
      type: MathQuestionType.QUEUE_POSITION_VS_COUNT,
      question: `排队时，小红前面有 ${count} 个人，她排第几？`,
      answer: String(position),
      options: generateOptions(position, 1, position + 2),
      hint: '前面的人数 + 1 = 位置',
      explanation: `前面 ${count} 人，排第 ${count} + 1 = ${position}`,
      difficulty: 'easy',
      totalPeople: position + 2,
      targetPosition: position,
      visualData: {
        positions: Array.from({ length: position + 2 }, (_, i) => ({
          id: i + 1,
          isTarget: i + 1 === position,
        })),
      },
    };
  }
}

// 4. 一行一列概念
function generateQueueRowColumnQuestion(id: string): QueuePositionQuestion {
  const rows = Math.floor(Math.random() * 2) + 3; // 3-4行
  const columns = Math.floor(Math.random() * 2) + 3; // 3-4列
  const targetRow = Math.floor(Math.random() * rows) + 1;
  const targetColumn = Math.floor(Math.random() * columns) + 1;

  const askRow = Math.random() > 0.5;

  if (askRow) {
    return {
      id: `q-rc-${id}`,
      type: MathQuestionType.QUEUE_ROW_COLUMN,
      question: `教室座位有 ${rows} 行 ${columns} 列，小明坐第 ${targetRow} 行第 ${targetColumn} 列，他这一排有几个同学？`,
      answer: String(columns),
      options: generateOptions(columns, 1, 6),
      hint: '同一行的人，列数就是人数',
      explanation: `第 ${targetRow} 行，从第1列到第${columns}列，共 ${columns} 个同学`,
      difficulty: 'medium',
      totalPeople: rows * columns,
      targetPosition: targetRow,
      visualData: {
        row: targetRow,
        column: targetColumn,
        positions: Array.from({ length: rows * columns }, (_, i) => ({
          id: i + 1,
          isTarget: Math.floor(i / columns) === targetRow - 1,
        })),
      },
    };
  } else {
    return {
      id: `q-rc-${id}`,
      type: MathQuestionType.QUEUE_ROW_COLUMN,
      question: `教室座位有 ${rows} 行 ${columns} 列，小红坐第 ${targetRow} 行第 ${targetColumn} 列，她这一列有几个同学？`,
      answer: String(rows),
      options: generateOptions(rows, 1, 6),
      hint: '同一列的人，行数就是人数',
      explanation: `第 ${targetColumn} 列，从第1行到第${rows}行，共 ${rows} 个同学`,
      difficulty: 'medium',
      totalPeople: rows * columns,
      targetPosition: targetColumn,
      visualData: {
        row: targetRow,
        column: targetColumn,
        positions: Array.from({ length: rows * columns }, (_, i) => ({
          id: i + 1,
          isTarget: (i % columns) === targetColumn - 1,
        })),
      },
    };
  }
}

// 5. 上下文中"它"指代（上一步的结果）
function generatePositionReferenceQuestion(id: string): QueuePositionQuestion {
  // 例如：先加3，再减2，"它"指代加后的结果
  // 使用迭代代替递归避免栈溢出
  let attempts = 0;
  let start, firstChange, secondChange, isAddFirst, isAddSecond, afterFirst, final;

  do {
    attempts++;
    if (attempts > 100) {
      // 如果尝试太多次，返回一个简单的题目
      start = 5;
      firstChange = 1;
      secondChange = 1;
      isAddFirst = true;
      isAddSecond = false;
      afterFirst = start + firstChange;
      final = afterFirst - secondChange;
      break;
    }

    start = Math.floor(Math.random() * 5) + 2; // 2-6
    firstChange = Math.floor(Math.random() * 3) + 1; // 1-3
    secondChange = Math.floor(Math.random() * 2) + 1; // 1-2

    isAddFirst = Math.random() > 0.5;
    isAddSecond = Math.random() > 0.5;

    afterFirst = isAddFirst ? start + firstChange : start - firstChange;
    final = isAddSecond ? afterFirst + secondChange : afterFirst - secondChange;
  } while (afterFirst < 0 || final < 0);

  return {
    id: `q-ref-${id}`,
    type: MathQuestionType.POSITION_REFERENCE,
    question: `小明有 ${start} 个苹果，${isAddFirst ? '又买了' : '吃了'} ${firstChange} 个，${isAddSecond ? '又买了' : '吃了'} ${secondChange} 个，现在有几个？`,
    answer: String(final),
    options: generateOptions(final, Math.max(0, final - 2), final + 2),
    hint: '注意第二次变化是在第一次变化后的数量上进行的',
    explanation: `${start} ${isAddFirst ? '+' : '-'} ${firstChange} = ${afterFirst}，然后 ${afterFirst} ${isAddSecond ? '+' : '-'} ${secondChange} = ${final}`,
    difficulty: 'hard',
    totalPeople: start + firstChange + secondChange,
    targetPosition: final,
    visualData: {
      positions: Array.from({ length: Math.max(start, afterFirst, final) }, (_, i) => ({
        id: i + 1,
        isTarget: i + 1 === final,
        left: i + 1 <= afterFirst,
      })),
    },
  };
}

// 工具函数：生成选项
function generateOptions(correct: number, min: number, max: number): string[] {
  // 确保 min <= max
  if (min > max) {
    [min, max] = [max, min];
  }

  const options = new Set<number>([correct]);
  let attempts = 0;
  const maxAttempts = 100;

  while (options.size < 2 && attempts < maxAttempts) {
    attempts++;
    const range = max - min + 1;
    const opt = Math.floor(Math.random() * range) + min;
    options.add(opt);
  }

  // 如果还是不足2个，手动添加
  while (options.size < 2) {
    for (let i = min; i <= max && options.size < 2; i++) {
      options.add(i);
    }
  }

  // 如果还是不足2个，添加接近的数字
  while (options.size < 2) {
    const lastOption = Array.from(options).pop() ?? correct;
    options.add(lastOption + 1);
    options.add(lastOption - 1);
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
