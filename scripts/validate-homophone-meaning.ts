import {
  HOMOPHONE_MEANING_QUESTIONS_PUBLISHED,
  NEAR_SYNONYM_BLACKLIST,
} from "../src/data/homophoneMeaningQuestions";
import {
  GRADE_BANDS,
  HOMOPHONE_MODES,
  type GradeBand,
  type HomophoneMode,
} from "../src/data/homophoneMeaningTypes";

interface ValidationIssue {
  id: string;
  type: string;
  detail: string;
}

const issues: ValidationIssue[] = [];
const published = HOMOPHONE_MEANING_QUESTIONS_PUBLISHED;

const countBy = <T extends string>(items: T[]): Record<T, number> => {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
};

const nearSynonymSet = new Set(NEAR_SYNONYM_BLACKLIST.map(pair => [...pair].sort().join("#")));

const isNearSynonym = (a: string, b: string): boolean => {
  const key = [a, b].sort().join("#");
  return nearSynonymSet.has(key);
};

const stageByTotal: Record<number, { perGradeMode: number; difficulty: [number, number, number] }> = {
  120: { perGradeMode: 10, difficulty: [6, 3, 1] },
  360: { perGradeMode: 30, difficulty: [18, 9, 3] },
};

const stageConfig = stageByTotal[published.length];
if (!stageConfig) {
  issues.push({
    id: "GLOBAL",
    type: "invalid-total-count",
    detail: `发布题量应为 120 或 360，实际 ${published.length}`,
  });
}

const ids = new Set<string>();
for (const question of published) {
  if (ids.has(question.id)) {
    issues.push({ id: question.id, type: "duplicate-id", detail: "题目 ID 重复" });
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
      detail: `解析长度需在 12~60，当前 ${explanationLength}`,
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

    const optionTextSet = new Set(question.options.map(option => option.text));
    if (optionTextSet.size !== question.options.length) {
      issues.push({ id: question.id, type: "duplicate-options", detail: "选项存在重复" });
    }

    if (!optionTextSet.has(question.correct)) {
      issues.push({
        id: question.id,
        type: "missing-correct-option",
        detail: `正确答案 ${question.correct} 不在选项中`,
      });
    }

    const pinyinSet = new Set(question.options.map(option => option.pinyin));
    if (pinyinSet.size !== 1) {
      issues.push({
        id: question.id,
        type: "option-pinyin-mismatch",
        detail: "choice/context 题的4个选项拼音必须完全一致",
      });
    }

    if (!pinyinSet.has(question.targetPinyin)) {
      issues.push({
        id: question.id,
        type: "target-pinyin-mismatch",
        detail: "targetPinyin 与选项拼音不一致",
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
          detail: `stem 中 ___ 数量应为 1，实际 ${markerCount}`,
        });
      }
    }
  }

  if (question.mode === "input") {
    if (question.acceptedAnswers.length !== 1) {
      issues.push({
        id: question.id,
        type: "invalid-accepted-answers",
        detail: `acceptedAnswers 长度应为 1，实际 ${question.acceptedAnswers.length}`,
      });
    }
  }
}

if (stageConfig) {
  const gradeCounts = countBy(published.map(question => question.grade));
  const modeCounts = countBy(published.map(question => question.mode));
  const expectedPerGrade = stageConfig.perGradeMode * HOMOPHONE_MODES.length;
  const expectedPerMode = stageConfig.perGradeMode * GRADE_BANDS.length;

  for (const grade of GRADE_BANDS) {
    const gradeCount = gradeCounts[grade] ?? 0;
    if (gradeCount !== expectedPerGrade) {
      issues.push({
        id: "GLOBAL",
        type: "invalid-grade-count",
        detail: `${grade} 题量应为 ${expectedPerGrade}，实际 ${gradeCount}`,
      });
    }

    for (const mode of HOMOPHONE_MODES) {
      const scoped = published.filter(question => question.grade === grade && question.mode === mode);
      if (scoped.length !== stageConfig.perGradeMode) {
        issues.push({
          id: "GLOBAL",
          type: "invalid-grade-mode-count",
          detail: `${grade} + ${mode} 题量应为 ${stageConfig.perGradeMode}，实际 ${scoped.length}`,
        });
      }

      const byDifficulty = countBy(scoped.map(question => question.difficulty));
      const easyCount = byDifficulty.easy ?? 0;
      const mediumCount = byDifficulty.medium ?? 0;
      const hardCount = byDifficulty.hard ?? 0;
      const [expectedEasy, expectedMedium, expectedHard] = stageConfig.difficulty;

      if (easyCount !== expectedEasy || mediumCount !== expectedMedium || hardCount !== expectedHard) {
        issues.push({
          id: "GLOBAL",
          type: "invalid-difficulty-distribution",
          detail: `${grade} + ${mode} 难度应为 ${expectedEasy}/${expectedMedium}/${expectedHard}，实际 ${easyCount}/${mediumCount}/${hardCount}`,
        });
      }
    }
  }

  for (const mode of HOMOPHONE_MODES) {
    const modeCount = modeCounts[mode] ?? 0;
    if (modeCount !== expectedPerMode) {
      issues.push({
        id: "GLOBAL",
        type: "invalid-mode-count",
        detail: `${mode} 题量应为 ${expectedPerMode}，实际 ${modeCount}`,
      });
    }
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
