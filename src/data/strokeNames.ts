export interface Stroke {
  name: string;           // 笔画名称
  pinyin: string;         // 拼音
  character: string;     // 代表字（包含该笔画的简单字）
  strokePosition: number; // 该笔画在字中的第几笔（从1开始）
  examples: string[];     // 更多例字
  category: string;       // 分类
  description?: string;   // 说明
}

// 笔画分类
export const STROKE_CATEGORIES = [
  "全部",
  "基本笔画",
  "复合笔画",
];

// 笔画数据
export const BASIC_STROKES: Stroke[] = [
  // 基本笔画
  {
    name: "横",
    pinyin: "héng",
    character: "一",
    strokePosition: 1,
    examples: ["二", "三", "十", "土"],
    category: "基本笔画",
    description: "从左到右，平平的",
  },
  {
    name: "竖",
    pinyin: "shù",
    character: "十",
    strokePosition: 2,
    examples: ["中", "上", "下", "土"],
    category: "基本笔画",
    description: "从上到下，直直的",
  },
  {
    name: "撇",
    pinyin: "piě",
    character: "人",
    strokePosition: 1,
    examples: ["八", "个", "入", "大"],
    category: "基本笔画",
    description: "从右上到左下，向左下斜",
  },
  {
    name: "捺",
    pinyin: "nà",
    character: "人",
    strokePosition: 2,
    examples: ["八", "大", "木", "入"],
    category: "基本笔画",
    description: "从左上到右下，向右下斜",
  },
  {
    name: "点",
    pinyin: "diǎn",
    character: "六",
    strokePosition: 4,
    examples: ["太", "头", "火", "小"],
    category: "基本笔画",
    description: "小小的点",
  },
  {
    name: "提",
    pinyin: "tí",
    character: "我",
    strokePosition: 7,
    examples: ["打", "把", "地", "玩"],
    category: "基本笔画",
    description: "从左下到右上，向上斜",
  },

  // 复合笔画
  {
    name: "横折",
    pinyin: "héng zhé",
    character: "口",
    strokePosition: 1,
    examples: ["日", "目", "田", "四"],
    category: "复合笔画",
    description: "先横后折",
  },
  {
    name: "竖钩",
    pinyin: "shù gōu",
    character: "小",
    strokePosition: 1,
    examples: ["水", "木", "不", "寸"],
    category: "复合笔画",
    description: "竖到下面向上钩",
  },
  {
    name: "横撇",
    pinyin: "héng piě",
    character: "又",
    strokePosition: 1,
    examples: ["水", "友", "发", "云"],
    category: "复合笔画",
    description: "先横后撇",
  },
  {
    name: "横钩",
    pinyin: "héng gōu",
    character: "字",
    strokePosition: 2,
    examples: ["家", "宝", "宁", "写"],
    category: "复合笔画",
    description: "先横后向上钩",
  },
  {
    name: "横折钩",
    pinyin: "héng zhé gōu",
    character: "刀",
    strokePosition: 1,
    examples: ["力", "月", "用", "同"],
    category: "复合笔画",
    description: "横、折、钩",
  },
  {
    name: "竖提",
    pinyin: "shù tí",
    character: "长",
    strokePosition: 1,
    examples: ["以", "比", "切", "民"],
    category: "复合笔画",
    description: "竖后提",
  },
  {
    name: "竖弯钩",
    pinyin: "shù wān gōu",
    character: "儿",
    strokePosition: 2,
    examples: ["七", "也", "电", "元"],
    category: "复合笔画",
    description: "竖、弯、钩",
  },
  {
    name: "撇折",
    pinyin: "piě zhé",
    character: "么",
    strokePosition: 1,
    examples: ["云", "去", "台", "能"],
    category: "复合笔画",
    description: "先撇后折",
  },
  {
    name: "撇点",
    pinyin: "piě diǎn",
    character: "女",
    strokePosition: 1,
    examples: ["如", "好", "妈", "姐"],
    category: "复合笔画",
    description: "先撇后点",
  },
  {
    name: "竖折",
    pinyin: "shù zhé",
    character: "山",
    strokePosition: 2,
    examples: ["出", "凶", "画", "击"],
    category: "复合笔画",
    description: "先竖后折",
  },
  {
    name: "弯钩",
    pinyin: "wān gōu",
    character: "子",
    strokePosition: 1,
    examples: ["字", "学", "承", "了"],
    category: "复合笔画",
    description: "弯线加钩",
  },
  {
    name: "横折弯",
    pinyin: "héng zhé wān",
    character: "朵",
    strokePosition: 1,
    examples: ["没", "沿", "船", "铅"],
    category: "复合笔画",
    description: "横、折、弯",
  },
  {
    name: "竖折折钩",
    pinyin: "shù zhé zhě gōu",
    character: "鸟",
    strokePosition: 1,
    examples: ["鸡", "鸭", "鸦", "鸵"],
    category: "复合笔画",
    description: "竖、折、折、钩",
  },
  {
    name: "卧钩",
    pinyin: "wò gōu",
    character: "心",
    strokePosition: 1,
    examples: ["必", "志", "忍", "态"],
    category: "复合笔画",
    description: "像月亮一样的钩",
  },
];
