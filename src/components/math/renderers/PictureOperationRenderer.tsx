import React from 'react';
import { PictureOperationQuestion } from '@/data/math/types';

interface PictureOperationRendererProps {
  question: PictureOperationQuestion;
  showAnswer?: boolean;
}

export const PictureOperationRenderer: React.FC<PictureOperationRendererProps> = ({ question, showAnswer = false }) => {
  const { visualData, operation } = question;

  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      {/* 图标展示区域 */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-lg">
        {visualData?.items?.map((item, index) => (
          <div
            key={index}
            className={`
              relative text-5xl p-3 rounded-xl transition-all
              ${item.removed ? 'opacity-30 line-through bg-red-100 dark:bg-red-900/30' : `${item.color} shadow-md`}
            `}
          >
            {item.icon}
            {item.removed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl text-red-500">✕</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 分组展示（如果有groups） */}
      {visualData?.groups && visualData.groups.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-6">
          {visualData.groups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col items-center space-y-2">
              <div className={`p-4 rounded-xl ${group.color} shadow-md`}>
                <div className="flex gap-1">
                  {Array.from({ length: group.count }).map((_, i) => (
                    <span key={i} className="text-4xl">
                      {group.icon}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {group.count}个
              </span>
            </div>
          ))}
          <div className="text-4xl text-muted-foreground">=</div>
          <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-accent/20 shadow-md">
            <span className="text-3xl font-bold text-accent">
              {visualData.groups.reduce((sum, g) => sum + g.count, 0)}
            </span>
          </div>
        </div>
      )}

      {/* 说明文字 */}
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">{question.explanation}</p>
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

      {/* 操作指示 */}
      <div className="flex items-center gap-2 text-lg">
        <span className={`px-3 py-1 rounded-full font-medium ${operation === 'add' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {operation === 'add' ? '+' : '-'}
        </span>
        <span className="text-muted-foreground">
          {operation === 'add' ? '加法（数量变多）' : '减法（数量变少）'}
        </span>
      </div>
    </div>
  );
};
