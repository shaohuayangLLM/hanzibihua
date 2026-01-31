/**
 * 拼音组合无效规则
 * 基于汉语拼音方案规定的声母韵母拼合规则
 */

/**
 * 齐齿呼：以 i 开头或 i 单独的韵母
 */
const QICHI_FINALS = ['i', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing'];

/**
 * 撮口呼：以 ü 开头或 ü 单独的韵母
 */
const CUOKOU_FINALS = ['ü', 'üe', 'uan', 'ün'];

/**
 * 合口呼：以 u 开头或 u 单独的韵母
 */
const HEKOU_FINALS = ['u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ong'];

/**
 * 开口呼：其余韵母（以 a, o, e 开头或特殊韵母）
 */
const KAIKOU_FINALS = ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'er', 'an', 'en', 'ang', 'eng'];

/**
 * 声母分组（按拼音字母顺序）
 */
const INITIAL_GROUPS = {
  group1: ['b', 'p', 'm', 'f'],       // 第1组
  group2: ['d', 't', 'n', 'l'],       // 第2组
  group3: ['g', 'k', 'h'],            // 第3组
  group4: ['j', 'q', 'x'],            // 第4组
  group5: ['zh', 'ch', 'sh', 'r'],     // 第5组
  group6: ['z', 'c', 's'],            // 第6组
} as const;

/**
 * 所有有效声母（不包括半元音 y, w）
 */
export const VALID_INITIALS = [
  ...INITIAL_GROUPS.group1,
  ...INITIAL_GROUPS.group2,
  ...INITIAL_GROUPS.group3,
  ...INITIAL_GROUPS.group4,
  ...INITIAL_GROUPS.group5,
  ...INITIAL_GROUPS.group6,
];

/**
 * 所有有效韵母
 */
export const VALID_FINALS = [
  ...KAIKOU_FINALS,
  ...QICHI_FINALS,
  ...CUOKOU_FINALS,
  ...HEKOU_FINALS,
];

/**
 * 判断声母韵母组合是否无效
 * @param initial 声母
 * @param final 韵母
 * @returns true 表示无效组合，false 表示可能有效
 */
export const isInvalidCombination = (initial: string, final: string): boolean => {
  // 特殊规则：某些韵母只能单独使用或作为整体认读
  if (final === 'er') return true;  // er 是特殊韵母，不与声母组合

  // 规则1: 唇音 (b, p, m, f) + 撮口呼 = 无效
  if (INITIAL_GROUPS.group1.includes(initial) && CUOKOU_FINALS.includes(final)) {
    return true;
  }

  // 规则2: 舌根音 (g, k, h) + 齐齿呼/撮口呼 = 无效
  if (INITIAL_GROUPS.group3.includes(initial) && [...QICHI_FINALS, ...CUOKOU_FINALS].includes(final)) {
    return true;
  }

  // 规则3: 翘舌音 (zh, ch, sh, r) + 齐齿呼/撮口呼 = 无效
  if (INITIAL_GROUPS.group5.includes(initial) && [...QICHI_FINALS, ...CUOKOU_FINALS].includes(final)) {
    return true;
  }

  // 规则4: 平舌音 (z, c, s) + 齐齿呼/撮口呼 = 无效
  if (INITIAL_GROUPS.group6.includes(initial) && [...QICHI_FINALS, ...CUOKOU_FINALS].includes(final)) {
    return true;
  }

  // 规则5: 舌面音 (j, q, x) + 开口呼(部分)/合口呼(部分) = 无效
  // 舌面音只能与齐齿呼和撮口呼组合
  const tongueInvalidFinals = ['o', 'e', 'u', 'uo', 'ui', 'uai', 'ong', 'ang', 'eng', 'ao', 'ou', 'ei', 'ai', 'a', 'er'];
  if (INITIAL_GROUPS.group4.includes(initial) && tongueInvalidFinals.includes(final)) {
    return true;
  }

  // 规则6: 唇音 f 特殊规则
  // f 不能与 i 组合（虽然理论上 f+i 不违反基本规则，但实际拼音中不存在）
  if (initial === 'f' && final === 'i') {
    return true;
  }

  // 规则7: m 不能与大部分复韵母组合（常见的只有 ma, mo, mei, man, men, mang, meng, mu 等）
  const mInvalidFinals = ['ia', 'iao', 'iu', 'iang', 'ing', 'ua', 'uo', 'uai', 'ui', 'uan', 'uang'];
  if (initial === 'm' && mInvalidFinals.includes(final)) {
    return true;
  }

  // 规则8: b, p 不能与某些韵母组合
  const bpInvalidFinals = ['iu', 'ui', 'un', 'ün', 'iang', 'ing', 'ua', 'uo', 'uai', 'uang'];
  if ((initial === 'b' || initial === 'p') && bpInvalidFinals.includes(final)) {
    return true;
  }

  return false;
};

/**
 * 获取声母所属分组
 */
export const getInitialGroup = (initial: string): keyof typeof INITIAL_GROUPS | null => {
  for (const [group, initials] of Object.entries(INITIAL_GROUPS)) {
    if (initials.includes(initial)) {
      return group as keyof typeof INITIAL_GROUPS;
    }
  }
  return null;
};

/**
 * 声母分组定义
 */
export const INITIAL_GROUPS_DEFINITION = INITIAL_GROUPS;

/**
 * 声母分组标签（按拼音字母顺序）
 */
export const INITIAL_GROUP_LABELS: Record<keyof typeof INITIAL_GROUPS, string> = {
  group1: 'b p m f',
  group2: 'd t n l',
  group3: 'g k h',
  group4: 'j q x',
  group5: 'zh ch sh r',
  group6: 'z c s',
};
