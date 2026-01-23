import { MathQuestionType, BaseQuestion, GeneratorConfig } from '../types';
import { generatePlaceValueQuestions } from './placeValueGenerator';
import { generatePictureOperationQuestions } from './pictureOperationGenerator';
import { generateCalculationQuestions } from './calculationGenerator';
import { generateQueueQuestions } from './queueGenerator';
import { generateFinalExamQuestions } from './finalExamGenerator';

// 主生成器：根据模块ID生成题目
export function generateQuestions(moduleId: string, config: GeneratorConfig = { count: 10 }): BaseQuestion[] {
  const { count, difficulty = 'mixed' } = config;

  const result = (() => {
    switch (moduleId) {
      case 'place-value':
        return generatePlaceValueQuestions(count);

      case 'picture-operation':
        return generatePictureOperationQuestions(count);

      case 'calculation':
        // 暂时禁用 calculation 模块
        return [];

      case 'queue-position':
        return generateQueueQuestions(count);

      case 'final-exam':
        return generateFinalExamQuestions(count);

      case 'comprehensive':
        return generateComprehensiveQuestions(count);

      default:
        return [];
    }
  })();

  return result;
}

// 综合测试题目生成
function generateComprehensiveQuestions(count: number): BaseQuestion[] {
  const perModule = Math.ceil(count / 3); // 3个模块，不是4个
  return [
    ...generatePlaceValueQuestions(perModule),
    ...generatePictureOperationQuestions(perModule),
    // ...generateCalculationQuestions(perModule), // 暂时禁用 calculation 模块
    ...generateQueueQuestions(perModule),
  ]
    .slice(0, count)
    .sort(() => Math.random() - 0.5);
}

// 根据题目类型生成题目
export function generateQuestionsByType(types: MathQuestionType[], count: number = 5): BaseQuestion[] {
  const questions: BaseQuestion[] = [];
  const allGenerators = [
    { types: [MathQuestionType.PLACE_VALUE_TENS_UNITS, MathQuestionType.PLACE_VALUE_POSITION, MathQuestionType.PLACE_VALUE_DIGIT_COUNT, MathQuestionType.PLACE_VALUE_LEFT_RIGHT], generator: generatePlaceValueQuestions },
    { types: [MathQuestionType.PICTURE_ADDITION, MathQuestionType.PICTURE_SUBTRACTION, MathQuestionType.OPERATION_DISTINGUISH, MathQuestionType.PICTURE_APPLIED_INCLUDE_SELF], generator: generatePictureOperationQuestions },
    // { types: [MathQuestionType.NUMBER_COMPOSITION, MathQuestionType.MAKE_TEN_METHOD, MathQuestionType.ADDITION_WITHIN_20_CARRY, MathQuestionType.NUMBER_LINE_CALCULATION], generator: generateCalculationQuestions }, // 暂时禁用
    { types: [MathQuestionType.QUEUE_LEAVE_EFFECT, MathQuestionType.QUEUE_POSITION_FROM_SIDE, MathQuestionType.QUEUE_POSITION_VS_COUNT, MathQuestionType.QUEUE_ROW_COLUMN, MathQuestionType.POSITION_REFERENCE], generator: generateQueueQuestions },
  ];

  allGenerators.forEach(({ generator }) => {
    const generated = generator(Math.ceil(count / 3)); // 3个生成器
    questions.push(...generated);
  });

  return questions.slice(0, count).sort(() => Math.random() - 0.5);
}
