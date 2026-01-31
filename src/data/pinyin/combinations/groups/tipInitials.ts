/**
 * 舌尖中音声母组合数据
 * 声母: d, t, n, l
 * 可与所有四呼韵母组合(d,t不能与撮口呼组合)
 */

import type { CombinationData } from "@/types/pinyin";

const createTone = (combination: string, tone: number, char: string, word: string, fullPinyin: string) => ({
  combination, tone, examples: [{ char, word, fullPinyin }]
});

export const tipInitialsData: CombinationData = {
  // 开口呼韵母
  a: [
    { initial: "d", final: "a", tones: [createTone("dā", 1, "搭", "搭车", "dā chē"), createTone("dá", 2, "答", "回答", "huí dá"), createTone("dǎ", 3, "打", "打扫", "dǎ sǎo"), createTone("dà", 4, "大", "大小", "dà xiǎo")] },
    { initial: "t", final: "a", tones: [createTone("tā", 1, "他", "他们", "tā men"), createTone("tǎ", 3, "塔", "宝塔", "bǎo tǎ"), createTone("tà", 4, "踏", "踏步", "tà bù")] },
    { initial: "n", final: "a", tones: [createTone("nà", 4, "那", "那个", "nà ge"), createTone("nà", 4, "纳", "接纳", "jiē nà")] },
    { initial: "l", final: "a", tones: [createTone("lā", 1, "拉", "拉手", "lā shǒu"), createTone("lá", 2, "拿", "拿来", "ná lái"), createTone("lǎ", 3, "喇", "喇叭", "lǎ ba"), createTone("là", 4, "辣", "辣味", "là wèi")] },
  ],
  o: [],  // 舌尖中音 + o 无效
  e: [
    { initial: "d", final: "e", tones: [createTone("dé", 2, "得", "得到", "dé dào"), createTone("de", 5, "地", "轻轻地", "qīng qīng de")] },
    { initial: "t", final: "e", tones: [createTone("tè", 4, "特", "特别", "tè bié")] },
    { initial: "n", final: "e", tones: [createTone("ne", 5, "呢", "怎么呢", "zěn me ne")] },
    { initial: "l", final: "e", tones: [createTone("le", 5, "了", "好了", "hǎo le")] },
  ],
  ai: [
    { initial: "d", final: "ai", tones: [createTone("dāi", 1, "呆", "呆子", "dāi zi"), createTone("dǎi", 3, "逮", "逮住", "dǎi zhù"), createTone("dài", 4, "代", "代表", "dài biǎo")] },
    { initial: "t", final: "ai", tones: [createTone("tái", 2, "台", "台灯", "tái dēng"), createTone("tài", 4, "太", "太大", "tài dà")] },
    { initial: "n", final: "ai", tones: [createTone("nǎi", 3, "奶", "牛奶", "niú nǎi")] },
    { initial: "l", final: "ai", tones: [createTone("lái", 2, "来", "来到", "lái dào"), createTone("lài", 4, "赖", "依赖", "yī lài")] },
  ],
  ei: [
    { initial: "d", final: "ei", tones: [createTone("déi", 3, "得", "你得", "nǐ déi")] },
    { initial: "t", final: "ei", tones: [] },
    { initial: "n", final: "ei", tones: [createTone("néi", 2, "哪", "哪能", "néi néng")] },
    { initial: "l", final: "ei", tones: [createTone("lěi", 3, "累", "劳累", "láo lèi"), createTone("lèi", 4, "泪", "眼泪", "yǎn lèi")] },
  ],
  ao: [
    { initial: "d", final: "ao", tones: [createTone("dāo", 1, "刀", "小刀", "xiǎo dāo"), createTone("dǎo", 3, "倒", "倒下", "dǎo xià"), createTone("dào", 4, "道", "道路", "dào lù")] },
    { initial: "t", final: "ao", tones: [createTone("tāo", 1, "掏", "掏出", "tāo chū"), createTone("táo", 2, "逃", "逃跑", "táo pǎo"), createTone("tǎo", 3, "讨", "讨论", "tǎo lùn"), createTone("tào", 4, "套", "手套", "shǒu tào")] },
    { initial: "n", final: "ao", tones: [createTone("náo", 2, "挠", "挠头", "náo tóu"), createTone("nào", 4, "闹", "热闹", "rè nao")] },
    { initial: "l", final: "ao", tones: [createTone("láo", 2, "劳", "劳动", "láo dòng"), createTone("lǎo", 3, "老", "老人", "lǎo rén"), createTone("lào", 4, "烙", "烙印", "lào yìn")] },
  ],
  ou: [
    { initial: "d", final: "ou", tones: [createTone("dōu", 1, "都", "都是", "dōu shì"), createTone("dǒu", 3, "抖", "发抖", "fā dǒu"), createTone("dòu", 4, "斗", "斗争", "dòu zhēng")] },
    { initial: "t", final: "ou", tones: [createTone("tōu", 1, "偷", "偷走", "tōu zǒu"), createTone("tóu", 2, "头", "头发", "tóu fa"), createTone("tǒu", 3, "钭", "钭子", "tǒu zi")] },
    { initial: "n", final: "ou", tones: [] },
    { initial: "l", final: "ou", tones: [createTone("lōu", 1, "搂", "搂抱", "lōu bào"), createTone("lóu", 2, "楼", "楼房", "lóu fáng"), createTone("lǒu", 3, "篓", "竹篓", "zhú lǒu"), createTone("lòu", 4, "漏", "漏水", "lòu shuǐ")] },
  ],
  an: [
    { initial: "d", final: "an", tones: [createTone("dān", 1, "单", "简单", "jiǎn dān"), createTone("dǎn", 3, "胆", "大胆", "dà dǎn"), createTone("dàn", 4, "但", "但是", "dàn shì")] },
    { initial: "t", final: "an", tones: [createTone("tān", 1, "贪", "贪心", "tān xīn"), createTone("tán", 2, "谈", "谈话", "tán huà"), createTone("tàn", 4, "炭", "木炭", "mù tàn")] },
    { initial: "n", final: "an", tones: [createTone("nán", 2, "男", "男生", "nán shēng"), createTone("nàn", 4, "难", "困难", "kùn nán")] },
    { initial: "l", final: "an", tones: [createTone("lán", 2, "蓝", "蓝色", "lán sè"), createTone("lǎn", 3, "懒", "懒惰", "lǎn duò"), createTone("làn", 4, "烂", "烂泥", "làn ní")] },
  ],
  en: [
    { initial: "d", final: "en", tones: [] },
    { initial: "t", final: "en", tones: [] },
    { initial: "n", final: "en", tones: [createTone("nèn", 4, "嫩", "嫩绿", "nèn lǜ")] },
    { initial: "l", final: "en", tones: [] },
  ],
  ang: [
    { initial: "d", final: "ang", tones: [createTone("dāng", 1, "当", "当时", "dāng shí"), createTone("dǎng", 3, "挡", "抵挡", "dǐ dǎng"), createTone("dàng", 4, "荡", "荡漾", "dàng yàng")] },
    { initial: "t", final: "ang", tones: [createTone("tāng", 1, "汤", "汤面", "tāng miàn"), createTone("táng", 2, "堂", "课堂", "kè táng"), createTone("tǎng", 3, "躺", "躺下", "tǎng xià"), createTone("tàng", 4, "烫", "烫手", "tàng shǒu")] },
    { initial: "n", final: "ang", tones: [createTone("náng", 2, "囊", "皮囊", "pí náng")] },
    { initial: "l", final: "ang", tones: [createTone("láng", 2, "狼", "狼狗", "láng gǒu"), createTone("làng", 4, "浪", "波浪", "bō làng")] },
  ],
  eng: [
    { initial: "d", final: "eng", tones: [createTone("dēng", 1, "灯", "灯光", "dēng guāng"), createTone("dèng", 4, "凳", "板凳", "bǎn dèng")] },
    { initial: "t", final: "eng", tones: [createTone("téng", 2, "疼", "心疼", "xīn téng")] },
    { initial: "n", final: "eng", tones: [createTone("néng", 2, "能", "能力", "néng lì")] },
    { initial: "l", final: "eng", tones: [createTone("léng", 2, "棱", "棱角", "léng jiǎo")] },
  ],
  ong: [
    { initial: "d", final: "ong", tones: [createTone("dōng", 1, "东", "东西", "dōng xi"), createTone("dǒng", 3, "懂", "懂得", "dǒng de"), createTone("dòng", 4, "动", "动作", "dòng zuò")] },
    { initial: "t", final: "ong", tones: [createTone("tōng", 1, "通", "通过", "tōng guò"), createTone("tóng", 2, "同", "同学", "tóng xué")] },
    { initial: "n", final: "ong", tones: [createTone("nóng", 2, "农", "农民", "nóng mín")] },
    { initial: "l", final: "ong", tones: [createTone("lóng", 2, "龙", "龙船", "lóng chuán")] },
  ],
  er: [],  // er 不与声母组合

  // 齐齿呼韵母
  i: [
    { initial: "d", final: "i", tones: [createTone("dī", 1, "低", "低下", "dī xià"), createTone("dí", 2, "的", "好的", "hǎo de"), createTone("dǐ", 3, "底", "底下", "dǐ xià"), createTone("dì", 4, "地", "土地", "tǔ dì")] },
    { initial: "t", final: "i", tones: [createTone("tī", 1, "踢", "踢球", "tī qiú"), createTone("tí", 2, "提", "提问", "tí wèn"), createTone("tǐ", 3, "体", "体育", "tǐ yù"), createTone("tì", 4, "替", "代替", "dài tì")] },
    { initial: "n", final: "i", tones: [createTone("ní", 2, "尼", "尼姑", "ní gū"), createTone("nǐ", 3, "你", "你们", "nǐ men"), createTone("nì", 4, "腻", "油腻", "yóu nì")] },
    { initial: "l", final: "i", tones: [createTone("lí", 2, "离", "离开", "lí kāi"), createTone("lǐ", 3, "李", "李子", "lǐ zi"), createTone("lì", 4, "力", "力气", "lì qì")] },
  ],
  ia: [
    { initial: "d", final: "ia", tones: [createTone("diā", 3, "嗲", "嗲声", "diǎ shēng")] },
    { initial: "t", final: "ia", tones: [] },
    { initial: "n", final: "ia", tones: [] },
    { initial: "l", final: "ia", tones: [createTone("liā", 1, "俩", "俩人", "liǎ rén")] },
  ],
  ie: [
    { initial: "d", final: "ie", tones: [createTone("diē", 1, "爹", "爹爹", "diē die"), createTone("dié", 2, "叠", "重叠", "zhòng dié")] },
    { initial: "t", final: "ie", tones: [createTone("tiē", 1, "贴", "贴纸", "tiē zhǐ"), createTone("tiě", 3, "铁", "铁路", "tiě lù")] },
    { initial: "n", final: "ie", tones: [createTone("niē", 1, "捏", "捏住", "niē zhù")] },
    { initial: "l", final: "ie", tones: [createTone("liē", 1, "咧", "咧嘴", "liě zuǐ")] },
  ],
  iao: [
    { initial: "d", final: "iao", tones: [createTone("diāo", 1, "刁", "刁难", "diāo nán"), createTone("diào", 4, "掉", "掉落", "diào luò")] },
    { initial: "t", final: "iao", tones: [createTone("tiāo", 1, "挑", "挑选", "tiāo xuǎn"), createTone("tiáo", 2, "条", "条件", "tiáo jiàn"), createTone("tiào", 4, "跳", "跳高", "tiào gāo")] },
    { initial: "n", final: "iao", tones: [] },
    { initial: "l", final: "iao", tones: [createTone("liáo", 2, "聊", "聊天", "liáo tiān"), createTone("liǎo", 3, "了", "明了", "míng liǎo"), createTone("liào", 4, "料", "材料", "cái liào")] },
  ],
  iu: [
    { initial: "d", final: "iu", tones: [createTone("diū", 1, "丢", "丢失", "diū shī")] },
    { initial: "t", final: "iu", tones: [] },
    { initial: "n", final: "iu", tones: [createTone("niū", 1, "妞", "妞妞", "niū niu")] },
    { initial: "l", final: "iu", tones: [createTone("liū", 1, "溜", "溜走", "liū zǒu"), createTone("liǔ", 3, "柳", "柳树", "liǔ shù"), createTone("liù", 4, "六", "六个", "liù gè")] },
  ],
  ian: [
    { initial: "d", final: "ian", tones: [createTone("diān", 1, "颠", "颠倒", "diān dǎo"), createTone("diǎn", 3, "点", "点头", "diǎn tóu"), createTone("diàn", 4, "电", "电话", "diàn huà")] },
    { initial: "t", final: "ian", tones: [createTone("tiān", 1, "天", "天空", "tiān kōng"), createTone("tián", 2, "田", "田地", "tián dì"), createTone("tiǎn", 3, "舔", "舔一舔", "tiǎn yī tiǎn")] },
    { initial: "n", final: "ian", tones: [createTone("niān", 1, "蔫", "蔫了", "niān le"), createTone("nián", 2, "年", "新年", "xīn nián"), createTone("niàn", 4, "念", "想念", "xiǎng niàn")] },
    { initial: "l", final: "ian", tones: [createTone("lián", 2, "连", "连接", "lián jiē"), createTone("liǎn", 3, "脸", "脸色", "liǎn sè"), createTone("liàn", 4, "练", "练习", "liàn xí")] },
  ],
  in: [
    { initial: "n", final: "in", tones: [createTone("nín", 2, "您", "您好", "nín hǎo")] },
    { initial: "l", final: "in", tones: [createTone("lìn", 4, "赁", "租赁", "zū lìn")] },
  ],
  iang: [
    { initial: "d", final: "iang", tones: [] },
    { initial: "t", final: "iang", tones: [] },
    { initial: "n", final: "iang", tones: [createTone("niàng", 4, "酿", "酿酒", "niàng jiǔ")] },
    { initial: "l", final: "iang", tones: [createTone("liáng", 2, "凉", "凉快", "liáng kuai"), createTone("liàng", 4, "亮", "明亮", "míng liàng")] },
  ],
  ing: [
    { initial: "d", final: "ing", tones: [createTone("dīng", 1, "丁", "丁香", "dīng xiāng"), createTone("dǐng", 3, "顶", "山顶", "shān dǐng"), createTone("dìng", 4, "定", "一定", "yī dìng")] },
    { initial: "t", final: "ing", tones: [createTone("tīng", 1, "听", "听见", "tīng jiàn"), createTone("tíng", 2, "停", "停止", "tíng zhǐ")] },
    { initial: "n", final: "ing", tones: [createTone("níng", 2, "宁", "安宁", "ān níng"), createTone("nìng", 4, "宁", "宁可", "nìng kě")] },
    { initial: "l", final: "ing", tones: [createTone("líng", 2, "灵", "机灵", "jī ling"), createTone("lǐng", 3, "领", "领子", "lǐng zi"), createTone("lìng", 4, "令", "命令", "mìng lìng")] },
  ],
  iong: [],  // 舌尖中音 + iong 无效

  // 合口呼韵母
  u: [
    { initial: "d", final: "u", tones: [createTone("dū", 1, "都", "首都", "shǒu dū"), createTone("dǔ", 3, "赌", "赌博", "dǔ bó"), createTone("dù", 4, "度", "温度", "wēn dù")] },
    { initial: "t", final: "u", tones: [createTone("tū", 1, "突", "突然", "tū rán"), createTone("tú", 2, "图", "图画", "tú huà"), createTone("tǔ", 3, "土", "土地", "tǔ dì"), createTone("tù", 4, "兔", "兔子", "tù zi")] },
    { initial: "n", final: "u", tones: [createTone("nú", 2, "奴", "奴才", "nú cai"), createTone("nǔ", 3, "努", "努力", "nǔ lì"), createTone("nù", 4, "怒", "发怒", "fā nù")] },
    { initial: "l", final: "u", tones: [createTone("lú", 2, "卢", "卢沟桥", "lú gōu qiáo"), createTone("lǔ", 3, "鲁", "鲁迅", "lǔ xùn"), createTone("lù", 4, "路", "马路", "mǎ lù")] },
  ],
  ua: [],  // 舌尖中音 + ua 无效
  uo: [
    { initial: "d", final: "uo", tones: [createTone("duō", 1, "多", "多少", "duō shao"), createTone("duǒ", 3, "朵", "花朵", "huā duǒ"), createTone("duò", 4, "舵", "舵手", "duò shǒu")] },
    { initial: "t", final: "uo", tones: [createTone("tuō", 1, "拖", "拖地", "tuō dì"), createTone("tuó", 2, "驮", "驮运", "tuó yùn"), createTone("tuò", 4, "唾", "唾沫", "tuò mo")] },
    { initial: "n", final: "uo", tones: [createTone("nuó", 2, "挪", "挪动", "nuó dòng"), createTone("nuò", 4, "诺", "诺言", "nuò yán")] },
    { initial: "l", final: "uo", tones: [createTone("luó", 2, "罗", "罗列", "luó liè"), createTone("luǒ", 3, "裸", "赤裸", "chì luǒ"), createTone("luò", 4, "洛", "洛阳", "luò yáng")] },
  ],
  uai: [],  // 舌尖中音 + uai 无效
  ui: [
    { initial: "d", final: "ui", tones: [createTone("duī", 1, "堆", "堆积", "duī jī")] },
    { initial: "t", final: "ui", tones: [createTone("tuī", 1, "推", "推动", "tuī dòng"), createTone("tuí", 2, "颓", "颓废", "tuí fèi")] },
    { initial: "n", final: "ui", tones: [] },
    { initial: "l", final: "ui", tones: [] },
  ],
  uan: [
    { initial: "d", final: "uan", tones: [createTone("duān", 1, "端", "端正", "duān zhèng"), createTone("duǎn", 3, "短", "短小", "duǎn xiǎo"), createTone("duàn", 4, "段", "路段", "lù duàn")] },
    { initial: "t", final: "uan", tones: [createTone("tuān", 1, "湍", "湍急", "tuān jí")] },
    { initial: "n", final: "uan", tones: [] },
    { initial: "l", final: "uan", tones: [createTone("luán", 2, "栾", "栾树", "luán shù"), createTone("luàn", 4, "乱", "混乱", "hùn luàn")] },
  ],
  un: [
    { initial: "d", final: "un", tones: [createTone("dūn", 1, "墩", "墩子", "dūn zi"), createTone("dùn", 4, "顿", "停顿", "tíng dùn")] },
    { initial: "t", final: "un", tones: [createTone("tūn", 1, "吞", "吞吐", "tūn tǔ")] },
    { initial: "n", final: "un", tones: [] },
    { initial: "l", final: "un", tones: [createTone("lūn", 1, "抡", "抡起", "lūn qǐ")] },
  ],
  uang: [],  // 舌尖中音 + uang 无效

  // 撮口呼韵母 - 只有 n, l 能组合
  ü: [
    { initial: "n", final: "ü", tones: [createTone("nǚ", 3, "女", "女生", "nǚ shēng")] },
    { initial: "l", final: "ü", tones: [createTone("lǚ", 3, "旅", "旅游", "lǚ yóu"), createTone("lǜ", 4, "虑", "考虑", "kǎo lǜ")] },
  ],
  üe: [
    { initial: "n", final: "üe", tones: [createTone("nüè", 4, "虐", "虐待", "nüè dài")] },
    { initial: "l", final: "üe", tones: [createTone("lüè", 4, "略", "省略", "shěng lüè")] },
  ],
  üan: [],  // 舌尖中音 + üan 无效
  ün: [
    { initial: "l", final: "ün", tones: [createTone("lūn", 1, "抡", "抡拳", "lūn quán")] },
  ],
};
