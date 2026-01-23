import React from 'react';
import { BaseQuestion } from '@/data/math/types';
import { Button } from '@/components/ui/button';

interface DefaultRendererProps {
  question: BaseQuestion;
  showAnswer?: boolean;
  selectedAnswer?: string | number | null;
  onAnswer?: (answer: string | number) => void;
}

export const DefaultRenderer: React.FC<DefaultRendererProps> = ({
  question,
  showAnswer = false,
  selectedAnswer,
  onAnswer
}) => {
  const { question: questionText, options, answer } = question;
  const isCorrect = selectedAnswer !== null && selectedAnswer === answer;

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      {/* 题目文字 */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          {questionText}
        </h3>
      </div>

      {/* 选项按钮 */}
      {options && onAnswer && !showAnswer && (
        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option)}
              variant={selectedAnswer === option ? 'default' : 'outline'}
              size="lg"
              className={`
                h-16 text-lg font-medium transition-all
                ${selectedAnswer === option
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'hover:bg-primary/10'
                }
              `}
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      {/* 答案展示 */}
      {showAnswer && (
        <div className="w-full max-w-md">
          <div className={`
            p-6 rounded-xl border-2 text-center
            ${isCorrect
              ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
            }
          `}>
            <div className="text-sm text-muted-foreground mb-2">
              {isCorrect ? '✓ 正确答案' : '✗ 你的答案'}
            </div>
            <div className="text-2xl font-bold">
              {selectedAnswer ?? '未作答'}
            </div>
            {!isCorrect && (
              <>
                <div className="text-sm text-muted-foreground mt-4 mb-2">
                  正确答案
                </div>
                <div className="text-xl font-medium text-green-600 dark:text-green-400">
                  {answer}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 说明文字 */}
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border">
          <p className="text-sm text-foreground">{question.explanation}</p>
        </div>
      )}

      {/* 提示 */}
      {question.hint && !showAnswer && !selectedAnswer && (
        <div className="mt-2 px-4 py-2 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            💡 {question.hint}
          </p>
        </div>
      )}
    </div>
  );
};
