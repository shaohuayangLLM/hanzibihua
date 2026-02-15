import { characterDatabase } from "./characterInfo";
import type { GradeBand } from "./homophoneMeaningTypes";

export interface HomophoneLexiconEntry {
  word: string;
  pinyin: string;
  pinyinKey: string;
  meaning: string;
  volumes: string[];
}

export interface HomophoneGroup {
  pinyin: string;
  pinyinKey: string;
  entries: HomophoneLexiconEntry[];
}

const CHINESE_WORD_REGEX = /^[\u4e00-\u9fff]{1,2}$/;
const GRADE_SET = new Set<GradeBand>([
  "grade1-vol1",
  "grade1-vol2",
  "grade2-vol1",
  "grade2-vol2",
]);
const COMMON_VOLUME_SET = new Set(["common", "radical"]);
const SUPPLEMENTAL_COMMON_ENTRIES: Array<{ word: string; pinyin: string; meaning: string }> = [
  { word: "书", pinyin: "shū", meaning: "书本，读物" },
  { word: "叔", pinyin: "shū", meaning: "叔叔，父亲的弟弟" },
  { word: "舒", pinyin: "shū", meaning: "舒展，舒服" },
  { word: "梳", pinyin: "shū", meaning: "梳子，梳头" },
  { word: "生", pinyin: "shēng", meaning: "生命，生长" },
  { word: "声", pinyin: "shēng", meaning: "声音，声响" },
  { word: "升", pinyin: "shēng", meaning: "上升，升高" },
  { word: "牲", pinyin: "shēng", meaning: "牲畜，家畜" },
  { word: "工", pinyin: "gōng", meaning: "工作，工人" },
  { word: "公", pinyin: "gōng", meaning: "公共，公园" },
  { word: "功", pinyin: "gōng", meaning: "功劳，成功" },
  { word: "弓", pinyin: "gōng", meaning: "弓箭，弯弓" },
  { word: "十", pinyin: "shí", meaning: "数字十" },
  { word: "时", pinyin: "shí", meaning: "时间，小时" },
  { word: "石", pinyin: "shí", meaning: "石头，岩石" },
  { word: "食", pinyin: "shí", meaning: "食物，吃食" },
  { word: "意", pinyin: "yì", meaning: "意思，心意" },
  { word: "义", pinyin: "yì", meaning: "意义，正义" },
  { word: "亿", pinyin: "yì", meaning: "数量单位亿" },
  { word: "艺", pinyin: "yì", meaning: "才艺，手艺" },
  { word: "七", pinyin: "qī", meaning: "数字七" },
  { word: "期", pinyin: "qī", meaning: "日期，时期" },
  { word: "妻", pinyin: "qī", meaning: "妻子，配偶" },
  { word: "戚", pinyin: "qī", meaning: "亲戚，亲属" },
  { word: "元", pinyin: "yuán", meaning: "元旦，单位元" },
  { word: "园", pinyin: "yuán", meaning: "花园，校园" },
  { word: "圆", pinyin: "yuán", meaning: "圆形，团圆" },
  { word: "员", pinyin: "yuán", meaning: "队员，成员" },
  { word: "记", pinyin: "jì", meaning: "记住，日记" },
  { word: "计", pinyin: "jì", meaning: "计算，计划" },
  { word: "季", pinyin: "jì", meaning: "季节，季度" },
  { word: "纪", pinyin: "jì", meaning: "纪律，纪念" },
  { word: "木", pinyin: "mù", meaning: "木头，树木" },
  { word: "目", pinyin: "mù", meaning: "眼目，目录" },
  { word: "幕", pinyin: "mù", meaning: "幕布，开幕" },
  { word: "牧", pinyin: "mù", meaning: "放牧，牧场" },
  { word: "里", pinyin: "lǐ", meaning: "里面，里边" },
  { word: "礼", pinyin: "lǐ", meaning: "礼貌，礼物" },
  { word: "李", pinyin: "lǐ", meaning: "李树，姓李" },
  { word: "理", pinyin: "lǐ", meaning: "道理，整理" },
];

const normalizeWord = (value: string): string => value.replace(/\s+/g, "").trim();

const normalizePinyin = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[·•]/g, "")
    .replace(/^\s+|\s+$/g, "");

const toPinyinKey = (value: string): string => normalizePinyin(value).replace(/\s+/g, "");

const normalizeMeaning = (value: string): string => {
  const cleaned = value
    .replace(/[。；;!！?？]/g, "，")
    .replace(/\s+/g, "")
    .replace(/,+/g, "，")
    .replace(/^，|，$/g, "");

  if (!cleaned) return "常用词语";

  const parts = cleaned.split("，").map(part => part.trim()).filter(Boolean);
  const chinesePart = parts.find(part => /[\u4e00-\u9fff]/.test(part));
  return chinesePart || "常用词语";
};

const compactMeaning = (value: string, maxLen: number = 10): string => {
  const normalized = normalizeMeaning(value);
  const first = normalized.split("，")[0] || normalized;
  const chars = Array.from(first);
  if (chars.length <= maxLen) return first;
  return chars.slice(0, maxLen).join("");
};

const rawMap = new Map<
  string,
  {
    pinyin: string;
    pinyinKey: string;
    meaning: string;
    volumes: Set<string>;
  }
>();

for (const info of Object.values(characterDatabase)) {
  const textbook = info.textbook ?? "common";

  const selfWord = normalizeWord(info.character || "");
  const selfPinyin = normalizePinyin(info.pinyin || "");
  const selfMeaning = compactMeaning(info.meaning || "");
  if (CHINESE_WORD_REGEX.test(selfWord) && selfPinyin && selfPinyin !== "暂无") {
    const selfKey = toPinyinKey(selfPinyin);
    const existingSelf = rawMap.get(selfWord);
    if (!existingSelf) {
      rawMap.set(selfWord, {
        pinyin: selfPinyin,
        pinyinKey: selfKey,
        meaning: selfMeaning,
        volumes: new Set([textbook]),
      });
    } else {
      existingSelf.volumes.add(textbook);
      if (existingSelf.meaning === "常用词语" && selfMeaning !== "常用词语") {
        existingSelf.meaning = selfMeaning;
      }
    }
  }

  for (const wordInfo of info.words ?? []) {
    const word = normalizeWord(wordInfo.word || "");
    if (!CHINESE_WORD_REGEX.test(word)) continue;

    const normalizedPinyin = normalizePinyin(wordInfo.pinyin || "");
    if (!normalizedPinyin || normalizedPinyin === "暂无") continue;

    const pinyinKey = toPinyinKey(normalizedPinyin);
    if (!pinyinKey) continue;

    const meaning = compactMeaning(wordInfo.meaning || "");

    const existing = rawMap.get(word);
    if (!existing) {
      rawMap.set(word, {
        pinyin: normalizedPinyin,
        pinyinKey,
        meaning,
        volumes: new Set([textbook]),
      });
      continue;
    }

    existing.volumes.add(textbook);
    if (existing.meaning === "常用词语" && meaning !== "常用词语") {
      existing.meaning = meaning;
    }
    if (existing.pinyin.length > normalizedPinyin.length) {
      existing.pinyin = normalizedPinyin;
      existing.pinyinKey = pinyinKey;
    }
  }
}

for (const item of SUPPLEMENTAL_COMMON_ENTRIES) {
  const word = normalizeWord(item.word);
  if (!CHINESE_WORD_REGEX.test(word)) continue;

  const pinyin = normalizePinyin(item.pinyin);
  const pinyinKey = toPinyinKey(pinyin);
  const meaning = compactMeaning(item.meaning);

  const existing = rawMap.get(word);
  if (!existing) {
    rawMap.set(word, {
      pinyin,
      pinyinKey,
      meaning,
      volumes: new Set(["common"]),
    });
    continue;
  }

  if (existing.pinyinKey === pinyinKey) {
    existing.volumes.add("common");
    if (existing.meaning === "常用词语" && meaning !== "常用词语") {
      existing.meaning = meaning;
    }
  }
}

export const HOMOPHONE_LEXICON: HomophoneLexiconEntry[] = Array.from(rawMap.entries())
  .map(([word, value]) => ({
    word,
    pinyin: value.pinyin,
    pinyinKey: value.pinyinKey,
    meaning: value.meaning,
    volumes: Array.from(value.volumes).sort(),
  }))
  .sort((a, b) => a.word.localeCompare(b.word, "zh-Hans-CN"));

export const HOMOPHONE_GROUPS: HomophoneGroup[] = Array.from(
  HOMOPHONE_LEXICON.reduce<Map<string, HomophoneGroup>>((acc, entry) => {
    const group = acc.get(entry.pinyinKey);
    if (!group) {
      acc.set(entry.pinyinKey, {
        pinyin: entry.pinyin,
        pinyinKey: entry.pinyinKey,
        entries: [entry],
      });
      return acc;
    }

    group.entries.push(entry);
    return acc;
  }, new Map())
    .values()
)
  .map(group => ({
    ...group,
    entries: [...group.entries].sort((a, b) => a.word.localeCompare(b.word, "zh-Hans-CN")),
  }))
  .sort((a, b) => a.pinyinKey.localeCompare(b.pinyinKey));

const isGradeDirect = (entry: HomophoneLexiconEntry, grade: GradeBand): boolean => {
  return entry.volumes.includes(grade);
};

const isCommonExtended = (entry: HomophoneLexiconEntry): boolean => {
  return entry.volumes.every(volume => COMMON_VOLUME_SET.has(volume));
};

const isGroupPrimaryForGrade = (group: HomophoneGroup, grade: GradeBand): boolean => {
  return group.entries.some(entry => isGradeDirect(entry, grade));
};

const isGroupExtension = (group: HomophoneGroup): boolean => {
  return group.entries.some(entry => isCommonExtended(entry));
};

export const getGroupQuestionSource = (
  group: HomophoneGroup,
  grade: GradeBand
): "textbook" | "common-extended" => {
  return isGroupPrimaryForGrade(group, grade) ? "textbook" : "common-extended";
};

export const getHomophoneGroupsByGrade = (
  grade: GradeBand,
  minEntryCount: number = 4
): {
  primary: HomophoneGroup[];
  extension: HomophoneGroup[];
} => {
  const qualified = HOMOPHONE_GROUPS.filter(group => group.entries.length >= minEntryCount);

  const primary: HomophoneGroup[] = [];
  const extension: HomophoneGroup[] = [];

  for (const group of qualified) {
    if (isGroupPrimaryForGrade(group, grade)) {
      primary.push(group);
      continue;
    }

    if (isGroupExtension(group)) {
      extension.push(group);
    }
  }

  return {
    primary,
    extension,
  };
};

export const chooseTargetInGroup = (group: HomophoneGroup, grade: GradeBand): HomophoneLexiconEntry => {
  const textbookFirst = group.entries.find(entry => isGradeDirect(entry, grade));
  return textbookFirst || group.entries[0];
};

export const isValidGradeVolume = (value: string): value is GradeBand => {
  return GRADE_SET.has(value as GradeBand);
};

export const compactMeaningClue = (meaning: string): string => compactMeaning(meaning, 8);
