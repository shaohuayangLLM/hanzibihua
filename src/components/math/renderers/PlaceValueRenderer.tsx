import React from 'react';
import { PlaceValueQuestion } from '@/data/math/types';

interface PlaceValueRendererProps {
  question: PlaceValueQuestion;
  showAnswer?: boolean;
}

export const PlaceValueRenderer: React.FC<PlaceValueRendererProps> = ({ question, showAnswer = false }) => {
  const { number, tensPlace, unitsPlace, visualData } = question;

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      {/* 数字展示 */}
      <div className="text-6xl font-bold text-foreground">
        {number}
      </div>

      {/* 数位图表 */}
      <div className="flex items-center gap-4">
        {/* 十位 */}
        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-lg ${visualData?.leftValue ? 'bg-blue-500' : 'bg-gray-300'}`}>
            {tensPlace ?? visualData?.leftValue ?? 0}
          </div>
          <div className="mt-2 text-sm font-medium text-muted-foreground">十位</div>
          <div className="text-xs text-muted-foreground">（左边）</div>
        </div>

        {/* 连接符 */}
        <div className="text-3xl text-muted-foreground">
          -
        </div>

        {/* 个位 */}
        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-lg ${visualData?.rightValue ? 'bg-green-500' : 'bg-gray-300'}`}>
            {unitsPlace ?? visualData?.rightValue ?? 0}
          </div>
          <div className="mt-2 text-sm font-medium text-muted-foreground">个位</div>
          <div className="text-xs text-muted-foreground">（右边）</div>
        </div>
      </div>

      {/* 说明文字 */}
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">{question.explanation}</p>
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
