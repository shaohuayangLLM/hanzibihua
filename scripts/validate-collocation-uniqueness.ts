import { WORD_COLLOCATION_QUESTIONS_V2 } from "../src/data/wordCollocationV2";

interface ValidationIssue {
  id: string;
  type: string;
  detail: string;
}

const normalize = (text: string): string =>
  text.replace(/\s+/g, "").replace(/[，。！？；：、“”‘’（）]/g, "");

const countOptionHits = (question: (typeof WORD_COLLOCATION_QUESTIONS_V2)[number]) => {
  const normalizedSentence = normalize(question.contextSentence);
  const connector = question.connector ?? "";

  const hits = question.options.map(option => {
    const candidate =
      question.answerMode === "phrase"
        ? `${question.left}${connector}${option.text}`
        : option.text;
    return normalizedSentence.includes(normalize(candidate));
  });

  const hitCount = hits.filter(Boolean).length;
  const correctIndex = question.options.findIndex(option => option.text === question.correct);
  const correctHit = correctIndex >= 0 ? hits[correctIndex] : false;

  return { hitCount, correctHit };
};

const issues: ValidationIssue[] = [];

for (const question of WORD_COLLOCATION_QUESTIONS_V2) {
  if (!question.competency || question.competency.trim().length < 4) {
    issues.push({
      id: question.id,
      type: "invalid-competency",
      detail: "competency 缺失或过短",
    });
  }

  if (!question.contextSentence || !question.stem) {
    issues.push({
      id: question.id,
      type: "missing-context-or-stem",
      detail: "contextSentence 或 stem 为空",
    });
  }

  if (question.options.length !== 4) {
    issues.push({
      id: question.id,
      type: "invalid-options-length",
      detail: `选项数量应为 4，实际为 ${question.options.length}`,
    });
  }

  if (!question.options.some(option => option.text === question.correct)) {
    issues.push({
      id: question.id,
      type: "correct-not-in-options",
      detail: `正确答案 ${question.correct} 不在选项中`,
    });
  }

  const optionSet = new Set(question.options.map(option => option.text));
  if (optionSet.size !== question.options.length) {
    issues.push({
      id: question.id,
      type: "duplicate-options",
      detail: "选项文本存在重复",
    });
  }

  if (!question.stem.includes("___")) {
    issues.push({
      id: question.id,
      type: "invalid-stem",
      detail: "题干不包含空位标记 ___",
    });
  }

  const { hitCount, correctHit } = countOptionHits(question);
  if (hitCount !== 1 || !correctHit) {
    issues.push({
      id: question.id,
      type: "non-unique-answer",
      detail: `命中数=${hitCount}, correctHit=${String(correctHit)}`,
    });
  }

  if (!question.uniquenessCheck.passed) {
    issues.push({
      id: question.id,
      type: "uniqueness-flag-failed",
      detail: "uniquenessCheck.passed 为 false",
    });
  }

  if (!question.uniquenessCheck.contextSignalPassed) {
    issues.push({
      id: question.id,
      type: "weak-context-signal",
      detail: question.uniquenessCheck.contextSignalNote ?? "contextSignalPassed 为 false",
    });
  }

  if (question.quality.reviewStatus === "draft" && question.uniquenessCheck.passed) {
    issues.push({
      id: question.id,
      type: "invalid-review-status",
      detail: "唯一性通过后 reviewStatus 不应为 draft",
    });
  }

  if (
    question.quality.reviewStatus === "published" &&
    question.quality.source !== "manual"
  ) {
    issues.push({
      id: question.id,
      type: "invalid-publish-source",
      detail: "published 题目必须来自 manual 源",
    });
  }

  const rationaleSet = new Set(question.feedback.rationales.map(r => r.option));
  if (rationaleSet.size !== question.options.length) {
    issues.push({
      id: question.id,
      type: "invalid-rationales",
      detail: "rationales 与选项数量不一致或存在重复",
    });
  }

  const correctRationale = question.feedback.rationales.find(r => r.isCorrect);
  if (!correctRationale || correctRationale.option !== question.correct) {
    issues.push({
      id: question.id,
      type: "invalid-correct-rationale",
      detail: "缺少正确答案解释或解释项不匹配 correct",
    });
  }

  for (const rationale of question.feedback.rationales) {
    if (!rationale.reason || rationale.reason.trim().length < 10) {
      issues.push({
        id: question.id,
        type: "weak-rationale",
        detail: `选项 ${rationale.option} 的解释过短`,
      });
    }
  }
}

const result = {
  total: WORD_COLLOCATION_QUESTIONS_V2.length,
  passed: issues.length === 0,
  issueCount: issues.length,
  issues,
};

console.log(JSON.stringify(result, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
