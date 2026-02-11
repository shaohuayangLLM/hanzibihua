/**
 * 汉字图谱类型定义
 *
 * 用于汉字关系网络可视化、学习路径追踪和智能推荐
 */

import { Node, Edge } from 'reactflow';
import { TextbookVolume } from '@/data/types';

// ==================== 节点类型 ====================

/**
 * 节点类型枚举
 */
export type NodeType = 'character' | 'word' | 'radical';

/**
 * 节点数据接口
 */
export interface GraphNodeData {
  /** 节点显示文本 */
  label: string;
  /** 拼音 */
  pinyin: string;
  /** 笔画数 */
  strokeCount: number;
  /** 部首 */
  radical: string;
  /** 节点类型 */
  type: NodeType;
  /** 是否已学 */
  isLearned: boolean;
  /** 是否已掌握 */
  isMastered: boolean;
  /** 所属教材 */
  textbook?: 'grade1-vol1' | 'grade1-vol2' | 'grade2-vol1' | 'grade2-vol2' | 'common' | 'radical';
  /** 是否锁定（未解锁） */
  isLocked: boolean;
  /** 是否为中心节点 */
  isCenterNode?: boolean;
  /** 字频（用于排序） */
  frequency?: number;
}

/**
 * 增强型汉字节点
 */
export type EnhancedGraphNode = Node<GraphNodeData>;

/**
 * 词语节点数据
 */
export interface WordNodeData {
  /** 词语文本（如"天空"） */
  word: string;
  /** 包含的汉字 */
  characters: string[];
  /** 拼音 */
  pinyin: string;
  /** 释义 */
  meaning: string;
  /** 节点类型（固定为 word） */
  type: 'word';
}

/**
 * 词语节点
 */
export type WordNode = Node<WordNodeData>;

// ==================== 边类型 ====================

/**
 * 关系类型枚举
 */
export type RelationType =
  | 'similar'         // 形近字
  | 'radical'         // 同部首
  | 'word'            // 组词关系
  | 'sentence'        // 例句关系
  | 'structure'       // 结构关系
  | 'pronunciation'   // 多音字关系
  | 'stroke';         // 笔画相近

/**
 * 边数据接口
 */
export interface GraphEdgeData {
  /** 关系类型 */
  relationType: RelationType;
  /** 关系强度（0-1） */
  weight?: number;
  /** 关系描述 */
  label?: string;
}

/**
 * 增强型关系边
 */
export type EnhancedGraphEdge = Edge<GraphEdgeData>;

// ==================== 学习追踪 ====================

/**
 * 学习记录
 */
export interface LearningRecord {
  /** 记录 ID */
  id: string;
  /** 学习的汉字 */
  character: string;
  /** 学习时间 */
  learnedAt: Date;
  /** 从哪个字导航来的 */
  fromCharacter?: string;
  /** 学习序号 */
  pathIndex: number;
  /** 所属教材 */
  textbook?: 'grade1-vol1' | 'grade1-vol2' | 'grade2-vol1' | 'grade2-vol2';
  /** 是否已掌握 */
  mastered: boolean;
  /** 学习时长（秒） */
  duration?: number;
}

/**
 * 学习路径
 */
export interface LearningPath {
  /** 路径（汉字数组） */
  path: string[];
  /** 时间戳数组 */
  timestamps: Date[];
  /** 开始时间 */
  startAt: Date;
  /** 结束时间 */
  endAt: Date;
  /** 路径类型（探索/推荐） */
  pathType?: 'exploration' | 'recommendation';
}

// ==================== 推荐系统 ====================

/**
 * 推荐分数
 */
export interface RecommendationScore {
  /** 推荐的汉字 */
  character: string;
  /** 推荐分数（0-1） */
  score: number;
  /** 推荐理由 */
  reason: string;
  /** 关联关系类型 */
  relationType?: RelationType;
}

/**
 * 推荐配置
 */
export interface RecommendationConfig {
  /** 最大推荐数量 */
  maxRecommendations: number;
  /** 权重配置 */
  priorityWeights: {
    /** 未学字权重 */
    unlearned: number;
    /** 同教材权重 */
    sameTextbook: number;
    /** 高频字权重 */
    frequentlyUsed: number;
    /** 关联度权重 */
    relationStrength: number;
  };
}

// ==================== 图谱配置 ====================

/**
 * 图谱筛选器配置
 */
export interface GraphFilterConfig {
  /** 教材筛选 */
  textbook: TextbookVolume;
  /** 显示形近字 */
  showSimilar: boolean;
  /** 显示同部首 */
  showRadical: boolean;
  /** 显示组词关系 */
  showWord: boolean;
  /** 显示例句关系 */
  showSentence: boolean;
  /** 显示结构关系 */
  showStructure: boolean;
  /** 显示多音字关系 */
  showPronunciation: boolean;
  /** 只显示已学字 */
  onlyLearned: boolean;
  /** 只显示未学字 */
  onlyUnlearned: boolean;
}

/**
 * 图谱统计信息
 */
export interface GraphStats {
  /** 总节点数 */
  totalNodes: number;
  /** 汉字节点数 */
  characterNodes: number;
  /** 词语节点数 */
  wordNodes: number;
  /** 总边数 */
  totalEdges: number;
  /** 已学字数 */
  learnedCount: number;
  /** 已掌握字数 */
  masteredCount: number;
  /** 学习进度（百分比） */
  learningProgress: number;
}

// ==================== 图谱构建 ====================

/**
 * 图谱构建选项
 */
export interface GraphBuildOptions {
  /** 中心字符 */
  centerCharacter: string;
  /** 最大节点数 */
  maxNodes?: number;
  /** 最大深度 */
  maxDepth?: number;
  /** 筛选配置 */
  filter?: Partial<GraphFilterConfig>;
  /** 学习记录（用于标记已学状态） */
  learningRecords?: LearningRecord[];
}

/**
 * 图谱数据
 */
export interface GraphData {
  /** 节点列表 */
  nodes: EnhancedGraphNode[];
  /** 边列表 */
  edges: EnhancedGraphEdge[];
  /** 统计信息 */
  stats: GraphStats;
}

// ==================== 汉字关系 ====================

/**
 * 汉字关系接口
 */
export interface CharacterRelation {
  /** 目标汉字 */
  targetCharacter: string;
  /** 关系类型 */
  relationType: RelationType;
  /** 关系强度 */
  weight: number;
  /** 关系描述 */
  description?: string;
}

/**
 * 汉字关系集合
 */
export interface CharacterRelations {
  /** 形近字 */
  similar: CharacterRelation[];
  /** 同部首字 */
  sameRadical: CharacterRelation[];
  /** 组词关联字 */
  inWords: CharacterRelation[];
  /** 例句关联字 */
  inSentences: CharacterRelation[];
  /** 结构相同字 */
  sameStructure: CharacterRelation[];
  /** 多音字关联 */
  multiPronunciation: CharacterRelation[];
  /** 笔画相近字 */
  similarStroke: CharacterRelation[];
}

// ==================== 用户偏好 ====================

/**
 * 用户偏好设置
 */
export interface UserPreferences {
  /** 当前教材 */
  currentTextbook: TextbookVolume;
  /** 关系显示设置 */
  relationVisibility: {
    similar: boolean;
    radical: boolean;
    word: boolean;
    sentence: boolean;
    structure: boolean;
    stroke: boolean;
  };
  /** 自动播放动画 */
  autoPlayAnimation: boolean;
  /** 启用语音提示 */
  enableVoice: boolean;
  /** 启用云端同步 */
  enableCloudSync: boolean;
}

// ==================== 导出类型 ====================

/**
 * 学习报告
 */
export interface LearningReport {
  /** 学习时间段 */
  period: {
    start: Date;
    end: Date;
  };
  /** 学习字数 */
  totalCharacters: number;
  /** 已掌握字数 */
  masteredCharacters: number;
  /** 学习路径 */
  paths: LearningPath[];
  /** 学习记录 */
  records: LearningRecord[];
  /** 推荐字 */
  recommendations: RecommendationScore[];
}
