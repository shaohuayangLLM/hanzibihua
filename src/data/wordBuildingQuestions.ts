import {
  compactMeaning,
  getLexiconPoolByGrade,
  getQuestionSource,
  type WordLexiconEntry,
  WORD_BUILDING_LEXICON,
} from "./wordBuildingLexicon";
import type {
  ChoiceQuestion,
  ContextQuestion,
  DragQuestion,
  GradeBand,
  InputQuestion,
  WordBuildingMode,
  WordBuildingQuestion,
} from "./wordBuildingTypes";
import { GRADE_BANDS } from "./wordBuildingTypes";

const QUESTIONS_PER_GRADE_PER_MODE = 25;
const TARGET_WORDS_PER_GRADE = 25;
const PRIMARY_TARGETS_PER_GRADE = 20;
const EXTENSION_TARGETS_PER_GRADE = 5;

const MODE_ORDER: WordBuildingMode[] = ["choice", "drag", "context", "input"];

const GRADE_LABELS: Record<GradeBand, string> = {
  "grade1-vol1": "一年级上册",
  "grade1-vol2": "一年级下册",
  "grade2-vol1": "二年级上册",
  "grade2-vol2": "二年级下册",
};

export const NEAR_SYNONYM_BLACKLIST: Array<[string, string]> = [
  ["高兴", "开心"],
  ["美丽", "漂亮"],
  ["立刻", "马上"],
  ["困难", "艰难"],
  ["明亮", "闪亮"],
  ["聪明", "机灵"],
  ["可爱", "乖巧"],
  ["重要", "关键"],
  ["安静", "寂静"],
  ["喜欢", "喜爱"],
  ["快乐", "高兴"],
  ["帮助", "协助"],
  ["认真", "仔细"],
  ["马上", "立马"],
];

const nearSynonymSet = new Set(
  NEAR_SYNONYM_BLACKLIST.map(pair => [...pair].sort().join("#"))
);

const getPairKey = (a: string, b: string): string => [a, b].sort().join("#");

const isNearSynonym = (a: string, b: string): boolean => nearSynonymSet.has(getPairKey(a, b));

const stableHash = (text: string): number => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const toDifficulty = (index: number): "easy" | "medium" | "hard" => {
  if (index < 15) return "easy";
  if (index < 23) return "medium";
  return "hard";
};

const ensureExplanationLength = (text: string): string => {
  const chars = Array.from(text);
  if (chars.length < 12) return `${text}，这样更准确。`;
  if (chars.length <= 60) return text;
  return `${chars.slice(0, 57).join("")}...`;
};

const inferCategory = (meaning: string): string => {
  if (/(学校|老师|学习|读书|写字|课程)/.test(meaning)) return "学习";
  if (/(爸爸|妈妈|同学|朋友|孩子|人物|家人)/.test(meaning)) return "人物";
  if (/(鸟|鱼|猫|狗|牛|马|羊|动物)/.test(meaning)) return "动物";
  if (/(春|夏|秋|冬|风|雨|雪|天空|月亮|太阳)/.test(meaning)) return "自然";
  if (/(地方|位置|门口|公园|教室|图书馆)/.test(meaning)) return "地点";
  return "日常";
};

const hasUsableMeaning = (entry: WordLexiconEntry): boolean => {
  return entry.meaning !== "常用词语";
};

const lexiconByWord = new Map(WORD_BUILDING_LEXICON.map(item => [item.word, item]));

const pickWordTargetsByGrade = (): Record<GradeBand, WordLexiconEntry[]> => {
  const result = {
    "grade1-vol1": [] as WordLexiconEntry[],
    "grade1-vol2": [] as WordLexiconEntry[],
    "grade2-vol1": [] as WordLexiconEntry[],
    "grade2-vol2": [] as WordLexiconEntry[],
  };

  const globalUsed = new Set<string>();

  for (const grade of GRADE_BANDS) {
    const { primary, extension } = getLexiconPoolByGrade(grade);

    const primaryRanked = [...primary]
      .filter(hasUsableMeaning)
      .sort((a, b) => a.word.localeCompare(b.word, "zh-Hans-CN"));
    const extensionRanked = [...extension]
      .filter(hasUsableMeaning)
      .sort((a, b) => a.word.localeCompare(b.word, "zh-Hans-CN"));

    for (const entry of primaryRanked) {
      if (result[grade].length >= PRIMARY_TARGETS_PER_GRADE) break;
      if (globalUsed.has(entry.word)) continue;
      result[grade].push(entry);
      globalUsed.add(entry.word);
    }

    for (const entry of extensionRanked) {
      if (result[grade].length >= PRIMARY_TARGETS_PER_GRADE + EXTENSION_TARGETS_PER_GRADE) break;
      if (globalUsed.has(entry.word)) continue;
      result[grade].push(entry);
      globalUsed.add(entry.word);
    }

    for (const entry of primaryRanked) {
      if (result[grade].length >= TARGET_WORDS_PER_GRADE) break;
      if (globalUsed.has(entry.word)) continue;
      result[grade].push(entry);
      globalUsed.add(entry.word);
    }

    for (const entry of extensionRanked) {
      if (result[grade].length >= TARGET_WORDS_PER_GRADE) break;
      if (globalUsed.has(entry.word)) continue;
      result[grade].push(entry);
      globalUsed.add(entry.word);
    }

    if (result[grade].length < TARGET_WORDS_PER_GRADE) {
      throw new Error(
        `组词题库不足：${GRADE_LABELS[grade]} 仅有 ${result[grade].length} 个可用词，少于 ${TARGET_WORDS_PER_GRADE}`
      );
    }
  }

  return result;
};

const pickDistractors = (
  grade: GradeBand,
  correctWord: string,
  count: number,
  seed: string,
  filterFn: (entry: WordLexiconEntry) => boolean
): WordLexiconEntry[] => {
  const { primary, extension } = getLexiconPoolByGrade(grade);

  const selected: WordLexiconEntry[] = [];
  const selectedSet = new Set<string>();

  const pickFromPool = (pool: WordLexiconEntry[], tag: string) => {
    const ranked = pool
      .filter(entry => entry.word !== correctWord)
      .filter(filterFn)
      .sort((a, b) => {
        const delta = stableHash(`${seed}:${tag}:${a.word}`) - stableHash(`${seed}:${tag}:${b.word}`);
        if (delta !== 0) return delta;
        return a.word.localeCompare(b.word, "zh-Hans-CN");
      });

    for (const item of ranked) {
      if (selected.length >= count) break;
      if (selectedSet.has(item.word)) continue;
      selected.push(item);
      selectedSet.add(item.word);
    }
  };

  // 优先从教材内词条选干扰项，避免过难词汇干扰低年级用户。
  pickFromPool(primary, "primary");
  if (selected.length < count) {
    pickFromPool(extension, "extension");
  }
  if (selected.length < count) {
    pickFromPool(WORD_BUILDING_LEXICON, "fallback");
  }

  return selected.slice(0, count);
};

const shuffleOptions = <T extends { text: string }>(options: T[], seed: string): T[] => {
  return [...options].sort((a, b) => {
    const delta = stableHash(`${seed}:${a.text}`) - stableHash(`${seed}:${b.text}`);
    if (delta !== 0) return delta;
    return a.text.localeCompare(b.text, "zh-Hans-CN");
  });
};

const getCorrectWordDisplay = (question: WordBuildingQuestion): string => {
  if (question.mode === "drag") return question.correctOrder.join("");
  if (question.mode === "input") return question.acceptedAnswers[0] || "";
  return question.correct;
};

const buildChoiceQuestion = (
  grade: GradeBand,
  target: WordLexiconEntry,
  index: number
): ChoiceQuestion => {
  const promptChar = Array.from(target.word)[0] || "";
  const distractors = pickDistractors(
    grade,
    target.word,
    3,
    `choice:${grade}:${target.word}`,
    entry => !entry.word.includes(promptChar) && !isNearSynonym(target.word, entry.word)
  );

  const options = shuffleOptions(
    [
      { text: target.word, pinyin: target.pinyin },
      ...distractors.map(item => ({ text: item.word, pinyin: item.pinyin })),
    ],
    `choice-options:${grade}:${target.word}`
  );

  return {
    id: `wb-${grade}-choice-${String(index + 1).padStart(3, "0")}`,
    mode: "choice",
    grade,
    difficulty: toDifficulty(index),
    category: inferCategory(target.meaning),
    targetWord: target.word,
    targetPinyin: target.pinyin,
    competency: "识别目标字并组合常用词",
    explanation: ensureExplanationLength(
      `“${target.word}”包含“${promptChar}”，其余词不含该字，不能完成本题目标。`
    ),
    tags: [GRADE_LABELS[grade], "组词", "单字组选"],
    promptChar,
    options,
    correct: target.word,
    quality: {
      source: getQuestionSource(target, grade),
      reviewStatus: "published",
    },
  };
};

const buildDragQuestion = (
  grade: GradeBand,
  target: WordLexiconEntry,
  index: number
): DragQuestion => {
  const correctOrder = Array.from(target.word);
  const tiles = [...correctOrder]
    .map((char, idx) => ({ char, idx }))
    .sort((a, b) => {
      const delta = stableHash(`drag:${grade}:${target.word}:${a.idx}`)
        - stableHash(`drag:${grade}:${target.word}:${b.idx}`);
      return delta;
    })
    .map(item => item.char);

  if (tiles.join("") === target.word && tiles.length > 1) {
    const last = tiles.length - 1;
    [tiles[0], tiles[last]] = [tiles[last], tiles[0]];
  }

  return {
    id: `wb-${grade}-drag-${String(index + 1).padStart(3, "0")}`,
    mode: "drag",
    grade,
    difficulty: toDifficulty(index),
    category: inferCategory(target.meaning),
    targetWord: target.word,
    targetPinyin: target.pinyin,
    competency: "按字序组合成正确词语",
    explanation: ensureExplanationLength(
      `“${target.word}”要按正确字序组合，顺序颠倒会变成错误词语。`
    ),
    tags: [GRADE_LABELS[grade], "组词", "拼字成词"],
    tiles,
    correctOrder,
    quality: {
      source: getQuestionSource(target, grade),
      reviewStatus: "published",
    },
  };
};

const buildContextQuestion = (
  grade: GradeBand,
  target: WordLexiconEntry,
  index: number
): ContextQuestion => {
  const clue = compactMeaning(target.meaning, 8);
  const distractors = pickDistractors(
    grade,
    target.word,
    3,
    `context:${grade}:${target.word}`,
    entry => !isNearSynonym(target.word, entry.word)
  );

  const options = shuffleOptions(
    [
      { text: target.word, pinyin: target.pinyin },
      ...distractors.map(item => ({ text: item.word, pinyin: item.pinyin })),
    ],
    `context-options:${grade}:${target.word}`
  );

  const contextSentence = `表示“${clue}”的词语是${target.word}。`;
  const stem = `表示“${clue}”的词语是___。`;

  return {
    id: `wb-${grade}-context-${String(index + 1).padStart(3, "0")}`,
    mode: "context",
    grade,
    difficulty: toDifficulty(index),
    category: inferCategory(target.meaning),
    targetWord: target.word,
    targetPinyin: target.pinyin,
    competency: "根据语义提示选择恰当词语",
    explanation: ensureExplanationLength(
      `根据语义提示“${clue}”，只有“${target.word}”能准确表达句子意思。`
    ),
    tags: [GRADE_LABELS[grade], "组词", "语境选词"],
    stem,
    contextSentence,
    options,
    correct: target.word,
    quality: {
      source: getQuestionSource(target, grade),
      reviewStatus: "published",
    },
  };
};

const buildInputQuestion = (
  grade: GradeBand,
  target: WordLexiconEntry,
  index: number
): InputQuestion => {
  const clue = compactMeaning(target.meaning, 8);
  const firstChar = Array.from(target.word)[0] || "";

  return {
    id: `wb-${grade}-input-${String(index + 1).padStart(3, "0")}`,
    mode: "input",
    grade,
    difficulty: toDifficulty(index),
    category: inferCategory(target.meaning),
    targetWord: target.word,
    targetPinyin: target.pinyin,
    competency: "根据提示主动写出词语",
    explanation: ensureExplanationLength(
      `根据词义提示与首字线索，准确写出“${target.word}”，输入题按词库精确匹配。`
    ),
    tags: [GRADE_LABELS[grade], "组词", "开放输入"],
    prompt: `请写出表示“${clue}”的两字词，首字是“${firstChar}”。`,
    acceptedAnswers: [target.word],
    normalizeRule: "trim-lower-fullwidth",
    quality: {
      source: getQuestionSource(target, grade),
      reviewStatus: "published",
    },
  };
};

const buildQuestions = (): WordBuildingQuestion[] => {
  const wordsByGrade = pickWordTargetsByGrade();
  const questions: WordBuildingQuestion[] = [];

  for (const grade of GRADE_BANDS) {
    const targets = wordsByGrade[grade].slice(0, QUESTIONS_PER_GRADE_PER_MODE);

    for (let i = 0; i < QUESTIONS_PER_GRADE_PER_MODE; i += 1) {
      const target = targets[i];
      questions.push(buildChoiceQuestion(grade, target, i));
    }

    for (let i = 0; i < QUESTIONS_PER_GRADE_PER_MODE; i += 1) {
      const target = targets[i];
      questions.push(buildDragQuestion(grade, target, i));
    }

    for (let i = 0; i < QUESTIONS_PER_GRADE_PER_MODE; i += 1) {
      const target = targets[i];
      questions.push(buildContextQuestion(grade, target, i));
    }

    for (let i = 0; i < QUESTIONS_PER_GRADE_PER_MODE; i += 1) {
      const target = targets[i];
      questions.push(buildInputQuestion(grade, target, i));
    }
  }

  return questions;
};

export const WORD_BUILDING_QUESTIONS_ALL: WordBuildingQuestion[] = buildQuestions();

export const WORD_BUILDING_QUESTIONS_PUBLISHED: WordBuildingQuestion[] =
  WORD_BUILDING_QUESTIONS_ALL.filter(question => question.quality.reviewStatus === "published");

export const WORD_BUILDING_QUESTION_BY_ID: Record<string, WordBuildingQuestion> =
  WORD_BUILDING_QUESTIONS_ALL.reduce<Record<string, WordBuildingQuestion>>((acc, question) => {
    acc[question.id] = question;
    return acc;
  }, {});

export const getWordBuildingQuestions = (
  grade: GradeBand,
  mode: WordBuildingMode
): WordBuildingQuestion[] => {
  return WORD_BUILDING_QUESTIONS_PUBLISHED.filter(
    question => question.grade === grade && question.mode === mode
  );
};

export const getCorrectAnswerText = (question: WordBuildingQuestion): string => {
  return getCorrectWordDisplay(question);
};

export const WORD_BUILDING_STATS = {
  allCount: WORD_BUILDING_QUESTIONS_ALL.length,
  publishedCount: WORD_BUILDING_QUESTIONS_PUBLISHED.length,
};

// Build-time guard to avoid silent under/overflow.
if (WORD_BUILDING_QUESTIONS_ALL.length !== 400) {
  throw new Error(`组词题库构建异常：期望 400 题，实际 ${WORD_BUILDING_QUESTIONS_ALL.length} 题`);
}
