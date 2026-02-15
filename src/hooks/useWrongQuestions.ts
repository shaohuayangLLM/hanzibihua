/**
 * 错题本管理 Hook
 * 记录、查看、复习错题
 */

import { useState, useEffect, useCallback } from 'react';
import { PuzzleQuestion } from '@/data/puzzleDataV2';

interface WrongQuestionRecord {
  questionId: string;
  question: PuzzleQuestion;
  wrongCount: number;        // 答错次数
  lastWrongTime: number;     // 最后答错时间
  userAnswers: string[];     // 用户的错误答案历史
  correctAnswer: string;
  mastered: boolean;         // 是否已掌握
}

const STORAGE_KEY = 'puzzle-wrong-questions';

export const useWrongQuestions = () => {
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestionRecord[]>([]);

  // 从 localStorage 加载错题
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWrongQuestions(parsed);
      } catch (error) {
        console.error('Failed to parse wrong questions:', error);
      }
    }
  }, []);

  // 保存到 localStorage
  const saveToStorage = useCallback((records: WrongQuestionRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, []);

  // 添加错题
  const addWrongQuestion = useCallback((
    question: PuzzleQuestion,
    userAnswer: string
  ) => {
    setWrongQuestions(prev => {
      const existing = prev.find(wq => wq.questionId === question.id);

      if (existing) {
        // 更新已存在的错题
        const updated = prev.map(wq =>
          wq.questionId === question.id
            ? {
                ...wq,
                wrongCount: wq.wrongCount + 1,
                lastWrongTime: Date.now(),
                userAnswers: [...wq.userAnswers, userAnswer],
                mastered: false, // 再次答错，标记为未掌握
              }
            : wq
        );
        saveToStorage(updated);
        return updated;
      } else {
        // 新增错题
        const newRecord: WrongQuestionRecord = {
          questionId: question.id,
          question,
          wrongCount: 1,
          lastWrongTime: Date.now(),
          userAnswers: [userAnswer],
          correctAnswer: question.correctAnswer,
          mastered: false,
        };
        const updated = [...prev, newRecord];
        saveToStorage(updated);
        return updated;
      }
    });
  }, [saveToStorage]);

  // 标记为已掌握
  const markAsMastered = useCallback((questionId: string) => {
    setWrongQuestions(prev => {
      const updated = prev.map(wq =>
        wq.questionId === questionId ? { ...wq, mastered: true } : wq
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // 删除错题记录
  const removeWrongQuestion = useCallback((questionId: string) => {
    setWrongQuestions(prev => {
      const updated = prev.filter(wq => wq.questionId !== questionId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // 清空所有错题
  const clearAllWrongQuestions = useCallback(() => {
    setWrongQuestions([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 获取未掌握的错题
  const getUnmasteredQuestions = useCallback(() => {
    return wrongQuestions.filter(wq => !wq.mastered);
  }, [wrongQuestions]);

  // 获取最常错的题目（Top N）
  const getTopWrongQuestions = useCallback((count: number = 5) => {
    return [...wrongQuestions]
      .sort((a, b) => b.wrongCount - a.wrongCount)
      .slice(0, count);
  }, [wrongQuestions]);

  // 统计信息
  const stats = {
    total: wrongQuestions.length,
    unmastered: wrongQuestions.filter(wq => !wq.mastered).length,
    mastered: wrongQuestions.filter(wq => wq.mastered).length,
    totalWrongCount: wrongQuestions.reduce((sum, wq) => sum + wq.wrongCount, 0),
  };

  return {
    wrongQuestions,
    addWrongQuestion,
    markAsMastered,
    removeWrongQuestion,
    clearAllWrongQuestions,
    getUnmasteredQuestions,
    getTopWrongQuestions,
    stats,
  };
};
