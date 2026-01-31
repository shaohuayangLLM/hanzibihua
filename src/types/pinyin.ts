/**
 * 拼音组合类型定义
 */

export interface PinyinExample {
  char: string;
  word?: string;
  fullPinyin: string;
}

export interface ToneVariant {
  combination: string;      // 带声调的拼音
  tone: number;             // 声调 1-4
  examples: PinyinExample[];
}

export interface CombinationItem {
  initial: string;          // 声母
  final: string;            // 韵母
  tones: ToneVariant[];     // 该组合的各个声调变体（不是所有音节都有4个声调）
}

export interface CombinationData {
  [final: string]: CombinationItem[];
}

export interface InitialGroup {
  initial: string;
  combinations: {
    [final: string]: CombinationItem;
  };
}

export interface CombinationGridProps {
  data: CombinationData;
  initials: string[];
  finals: string[];
}
