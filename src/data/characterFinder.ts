/**
 * 汉字查找数据分组工具
 * 支持按拼音首字母分组
 * 部首查找使用 radicalData.ts 中的预定义数据
 */

import { characterDatabase } from './characterInfo';
import { CharacterInfo } from './types';

/**
 * 按拼音首字母分组汉字
 * @returns Record<string, CharacterInfo[]> - 首字母到汉字数组的映射
 */
export const groupCharactersByPinyin = (): Record<string, CharacterInfo[]> => {
  const grouped: Record<string, CharacterInfo[]> = {};

  // 初始化所有字母（A-Z）为空数组
  const initials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const initial of initials) {
    grouped[initial] = [];
  }

  // 遍历所有汉字，按拼音首字母分组
  for (const [char, info] of Object.entries(characterDatabase)) {
    if (info.pinyin === '暂无') continue;

    // 获取拼音首字母
    const firstChar = info.pinyin[0].toUpperCase();

    // 如果是字母，添加到对应分组
    if (grouped.hasOwnProperty(firstChar)) {
      grouped[firstChar].push(info);
    }
  }

  return grouped;
};

/**
 * 获取所有拼音首字母列表（仅包含有汉字的字母）
 * @returns string[] - 有汉字的拼音首字母数组
 */
export const getPinyinInitials = (): string[] => {
  const grouped = groupCharactersByPinyin();
  return Object.keys(grouped).filter(initial => grouped[initial].length > 0).sort();
};

/**
 * 根据拼音首字母获取汉字列表
 * @param initial - 拼音首字母（A-Z）
 * @returns CharacterInfo[] - 该首字母下的汉字列表
 */
export const getCharactersByPinyinInitial = (initial: string): CharacterInfo[] => {
  const grouped = groupCharactersByPinyin();
  return grouped[initial.toUpperCase()] || [];
};
