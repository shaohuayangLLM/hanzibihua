export interface CharacterInfo {
  character: string;
  pinyin: string;
  meaning: string;
  strokeCount: number;
  radicalInfo: string;
  words: { word: string; pinyin: string; meaning: string }[];
  sentences: string[];
}

// Common first-grade characters with their information
export const characterDatabase: Record<string, CharacterInfo> = {
  "大": {
    character: "大",
    pinyin: "dà",
    meaning: "大的意思是体积、面积、数量、力量等超过一般或超过所比较的对象。",
    strokeCount: 3,
    radicalInfo: "部首：大",
    words: [
      { word: "大人", pinyin: "dà rén", meaning: "成年人" },
      { word: "大家", pinyin: "dà jiā", meaning: "所有的人" },
      { word: "大小", pinyin: "dà xiǎo", meaning: "大和小；尺寸" },
      { word: "伟大", pinyin: "wěi dà", meaning: "品格崇高；规模宏大" },
    ],
    sentences: ["这棵树很大。", "大象是陆地上最大的动物。"],
  },
  "小": {
    character: "小",
    pinyin: "xiǎo",
    meaning: "小的意思是体积、面积、数量等不大的。",
    strokeCount: 3,
    radicalInfo: "部首：小",
    words: [
      { word: "小鸟", pinyin: "xiǎo niǎo", meaning: "小的鸟" },
      { word: "小心", pinyin: "xiǎo xīn", meaning: "注意；谨慎" },
      { word: "小朋友", pinyin: "xiǎo péng yǒu", meaning: "对儿童的称呼" },
      { word: "大小", pinyin: "dà xiǎo", meaning: "大和小；尺寸" },
    ],
    sentences: ["小猫很可爱。", "我是一个小学生。"],
  },
  "人": {
    character: "人",
    pinyin: "rén",
    meaning: "人是指能制造工具并能使用工具进行劳动的高等动物。",
    strokeCount: 2,
    radicalInfo: "部首：人",
    words: [
      { word: "人民", pinyin: "rén mín", meaning: "以劳动群众为主体的社会基本成员" },
      { word: "大人", pinyin: "dà rén", meaning: "成年人" },
      { word: "人们", pinyin: "rén men", meaning: "泛指许多人" },
      { word: "好人", pinyin: "hǎo rén", meaning: "品行好的人" },
    ],
    sentences: ["人要诚实。", "我们都是中国人。"],
  },
  "山": {
    character: "山",
    pinyin: "shān",
    meaning: "山是地面形成的高耸的部分。",
    strokeCount: 3,
    radicalInfo: "部首：山",
    words: [
      { word: "山水", pinyin: "shān shuǐ", meaning: "山和水；自然风景" },
      { word: "高山", pinyin: "gāo shān", meaning: "高大的山" },
      { word: "山林", pinyin: "shān lín", meaning: "山上的树林" },
      { word: "火山", pinyin: "huǒ shān", meaning: "能喷出岩浆的山" },
    ],
    sentences: ["这座山很高。", "我们去爬山吧。"],
  },
  "水": {
    character: "水",
    pinyin: "shuǐ",
    meaning: "水是一种无色、无味的液体。",
    strokeCount: 4,
    radicalInfo: "部首：水",
    words: [
      { word: "水果", pinyin: "shuǐ guǒ", meaning: "可以吃的植物果实" },
      { word: "喝水", pinyin: "hē shuǐ", meaning: "饮用水" },
      { word: "山水", pinyin: "shān shuǐ", meaning: "山和水；自然风景" },
      { word: "河水", pinyin: "hé shuǐ", meaning: "河里的水" },
    ],
    sentences: ["水是生命之源。", "请给我一杯水。"],
  },
  "日": {
    character: "日",
    pinyin: "rì",
    meaning: "日的本义是太阳。",
    strokeCount: 4,
    radicalInfo: "部首：日",
    words: [
      { word: "日出", pinyin: "rì chū", meaning: "太阳升起" },
      { word: "日记", pinyin: "rì jì", meaning: "每天记录的文字" },
      { word: "生日", pinyin: "shēng rì", meaning: "出生的那一天" },
      { word: "今日", pinyin: "jīn rì", meaning: "今天" },
    ],
    sentences: ["太阳每天东升西落。", "今天是个好日子。"],
  },
  "月": {
    character: "月",
    pinyin: "yuè",
    meaning: "月的本义是月亮。",
    strokeCount: 4,
    radicalInfo: "部首：月",
    words: [
      { word: "月亮", pinyin: "yuè liàng", meaning: "地球的卫星" },
      { word: "月光", pinyin: "yuè guāng", meaning: "月亮发出的光" },
      { word: "明月", pinyin: "míng yuè", meaning: "明亮的月亮" },
      { word: "月份", pinyin: "yuè fèn", meaning: "一年中的某个月" },
    ],
    sentences: ["月亮又圆又亮。", "中秋节的月亮特别圆。"],
  },
  "木": {
    character: "木",
    pinyin: "mù",
    meaning: "木的本义是树木。",
    strokeCount: 4,
    radicalInfo: "部首：木",
    words: [
      { word: "木头", pinyin: "mù tou", meaning: "树木的干" },
      { word: "树木", pinyin: "shù mù", meaning: "树的总称" },
      { word: "木材", pinyin: "mù cái", meaning: "树木砍伐后的材料" },
      { word: "草木", pinyin: "cǎo mù", meaning: "草和树木" },
    ],
    sentences: ["这是一棵大树木。", "木头可以做家具。"],
  },
  "本": {
    character: "本",
    pinyin: "běn",
    meaning: "本的本义是树木的根，引申为事物的根本、根源。也用作量词，用于书籍、账册等。",
    strokeCount: 5,
    radicalInfo: "部首：木",
    words: [
      { word: "本子", pinyin: "běn zi", meaning: "用来写字的册子" },
      { word: "书本", pinyin: "shū běn", meaning: "书" },
      { word: "根本", pinyin: "gēn běn", meaning: "事物的根源或基础" },
      { word: "本来", pinyin: "běn lái", meaning: "原来" },
    ],
    sentences: ["这本书很好看。", "我的本子写满了。"],
  },
  "天": {
    character: "天",
    pinyin: "tiān",
    meaning: "天的本义是头顶，引申为天空。",
    strokeCount: 4,
    radicalInfo: "部首：大",
    words: [
      { word: "天空", pinyin: "tiān kōng", meaning: "日月星辰所在的空间" },
      { word: "今天", pinyin: "jīn tiān", meaning: "说话时的这一天" },
      { word: "明天", pinyin: "míng tiān", meaning: "今天的下一天" },
      { word: "天气", pinyin: "tiān qì", meaning: "一定区域内的气象情况" },
    ],
    sentences: ["今天天气真好。", "天上有白云。"],
  },
  "地": {
    character: "地",
    pinyin: "dì",
    meaning: "地的本义是大地、地面。",
    strokeCount: 6,
    radicalInfo: "部首：土",
    words: [
      { word: "地方", pinyin: "dì fang", meaning: "某一区域或位置" },
      { word: "土地", pinyin: "tǔ dì", meaning: "田地；地面" },
      { word: "大地", pinyin: "dà dì", meaning: "广阔的地面" },
      { word: "地球", pinyin: "dì qiú", meaning: "我们生活的星球" },
    ],
    sentences: ["地上有一朵花。", "我们住在地球上。"],
  },
  "花": {
    character: "花",
    pinyin: "huā",
    meaning: "花是植物的繁殖器官，通常有美丽的颜色和香味。",
    strokeCount: 7,
    radicalInfo: "部首：艹",
    words: [
      { word: "花朵", pinyin: "huā duǒ", meaning: "花的总称" },
      { word: "开花", pinyin: "kāi huā", meaning: "花蕾绽放" },
      { word: "鲜花", pinyin: "xiān huā", meaning: "新鲜的花" },
      { word: "花园", pinyin: "huā yuán", meaning: "种花的园子" },
    ],
    sentences: ["花儿真美丽。", "春天花儿开了。"],
  },
  "草": {
    character: "草",
    pinyin: "cǎo",
    meaning: "草是一类茎干柔软的植物的总称。",
    strokeCount: 9,
    radicalInfo: "部首：艹",
    words: [
      { word: "小草", pinyin: "xiǎo cǎo", meaning: "小的草" },
      { word: "草地", pinyin: "cǎo dì", meaning: "长满草的地方" },
      { word: "青草", pinyin: "qīng cǎo", meaning: "绿色的草" },
      { word: "草原", pinyin: "cǎo yuán", meaning: "广阔的草地" },
    ],
    sentences: ["小草绿油油的。", "牛在草地上吃草。"],
  },
};

// Get character info, returns a basic info if not in database
export const getCharacterInfo = (char: string): CharacterInfo => {
  if (characterDatabase[char]) {
    return characterDatabase[char];
  }
  
  // Return basic info for characters not in database
  return {
    character: char,
    pinyin: "—",
    meaning: "这个字的详细信息暂未收录，请查阅字典了解更多。",
    strokeCount: 0,
    radicalInfo: "部首信息暂缺",
    words: [],
    sentences: [],
  };
};
