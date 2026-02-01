/**
 * 汉字推理题数据
 * 根据规律填空
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
}

// 汉字推理题数据
export const PUZZLE_QUESTIONS: PuzzleQuestion[] = [
  // ===== 简单：叠加/组合规律 =====
  {
    id: "pattern-easy-1",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "人",
      operator: "+ 人",
      right: "从",
      hint: "两个人组成"
    },
    options: ["众", "从", "队", "伏"],
    correctAnswer: "从",
    explanation: "人 + 人 = 从（两个人一前一后）"
  },
  {
    id: "pattern-easy-2",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "日",
      operator: "+ 月",
      right: "明",
      hint: "白天和月亮在一起"
    },
    options: ["明", "阳", "早", "旦"],
    correctAnswer: "明",
    explanation: "日 + 月 = 明（明亮）"
  },
  {
    id: "pattern-easy-3",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "木",
      operator: "+ 木",
      right: "林",
      hint: "树木多了"
    },
    options: ["林", "森", "树", "材"],
    correctAnswer: "林",
    explanation: "木 + 木 = 林（两棵树）"
  },
  {
    id: "pattern-easy-4",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "小",
      operator: "+ 土",
      right: "尘",
      hint: "小的泥土"
    },
    options: ["尘", "块", "地", "场"],
    correctAnswer: "尘",
    explanation: "小 + 土 = 尘（灰尘）"
  },
  {
    id: "pattern-easy-5",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "不",
      operator: "+ 正",
      right: "歪",
      hint: "不正在就是歪"
    },
    options: ["歪", "斜", "偏", "侧"],
    correctAnswer: "歪",
    explanation: "不 + 正 = 歪（不正就是歪）"
  },
  {
    id: "pattern-easy-6",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "千",
      operator: "+ 口",
      right: "舌",
      hint: "一千个口"
    },
    options: ["舌", "吞", "回", "古"],
    correctAnswer: "舌",
    explanation: "千 + 口 = 舌（舌头）"
  },
  {
    id: "pattern-easy-7",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "人",
      operator: "+ 言",
      right: "信",
      hint: "人说的话"
    },
    options: ["信", "认", "话", "语"],
    correctAnswer: "信",
    explanation: "人 + 言 = 信（人的言语，相信）"
  },
  {
    id: "pattern-easy-8",
    difficulty: "easy",
    type: "pattern",
    question: {
      left: "一",
      operator: "+ 火",
      right: "灭",
      hint: "用东西盖住火"
    },
    options: ["灭", "灾", "炎", "灰"],
    correctAnswer: "灭",
    explanation: "一 + 火 = 灭（一横盖住火）"
  },

  // ===== 中等：部件组合 =====
  {
    id: "part-medium-1",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "氵 + 可",
      operator: "=",
      right: "?",
      hint: "三点水 + 可"
    },
    options: ["河", "江", "湖", "海"],
    correctAnswer: "河",
    explanation: "氵（三点水）+ 可 = 河"
  },
  {
    id: "part-medium-2",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "木 + 公",
      operator: "=",
      right: "?",
      hint: "木字旁 + 公"
    },
    options: ["松", "树", "林", "材"],
    correctAnswer: "松",
    explanation: "木 + 公 = 松（松树）"
  },
  {
    id: "part-medium-3",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "亻 + 尔",
      operator: "=",
      right: "?",
      hint: "单人旁 + 尔"
    },
    options: ["你", "他", "她", "们"],
    correctAnswer: "你",
    explanation: "亻（单人旁）+ 尔 = 你"
  },
  {
    id: "part-medium-4",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "艹 + 化",
      operator: "=",
      right: "?",
      hint: "草字头 + 化"
    },
    options: ["花", "草", "叶", "苗"],
    correctAnswer: "花",
    explanation: "艹（草字头）+ 化 = 花"
  },
  {
    id: "part-medium-5",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "口 + 少",
      operator: "=",
      right: "?",
      hint: "口字旁 + 少"
    },
    options: ["吵", "吃", "喝", "叫"],
    correctAnswer: "吵",
    explanation: "口 + 少 = 吵（吵闹）"
  },
  {
    id: "part-medium-6",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "扌+ 丁",
      operator: "=",
      right: "?",
      hint: "提手旁 + 丁"
    },
    options: ["打", "提", "拉", "抱"],
    correctAnswer: "打",
    explanation: "扌（提手旁）+ 丁 = 打"
  },
  {
    id: "part-medium-7",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "火 + 丁",
      operator: "=",
      right: "?",
      hint: "火字旁 + 丁"
    },
    options: ["灯", "烧", "烤", "炸"],
    correctAnswer: "灯",
    explanation: "火 + 丁 = 灯（灯光）"
  },
  {
    id: "part-medium-8",
    difficulty: "medium",
    type: "part-composition",
    question: {
      left: "女 + 马",
      operator: "=",
      right: "?",
      hint: "女字旁 + 马"
    },
    options: ["妈", "姐", "妹", "奶"],
    correctAnswer: "妈",
    explanation: "女 + 马 = 妈（妈妈）"
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
      hint: "三个相同的部分堆叠"
    },
    options: ["众", "品", "森", "磊"],
    correctAnswer: "众",
    explanation: "三个人堆叠组成众（许多人）"
  },
  {
    id: "logic-hard-2",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "口 + 口 + 口",
      operator: "=",
      right: "?",
      hint: "三个相同的部分堆叠"
    },
    options: ["品", "众", "森", "磊"],
    correctAnswer: "品",
    explanation: "三个口堆叠成品（物品）"
  },
  {
    id: "logic-hard-3",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "木 + 木 + 木",
      operator: "=",
      right: "?",
      hint: "三个相同的部分堆叠"
    },
    options: ["森", "林", "众", "品"],
    correctAnswer: "森",
    explanation: "三木堆叠成森（森林）"
  },
  {
    id: "logic-hard-4",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "石 + 石 + 石",
      operator: "=",
      right: "?",
      hint: "三个相同的部分堆叠"
    },
    options: ["磊", "森", "品", "众"],
    correctAnswer: "磊",
    explanation: "三石堆叠成磊（石头多）"
  },
  {
    id: "logic-hard-5",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "白 + 水",
      operator: "=",
      right: "?",
      hint: "颜色 + 水"
    },
    options: ["泉", "冰", "汗", "江"],
    correctAnswer: "泉",
    explanation: "白水组合成泉（白色的水是泉水）"
  },
  {
    id: "logic-hard-6",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "小 + 大",
      operator: "=",
      right: "?",
      hint: "对比关系：上小下大"
    },
    options: ["尖", "劣", "尘", "卡"],
    correctAnswer: "尖",
    explanation: "小大组合成尖（上面小下面大就是尖）"
  },
  {
    id: "logic-hard-7",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "少 + 目",
      operator: "=",
      right: "?",
      hint: "组合规律"
    },
    options: ["省", "盲", "看", "眼"],
    correctAnswer: "省",
    explanation: "少目组合成省（节省）"
  },
  {
    id: "logic-hard-8",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "不 + 用",
      operator: "=",
      right: "?",
      hint: "否定关系"
    },
    options: ["甭", "还", "要", "用"],
    correctAnswer: "甭",
    explanation: "不用组合成甭（不用就是甭）"
  },
  {
    id: "logic-hard-9",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "人 + 言",
      operator: "=",
      right: "?",
      hint: "语义组合"
    },
    options: ["信", "认", "话", "语"],
    correctAnswer: "信",
    explanation: "人言组合成信（人的言语代表诚信）"
  },
  {
    id: "logic-hard-10",
    difficulty: "hard",
    type: "logic",
    question: {
      left: "田 + 心",
      operator: "=",
      right: "?",
      hint: "语义组合"
    },
    options: ["思", "恩", "想", "念"],
    correctAnswer: "思",
    explanation: "田心组合成思（田地需要心思）"
  },

  // ===== 语义推理 =====
  {
    id: "meaning-easy-1",
    difficulty: "easy",
    type: "meaning",
    question: {
      left: "手 + 目 = ?",
      operator: "",
      right: "",
      hint: "用眼睛看"
    },
    options: ["看", "见", "盯", "瞧"],
    correctAnswer: "看",
    explanation: "手 + 目 = 看（把手放在眼睛上看）"
  },
  {
    id: "meaning-easy-2",
    difficulty: "easy",
    type: "meaning",
    question: {
      left: "耳 + 门 = ?",
      operator: "",
      right: "",
      hint: "用耳朵听"
    },
    options: ["闻", "听", "问", "间"],
    correctAnswer: "闻",
    explanation: "耳 + 门 = 闻（用耳朵闻/听）"
  },
  {
    id: "meaning-medium-1",
    difficulty: "medium",
    type: "meaning",
    question: {
      left: "人 + 言 = ?",
      operator: "",
      right: "",
      hint: "人的话语"
    },
    options: ["信", "认", "话", "语"],
    correctAnswer: "信",
    explanation: "人 + 言 = 信（人的言语 = 相信）"
  },
  {
    id: "meaning-medium-2",
    difficulty: "medium",
    type: "meaning",
    question: {
      left: "心 + 亡 = ?",
      operator: "",
      right: "",
      hint: "心里忙"
    },
    options: ["忙", "忘", "恐", "惊"],
    correctAnswer: "忙",
    explanation: "心 + 亡 = 忙（心里忙）"
  },
  {
    id: "meaning-hard-1",
    difficulty: "hard",
    type: "meaning",
    question: {
      left: "田 + 心 = ?",
      operator: "",
      right: "",
      hint: "田地的心思"
    },
    options: "思,恩,念,感".split(","),
    correctAnswer: "思",
    explanation: "田 + 心 = 思（在田里劳作的心思）"
  },
  {
    id: "meaning-hard-2",
    difficulty: "hard",
    type: "meaning",
    question: {
      left: "因 + 心 = ?",
      operator: "",
      right: "",
      hint: "有原因的心思"
    },
    options: ["恩", "思", "想", "念"],
    correctAnswer: "恩",
    explanation: "因 + 心 = 恩（恩惠）"
  }
];

// 获取指定难度的题目
export const getPuzzleByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return PUZZLE_QUESTIONS.filter(q => q.difficulty === difficulty);
};

// 获取随机题目
export const getRandomPuzzle = (count: number = 10) => {
  const shuffled = [...PUZZLE_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// 获取指定类型的题目
export const getPuzzleByType = (type: PuzzleQuestion['type']) => {
  return PUZZLE_QUESTIONS.filter(q => q.type === type);
};
