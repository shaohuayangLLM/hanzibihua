/**
 * 一年级数学题目生成器 - 新版统一导出
 *
 * 本模块提供了一年级数学上册题目的完整生成系统，
 * 基于对北师大版期末综合素质测评的深入分析。
 *
 * @module math-generators-v2
 * @version 2.0.0
 */

// ============================================
// 类型定义
// ============================================
export * from './question-types-schema';

// ============================================
// 示例题目
// ============================================
export {
  allQuestions,
  questionsByKnowledgePoint,
  questionsByDifficulty,
  questionsByType,
} from './sample-questions';

// ============================================
// 题目生成器
// ============================================
export {
  // 填空题生成器
  generateCompareFillQuestion,
  generateAdjacentNumberQuestion,
  generateUnknownNumberQuestion,
  generateSymbolFillQuestion,

  // 计算题生成器
  generateAdditionQuestion,
  generateSubtractionQuestion,
  generateChainAdditionQuestion,
  generateMixedCalculationQuestion,

  // 规律题生成器
  generateShapePatternQuestion,
  generateNumberPatternQuestion,

  // 应用题生成器
  generateAdditionWordProblem,
  generateSubtractionWordProblem,

  // 通用生成器
  generateQuestion,
  generateQuestions,
  generateMentalMathPractice,
  generateMixedPractice,
  generatePracticeByKnowledgePoint,
} from './question-generator';

// ============================================
// 便捷工具
// ============================================

/**
 * 创建指定数量的随机练习题
 * @param count 题目数量
 * @param options 可选配置
 * @returns 题目数组
 */
export function createPractice(
  count: number = 20,
  options?: {
    types?: string[];
    difficulty?: number[];
    knowledgePoints?: string[];
  }
) {
  return generateQuestions({
    count,
    questionTypes: (options?.types as any) || ['fill', 'calculate', 'pattern', 'application'],
    difficulty: (options?.difficulty as any) || [1, 2, 3],
    knowledgePoints: (options?.knowledgePoints as any) || [],
  });
}

/**
 * 快速生成口算练习
 * @param count 题目数量
 * @param maxSum 最大和（默认10）
 * @returns 计算题数组
 */
export function quickMentalMath(count: number = 30, maxSum: number = 10) {
  const { generateAdditionQuestion, generateSubtractionQuestion } = require('./question-generator');

  const questions = [];
  for (let i = 0; i < count; i++) {
    const isAddition = Math.random() > 0.5;
    questions.push(
      isAddition
        ? generateAdditionQuestion(maxSum)
        : generateSubtractionQuestion(maxSum)
    );
  }
  return questions;
}

/**
 * 获取知识点列表
 * @returns 所有知识点数组
 */
export function getKnowledgePoints() {
  return [
    { id: 'number_0_10', name: '0-10的认识', category: '数的认识' },
    { id: 'number_sequence', name: '数序', category: '数的认识' },
    { id: 'number_compare', name: '数的比较', category: '数的认识' },
    { id: 'number_composition', name: '数的组成', category: '数的认识' },
    { id: 'addition_subtraction', name: '加减法', category: '运算' },
    { id: 'calculation_chain', name: '连加连减', category: '运算' },
    { id: 'unknown_number', name: '填未知数', category: '运算' },
    { id: 'pattern_shape', name: '图形规律', category: '规律' },
    { id: 'pattern_number', name: '数列规律', category: '规律' },
    { id: 'pattern_calculation', name: '算式规律', category: '规律' },
    { id: 'shape_recognition', name: '认识图形', category: '图形' },
    { id: 'shape_counting', name: '数图形', category: '图形' },
    { id: 'position', name: '位置与方向', category: '空间' },
    { id: 'clock', name: '认识钟表', category: '时间' },
    { id: 'classification', name: '分类', category: '思维' },
    { id: 'word_problem_add', name: '加法应用', category: '应用' },
    { id: 'word_problem_subtract', name: '减法应用', category: '应用' },
    { id: 'word_problem_queue', name: '排队问题', category: '应用' },
    { id: 'reasoning', name: '推理', category: '思维' },
  ];
}

/**
 * 按类别获取知识点
 * @param category 类别名称
 * @returns 该类别下的知识点数组
 */
export function getKnowledgePointsByCategory(category: string) {
  return getKnowledgePoints().filter(kp => kp.category === category);
}

/**
 * 获取所有类别
 * @returns 类别数组
 */
export function getCategories() {
  const kps = getKnowledgePoints();
  const categories = [...new Set(kps.map(kp => kp.category))];
  return categories.map(cat => ({
    name: cat,
    count: kps.filter(kp => kp.category === cat).length,
  }));
}

// ============================================
// 常量定义
// ============================================

/**
 * 题型配置
 */
export const QUESTION_TYPES = {
  FILL: { id: 'fill', name: '填空题', icon: '✏️' },
  CHOICE: { id: 'choice', name: '选择题', icon: '⭕' },
  CALCULATE: { id: 'calculate', name: '计算题', icon: '🔢' },
  MATCH: { id: 'match', name: '连线题', icon: '🔗' },
  COMPARE: { id: 'compare', name: '比较题', icon: '⚖️' },
  PATTERN: { id: 'pattern', name: '规律题', icon: '🔍' },
  SHAPE: { id: 'shape', name: '图形题', icon: '🔷' },
  APPLICATION: { id: 'application', name: '应用题', icon: '📝' },
  CLASSIFY: { id: 'classify', name: '分类题', icon: '📊' },
  CLOCK: { id: 'clock', name: '时钟题', icon: '⏰' },
} as const;

/**
 * 难度等级配置
 */
export const DIFFICULTY_LEVELS = {
  1: { id: 1, name: '基础', color: '#4caf50', percentage: 30 },
  2: { id: 2, name: '中等', color: '#2196f3', percentage: 50 },
  3: { id: 3, name: '较难', color: '#ff9800', percentage: 15 },
  4: { id: 4, name: '挑战', color: '#f44336', percentage: 5 },
} as const;

/**
 * 推荐练习配置
 */
export const PRACTICE_PRESETS = {
  DAILY: {
    name: '每日练习',
    count: 20,
    types: ['fill', 'calculate', 'application'],
    difficulty: [1, 2],
    description: '适合每天日常练习，巩固基础',
  },
  INTENSIVE: {
    name: '强化训练',
    count: 50,
    types: ['calculate'],
    difficulty: [1, 2],
    description: '集中练习口算，提高计算速度',
  },
  CHALLENGE: {
    name: '挑战提升',
    count: 15,
    types: ['pattern', 'application', 'fill'],
    difficulty: [2, 3, 4],
    description: '挑战难题，拓展思维',
  },
  COMPREHENSIVE: {
    name: '综合测评',
    count: 30,
    types: ['fill', 'calculate', 'pattern', 'application'],
    difficulty: [1, 2, 3],
    description: '全面考察，模拟考试',
  },
} as const;

/**
 * 版本信息
 */
export const VERSION = {
  major: 2,
  minor: 0,
  patch: 0,
  toString: () => '2.0.0',
};

/**
 * 元数据
 */
export const METADATA = {
  name: '一年级数学题目生成器',
  description: '基于北师大版一年级数学上册期末测评分析的题目生成系统',
  version: VERSION.toString(),
  author: 'Claude Code',
  license: 'MIT',
  grade: '一年级上册',
  textbook: '北师大版',
  lastUpdated: new Date().toISOString(),
};
