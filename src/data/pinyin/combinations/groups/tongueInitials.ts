/**
 * 舌面音声母组合数据
 * 声母: j, q, x
 * 只能与齐齿呼和撮口呼韵母组合
 */

import type { CombinationData } from "@/types/pinyin";

const createTone = (combination: string, tone: number, char: string, word: string, fullPinyin: string) => ({
  combination, tone, examples: [{ char, word, fullPinyin }]
});

export const tongueInitialsData: CombinationData = {
  // 齐齿呼韵母
  i: [
    { initial: "j", final: "i", tones: [createTone("jī", 1, "机", "机器", "jī qì"), createTone("jí", 2, "急", "着急", "zháo jí"), createTone("jǐ", 3, "挤", "拥挤", "yōng jǐ"), createTone("jì", 4, "记", "记住", "jì zhù")] },
    { initial: "q", final: "i", tones: [createTone("qī", 1, "七", "七个", "qī gè"), createTone("qí", 2, "奇", "奇怪", "qí guài"), createTone("qǐ", 3, "起", "起来", "qǐ lái"), createTone("qì", 4, "气", "生气", "shēng qì")] },
    { initial: "x", final: "i", tones: [createTone("xī", 1, "西", "东西", "dōng xī"), createTone("xí", 2, "席", "主席", "zhǔ xí"), createTone("xǐ", 3, "洗", "洗手", "xǐ shǒu"), createTone("xì", 4, "系", "关系", "guān xi")] },
  ],
  ia: [
    { initial: "j", final: "ia", tones: [createTone("jiā", 1, "家", "家庭", "jiā tíng"), createTone("jiǎ", 3, "假", "真假", "zhēn jiǎ"), createTone("jià", 4, "嫁", "出嫁", "chū jià")] },
    { initial: "q", final: "ia", tones: [createTone("qià", 4, "恰", "恰好", "qià hǎo")] },
    { initial: "x", final: "ia", tones: [createTone("xiā", 1, "虾", "大虾", "dà xiā"), createTone("xià", 4, "下", "下面", "xià miàn")] },
  ],
  ie: [
    { initial: "j", final: "ie", tones: [createTone("jiē", 1, "接", "接住", "jiē zhù"), createTone("jié", 2, "节", "节日", "jié rì"), createTone("jiè", 4, "借", "借书", "jiè shū")] },
    { initial: "q", final: "ie", tones: [createTone("qiē", 1, "切", "切开", "qiē kāi"), createTone("qiè", 4, "窃", "窃取", "qiè qǔ")] },
    { initial: "x", final: "ie", tones: [createTone("xiē", 1, "些", "一些", "yī xiē"), createTone("xié", 2, "鞋", "鞋子", "xié zi"), createTone("xiè", 4, "谢", "谢谢", "xiè xie")] },
  ],
  iao: [
    { initial: "j", final: "iao", tones: [createTone("jiāo", 1, "交", "交朋友", "jiāo péng you"), createTone("jiǎo", 3, "脚", "手脚", "shǒu jiǎo"), createTone("jiào", 4, "叫", "大叫", "dà jiào")] },
    { initial: "q", final: "iao", tones: [createTone("qiāo", 1, "敲", "敲门", "qiāo mén"), createTone("qiáo", 2, "桥", "大桥", "dà qiáo"), createTone("qiào", 4, "窍", "窍门", "qiào mén")] },
    { initial: "x", final: "iao", tones: [createTone("xiāo", 1, "消", "消失", "xiāo shī"), createTone("xiǎo", 3, "小", "小朋友", "xiǎo péng you"), createTone("xiào", 4, "笑", "笑话", "xiào hua")] },
  ],
  iu: [
    { initial: "j", final: "iu", tones: [createTone("jiū", 1, "究", "研究", "yán jiū"), createTone("jiǔ", 3, "久", "很久", "hěn jiǔ"), createTone("jiù", 4, "就", "就是", "jiù shì")] },
    { initial: "q", final: "iu", tones: [createTone("qiū", 1, "秋", "秋天", "qiū tiān"), createTone("qiú", 2, "球", "足球", "zú qiú")] },
    { initial: "x", final: "iu", tones: [createTone("xiū", 1, "修", "修理", "xiū lǐ"), createTone("xiù", 4, "秀", "清秀", "qīng xiù")] },
  ],
  ian: [
    { initial: "j", final: "ian", tones: [createTone("jiān", 1, "尖", "笔尖", "bǐ jiān"), createTone("jiǎn", 3, "减", "减少", "jiǎn shǎo"), createTone("jiàn", 4, "建", "建设", "jiàn shè")] },
    { initial: "q", final: "ian", tones: [createTone("qiān", 1, "千", "一千", "yī qiān"), createTone("qián", 2, "前", "前面", "qián miàn"), createTone("qiàn", 4, "欠", "欠债", "qiàn zhài")] },
    { initial: "x", final: "ian", tones: [createTone("xiān", 1, "先", "先生", "xiān sheng"), createTone("xián", 2, "咸", "咸味", "xián wèi"), createTone("xiàn", 4, "现", "现在", "xiàn zài")] },
  ],
  in: [
    { initial: "j", final: "in", tones: [createTone("jīn", 1, "金", "金子", "jīn zi"), createTone("jǐn", 3, "紧", "紧张", "jǐn zhāng"), createTone("jìn", 4, "进", "进去", "jìn qù")] },
    { initial: "q", final: "in", tones: [createTone("qīn", 1, "亲", "亲人", "qīn rén"), createTone("qín", 2, "琴", "钢琴", "gāng qín"), createTone("qìn", 4, "沁", "沁人心脾", "qìn rén xīn pí")] },
    { initial: "x", final: "in", tones: [createTone("xīn", 1, "新", "新年", "xīn nián"), createTone("xìn", 4, "信", "相信", "xiāng xìn")] },
  ],
  iang: [
    { initial: "j", final: "iang", tones: [createTone("jiāng", 1, "江", "长江", "cháng jiāng"), createTone("jiǎng", 3, "讲", "讲话", "jiǎng huà"), createTone("jiàng", 4, "降", "降落", "jiàng luò")] },
    { initial: "q", final: "iang", tones: [createTone("qiāng", 1, "腔", "腔调", "qiāng diào"), createTone("qiáng", 2, "强", "强大", "qiáng dà")] },
    { initial: "x", final: "iang", tones: [createTone("xiāng", 1, "香", "香气", "xiāng qì"), createTone("xiǎng", 3, "想", "想念", "xiǎng niàn"), createTone("xiàng", 4, "向", "方向", "fāng xiàng")] },
  ],
  ing: [
    { initial: "j", final: "ing", tones: [createTone("jīng", 1, "京", "北京", "běi jīng"), createTone("jǐng", 3, "景", "风景", "fēng jǐng"), createTone("jìng", 4, "净", "干净", "gān jìng")] },
    { initial: "q", final: "ing", tones: [createTone("qīng", 1, "青", "青色", "qīng sè"), createTone("qíng", 2, "情", "友情", "yǒu qíng"), createTone("qǐng", 3, "请", "请客", "qǐng kè")] },
    { initial: "x", final: "ing", tones: [createTone("xīng", 1, "星", "星星", "xīng xing"), createTone("xíng", 2, "行", "行为", "xíng wéi"), createTone("xìng", 4, "姓", "姓名", "xìng míng")] },
  ],
  iong: [
    { initial: "j", final: "iong", tones: [createTone("jiōng", 1, "扃", "扃锁", "jiōng suǒ")] },
    { initial: "q", final: "iong", tones: [createTone("qióng", 2, "穷", "贫穷", "pín qióng")] },
    { initial: "x", final: "iong", tones: [createTone("xiōng", 1, "凶", "凶猛", "xiōng měng"), createTone("xiōng", 1, "兄", "兄弟", "xiōng dì")] },
  ],

  // 撮口呼韵母
  ü: [
    { initial: "j", final: "ü", tones: [createTone("jū", 1, "居", "居住", "jū zhù"), createTone("jú", 2, "局", "局部", "jú bù"), createTone("jù", 4, "句", "句子", "jù zi")] },
    { initial: "q", final: "ü", tones: [createTone("qū", 1, "区", "地区", "dì qū"), createTone("qú", 2, "渠", "水渠", "shuǐ qú"), createTone("qù", 4, "去", "回去", "huí qù")] },
    { initial: "x", final: "ü", tones: [createTone("xū", 1, "需", "需要", "xū yào"), createTone("xǔ", 3, "许", "许多", "xǔ duō"), createTone("xù", 4, "续", "继续", "jì xù")] },
  ],
  üe: [
    { initial: "j", final: "üe", tones: [createTone("juē", 1, "撅", "撅嘴", "juē zuǐ"), createTone("jué", 2, "决", "决定", "jué dìng"), createTone("juè", 4, "倔", "倔强", "jué jiàng")] },
    { initial: "q", final: "üe", tones: [createTone("quē", 1, "缺", "缺少", "quē shǎo"), createTone("qué", 2, "瘸", "瘸腿", "qué tuǐ")] },
    { initial: "x", final: "üe", tones: [createTone("xuē", 1, "靴", "靴子", "xuē zi"), createTone("xué", 2, "学", "学习", "xué xí"), createTone("xuě", 3, "雪", "下雪", "xià xuě")] },
  ],
  üan: [
    { initial: "j", final: "uan", tones: [createTone("juān", 1, "捐", "捐献", "juān xiàn"), createTone("juàn", 4, "眷", "眷属", "juàn shǔ")] },
    { initial: "q", final: "uan", tones: [createTone("quān", 1, "圈", "圆圈", "yuán quān"), createTone("quán", 2, "拳", "拳头", "quán tou")] },
    { initial: "x", final: "uan", tones: [createTone("xuān", 1, "宣", "宣传", "xuān chuán"), createTone("xuǎn", 3, "选", "选择", "xuǎn zé"), createTone("xuàn", 4, "炫", "炫耀", "xuàn yào")] },
  ],
  ün: [
    { initial: "j", final: "ün", tones: [createTone("jūn", 1, "军", "军人", "jūn rén"), createTone("jǔn", 3, "菌", "细菌", "xì jūn")] },
    { initial: "q", final: "ün", tones: [createTone("qūn", 1, "逡", "逡巡", "qūn xún")] },
    { initial: "x", final: "ün", tones: [createTone("xūn", 1, "熏", "熏陶", "xūn táo"), createTone("xùn", 4, "驯", "驯服", "xùn fú")] },
  ],

  // 开口呼韵母 - 舌面音无效
  a: [], o: [], e: [], ai: [], ei: [], ao: [], ou: [], an: [], en: [], ang: [], eng: [], ong: [], er: [],
  // 合口呼韵母 - 舌面音无效
  u: [], ua: [], uo: [], uai: [], ui: [], uan: [], un: [], uang: [],
};
