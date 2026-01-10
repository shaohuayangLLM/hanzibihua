// 多音字读音接口
export interface PinyinReading {
  pinyin: string;
  meaning: string;
  words: { word: string; pinyin: string; meaning: string }[];
}

// 拼音测试语境接口（用于多音字）
export interface QuizContext {
  reading: string;      // 读音
  sentence: string;     // 例句（带填空）
  answer: string;       // 填空答案
}

export interface CharacterInfo {
  character: string;
  pinyin: string; // 主要读音
  meaning: string;
  strokeCount: number;
  radicalInfo: string;
  structure?: string; // 结构：左右结构、上下结构等
  words: { word: string; pinyin: string; meaning: string }[];
  sentences: string[];
  // 多音字支持
  additionalReadings?: PinyinReading[];
  // 拼音测试语境（用于多音字测试）
  quizContexts?: QuizContext[];
}

export type CharacterDatabase = Record<string, CharacterInfo>;

export type TextbookVolume = 'all' | 'grade1-vol1' | 'grade1-vol2';

export const textbookOptions = [
  { value: 'all' as TextbookVolume, label: '全部生字' },
  { value: 'grade1-vol1' as TextbookVolume, label: '一年级上册' },
  { value: 'grade1-vol2' as TextbookVolume, label: '一年级下册' },
] as const;

// ==================== 拼音测试相关类型 ====================

// 拼音测试题目
export interface QuizQuestion {
  character: string;          // 显示的汉字
  contextSentence?: string;   // 语境提示（多音字用）
  correctPinyin: string;      // 正确拼音
  options: string[];          // 4个选项（包含正确答案）
}

// 答题记录
export interface QuizAnswer {
  character: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

// 拼音测试会话状态
export interface QuizState {
  phase: 'idle' | 'playing' | 'finished';
  currentQuestion: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  correctCount: number;
  streak: number;             // 连续答对数
  maxStreak: number;          // 最大连续答对
}

// 拼音测试难度
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

// ==================== 专项训练相关类型 ====================

// 专项训练模式
export type QuizMode = 'comprehensive' | 'nasal' | 'tongue';

// 鼻音类型
export type NasalType = 'front' | 'back' | 'mixed';

// 舌位类型
export type TongueType = 'flat' | 'curled' | 'mixed';

// 专项训练配置
export interface QuizConfig {
  mode: QuizMode;
  nasalType?: NasalType;
  tongueType?: TongueType;
  questionCount: number;
  volume?: TextbookVolume;
}

// 拼音测试动作类型
export type QuizAction =
  | { type: 'START'; questions: QuizQuestion[] }
  | { type: 'ANSWER'; answer: QuizAnswer }
  | { type: 'NEXT' }
  | { type: 'RESTART' }
  | { type: 'EXIT' };
