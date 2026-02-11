/**
 * 词语搭配练习数据 - 重构版（完整版）
 * 修正了所有概念错误，提升教学价值
 *
 * 数据来源：
 * - Part 1: 形容词+名词、量词+名词、动词+宾语 (60题)
 * - Part 2: 副词+动词、副词+形容词、名词合成词、动词+补语 (60题)
 *
 * 总计：120 道高质量练习题
 */

import type { CollocationExercise } from "./wordCollocationTypes";
import {
  COLLOCATION_CATEGORIES,
  COLLOCATION_CATEGORY_INFO,
} from "./wordCollocationTypes";
import { WORD_COLLOCATION_EXERCISES_PART2 } from "./wordCollocationDataNew_Part2";
import { WORD_COLLOCATION_EXERCISES_PART1_TEMP as WORD_COLLOCATION_EXERCISES_PART1 } from "./wordCollocationDataNew_Part1";

/**
 * 词语搭配练习完整数据集
 *
 * 包含7大搭配类型：
 * 1. 形容词+名词 (25题) - 形容词用"的"修饰名词
 * 2. 量词+名词 (15题) - 量词和名词搭配
 * 3. 动词+宾语 (20题) - 动词直接接宾语
 * 4. 副词+动词 (20题) - 副词用"地"修饰动词
 * 5. 副词+形容词 (15题) - 副词修饰形容词表示程度
 * 6. 名词合成词 (15题) - 两个名词组合成新词
 * 7. 动词+补语 (10题) - 动词后接补语说明结果/趋向
 */
export const WORD_COLLOCATION_EXERCISES_NEW: CollocationExercise[] = [
  ...WORD_COLLOCATION_EXERCISES_PART1,
  ...WORD_COLLOCATION_EXERCISES_PART2,
];

/**
 * 按分类获取练习题
 */
export const getExercisesByCategory = (
  category: CollocationExercise["category"]
): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.category === category);
};

/**
 * 按难度获取练习题
 */
export const getExercisesByDifficulty = (
  difficulty: CollocationExercise["difficulty"]
): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.difficulty === difficulty);
};

/**
 * 按标签获取练习题
 */
export const getExercisesByTag = (tag: string): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.tags.includes(tag));
};

/**
 * 获取指定范围的练习题
 */
export const getExercisesRange = (
  start: number,
  count: number
): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_NEW.slice(start, start + count);
};

/**
 * 统计信息
 */
export const COLLOCATION_STATS = {
  total: WORD_COLLOCATION_EXERCISES_NEW.length,
  byCategory: {
    "形容词+名词": 25,
    "量词+名词": 15,
    "动词+宾语": 20,
    "副词+动词": 20,
    "副词+形容词": 15,
    "名词合成词": 15,
    "动词+补语": 10,
  },
  byDifficulty: {
    easy: WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.difficulty === "easy").length,
    medium: WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.difficulty === "medium").length,
    hard: WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.difficulty === "hard").length,
  },
  byGrade: {
    "一年级上": WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.tags.includes("一年级上")).length,
    "一年级下": WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.tags.includes("一年级下")).length,
    "二年级上": WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.tags.includes("二年级上")).length,
    "二年级下": WORD_COLLOCATION_EXERCISES_NEW.filter(ex => ex.tags.includes("二年级下")).length,
  },
};

// Re-export category constants for convenience
export { COLLOCATION_CATEGORIES, COLLOCATION_CATEGORY_INFO };
