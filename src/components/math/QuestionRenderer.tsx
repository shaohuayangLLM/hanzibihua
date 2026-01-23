import React from 'react';
import { MathQuestion, MathQuestionType, BaseQuestion } from '@/data/math/types';
import { PlaceValueRenderer } from './renderers/PlaceValueRenderer';
import { PictureOperationRenderer } from './renderers/PictureOperationRenderer';
import { CalculationRenderer } from './renderers/CalculationRenderer';
import { QueueRenderer } from './renderers/QueueRenderer';
import { DefaultRenderer } from './renderers/DefaultRenderer';

interface QuestionRendererProps {
  question: MathQuestion;
  showAnswer?: boolean;
  selectedAnswer?: string | number | null;
  onAnswer?: (answer: string | number) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  showAnswer = false,
  selectedAnswer,
  onAnswer
}) => {
  // 临时禁用可视化渲染器，只显示题目文字和选项
  const hasCalculationType = [
    MathQuestionType.NUMBER_COMPOSITION,
    MathQuestionType.MAKE_TEN_METHOD,
    MathQuestionType.ADDITION_WITHIN_20_CARRY,
    MathQuestionType.NUMBER_LINE_CALCULATION,
  ].includes(question.type);

  return (
    <div className="w-full">
      {/* 题目文字 */}
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          {question.question}
        </h3>
      </div>

      {/* 选项交互 */}
      {onAnswer && question.options && (
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className={`
                  flex-1 h-16 text-lg font-medium transition-all rounded-xl border-2
                  ${selectedAnswer === option
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105 border-primary'
                    : 'bg-card text-foreground hover:bg-primary/10 border-border'
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 答案展示 */}
      {showAnswer && !question.options && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <span className="text-2xl">✓</span>
            <span className="text-lg font-bold text-green-700 dark:text-green-300">
              正确答案：{question.answer}
            </span>
          </div>
        </div>
      )}

      {/* 说明文字 */}
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border mx-auto max-w-2xl">
          <p className="text-sm text-foreground text-center">{question.explanation}</p>
        </div>
      )}

      {/* 提示 */}
      {question.hint && !showAnswer && !selectedAnswer && (
        <div className="mt-2 px-4 py-2 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800 mx-auto w-fit">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            💡 {question.hint}
          </p>
        </div>
      )}
    </div>
  );
};

