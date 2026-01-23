import React from 'react';
import { CalculationQuestion } from '@/data/math/types';

interface CalculationRendererProps {
  question: CalculationQuestion;
  showAnswer?: boolean;
}

export const CalculationRenderer: React.FC<CalculationRendererProps> = ({ question, showAnswer = false }) => {
  const { visualData, operand1, operand2, targetNumber } = question;

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      {/* 步骤卡片展示 */}
      {visualData?.steps && visualData.steps.length > 0 && (
        <div className="w-full max-w-2xl">
          <div className="flex flex-col gap-3">
            {visualData.steps.map((step, index) => (
              <div
                key={index}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                  ${index === 0 ? 'bg-primary/10 border-primary' : 'bg-muted/30 border-border'}
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium">{step.label}</div>
                  <div className="text-sm text-muted-foreground">= {step.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 数轴展示 - 暂时禁用以排查问题 */}
      {false && visualData?.numberLine && (
        <div className="w-full max-w-2xl">
          <div className="relative h-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-4">
            {/* 数轴 */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-border" />

            {/* 刻度和数字 */}
            {Array.from({ length: visualData.numberLine.end - visualData.numberLine.start + 1 }, (_, i) => {
              const num = visualData.numberLine.start + i;
              const x = ((num - visualData.numberLine.start) / (visualData.numberLine.end - visualData.numberLine.start)) * 100;
              const isHighlighted = visualData.numberLine.arrows.some(a => a.from === num || a.to === num);

              return (
                <div key={num} className="absolute" style={{ left: `${x}%`, top: '50%' }}>
                  <div className={`w-0.5 h-4 ${isHighlighted ? 'bg-primary' : 'bg-muted-foreground'}`} />
                  <div className={`text-xs mt-1 -translate-x-1/2 ${isHighlighted ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                    {num}
                  </div>
                </div>
              );
            })}

            {/* 箭头 */}
            {visualData.numberLine.arrows.map((arrow, index) => {
              const fromX = ((arrow.from - visualData.numberLine.start) / (visualData.numberLine.end - visualData.numberLine.start)) * 100;
              const toX = ((arrow.to - visualData.numberLine.start) / (visualData.numberLine.end - visualData.numberLine.start)) * 100;
              const isForward = arrow.to > arrow.from;

              return (
                <div key={index} className="absolute top-0" style={{ left: `${Math.min(fromX, toX)}%`, width: `${Math.abs(toX - fromX)}%` }}>
                  <div className={`
                    h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${isForward ? 'bg-green-400/80 text-green-900' : 'bg-red-400/80 text-red-900'}
                  `}>
                    {arrow.label}
                  </div>
                  <div className={`
                    w-0.5 h-3 ${isForward ? 'bg-green-500' : 'bg-red-500'}
                    ${isForward ? 'ml-auto' : 'ml-0'}
                  `} style={{ marginTop: isForward ? '-100%' : '0' }} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 数的分与合展示 */}
      {visualData?.compositionPairs && visualData.compositionPairs.length > 0 && (
        <div className="w-full max-w-2xl">
          <div className="text-center mb-4">
            <span className="text-2xl font-bold text-primary">{targetNumber}</span>
            <span className="text-muted-foreground ml-2">的分与合</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {visualData.compositionPairs.map((pair, index) => (
              <div
                key={index}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg border-2
                  ${pair[0] === operand1 || pair[1] === operand2
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-muted/30'}
                `}
              >
                <span className="text-lg font-medium">{pair[0]}</span>
                <span className="text-muted-foreground">+</span>
                <span className="text-lg font-medium">{pair[1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 说明文字 */}
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-purple-800 dark:text-purple-200">{question.explanation}</p>
        </div>
      )}

      {/* 提示 */}
      {question.hint && !showAnswer && (
        <div className="mt-2 px-4 py-2 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            💡 {question.hint}
          </p>
        </div>
      )}
    </div>
  );
};
