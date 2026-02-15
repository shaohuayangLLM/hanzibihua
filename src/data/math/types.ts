// ==================== 数学模块类型定义 ====================

// 题目类型枚举
export enum MathQuestionType {
  // 数位与位数
  PLACE_VALUE_TENS_UNITS = 'place_value_tens_units',           // 十位个位识别
  PLACE_VALUE_POSITION = 'place_value_position',               // 数位位置（左/右）
  PLACE_VALUE_DIGIT_COUNT = 'place_value_digit_count',         // 位数（一位数/两位数）
  PLACE_VALUE_LEFT_RIGHT = 'place_value_left_right',           // 左右方位

  // 看图列算式
  PICTURE_ADDITION = 'picture_addition',                       // 看图列加法（又来了）
  PICTURE_SUBTRACTION = 'picture_subtraction',                 // 看图列减法（飞走了）
  OPERATION_DISTINGUISH = 'operation_distinguish',             // 加减法区分
  PICTURE_APPLIED_INCLUDE_SELF = 'picture_applied_include_self', // 应用题计算自己

  // 计算与凑十法
  NUMBER_COMPOSITION = 'number_composition',                   // 数的分与合（2-10）
  MAKE_TEN_METHOD = 'make_ten_method',                         // 凑十法
  ADDITION_WITHIN_20_CARRY = 'addition_within_20_carry',       // 20以内破十减法（复用枚举值）
  NUMBER_LINE_CALCULATION = 'number_line_calculation',         // 数轴计算

  // 排队与位置
  QUEUE_LEAVE_EFFECT = 'queue_leave_effect',                   // 前面人离开后位置变化
  QUEUE_POSITION_FROM_SIDE = 'queue_position_from_side',       // 从左/右数第几个
  QUEUE_POSITION_VS_COUNT = 'queue_position_vs_count',         // 第几个 vs 几个
  QUEUE_ROW_COLUMN = 'queue_row_column',                       // 一行一列概念
  POSITION_REFERENCE = 'position_reference',                   // 上下文"它"指代
}

// 题目基础接口
export interface BaseQuestion {
  id: string;
  type: MathQuestionType;
  question: string;
  answer: string | number;
  options?: string[];
  hint?: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// 数位与位数题目
export interface PlaceValueQuestion extends BaseQuestion {
  type: MathQuestionType.PLACE_VALUE_TENS_UNITS |
        MathQuestionType.PLACE_VALUE_POSITION |
        MathQuestionType.PLACE_VALUE_DIGIT_COUNT |
        MathQuestionType.PLACE_VALUE_LEFT_RIGHT;
  number: number;              // 目标数字
  tensPlace?: number;          // 十位数字
  unitsPlace?: number;         // 个位数字
  visualData?: {
    leftValue: number;         // 左侧（十位）值
    rightValue: number;        // 右侧（个位）值
  };
}

// 看图列算式题目
export interface PictureOperationQuestion extends BaseQuestion {
  type: MathQuestionType.PICTURE_ADDITION |
        MathQuestionType.PICTURE_SUBTRACTION |
        MathQuestionType.OPERATION_DISTINGUISH |
        MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF;
  initialCount: number;         // 初始数量
  changeAmount: number;         // 变化数量
  operation: 'add' | 'subtract'; // 操作类型
  visualData?: {
    items: Array<{ icon: string; color: string; removed?: boolean }>;
    groups?: Array<{ icon: string; count: number; color: string }>;
  };
}

// 计算与凑十法题目
export interface CalculationQuestion extends BaseQuestion {
  type: MathQuestionType.NUMBER_COMPOSITION |
        MathQuestionType.MAKE_TEN_METHOD |
        MathQuestionType.ADDITION_WITHIN_20_CARRY |
        MathQuestionType.NUMBER_LINE_CALCULATION;
  operand1?: number;
  operand2?: number;
  targetNumber?: number;        // 凑十目标数
  composition?: Array<[number, number]>; // 数的分与合组合
  visualData?: {
    makeTenTemplate?: {
      base: number;
      addend: number;
      splitToTen: number;
      splitRest: number;
      tenResult: number;
      finalResult: number;
    };
    breakTenTemplate?: {
      minuend: number;
      subtrahend: number;
      tenPart: 10;
      onesPart: number;
      bridge: number;
      finalResult: number;
    };
    steps?: Array<{ label: string; value: number }>;
    numberLine?: {
      start: number;
      end: number;
      arrows: Array<{ from: number; to: number; label: string }>;
    };
    compositionPairs?: Array<[number, number]>;
  };
}

// 排队与位置题目
export interface QueuePositionQuestion extends BaseQuestion {
  type: MathQuestionType.QUEUE_LEAVE_EFFECT |
        MathQuestionType.QUEUE_POSITION_FROM_SIDE |
        MathQuestionType.QUEUE_POSITION_VS_COUNT |
        MathQuestionType.QUEUE_ROW_COLUMN |
        MathQuestionType.POSITION_REFERENCE;
  totalPeople: number;         // 总人数
  targetPosition: number;      // 目标位置
  leaveCount?: number;         // 离开人数
  direction?: 'left' | 'right' | 'front' | 'back';
  visualData?: {
    positions: Array<{ id: number; isTarget: boolean; left?: boolean }>;
    row?: number;
    column?: number;
  };
}

// 数学题目联合类型
export type MathQuestion =
  | PlaceValueQuestion
  | PictureOperationQuestion
  | CalculationQuestion
  | QueuePositionQuestion;

// ==================== 模块配置类型 ====================

export interface MathModule {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  questionTypes: MathQuestionType[];
  disabled?: boolean; // 模块是否禁用
}

// ==================== 测试会话类型 ====================

export type MathTestMode = 'test' | 'practice';

export interface MathTestSession {
  id: string;
  moduleId: string;
  mode: MathTestMode;
  questions: BaseQuestion[];
  currentQuestion: number;
  answers: Map<string, { selected: string | number; isCorrect: boolean }>;
  score: number;
  completed: boolean;
  startTime: number;
  endTime?: number;
}

// ==================== 题目生成器配置 ====================

export interface GeneratorConfig {
  count: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  excludeTypes?: MathQuestionType[];
}

// ==================== 统计结果类型 ====================

export interface MathTestResult {
  sessionId: string;
  moduleId: string;
  mode: MathTestMode;
  totalQuestions: number;
  correctCount: number;
  score: number;
  timeSpent: number; // 毫秒
  answers: Array<{
    question: BaseQuestion;
    selectedAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number;
  }>;
}
