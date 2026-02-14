import {
  NEAR_SYNONYM_BLACKLIST,
  WORD_BUILDING_QUESTIONS_PUBLISHED,
} from "../src/data/wordBuildingQuestions";
import { GRADE_BANDS, type GradeBand, type WordBuildingMode } from "../src/data/wordBuildingTypes";

interface ValidationIssue {
  id: string;
  type: string;
  detail: string;
}

const issues: ValidationIssue[] = [];

const modes: WordBuildingMode[] = ["choice", "drag", "context", "input"];

const nearSynonymSet = new Set(
  NEAR_SYNONYM_BLACKLIST.map(pair => [...pair].sort().join("#"))
);

const isNearSynonym = (a: string, b: string): boolean => {
  const key = [a, b].sort().join("#");
  return nearSynonymSet.has(key);
};

const published = WORD_BUILDING_QUESTIONS_PUBLISHED;

if (published.length !== 400) {
  issues.push({
    id: "GLOBAL",
    type: "invalid-total-count",
    detail: `发布题量应为 400，实际为 ${published.length}`,
  });
}

const ids = new Set<string>();
for (const question of published) {
  if (ids.has(question.id)) {
    issues.push({
      id: question.id,
      type: "duplicate-id",
      detail: "题目 ID 重复",
    });
  }
  ids.add(question.id);

  if (question.quality.reviewStatus !== "published") {
    issues.push({
      id: question.id,
      type: "invalid-review-status",
      detail: `发布题 reviewStatus 必须为 published，实际为 ${question.quality.reviewStatus}`,
    });
  }

  const explanationLength = Array.from(question.explanation || "").length;
  if (explanationLength < 12 || explanationLength > 60) {
    issues.push({
      id: question.id,
      type: "invalid-explanation-length",
      detail: `解析长度需在 12~60 之间，当前 ${explanationLength}`,
    });
  }

  if (question.mode === "choice" || question.mode === "context") {
    if (question.options.length !== 4) {
      issues.push({
        id: question.id,
        type: "invalid-options-length",
        detail: `选项数量应为 4，实际为 ${question.options.length}`,
      });
    }

    const optionSet = new Set(question.options.map(option => option.text));
    if (optionSet.size !== question.options.length) {
      issues.push({
        id: question.id,
        type: "duplicate-options",
        detail: "选项存在重复",
      });
    }

    if (!optionSet.has(question.correct)) {
      issues.push({
        id: question.id,
        type: "missing-correct-option",
        detail: `正确答案 ${question.correct} 不在选项中`,
      });
    }

    for (const option of question.options) {
      if (option.text === question.correct) continue;
      if (isNearSynonym(question.correct, option.text)) {
        issues.push({
          id: question.id,
          type: "near-synonym-risk",
          detail: `干扰项“${option.text}”与正确项“${question.correct}”近义过近`,
        });
      }
    }

    if (question.mode === "context") {
      const markerCount = (question.stem.match(/___/g) || []).length;
      if (markerCount !== 1) {
        issues.push({
          id: question.id,
          type: "invalid-stem-marker-count",
          detail: `stem 中 ___ 数量应为 1，实际为 ${markerCount}`,
        });
      }
    }
  }

  if (question.mode === "drag") {
    if (question.tiles.length !== question.correctOrder.length) {
      issues.push({
        id: question.id,
        type: "drag-length-mismatch",
        detail: "tiles 与 correctOrder 长度不一致",
      });
    }

    const tilesSorted = [...question.tiles].sort().join("");
    const correctSorted = [...question.correctOrder].sort().join("");
    if (tilesSorted !== correctSorted) {
      issues.push({
        id: question.id,
        type: "drag-char-mismatch",
        detail: "tiles 与 correctOrder 字符集合不一致",
      });
    }
  }

  if (question.mode === "input") {
    if (question.acceptedAnswers.length !== 1) {
      issues.push({
        id: question.id,
        type: "invalid-accepted-answers",
        detail: `acceptedAnswers 长度应为 1，实际为 ${question.acceptedAnswers.length}`,
      });
    }
  }
}

const countBy = <T extends string>(items: T[]): Record<T, number> => {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
};

const gradeCounts = countBy(published.map(question => question.grade));
const modeCounts = countBy(published.map(question => question.mode));

for (const grade of GRADE_BANDS) {
  const gradeCount = gradeCounts[grade] ?? 0;
  if (gradeCount !== 100) {
    issues.push({
      id: "GLOBAL",
      type: "invalid-grade-count",
      detail: `${grade} 题量应为 100，实际为 ${gradeCount}`,
    });
  }

  for (const mode of modes) {
    const scoped = published.filter(question => question.grade === grade && question.mode === mode);
    if (scoped.length !== 25) {
      issues.push({
        id: "GLOBAL",
        type: "invalid-grade-mode-count",
        detail: `${grade} + ${mode} 题量应为 25，实际为 ${scoped.length}`,
      });
    }

    const byDifficulty = countBy(scoped.map(question => question.difficulty));
    const easyCount = byDifficulty.easy ?? 0;
    const mediumCount = byDifficulty.medium ?? 0;
    const hardCount = byDifficulty.hard ?? 0;

    if (easyCount !== 15 || mediumCount !== 8 || hardCount !== 2) {
      issues.push({
        id: "GLOBAL",
        type: "invalid-difficulty-distribution",
        detail: `${grade} + ${mode} 难度分布应为 15/8/2，实际为 ${easyCount}/${mediumCount}/${hardCount}`,
      });
    }
  }
}

for (const mode of modes) {
  const modeCount = modeCounts[mode] ?? 0;
  if (modeCount !== 100) {
    issues.push({
      id: "GLOBAL",
      type: "invalid-mode-count",
      detail: `${mode} 题量应为 100，实际为 ${modeCount}`,
    });
  }
}

const result = {
  total: published.length,
  passed: issues.length === 0,
  issueCount: issues.length,
  issues,
};

console.log(JSON.stringify(result, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
