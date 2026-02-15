/**
 * 汉字图谱构建工具
 * 
 * 用于构建汉字关系网络、词语节点和关系边
 */

import {
  EnhancedGraphNode,
  GraphNodeData,
  WordNode,
  WordNodeData,
  EnhancedGraphEdge,
  GraphEdgeData,
  RelationType,
  CharacterRelation,
  CharacterRelations,
  GraphData,
  GraphBuildOptions,
  GraphFilterConfig,
  GraphStats,
  LearningRecord,
} from '@/types/graph';
import { getCharacterInfo, characterDatabase } from './characterInfo';
import { SIMILAR_CHAR_GROUPS } from './similarCharacters';
import { radicalDatabase, parseRadicalExamples } from './radicalData';

// ==================== 核心常量 ====================

const DEFAULT_MAX_NODES = 30;
const DEFAULT_MAX_DEPTH = 2;

// ==================== 汉字关系提取 ====================

/**
 * 获取形近字关系
 */
const getSimilarCharacters = (char: string): CharacterRelation[] => {
  const relations: CharacterRelation[] = [];
  
  for (const group of SIMILAR_CHAR_GROUPS) {
    const charIndex = group.characters.findIndex(c => c.char === char);
    if (charIndex !== -1) {
      // 找到包含该字的形近字组
      group.characters.forEach((c, index) => {
        if (index !== charIndex) {
          relations.push({
            targetCharacter: c.char,
            relationType: 'similar',
            weight: 0.8,
            description: group.hint,
          });
        }
      });
    }
  }
  
  return relations;
};

/**
 * 获取同部首字符
 */
const getSameRadicalCharacters = (char: string): CharacterRelation[] => {
  const relations: CharacterRelation[] = [];
  const charInfo = getCharacterInfo(char);
  
  if (!charInfo) return relations;
  
  // 提取部首（从 radicalInfo 中）
  const radicalMatch = charInfo.radicalInfo.match(/部首[:：](.)/);
  if (!radicalMatch) return relations;
  
  const radical = radicalMatch[1];
  
  // 从部首数据库查找相同部首的字
  for (const radicalInfo of radicalDatabase) {
    if (radicalInfo.radical === radical) {
      const parsed = parseRadicalExamples(radicalInfo);
      parsed.exampleList.forEach(exampleChar => {
        if (exampleChar !== char && characterDatabase[exampleChar]) {
          relations.push({
            targetCharacter: exampleChar,
            relationType: 'radical',
            weight: 0.7,
            description: radicalInfo.relation,
          });
        }
      });
      break;
    }
  }
  
  return relations;
};

/**
 * 获取组词关系字符
 */
const getWordRelatedCharacters = (char: string): CharacterRelation[] => {
  const relations: CharacterRelation[] = [];
  const charInfo = getCharacterInfo(char);

  if (!charInfo) return relations;

  // 从组词中提取其他汉字
  const relatedChars = new Set<string>();
  charInfo.words.forEach(wordItem => {
    const word = wordItem.word;
    for (const c of word) {
      if (c !== char && /[\u4e00-\u9fa5]/.test(c) && characterDatabase[c]) {
        relatedChars.add(c);
      }
    }
  });

  relatedChars.forEach(c => {
    relations.push({
      targetCharacter: c,
      relationType: 'word',
      weight: 0.6,
      description: `在词语中相关`,
    });
  });

  return relations;
};

/**
 * 获取例句关系字符
 */
const getSentenceRelatedCharacters = (char: string): CharacterRelation[] => {
  const relations: CharacterRelation[] = [];
  const charInfo = getCharacterInfo(char);

  if (!charInfo || !charInfo.sentences || charInfo.sentences.length === 0) {
    return relations;
  }

  // 收集组词关系中已有的字（避免重复）
  const wordRelatedChars = new Set<string>();
  charInfo.words.forEach(wordItem => {
    for (const c of wordItem.word) {
      if (c !== char && /[\u4e00-\u9fa5]/.test(c)) {
        wordRelatedChars.add(c);
      }
    }
  });

  // 从例句中提取其他汉字
  const relatedChars = new Set<string>();
  charInfo.sentences.forEach(sentence => {
    for (const c of sentence) {
      // 排除：自身、标点符号、已在组词中的字、数据库中不存在的字
      if (
        c !== char &&
        /[\u4e00-\u9fa5]/.test(c) &&
        !wordRelatedChars.has(c) &&
        characterDatabase[c]
      ) {
        relatedChars.add(c);
      }
    }
  });

  // 限制数量（最多 5 个）
  const limitedChars = Array.from(relatedChars).slice(0, 5);

  limitedChars.forEach(c => {
    relations.push({
      targetCharacter: c,
      relationType: 'sentence',
      weight: 0.3,
      description: `在例句中相关`,
    });
  });

  return relations;
};

/**
 * 获取结构相同的字符
 */
const getSameStructureCharacters = (char: string): CharacterRelation[] => {
  const relations: CharacterRelation[] = [];
  const charInfo = getCharacterInfo(char);

  if (!charInfo || !charInfo.structure) {
    return relations;
  }

  const structure = charInfo.structure;
  const relatedChars: string[] = [];

  // 遍历数据库找相同结构的字
  for (const [c, info] of Object.entries(characterDatabase)) {
    if (
      c !== char &&
      info.structure === structure &&
      relatedChars.length < 10 // 限制最多 10 个
    ) {
      relatedChars.push(c);
    }
  }

  relatedChars.forEach(c => {
    relations.push({
      targetCharacter: c,
      relationType: 'structure',
      weight: 0.5,
      description: `同为${structure}`,
    });
  });

  return relations;
};

/**
 * 获取多音字关联字符
 */
const getMultiPronunciationCharacters = (char: string): CharacterRelation[] => {
  const relations: CharacterRelation[] = [];
  const charInfo = getCharacterInfo(char);

  if (!charInfo) {
    return relations;
  }

  // 收集当前字的所有读音
  const pronunciations = new Set<string>();

  // 添加主读音（去除声调）
  const mainPinyin = charInfo.pinyin.toLowerCase().replace(/[0-9]/g, '');
  pronunciations.add(mainPinyin);

  // 添加额外读音（如果有）
  if (charInfo.additionalReadings && charInfo.additionalReadings.length > 0) {
    charInfo.additionalReadings.forEach((reading: any) => {
      // 兼容两种数据格式
      const pinyin = reading.pinyin || reading.reading;
      if (pinyin) {
        const normalized = pinyin.toLowerCase().replace(/[0-9]/g, '');
        pronunciations.add(normalized);
      }
    });
  }

  // 如果只有一个读音（不是多音字），则不建立关系
  if (pronunciations.size <= 1) {
    return relations;
  }

  // 遍历数据库找相同读音的字
  const relatedChars: string[] = [];

  for (const [c, info] of Object.entries(characterDatabase)) {
    if (c === char || relatedChars.length >= 8) {
      continue;
    }

    // 检查主读音
    const targetMainPinyin = info.pinyin.toLowerCase().replace(/[0-9]/g, '');
    if (pronunciations.has(targetMainPinyin)) {
      relatedChars.push(c);
      continue;
    }

    // 检查额外读音
    if (info.additionalReadings && info.additionalReadings.length > 0) {
      for (const reading of info.additionalReadings) {
        const pinyin = (reading as any).pinyin || (reading as any).reading;
        if (pinyin) {
          const normalized = pinyin.toLowerCase().replace(/[0-9]/g, '');
          if (pronunciations.has(normalized)) {
            relatedChars.push(c);
            break;
          }
        }
      }
    }
  }

  // 构建关系列表
  relatedChars.forEach(c => {
    relations.push({
      targetCharacter: c,
      relationType: 'pronunciation',
      weight: 0.4,
      description: `多音字相关`,
    });
  });

  return relations;
};

/**
 * 获取汉字的所有关系
 */
export const getCharacterRelations = (char: string): CharacterRelations => {
  return {
    similar: getSimilarCharacters(char),
    sameRadical: getSameRadicalCharacters(char),
    inWords: getWordRelatedCharacters(char),
    inSentences: getSentenceRelatedCharacters(char),
    sameStructure: getSameStructureCharacters(char),
    multiPronunciation: getMultiPronunciationCharacters(char),
    similarStroke: [], // 已移除笔画相近功能
  };
};

// ==================== 图谱节点构建 ====================

/**
 * 创建汉字节点
 */
const createCharacterNode = (
  char: string,
  position: { x: number; y: number },
  isCenterNode: boolean = false,
  learningRecords?: LearningRecord[]
): EnhancedGraphNode | null => {
  const info = getCharacterInfo(char);
  if (!info) return null;
  
  // 检查是否已学
  const isLearned = learningRecords?.some(r => r.character === char) || false;
  const record = learningRecords?.find(r => r.character === char);
  const isMastered = record?.mastered || false;
  
  const nodeData: GraphNodeData = {
    label: char,
    pinyin: info.pinyin,
    strokeCount: info.strokeCount,
    radical: info.radicalInfo.replace(/部首[:：]/, ''),
    type: 'character',
    isLearned,
    isMastered,
    textbook: info.textbook,
    isLocked: false,
    isCenterNode,
    frequency: 0, // TODO: 添加字频统计
  };
  
  return {
    id: char,
    type: 'character',
    position,
    data: nodeData,
  };
};

/**
 * 创建词语节点
 */
const createWordNode = (
  word: string,
  pinyin: string,
  meaning: string,
  characters: string[],
  position: { x: number; y: number }
): WordNode => {
  const nodeData: WordNodeData = {
    word,
    characters,
    pinyin,
    meaning,
    type: 'word',
  };
  
  return {
    id: `word_${word}`,
    type: 'word',
    position,
    data: nodeData,
  };
};

/**
 * 创建关系边
 */
const createEdge = (
  sourceId: string,
  targetId: string,
  relationType: RelationType,
  weight: number = 0.5
): EnhancedGraphEdge => {
  const edgeData: GraphEdgeData = {
    relationType,
    weight,
  };
  
  return {
    id: `${sourceId}-${targetId}-${relationType}`,
    source: sourceId,
    target: targetId,
    type: 'default',
    data: edgeData,
    animated: relationType === 'word',
  };
};

// ==================== 布局算法 ====================

/**
 * 计算圆形布局位置
 */
const calculateCircularPosition = (
  centerX: number,
  centerY: number,
  radius: number,
  index: number,
  total: number
): { x: number; y: number } => {
  const angle = (2 * Math.PI * index) / total;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};

// ==================== 图谱构建主函数 ====================

/**
 * 构建汉字关系图谱
 */
export const buildCharacterGraph = (
  options: GraphBuildOptions
): GraphData => {
  const {
    centerCharacter,
    maxNodes = DEFAULT_MAX_NODES,
    maxDepth = DEFAULT_MAX_DEPTH,
    filter,
    learningRecords = [],
  } = options;
  
  const nodes: EnhancedGraphNode[] = [];
  const edges: EnhancedGraphEdge[] = [];
  const addedNodes = new Set<string>();
  
  // 创建中心节点
  const centerNode = createCharacterNode(
    centerCharacter,
    { x: 0, y: 0 },
    true,
    learningRecords
  );
  
  if (!centerNode) {
    return {
      nodes: [],
      edges: [],
      stats: {
        totalNodes: 0,
        characterNodes: 0,
        wordNodes: 0,
        totalEdges: 0,
        learnedCount: 0,
        masteredCount: 0,
        learningProgress: 0,
      },
    };
  }
  
  nodes.push(centerNode);
  addedNodes.add(centerCharacter);
  
  // 获取中心字符的所有关系
  const relations = getCharacterRelations(centerCharacter);
  
  // 合并所有关系
  const allRelations: CharacterRelation[] = [];

  if (filter?.showSimilar !== false) {
    allRelations.push(...relations.similar);
  }
  if (filter?.showRadical !== false) {
    allRelations.push(...relations.sameRadical);
  }
  if (filter?.showWord !== false) {
    allRelations.push(...relations.inWords);
  }
  if (filter?.showSentence !== false) {
    allRelations.push(...relations.inSentences);
  }
  if (filter?.showStructure !== false) {
    allRelations.push(...relations.sameStructure);
  }
  if (filter?.showPronunciation !== false) {
    allRelations.push(...relations.multiPronunciation);
  }

  // 按权重排序并限制数量
  const sortedRelations = allRelations
    .sort((a, b) => b.weight - a.weight)
    .slice(0, maxNodes - 1);
  
  // 创建关联节点和边
  const radius = 300;
  sortedRelations.forEach((relation, index) => {
    const { targetCharacter, relationType, weight } = relation;
    
    if (!addedNodes.has(targetCharacter)) {
      const position = calculateCircularPosition(
        0,
        0,
        radius,
        index,
        sortedRelations.length
      );
      
      const node = createCharacterNode(
        targetCharacter,
        position,
        false,
        learningRecords
      );
      
      if (node) {
        nodes.push(node);
        addedNodes.add(targetCharacter);
        
        // 创建边
        edges.push(createEdge(centerCharacter, targetCharacter, relationType, weight));
      }
    }
  });
  
  // 计算统计信息
  const stats: GraphStats = {
    totalNodes: nodes.length,
    characterNodes: nodes.filter(n => n.data.type === 'character').length,
    wordNodes: nodes.filter(n => n.data.type === 'word').length,
    totalEdges: edges.length,
    learnedCount: nodes.filter(n => n.data.isLearned).length,
    masteredCount: nodes.filter(n => n.data.isMastered).length,
    learningProgress: nodes.length > 0 
      ? (nodes.filter(n => n.data.isLearned).length / nodes.length) * 100
      : 0,
  };
  
  return { nodes, edges, stats };
};

/**
 * 按教材筛选节点
 */
export const filterByTextbook = (
  nodes: EnhancedGraphNode[],
  textbook: 'grade1-vol1' | 'grade1-vol2' | 'grade2-vol1' | 'grade2-vol2' | 'all'
): EnhancedGraphNode[] => {
  if (textbook === 'all') return nodes;
  
  return nodes.filter(node => {
    return node.data.textbook === textbook;
  });
};

/**
 * 构建词语节点（从汉字的组词中提取）
 */
export const buildWordNodes = (
  char: string,
  maxWords: number = 5
): WordNode[] => {
  const charInfo = getCharacterInfo(char);
  if (!charInfo) return [];
  
  const wordNodes: WordNode[] = [];
  
  charInfo.words.slice(0, maxWords).forEach((wordItem, index) => {
    const { word, pinyin, meaning } = wordItem;
    
    // 提取词语中的汉字
    const characters = word.split('').filter(c => /[\u4e00-\u9fa5]/.test(c));
    
    // 计算位置（在中心字符下方排列）
    const position = {
      x: (index - Math.floor(maxWords / 2)) * 150,
      y: 400,
    };
    
    wordNodes.push(createWordNode(word, pinyin, meaning, characters, position));
  });
  
  return wordNodes;
};
