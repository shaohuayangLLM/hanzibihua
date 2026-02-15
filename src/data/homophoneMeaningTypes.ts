export type HomophoneMode = "choice" | "context" | "input";

export type GradeBand =
  | "grade1-vol1"
  | "grade1-vol2"
  | "grade2-vol1"
  | "grade2-vol2";

export type ReviewStatus = "draft" | "reviewed" | "published";

export interface HomophoneOption {
  text: string;
  pinyin: string;
}

export interface HomophoneQuestionBase {
  id: string;
  mode: HomophoneMode;
  grade: GradeBand;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  targetWord: string;
  targetPinyin: string;
  competency: "字义辨析" | "语境应用" | "主动输出";
  explanation: string;
  tags: string[];
  quality: {
    source: "textbook" | "common-extended";
    reviewStatus: ReviewStatus;
    reviewerNote?: string;
  };
}

export interface HomophoneChoiceQuestion extends HomophoneQuestionBase {
  mode: "choice";
  promptMeaning: string;
  options: HomophoneOption[];
  correct: string;
}

export interface HomophoneContextQuestion extends HomophoneQuestionBase {
  mode: "context";
  stem: string;
  contextSentence: string;
  options: HomophoneOption[];
  correct: string;
}

export interface HomophoneInputQuestion extends HomophoneQuestionBase {
  mode: "input";
  prompt: string;
  acceptedAnswers: string[];
  normalizeRule: "trim-lower-fullwidth";
}

export type HomophoneQuestion =
  | HomophoneChoiceQuestion
  | HomophoneContextQuestion
  | HomophoneInputQuestion;

export interface HomophoneWrongRecord {
  questionId: string;
  mode: HomophoneMode;
  grade: GradeBand;
  selected: string;
  correct: string;
  targetWord: string;
  createdAt: string;
}

export const HOMOPHONE_MODES: HomophoneMode[] = ["choice", "context", "input"];

export const GRADE_BANDS: GradeBand[] = [
  "grade1-vol1",
  "grade1-vol2",
  "grade2-vol1",
  "grade2-vol2",
];

export const GRADE_LABELS: Record<GradeBand, string> = {
  "grade1-vol1": "一年级上册",
  "grade1-vol2": "一年级下册",
  "grade2-vol1": "二年级上册",
  "grade2-vol2": "二年级下册",
};

export const MODE_LABELS: Record<HomophoneMode, string> = {
  choice: "辨义选择",
  context: "语境填空",
  input: "输入作答",
};

export const COMPETENCY_LABELS: Record<HomophoneMode, HomophoneQuestionBase["competency"]> = {
  choice: "字义辨析",
  context: "语境应用",
  input: "主动输出",
};
