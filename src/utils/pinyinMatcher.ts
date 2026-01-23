import { characterDatabase } from "@/data/characterInfo";

export interface MatchResult {
  isMatch: boolean;
  recognizedChar: string;
  recognizedPinyin: string;
  targetChar: string;
  targetPinyin: string;
  toneMatch: boolean;
  pinyinMatch: boolean;
}

/**
 * Extract tone number from pinyin string (e.g., "nǐ" -> 3, "ní" -> 2)
 */
const extractToneNumber = (pinyin: string): number => {
  // Tone mark to number mapping
  const toneMap: Record<string, number> = {
    'ā': 1, 'á': 2, 'ǎ': 3, 'à': 4,
    'ē': 1, 'é': 2, 'ě': 3, 'è': 4,
    'ī': 1, 'í': 2, 'ǐ': 3, 'ì': 4,
    'ō': 1, 'ó': 2, 'ǒ': 3, 'ò': 4,
    'ū': 1, 'ú': 2, 'ǔ': 3, 'ù': 4,
    'ǖ': 1, 'ǘ': 2, 'ǚ': 3, 'ǜ': 4,
    'ü': 0,  // Neutral tone
  };

  // Find first character with tone mark
  for (const char of pinyin) {
    if (toneMap[char] !== undefined) {
      return toneMap[char];
    }
  }

  // Check for numeric tone notation (e.g., "ni3")
  const numericMatch = pinyin.match(/\d$/);
  if (numericMatch) {
    return parseInt(numericMatch[0]);
  }

  return 0; // Neutral tone
};

/**
 * Remove tone marks from pinyin (e.g., "nǐ" -> "ni")
 */
const removeToneMarks = (pinyin: string): string => {
  return pinyin
    .replace(/[āáǎà]/g, 'a')
    .replace(/[ēéěè]/g, 'e')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ōóǒò]/g, 'o')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[ǖǘǚǜü]/g, 'v')
    .replace(/[0-9]$/g, '')  // Remove numeric tone
    .toLowerCase();
};

/**
 * Match pronunciation: compares recognized character with target character
 * using strict mode (both pinyin and tone must match)
 *
 * @param recognizedChar - The character that speech recognition heard
 * @param targetChar - The target character to match
 * @param targetPinyin - The correct pinyin for the target character
 * @returns MatchResult with detailed matching information
 */
export const matchPronunciation = (
  recognizedChar: string,
  targetChar: string,
  targetPinyin: string
): MatchResult => {
  // Clean up the recognized character (remove whitespace, punctuation)
  const cleanedRecognizedChar = recognizedChar.trim().replace(/[^\u4e00-\u9fa5]/g, '');

  // Get character info for the recognized character
  const recognizedInfo = characterDatabase[cleanedRecognizedChar];

  // Default result if character not found
  if (!recognizedInfo) {
    return {
      isMatch: cleanedRecognizedChar === targetChar,
      recognizedChar: cleanedRecognizedChar,
      recognizedPinyin: 'unknown',
      targetChar,
      targetPinyin,
      toneMatch: false,
      pinyinMatch: false,
    };
  }

  const recognizedPinyin = recognizedInfo.pinyin;

  // Extract tone numbers
  const recognizedTone = extractToneNumber(recognizedPinyin);
  const targetTone = extractToneNumber(targetPinyin);

  // Compare pinyin without tones
  const recognizedBase = removeToneMarks(recognizedPinyin);
  const targetBase = removeToneMarks(targetPinyin);

  // Check matches
  const pinyinMatch = recognizedBase === targetBase;
  const toneMatch = recognizedTone === targetTone;
  const isMatch = pinyinMatch && toneMatch;

  return {
    isMatch,
    recognizedChar: cleanedRecognizedChar,
    recognizedPinyin,
    targetChar,
    targetPinyin,
    toneMatch,
    pinyinMatch,
  };
};

/**
 * Check if browser supports the required features
 */
export const checkBrowserSupport = (): boolean => {
  return typeof window !== 'undefined' &&
    (typeof window.SpeechRecognition !== 'undefined' ||
     typeof window.webkitSpeechRecognition !== 'undefined');
};
