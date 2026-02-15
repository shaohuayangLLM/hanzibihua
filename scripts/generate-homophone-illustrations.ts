import fs from "node:fs";
import path from "node:path";
import { HOMOPHONE_VISUAL_LESSONS } from "../src/data/homophoneMeaningV2Bank";

const OUTPUT_DIR = path.resolve(process.cwd(), "public/homophone-illustrations");

const escapeXml = (input: string): string =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const createSvg = (params: {
  word: string;
  pinyin: string;
  meaning: string;
  example: string;
  emoji: string;
}): string => {
  const { word, pinyin, meaning, example, emoji } = params;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="280" viewBox="0 0 420 280">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7e9cc"/>
      <stop offset="100%" stop-color="#ecd4aa"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="412" height="272" rx="14" fill="url(#bg)" stroke="#b07aa1" stroke-width="3"/>
  <text x="26" y="42" font-size="28" font-family="serif" fill="#2b2117">${escapeXml(emoji)} ${escapeXml(pinyin)}</text>
  <rect x="28" y="58" width="96" height="96" fill="#f8efd8" stroke="#b07aa1" stroke-width="3"/>
  <text x="76" y="126" text-anchor="middle" font-size="64" font-family="serif" fill="#21180f">${escapeXml(word)}</text>
  <text x="146" y="92" font-size="24" font-family="sans-serif" fill="#2b2117">字义</text>
  <text x="146" y="126" font-size="20" font-family="sans-serif" fill="#2b2117">${escapeXml(meaning)}</text>
  <text x="28" y="194" font-size="22" font-family="sans-serif" fill="#2b2117">示例句</text>
  <text x="28" y="228" font-size="18" font-family="sans-serif" fill="#2b2117">${escapeXml(example)}</text>
  <text x="28" y="258" font-size="14" font-family="sans-serif" fill="#6f5a43">K12 同音不同字学习卡</text>
</svg>
`;
};

const main = () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;
  for (const lesson of HOMOPHONE_VISUAL_LESSONS) {
    const unitId = lesson.knowledgePointId.split("-").pop() || "u00";
    lesson.items.forEach((item, index) => {
      const key = `w${index + 1}`;
      const fileName = `${unitId}-${key}.svg`;
      const outputPath = path.join(OUTPUT_DIR, fileName);
      const svg = createSvg({
        word: item.word,
        pinyin: lesson.pinyin,
        meaning: item.meaning,
        example: item.example,
        emoji: item.illustrationEmoji,
      });
      fs.writeFileSync(outputPath, svg, "utf8");
      count += 1;
    });
  }

  console.log(`Generated ${count} SVG cards in ${OUTPUT_DIR}`);
};

main();

