/**
 * 词语搭配练习 - 新数据结构
 * 重构版本 - 修正概念错误，提升教学价值
 */

// ============ 类型定义 ============

export interface CollocationExercise {
  id: string;

  // 基础信息
  category: CollocationCategory;
  categoryDescription: string;

  // 题目信息
  left: string;                  // 前半部分词语
  leftPinyin: string;            // 拼音
  leftPos: PartOfSpeech;         // 词性

  right: string;                 // 后半部分词语（空白处）
  rightPos: PartOfSpeech;        // 词性

  connector?: Connector;         // 连接词（如"的"、"地"、"得"）

  // 答案和选项
  correct: string;               // 正确答案
  correctPinyin: string;         // 正确答案拼音
  options: CollocationOption[];  // 选项（同一词性）

  // 教学辅助
  examples: CollocationExample[];
  tip?: string;                  // 搭配规律提示
  commonMistakes?: string[];     // 常见错误

  // 难度和标签
  difficulty: Difficulty;
  tags: string[];                // 如：["一年级上", "常用", "重点"]
}

export interface CollocationOption {
  text: string;                  // 选项文本
  pinyin: string;                // 拼音
}

export interface CollocationExample {
  sentence: string;              // 完整句子
  highlight: string;             // 高亮部分（正确搭配）
}

// ============ 枚举类型 ============

export type CollocationCategory =
  | "形容词+名词"
  | "量词+名词"
  | "动词+宾语"
  | "副词+动词"
  | "副词+形容词"
  | "名词合成词"
  | "动词+补语";

export type PartOfSpeech =
  | "形容词"
  | "名词"
  | "动词"
  | "副词"
  | "量词"
  | "补语";

export type Connector = "的" | "地" | "得" | "";

export type Difficulty = "easy" | "medium" | "hard";

// ============ 分类定义 ============

export interface CategoryInfo {
  id: string;
  name: CollocationCategory;
  description: string;
  example: string;
  rule: string;
  icon: string;
}

export const COLLOCATION_CATEGORY_INFO: Record<CollocationCategory, CategoryInfo> = {
  "形容词+名词": {
    id: "adj-noun",
    name: "形容词+名词",
    description: "形容词修饰名词，描述事物的性质、状态、特征",
    example: "美丽的花朵、蓝蓝的天空、高高的大树",
    rule: '形容词通常用"的"连接名词',
    icon: "🎨",
  },

  "量词+名词": {
    id: "quan-noun",
    name: "量词+名词",
    description: "量词和名词搭配，表示事物的数量",
    example: "一朵花、两本书、三只鸟、一把伞",
    rule: "不同的名词搭配不同的量词",
    icon: "🔢",
  },

  "动词+宾语": {
    id: "verb-obj",
    name: "动词+宾语",
    description: "动词后面接宾语，表示动作的对象",
    example: "读书、唱歌、踢足球、写字",
    rule: "动词后面直接接名词，表示动作作用的对象",
    icon: "🏃",
  },

  "副词+动词": {
    id: "adv-verb",
    name: "副词+动词",
    description: "副词修饰动词，说明动作的方式、程度",
    example: "慢慢地走、认真地听、快快地跑",
    rule: '副词修饰动词时，中间用"地"连接',
    icon: "🎯",
  },

  "副词+形容词": {
    id: "adv-adj",
    name: "副词+形容词",
    description: "副词修饰形容词，表示程度",
    example: "非常美丽、特别高兴、十分聪明",
    rule: "程度副词可以修饰形容词",
    icon: "⭐",
  },

  "名词合成词": {
    id: "noun-compound",
    name: "名词合成词",
    description: "两个名词组成新的复合名词",
    example: "教师节、图书馆、火车站、儿童节",
    rule: '某些名词可以直接组合成新词，中间不加"的"',
    icon: "🔗",
  },

  "动词+补语": {
    id: "verb-comp",
    name: "动词+补语",
    description: "动词后面接补语，说明结果、趋向、可能",
    example: "看完、走进来、跑出去、做好",
    rule: "补语补充说明动作的结果或趋向",
    icon: "➡️",
  },
};

export const COLLOCATION_CATEGORIES = Object.keys(COLLOCATION_CATEGORY_INFO) as CollocationCategory[];
