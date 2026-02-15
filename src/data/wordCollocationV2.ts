import { WORD_COLLOCATION_EXERCISES_NEW } from "./wordCollocationDataNew";
import type {
  CollocationAnswerMode,
  CollocationExercise,
  CollocationQuestionV2,
  OptionRationale,
} from "./wordCollocationTypes";
import { RATIONALE_OVERRIDES, hasRationaleOverride } from "./wordCollocationRationaleOverrides";

const COMPETENCY_BY_CATEGORY: Record<CollocationExercise["category"], string> = {
  "形容词+名词": "形容词用“的”修饰名词",
  "量词+名词": "量词与名词要固定搭配",
  "动词+宾语": "动词后面接合适宾语",
  "副词+动词": "副词修饰动词常用“地”",
  "副词+形容词": "副词表示程度修饰形容词",
  "名词合成词": "名词组合成常用复合词",
  "动词+补语": "补语说明动作结果或趋向",
};

const FORCE_DRAFT_REASON_BY_ID: Record<string, string> = {
  wc026: "高风险题：健康类句式可匹配多种食物，需改写选项",
  wc071: "高风险题：程度副词+近义形容词，当前选项存在多解",
  wc072: "高风险题：程度副词+近义形容词，当前选项存在多解",
  wc076: "高风险题：动词近义项并存，句式约束不足",
  wc082: "高风险题：程度副词+近义形容词，当前选项存在多解",
  wc085: "高风险题：程度副词+近义形容词，当前选项存在多解",
  wc088: "高风险题：地点类选项存在多个可成立答案",
  wc090: "高风险题：地点类选项存在多个可成立答案",
  wc092: "高风险题：学科类名词在“很难”语境下存在多解",
  wc094: "高风险题：地点类选项存在多个可成立答案",
  wc095: "高风险题：课程/场馆语义混合，句式约束不足",
  wc096: "高风险题：课程/场馆语义混合，句式约束不足",
  wc097: "高风险题：课程/场馆语义混合，句式约束不足",
  wc099: "高风险题：地点类选项存在多个可成立答案",
  wc106: "高风险题：补语近义项并存，句式约束不足",
  wc108: "高风险题：结果补语并存，句式约束不足",
  wc109: "高风险题：趋向补语并存，句式约束不足",
};

const buildCorrectReason = (exercise: CollocationExercise, phrase: string): string => {
  switch (exercise.category) {
    case "形容词+名词":
      return `“${phrase}”能清楚描述事物特点，符合“形容词+名词”的常用表达。`;
    case "量词+名词":
      return `“${phrase}”是常见量词搭配，数量表达准确。`;
    case "动词+宾语":
      return `“${phrase}”里动词和宾语搭配自然，句意完整。`;
    case "副词+动词":
      return `“${phrase}”用“地”连接动作方式，和句子语境最匹配。`;
    case "副词+形容词":
      return `“${phrase}”用于表示程度，能准确修饰形容词。`;
    case "名词合成词":
      return `“${phrase}”是常见固定词语，表达最自然。`;
    case "动词+补语":
      return `“${phrase}”补充了动作结果或趋向，句意更完整。`;
    default:
      return `“${phrase}”放在这个句子里最通顺。`;
  }
};

const buildWrongReason = (exercise: CollocationExercise, phrase: string): string => {
  switch (exercise.category) {
    case "形容词+名词":
      return `“${phrase}”在这里不能准确描述名词特点，不符合句子意思。`;
    case "量词+名词":
      return `“${phrase}”量词和名词搭配不当，这样说不自然。`;
    case "动词+宾语":
      return `“${phrase}”动词和宾语不匹配，动作对象不合适。`;
    case "副词+动词":
      return `“${phrase}”动作方式和语境不一致，不能准确表达“怎么做”。`;
    case "副词+形容词":
      return `“${phrase}”程度表达不贴合语境，形容不准确。`;
    case "名词合成词":
      return `“${phrase}”不是这里应使用的固定词语。`;
    case "动词+补语":
      return `“${phrase}”结果或趋向补充不合适，句意不完整。`;
    default:
      return `“${phrase}”放进这个句子不通顺。`;
  }
};

const CORE_PUNCTUATION_REGEX = /[\s，。！？；：、“”‘’（）]/g;
const END_PARTICLE_REGEX = /[了吗呢吧呀啊啦哦噢]/g;

const normalizeSentence = (text: string): string =>
  text.replace(CORE_PUNCTUATION_REGEX, "");

const countChars = (text: string): number => Array.from(text).length;

const replaceFirst = (source: string, target: string, replacement: string): string => {
  const idx = source.indexOf(target);
  if (idx === -1) return source;
  return `${source.slice(0, idx)}${replacement}${source.slice(idx + target.length)}`;
};

const splitStemByBlank = (stem: string): { before: string; after: string } | null => {
  const idx = stem.indexOf("___");
  if (idx === -1) return null;
  const before = normalizeSentence(stem.slice(0, idx));
  const after = normalizeSentence(stem.slice(idx + 3));
  return { before, after };
};

const evaluateContextSignal = (
  exercise: CollocationExercise,
  stem: string
): { passed: boolean; note?: string } => {
  const forcedReason = FORCE_DRAFT_REASON_BY_ID[exercise.id];
  if (forcedReason) {
    return {
      passed: false,
      note: forcedReason,
    };
  }

  const parts = splitStemByBlank(stem);
  if (!parts) {
    return {
      passed: false,
      note: "题干不包含空位标记",
    };
  }

  const beforeLength = countChars(parts.before);
  const afterCore = parts.after.replace(END_PARTICLE_REGEX, "");
  const afterLength = countChars(afterCore);
  const blankAtTail = afterLength === 0;
  const hasDateAnchor = /[一二三四五六七八九十0-9]+月[一二三四五六七八九十0-9]+日/.test(parts.before);
  const normalizedStem = stem.replace(/\s+/g, "");

  if (/^我喜欢___[。！？]?$/.test(normalizedStem)) {
    return {
      passed: false,
      note: "句式“我喜欢___”缺少限定信息，无法保证唯一答案",
    };
  }

  if (/^我最喜欢___[。！？]?$/.test(normalizedStem)) {
    return {
      passed: false,
      note: "句式“我最喜欢___”缺少限定信息，无法保证唯一答案",
    };
  }

  if (/^早上要自己___[。！？]?$/.test(normalizedStem)) {
    return {
      passed: false,
      note: "句式“早上要自己___”可搭配项过多，存在多解",
    };
  }

  if (/^我在___等你[。！？]?$/.test(normalizedStem)) {
    return {
      passed: false,
      note: "地点填空“我在___等你”语义过宽，无法唯一定位",
    };
  }

  if (/^___很美[。！？]?$/.test(normalizedStem)) {
    return {
      passed: false,
      note: "句式“___很美”语义过宽，无法唯一定位",
    };
  }

  if (exercise.category === "动词+宾语" && !((afterLength >= 2) || beforeLength >= 7)) {
    return {
      passed: false,
      note: "动词宾语语境锚点不足，多解风险高",
    };
  }

  if (exercise.category === "副词+动词" && afterLength < 2 && beforeLength < 5) {
    return {
      passed: false,
      note: "副词动词语境锚点不足，副词可搭配项过多",
    };
  }

  if (exercise.category === "副词+形容词" && afterLength < 2 && beforeLength <= 4) {
    return {
      passed: false,
      note: "副词形容词语境锚点不足，程度表达存在多解",
    };
  }

  if (exercise.category === "动词+补语" && afterLength < 2 && beforeLength < 6) {
    return {
      passed: false,
      note: "动补结构语境不足，结果补语难以唯一",
    };
  }

  if (exercise.category === "量词+名词" && afterLength < 2 && beforeLength < 6) {
    return {
      passed: false,
      note: "量词名词语境锚点不足，数量语境不够",
    };
  }

  if (
    exercise.category === "名词合成词" &&
    !hasDateAnchor &&
    afterLength < 2 &&
    beforeLength < 4
  ) {
    return {
      passed: false,
      note: "名词合成词缺少上下文锚点，复合词可能多解",
    };
  }

  if (exercise.category === "名词合成词" && blankAtTail && !hasDateAnchor && beforeLength <= 4) {
    return {
      passed: false,
      note: "名词合成词句末空位缺少限定，复合词可能多解",
    };
  }

  return { passed: true };
};

const buildContext = (exercise: CollocationExercise) => {
  const connector = exercise.connector ?? "";
  const phrase = `${exercise.left}${connector}${exercise.correct}`;
  const candidates: Array<{
    contextSentence: string;
    stem: string;
    blankTarget: string;
    answerMode: CollocationAnswerMode;
    score: number;
  }> = [];

  for (const example of exercise.examples) {
    const sentence = example.sentence;
    if (!sentence) continue;

    if (sentence.includes(phrase)) {
      const stem = replaceFirst(sentence, phrase, "___");
      const parts = splitStemByBlank(stem);
      const beforeLength = parts ? countChars(parts.before) : 0;
      const afterLength = parts ? countChars(parts.after.replace(END_PARTICLE_REGEX, "")) : 0;
      const score = beforeLength + afterLength * 4 + (afterLength >= 2 ? 8 : 0);
      candidates.push({
        contextSentence: sentence,
        stem,
        blankTarget: exercise.correct,
        answerMode: "phrase",
        score,
      });
      continue;
    }

    if (sentence.includes(exercise.correct)) {
      const stem = replaceFirst(sentence, exercise.correct, "___");
      const parts = splitStemByBlank(stem);
      const beforeLength = parts ? countChars(parts.before) : 0;
      const afterLength = parts ? countChars(parts.after.replace(END_PARTICLE_REGEX, "")) : 0;
      const score = beforeLength + afterLength * 3 + (afterLength >= 2 ? 6 : 0);
      candidates.push({
        contextSentence: sentence,
        stem,
        blankTarget: exercise.correct,
        answerMode: "word",
        score,
      });
    }
  }

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  return {
    contextSentence: best.contextSentence,
    stem: best.stem,
    blankTarget: best.blankTarget,
    answerMode: best.answerMode,
  };
};

const countHits = (
  sentence: string,
  exercise: CollocationExercise,
  mode: CollocationAnswerMode
): { hitCount: number; correctHit: boolean } => {
  const normalizedSentence = normalizeSentence(sentence);
  const connector = exercise.connector ?? "";

  const hits = exercise.options.map(option => {
    const candidate =
      mode === "phrase"
        ? `${exercise.left}${connector}${option.text}`
        : option.text;
    return normalizedSentence.includes(normalizeSentence(candidate));
  });

  const correctIdx = exercise.options.findIndex(option => option.text === exercise.correct);
  const correctHit = correctIdx >= 0 ? hits[correctIdx] : false;
  const hitCount = hits.filter(Boolean).length;

  return { hitCount, correctHit };
};

const buildRationales = (
  questionId: string,
  exercise: CollocationExercise,
  stem: string,
  contextSentence: string
): OptionRationale[] => {
  const connector = exercise.connector ?? "";

  return exercise.options.map(option => {
    const isCorrect = option.text === exercise.correct;
    const chosenPhrase = `${exercise.left}${connector}${option.text}`;
    const wrongSentence = replaceFirst(stem, "___", chosenPhrase);

    const override = RATIONALE_OVERRIDES[questionId]?.[option.text];

    return {
      option: option.text,
      isCorrect,
      reason: override?.reason ?? (isCorrect
        ? buildCorrectReason(exercise, chosenPhrase)
        : buildWrongReason(exercise, chosenPhrase)),
      contrastExample: isCorrect
        ? undefined
        : override?.contrastExample ?? `错误：${wrongSentence}；正确：${contextSentence}`,
    };
  });
};

export const buildCollocationQuestionV2 = (
  exercise: CollocationExercise,
  nowISO: string = new Date().toISOString()
): CollocationQuestionV2 | null => {
  const context = buildContext(exercise);
  if (!context) {
    return null;
  }

  const { hitCount, correctHit } = countHits(
    context.contextSentence,
    exercise,
    context.answerMode
  );

  const lexicalPassed = hitCount === 1 && correctHit;
  const contextSignal = evaluateContextSignal(exercise, context.stem);
  const passed = lexicalPassed && contextSignal.passed;
  const hasManual = hasRationaleOverride(exercise.id);
  const reviewStatus = passed ? (hasManual ? "reviewed" : "auto_checked") : "draft";

  return {
    ...exercise,
    competency: COMPETENCY_BY_CATEGORY[exercise.category],
    contextSentence: context.contextSentence,
    blankTarget: context.blankTarget,
    stem: context.stem,
    answerMode: context.answerMode,
    uniquenessCheck: {
      mode: "context-word",
      expectedMatchCount: 1,
      lastCheckedAt: nowISO,
      hitCount,
      correctHit,
      contextSignalPassed: contextSignal.passed,
      contextSignalNote: contextSignal.note,
      passed,
    },
    quality: {
      source: hasManual ? "manual" : "v1-adapted",
      reviewStatus,
      reviewerNote: hasManual
        ? "已应用人工精修解释"
        : contextSignal.note,
    },
    feedback: {
      tip: exercise.tip,
      rationales: buildRationales(exercise.id, exercise, context.stem, context.contextSentence),
    },
  };
};

export const WORD_COLLOCATION_QUESTIONS_V2_ALL: CollocationQuestionV2[] =
  WORD_COLLOCATION_EXERCISES_NEW
    .map(exercise => buildCollocationQuestionV2(exercise))
    .filter((question): question is CollocationQuestionV2 => question !== null);

export const WORD_COLLOCATION_QUESTIONS_V2: CollocationQuestionV2[] =
  WORD_COLLOCATION_QUESTIONS_V2_ALL.filter(question =>
    question.uniquenessCheck.passed
  );

export const WORD_COLLOCATION_QUESTIONS_V2_DRAFT: CollocationQuestionV2[] =
  WORD_COLLOCATION_QUESTIONS_V2_ALL.filter(question =>
    !question.uniquenessCheck.passed
    );
