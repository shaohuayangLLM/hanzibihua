import { MathModule, MathQuestionType } from './types';

// 6个模块配置
export const MATH_MODULES: MathModule[] = [
  {
    id: 'place-value',
    title: '数位与位数',
    icon: '🔢',
    color: 'bg-blue-500',
    description: '认识十位和个位，学会区分一位数和两位数',
    questionTypes: [
      MathQuestionType.PLACE_VALUE_TENS_UNITS,
      MathQuestionType.PLACE_VALUE_POSITION,
      MathQuestionType.PLACE_VALUE_DIGIT_COUNT,
      MathQuestionType.PLACE_VALUE_LEFT_RIGHT,
    ],
  },
  {
    id: 'picture-operation',
    title: '看图列算式',
    icon: '🖼️',
    color: 'bg-green-500',
    description: '看图列加减法算式，学会区分加减法',
    questionTypes: [
      MathQuestionType.PICTURE_ADDITION,
      MathQuestionType.PICTURE_SUBTRACTION,
      MathQuestionType.OPERATION_DISTINGUISH,
      MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF,
    ],
  },
  {
    id: 'queue-position',
    title: '排队与位置',
    icon: '🚶',
    color: 'bg-orange-500',
    description: '学习排队问题、位置概念和方向认知',
    questionTypes: [
      MathQuestionType.QUEUE_LEAVE_EFFECT,
      MathQuestionType.QUEUE_POSITION_FROM_SIDE,
      MathQuestionType.QUEUE_POSITION_VS_COUNT,
      MathQuestionType.QUEUE_ROW_COLUMN,
      MathQuestionType.POSITION_REFERENCE,
    ],
  },
  {
    id: 'final-exam',
    title: '期末测评',
    icon: '📝',
    color: 'bg-pink-500',
    description: '期末综合测评：规律、相邻数、填未知数、符号填空等',
    questionTypes: Object.values(MathQuestionType), // 包含所有题型
  },
  {
    id: 'comprehensive',
    title: '综合测试',
    icon: '🎯',
    color: 'bg-red-500',
    description: '综合考察所有知识点，检验学习成果',
    questionTypes: Object.values(MathQuestionType),
  },
  {
    id: 'calculation',
    title: '计算与凑十法',
    icon: '➕',
    color: 'bg-purple-500',
    description: '学习数的分与合、凑十法和20以内进位加法',
    questionTypes: [
      MathQuestionType.NUMBER_COMPOSITION,
      MathQuestionType.MAKE_TEN_METHOD,
      MathQuestionType.ADDITION_WITHIN_20_CARRY,
      MathQuestionType.NUMBER_LINE_CALCULATION,
    ],
    disabled: true, // 暂时禁用此模块
  },
];

// 获取模块配置
export const getModuleById = (id: string): MathModule | undefined => {
  return MATH_MODULES.find(module => module.id === id);
};

// 获取所有题目类型
export const getAllQuestionTypes = (): MathQuestionType[] => {
  return Object.values(MathQuestionType);
};

// 获取模块的题目类型
export const getQuestionTypesByModule = (moduleId: string): MathQuestionType[] => {
  const module = getModuleById(moduleId);
  return module?.questionTypes ?? [];
};
