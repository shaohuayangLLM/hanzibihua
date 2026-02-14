export type WordBuildingMode = "choice" | "drag" | "context" | "input";

export type GradeBand =
  | "grade1-vol1"
  | "grade1-vol2"
  | "grade2-vol1"
  | "grade2-vol2";

export type ReviewStatus = "draft" | "reviewed" | "published";

export interface WordBuildingQuestionBase {
  id: string;
  mode: WordBuildingMode;
  grade: GradeBand;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  targetWord: string;
  targetPinyin: string;
  competency: string;
  explanation: string;
  tags: string[];
  quality: {
    source: "textbook" | "common-extended";
    reviewStatus: ReviewStatus;
    reviewerNote?: string;
  };
}

export interface WordBuildingOption {
  text: string;
  pinyin: string;
}

export interface ChoiceQuestion extends WordBuildingQuestionBase {
  mode: "choice";
  promptChar: string;
  options: WordBuildingOption[];
  correct: string;
}

export interface DragQuestion extends WordBuildingQuestionBase {
  mode: "drag";
  tiles: string[];
  correctOrder: string[];
}

export interface ContextQuestion extends WordBuildingQuestionBase {
  mode: "context";
  stem: string;
  contextSentence: string;
  options: WordBuildingOption[];
  correct: string;
}

export interface InputQuestion extends WordBuildingQuestionBase {
  mode: "input";
  prompt: string;
  acceptedAnswers: string[];
  normalizeRule: "trim-lower-fullwidth";
}

export type WordBuildingQuestion =
  | ChoiceQuestion
  | DragQuestion
  | ContextQuestion
  | InputQuestion;

export interface WordBuildingWrongRecord {
  questionId: string;
  mode: WordBuildingMode;
  grade: GradeBand;
  selected: string;
  correct: string;
  targetWord: string;
  createdAt: string;
}

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

export const MODE_LABELS: Record<WordBuildingMode, string> = {
  choice: "单字组选",
  drag: "拼字成词",
  context: "语境选词",
  input: "开放输入",
};
