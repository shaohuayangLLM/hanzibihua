/**
 * 题目生成器使用示例
 * 演示如何生成和使用各类数学题目
 */

import {
  generateMentalMathPractice,
  generateMixedPractice,
  generateQuestions,
} from './question-generator';

// ============================================
// 示例1: 生成口算练习题
// ============================================
console.log('=== 示例1: 口算练习题（10题）===');

const mentalMath = generateMentalMathPractice(10);

mentalMath.forEach((q, index) => {
  console.log(`\n第${index + 1}题:`);
  console.log(`题目: ${q.content.expression}`);
  console.log(`答案: ${q.content.answer}`);
  console.log(`预计用时: ${q.estimatedTime}秒`);
});

// ============================================
// 示例2: 生成综合练习题
// ============================================
console.log('\n\n=== 示例2: 综合练习题（5题）===');

const mixedPractice = generateMixedPractice(5);

mixedPractice.forEach((q, index) => {
  console.log(`\n第${index + 1}题:`);
  console.log(`题型: ${q.type}`);
  console.log(`难度: ${q.difficulty}级`);

  switch (q.type) {
    case 'fill':
      console.log(`题目: ${q.content.question}`);
      console.log(`填空数: ${q.content.blanks.length}`);
      break;
    case 'calculate':
      console.log(`题目: ${q.content.expression}`);
      console.log(`答案: ${q.content.answer}`);
      break;
    case 'pattern':
      console.log(`规律类型: ${q.content.patternType}`);
      console.log(`序列: ${q.content.sequence.join(' ')}`);
      break;
    case 'application':
      console.log(`情境: ${q.content.scenario}`);
      console.log(`问题: ${q.content.question}`);
      console.log(`答案: ${q.content.answer.value}`);
      break;
  }

  console.log(`知识点: ${q.knowledgePoints.join(', ')}`);
});

// ============================================
// 示例3: 按配置生成题目
// ============================================
console.log('\n\n=== 示例3: 自定义配置生成题目 ===');

const customQuestions = generateQuestions({
  count: 3,
  questionTypes: ['calculate', 'fill'],
  difficulty: [1, 2], // 只生成基础和中等难度
  knowledgePoints: ['addition_subtraction'], // 只生成加减法题目
});

customQuestions.forEach((q, index) => {
  console.log(`\n第${index + 1}题:`);
  console.log(`题型: ${q.type}`);
  if (q.type === 'calculate') {
    console.log(`题目: ${q.content.expression}`);
    console.log(`答案: ${q.content.answer}`);
  } else if (q.type === 'fill') {
    console.log(`题目: ${q.content.question}`);
  }
});

// ============================================
// 示例4: 生成特定类型题目
// ============================================
console.log('\n\n=== 示例4: 生成填空题 ===);

import { generateCompareFillQuestion, generateAdjacentNumberQuestion } from './question-generator';

const fill1 = generateCompareFillQuestion();
console.log('\n比较题:');
console.log(`题目: ${fill1.content.question}`);
console.log(`答案: ${fill1.content.blanks[0].answer}`);

const fill2 = generateAdjacentNumberQuestion();
console.log('\n相邻数题:');
console.log(`题目: ${fill2.content.question}`);
console.log(`答案: ${fill2.content.blanks.map(b => b.answer).join(', ')}`);

// ============================================
// 示例5: 生成应用题
// ============================================
console.log('\n\n=== 示例5: 生成应用题 ===);

import { generateAdditionWordProblem, generateSubtractionWordProblem } from './question-generator';

const wordProblem1 = generateAdditionWordProblem();
console.log('\n加法应用题:');
console.log(`情境: ${wordProblem1.content.scenario}`);
console.log(`问题: ${wordProblem1.content.question}`);
console.log(`算式: ${wordProblem1.content.answer.expression}`);
console.log(`答案: ${wordProblem1.content.answer.value}`);
console.log(`解释: ${wordProblem1.content.explanation}`);

const wordProblem2 = generateSubtractionWordProblem();
console.log('\n减法应用题:');
console.log(`情境: ${wordProblem2.content.scenario}`);
console.log(`问题: ${wordProblem2.content.question}`);
console.log(`算式: ${wordProblem2.content.answer.expression}`);
console.log(`答案: ${wordProblem2.content.answer.value}`);

// ============================================
// 示例6: 生成规律题
// ============================================
console.log('\n\n=== 示例6: 生成规律题 ===);

import { generateShapePatternQuestion, generateNumberPatternQuestion } from './question-generator';

const pattern1 = generateShapePatternQuestion();
console.log('\n图形规律题:');
console.log(`序列: ${pattern1.content.sequence.join(' ')}`);
console.log(`填空位置: ${pattern1.content.blanks.join(', ')}`);
console.log(`提示: ${pattern1.content.hint}`);

const pattern2 = generateNumberPatternQuestion();
console.log('\n数列规律题:');
console.log(`序列: ${pattern2.content.sequence.map(n => n === null ? '(　　)' : n).join(', ')}`);
console.log(`提示: ${pattern2.content.hint}`);

// ============================================
// 示例7: 题目统计
// ============================================
console.log('\n\n=== 示例7: 题目统计 ===);

const allQuestions = generateMentalMathPractice(50);

// 按题型统计
const typeStats = allQuestions.reduce((acc, q) => {
  acc[q.type] = (acc[q.type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\n按题型统计:');
Object.entries(typeStats).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}题`);
});

// 按难度统计
const difficultyStats = allQuestions.reduce((acc, q) => {
  acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

console.log('\n按难度统计:');
Object.entries(difficultyStats).forEach(([level, count]) => {
  console.log(`  ${level}级: ${count}题`);
});

// 按知识点统计
const kpStats = allQuestions.reduce((acc, q) => {
  q.knowledgePoints.forEach(kp => {
    acc[kp] = (acc[kp] || 0) + 1;
  });
  return acc;
}, {} as Record<string, number>);

console.log('\n按知识点统计:');
Object.entries(kpStats)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .forEach(([kp, count]) => {
    console.log(`  ${kp}: ${count}题`);
  });

// 平均用时
const avgTime = allQuestions.reduce((sum, q) => sum + q.estimatedTime, 0) / allQuestions.length;
console.log(`\n平均预计用时: ${Math.round(avgTime)}秒/题`);
console.log(`总预计用时: ${Math.round(allQuestions.reduce((sum, q) => sum + q.estimatedTime, 0) / 60)}分钟`);

// ============================================
// 示例8: 导出为JSON
// ============================================
console.log('\n\n=== 示例8: 导出题目为JSON ===);

const exportData = {
  generatedAt: new Date().toISOString(),
  questionCount: mentalMath.length,
  questions: mentalMath.map(q => ({
    id: q.id,
    type: q.type,
    difficulty: q.difficulty,
    knowledgePoints: q.knowledgePoints,
    content: q.content,
    estimatedTime: q.estimatedTime,
  })),
};

// 在实际使用中，可以写入文件
// import { writeFileSync } from 'fs';
// writeFileSync('questions.json', JSON.stringify(exportData, null, 2));

console.log('导出数据已准备（可以保存为JSON文件）');
console.log(`包含 ${exportData.questionCount} 道题目`);

// ============================================
// 示例9: 创建练习卡片
// ============================================
console.log('\n\n=== 示例9: 创建练习卡片格式 ===);

interface PracticeCard {
  cardNumber: number;
  questions: Array<{
    number: number;
    question: string;
    spaceForAnswer: string;
  }>;
}

const card: PracticeCard = {
  cardNumber: 1,
  questions: mentalMath.slice(0, 10).map((q, i) => ({
    number: i + 1,
    question: q.content.expression,
    spaceForAnswer: '_____',
  })),
};

console.log('\n练习卡片示例:');
console.log(`卡片编号: ${card.cardNumber}`);
card.questions.forEach(q => {
  console.log(`${q.number}. ${q.question} ${q.spaceForAnswer}`);
});

// ============================================
// 示例10: 答案检查
// ============================================
console.log('\n\n=== 示例10: 答案检查 ===);

function checkAnswer(question: any, userAnswer: any): boolean {
  switch (question.type) {
    case 'calculate':
      return question.content.answer === userAnswer;
    case 'fill':
      if (Array.isArray(userAnswer)) {
        return question.content.blanks.every(
          (blank: any, i: number) => blank.answer.toString() === userAnswer[i].toString()
        );
      }
      return false;
    default:
      return false;
  }
}

// 测试检查函数
const testQuestion = mentalMath[0];
console.log(`\n题目: ${testQuestion.content.expression}`);
console.log(`正确答案: ${testQuestion.content.answer}`);
console.log(`用户答案 "5" 是否正确: ${checkAnswer(testQuestion, 5)}`);
console.log(`用户答案 "6" 是否正确: ${checkAnswer(testQuestion, 6)}`);

console.log('\n\n=== 所有示例完成 ===');
