import { CharacterInfo, CharacterDatabase, TextbookVolume } from './types';

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
