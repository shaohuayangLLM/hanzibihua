/**
 * 词语搭配练习数据 - 重构版 Part 1 (Clean Version)
 * 形容词+名词、量词+名词、动词+宾语
 *
 * 当前为精简版：22 题（形容词+名词 4 题，量词+名词 8 题，动词+宾语 10 题）
 */

import type { CollocationExercise } from "./wordCollocationTypes";

export const WORD_COLLOCATION_EXERCISES_PART1_CLEAN: CollocationExercise[] = [
  // ============ 形容词+名词 (4题，待补全) ============
  {
    id: "wc001",
    category: "形容词+名词",
    categoryDescription: "形容词修饰名词，描述事物的性质和特征",
    left: "美丽",
    leftPinyin: "měi lì",
    leftPos: "形容词",
    connector: "的",
    right: "",
    rightPos: "名词",
    correct: "花朵",
    correctPinyin: "huā duǒ",
    options: [
      { text: "花朵", pinyin: "huā duǒ" },
      { text: "公园", pinyin: "gōng yuán" },
      { text: "风景", pinyin: "fēng jǐng" },
      { text: "蝴蝶", pinyin: "hú dié" },
    ],
    examples: [
      { sentence: "春天到了，公园里开满了美丽的花朵。", highlight: "美丽的花朵" },
      { sentence: "小朋友们都喜欢美丽的花朵。", highlight: "美丽的花朵" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc002",
    category: "形容词+名词",
    categoryDescription: "形容词修饰名词，描述事物的性质和特征",
    left: "蓝蓝",
    leftPinyin: "lán lán",
    leftPos: "形容词",
    connector: "的",
    right: "",
    rightPos: "名词",
    correct: "天空",
    correctPinyin: "tiān kōng",
    options: [
      { text: "天空", pinyin: "tiān kōng" },
      { text: "大海", pinyin: "dà hǎi" },
      { text: "湖水", pinyin: "hú shuǐ" },
      { text: "河流", pinyin: "hé liú" },
    ],
    examples: [
      { sentence: "蓝蓝的天空飘着白云。", highlight: "蓝蓝的天空" },
      { sentence: "我喜欢蓝蓝的天空。", highlight: "蓝蓝的天空" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc003",
    category: "形容词+名词",
    categoryDescription: "形容词修饰名词，描述事物的性质和特征",
    left: "绿绿",
    leftPinyin: "lǜ lǜ",
    leftPos: "形容词",
    connector: "的",
    right: "",
    rightPos: "名词",
    correct: "草地",
    correctPinyin: "cǎo dì",
    options: [
      { text: "草地", pinyin: "cǎo dì" },
      { text: "树叶", pinyin: "shù yè" },
      { text: "禾苗", pinyin: "hé miáo" },
      { text: "小草", pinyin: "xiǎo cǎo" },
    ],
    examples: [
      { sentence: "春天的草地绿绿的，真好看。", highlight: "绿绿的" },
      { sentence: "小朋友们在绿绿的草地上玩耍。", highlight: "绿绿的草地" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  // ... (其余题目省略，占位符) ...
  {
    id: "wc012",
    category: "形容词+名词",
    categoryDescription: "形容词修饰名词，描述事物的性质和特征",
    left: "快乐",
    leftPinyin: "kuài lè",
    leftPos: "形容词",
    connector: "的",
    right: "",
    rightPos: "名词",
    correct: "节日",
    correctPinyin: "jié rì",
    options: [
      { text: "节日", pinyin: "jié rì" },
      { text: "时光", pinyin: "shí guāng" },
      { text: "童年", pinyin: "tóng nián" },
      { text: "生活", pinyin: "shēng huó" },
    ],
    examples: [
      { sentence: "六一儿童节是快乐的节日。", highlight: "快乐的节日" },
      { sentence: "我们度过了一个快乐的节日。", highlight: "快乐的节日" },
    ],
    difficulty: "easy",
    tags: ["一年级下", "常用"],
  },

  // ============ 量词+名词 (8题) ============
  {
    id: "wc013",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一朵",
    leftPinyin: "yī duǒ",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "花",
    correctPinyin: "huā",
    options: [
      { text: "花", pinyin: "huā" },
      { text: "云", pinyin: "yún" },
      { text: "树", pinyin: "shù" },
      { text: "草", pinyin: "cǎo" },
    ],
    examples: [
      { sentence: "妈妈给我一朵花。", highlight: "一朵花" },
      { sentence: "花园里开着一朵花。", highlight: "一朵花" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc014",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一条",
    leftPinyin: "yī tiáo",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "鱼",
    correctPinyin: "yú",
    options: [
      { text: "鱼", pinyin: "yú" },
      { text: "河", pinyin: "hé" },
      { text: "路", pinyin: "lù" },
      { text: "蛇", pinyin: "shé" },
    ],
    examples: [
      { sentence: "水里游着一条鱼。", highlight: "一条鱼" },
      { sentence: "我养了一条鱼。", highlight: "一条鱼" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc015",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一只",
    leftPinyin: "yī zhī",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "鸟",
    correctPinyin: "niǎo",
    options: [
      { text: "鸟", pinyin: "niǎo" },
      { text: "猫", pinyin: "māo" },
      { text: "兔", pinyin: "tù" },
      { text: "鸡", pinyin: "jī" },
    ],
    examples: [
      { sentence: "树上停着一只鸟。", highlight: "一只鸟" },
      { sentence: "一只鸟在天上飞。", highlight: "一只鸟" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc016",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一棵",
    leftPinyin: "yī kē",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "树",
    correctPinyin: "shù",
    options: [
      { text: "树", pinyin: "shù" },
      { text: "草", pinyin: "cǎo" },
      { text: "花", pinyin: "huā" },
      { text: "苗", pinyin: "miáo" },
    ],
    examples: [
      { sentence: "学校门口有一棵大树。", highlight: "一棵树" },
      { sentence: "我种了一棵树。", highlight: "一棵树" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc017",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一本",
    leftPinyin: "yī běn",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "书",
    correctPinyin: "shū",
    options: [
      { text: "书", pinyin: "shū" },
      { text: "笔", pinyin: "bǐ" },
      { text: "纸", pinyin: "zhǐ" },
      { text: "尺", pinyin: "chǐ" },
    ],
    examples: [
      { sentence: "我有一本书。", highlight: "一本书" },
      { sentence: "老师给我一本书。", highlight: "一本书" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc018",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一张",
    leftPinyin: "yī zhāng",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "纸",
    correctPinyin: "zhǐ",
    options: [
      { text: "纸", pinyin: "zhǐ" },
      { text: "桌", pinyin: "zhuō" },
      { text: "床", pinyin: "chuáng" },
      { text: "画", pinyin: "huà" },
    ],
    examples: [
      { sentence: "老师给我一张纸。", highlight: "一张纸" },
      { sentence: "我用一张纸画画。", highlight: "一张纸" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc019",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一把",
    leftPinyin: "yī bǎ",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "伞",
    correctPinyin: "sǎn",
    options: [
      { text: "伞", pinyin: "sǎn" },
      { text: "刀", pinyin: "dāo" },
      { text: "尺", pinyin: "chǐ" },
      { text: "扇", pinyin: "shàn" },
    ],
    examples: [
      { sentence: "下雨了，我带了一把伞。", highlight: "一把伞" },
      { sentence: "奶奶买了一把扇子。", highlight: "一把扇" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc020",
    category: "量词+名词",
    categoryDescription: "量词和名词搭配，表示事物的数量",
    left: "一件",
    leftPinyin: "yī jiàn",
    leftPos: "量词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "衣服",
    correctPinyin: "yī fu",
    options: [
      { text: "衣服", pinyin: "yī fu" },
      { text: "裤子", pinyin: "kù zi" },
      { text: "鞋子", pinyin: "xié zi" },
      { text: "帽子", pinyin: "mào zi" },
    ],
    examples: [
      { sentence: "妈妈给我买了一件衣服。", highlight: "一件衣服" },
      { sentence: "这是一件新衣服。", highlight: "一件衣服" },
    ],
    difficulty: "easy",
    tags: ["一年级下", "常用"],
  },

  // ============ 动词+宾语 (20题) ============
  {
    id: "wc021",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "唱",
    leftPinyin: "chàng",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "歌",
    correctPinyin: "gē",
    options: [
      { text: "歌", pinyin: "gē" },
      { text: "画", pinyin: "huà" },
      { text: "字", pinyin: "zì" },
      { text: "舞", pinyin: "wǔ" },
    ],
    examples: [
      { sentence: "小朋友们一起唱歌。", highlight: "唱歌" },
      { sentence: "我喜欢唱歌。", highlight: "唱歌" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc022",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "读",
    leftPinyin: "dú",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "书",
    correctPinyin: "shū",
    options: [
      { text: "书", pinyin: "shū" },
      { text: "歌", pinyin: "gē" },
      { text: "画", pinyin: "huà" },
      { text: "舞", pinyin: "wǔ" },
    ],
    examples: [
      { sentence: "我每天都读书。", highlight: "读书" },
      { sentence: "认真读书很重要。", highlight: "读书" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc023",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "写",
    leftPinyin: "xiě",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "字",
    correctPinyin: "zì",
    options: [
      { text: "字", pinyin: "zì" },
      { text: "画", pinyin: "huà" },
      { text: "歌", pinyin: "gē" },
      { text: "书", pinyin: "shū" },
    ],
    examples: [
      { sentence: "上课要认真写字。", highlight: "写字" },
      { sentence: "我在练习写字。", highlight: "写字" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用", "重点"],
  },

  {
    id: "wc024",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "踢",
    leftPinyin: "tī",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "足球",
    correctPinyin: "zú qiú",
    options: [
      { text: "足球", pinyin: "zú qiú" },
      { text: "皮球", pinyin: "pí qiú" },
      { text: "篮球", pinyin: "lán qiú" },
      { text: "排球", pinyin: "pái qiú" },
    ],
    examples: [
      { sentence: "同学们在操场上踢足球。", highlight: "踢足球" },
      { sentence: "我喜欢踢足球。", highlight: "踢足球" },
    ],
    difficulty: "easy",
    tags: ["一年级下", "常用"],
  },

  {
    id: "wc025",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "拍",
    leftPinyin: "pāi",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "皮球",
    correctPinyin: "pí qiú",
    options: [
      { text: "皮球", pinyin: "pí qiú" },
      { text: "足球", pinyin: "zú qiú" },
      { text: "篮球", pinyin: "lán qiú" },
      { text: "排球", pinyin: "pái qiú" },
    ],
    examples: [
      { sentence: "小朋友在拍皮球。", highlight: "拍皮球" },
      { sentence: "我会拍皮球。", highlight: "拍皮球" },
    ],
    difficulty: "easy",
    tags: ["一年级下", "常用"],
  },

  {
    id: "wc026",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "吃",
    leftPinyin: "chī",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "苹果",
    correctPinyin: "píng guǒ",
    options: [
      { text: "苹果", pinyin: "píng guǒ" },
      { text: "香蕉", pinyin: "xiāng jiāo" },
      { text: "西瓜", pinyin: "xī guā" },
      { text: "葡萄", pinyin: "pú táo" },
    ],
    examples: [
      { sentence: "我喜欢吃苹果。", highlight: "吃苹果" },
      { sentence: "每天吃苹果对身体好。", highlight: "吃苹果" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc027",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "穿",
    leftPinyin: "chuān",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "衣服",
    correctPinyin: "yī fu",
    options: [
      { text: "衣服", pinyin: "yī fu" },
      { text: "鞋子", pinyin: "xié zi" },
      { text: "帽子", pinyin: "mào zi" },
      { text: "袜子", pinyin: "wà zi" },
    ],
    examples: [
      { sentence: "早上要自己穿衣服。", highlight: "穿衣服" },
      { sentence: "我会自己穿衣服了。", highlight: "穿衣服" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc028",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "背",
    leftPinyin: "bēi",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "书包",
    correctPinyin: "shū bāo",
    options: [
      { text: "书包", pinyin: "shū bāo" },
      { text: "书本", pinyin: "shū běn" },
      { text: "文具", pinyin: "wén jù" },
      { text: "课本", pinyin: "kè běn" },
    ],
    examples: [
      { sentence: "我每天背书包上学。", highlight: "背书包" },
      { sentence: "背书包要注意姿势。", highlight: "背书包" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc029",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "开",
    leftPinyin: "kāi",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "门",
    correctPinyin: "mén",
    options: [
      { text: "门", pinyin: "mén" },
      { text: "窗", pinyin: "chuāng" },
      { text: "灯", pinyin: "dēng" },
      { text: "书", pinyin: "shū" },
    ],
    examples: [
      { sentence: "请帮我开门。", highlight: "开门" },
      { sentence: "轻轻地开门。", highlight: "开门" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },

  {
    id: "wc030",
    category: "动词+宾语",
    categoryDescription: "动词后面接宾语，表示动作的对象",
    left: "关",
    leftPinyin: "guān",
    leftPos: "动词",
    connector: "",
    right: "",
    rightPos: "名词",
    correct: "窗",
    correctPinyin: "chuāng",
    options: [
      { text: "窗", pinyin: "chuāng" },
      { text: "门", pinyin: "mén" },
      { text: "灯", pinyin: "dēng" },
      { text: "书", pinyin: "shū" },
    ],
    examples: [
      { sentence: "下雨了，快关窗。", highlight: "关窗" },
      { sentence: "睡觉前要关窗。", highlight: "关窗" },
    ],
    difficulty: "easy",
    tags: ["一年级上", "常用"],
  },
];

export const WORD_COLLOCATION_EXERCISES_PART1_TEMP: CollocationExercise[] = WORD_COLLOCATION_EXERCISES_PART1_CLEAN;

// Helper functions
export const getExercisesByCategory = (
  category: CollocationExercise["category"]
): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_PART1_TEMP.filter(ex => ex.category === category);
};

export const getExercisesByDifficulty = (
  difficulty: CollocationExercise["difficulty"]
): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_PART1_TEMP.filter(ex => ex.difficulty === difficulty);
};

export const getExercisesByTag = (tag: string): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_PART1_TEMP.filter(ex => ex.tags.includes(tag));
};

export const getExercisesRange = (
  start: number,
  count: number
): CollocationExercise[] => {
  return WORD_COLLOCATION_EXERCISES_PART1_TEMP.slice(start, start + count);
};

export const COLLOCATION_STATS_PART1 = {
  total: WORD_COLLOCATION_EXERCISES_PART1_TEMP.length,
  byCategory: {
    "形容词+名词": 4,
    "量词+名词": 8,
    "动词+宾语": 10,
  },
};
