import { HOMOPHONE_MEANING_QUESTIONS_V2_PUBLISHED } from "../src/data/homophoneMeaningV2";
import { GRADE_BANDS, HOMOPHONE_MODES, type HomophoneMode } from "../src/data/homophoneMeaningTypes";

interface ValidationIssue {
  id: string;
  type: string;
  detail: string;
}

const issues: ValidationIssue[] = [];
const published = HOMOPHONE_MEANING_QUESTIONS_V2_PUBLISHED;

const countBy = <T extends string>(items: T[]): Record<T, number> => {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
};

const stageByTotal: Record<number, { perGradeMode: number }> = {
  96: { perGradeMode: 8 },
  120: { perGradeMode: 10 },
  360: { perGradeMode: 30 },
};

const stageConfig = stageByTotal[published.length];
if (!stageConfig) {
  issues.push({
    id: "GLOBAL",
    type: "invalid-total-count",
    detail: `发布题量应为 96、120 或 360，实际 ${published.length}`,
  });
}

for (const question of published) {
  if (question.version !== "v2") {
    issues.push({
      id: question.id,
      type: "invalid-version",
      detail: `题目版本应为 v2，实际为 ${question.version}`,
    });
  }

  if (!question.learningObjective?.trim()) {
    issues.push({
      id: question.id,
      type: "missing-learning-objective",
      detail: "learningObjective 不能为空",
    });
  }

  if (!/^hp-[a-z0-9]+-(grade1-vol1|grade1-vol2|grade2-vol1|grade2-vol2|u\d{2})$/.test(question.knowledgePointId)) {
    issues.push({
      id: question.id,
      type: "invalid-knowledge-point-id",
      detail: `knowledgePointId 格式不合法：${question.knowledgePointId}`,
    });
  }

  if (question.contextQualityScore < 0 || question.contextQualityScore > 100) {
    issues.push({
      id: question.id,
      type: "invalid-context-quality-score",
      detail: `contextQualityScore 应在 0~100，实际 ${question.contextQualityScore}`,
    });
  }

  if (!question.evidence.sourceId?.trim() || !question.evidence.excerpt?.trim()) {
    issues.push({
      id: question.id,
      type: "missing-evidence",
      detail: "evidence.sourceId 与 evidence.excerpt 不能为空",
    });
  }

  if (question.mode === "choice" || question.mode === "context") {
    const distractorSet = new Set(question.options.filter(x => x.text !== question.correct).map(x => x.text));
    const rationaleSet = new Set(question.distractorRationales.map(x => x.option));
    if (question.distractorRationales.length !== 3) {
      issues.push({
        id: question.id,
        type: "invalid-distractor-rationale-count",
        detail: `choice/context 题应有 3 条 distractorRationales，实际 ${question.distractorRationales.length}`,
      });
    }
    for (const option of distractorSet) {
      if (!rationaleSet.has(option)) {
        issues.push({
          id: question.id,
          type: "missing-distractor-rationale",
          detail: `干扰项“${option}”缺少 rationale`,
        });
      }
    }

    if (question.acceptance.mode !== "exact") {
      issues.push({
        id: question.id,
        type: "invalid-acceptance-mode",
        detail: `${question.mode} 题 acceptance.mode 必须为 exact`,
      });
    }

    if (question.acceptance.answers.length !== 1 || question.acceptance.answers[0] !== question.correct) {
      issues.push({
        id: question.id,
        type: "invalid-acceptance-answer",
        detail: `${question.mode} 题 acceptance.answers 必须仅包含正确答案`,
      });
    }
  }

  if (question.mode === "context") {
    if (question.contextQualityScore < 30) {
      issues.push({
        id: question.id,
        type: "context-quality-too-low",
        detail: `context 题 contextQualityScore 需 >= 30，实际 ${question.contextQualityScore}`,
      });
    }
  }

  if (question.mode === "input") {
    if (question.acceptance.mode !== "normalized" && question.acceptance.mode !== "semantic-set") {
      issues.push({
        id: question.id,
        type: "invalid-input-acceptance-mode",
        detail: "input 题 acceptance.mode 必须为 normalized 或 semantic-set",
      });
    }
    if (question.acceptance.answers.length < 1) {
      issues.push({
        id: question.id,
        type: "invalid-input-acceptance-answers",
        detail: "input 题 acceptance.answers 至少 1 个",
      });
    }
  }
}

if (stageConfig) {
  const byMode = countBy(published.map(question => question.mode));

  if (published.length === 96) {
    const expectedByMode: Record<HomophoneMode, number> = {
      choice: 36,
      context: 36,
      input: 24,
    };
    for (const mode of HOMOPHONE_MODES) {
      if ((byMode[mode] ?? 0) !== expectedByMode[mode]) {
        issues.push({
          id: "GLOBAL",
          type: "invalid-mode-count",
          detail: `${mode} 题量应为 ${expectedByMode[mode]}，实际 ${byMode[mode] ?? 0}`,
        });
      }
    }

    const byKnowledgePoint = countBy(published.map(question => question.knowledgePointId));
    const knowledgeIds = Object.keys(byKnowledgePoint);
    if (knowledgeIds.length !== 12) {
      issues.push({
        id: "GLOBAL",
        type: "invalid-knowledge-point-count",
        detail: `知识点数量应为 12，实际 ${knowledgeIds.length}`,
      });
    }

    for (const knowledgePointId of knowledgeIds) {
      if ((byKnowledgePoint[knowledgePointId] ?? 0) !== 8) {
        issues.push({
          id: knowledgePointId,
          type: "invalid-knowledge-point-question-count",
          detail: `每个知识点题量应为 8，实际 ${byKnowledgePoint[knowledgePointId] ?? 0}`,
        });
      }
    }
  } else {
    const expectedPerMode = stageConfig.perGradeMode * GRADE_BANDS.length;
    for (const mode of HOMOPHONE_MODES) {
      if ((byMode[mode] ?? 0) !== expectedPerMode) {
        issues.push({
          id: "GLOBAL",
          type: "invalid-mode-count",
          detail: `${mode} 题量应为 ${expectedPerMode}，实际 ${byMode[mode] ?? 0}`,
        });
      }
    }

    for (const grade of GRADE_BANDS) {
      for (const mode of HOMOPHONE_MODES) {
        const scoped = published.filter(question => question.grade === grade && question.mode === mode);
        if (scoped.length !== stageConfig.perGradeMode) {
          issues.push({
            id: "GLOBAL",
            type: "invalid-grade-mode-count",
            detail: `${grade} + ${mode} 题量应为 ${stageConfig.perGradeMode}，实际 ${scoped.length}`,
          });
        }
      }
    }
  }

  const misconceptionCoverage = new Map<string, Set<string>>();
  for (const question of published) {
    if (question.mode !== "context" && question.mode !== "choice") continue;
    const key = question.knowledgePointId;
    const set = misconceptionCoverage.get(key) ?? new Set<string>();
    for (const rationale of question.distractorRationales) {
      if (rationale.misconceptionType) set.add(rationale.misconceptionType);
    }
    misconceptionCoverage.set(key, set);
  }

  for (const [knowledgePointId, types] of misconceptionCoverage.entries()) {
    if (types.size < 1) {
      issues.push({
        id: knowledgePointId,
        type: "missing-misconception-coverage",
        detail: "每个知识点至少覆盖 1 类 misconceptionType",
      });
    }
  }
}

const byModeContextScore = published
  .filter(question => question.mode === "context")
  .reduce<Record<HomophoneMode | "context", { min: number; max: number; avg: number; total: number }>>(
    (acc, question) => {
      const k: HomophoneMode | "context" = "context";
      const prev = acc[k];
      if (!prev) {
        acc[k] = { min: question.contextQualityScore, max: question.contextQualityScore, avg: 0, total: 1 };
      } else {
        prev.min = Math.min(prev.min, question.contextQualityScore);
        prev.max = Math.max(prev.max, question.contextQualityScore);
        prev.total += 1;
      }
      return acc;
    },
    {}
  );

if (byModeContextScore.context) {
  const stats = byModeContextScore.context;
  const totalScore = published
    .filter(question => question.mode === "context")
    .reduce((sum, question) => sum + question.contextQualityScore, 0);
  stats.avg = Math.round((totalScore / Math.max(stats.total, 1)) * 100) / 100;
}

const result = {
  total: published.length,
  passed: issues.length === 0,
  issueCount: issues.length,
  contextQualityStats: byModeContextScore.context ?? null,
  issues,
};

console.log(JSON.stringify(result, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
