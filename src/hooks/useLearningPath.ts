/**
 * 学习路径追踪 Hook
 * 
 * 用于记录汉字学习足迹、管理学习路径、持久化到 localStorage
 */

import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { LearningRecord, LearningPath } from '@/types/graph';
import { getCharacterTextbook } from '@/data/characterInfo';

const STORAGE_KEY_RECORDS = 'learning_records';
const STORAGE_KEY_PATH = 'current_learning_path';

/**
 * 从 localStorage 加载学习记录
 */
const loadRecordsFromStorage = (): LearningRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_RECORDS);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    // 转换日期字符串为 Date 对象
    return parsed.map((record: any) => ({
      ...record,
      learnedAt: new Date(record.learnedAt),
    }));
  } catch (error) {
    console.error('Failed to load learning records:', error);
    return [];
  }
};

/**
 * 保存学习记录到 localStorage
 */
const saveRecordsToStorage = (records: LearningRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to save learning records:', error);
  }
};

/**
 * 从 localStorage 加载当前学习路径
 */
const loadPathFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PATH);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load learning path:', error);
    return [];
  }
};

/**
 * 保存当前学习路径到 localStorage
 */
const savePathToStorage = (path: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_PATH, JSON.stringify(path));
  } catch (error) {
    console.error('Failed to save learning path:', error);
  }
};

export const useLearningPath = () => {
  const [records, setRecords] = useState<LearningRecord[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  // 初始化：从 localStorage 加载数据
  useEffect(() => {
    setRecords(loadRecordsFromStorage());
    setCurrentPath(loadPathFromStorage());
  }, []);

  /**
   * 添加学习记录
   */
  const addLearningRecord = useCallback((char: string, fromChar?: string) => {
    const textbook = getCharacterTextbook(char);
    
    const record: LearningRecord = {
      id: nanoid(),
      character: char,
      learnedAt: new Date(),
      fromCharacter: fromChar,
      pathIndex: records.length,
      textbook: textbook === 'common' || textbook === 'radical' ? undefined : textbook,
      mastered: false,
    };

    setRecords(prev => {
      const updated = [...prev, record];
      saveRecordsToStorage(updated);
      return updated;
    });

    setCurrentPath(prev => {
      const updated = [...prev, char];
      savePathToStorage(updated);
      return updated;
    });
  }, [records.length]);

  /**
   * 标记汉字为已掌握
   */
  const markAsMastered = useCallback((char: string) => {
    setRecords(prev => {
      const updated = prev.map(record =>
        record.character === char
          ? { ...record, mastered: true }
          : record
      );
      saveRecordsToStorage(updated);
      return updated;
    });
  }, []);

  /**
   * 检查汉字是否已学
   */
  const isLearned = useCallback((char: string): boolean => {
    return records.some(r => r.character === char);
  }, [records]);

  /**
   * 检查汉字是否已掌握
   */
  const isMastered = useCallback((char: string): boolean => {
    const record = records.find(r => r.character === char);
    return record?.mastered || false;
  }, [records]);

  /**
   * 获取学习路径
   */
  const getLearningPath = useCallback((): LearningPath | null => {
    if (records.length === 0) return null;

    const timestamps = records.map(r => r.learnedAt);
    
    return {
      path: currentPath,
      timestamps,
      startAt: timestamps[0],
      endAt: timestamps[timestamps.length - 1],
      pathType: 'exploration',
    };
  }, [records, currentPath]);

  /**
   * 清空学习路径（开始新的学习会话）
   */
  const resetPath = useCallback(() => {
    setCurrentPath([]);
    savePathToStorage([]);
  }, []);

  /**
   * 清空所有学习记录
   */
  const clearAllRecords = useCallback(() => {
    setRecords([]);
    setCurrentPath([]);
    localStorage.removeItem(STORAGE_KEY_RECORDS);
    localStorage.removeItem(STORAGE_KEY_PATH);
  }, []);

  /**
   * 获取学习统计
   */
  const getStats = useCallback(() => {
    const learnedCount = new Set(records.map(r => r.character)).size;
    const masteredCount = records.filter(r => r.mastered).length;
    
    return {
      totalRecords: records.length,
      uniqueCharacters: learnedCount,
      masteredCharacters: masteredCount,
      currentPathLength: currentPath.length,
    };
  }, [records, currentPath]);

  return {
    records,
    currentPath,
    addLearningRecord,
    markAsMastered,
    isLearned,
    isMastered,
    getLearningPath,
    resetPath,
    clearAllRecords,
    getStats,
  };
};
