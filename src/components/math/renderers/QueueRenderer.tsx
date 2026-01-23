import React from 'react';
import { QueuePositionQuestion } from '@/data/math/types';

interface QueueRendererProps {
  question: QueuePositionQuestion;
  showAnswer?: boolean;
}

export const QueueRenderer: React.FC<QueueRendererProps> = ({ question, showAnswer = false }) => {
  const { visualData, targetPosition, leaveCount } = question;

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      {/* 排队展示 */}
      {visualData?.positions && (
        <div className="w-full max-w-2xl overflow-x-auto">
          <div className="flex items-center justify-center gap-2 min-w-max px-4">
            {visualData.positions.map((pos, index) => {
              const isTarget = pos.isTarget;
              const isLeft = pos.left;
              const isGone = isLeft && leaveCount && visualData.positions.slice(0, targetPosition - 1).filter(p => p.left).length >= leaveCount;

              return (
                <div
                  key={index}
                  className={`
                    relative flex flex-col items-center
                    transition-all duration-300
                  `}
                >
                  {/* 人物图标 */}
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-2xl
                      shadow-lg transition-all
                      ${isGone ? 'opacity-20 scale-90' : ''}
                      ${isTarget
                        ? 'bg-gradient-to-br from-pink-400 to-pink-600 text-white ring-4 ring-pink-300'
                        : isLeft
                        ? 'bg-gradient-to-br from-blue-300 to-blue-500 text-white'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600'}
                    `}
                  >
                    {isGone ? '💨' : isTarget ? '👤' : '🧑'}
                  </div>

                  {/* 位置标签 */}
                  {!isGone && (
                    <div className={`
                      mt-2 px-2 py-1 rounded text-xs font-medium
                      ${isTarget ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' : 'bg-muted text-muted-foreground'}
                    `}>
                      第{index + 1}
                    </div>
                  )}

                  {/* 离开标记 */}
                  {isGone && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-red-500 text-lg font-bold line-through">走</span>
                    </div>
                  )}

                  {/* 目标标记 */}
                  {isTarget && !isGone && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs shadow-md">
                      ⭐
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 行列展示 */}
      {visualData?.row && visualData?.column && (
        <div className="w-full max-w-md">
          <div className="text-center mb-4 text-sm text-muted-foreground">
            第 {visualData.row} 行 第 {visualData.column} 列
          </div>
          <div className="grid gap-1" style={{
            gridTemplateColumns: `repeat(${visualData.column}, minmax(0, 1fr))`
          }}>
            {visualData.positions.map((pos, index) => {
              const isTargetRow = Math.floor(index / (visualData.column ?? 1)) === visualData.row - 1;
              const isTargetCol = (index % (visualData.column ?? 1)) === visualData.column - 1;

              return (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all
                    ${pos.isTarget
                      ? 'bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-lg scale-110'
                      : isTargetRow || isTargetCol
                      ? 'bg-primary/20 text-primary border-2 border-primary'
                      : 'bg-muted/30 text-muted-foreground'}
                  `}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 位置变化说明 */}
      {leaveCount && leaveCount > 0 && (
        <div className="flex items-center gap-4 px-6 py-3 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">原来位置</div>
            <div className="text-2xl font-bold text-blue-600">第{targetPosition}</div>
          </div>
          <div className="text-2xl text-blue-400">→</div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">走了{leaveCount}人</div>
            <div className="text-2xl font-bold text-amber-600">-{leaveCount}</div>
          </div>
          <div className="text-2xl text-blue-400">→</div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">现在位置</div>
            <div className="text-2xl font-bold text-green-600">第{targetPosition - leaveCount}</div>
          </div>
        </div>
      )}

      {/* 说明文字 */}
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-orange-800 dark:text-orange-200">{question.explanation}</p>
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
