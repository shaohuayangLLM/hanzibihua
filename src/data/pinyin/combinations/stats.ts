/**
 * 拼音组合数据统计脚本
 * 用于验证和统计有效组合数量
 */

import { isInvalidCombination, VALID_INITIALS, VALID_FINALS, INITIAL_GROUPS_DEFINITION } from "./invalidRules";

// 统计每个分组的有效组合数量
const stats = {
  totalPossible: VALID_INITIALS.length * VALID_FINALS.length,
  validCombinations: 0,
  invalidCombinations: 0,
  byGroup: {} as Record<string, { valid: number; invalid: number }>,
};

// 初始化分组统计
for (const group of Object.keys(INITIAL_GROUPS_DEFINITION)) {
  stats.byGroup[group] = { valid: 0, invalid: 0 };
}

// 遍历所有可能的声母韵母组合
for (const initial of VALID_INITIALS) {
  // 确定声母所属分组
  let group: string | null = null;
  for (const [groupName, initials] of Object.entries(INITIAL_GROUPS_DEFINITION)) {
    if (initials.includes(initial)) {
      group = groupName;
      break;
    }
  }

  for (const final of VALID_FINALS) {
    if (isInvalidCombination(initial, final)) {
      stats.invalidCombinations++;
      if (group) stats.byGroup[group].invalid++;
    } else {
      stats.validCombinations++;
      if (group) stats.byGroup[group].valid++;
    }
  }
}

console.log("=== 拼音组合数据统计 ===\n");
console.log(`理论最大组合数: ${stats.totalPossible}`);
console.log(`有效组合数: ${stats.validCombinations}`);
console.log(`无效组合数: ${stats.invalidCombinations}`);
console.log(`有效率: ${((stats.validCombinations / stats.totalPossible) * 100).toFixed(1)}%\n`);

console.log("=== 各分组统计 ===");
const groupLabels: Record<string, string> = {
  lip: "唇音",
  tip: "舌尖音",
  root: "舌根音",
  tongue: "舌面音",
  curl: "翘舌音",
  flat: "平舌音",
};

for (const [group, data] of Object.entries(stats.byGroup)) {
  const label = groupLabels[group] || group;
  const total = data.valid + data.invalid;
  console.log(`${label}(${group}): 有效=${data.valid}, 无效=${data.invalid}, 总计=${total}`);
}

// 导出统计结果
export const combinationStats = stats;
