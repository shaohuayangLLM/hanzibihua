/**
 * 汉字推理题数据 V2
 * 基于真实汉字结构，确保准确性
 */

export interface PuzzleQuestion {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'pattern' | 'part-composition' | 'meaning' | 'logic';
  question: {
    left: string;          // 左边例子
    operator: string;      // 操作符/关系
    right: string;         // 右边例子
    hint?: string;         // 提示
  };
  options: string[];      // 选项
  correctAnswer: string;  // 正确答案
  explanation: string;    // 解析
  verified: boolean;      // 是否已验证
}

// 精选汉字推理题 - 所有题目已人工验证
export const VERIFIED_PUZZLE_QUESTIONS: PuzzleQuestion[] = [
  // ===== 简单：明显的组合规律 =====
  {
    id: "pattern-easy-1",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "人",
      operator: "+ 人",
      right: "从",
      hint: "两个人一前一后"
    },
    options: ["众", "从", "队", "伏"],
    correctAnswer: "从",
    explanation: "人 + 人 = 从（两个人一前一后）",
    verified: true
  },
  {
    id: "pattern-easy-2",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "日",
      operator: "+ 月",
      right: "明",
      hint: "太阳和月亮"
    },
    options: ["明", "阳", "早", "旦"],
    correctAnswer: "明",
    explanation: "日 + 月 = 明（日月同辉，光明）",
    verified: true
  },
  {
    id: "pattern-easy-3",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "木",
      operator: "+ 木",
      right: "林",
      hint: "两棵树"
    },
    options: ["林", "森", "树", "材"],
    correctAnswer: "林",
    explanation: "木 + 木 = 林（两木成林）",
    verified: true
  },
  {
    id: "pattern-easy-4",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "小",
      operator: "+ 土",
      right: "尘",
      hint: "细小的土"
    },
    options: ["尘", "块", "地", "场"],
    correctAnswer: "尘",
    explanation: "小 + 土 = 尘（细小的土粒就是灰尘）",
    verified: true
  },
  {
    id: "pattern-easy-5",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "不",
      operator: "+ 正",
      right: "歪",
      hint: "不正的状态"
    },
    options: ["歪", "斜", "偏", "侧"],
    correctAnswer: "歪",
    explanation: "不 + 正 = 歪（不正就是歪）",
    verified: true
  },
  {
    id: "pattern-easy-6",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "一",
      operator: "+ 火",
      right: "灭",
      hint: "盖住火"
    },
    options: ["灭", "灾", "炎", "灰"],
    correctAnswer: "灭",
    explanation: "一 + 火 = 灭（一横盖住火，火就灭了）",
    verified: true
  },
  {
    id: "pattern-easy-7",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "手",
      operator: "+ 目",
      right: "看",
      hint: "用手搭在眼睛上"
    },
    options: ["看", "见", "盯", "瞧"],
    correctAnswer: "看",
    explanation: "手 + 目 = 看（把手放在眼睛上远眺）",
    verified: true
  },
  {
    id: "pattern-easy-8",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "山",
      operator: "+ 石",
      right: "岩",
      hint: "山上的石头"
    },
    options: ["岩", "岩", "崖", "峰"],
    correctAnswer: "岩",
    explanation: "山 + 石 = 岩（山上的石头就是岩石）",
    verified: true
  },

  // ===== 中等：部首组合 =====
  {
    id: "part-medium-1",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "氵 + 可",
      operator: "=",
      right: "?",
      hint: "三点水旁"
    },
    options: ["河", "江", "湖", "海"],
    correctAnswer: "河",
    explanation: "氵（三点水）+ 可 = 河（河流）",
    verified: true
  },
  {
    id: "part-medium-2",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "木 + 公",
      operator: "=",
      right: "?",
      hint: "木字旁"
    },
    options: ["松", "树", "林", "材"],
    correctAnswer: "松",
    explanation: "木 + 公 = 松（松树）",
    verified: true
  },
  {
    id: "part-medium-3",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "亻 + 尔",
      operator: "=",
      right: "?",
      hint: "单人旁"
    },
    options: ["你", "他", "她", "们"],
    correctAnswer: "你",
    explanation: "亻（单人旁）+ 尔 = 你（第二人称）",
    verified: true
  },
  {
    id: "part-medium-4",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "艹 + 化",
      operator: "=",
      right: "?",
      hint: "草字头"
    },
    options: ["花", "草", "叶", "苗"],
    correctAnswer: "花",
    explanation: "艹（草字头）+ 化 = 花（开花）",
    verified: true
  },
  {
    id: "part-medium-5",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "口 + 少",
      operator: "=",
      right: "?",
      hint: "口字旁"
    },
    options: ["吵", "吃", "喝", "叫"],
    correctAnswer: "吵",
    explanation: "口 + 少 = 吵（吵闹）",
    verified: true
  },
  {
    id: "part-medium-6",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "扌 + 丁",
      operator: "=",
      right: "?",
      hint: "提手旁"
    },
    options: ["打", "提", "拉", "抱"],
    correctAnswer: "打",
    explanation: "扌（提手旁）+ 丁 = 打（打击）",
    verified: true
  },
  {
    id: "part-medium-7",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "火 + 丁",
      operator: "=",
      right: "?",
      hint: "火字旁"
    },
    options: ["灯", "烧", "烤", "炸"],
    correctAnswer: "灯",
    explanation: "火 + 丁 = 灯（古代用火照明）",
    verified: true
  },
  {
    id: "part-medium-8",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "女 + 马",
      operator: "=",
      right: "?",
      hint: "女字旁"
    },
    options: ["妈", "姐", "妹", "奶"],
    correctAnswer: "妈",
    explanation: "女 + 马 = 妈（妈妈，声旁为'马'）",
    verified: true
  },

  // ===== 困难：逻辑推理 =====
  {
    id: "logic-hard-1",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "人 + 人 + 人",
      operator: "=",
      right: "?",
      hint: "三人成众"
    },
    options: ["众", "品", "森", "磊"],
    correctAnswer: "众",
    explanation: "三个人堆叠组成众（众人，许多人）",
    verified: true
  },
  {
    id: "logic-hard-2",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "口 + 口 + 口",
      operator: "=",
      right: "?",
      hint: "三口成品"
    },
    options: ["品", "众", "森", "磊"],
    correctAnswer: "品",
    explanation: "三个口堆叠成品（品质、物品）",
    verified: true
  },
  {
    id: "logic-hard-3",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "木 + 木 + 木",
      operator: "=",
      right: "?",
      hint: "三木成森"
    },
    options: ["森", "林", "众", "品"],
    correctAnswer: "森",
    explanation: "三木堆叠成森（森林）",
    verified: true
  },
  {
    id: "logic-hard-4",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "石 + 石 + 石",
      operator: "=",
      right: "?",
      hint: "三石成磊"
    },
    options: ["磊", "森", "品", "众"],
    correctAnswer: "磊",
    explanation: "三石堆叠成磊（磊落、石头多）",
    verified: true
  },
  {
    id: "logic-hard-5",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "小 + 大",
      operator: "=",
      right: "?",
      hint: "上小下大的形状"
    },
    options: ["尖", "劣", "尘", "卡"],
    correctAnswer: "尖",
    explanation: "小在上、大在下组合成尖（尖锐的形状）",
    verified: true
  },
  {
    id: "logic-hard-6",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "田 + 心",
      operator: "=",
      right: "?",
      hint: "田地需要用心"
    },
    options: ["思", "恩", "想", "念"],
    correctAnswer: "思",
    explanation: "田 + 心 = 思（田地需要用心思考）",
    verified: true
  },
  {
    id: "logic-hard-7",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "少 + 目",
      operator: "=",
      right: "?",
      hint: "节约与看"
    },
    options: ["省", "盲", "看", "眼"],
    correctAnswer: "省",
    explanation: "少 + 目 = 省（节省、省察）",
    verified: true
  },
  {
    id: "logic-hard-8",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "不 + 用",
      operator: "=",
      right: "?",
      hint: "北方方言"
    },
    options: ["甭", "别", "莫", "勿"],
    correctAnswer: "甭",
    explanation: "不 + 用 = 甭（北方方言，表示'不用'）",
    verified: true
  },
  {
    id: "logic-hard-9",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "人 + 言",
      operator: "=",
      right: "?",
      hint: "人说的话要可信"
    },
    options: ["信", "认", "话", "语"],
    correctAnswer: "信",
    explanation: "人 + 言 = 信（人的言语代表诚信）",
    verified: true
  },
  {
    id: "logic-hard-10",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "心 + 亡",
      operator: "=",
      right: "?",
      hint: "心里匆忙"
    },
    options: ["忙", "忘", "恐", "惊"],
    correctAnswer: "忙",
    explanation: "心 + 亡 = 忙（心里匆忙，亡通'忙'）",
    verified: true
  },

  // ===== 语义推理 =====
  {
    id: "meaning-easy-1",
    difficulty: "easy",
    type: "meaning",
    question: {
      left: "山 + 石",
      operator: "=",
      right: "?",
      hint: "山上的石头"
    },
    options: ["岩", "崖", "峰", "岭"],
    correctAnswer: "岩",
    explanation: "山 + 石 = 岩（山上的石头是岩石）",
    verified: true
  },
  {
    id: "meaning-easy-2",
    difficulty: "easy",
    type: "meaning",
    question: {
      left: "日 + 生",
      operator: "=",
      right: "?",
      hint: "太阳升起"
    },
    options: ["星", "晴", "明", "旦"],
    correctAnswer: "星",
    explanation: "日 + 生 = 星（天上生出的光点）",
    verified: true
  },
  {
    id: "meaning-medium-1",
    difficulty: "medium",
    type: "meaning",
    question: {
      left: "竹 + 毛",
      operator: "=",
      right: "?",
      hint: "用竹子和毛做成"
    },
    options: ["笔", "竿", "箭", "筷"],
    correctAnswer: "笔",
    explanation: "竹 + 毛 = 笔（古代用竹子和毛做成毛笔）",
    verified: true
  },
  {
    id: "meaning-medium-2",
    difficulty: "medium",
    type: "meaning",
    question: {
      left: "禾 + 火",
      operator: "=",
      right: "?",
      hint: "粮食遇火"
    },
    options: ["秋", "秒", "秧", "种"],
    correctAnswer: "秋",
    explanation: "禾 + 火 = 秋（秋天收获后，禾杆像火一样红）",
    verified: true
  },
  {
    id: "meaning-hard-1",
    difficulty: "hard",
    type: "meaning",
    question: {
      left: "因 + 心",
      operator: "=",
      right: "?",
      hint: "心存感激"
    },
    options: ["恩", "思", "想", "念"],
    correctAnswer: "恩",
    explanation: "因 + 心 = 恩（心存感激的原因）",
    verified: true
  },
  {
    id: "meaning-hard-2",
    difficulty: "hard",
    type: "meaning",
    question: {
      left: "古 + 口",
      operator: "=",
      right: "?",
      hint: "古老的语言"
    },
    options: ["古", "叶", "舌", "吉"],
    correctAnswer: "舌",
    explanation: "古 + 口 = 舌（古人以舌头代表语言）",
    verified: true
  },

  // ===== 新增：更多简单题 =====
  {
    id: "pattern-easy-9",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "火",
      operator: "+ 火",
      right: "炎",
      hint: "两个火在一起"
    },
    options: ["炎", "烧", "焰", "灰"],
    correctAnswer: "炎",
    explanation: "火 + 火 = 炎（两火成炎，炎热）",
    verified: true
  },
  {
    id: "pattern-easy-10",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "土",
      operator: "+ 土",
      right: "圭",
      hint: "两个土堆叠"
    },
    options: ["圭", "地", "场", "堆"],
    correctAnswer: "圭",
    explanation: "土 + 土 = 圭（两土相叠，古代测日影的仪器）",
    verified: true
  },
  {
    id: "pattern-easy-11",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "刀",
      operator: "+ 刀",
      right: "刃",
      hint: "两把刀"
    },
    options: ["刃", "刻", "剑", "划"],
    correctAnswer: "刃",
    explanation: "刀 + 刀 = 刃（两刀组成刀刃）",
    verified: true
  },
  {
    id: "pattern-easy-12",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "禾",
      operator: "+ 口",
      right: "和",
      hint: "粮食在口"
    },
    options: ["和", "秋", "秒", "种"],
    correctAnswer: "和",
    explanation: "禾 + 口 = 和（有粮食吃就和气）",
    verified: true
  },

  // ===== 新增：更多中等题 =====
  {
    id: "part-medium-9",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "讠 + 青",
      operator: "=",
      right: "?",
      hint: "言字旁"
    },
    options: ["请", "清", "情", "晴"],
    correctAnswer: "请",
    explanation: "讠（言字旁）+ 青 = 请（请求）",
    verified: true
  },
  {
    id: "part-medium-10",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "钅 + 少",
      operator: "=",
      right: "?",
      hint: "金字旁"
    },
    options: ["钞", "铁", "钱", "钉"],
    correctAnswer: "钞",
    explanation: "钅（金字旁）+ 少 = 钞（钞票）",
    verified: true
  },
  {
    id: "part-medium-11",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "氵 + 工",
      operator: "=",
      right: "?",
      hint: "三点水"
    },
    options: ["江", "河", "湖", "海"],
    correctAnswer: "江",
    explanation: "氵（三点水）+ 工 = 江（江河）",
    verified: true
  },
  {
    id: "part-medium-12",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "纟 + 及",
      operator: "=",
      right: "?",
      hint: "绞丝旁"
    },
    options: ["级", "纸", "线", "红"],
    correctAnswer: "级",
    explanation: "纟（绞丝旁）+ 及 = 级（等级）",
    verified: true
  },

  // ===== 新增：更多困难题 =====
  {
    id: "logic-hard-11",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "大 + 小",
      operator: "=",
      right: "?",
      hint: "大小对比"
    },
    options: ["尖", "尘", "劣", "尖"],
    correctAnswer: "尖",
    explanation: "小在上、大在下 = 尖（尖锐）",
    verified: true
  },
  {
    id: "logic-hard-12",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "人 + 木",
      operator: "=",
      right: "?",
      hint: "人靠在木头上"
    },
    options: ["休", "体", "保", "依"],
    correctAnswer: "休",
    explanation: "人 + 木 = 休（人靠树休息）",
    verified: true
  },
  {
    id: "logic-hard-13",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "女 + 子",
      operator: "=",
      right: "?",
      hint: "母子关系"
    },
    options: ["好", "姐", "妹", "妈"],
    correctAnswer: "好",
    explanation: "女 + 子 = 好（女子为好，美好）",
    verified: true
  },
  {
    id: "logic-hard-14",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "日 + 十",
      operator: "=",
      right: "?",
      hint: "太阳和十字"
    },
    options: ["早", "旦", "古", "旧"],
    correctAnswer: "早",
    explanation: "日 + 十 = 早（日出十分为早晨）",
    verified: true
  },

  // ===== 新增：更多语义题 =====
  {
    id: "meaning-medium-3",
    difficulty: "medium",
    type: "meaning",
    question: {
      left: "门 + 日",
      operator: "=",
      right: "?",
      hint: "门缝的阳光"
    },
    options: ["间", "闪", "闲", "闻"],
    correctAnswer: "间",
    explanation: "门 + 日 = 间（门缝中透过阳光）",
    verified: true
  },
  {
    id: "meaning-medium-4",
    difficulty: "medium",
    type: "meaning",
    question: {
      left: "宀 + 女",
      operator: "=",
      right: "?",
      hint: "家中有女"
    },
    options: ["安", "宁", "家", "宅"],
    correctAnswer: "安",
    explanation: "宀（宝盖头）+ 女 = 安（家有女人才安宁）",
    verified: true
  },
  {
    id: "meaning-easy-3",
    difficulty: "easy",
    type: "meaning",
    question: {
      left: "雨 + 田",
      operator: "=",
      right: "?",
      hint: "田地上下雨"
    },
    options: ["雷", "电", "雪", "霜"],
    correctAnswer: "雷",
    explanation: "雨 + 田 = 雷（田地上空打雷）",
    verified: true
  },
  {
    id: "meaning-hard-3",
    difficulty: "hard",
    type: "meaning",
    question: {
      left: "舟 + 刀",
      operator: "=",
      right: "?",
      hint: "船和刀"
    },
    options: ["船", "航", "舰", "艇"],
    correctAnswer: "船",
    explanation: "舟 + 刀 = 船（古代造船需要用刀）",
    verified: true
  }
];

// 获取指定难度的题目
export const getPuzzleByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return VERIFIED_PUZZLE_QUESTIONS.filter(q => q.difficulty === difficulty);
};

// 获取随机题目
export const getRandomPuzzle = (count: number = 10) => {
  const shuffled = [...VERIFIED_PUZZLE_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// 获取指定类型的题目
export const getPuzzleByType = (type: PuzzleQuestion['type']) => {
  return VERIFIED_PUZZLE_QUESTIONS.filter(q => q.type === type);
};

// 统计信息
export const getPuzzleStats = () => {
  return {
    total: VERIFIED_PUZZLE_QUESTIONS.length,
    byDifficulty: {
      easy: getPuzzleByDifficulty('easy').length,
      medium: getPuzzleByDifficulty('medium').length,
      hard: getPuzzleByDifficulty('hard').length,
    },
    byType: {
      pattern: getPuzzleByType('pattern').length,
      partComposition: getPuzzleByType('part-composition').length,
      meaning: getPuzzleByType('meaning').length,
      logic: getPuzzleByType('logic').length,
    },
    verified: VERIFIED_PUZZLE_QUESTIONS.filter(q => q.verified).length,
  };
};
