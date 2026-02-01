/**
 * 部件换换乐数据
 * 偏旁组合游戏
 */

export interface ComponentSwapLevel {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  radical: string;         // 当前偏旁
  radicalName: string;     // 偏旁名称
  swaps: {
    part: string;          // 另一部分
    fromChar: string;      // 原来的字
    toChar: string;        // 变成的字
    toPinyin: string;      // 新字拼音
    toMeaning: string;      // 新字含义
  }[];
}

// 部件换换乐关卡数据
export const COMPONENT_SWAP_LEVELS: ComponentSwapLevel[] = [
  // 简单：三点水
  {
    id: "water-easy",
    difficulty: "easy",
    radical: "氵",
    radicalName: "三点水",
    swaps: [
      { part: "工", fromChar: "江", toChar: "河", toPinyin: "hé", toMeaning: "河流" },
      { part: "可", fromChar: "河", toChar: "江", toPinyin: "jiāng", toMeaning: "江河" },
      { part: "胡", fromChar: "湖", toChar: "江", toPinyin: "jiāng", toMeaning: "江河" },
      { part: "每", fromChar: "海", toChar: "河", toPinyin: "hé", toMeaning: "河流" },
      { part: "去", fromChar: "法", toChar: "海", toPinyin: "hǎi", toMeaning: "大海" },
      { part: "少", fromChar: "沙", toChar: "江", toPinyin: "jiāng", toMeaning: "江河" },
      { part: "气", fromChar: "汽", toChar: "海", toPinyin: "hǎi", toMeaning: "大海" },
      { part: "永", fromChar: "泳", toChar: "河", toPinyin: "hé", toMeaning: "河流" }
    ]
  },
  // 简单：木字旁
  {
    id: "wood-easy",
    difficulty: "easy",
    radical: "木",
    radicalName: "木字旁",
    swaps: [
      { part: "公", fromChar: "松", toChar: "林", toPinyin: "lín", toMeaning: "树林" },
      { part: "对", fromChar: "树", toChar: "林", toPinyin: "lín", toMeaning: "树林" },
      { part: "兆", fromChar: "桃", toChar: "桥", toPinyin: "qiáo", toMeaning: "桥梁" },
      { part: "弟", fromChar: "梯", toChar: "树", toPinyin: "shù", toMeaning: "树木" },
      { part: "几", fromChar: "机", toChar: "林", toPinyin: "lín", toMeaning: "树林" },
      { part: "支", fromChar: "枝", toChar: "树", toPinyin: "shù", toMeaning: "树木" },
      { part: "白", fromChar: "柏", toChar: "林", toPinyin: "lín", toMeaning: "树林" },
      { part: "果", fromChar: "棵", toChar: "桥", toPinyin: "qiáo", toMeaning: "桥梁" }
    ]
  },
  // 简单：单人旁
  {
    id: "person-easy",
    difficulty: "easy",
    radical: "亻",
    radicalName: "单人旁",
    swaps: [
      { part: "尔", fromChar: "你", toChar: "他", toPinyin: "tā", toMeaning: "他" },
      { part: "也", fromChar: "他", toChar: "你", toPinyin: "nǐ", toMeaning: "你" },
      { part: "门", fromChar: "们", toChar: "你", toPinyin: "nǐ", toMeaning: "你" },
      { part: "木", fromChar: "休", toChar: "你", toPinyin: "nǐ", toMeaning: "你" },
      { part: "本", fromChar: "体", toChar: "休", toPinyin: "xiū", toMeaning: "休息" },
      { part: "主", fromChar: "住", toChar: "休", toPinyin: "xiū", toMeaning: "休息" },
      { part: "立", fromChar: "位", toChar: "住", toPinyin: "zhù", toMeaning: "居住" },
      { part: "分", fromChar: "位", toChar: "体", toPinyin: "tǐ", toMeaning: "身体" }
    ]
  },
  // 中等：草字头
  {
    id: "grass-medium",
    difficulty: "medium",
    radical: "艹",
    radicalName: "草字头",
    swaps: [
      { part: "化", fromChar: "花", toChar: "草", toPinyin: "cǎo", toMeaning: "花草" },
      { part: "早", fromChar: "草", toChar: "花", toPinyin: "huā", toMeaning: "花朵" },
      { part: "可", fromChar: "哥", toChar: "草", toPinyin: "cǎo", toMeaning: "花草" },
      { part: "田", fromChar: "苗", toChar: "花", toPinyin: "huā", toMeaning: "花朵" },
      { part: "下", fromChar: "芊", toChar: "草", toPinyin: "cǎo", toMeaning: "花草" },
      { part: "予", fromChar: "野", toChar: "花", toPinyin: "huā", toMeaning: "花朵" },
      { part: "军", fromChar: "辉", toChar: "草", toPinyin: "cǎo", toMeaning: "花草" },
      { part: "化", fromChar: "花", toChar: "茶", toPinyin: "chá", toMeaning: "茶叶" }
    ]
  },
  // 中等：口字旁
  {
    id: "mouth-medium",
    difficulty: "medium",
    radical: "口",
    radicalName: "口字旁",
    swaps: [
      { part: "十", fromChar: "叶", toChar: "花", toPinyin: "huā", toMeaning: "花朵" },
      { part: "少", fromChar: "吵", toChar: "叶", toPinyin: "yè", toMeaning: "叶子" },
      { part: "尤", fromChar: "就", toChar: "吃", toPinyin: "chī", toMeaning: "吃" },
      { part: "欠", fromChar: "欢", toChar: "喝", toPinyin: "hē", toMeaning: "喝" },
      { part: "是", fromChar: "提", toChar: "唱", toPinyin: "chàng", toMeaning: "唱歌" },
      { part: "交", fromChar: "校", toChar: "叫", toPinyin: "jiào", toMeaning: "叫喊" },
      { part: "及", fromChar: "吸", toChar: "吃", toPinyin: "chī", toMeaning: "吃" },
      { part: "象", fromChar: "像", toChar: "喝", toPinyin: "hē", toMeaning: "喝" }
    ]
  },
  // 中等：提手旁
  {
    id: "hand-medium",
    difficulty: "medium",
    radical: "扌",
    radicalName: "提手旁",
    swaps: [
      { part: "丁", fromChar: "打", toChar: "提", toPinyin: "tí", toMeaning: "提东西" },
      { part: "是", fromChar: "提", toChar: "打", toPinyin: "dǎ", toMeaning: "打" },
      { part: "合", fromChar: "拿", toChar: "打", toPinyin: "dǎ", toMeaning: "打" },
      { part: "弟", fromChar: "梯", toChar: "提", toPinyin: "tí", toMeaning: "提东西" },
      { part: "立", fromChar: "拉", toChar: "拿", toPinyin: "ná", toMeaning: "拿取" },
      { part: "包", fromChar: "抱", toChar: "拉", toPinyin: "lā", toMeaning: "拉" },
      { part: "兆", fromChar: "桃", toChar: "提", toPinyin: "tí", toMeaning: "提东西" },
      { part: "争", fromChar: "挣", toChar: "打", toPinyin: "dǎ", toMeaning: "打" }
    ]
  },
  // 困难：火字旁
  {
    id: "fire-hard",
    difficulty: "hard",
    radical: "火",
    radicalName: "火字旁",
    swaps: [
      { part: "丁", fromChar: "灯", toChar: "烧", toPinyin: "shāo", toMeaning: "烧" },
      { part: "尧", fromChar: "烧", toChar: "灯", toPinyin: "dēng", toMeaning: "灯光" },
      { part: "孝", fromChar: "烤", toChar: "烧", toPinyin: "shāo", toMeaning: "烧" },
      { part: "少", fromChar: "炒", toChar: "灯", toPinyin: "dēng", toMeaning: "灯光" },
      { part: "乍", fromChar: "炸", toChar: "烤", toPinyin: "kǎo", toMeaning: "烧烤" },
      { part: "因", fromChar: "烟", toChar: "炒", toPinyin: "chǎo", toMeaning: "炒菜" },
      { part: "昔", fromChar: "蜡", toChar: "灯", toPinyin: "dēng", toMeaning: "灯光" },
      { part: "蜀", fromChar: "烛", toChar: "烧", toPinyin: "shāo", toMeaning: "烧" }
    ]
  },
  // 困难：女字旁
  {
    id: "woman-hard",
    difficulty: "hard",
    radical: "女",
    radicalName: "女字旁",
    swaps: [
      { part: "马", fromChar: "妈", toChar: "姐", toPinyin: "jiě", toMeaning: "姐姐" },
      { part: "且", fromChar: "姐", toChar: "妈", toPinyin: "mā", toMeaning: "妈妈" },
      { part: "未", fromChar: "妹", toChar: "妈", toPinyin: "mā", toMeaning: "妈妈" },
      { part: "乃", fromChar: "奶", toChar: "姐", toPinyin: "jiě", toMeaning: "姐姐" },
      { part: "古", fromChar: "姑", toChar: "妹", toPinyin: "mèi", toMeaning: "妹妹" },
      { part: "波", fromChar: "婆", toChar: "奶", toPinyin: "nǎi", toMeaning: "奶奶" },
      { part: "少", fromChar: "妙", toChar: "姑", toPinyin: "gū", toMeaning: "姑姑" },
      { part: "子", fromChar: "好", toChar: "姐", toPinyin: "jiě", toMeaning: "姐姐" }
    ]
  },
  // 困难：土字旁
  {
    id: "earth-hard",
    difficulty: "hard",
    radical: "土",
    radicalName: "土字旁",
    swaps: [
      { part: "也", fromChar: "地", toChar: "场", toPinyin: "chǎng", toMeaning: "场地" },
      { part: "广", fromChar: "场", toChar: "地", toPinyin: "dì", toMeaning: "土地" },
      { part: "皮", fromChar: "坡", toChar: "地", toPinyin: "dì", toMeaning: "土地" },
      { part: "隹", fromChar: "堆", toChar: "场", toPinyin: "chǎng", toMeaning: "场地" },
      { part: "失", fromChar: "块", toChar: "坡", toPinyin: "pō", toMeaning: "山坡" },
      { part: "不", fromChar: "坏", toChar: "地", toPinyin: "dì", toMeaning: "土地" },
      { part: "从", fromChar: "坐", toChar: "块", toPinyin: "kuài", toMeaning: "一块" },
      { part: "里", fromChar: "埋", toChar: "场", toPinyin: "chǎng", toMeaning: "场地" }
    ]
  },
  // 困难：竖心旁
  {
    id: "heart-hard",
    difficulty: "hard",
    radical: "忄",
    radicalName: "竖心旁",
    swaps: [
      { part: "青", fromChar: "情", toChar: "想", toPinyin: "xiǎng", toMeaning: "想念" },
      { part: "相", fromChar: "想", toChar: "情", toPinyin: "qíng", toMeaning: "感情" },
      { part: "亡", fromChar: "忙", toChar: "想", toPinyin: "xiǎng", toMeaning: "想念" },
      { part: "夬", fromChar: "快", toChar: "情", toPinyin: "qíng", toMeaning: "感情" },
      { part: "白", fromChar: "怕", toChar: "想", toPinyin: "xiǎng", toMeaning: "想念" },
      { part: "京", fromChar: "惊", toChar: "快", toPinyin: "kuài", toMeaning: "快乐" },
      { part: "肖", fromChar: "悄", toChar: "忙", toPinyin: "máng", toMeaning: "忙碌" },
      { part: "羊", fromChar: "样", toChar: "情", toPinyin: "qíng", toMeaning: "感情" }
    ]
  }
];

// 获取指定难度的关卡
export const getSwapLevelsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return COMPONENT_SWAP_LEVELS.filter(level => level.difficulty === difficulty);
};

// 获取随机关卡
export const getRandomSwapLevel = (count: number = 5) => {
  const shuffled = [...COMPONENT_SWAP_LEVELS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
