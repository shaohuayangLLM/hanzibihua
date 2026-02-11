/**
 * 智能提示系统 Hook
 * 提供多级提示帮助学生解题
 */

import { useState, useCallback } from 'react';
import { PuzzleQuestion } from '@/data/puzzleDataV2';

export type HintLevel = 'none' | 'basic' | 'advanced' | 'full';

interface HintInfo {
  level: HintLevel;
  text: string;
  cost: number;  // 提示消耗的"思考币"
}

export const useHintSystem = () => {
  const [hintsUsed, setHintsUsed] = useState<Map<string, HintLevel>>(new Map());
  const [thinkingCoins, setThinkingCoins] = useState(10); // 初始10个思考币

  /**
   * 生成智能提示
   */
  const getHint = useCallback((
    question: PuzzleQuestion,
    currentLevel: HintLevel = 'none'
  ): HintInfo | null => {
    // 基础提示 - 已在题目中提供
    if (currentLevel === 'none') {
      return {
        level: 'basic',
        text: question.question.hint || '观察汉字的结构和组合规律',
        cost: 0, // 免费
      };
    }

    // 进阶提示 - 排除法
    if (currentLevel === 'basic') {
      const wrongOptions = question.options.filter(
        opt => opt !== question.correctAnswer
      );
      const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

      return {
        level: 'advanced',
        text: `💡 这个不对：「${randomWrong}」，再想想其他选项`,
        cost: 1,
      };
    }

    // 完整提示 - 答案范围缩小
    if (currentLevel === 'advanced') {
      const correctAnswer = question.correctAnswer;
      const otherOptions = question.options.filter(
        opt => opt !== correctAnswer
      );
      const keepOption = otherOptions[0]; // 保留一个干扰项

      return {
        level: 'full',
        text: `🎯 答案在「${correctAnswer}」和「${keepOption}」之间`,
        cost: 2,
      };
    }

    return null;
  }, []);

  /**
   * 使用提示（消耗思考币）
   */
  const useHint = useCallback((
    questionId: string,
    question: PuzzleQuestion
  ): HintInfo | null => {
    const currentLevel = hintsUsed.get(questionId) || 'none';
    const hint = getHint(question, currentLevel);

    if (!hint) return null;

    // 检查是否有足够的思考币
    if (hint.cost > 0 && thinkingCoins < hint.cost) {
      return {
        level: 'none',
        text: '思考币不足！答对题目可以获得思考币',
        cost: 0,
      };
    }

    // 扣除思考币
    if (hint.cost > 0) {
      setThinkingCoins(prev => prev - hint.cost);
    }

    // 记录提示使用
    setHintsUsed(prev => new Map(prev).set(questionId, hint.level));

    return hint;
  }, [hintsUsed, thinkingCoins, getHint]);

  /**
   * 答对题目，奖励思考币
   */
  const rewardCoins = useCallback((count: number = 1) => {
    setThinkingCoins(prev => prev + count);
  }, []);

  /**
   * 重置某题的提示记录
   */
  const resetHintForQuestion = useCallback((questionId: string) => {
    setHintsUsed(prev => {
      const newMap = new Map(prev);
      newMap.delete(questionId);
      return newMap;
    });
  }, []);

  /**
   * 获取当前题的提示级别
   */
  const getHintLevelForQuestion = useCallback((questionId: string): HintLevel => {
    return hintsUsed.get(questionId) || 'none';
  }, [hintsUsed]);

  return {
    thinkingCoins,
    useHint,
    rewardCoins,
    resetHintForQuestion,
    getHintLevelForQuestion,
    hintsUsed: hintsUsed.size,
  };
};
