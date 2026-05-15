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
    id: 'calculation',
    title: '凑十法与破十法',
    icon: '➕',
    color: 'bg-purple-500',
    description: '学习20以内加减法中的凑十法和破十法',
    questionTypes: [
      MathQuestionType.MAKE_TEN_METHOD,
      MathQuestionType.ADDITION_WITHIN_20_CARRY,
    ],
  },
  {
    id: 'shapes',
    title: '认识图形',
    icon: '🔷',
    color: 'bg-teal-500',
    description: '认识平面图形，折一折、拼一拼，理解图形变换',
    questionTypes: [],
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
