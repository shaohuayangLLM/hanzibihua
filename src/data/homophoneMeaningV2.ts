import {
  HOMOPHONE_MEANING_QUESTIONS_ALL,
  HOMOPHONE_MEANING_QUESTIONS_PUBLISHED,
} from "./homophoneMeaningQuestions";
import { HOMOPHONE_MEANING_QUESTIONS_V2_REDESIGNED } from "./homophoneMeaningV2Bank";
import type {
  GradeBand,
  HomophoneQuestion,
  HomophoneQuestionV2,
  HomophoneQuestionV2Base,
  HomophoneMode,
  MisconceptionType,
} from "./homophoneMeaningTypes";

const toPinyinKey = (value: string): string => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ü/g, "v")
    .replace(/\s+/g, "")
    .toLowerCase()
    .trim();
};

const inferKnowledgePointId = (question: HomophoneQuestion): string => {
  return `hp-${toPinyinKey(question.targetPinyin)}-${question.grade}`;
};

const inferLearningObjective = (question: HomophoneQuestion): string => {
  if (question.mode === "choice") {
    return `区分“${question.targetWord}”与同音词的核心义项`;
  }
  if (question.mode === "context") {
    return `在语境中正确使用“${question.targetWord}”`;
  }
  return `根据读音与语义主动产出“${question.targetWord}”`;
};

const inferMisconceptionType = (question: HomophoneQuestion): MisconceptionType | undefined => {
  if (question.mode === "choice") return "近义误判";
  if (question.mode === "context") return "语境忽略";
  return "字形联想";
};

const inferContextQualityScore = (question: HomophoneQuestion): number => {
  if (question.mode !== "context") return 0;
  if (question.stem.includes("请选择表示")) return 35;
  return 70;
};

const buildDistractorRationales = (question: HomophoneQuestion): HomophoneQuestionV2Base["distractorRationales"] => {
  if (question.mode === "input") return [];

  return question.options
    .filter(option => option.text !== question.correct)
    .map(option => ({
      option: option.text,
      reason: `“${option.text}”与正确答案同音但语义不同，易因读音相同造成误选。`,
      misconceptionType: question.mode === "context" ? "语境忽略" : "近义误判",
    }));
};

const toAcceptance = (question: HomophoneQuestion): HomophoneQuestionV2Base["acceptance"] => {
  if (question.mode === "input") {
    return {
      mode: "normalized",
      answers: [...question.acceptedAnswers],
      normalizeRule: question.normalizeRule,
    };
  }

  return {
    mode: "exact",
    answers: [question.correct],
  };
};

const toV2 = (question: HomophoneQuestion): HomophoneQuestionV2 => {
  const base: HomophoneQuestionV2Base = {
    ...question,
    version: "v2",
    learningObjective: inferLearningObjective(question),
    knowledgePointId: inferKnowledgePointId(question),
    misconceptionType: inferMisconceptionType(question),
    contextQualityScore: inferContextQualityScore(question),
    distractorRationales: buildDistractorRationales(question),
    evidence: {
      sourceType: question.quality.source === "textbook" ? "textbook" : "editorial",
      sourceId: question.quality.source === "textbook" ? question.grade : "common-extended",
      excerpt: question.explanation,
    },
    acceptance: toAcceptance(question),
  };

  return base as HomophoneQuestionV2;
};

export const HOMOPHONE_MEANING_QUESTIONS_V2_ALL: HomophoneQuestionV2[] =
  [
    ...HOMOPHONE_MEANING_QUESTIONS_V2_REDESIGNED,
    ...HOMOPHONE_MEANING_QUESTIONS_ALL.map(toV2).map(question => ({
      ...question,
      quality: {
        ...question.quality,
        reviewStatus: "draft" as const,
      },
    })),
  ];

export const HOMOPHONE_MEANING_QUESTIONS_V2_PUBLISHED: HomophoneQuestionV2[] =
  HOMOPHONE_MEANING_QUESTIONS_V2_REDESIGNED;

export const HOMOPHONE_MEANING_QUESTIONS_V2_LEGACY_MIGRATED: HomophoneQuestionV2[] =
  HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.map(toV2);

export const HOMOPHONE_MEANING_QUESTION_V2_BY_ID: Record<string, HomophoneQuestionV2> =
  HOMOPHONE_MEANING_QUESTIONS_V2_ALL.reduce<Record<string, HomophoneQuestionV2>>((acc, question) => {
    acc[question.id] = question;
    return acc;
  }, {});

export const getHomophoneMeaningQuestionsV2 = (
  grade: GradeBand,
  mode: HomophoneMode
): HomophoneQuestionV2[] => {
  return HOMOPHONE_MEANING_QUESTIONS_V2_PUBLISHED.filter(
    question => question.grade === grade && question.mode === mode
  );
};

export const getCorrectAnswerTextV2 = (question: HomophoneQuestionV2): string => {
  if (question.mode === "input") return question.acceptedAnswers[0] || "";
  return question.correct;
};
