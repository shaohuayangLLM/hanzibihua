/**
 * 智能推荐引擎
 * 
 * 根据学习路径、关系强度、教材优先级推荐下一个汉字
 */

import { LearningRecord } from '@/types/graph';
import { RecommendationScore, RecommendationConfig } from '@/types/graph';
import { getCharacterRelations } from '@/data/graphBuilder';
import { getCharacterInfo, characterDatabase } from '@/data/characterInfo';

// 默认推荐配置
const DEFAULT_CONFIG: RecommendationConfig = {
  maxRecommendations: 3,
  priorityWeights: {
    unlearned: 0.5,           // 未学字权重
    sameTextbook: 0.3,        // 同教材权重
    frequentlyUsed: 0.1,      // 高频字权重（暂未实现字频）
    relationStrength: 0.1,    // 关联度权重
  },
};

/**
 * 获取推荐汉字列表
 */
export const getRecommendedCharacters = (
  learningRecords: LearningRecord[],
  currentChar: string,
  config: Partial<RecommendationConfig> = {}
): RecommendationScore[] => {
  const fullConfig = { ...DEFAULT_CONFIG, ...config };
  const { maxRecommendations, priorityWeights } = fullConfig;

  // 已学汉字集合
  const learnedChars = new Set(learningRecords.map(r => r.character));
  
  // 当前字的信息
  const currentInfo = getCharacterInfo(currentChar);
  if (!currentInfo) return [];

  // 当前字的教材
  const currentTextbook = currentInfo.textbook;

  // 获取当前字的所有关系
  const relations = getCharacterRelations(currentChar);

  // 收集候选字符及其来源关系
  const candidates = new Map<string, { 
    char: string; 
    sources: Array<{ type: string; weight: number }> 
  }>();

  // 添加形近字
  relations.similar.forEach(rel => {
    if (!learnedChars.has(rel.targetCharacter)) {
      const existing = candidates.get(rel.targetCharacter) || { 
        char: rel.targetCharacter, 
        sources: [] 
      };
      existing.sources.push({ type: '形近字', weight: rel.weight });
      candidates.set(rel.targetCharacter, existing);
    }
  });

  // 添加同部首字
  relations.sameRadical.forEach(rel => {
    if (!learnedChars.has(rel.targetCharacter)) {
      const existing = candidates.get(rel.targetCharacter) || { 
        char: rel.targetCharacter, 
        sources: [] 
      };
      existing.sources.push({ type: '同部首', weight: rel.weight });
      candidates.set(rel.targetCharacter, existing);
    }
  });

  // 添加组词关联字
  relations.inWords.forEach(rel => {
    if (!learnedChars.has(rel.targetCharacter)) {
      const existing = candidates.get(rel.targetCharacter) || { 
        char: rel.targetCharacter, 
        sources: [] 
      };
      existing.sources.push({ type: '组词', weight: rel.weight });
      candidates.set(rel.targetCharacter, existing);
    }
  });

  // 如果候选字太少，从数据库补充一些同教材的字
  if (candidates.size < maxRecommendations * 2 && currentTextbook) {
    const allChars = Object.keys(characterDatabase);
    const sameTextbookChars = allChars
      .filter(char => {
        const info = getCharacterInfo(char);
        return info?.textbook === currentTextbook && 
               !learnedChars.has(char) && 
               !candidates.has(char);
      })
      .slice(0, maxRecommendations);

    sameTextbookChars.forEach(char => {
      candidates.set(char, {
        char,
        sources: [{ type: '同教材', weight: 0.4 }]
      });
    });
  }

  // 计算每个候选字的推荐分数
  const scores: RecommendationScore[] = [];

  candidates.forEach(({ char, sources }) => {
    const charInfo = getCharacterInfo(char);
    if (!charInfo) return;

    let score = 0;
    let primaryReason = '';
    let maxWeight = 0;

    // 1. 关系强度分数
    sources.forEach(source => {
      score += source.weight * priorityWeights.relationStrength * 10;
      if (source.weight > maxWeight) {
        maxWeight = source.weight;
        primaryReason = source.type;
      }
    });

    // 2. 未学字加分
    if (!learnedChars.has(char)) {
      score += priorityWeights.unlearned * 10;
    }

    // 3. 同教材加分
    if (charInfo.textbook === currentTextbook) {
      score += priorityWeights.sameTextbook * 10;
      if (!primaryReason) primaryReason = '同教材';
    }

    // 4. 字频加分（暂时使用组词数量作为简单替代）
    const wordCount = charInfo.words.length;
    score += (wordCount / 10) * priorityWeights.frequentlyUsed;

    scores.push({
      character: char,
      score,
      reason: primaryReason || '推荐学习',
      relationType: sources[0]?.type === '形近字' ? 'similar' : 
                   sources[0]?.type === '同部首' ? 'radical' : 
                   sources[0]?.type === '组词' ? 'word' : undefined,
    });
  });

  // 按分数排序并返回前 N 个
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, maxRecommendations);
};

/**
 * 获取基于最近学习的推荐
 */
export const getRecentBasedRecommendations = (
  learningRecords: LearningRecord[],
  config: Partial<RecommendationConfig> = {}
): RecommendationScore[] => {
  if (learningRecords.length === 0) {
    // 如果没有学习记录，推荐一些常用字
    return [
      { character: '天', score: 1.0, reason: '一年级上册第一课' },
      { character: '地', score: 0.9, reason: '一年级上册常用字' },
      { character: '人', score: 0.8, reason: '一年级上册常用字' },
    ].slice(0, config.maxRecommendations || 3);
  }

  // 获取最近学习的字
  const recentChar = learningRecords[learningRecords.length - 1].character;
  return getRecommendedCharacters(learningRecords, recentChar, config);
};

/**
 * 获取弱项汉字（学了但未掌握的字）
 */
export const getWeakCharacters = (
  learningRecords: LearningRecord[]
): string[] => {
  return learningRecords
    .filter(record => !record.mastered)
    .map(record => record.character)
    .slice(-5); // 最近5个未掌握的字
};
