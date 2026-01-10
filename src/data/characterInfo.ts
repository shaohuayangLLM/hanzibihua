import { CharacterInfo, CharacterDatabase, TextbookVolume, QuizQuestion, QuizContext } from './types';

// Re-export types for backward compatibility
export type { CharacterInfo, PinyinReading, TextbookVolume } from './types';
export { textbookOptions } from './types';

// Import character data from separate files
import { baseCharacters } from './baseCharacters';
import { grade1Vol1Characters } from './grade1Vol1Characters';
import { grade1Vol2Characters } from './grade1Vol2Characters';

// Merge all character databases (later entries override earlier ones for duplicates)
export const characterDatabase: CharacterDatabase = {
  ...baseCharacters,
  ...grade1Vol1Characters,
  ...grade1Vol2Characters,
};

// Character sets for filtering by textbook
export const grade1Vol1CharacterSet = new Set(Object.keys(grade1Vol1Characters));
export const grade1Vol2CharacterSet = new Set(Object.keys(grade1Vol2Characters));

// Get character info, returns null if not in database
export const getCharacterInfo = (char: string, volume?: TextbookVolume): CharacterInfo | null => {
  // Filter by volume if specified
  if (volume === 'grade1-vol1') {
    return grade1Vol1Characters[char] || null;
  }
  if (volume === 'grade1-vol2') {
    return grade1Vol2Characters[char] || null;
  }
  
  // Return from merged database
  return characterDatabase[char] || null;
};

// Create basic info for unknown characters
export const createBasicInfo = (char: string, strokeCount: number): CharacterInfo => {
  return {
    character: char,
    pinyin: "暂无",
    meaning: "这个字的详细信息暂未收录，请查阅字典了解更多。",
    strokeCount: strokeCount,
    radicalInfo: "暂无",
    words: [],
    sentences: [],
  };
};

// Get character list for a specific volume
export const getCharacterListByVolume = (volume: TextbookVolume): string[] => {
  switch (volume) {
    case 'grade1-vol1':
      return Object.keys(grade1Vol1Characters);
    case 'grade1-vol2':
      return Object.keys(grade1Vol2Characters);
    default:
      return Object.keys(characterDatabase);
  }
};

// ==================== 拼音分类函数（专项训练用） ====================

// 判断是否为前鼻音 (an, en, in, un, ün)
export const isFrontNasal = (pinyin: string): boolean => {
  const lowerPinyin = pinyin.toLowerCase();
  const frontNasals = ['an', 'en', 'in', 'un', 'ün'];
  // 需要确保匹配的是完整音节末尾，不是拼音中间部分
  return frontNasals.some(n => {
    const pattern = new RegExp(`${n}$`);
    return pattern.test(lowerPinyin);
  });
};

// 判断是否为后鼻音 (ang, eng, ing, ong)
export const isBackNasal = (pinyin: string): boolean => {
  const lowerPinyin = pinyin.toLowerCase();
  const backNasals = ['ang', 'eng', 'ing', 'ong'];
  return backNasals.some(n => {
    const pattern = new RegExp(`${n}$`);
    return pattern.test(lowerPinyin);
  });
};

// 判断是否为平舌音 (z, c, s)
export const isFlatTongue = (pinyin: string): boolean => {
  const lowerPinyin = pinyin.toLowerCase();
  return /^[zcs]/.test(lowerPinyin);
};

// 判断是否为翘舌音 (zh, ch, sh, r)
export const isCurledTongue = (pinyin: string): boolean => {
  const lowerPinyin = pinyin.toLowerCase();
  return /^(zh|ch|sh|r)/.test(lowerPinyin);
};

// 获取汉字的拼音类型
export const getPinyinCategory = (
  pinyin: string,
  mode: 'nasal' | 'tongue'
): string => {
  if (mode === 'nasal') {
    if (isFrontNasal(pinyin)) return 'front';
    if (isBackNasal(pinyin)) return 'back';
  }
  if (mode === 'tongue') {
    if (isFlatTongue(pinyin)) return 'flat';
    if (isCurledTongue(pinyin)) return 'curled';
  }
  return 'unknown';
};

// ==================== 拼音测试相关函数 ====================

// Fisher-Yates 洗牌算法
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 获取随机错误拼音选项
const getWrongPinyins = (correctPinyin: string, count: number): string[] => {
  const allPinyins = Object.values(characterDatabase)
    .map(info => info.pinyin)
    .filter(p => p !== correctPinyin && p !== '暂无');

  // 去重
  const uniquePinyins = Array.from(new Set(allPinyins));

  if (uniquePinyins.length < count) {
    // 如果错误选项不够，生成一些假的干扰选项
    const variations: string[] = [];
    const basePinyin = correctPinyin.slice(0, -1); // 去掉声调
    const tones = ['ā', 'á', 'ǎ', 'à', 'ē', 'é', 'ě', 'è', 'ī', 'í', 'ǐ', 'ì'];
    for (let i = 0; i < count && variations.length < count; i++) {
      const randomTone = tones[Math.floor(Math.random() * tones.length)];
      const wrongPinyin = basePinyin.slice(0, -1) + randomTone;
      if (wrongPinyin !== correctPinyin && !variations.includes(wrongPinyin)) {
        variations.push(wrongPinyin);
      }
    }
    return [...uniquePinyins, ...variations].slice(0, count);
  }

  return shuffleArray(uniquePinyins).slice(0, count);
};

// 生成单个测试题目
export const generateQuizQuestion = (character: string): QuizQuestion | null => {
  const info = getCharacterInfo(character);
  if (!info || info.pinyin === '暂无') {
    return null;
  }

  // 如果是多音字且有测试语境，使用语境
  if (info.quizContexts && info.quizContexts.length > 0) {
    const context = info.quizContexts[Math.floor(Math.random() * info.quizContexts.length)];
    const wrongOptions = getWrongPinyins(context.reading, 3);
    const options = shuffleArray([context.reading, ...wrongOptions]);

    return {
      character,
      contextSentence: context.sentence,
      correctPinyin: context.reading,
      options,
    };
  }

  // 普通字：只测主要读音
  const wrongOptions = getWrongPinyins(info.pinyin, 3);
  const options = shuffleArray([info.pinyin, ...wrongOptions]);

  return {
    character,
    correctPinyin: info.pinyin,
    options,
  };
};

// 生成拼音测试题目列表
export const generateQuizQuestions = (
  count: number,
  volume?: TextbookVolume
): QuizQuestion[] => {
  const characters = getCharacterListByVolume(volume || 'all');

  // 过滤掉没有拼音数据的汉字
  const validCharacters = characters.filter(char => {
    const info = getCharacterInfo(char, volume);
    return info && info.pinyin !== '暂无';
  });

  if (validCharacters.length < count) {
    console.warn(`Requested ${count} questions, but only ${validCharacters.length} valid characters available`);
    count = Math.min(count, validCharacters.length);
  }

  const selectedChars = shuffleArray(validCharacters).slice(0, count);
  const questions: QuizQuestion[] = [];

  for (const char of selectedChars) {
    const question = generateQuizQuestion(char);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
};

// ==================== 专项训练题目生成 ====================

// 获取专项训练用的错误拼音（从相反类型中选择，增强干扰效果）
const getSpecialWrongPinyins = (
  correctPinyin: string,
  count: number,
  mode: 'nasal' | 'tongue'
): string[] => {
  const allPinyins = Object.values(characterDatabase)
    .map(info => info.pinyin)
    .filter(p => p !== correctPinyin && p !== '暂无');

  // 去重
  const uniquePinyins = Array.from(new Set(allPinyins));

  // 根据模式筛选相反类型的拼音
  let oppositePinyins: string[] = [];
  const correctCategory = getPinyinCategory(correctPinyin, mode);

  if (mode === 'nasal') {
    // 如果正确答案是前鼻音，干扰项选后鼻音，反之亦然
    oppositePinyins = uniquePinyins.filter(p => {
      const category = getPinyinCategory(p, mode);
      return category !== 'unknown' && category !== correctCategory;
    });
  } else if (mode === 'tongue') {
    // 如果正确答案是平舌音，干扰项选翘舌音，反之亦然
    oppositePinyins = uniquePinyins.filter(p => {
      const category = getPinyinCategory(p, mode);
      return category !== 'unknown' && category !== correctCategory;
    });
  }

  // 如果相反类型的拼音不够，补充其他拼音
  if (oppositePinyins.length < count) {
    const otherPinyins = uniquePinyins.filter(p => !oppositePinyins.includes(p));
    oppositePinyins = [...oppositePinyins, ...otherPinyins];
  }

  return shuffleArray(oppositePinyins).slice(0, count);
};

// 生成专项训练题目（支持鼻音和平翘舌区分）
export const generateSpecialQuizQuestions = (
  mode: 'nasal' | 'tongue',
  count: number,
  volume?: TextbookVolume
): QuizQuestion[] => {
  const allCharacters = getCharacterListByVolume(volume || 'all');

  // 筛选符合条件的汉字
  let targetCharacters = allCharacters.filter(char => {
    const info = getCharacterInfo(char, volume);
    if (!info || info.pinyin === '暂无') return false;

    if (mode === 'nasal') {
      // 鼻音模式：只选择前鼻音或后鼻音的汉字
      return isFrontNasal(info.pinyin) || isBackNasal(info.pinyin);
    }
    if (mode === 'tongue') {
      // 舌位模式：只选择平舌音或翘舌音的汉字
      return isFlatTongue(info.pinyin) || isCurledTongue(info.pinyin);
    }
    return true;
  });

  if (targetCharacters.length < count) {
    console.warn(`Requested ${count} ${mode} questions, but only ${targetCharacters.length} available`);
    count = Math.min(count, targetCharacters.length);
  }

  const selected = shuffleArray(targetCharacters).slice(0, count);
  const questions: QuizQuestion[] = [];

  for (const char of selected) {
    const info = getCharacterInfo(char, volume);
    if (!info) continue;

    // 如果是多音字且有测试语境，使用语境
    let correctPinyin = info.pinyin;
    let contextSentence: string | undefined;

    if (info.quizContexts && info.quizContexts.length > 0) {
      const context = info.quizContexts[Math.floor(Math.random() * info.quizContexts.length)];
      correctPinyin = context.reading;
      contextSentence = context.sentence;
    }

    // 使用专项训练的错误选项生成方式
    const wrongOptions = getSpecialWrongPinyins(correctPinyin, 3, mode);
    const options = shuffleArray([correctPinyin, ...wrongOptions]);

    questions.push({
      character: char,
      contextSentence,
      correctPinyin,
      options,
    });
  }

  return questions;
};
