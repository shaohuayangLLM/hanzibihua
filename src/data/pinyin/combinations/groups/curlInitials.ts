/**
 * 翘舌音声母组合数据
 * 声母: zh, ch, sh, r
 * 只能与开口呼和合口呼韵母组合
 */

import type { CombinationData } from "@/types/pinyin";

const createTone = (combination: string, tone: number, char: string, word: string, fullPinyin: string) => ({
  combination, tone, examples: [{ char, word, fullPinyin }]
});

export const curlInitialsData: CombinationData = {
  // 开口呼韵母
  a: [
    { initial: "zh", final: "a", tones: [createTone("zhā", 1, "渣", "渣滓", "zhā zǐ"), createTone("zhǎ", 3, "眨", "眨眼", "zhǎ yǎn"), createTone("zhà", 4, "炸", "炸弹", "zhà dàn")] },
    { initial: "ch", final: "a", tones: [createTone("chā", 1, "插", "插花", "chā huā"), createTone("chá", 2, "茶", "茶叶", "chá yè"), createTone("chà", 4, "岔", "岔路", "chà lù")] },
    { initial: "sh", final: "a", tones: [createTone("shā", 1, "沙", "沙子", "shā zi"), createTone("shà", 4, "啥", "干啥", "gàn shá")] },
  ],
  o: [],  // 翘舌音 + o 无效
  e: [
    { initial: "zh", final: "e", tones: [createTone("zhē", 1, "遮", "遮住", "zhē zhù"), createTone("zhé", 2, "折", "折断", "zhé duàn"), createTone("zhè", 4, "这", "这个", "zhè ge")] },
    { initial: "ch", final: "e", tones: [createTone("chē", 1, "车", "汽车", "qì chē"), createTone("chè", 4, "彻", "彻底", "chè dǐ")] },
    { initial: "sh", final: "e", tones: [createTone("shé", 2, "舌", "舌头", "shé tou"), createTone("shè", 4, "社", "社会", "shè huì")] },
    { initial: "r", final: "e", tones: [createTone("rè", 4, "热", "热闹", "rè nao")] },
  ],
  ai: [
    { initial: "zh", final: "ai", tones: [createTone("zhāi", 1, "摘", "摘花", "zhāi huā"), createTone("zhǎi", 3, "窄", "狭窄", "xiá zhǎi"), createTone("zhài", 4, "债", "欠债", "qiàn zhài")] },
    { initial: "ch", final: "ai", tones: [createTone("chāi", 1, "拆", "拆开", "chāi kāi"), createTone("chái", 2, "柴", "柴火", "chái huǒ")] },
    { initial: "sh", final: "ai", tones: [createTone("shāi", 1, "筛", "筛子", "shāi zi")] },
  ],
  ei: [
    { initial: "sh", final: "ei", tones: [createTone("shéi", 2, "谁", "谁呀", "shéi ya")] },
  ],
  ao: [
    { initial: "zh", final: "ao", tones: [createTone("zhāo", 1, "招", "招手", "zhāo shǒu"), createTone("zhǎo", 3, "找", "寻找", "xún zhǎo"), createTone("zhào", 4, "照", "照亮", "zhào liàng")] },
    { initial: "ch", final: "ao", tones: [createTone("chāo", 1, "抄", "抄写", "chāo xiě"), createTone("cháo", 2, "潮", "浪潮", "làng cháo"), createTone("chǎo", 3, "吵", "吵闹", "chǎo nào")] },
    { initial: "sh", final: "ao", tones: [createTone("shāo", 1, "烧", "烧水", "shāo shuǐ"), createTone("shǎo", 3, "少", "很少", "hěn shǎo"), createTone("shào", 4, "少", "少年", "shào nián")] },
    { initial: "r", final: "ao", tones: [createTone("rǎo", 3, "扰", "打扰", "dǎ rǎo")] },
  ],
  ou: [
    { initial: "zh", final: "ou", tones: [createTone("zhōu", 1, "州", "州长", "zhōu zhǎng"), createTone("zhǒu", 3, "肘", "肘子", "zhǒu zi"), createTone("zhòu", 4, "宙", "宇宙", "yǔ zhòu")] },
    { initial: "ch", final: "ou", tones: [createTone("chōu", 1, "抽", "抽空", "chōu kòng"), createTone("chóu", 2, "愁", "发愁", "fā chóu"), createTone("chòu", 4, "臭", "臭味", "chòu wèi")] },
    { initial: "sh", final: "ou", tones: [createTone("shōu", 1, "收", "收到", "shōu dào"), createTone("shǒu", 3, "手", "手机", "shǒu jī"), createTone("shòu", 4, "受", "接受", "jiē shòu")] },
    { initial: "r", final: "ou", tones: [createTone("ròu", 4, "肉", "牛肉", "niú ròu")] },
  ],
  an: [
    { initial: "zh", final: "an", tones: [createTone("zhān", 1, "沾", "沾水", "zhān shuǐ"), createTone("zhǎn", 3, "展", "开展", "kāi zhǎn"), createTone("zhàn", 4, "站", "站立", "zhàn lì"), createTone("zhàn", 4, "战", "战士", "zhàn shì")] },
    { initial: "ch", final: "an", tones: [createTone("chān", 1, "搀", "搀扶", "chān fú"), createTone("chán", 2, "蝉", "知了", "zhī liǎo"), createTone("chǎn", 3, "产", "生产", "shēng chǎn"), createTone("chàn", 4, "颤", "颤抖", "chàn dǒu")] },
    { initial: "sh", final: "an", tones: [createTone("shān", 1, "山", "山上", "shān shàng"), createTone("shǎn", 3, "闪", "闪电", "shǎn diàn"), createTone("shàn", 4, "扇", "扇子", "shàn zi")] },
    { initial: "r", final: "an", tones: [createTone("rán", 2, "然", "当然", "dāng rán"), createTone("rǎn", 3, "染", "染发", "rǎn fà")] },
  ],
  en: [
    { initial: "zh", final: "en", tones: [createTone("zhēn", 1, "真", "真的", "zhēn de"), createTone("zhěn", 3, "诊", "诊断", "zhěn duàn"), createTone("zhèn", 4, "振", "振动", "zhèn dòng")] },
    { initial: "ch", final: "en", tones: [createTone("chén", 2, "晨", "早晨", "zǎo chén"), createTone("chèn", 4, "趁", "趁机", "chèn jī")] },
    { initial: "sh", final: "en", tones: [createTone("shēn", 1, "身", "身体", "shēn tǐ"), createTone("shěn", 3, "婶", "婶婶", "shěn shen"), createTone("shèn", 4, "慎", "慎重", "shèn zhòng")] },
    { initial: "r", final: "en", tones: [createTone("rèn", 4, "认", "认识", "rèn shi")] },
  ],
  ang: [
    { initial: "zh", final: "ang", tones: [createTone("zhāng", 1, "张", "张开", "zhāng kāi"), createTone("zhǎng", 3, "长", "长大", "zhǎng dà"), createTone("zhàng", 4, "丈", "丈夫", "zhàng fu")] },
    { initial: "ch", final: "ang", tones: [createTone("chāng", 1, "昌", "昌盛", "chāng shèng"), createTone("cháng", 2, "长", "长短", "cháng duǎn"), createTone("chàng", 4, "唱", "唱歌", "chàng gē")] },
    { initial: "sh", final: "ang", tones: [createTone("shāng", 1, "伤", "受伤", "shòu shāng"), createTone("shǎng", 3, "赏", "欣赏", "xīn shǎng")] },
    { initial: "r", final: "ang", tones: [createTone("ráng", 2, "瓤", "瓜瓤", "guā ráng")] },
  ],
  eng: [
    { initial: "zh", final: "eng", tones: [createTone("zhēng", 1, "争", "斗争", "dòu zhēng"), createTone("zhèng", 4, "正", "正在", "zhèng zài")] },
    { initial: "ch", final: "eng", tones: [createTone("chēng", 1, "称", "称赞", "chēng zàn"), createTone("chéng", 2, "成", "成功", "chéng gōng")] },
    { initial: "sh", final: "eng", tones: [createTone("shēng", 1, "声", "声音", "shēng yīn"), createTone("shěng", 3, "省", "节省", "shěng jié")] },
    { initial: "r", final: "eng", tones: [createTone("réng", 2, "仍", "仍然", "réng rán")] },
  ],
  ong: [
    { initial: "zh", final: "ong", tones: [createTone("zhōng", 1, "中", "中间", "zhōng jiān"), createTone("zhǒng", 3, "种", "种树", "zhòng shù"), createTone("zhòng", 4, "重", "重要", "zhòng yào")] },
    { initial: "ch", final: "ong", tones: [createTone("chōng", 1, "充", "充分", "chōng fèn"), createTone("chóng", 2, "虫", "昆虫", "kūn chóng")] },
    { initial: "r", final: "ong", tones: [createTone("rōng", 2, "蓉", "芙蓉", "fú róng")] },
  ],
  er: [],  // er 不与声母组合

  // 齐齿呼韵母 - 翘舌音无效
  i: [], ia: [], ie: [], iao: [], iu: [], ian: [], in: [], iang: [], ing: [], iong: [],

  // 合口呼韵母
  u: [
    { initial: "zh", final: "u", tones: [createTone("zhū", 1, "朱", "朱红", "zhū hóng"), createTone("zhú", 2, "竹", "竹子", "zhú zi"), createTone("zhǔ", 3, "主", "主人", "zhǔ rén"), createTone("zhù", 4, "住", "居住", "jū zhù")] },
    { initial: "ch", final: "u", tones: [createTone("chū", 1, "初", "当初", "dāng chū"), createTone("chú", 2, "除", "除去", "chú qù"), createTone("chǔ", 3, "楚", "清楚", "qīng chǔ"), createTone("chù", 4, "处", "到处", "dào chù")] },
    { initial: "sh", final: "u", tones: [createTone("shū", 1, "书", "书本", "shū běn"), createTone("shú", 2, "叔", "叔叔", "shū shu"), createTone("shǔ", 3, "属", "属于", "shǔ yú"), createTone("shù", 4, "树", "树木", "shù mù")] },
    { initial: "r", final: "u", tones: [createTone("rǔ", 3, "乳", "牛奶", "niú rǔ"), createTone("rù", 4, "入", "进入", "jìn rù")] },
  ],
  ua: [
    { initial: "zh", final: "ua", tones: [createTone("zhuā", 1, "抓", "抓住", "zhuā zhù")] },
    { initial: "sh", final: "ua", tones: [createTone("shuǎ", 3, "耍", "玩耍", "wán shuǎ")] },
  ],
  uo: [
    { initial: "zh", final: "uo", tones: [createTone("zhuō", 1, "桌", "桌子", "zhuō zi"), createTone("zhuó", 2, "灼", "灼烧", "zhuó shāo"), createTone("zhuò", 4, "作", "作业", "zuò yè")] },
    { initial: "ch", final: "uo", tones: [createTone("chuō", 1, "戳", "戳破", "chuō pò")] },
    { initial: "sh", final: "uo", tones: [createTone("shuō", 1, "说", "说话", "shuō huà"), createTone("shuò", 4, "硕", "硕士", "shuò shì")] },
    { initial: "r", final: "uo", tones: [createTone("ruò", 4, "弱", "弱小", "ruò xiǎo")] },
  ],
  uai: [
    { initial: "zh", final: "uai", tones: [createTone("zhuāi", 1, "拽", "拽住", "zhuāi zhù")] },
    { initial: "ch", final: "uai", tones: [createTone("chuài", 4, "踹", "踹开", "chuài kāi")] },
    { initial: "sh", final: "uai", tones: [createTone("shuāi", 1, "衰", "衰弱", "shuāi ruò")] },
  ],
  ui: [
    { initial: "zh", final: "ui", tones: [createTone("zhuī", 1, "追", "追赶", "zhuī gǎn"), createTone("zhuì", 4, "坠", "下坠", "xià zhuì")] },
    { initial: "ch", final: "ui", tones: [createTone("chuí", 2, "锤", "铁锤", "tiě chuí"), createTone("chuí", 2, "吹", "吹风", "chuī fēng")] },
    { initial: "sh", final: "ui", tones: [createTone("shuǐ", 3, "水", "喝水", "hē shuǐ"), createTone("shuì", 4, "睡", "睡觉", "shuì jiào")] },
    { initial: "r", final: "ui", tones: [createTone("ruǐ", 3, "蕊", "花蕊", "huā ruǐ"), createTone("ruì", 4, "瑞", "瑞雪", "ruì xuě")] },
  ],
  uan: [
    { initial: "zh", final: "uan", tones: [createTone("zhuān", 1, "专", "专心", "zhuān xīn"), createTone("zhuǎn", 3, "转", "转身", "zhuǎn shēn"), createTone("zhuàn", 4, "赚", "赚钱", "zhuàn qián")] },
    { initial: "ch", final: "uan", tones: [createTone("chuān", 1, "穿", "穿衣", "chuān yī"), createTone("chuán", 2, "船", "小船", "xiǎo chuán"), createTone("chuàn", 4, "串", "串连", "chuàn lián")] },
    { initial: "sh", final: "uan", tones: [createTone("shuān", 1, "栓", "枪栓", "qiāng shuān")] },
    { initial: "r", final: "uan", tones: [createTone("ruǎn", 3, "软", "柔软", "róu ruǎn")] },
  ],
  un: [
    { initial: "zh", final: "un", tones: [createTone("zhūn", 1, "谆", "谆谆", "zhūn zhūn")] },
    { initial: "ch", final: "un", tones: [createTone("chūn", 1, "春", "春天", "chūn tiān"), createTone("chǔn", 3, "蠢", "愚蠢", "yú chǔn")] },
    { initial: "sh", final: "un", tones: [createTone("shǔn", 3, "吮", "吮吸", "shǔn xī")] },
    { initial: "r", final: "un", tones: [createTone("rùn", 4, "润", "湿润", "shī rùn")] },
  ],
  uang: [
    { initial: "zh", final: "uang", tones: [createTone("zhuāng", 1, "庄", "村庄", "cūn zhuāng"), createTone("zhuàng", 4, "壮", "强壮", "qiáng zhuàng"), createTone("zhuàng", 4, "撞", "撞击", "zhuàng jī")] },
    { initial: "ch", final: "uang", tones: [createTone("chuāng", 1, "窗", "窗户", "chuāng hu"), createTone("chuáng", 2, "床", "起床", "qǐ chuáng"), createTone("chuàng", 4, "闯", "闯关", "chuǎng guān")] },
    { initial: "sh", final: "uang", tones: [createTone("shuāng", 1, "霜", "霜冻", "shuāng dòng"), createTone("shuǎng", 3, "爽", "爽快", "shuǎng kuài")] },
  ],

  // 撮口呼韵母 - 翘舌音无效
  ü: [], üe: [], üan: [], ün: [],
};
