import { characterDatabase } from "./characterInfo";
import type { GradeBand } from "./wordBuildingTypes";

export interface WordLexiconEntry {
  word: string;
  pinyin: string;
  meaning: string;
  volumes: string[];
}

const CHINESE_WORD_REGEX = /^[\u4e00-\u9fff]{2}$/;
const COMMON_VOLUME_SET = new Set(["common", "radical"]);
const GRADE_SET = new Set<GradeBand>([
  "grade1-vol1",
  "grade1-vol2",
  "grade2-vol1",
  "grade2-vol2",
]);

const normalizeText = (text: string): string => text.replace(/\s+/g, "").trim();

const cleanMeaning = (meaning: string): string =>
  meaning
    .replace(/[。；;!！?？]/g, "，")
    .replace(/\s+/g, "")
    .replace(/,+/g, "，")
    .replace(/^，|，$/g, "");

const normalizeMeaning = (meaning: string): string => {
  const cleaned = cleanMeaning(meaning);
  if (!cleaned) return "常用词语";

  const parts = cleaned.split("，").map(part => part.trim()).filter(Boolean);
  const chinesePart = parts.find(part => /[\u4e00-\u9fff]/.test(part));
  if (chinesePart) return chinesePart;

  return "常用词语";
};

const rawMap = new Map<
  string,
  {
    pinyin: string;
    meaning: string;
    volumes: Set<string>;
  }
>();

for (const info of Object.values(characterDatabase)) {
  const textbook = info.textbook ?? "common";
  for (const wordInfo of info.words ?? []) {
    const word = normalizeText(wordInfo.word || "");
    if (!CHINESE_WORD_REGEX.test(word)) continue;

    const pinyin = normalizeText(wordInfo.pinyin || "") || "暂无";
    const meaning = normalizeMeaning(wordInfo.meaning || "");

    const existing = rawMap.get(word);
    if (!existing) {
      rawMap.set(word, {
        pinyin,
        meaning,
        volumes: new Set([textbook]),
      });
      continue;
    }

    existing.volumes.add(textbook);
    if (existing.pinyin === "暂无" && pinyin !== "暂无") {
      existing.pinyin = pinyin;
    }
    if (existing.meaning === "常用词语" && meaning !== "常用词语") {
      existing.meaning = meaning;
    }
  }
}

export const WORD_BUILDING_LEXICON: WordLexiconEntry[] = Array.from(rawMap.entries())
  .map(([word, value]) => ({
    word,
    pinyin: value.pinyin,
    meaning: value.meaning,
    volumes: Array.from(value.volumes).sort(),
  }))
  .sort((a, b) => a.word.localeCompare(b.word, "zh-Hans-CN"));

const isCommonExtended = (entry: WordLexiconEntry): boolean =>
  entry.volumes.every(volume => COMMON_VOLUME_SET.has(volume));

const isGradeDirect = (entry: WordLexiconEntry, grade: GradeBand): boolean =>
  entry.volumes.includes(grade);

export const getLexiconPoolByGrade = (
  grade: GradeBand
): {
  primary: WordLexiconEntry[];
  extension: WordLexiconEntry[];
} => {
  const primary: WordLexiconEntry[] = [];
  const extension: WordLexiconEntry[] = [];

  for (const entry of WORD_BUILDING_LEXICON) {
    if (isGradeDirect(entry, grade)) {
      primary.push(entry);
      continue;
    }

    if (isCommonExtended(entry)) {
      extension.push(entry);
    }
  }

  return { primary, extension };
};

export const getQuestionSource = (
  entry: WordLexiconEntry,
  grade: GradeBand
): "textbook" | "common-extended" => {
  return isGradeDirect(entry, grade) ? "textbook" : "common-extended";
};

export const compactMeaning = (meaning: string, maxLen: number = 10): string => {
  const normalized = normalizeMeaning(meaning);
  const dePrefixed = normalized.startsWith("表示") ? normalized.slice(2) : normalized;
  const firstPart = (dePrefixed || "常用词语").split("，")[0] || "常用词语";
  const chars = Array.from(firstPart);
  if (chars.length <= maxLen) return firstPart;
  return chars.slice(0, maxLen).join("");
};

export const isValidGradeVolume = (volume: string): volume is GradeBand => {
  return GRADE_SET.has(volume as GradeBand);
};
