/**
 * 一年级数学上册题目类型定义
 * 基于期末综合素质测评分析
 */

// ============ 基础类型定义 ============

export type QuestionType =
  | 'fill'          // 填空题
  | 'choice'        // 选择题
  | 'calculate'     // 计算题
  | 'match'         // 连线题
  | 'compare'       // 比较题
  | 'pattern'       // 规律题
  | 'shape'         // 图形题
  | 'application'   // 应用题
  | 'classify'      // 分类题
  | 'clock';        // 时钟题

export type DifficultyLevel = 1 | 2 | 3 | 4;  // 1:基础 2:中等 3:较难 4:挑战

export type KnowledgePoint =
  | 'number_0_10'           // 0-10的认识
  | 'number_sequence'       // 数序
  | 'number_compare'        // 数的大小比较
  | 'number_composition'    // 数的分解与组成
  | 'addition_subtraction'  // 10以内加减法
  | 'calculation_chain'     // 连加连减
  | 'unknown_number'        // 填未知数
  | 'pattern_shape'         // 图形规律
  | 'pattern_number'        // 数列规律
  | 'pattern_calculation'   // 算式规律
  | 'shape_recognition'     // 认识图形
  | 'shape_counting'        // 数图形
  | 'position'              // 位置与方向
  | 'clock'                 // 认识钟表
  | 'classification'        // 分类
  | 'word_problem_add'      // 加法应用
  | 'word_problem_subtract' // 减法应用
  | 'word_problem_queue'    // 排队问题
  | 'reasoning';            // 推理问题

// ============ 题目接口定义 ============

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  knowledgePoints: KnowledgePoint[];
  estimatedTime: number; // 预计用时（秒）
  tags?: string[];
}

// 填空题
export interface FillQuestion extends BaseQuestion {
  type: 'fill';
  content: {
    question: string;
    blanks: {
      index: number;
      answer: string | number;
      type: 'text' | 'number';
      width?: string;
    }[];
    hint?: string;
    image?: string;
  };
}

// 选择题
export interface ChoiceQuestion extends BaseQuestion {
  type: 'choice';
  content: {
    question: string;
    options: Array<{
      label: string;
      value: string;
      image?: string;
    }>;
    correctAnswer: string;
    explanation?: string;
    image?: string;
  };
}

// 计算题
export interface CalculateQuestion extends BaseQuestion {
  type: 'calculate';
  content: {
    expression: string;
    answer: number;
    category: 'addition' | 'subtraction' | 'mixed' | 'chain';
    hint?: string;
  };
}

// 连线题
export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  content: {
    leftItems: Array<{
      id: string;
      content: string;
      image?: string;
    }>;
    rightItems: Array<{
      id: string;
      content: string;
      image?: string;
    }>;
    pairs: Array<[string, string]>; // [leftId, rightId]
  };
}

// 比较题
export interface CompareQuestion extends BaseQuestion {
  type: 'compare';
  content: {
    left: string | number;
    right: string | number;
    operator: '>' | '<' | '=';
    question?: string;
    leftImage?: string;
    rightImage?: string;
  };
}

// 规律题
export interface PatternQuestion extends BaseQuestion {
  type: 'pattern';
  content: {
    patternType: 'shape' | 'number' | 'calculation';
    sequence: Array<string | number>;
    blanks: number[]; // 需要填空的位置索引
    hint?: string;
    image?: string;
  };
}

// 图形题
export interface ShapeQuestion extends BaseQuestion {
  type: 'shape';
  content: {
    question: string;
    shapes: Array<{
      type: 'circle' | 'square' | 'rectangle' | 'triangle';
      count: number;
    }>;
    answer: Record<string, number>;
    image?: string;
  };
}

// 应用题
export interface ApplicationQuestion extends BaseQuestion {
  type: 'application';
  content: {
    scenario: string;
    question: string;
    image?: string;
    answer: {
      value: number;
      expression?: string;
      unit?: string;
    };
    steps?: string[]; // 解题步骤
    explanation?: string;
  };
}

// 分类题
export interface ClassifyQuestion extends BaseQuestion {
  type: 'classify';
  content: {
    items: Array<{
      id: string;
      image: string;
      name?: string;
    }>;
    criteria: {
      name: string;
      groups: {
        name: string;
        items: string[];
      }[];
    }[];
    allowMultipleCriteria: boolean;
  };
}

// 时钟题
export interface ClockQuestion extends BaseQuestion {
  type: 'clock';
  content: {
    question: string;
    hour: number;
    minute: number;
    answer: string; // "7时"
    showClock?: boolean;
  };
}

// 联合类型
export type MathQuestion =
  | FillQuestion
  | ChoiceQuestion
  | CalculateQuestion
  | MatchQuestion
  | CompareQuestion
  | PatternQuestion
  | ShapeQuestion
  | ApplicationQuestion
  | ClassifyQuestion
  | ClockQuestion;

// ============ 题目生成器配置 ============

export interface GeneratorConfig {
  knowledgePoints: KnowledgePoint[];
  difficulty: DifficultyLevel[];
  questionTypes: QuestionType[];
  count: number;
  allowRepeat?: boolean;
}

// ============ 练习会话 ============

export interface PracticeSession {
  id: string;
  userId?: string;
  questions: MathQuestion[];
  startTime: Date;
  endTime?: Date;
  answers: Array<{
    questionId: string;
    userAnswer: any;
    isCorrect: boolean;
    timeSpent: number;
    timestamp: Date;
  }>;
  summary: {
    totalQuestions: number;
    correctCount: number;
    totalTime: number;
    accuracy: number;
    knowledgePointStats: Record<KnowledgePoint, {
      total: number;
      correct: number;
      accuracy: number;
    }>;
  };
}

// ============ 学习进度 ============

export interface LearningProgress {
  userId: string;
  knowledgePoints: Record<KnowledgePoint, {
    totalAttempts: number;
    correctAttempts: number;
    averageTime: number;
    lastPracticeTime: Date;
    masteryLevel: 'beginner' | 'developing' | 'proficient' | 'mastered';
  }>;
  wrongQuestions: Array<{
    questionId: string;
    wrongAnswers: any[];
    timestamp: Date;
  }>;
  practiceHistory: Array<{
    date: Date;
    questionCount: number;
    accuracy: number;
    timeSpent: number;
  }>;
}

// ============ 工具函数类型 ============

export type QuestionFilter = {
  type?: QuestionType;
  difficulty?: DifficultyLevel;
  knowledgePoint?: KnowledgePoint;
  excludeIds?: string[];
};

export type QuestionGenerator = (config: GeneratorConfig) => MathQuestion[];
