import {
  chooseTargetInGroup,
  compactMeaningClue,
  getGroupQuestionSource,
  getHomophoneGroupsByGrade,
  HOMOPHONE_GROUPS,
  type HomophoneGroup,
  type HomophoneLexiconEntry,
} from "./homophoneLexicon";
import type {
  GradeBand,
  HomophoneChoiceQuestion,
  HomophoneContextQuestion,
  HomophoneInputQuestion,
  HomophoneMode,
  HomophoneQuestion,
} from "./homophoneMeaningTypes";
import { COMPETENCY_LABELS, GRADE_BANDS, GRADE_LABELS, HOMOPHONE_MODES } from "./homophoneMeaningTypes";

const QUESTIONS_PER_GRADE_PER_MODE = 10;
const STAGE_TARGET_TOTAL = 120;

const getDifficulty = (index: number): "easy" | "medium" | "hard" => {
  if (index < 6) return "easy";
  if (index < 9) return "medium";
  return "hard";
};

const stableHash = (text: string): number => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const rankedBySeed = <T extends { word: string }>(items: T[], seed: string): T[] => {
  return [...items].sort((a, b) => {
    const delta = stableHash(`${seed}:${a.word}`) - stableHash(`${seed}:${b.word}`);
    if (delta !== 0) return delta;
    return a.word.localeCompare(b.word, "zh-Hans-CN");
  });
};

const ensureExplanationLength = (text: string): string => {
  const chars = Array.from(text);
  if (chars.length < 12) return `${text}，这样更准确。`;
  if (chars.length <= 60) return text;
  return `${chars.slice(0, 57).join("")}...`;
};

const inferCategory = (meaning: string): string => {
  if (/(学校|学习|课堂|老师|作业|读书)/.test(meaning)) return "学习";
  if (/(家|爸爸|妈妈|同学|朋友|孩子)/.test(meaning)) return "人物";
  if (/(地方|位置|门口|广场|公园|教室)/.test(meaning)) return "地点";
  if (/(春|夏|秋|冬|风|雨|雪|太阳|月亮)/.test(meaning)) return "自然";
  if (/(跑|跳|看|听|说|写|读)/.test(meaning)) return "动作";
  return "日常";
};

export const NEAR_SYNONYM_BLACKLIST: Array<[string, string]> = [
  ["立刻", "马上"],
  ["高兴", "开心"],
  ["美丽", "漂亮"],
  ["认真", "仔细"],
  ["帮助", "协助"],
  ["安静", "宁静"],
  ["快乐", "愉快"],
  ["聪明", "机灵"],
  ["困难", "艰难"],
  ["喜欢", "喜爱"],
];

const nearSynonymSet = new Set(NEAR_SYNONYM_BLACKLIST.map(pair => [...pair].sort().join("#")));

const isNearSynonym = (a: string, b: string): boolean => {
  const key = [a, b].sort().join("#");
  return nearSynonymSet.has(key);
};

const QUALIFIED_GROUPS = HOMOPHONE_GROUPS.filter(group => group.entries.length >= 4);

const pickGroupsByGrade = (): Record<GradeBand, HomophoneGroup[]> => {
  const result = {
    "grade1-vol1": [] as HomophoneGroup[],
    "grade1-vol2": [] as HomophoneGroup[],
    "grade2-vol1": [] as HomophoneGroup[],
    "grade2-vol2": [] as HomophoneGroup[],
  };

  for (const grade of GRADE_BANDS) {
    const { primary, extension } = getHomophoneGroupsByGrade(grade, 4);
    const selected = new Map<string, HomophoneGroup>();

    for (const group of [...primary, ...extension, ...QUALIFIED_GROUPS]) {
      if (selected.size >= QUESTIONS_PER_GRADE_PER_MODE) break;
      if (selected.has(group.pinyinKey)) continue;
      selected.set(group.pinyinKey, group);
    }

    const finalGroups = Array.from(selected.values())
      .sort((a, b) => a.pinyinKey.localeCompare(b.pinyinKey))
      .slice(0, QUESTIONS_PER_GRADE_PER_MODE);

    if (finalGroups.length < QUESTIONS_PER_GRADE_PER_MODE) {
      throw new Error(
        `同音词题库不足：${GRADE_LABELS[grade]} 仅有 ${finalGroups.length} 组，少于 ${QUESTIONS_PER_GRADE_PER_MODE}`
      );
    }

    result[grade] = finalGroups;
  }

  return result;
};

const pickOptions = (
  group: HomophoneGroup,
  target: HomophoneLexiconEntry,
  seed: string
): HomophoneLexiconEntry[] => {
  const candidates = group.entries.filter(entry => entry.word !== target.word);
  const safeCandidates = candidates.filter(entry => !isNearSynonym(target.word, entry.word));
  const rankedSafe = rankedBySeed(safeCandidates, `${seed}:safe`).slice(0, 3);

  if (rankedSafe.length === 3) {
    return rankedBySeed([target, ...rankedSafe], `${seed}:options`);
  }

  const fill = rankedBySeed(candidates, `${seed}:fill`).filter(
    entry => !rankedSafe.some(picked => picked.word === entry.word)
  );

  const merged = [target, ...rankedSafe, ...fill].slice(0, 4);
  return rankedBySeed(merged, `${seed}:options`);
};

const buildChoiceQuestion = (
  grade: GradeBand,
  group: HomophoneGroup,
  index: number
): HomophoneChoiceQuestion => {
  const target = chooseTargetInGroup(group, grade);
  const optionsEntries = pickOptions(group, target, `choice:${grade}:${target.word}`);

  const hasNearRisk = optionsEntries.some(
    option => option.word !== target.word && isNearSynonym(target.word, option.word)
  );

  const clue = compactMeaningClue(target.meaning);

  return {
    id: `hm-${grade}-choice-${String(index + 1).padStart(3, "0")}`,
    mode: "choice",
    grade,
    difficulty: getDifficulty(index),
    category: inferCategory(target.meaning),
    targetWord: target.word,
    targetPinyin: group.pinyin,
    competency: COMPETENCY_LABELS.choice,
    explanation: ensureExplanationLength(
      `“${target.word}”表示“${clue}”，与其同音的其他词语意思不同，要看词义来判断。`
    ),
    tags: [GRADE_LABELS[grade], "同音词", "辨义选择"],
    promptMeaning: `请选择表示“${clue}”的词语。`,
    options: optionsEntries.map(entry => ({ text: entry.word, pinyin: group.pinyin })),
    correct: target.word,
    quality: {
      source: getGroupQuestionSource(group, grade),
      reviewStatus: hasNearRisk ? "draft" : "published",
      reviewerNote: hasNearRisk ? "命中近义词黑名单，自动降级为草稿" : undefined,
    },
  };
};

const buildContextQuestion = (
  grade: GradeBand,
  group: HomophoneGroup,
  index: number
): HomophoneContextQuestion => {
  const target = chooseTargetInGroup(group, grade);
  const optionsEntries = pickOptions(group, target, `context:${grade}:${target.word}`);

  const hasNearRisk = optionsEntries.some(
    option => option.word !== target.word && isNearSynonym(target.word, option.word)
  );

  const clue = compactMeaningClue(target.meaning);
  const stem = `请在句子中选择表示“${clue}”的词：___。`;
  const contextSentence = `请在句子中选择表示“${clue}”的词：${target.word}。`;

  return {
    id: `hm-${grade}-context-${String(index + 1).padStart(3, "0")}`,
    mode: "context",
    grade,
    difficulty: getDifficulty(index),
    category: inferCategory(target.meaning),
    targetWord: target.word,
    targetPinyin: group.pinyin,
    competency: COMPETENCY_LABELS.context,
    explanation: ensureExplanationLength(
      `句子要表达“${clue}”，只有“${target.word}”符合语义，其余同音词语义不匹配。`
    ),
    tags: [GRADE_LABELS[grade], "同音词", "语境填空"],
    stem,
    contextSentence,
    options: optionsEntries.map(entry => ({ text: entry.word, pinyin: group.pinyin })),
    correct: target.word,
    quality: {
      source: getGroupQuestionSource(group, grade),
      reviewStatus: hasNearRisk ? "draft" : "published",
      reviewerNote: hasNearRisk ? "命中近义词黑名单，自动降级为草稿" : undefined,
    },
  };
};

const buildInputQuestion = (
  grade: GradeBand,
  group: HomophoneGroup,
  index: number
): HomophoneInputQuestion => {
  const target = chooseTargetInGroup(group, grade);
  const clue = compactMeaningClue(target.meaning);
  const firstChar = Array.from(target.word)[0] || "";

  return {
    id: `hm-${grade}-input-${String(index + 1).padStart(3, "0")}`,
    mode: "input",
    grade,
    difficulty: getDifficulty(index),
    category: inferCategory(target.meaning),
    targetWord: target.word,
    targetPinyin: group.pinyin,
    competency: COMPETENCY_LABELS.input,
    explanation: ensureExplanationLength(
      `输入题按精确匹配判分，表示“${clue}”且读音为“${group.pinyin}”的词语是“${target.word}”。`
    ),
    tags: [GRADE_LABELS[grade], "同音词", "输入作答"],
    prompt: `请写出读音为“${group.pinyin}”、表示“${clue}”的词语（1-2字），首字是“${firstChar}”。`,
    acceptedAnswers: [target.word],
    normalizeRule: "trim-lower-fullwidth",
    quality: {
      source: getGroupQuestionSource(group, grade),
      reviewStatus: "published",
    },
  };
};

const buildAllQuestions = (): HomophoneQuestion[] => {
  const groupsByGrade = pickGroupsByGrade();
  const all: HomophoneQuestion[] = [];

  for (const grade of GRADE_BANDS) {
    const groups = groupsByGrade[grade];

    for (let i = 0; i < QUESTIONS_PER_GRADE_PER_MODE; i += 1) {
      all.push(buildChoiceQuestion(grade, groups[i], i));
    }

    for (let i = 0; i < QUESTIONS_PER_GRADE_PER_MODE; i += 1) {
      all.push(buildContextQuestion(grade, groups[i], i));
    }

    for (let i = 0; i < QUESTIONS_PER_GRADE_PER_MODE; i += 1) {
      all.push(buildInputQuestion(grade, groups[i], i));
    }
  }

  return all;
};

export const HOMOPHONE_MEANING_QUESTIONS_ALL: HomophoneQuestion[] = buildAllQuestions();

export const HOMOPHONE_MEANING_QUESTIONS_PUBLISHED: HomophoneQuestion[] =
  HOMOPHONE_MEANING_QUESTIONS_ALL.filter(question => question.quality.reviewStatus === "published");

if (HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.length !== STAGE_TARGET_TOTAL) {
  throw new Error(
    `同音词辨义发布题量异常：期望 ${STAGE_TARGET_TOTAL}，实际 ${HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.length}`
  );
}

export const HOMOPHONE_MEANING_QUESTION_BY_ID: Record<string, HomophoneQuestion> =
  HOMOPHONE_MEANING_QUESTIONS_ALL.reduce<Record<string, HomophoneQuestion>>((acc, question) => {
    acc[question.id] = question;
    return acc;
  }, {});

export const getHomophoneMeaningQuestions = (
  grade: GradeBand,
  mode: HomophoneMode
): HomophoneQuestion[] => {
  return HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.filter(
    question => question.grade === grade && question.mode === mode
  );
};

export const getCorrectAnswerText = (question: HomophoneQuestion): string => {
  if (question.mode === "input") return question.acceptedAnswers[0] || "";
  return question.correct;
};

export const getHomophoneModeCounts = (): Record<HomophoneMode, number> => {
  return HOMOPHONE_MODES.reduce((acc, mode) => {
    acc[mode] = HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.filter(item => item.mode === mode).length;
    return acc;
  }, {} as Record<HomophoneMode, number>);
};
