// 英语模块类型定义

// 字母发音数据
export interface LetterSound {
  letter: string;           // 字母（大写）
  lowercase: string;        // 小写
  phonics: string;          // 音标符号
  sound: string;            // 发音描述（如：短元音 a）
  examples: string[];       // 示例单词
  exampleWords: ExampleWord[]; // 带图片的示例词
}

// 示例单词
export interface ExampleWord {
  word: string;
  phonetic: string;
  translation: string;
  imageUrl?: string;
}

// CVC 单词数据
export interface CVCWord {
  id: string;
  word: string;
  pattern: 'CVC' | 'CCVC' | 'CVCC';
  phonics: {
    first: string;    // 首辅音
    vowel: string;    // 元音
    last?: string;    // 末辅音
  };
  translation: string;
  imageUrl?: string;
  soundUrl?: string;
  level: 1 | 2 | 3;
}

// 拼读规则数据
export interface PhonicsRule {
  id: string;
  name: string;        // 规则名称
  pattern: string;     // 匹配模式
  sound: string;       // 发音
  description: string; // 规则描述
  examples: RuleExample[];
  exceptions?: string[];
}

// 规则示例
export interface RuleExample {
  word: string;
  phonetic: string;
  translation: string;
}

// 英语模块配置
export interface EnglishModule {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  route: string;
  disabled?: boolean;
}

// 拼读练习类型
export enum PhonicsExerciseType {
  LETTER_SOUND = 'letter_sound',
  CVC_BLENDING = 'cvc_blending',
  WORD_FAMILY = 'word_family',
  SIGHT_WORDS = 'sight_words',
  LONG_VOWELS = 'long_vowels',
  DIGRAPHS = 'digraphs',
}
