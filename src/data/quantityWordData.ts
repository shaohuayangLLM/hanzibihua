/**
 * 量词练习数据
 * 一年级常用量词练习
 */

export interface QuantityWordExercise {
  id: string;
  noun: string;          // 名词
  pinyin: string;        // 名词拼音
  correct: string;       // 正确量词
  options: string[];     // 选项（4个）
  examples: string[];    // 例句
  category: string;      // 分类
}

export const QUANTITY_EXERCISES: QuantityWordExercise[] = [
  // 动物类
  {
    id: "q001",
    noun: "鸟",
    pinyin: "niǎo",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只小鸟", "两只喜鹊", "三只燕子"],
    category: "动物"
  },
  {
    id: "q002",
    noun: "牛",
    pinyin: "niú",
    correct: "头",
    options: ["只", "个", "条", "头"],
    examples: ["一头黄牛", "两头水牛", "三头奶牛"],
    category: "动物"
  },
  {
    id: "q003",
    noun: "鱼",
    pinyin: "yú",
    correct: "条",
    options: ["只", "个", "条", "头"],
    examples: ["一条小鱼", "两条金鱼", "三条鲤鱼"],
    category: "动物"
  },
  {
    id: "q004",
    noun: "马",
    pinyin: "mǎ",
    correct: "匹",
    options: ["只", "个", "匹", "头"],
    examples: ["一匹白马", "两匹骏马", "三匹小马"],
    category: "动物"
  },
  {
    id: "q005",
    noun: "猫",
    pinyin: "māo",
    correct: "只",
    options: ["只", "个", "条", "匹"],
    examples: ["一只小猫", "两只花猫", "三只黑猫"],
    category: "动物"
  },
  {
    id: "q006",
    noun: "狗",
    pinyin: "gǒu",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只小狗", "两只白狗", "三只黑狗"],
    category: "动物"
  },
  {
    id: "q007",
    noun: "鸡",
    pinyin: "jī",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只小鸡", "两只母鸡", "三只公鸡"],
    category: "动物"
  },
  {
    id: "q008",
    noun: "兔子",
    pinyin: "tùzi",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只兔子", "两只白兔", "三只小兔"],
    category: "动物"
  },
  {
    id: "q009",
    noun: "老虎",
    pinyin: "lǎohǔ",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只老虎", "两只大老虎", "三只小老虎"],
    category: "动物"
  },
  {
    id: "q010",
    noun: "狮子",
    pinyin: "shīzi",
    correct: "只",
    options: ["只", "个", "条", "匹"],
    examples: ["一只狮子", "两只大狮子", "三只小狮子"],
    category: "动物"
  },
  {
    id: "q011",
    noun: "大象",
    pinyin: "dàxiàng",
    correct: "头",
    options: ["只", "个", "条", "头"],
    examples: ["一头大象", "两头大象", "三头小象"],
    category: "动物"
  },
  {
    id: "q012",
    noun: "熊猫",
    pinyin: "xióngmāo",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只熊猫", "两只大熊猫", "三只小熊猫"],
    category: "动物"
  },
  {
    id: "q013",
    noun: "猴子",
    pinyin: "hóuzi",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只猴子", "两只小猴", "三只大猴子"],
    category: "动物"
  },
  {
    id: "q014",
    noun: "羊",
    pinyin: "yáng",
    correct: "只",
    options: ["只", "个", "条", "头"],
    examples: ["一只小羊", "两只山羊", "三只绵羊"],
    category: "动物"
  },
  {
    id: "q015",
    noun: "猪",
    pinyin: "zhū",
    correct: "头",
    options: ["只", "个", "条", "头"],
    examples: ["一头小猪", "两头大猪", "三头胖猪"],
    category: "动物"
  },

  // 物品类
  {
    id: "q016",
    noun: "书",
    pinyin: "shū",
    correct: "本",
    options: ["只", "本", "个", "条"],
    examples: ["一本书", "两本故事书", "三本课本"],
    category: "物品"
  },
  {
    id: "q017",
    noun: "桌子",
    pinyin: "zhuōzi",
    correct: "张",
    options: ["只", "张", "个", "条"],
    examples: ["一张桌子", "两张书桌", "三张课桌"],
    category: "物品"
  },
  {
    id: "q018",
    noun: "椅子",
    pinyin: "yǐzi",
    correct: "把",
    options: ["只", "把", "个", "张"],
    examples: ["一把椅子", "两把椅子", "三把小椅子"],
    category: "物品"
  },
  {
    id: "q019",
    noun: "笔",
    pinyin: "bǐ",
    correct: "支",
    options: ["只", "支", "个", "条"],
    examples: ["一支铅笔", "两支钢笔", "三支毛笔"],
    category: "物品"
  },
  {
    id: "q020",
    noun: "纸",
    pinyin: "zhǐ",
    correct: "张",
    options: ["只", "张", "个", "条"],
    examples: ["一张纸", "两张白纸", "三张彩纸"],
    category: "物品"
  },
  {
    id: "q021",
    noun: "衣服",
    pinyin: "yīfu",
    correct: "件",
    options: ["只", "件", "个", "条"],
    examples: ["一件衣服", "两件上衣", "三件新衣服"],
    category: "物品"
  },
  {
    id: "q022",
    noun: "裤子",
    pinyin: "kùzi",
    correct: "条",
    options: ["只", "件", "个", "条"],
    examples: ["一条裤子", "两条长裤", "三条短裤"],
    category: "物品"
  },
  {
    id: "q023",
    noun: "鞋子",
    pinyin: "xiézi",
    correct: "双",
    options: ["只", "双", "个", "条"],
    examples: ["一双鞋子", "两双运动鞋", "三双小鞋"],
    category: "物品"
  },
  {
    id: "q024",
    noun: "袜子",
    pinyin: "wàzi",
    correct: "双",
    options: ["只", "双", "个", "条"],
    examples: ["一双袜子", "两双新袜子", "三双花袜子"],
    category: "物品"
  },
  {
    id: "q025",
    noun: "帽子",
    pinyin: "màozi",
    correct: "顶",
    options: ["只", "顶", "个", "条"],
    examples: ["一顶帽子", "两顶红帽子", "三顶小帽子"],
    category: "物品"
  },
  {
    id: "q026",
    noun: "书包",
    pinyin: "shūbāo",
    correct: "个",
    options: ["只", "个", "条", "件"],
    examples: ["一个书包", "两个新书包", "三个小书包"],
    category: "物品"
  },
  {
    id: "q027",
    noun: "杯子",
    pinyin: "bēizi",
    correct: "个",
    options: ["只", "把", "个", "条"],
    examples: ["一个杯子", "两个大杯子", "三个小杯子"],
    category: "物品"
  },
  {
    id: "q028",
    noun: "盘子",
    pinyin: "pánzi",
    correct: "个",
    options: ["只", "张", "个", "条"],
    examples: ["一个盘子", "两个大盘子", "三个小盘子"],
    category: "物品"
  },
  {
    id: "q029",
    noun: "筷子",
    pinyin: "kuàizi",
    correct: "双",
    options: ["只", "根", "双", "个"],
    examples: ["一双筷子", "两双新筷子", "三双旧筷子"],
    category: "物品"
  },
  {
    id: "q030",
    noun: "刀子",
    pinyin: "dāozi",
    correct: "把",
    options: ["只", "把", "个", "条"],
    examples: ["一把刀子", "两把小刀", "三把水果刀"],
    category: "物品"
  },

  // 交通工具类
  {
    id: "q031",
    noun: "汽车",
    pinyin: "qìchē",
    correct: "辆",
    options: ["只", "辆", "个", "台"],
    examples: ["一辆汽车", "两辆小汽车", "三辆大汽车"],
    category: "交通工具"
  },
  {
    id: "q032",
    noun: "自行车",
    pinyin: "zìxíngchē",
    correct: "辆",
    options: ["只", "辆", "个", "台"],
    examples: ["一辆自行车", "两辆新自行车", "三辆旧自行车"],
    category: "交通工具"
  },
  {
    id: "q033",
    noun: "飞机",
    pinyin: "fēijī",
    correct: "架",
    options: ["只", "架", "个", "台"],
    examples: ["一架飞机", "两架大飞机", "三架小飞机"],
    category: "交通工具"
  },
  {
    id: "q034",
    noun: "船",
    pinyin: "chuán",
    correct: "艘",
    options: ["只", "艘", "个", "台"],
    examples: ["一艘大船", "两艘小船", "三艘轮船"],
    category: "交通工具"
  },
  {
    id: "q035",
    noun: "火车",
    pinyin: "huǒchē",
    correct: "列",
    options: ["只", "列", "个", "台"],
    examples: ["一列火车", "两列长火车", "三列短火车"],
    category: "交通工具"
  },
  {
    id: "q036",
    noun: "公交车",
    pinyin: "gōngjiāochē",
    correct: "辆",
    options: ["只", "辆", "个", "台"],
    examples: ["一辆公交车", "两辆大公交", "三辆小公交"],
    category: "交通工具"
  },
  {
    id: "q037",
    noun: "地铁",
    pinyin: "dìtiě",
    correct: "列",
    options: ["只", "列", "个", "台"],
    examples: ["一列地铁", "两列长地铁", "三列新地铁"],
    category: "交通工具"
  },
  {
    id: "q038",
    noun: "轮船",
    pinyin: "lúnchuán",
    correct: "艘",
    options: ["只", "艘", "个", "台"],
    examples: ["一艘轮船", "两艘大轮船", "三艘新轮船"],
    category: "交通工具"
  },

  // 人物类
  {
    id: "q039",
    noun: "人",
    pinyin: "rén",
    correct: "个",
    options: ["只", "个", "条", "位"],
    examples: ["一个人", "两个人", "三个人"],
    category: "人物"
  },
  {
    id: "q040",
    noun: "老师",
    pinyin: "lǎoshī",
    correct: "位",
    options: ["只", "个", "条", "位"],
    examples: ["一位老师", "两位好老师", "三位新老师"],
    category: "人物"
  },
  {
    id: "q041",
    noun: "医生",
    pinyin: "yīshēng",
    correct: "位",
    options: ["只", "个", "条", "位"],
    examples: ["一位医生", "两位好医生", "三位置医生"],
    category: "人物"
  },
  {
    id: "q042",
    noun: "学生",
    pinyin: "xuésheng",
    correct: "个",
    options: ["只", "个", "位", "名"],
    examples: ["一个学生", "两个好学生", "三个小同学"],
    category: "人物"
  },
  {
    id: "q043",
    noun: "朋友",
    pinyin: "péngyou",
    correct: "个",
    options: ["只", "个", "位", "名"],
    examples: ["一个朋友", "两个好朋友", "三个小朋友"],
    category: "人物"
  },

  // 植物类
  {
    id: "q044",
    noun: "树",
    pinyin: "shù",
    correct: "棵",
    options: ["只", "棵", "个", "条"],
    examples: ["一棵大树", "两棵小树", "三棵新树"],
    category: "植物"
  },
  {
    id: "q045",
    noun: "花",
    pinyin: "huā",
    correct: "朵",
    options: ["只", "朵", "个", "条"],
    examples: ["一朵花", "两朵红花", "三朵白花"],
    category: "植物"
  },
  {
    id: "q046",
    noun: "草",
    pinyin: "cǎo",
    correct: "棵",
    options: ["只", "棵", "根", "条"],
    examples: ["一棵草", "两棵小草", "三棵青草"],
    category: "植物"
  },
  {
    id: "q047",
    noun: "叶子",
    pinyin: "yèzi",
    correct: "片",
    options: ["只", "片", "个", "条"],
    examples: ["一片叶子", "两片绿叶", "三片黄叶"],
    category: "植物"
  },
  {
    id: "q048",
    noun: "苗",
    pinyin: "miáo",
    correct: "棵",
    options: ["只", "棵", "个", "条"],
    examples: ["一棵小苗", "两棵树苗", "三棵新苗"],
    category: "植物"
  },

  // 其他类
  {
    id: "q049",
    noun: "房子",
    pinyin: "fángzi",
    correct: "座",
    options: ["只", "座", "个", "条"],
    examples: ["一座房子", "两座大房子", "三座小房子"],
    category: "建筑"
  },
  {
    id: "q050",
    noun: "山",
    pinyin: "shān",
    correct: "座",
    options: ["只", "座", "个", "条"],
    examples: ["一座高山", "两座小山", "三座大山"],
    category: "自然"
  },
  {
    id: "q051",
    noun: "河",
    pinyin: "hé",
    correct: "条",
    options: ["只", "个", "条", "座"],
    examples: ["一条小河", "两条大河", "三条清河"],
    category: "自然"
  },
  {
    id: "q052",
    noun: "路",
    pinyin: "lù",
    correct: "条",
    options: ["只", "个", "条", "座"],
    examples: ["一条路", "两条大路", "三条小路"],
    category: "建筑"
  },
  {
    id: "q053",
    noun: "桥",
    pinyin: "qiáo",
    correct: "座",
    options: ["只", "座", "个", "条"],
    examples: ["一座桥", "两座大桥", "三座小桥"],
    category: "建筑"
  },
  {
    id: "q054",
    noun: "云",
    pinyin: "yún",
    correct: "朵",
    options: ["只", "朵", "个", "条"],
    examples: ["一朵白云", "两朵乌云", "三朵彩云"],
    category: "自然"
  },
  {
    id: "q055",
    noun: "星星",
    pinyin: "xīngxing",
    correct: "颗",
    options: ["只", "颗", "个", "朵"],
    examples: ["一颗星星", "两颗亮星", "三颗小星"],
    category: "自然"
  },
  {
    id: "q056",
    noun: "月亮",
    pinyin: "yuèliang",
    correct: "轮",
    options: ["只", "轮", "个", "颗"],
    examples: ["一轮月亮", "两轮明月", "三轮新月"],
    category: "自然"
  },
  {
    id: "q057",
    noun: "太阳",
    pinyin: "tàiyáng",
    correct: "个",
    options: ["只", "轮", "个", "颗"],
    examples: ["一个太阳", "两个大太阳", "三个小太阳"],
    category: "自然"
  },
  {
    id: "q058",
    noun: "雨",
    pinyin: "yǔ",
    correct: "场",
    options: ["只", "场", "个", "条"],
    examples: ["一场雨", "两场大雨", "三场小雨"],
    category: "自然"
  },
  {
    id: "q059",
    noun: "雪",
    pinyin: "xuě",
    correct: "场",
    options: ["只", "场", "个", "朵"],
    examples: ["一场雪", "两场大雪", "三场小雪"],
    category: "自然"
  },
  {
    id: "q060",
    noun: "风",
    pinyin: "fēng",
    correct: "阵",
    options: ["只", "阵", "场", "个"],
    examples: ["一阵风", "两阵大风", "三阵小风"],
    category: "自然"
  },
];

export const QUANTITY_CATEGORIES = [
  "全部",
  "动物",
  "物品",
  "交通工具",
  "人物",
  "植物",
  "建筑",
  "自然"
];
