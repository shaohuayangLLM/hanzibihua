import {
  WORD_COLLOCATION_QUESTIONS_V2,
  WORD_COLLOCATION_QUESTIONS_V2_ALL,
  WORD_COLLOCATION_QUESTIONS_V2_DRAFT,
} from "../src/data/wordCollocationV2";

const countBy = <T extends string>(items: T[]): Record<T, number> => {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
};

const byCategory = countBy(WORD_COLLOCATION_QUESTIONS_V2.map(q => q.category));
const byDifficulty = countBy(WORD_COLLOCATION_QUESTIONS_V2.map(q => q.difficulty));
const byReviewStatus = countBy(WORD_COLLOCATION_QUESTIONS_V2_ALL.map(q => q.quality.reviewStatus));
const bySource = countBy(WORD_COLLOCATION_QUESTIONS_V2_ALL.map(q => q.quality.source));
const draftReasons = countBy(
  WORD_COLLOCATION_QUESTIONS_V2_DRAFT.map(
    q => q.uniquenessCheck.contextSignalNote ?? "other"
  )
);

const weakRationaleQuestions = WORD_COLLOCATION_QUESTIONS_V2.filter(q =>
  q.feedback.rationales.some(r => r.reason.trim().length < 12)
).map(q => q.id);

const reportLines: string[] = [];
reportLines.push("# Collocation Quality Report");
reportLines.push("");
reportLines.push(`- total(all): ${WORD_COLLOCATION_QUESTIONS_V2_ALL.length}`);
reportLines.push(`- total(passed): ${WORD_COLLOCATION_QUESTIONS_V2.length}`);
reportLines.push(`- total(draft): ${WORD_COLLOCATION_QUESTIONS_V2_DRAFT.length}`);
reportLines.push("");
reportLines.push("## by category");
for (const [key, value] of Object.entries(byCategory)) {
  reportLines.push(`- ${key}: ${value}`);
}
reportLines.push("");
reportLines.push("## by difficulty");
for (const [key, value] of Object.entries(byDifficulty)) {
  reportLines.push(`- ${key}: ${value}`);
}
reportLines.push("");
reportLines.push("## by review status");
for (const [key, value] of Object.entries(byReviewStatus)) {
  reportLines.push(`- ${key}: ${value}`);
}
reportLines.push("");
reportLines.push("## by source");
for (const [key, value] of Object.entries(bySource)) {
  reportLines.push(`- ${key}: ${value}`);
}
reportLines.push("");
reportLines.push("## draft reasons");
for (const [key, value] of Object.entries(draftReasons)) {
  reportLines.push(`- ${key}: ${value}`);
}
reportLines.push("");
reportLines.push("## weak rationale candidates (<12 chars)");
if (weakRationaleQuestions.length === 0) {
  reportLines.push("- none");
} else {
  for (const id of weakRationaleQuestions) {
    reportLines.push(`- ${id}`);
  }
}

console.log(reportLines.join("\n"));
