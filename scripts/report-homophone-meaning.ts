import {
  HOMOPHONE_MEANING_QUESTIONS_ALL,
  HOMOPHONE_MEANING_QUESTIONS_PUBLISHED,
} from "../src/data/homophoneMeaningQuestions";

const countBy = <T extends string>(items: T[]): Record<T, number> => {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
};

const byGrade = countBy(HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.map(question => question.grade));
const byMode = countBy(HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.map(question => question.mode));
const byDifficulty = countBy(HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.map(question => question.difficulty));
const bySource = countBy(HOMOPHONE_MEANING_QUESTIONS_ALL.map(question => question.quality.source));
const byReviewStatus = countBy(HOMOPHONE_MEANING_QUESTIONS_ALL.map(question => question.quality.reviewStatus));

const lines: string[] = [];
lines.push("# Homophone Meaning Quality Report");
lines.push("");
lines.push(`- total(all): ${HOMOPHONE_MEANING_QUESTIONS_ALL.length}`);
lines.push(`- total(published): ${HOMOPHONE_MEANING_QUESTIONS_PUBLISHED.length}`);
lines.push("");

lines.push("## by grade");
for (const [grade, count] of Object.entries(byGrade)) {
  lines.push(`- ${grade}: ${count}`);
}
lines.push("");

lines.push("## by mode");
for (const [mode, count] of Object.entries(byMode)) {
  lines.push(`- ${mode}: ${count}`);
}
lines.push("");

lines.push("## by difficulty");
for (const [difficulty, count] of Object.entries(byDifficulty)) {
  lines.push(`- ${difficulty}: ${count}`);
}
lines.push("");

lines.push("## by source");
for (const [source, count] of Object.entries(bySource)) {
  lines.push(`- ${source}: ${count}`);
}
lines.push("");

lines.push("## by review status");
for (const [status, count] of Object.entries(byReviewStatus)) {
  lines.push(`- ${status}: ${count}`);
}

console.log(lines.join("\n"));
