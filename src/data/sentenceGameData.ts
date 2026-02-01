/**
 * 汉字造句游戏数据
 * 拖拽排序组成正确句子
 */

export interface SentenceLevel {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'daily' | 'school' | 'nature' | 'action' | 'feeling';
  words: {
    word: string;
    id: string;
  }[];
  correctOrder: string[];  // 正确顺序的 word ID
  sentence: string;        // 完整句子
  meaning?: string;        // 句子释义
}

// 汉字造句关卡数据
export const SENTENCE_LEVELS: SentenceLevel[] = [
  // ===== 简单：日常生活 =====
  {
    id: "sentence-easy-1",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "我", id: "w1" },
      { word: "爱", id: "w2" },
      { word: "学", id: "w3" },
      { word: "习", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "我爱学习",
    meaning: "表示喜欢学习"
  },
  {
    id: "sentence-easy-2",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "我们", id: "w1" },
      { word: "是", id: "w2" },
      { word: "好", id: "w3" },
      { word: "朋友", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "我们是好朋友",
    meaning: "表示友谊"
  },
  {
    id: "sentence-easy-3",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "今天", id: "w1" },
      { word: "天气", id: "w2" },
      { word: "真", id: "w3" },
      { word: "好", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "今天天气真好",
    meaning: "描述天气状况"
  },
  {
    id: "sentence-easy-4",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "我", id: "w1" },
      { word: "去", id: "w2" },
      { word: "学校", id: "w3" }
    ],
    correctOrder: ["w1", "w2", "w3"],
    sentence: "我去学校",
    meaning: "表示去学校"
  },
  {
    id: "sentence-easy-5",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "爸爸", id: "w1" },
      { word: "妈妈", id: "w2" },
      { word: "爱", id: "w3" },
      { word: "我", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "爸爸妈妈爱我",
    meaning: "表示父母的爱"
  },
  {
    id: "sentence-easy-6",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "我", id: "w1" },
      { word: "吃", id: "w2" },
      { word: "饭", id: "w3" },
      { word: "了", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "我吃饭了",
    meaning: "表示完成动作"
  },
  {
    id: "sentence-easy-7",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "小鸟", id: "w1" },
      { word: "在", id: "w2" },
      { word: "唱歌", id: "w3" }
    ],
    correctOrder: ["w1", "w2", "w3"],
    sentence: "小鸟在唱歌",
    meaning: "描述场景"
  },
  {
    id: "sentence-easy-8",
    difficulty: "easy",
    category: "daily",
    words: [
      { word: "太阳", id: "w1" },
      { word: "升起", id: "w2" },
      { word: "了", id: "w3" }
    ],
    correctOrder: ["w1", "w2", "w3"],
    sentence: "太阳升起来了",
    meaning: "描述自然现象"
  },

  // ===== 中等：学校学习 =====
  {
    id: "sentence-medium-1",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "老师", id: "w1" },
      { word: "教", id: "w2" },
      { word: "我们", id: "w3" },
      { word: "读书", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "老师教我们读书",
    meaning: "描述学习场景"
  },
  {
    id: "sentence-medium-2",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "同学们", id: "w1" },
      { word: "在", id: "w2" },
      { word: "操场上", id: "w3" },
      { word: "跑步", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "同学们在操场上跑步",
    meaning: "描述学校活动"
  },
  {
    id: "sentence-medium-3",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "我", id: "w1" },
      { word: "认真", id: "w2" },
      { word: "听", id: "w3" },
      { word: "课", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "我认真听课",
    meaning: "表示学习态度"
  },
  {
    id: "sentence-medium-4",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "我们", id: "w1" },
      { word: "一起", id: "w2" },
      { word: "做", id: "w3" },
      { word: "作业", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "我们一起做作业",
    meaning: "描述合作学习"
  },
  {
    id: "sentence-medium-5",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "下课", id: "w1" },
      { word: "后", id: "w2" },
      { word: "我们", id: "w3" },
      { word: "玩耍", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "下课后我们玩耍",
    meaning: "描述课间活动"
  },
  {
    id: "sentence-medium-6",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "书本", id: "w1" },
      { word: "是", id: "w2" },
      { word: "我们", id: "w3" },
      { word: "的", id: "w4" },
      { word: "朋友", id: "w5" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w5"],
    sentence: "书本是我们的朋友",
    meaning: "比喻句"
  },
  {
    id: "sentence-medium-7",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "我喜欢", id: "w1" },
      { word: "上", id: "w2" },
      { word: "语文", id: "w3" },
      { word: "课", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "我喜欢上语文课",
    meaning: "表达喜好"
  },
  {
    id: "sentence-medium-8",
    difficulty: "medium",
    category: "school",
    words: [
      { word: "大家", id: "w1" },
      { word: "都", id: "w2" },
      { word: "很", id: "w3" },
      { word: "努力", id: "w4" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4"],
    sentence: "大家都很努力",
    meaning: "描述学习状态"
  },

  // ===== 困难：自然描写 =====
  {
    id: "sentence-hard-1",
    difficulty: "hard",
    category: "nature",
    words: [
      { word: "春天", id: "w1" },
      { word: "到了", id: "w2" },
      { word: "花儿", id: "w3" },
      { word: "都", id: "w4" },
      { word: "开了", id: "w5" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w5"],
    sentence: "春天到了花儿都开了",
    meaning: "描述春天的景象"
  },
  {
    id: "sentence-hard-2",
    difficulty: "hard",
    category: "nature",
    words: [
      { word: "天上", id: "w1" },
      { word: "飘着", id: "w2" },
      { word: "白云", id: "w3" },
      { word: "像", id: "w4" },
      { word: "棉花", id: "w5" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w5"],
    sentence: "天上飘着白云像棉花",
    meaning: "比喻句，描写天空"
  },
  {
    id: "sentence-hard-3",
    difficulty: "hard",
    category: "nature",
    words: [
      { word: "小河", id: "w1" },
      { word: "哗哗", id: "w2" },
      { word: "地", id: "w3" },
      { word: "流", id: "w4" },
      { word: "着", id: "w5" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w5"],
    sentence: "小河哗哗地流着",
    meaning: "拟声词，描写流水"
  },
  {
    id: "sentence-hard-4",
    difficulty: "hard",
    category: "action",
    words: [
      { word: "小明", id: "w1" },
      { word: "帮", id: "w2" },
      { word: "妈妈", id: "w3" },
      { word: "做", id: "w4" },
      { word: "家务", id: "w5" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w5"],
    sentence: "小明帮妈妈做家务",
    meaning: "描述助人为乐"
  },
  {
    id: "sentence-hard-5",
    difficulty: "hard",
    category: "feeling",
    words: [
      { word: "看到", id: "w1" },
      { word: "小狗", id: "w2" },
      { word: "我", id: "w3" },
      { word: "很", id: "w4" },
      { word: "开心", id: "w5" }
    ],
    correctOrder: ["w2", "w4", "w3", "w5", "w1"],
    sentence: "看到小狗我很开心",
    meaning: "表达情感"
  },
  {
    id: "sentence-hard-6",
    difficulty: "hard",
    category: "feeling",
    words: [
      { word: "妈妈", id: "w1" },
      { word: "温柔", id: "w2" },
      { word: "地", id: "w3" },
      { word: "摸", id: "w4" },
      { word: "我的", id: "w5" },
      { word: "头", id: "w6" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6"],
    sentence: "妈妈温柔地摸我的头",
    meaning: "描述爱的动作"
  },
  {
    id: "sentence-hard-7",
    difficulty: "hard",
    category: "nature",
    words: [
      { word: "雨", id: "w1" },
      { word: "停", id: "w2" },
      { word: "了", id: "w3" },
      { word: "太阳", id: "w4" },
      { word: "出来", id: "w5" },
      { word: "了", id: "w6" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6"],
    sentence: "雨停了太阳出来了",
    meaning: "描述天气变化"
  },
  {
    id: "sentence-hard-8",
    difficulty: "hard",
    category: "action",
    words: [
      { word: "我们", id: "w1" },
      { word: "要", id: "w2" },
      { word: "保护", id: "w3" },
      { word: "环境", id: "w4" },
      { word: "不", id: "w5" },
      { word: "乱", id: "w6" },
      { word: "扔", id: "w7" },
      { word: "垃圾", id: "w8" }
    ],
    correctOrder: ["w1", "w2", "w3", "w4", "w7", "w5", "w6", "w8"],
    sentence: "我们要保护环境不乱扔垃圾",
    meaning: "环保教育"
  }
];

// 获取指定难度的关卡
export const getSentenceByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return SENTENCE_LEVELS.filter(level => level.difficulty === difficulty);
};

// 获取指定类别的关卡
export const getSentenceByCategory = (category: SentenceLevel['category']) => {
  return SENTENCE_LEVELS.filter(level => level.category === category);
};

// 获取随机关卡
export const getRandomSentence = (count: number = 10) => {
  const shuffled = [...SENTENCE_LEVELS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
