import { MathQuestionType, BaseQuestion, GeneratorConfig } from '../types';
import { generatePlaceValueQuestions } from './placeValueGenerator';
import { generateCalculationQuestions } from './calculationGenerator';
import { generateQueueQuestions } from './queueGenerator';

// 主生成器：根据模块ID生成题目
export function generateQuestions(moduleId: string, config: GeneratorConfig = { count: 10 }): BaseQuestion[] {
  const { count, difficulty = 'mixed' } = config;

  const result = (() => {
    switch (moduleId) {
      case 'place-value':
        return generatePlaceValueQuestions(count);

      case 'calculation':
        return generateCalculationQuestions(count);

      case 'queue-position':
        return generateQueueQuestions(count);

      default:
        return [];
    }
  })();

  return result;
}

// 根据题目类型生成题目
export function generateQuestionsByType(types: MathQuestionType[], count: number = 5): BaseQuestion[] {
  const questions: BaseQuestion[] = [];
  const allGenerators = [
    { types: [MathQuestionType.PLACE_VALUE_TENS_UNITS, MathQuestionType.PLACE_VALUE_POSITION, MathQuestionType.PLACE_VALUE_DIGIT_COUNT, MathQuestionType.PLACE_VALUE_LEFT_RIGHT], generator: generatePlaceValueQuestions },
    { types: [MathQuestionType.NUMBER_COMPOSITION, MathQuestionType.MAKE_TEN_METHOD, MathQuestionType.ADDITION_WITHIN_20_CARRY, MathQuestionType.NUMBER_LINE_CALCULATION], generator: generateCalculationQuestions },
    { types: [MathQuestionType.QUEUE_LEAVE_EFFECT, MathQuestionType.QUEUE_POSITION_FROM_SIDE, MathQuestionType.QUEUE_POSITION_VS_COUNT, MathQuestionType.QUEUE_ROW_COLUMN, MathQuestionType.POSITION_REFERENCE], generator: generateQueueQuestions },
  ];

  allGenerators.forEach(({ generator }) => {
    const generated = generator(Math.ceil(count / allGenerators.length));
    questions.push(...generated);
  });

  return questions.slice(0, count).sort(() => Math.random() - 0.5);
}
