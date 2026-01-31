/**
 * 拼音组合数据导出入口
 */

import type { CombinationData } from "@/types/pinyin";

// 导出各声母分组数据
export { lipInitialsData } from "./groups/lipInitials";
export { tipInitialsData } from "./groups/tipInitials";
export { rootInitialsData } from "./groups/rootInitials";
export { tongueInitialsData } from "./groups/tongueInitials";
export { curlInitialsData } from "./groups/curlInitials";
export { flatInitialsData } from "./groups/flatInitials";

// 导出规则函数
export {
  isInvalidCombination,
  VALID_INITIALS,
  VALID_FINALS,
  INITIAL_GROUPS_DEFINITION,
  INITIAL_GROUP_LABELS,
  getInitialGroup,
} from "./invalidRules";

// 合并所有组合数据（用于兼容旧代码）
import { lipInitialsData } from "./groups/lipInitials";
import { tipInitialsData } from "./groups/tipInitials";
import { rootInitialsData } from "./groups/rootInitials";
import { tongueInitialsData } from "./groups/tongueInitials";
import { curlInitialsData } from "./groups/curlInitials";
import { flatInitialsData } from "./groups/flatInitials";

/**
 * 获取指定分组的组合数据（按字母顺序分组映射到原有数据）
 */
export const getGroupData = (group: keyof typeof INITIAL_GROUPS_DEFINITION): CombinationData => {
  switch (group) {
    case "group1":
      return lipInitialsData;      // b, p, m, f
    case "group2":
      return tipInitialsData;      // d, t, n, l
    case "group3":
      return rootInitialsData;    // g, k, h
    case "group4":
      return tongueInitialsData;  // j, q, x
    case "group5":
      return curlInitialsData;    // zh, ch, sh, r
    case "group6":
      return flatInitialsData;    // z, c, s
    default:
      return {};
  }
};

/**
 * 获取声母分组的声母列表
 */
export const getGroupInitials = (group: keyof typeof INITIAL_GROUPS_DEFINITION): string[] => {
  return INITIAL_GROUPS_DEFINITION[group];
};

// 导出分组定义类型
import { INITIAL_GROUPS_DEFINITION, INITIAL_GROUP_LABELS } from "./invalidRules";
export type InitialGroup = keyof typeof INITIAL_GROUPS_DEFINITION;

/**
 * 声母分组列表（用于 UI Tab）
 */
export const INITIAL_GROUPS = Object.keys(INITIAL_GROUPS_DEFINITION) as InitialGroup[];
