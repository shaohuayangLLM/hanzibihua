// 多音字读音接口
export interface PinyinReading {
  pinyin: string;
  meaning: string;
  words: { word: string; pinyin: string; meaning: string }[];
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
}

export type CharacterDatabase = Record<string, CharacterInfo>;

export type TextbookVolume = 'all' | 'grade1-vol1' | 'grade1-vol2';

export const textbookOptions = [
  { value: 'all' as TextbookVolume, label: '全部生字' },
  { value: 'grade1-vol1' as TextbookVolume, label: '一年级上册' },
  { value: 'grade1-vol2' as TextbookVolume, label: '一年级下册' },
] as const;
