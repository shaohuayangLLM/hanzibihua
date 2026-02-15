import { CharacterDatabase } from './types';

// 二年级上册常用汉字（人教版）
export const grade2Vol1Characters: CharacterDatabase = {
  // 第一单元
  "秋": { character: "秋", pinyin: "qiū", meaning: "一年四季中的第三季。", strokeCount: 9, radicalInfo: "部首：禾", structure: "左右结构", words: [{ word: "秋天", pinyin: "qiū tiān", meaning: "秋季" }, { word: "秋风", pinyin: "qiū fēng", meaning: "秋天的风" }], sentences: ["秋天到了，树叶黄了。"] },
  "气": { character: "气", pinyin: "qì", meaning: "气体；空气。", strokeCount: 4, radicalInfo: "部首：气", structure: "独体字", words: [{ word: "天气", pinyin: "tiān qì", meaning: "大气状况" }, { word: "生气", pinyin: "shēng qì", meaning: "发怒" }], sentences: ["今天天气很好。"] },
  "了": { character: "了", pinyin: "le", meaning: "表示动作完成。", strokeCount: 2, radicalInfo: "部首：乛", structure: "独体字", words: [{ word: "好了", pinyin: "hǎo le", meaning: "完成" }], sentences: ["我吃饭了。"] },
  "树": { character: "树", pinyin: "shù", meaning: "木本植物的通称。", strokeCount: 9, radicalInfo: "部首：木", structure: "左右结构", words: [{ word: "大树", pinyin: "dà shù", meaning: "高大的树木" }, { word: "树叶", pinyin: "shù yè", meaning: "树的叶子" }], sentences: ["这棵树很高。"] },
  "叶": { character: "叶", pinyin: "yè", meaning: "植物的营养器官。", strokeCount: 5, radicalInfo: "部首：口", structure: "左右结构", words: [{ word: "叶子", pinyin: "yè zi", meaning: "植物的叶片" }, { word: "树叶", pinyin: "shù yè", meaning: "树的叶子" }], sentences: ["绿叶很漂亮。"] },
  "片": { character: "片", pinyin: "piàn", meaning: "平而薄的东西。", strokeCount: 4, radicalInfo: "部首：片", structure: "独体字", words: [{ word: "一片", pinyin: "yī piàn", meaning: "数量词" }, { word: "照片", pinyin: "zhào piàn", meaning: "Pictures" }], sentences: ["一片片叶子落下来。"] },
  "大": { character: "大", pinyin: "dà", meaning: "体积、面积、数量等超过一般。", strokeCount: 3, radicalInfo: "部首：大", structure: "独体字", words: [{ word: "大人", pinyin: "dà rén", meaning: "成年人" }, { word: "大家", pinyin: "dà jiā", meaning: "所有人" }], sentences: ["大象很大。"] },
  "飞": { character: "飞", pinyin: "fēi", meaning: "在空中运动。", strokeCount: 3, radicalInfo: "部首：飞", structure: "独体字", words: [{ word: "飞机", pinyin: "fēi jī", meaning: "airplane" }, { word: "飞鸟", pinyin: "fēi niǎo", meaning: "会飞的鸟" }], sentences: ["鸟儿在天上飞。"] },
  "会": { character: "会", pinyin: "huì", meaning: "懂得；有能力。", strokeCount: 6, radicalInfo: "部首：人", structure: "上下结构", words: [{ word: "学会", pinyin: "xué huì", meaning: "掌握技能" }, { word: "会议", pinyin: "huì yì", meaning: "meeting" }], sentences: ["我会画画。"] },
  "个": { character: "个", pinyin: "gè", meaning: "量词。", strokeCount: 3, radicalInfo: "部首：个", structure: "独体字", words: [{ word: "一个", pinyin: "yī gè", meaning: "数量一" }, { word: "个人", pinyin: "gè rén", meaning: "individual" }], sentences: ["我有一个苹果。"] },

  // 第二单元
  "船": { character: "船", pinyin: "chuán", meaning: "水上交通工具。", strokeCount: 11, radicalInfo: "部首：舟", structure: "左右结构", words: [{ word: "小船", pinyin: "xiǎo chuán", meaning: "small boat" }, { word: "船只", pinyin: "chuán zhī", meaning: "vessels" }], sentences: ["小船在水上飘。"] },
  "弹": { character: "弹", pinyin: "tán", meaning: "使弦振动。", strokeCount: 11, radicalInfo: "部首：弓", structure: "左右结构", words: [{ word: "子弹", pinyin: "zǐ dàn", meaning: "bullet" }], sentences: ["他会弹琴。"], additionalReadings: [{ reading: "dàn", condition: "子弹" }] },
  "琴": { character: "琴", pinyin: "qín", meaning: "乐器。", strokeCount: 12, radicalInfo: "部首：王", structure: "上下结构", words: [{ word: "钢琴", pinyin: "gāng qín", meaning: "piano" }, { word: "弹琴", pinyin: "tán qín", meaning: "play instrument" }], sentences: ["我会弹钢琴。"] },
  "娃": { character: "娃", pinyin: "wá", meaning: "小孩子。", strokeCount: 9, radicalInfo: "部首：女", structure: "左右结构", words: [{ word: "娃娃", pinyin: "wá wa", meaning: "doll/baby" }, { word: "女娃", pinyin: "nǚ wá", meaning: "女孩" }], sentences: ["这个娃娃很可爱。"] },
  "更": { character: "更", pinyin: "gèng", meaning: "更加；越。", strokeCount: 7, radicalInfo: "部首：曰", structure: "独体字", words: [{ word: "更好", pinyin: "gèng hǎo", meaning: "better" }], sentences: ["今天比昨天更冷。"] },
  "蓝": { character: "蓝", pinyin: "lán", meaning: "蓝色。", strokeCount: 13, radicalInfo: "部首：艹", structure: "上下结构", words: [{ word: "蓝天", pinyin: "lán tiān", meaning: "blue sky" }, { word: "蓝色", pinyin: "lán sè", meaning: "blue color" }], sentences: ["天空是蓝的。"] },
  "望": { character: "望", pinyin: "wàng", meaning: "向远处看。", strokeCount: 11, radicalInfo: "部首：王", structure: "上下结构", words: [{ word: "看望", pinyin: "kàn wàng", meaning: "visit" }, { word: "希望", pinyin: "xī wàng", meaning: "hope" }], sentences: ["我去看望奶奶。"] },
  "禁": { character: "禁", pinyin: "jìn", meaning: "法律或习惯不允许的事。", strokeCount: 13, radicalInfo: "部首：示", structure: "上下结构", words: [{ word: "禁止", pinyin: "jìn zhǐ", meaning: "forbid" }], sentences: ["这里禁止吸烟。"] },
  "查": { character: "查", pinyin: "chá", meaning: "检查；调查。", strokeCount: 9, radicalInfo: "部首：木", structure: "上下结构", words: [{ word: "检查", pinyin: "jiǎn chá", meaning: "inspect" }, { word: "查看", pinyin: "chá kàn", meaning: "look up" }], sentences: ["老师检查作业。"] },

  // 第三单元
  "植": { character: "植", pinyin: "zhí", meaning: "栽种；培育。", strokeCount: 12, radicalInfo: "部首：木", structure: "左右结构", words: [{ word: "植物", pinyin: "zhí wù", meaning: "plant" }, { word: "种植", pinyin: "zhòng zhí", meaning: "plant/grow" }], sentences: ["我们种了很多植物。"] },
  "物": { character: "物", pinyin: "wù", meaning: "东西；事物。", strokeCount: 8, radicalInfo: "部首：牜", structure: "左右结构", words: [{ word: "动物", pinyin: "dòng wù", meaning: "animal" }, { word: "植物", pinyin: "zhí wù", meaning: "plant" }], sentences: ["我爱动物和植物。"] },
  "泥": { character: "泥", pinyin: "ní", meaning: "土和水混合物。", strokeCount: 8, radicalInfo: "部首：氵", structure: "左右结构", words: [{ word: "泥土", pinyin: "ní tǔ", meaning: "soil" }], sentences: ["雨天路上有泥。"] },
  "土": { character: "土", pinyin: "tǔ", meaning: "土壤；土地。", strokeCount: 3, radicalInfo: "部首：土", structure: "独体字", words: [{ word: "泥土", pinyin: "ní tǔ", meaning: "soil" }, { word: "土地", pinyin: "tǔ dì", meaning: "land" }], sentences: ["植物生长在土里。"] },
  "酸": { character: "酸", pinyin: "suān", meaning: "像醋的味道。", strokeCount: 12, radicalInfo: "部首：酉", structure: "左右结构", words: [{ word: "酸甜", pinyin: "suān tián", meaning: "sour and sweet" }], sentences: ["柠檬是酸的。"] },
  "辣": { character: "辣", pinyin: "là", meaning: "辛辣的味道。", strokeCount: 14, radicalInfo: "部首：辛", structure: "左右结构", words: [{ word: "麻辣", pinyin: "má là", meaning: "numb and spicy" }], sentences: ["辣椒很辣。"] },
  "层": { character: "层", pinyin: "céng", meaning: "重叠；量词。", strokeCount: 7, radicalInfo: "部首：尸", structure: "半包围结构", words: [{ word: "一层", pinyin: "yī céng", meaning: "one layer" }], sentences: ["这是一层楼。"] },
  "送": { character: "送", pinyin: "sòng", meaning: "给予；赠送。", strokeCount: 9, radicalInfo: "部首：辶", structure: "半包围结构", words: [{ word: "送别", pinyin: "sòng bié", meaning: "say goodbye" }], sentences: ["妈妈送我上学。"] },
  "做": { character: "做", pinyin: "zuò", meaning: "制造；从事。", strokeCount: 11, radicalInfo: "部首：亻", structure: "左右结构", words: [{ word: "做人", pinyin: "zuò rén", meaning: "be a person" }, { word: "做事", pinyin: "zuò shì", meaning: "do things" }], sentences: ["我会做手工。"] },

  // 第四单元
  "秤": { character: "秤", pinyin: "chèng", meaning: "衡量轻重的器具。", strokeCount: 10, radicalInfo: "部首：禾", structure: "左右结构", words: [{ word: "杆秤", pinyin: "gǎn chèng", meaning: "steelyard" }], sentences: ["这是一杆秤。"] },
  "称": { character: "称", pinyin: "chēng", meaning: "测定重量。", strokeCount: 10, radicalInfo: "部首：禾", structure: "左右结构", words: [{ word: "称呼", pinyin: "chēng hu", meaning: "title/name" }], sentences: ["请称一下体重。"] },
  "象": { character: "象", pinyin: "xiàng", meaning: "哺乳动物；外形。", strokeCount: 11, radicalInfo: "部首：豸", structure: "独体字", words: [{ word: "大象", pinyin: "dà xiàng", meaning: "elephant" }, { word: "气象", pinyin: "qì xiàng", meaning: "weather" }], sentences: ["大象很大很重。"] },
  "砍": { character: "砍", pinyin: "kǎn", meaning: "用刀斧劈。", strokeCount: 9, radicalInfo: "部首：石", structure: "左右结构", words: [{ word: "砍树", pinyin: "kǎn shù", meaning: "chop tree" }], sentences: ["不要砍树。"] },
  "造": { character: "造", pinyin: "zào", meaning: "制作；建立。", strokeCount: 10, radicalInfo: "部首：辶", structure: "半包围结构", words: [{ word: "制造", pinyin: "zhì zào", meaning: "manufacture" }], sentences: ["工厂制造汽车。"] },
  "命": { character: "命", pinyin: "mìng", meaning: "生命；命令。", strokeCount: 8, radicalInfo: "部首：口", structure: "上下结构", words: [{ word: "生命", pinyin: "shēng mìng", meaning: "life" }], sentences: ["我们要珍惜生命。"] },
  "活": { character: "活", pinyin: "huó", meaning: "生存；有生命。", strokeCount: 9, radicalInfo: "部首：氵", structure: "左右结构", words: [{ word: "生活", pinyin: "shēng huó", meaning: "life" }, { word: "活动", pinyin: "huó dòng", meaning: "activity" }], sentences: ["我们要快乐生活。"] },
  "线": { character: "线", pinyin: "xiàn", meaning: "用丝、棉等编成的细长东西。", strokeCount: 8, radicalInfo: "部首：纟", structure: "左右结构", words: [{ word: "直线", pinyin: "zhí xiàn", meaning: "straight line" }], sentences: ["用线可以缝衣服。"] },

  // 第五单元 - 语文园地
  "馆": { character: "馆", pinyin: "guǎn", meaning: "招待宾客的地方。", strokeCount: 11, radicalInfo: "部首：饣", structure: "左右结构", words: [{ word: "饭馆", pinyin: "fàn guǎn", meaning: "restaurant" }, { word: "图书馆", pinyin: "tú shū guǎn", meaning: "library" }], sentences: ["我去图书馆看书。"] },
  "巧": { character: "巧", pinyin: "qiǎo", meaning: "技艺高明。", strokeCount: 5, radicalInfo: "部首：工", structure: "左右结构", words: [{ word: "技巧", pinyin: "jì qiǎo", meaning: "skill" }, { word: "碰巧", pinyin: "pèng qiǎo", meaning: "coincidence" }], sentences: ["他手很巧。"] },
  "却": { character: "却", pinyin: "què", meaning: "表示转折。", strokeCount: 7, radicalInfo: "部首：卩", structure: "左右结构", words: [{ word: "退却", pinyin: "tuì què", meaning: "retreat" }], sentences: ["但是他却没来。"] },
  "思": { character: "思", pinyin: "sī", meaning: "思考；想念。", strokeCount: 9, radicalInfo: "部首：心", structure: "上下结构", words: [{ word: "思考", pinyin: "sī kǎo", meaning: "think" }, { word: "意思", pinyin: "yì si", meaning: "meaning" }], sentences: ["我要好好思考。"] },
  "夫": { character: "夫", pinyin: "fū", meaning: "成年男子；丈夫。", strokeCount: 4, radicalInfo: "部首：夫", structure: "独体字", words: [{ word: "丈夫", pinyin: "zhàng fu", meaning: "husband" }], sentences: ["这是我的丈夫。"] },
  "妇": { character: "妇", pinyin: "fù", meaning: "成年女子；妻子。", strokeCount: 6, radicalInfo: "部首：女", structure: "左右结构", words: [{ word: "妇女", pinyin: "fù nǚ", meaning: "woman" }], sentences: ["今天是妇女节。"] },
  "抖": { character: "抖", pinyin: "dǒu", meaning: "颤动；振动。", strokeCount: 7, radicalInfo: "部首：扌", structure: "左右结构", words: [{ word: "发抖", pinyin: "fā dǒu", meaning: "shake" }], sentences: ["他冷得发抖。"] },
  "威": { character: "威", pinyin: "wēi", meaning: "威力；威望。", strokeCount: 9, radicalInfo: "部首：女", structure: "半包围结构", words: [{ word: "威力", pinyin: "wēi lì", meaning: "power" }], sentences: ["这种威力很大。"] },
  "转": { character: "转", pinyin: "zhuàn", meaning: "旋转；转动。", strokeCount: 8, radicalInfo: "部首：车", structure: "左右结构", words: [{ word: "转动", pinyin: "zhuàn dòng", meaning: "rotate" }], sentences: ["车轮在转动。"] },
};
