/**
 * 唇音声母组合数据
 * 声母: b, p, m, f
 * 可与开口呼、齐齿呼、合口呼韵母组合
 */

import type { CombinationData } from "@/types/pinyin";

const createTone = (combination: string, tone: number, char: string, word: string, fullPinyin: string) => ({
  combination, tone, examples: [{ char, word, fullPinyin }]
});

export const lipInitialsData: CombinationData = {
  // 开口呼韵母
  a: [
    { initial: "b", final: "a", tones: [createTone("bā", 1, "八", "八个", "bā gè"), createTone("bá", 2, "拔", "拔草", "bá cǎo"), createTone("bǎ", 3, "把", "把手", "bǎ shou"), createTone("bà", 4, "爸", "爸爸", "bà ba")] },
    { initial: "p", final: "a", tones: [createTone("pā", 1, "趴", "趴下", "pā xià"), createTone("pá", 2, "爬", "爬山", "pá shān"), createTone("pà", 4, "怕", "害怕", "hài pà")] },
    { initial: "m", final: "a", tones: [createTone("mā", 1, "妈", "妈妈", "mā ma"), createTone("má", 2, "麻", "芝麻", "zhī ma"), createTone("mǎ", 3, "马", "小马", "xiǎo mǎ"), createTone("mà", 4, "骂", "骂人", "mà rén")] },
    { initial: "f", final: "a", tones: [createTone("fā", 1, "发", "头发", "tóu fa"), createTone("fá", 2, "乏", "缺乏", "quē fá"), createTone("fǎ", 3, "法", "办法", "bàn fǎ")] },
  ],
  o: [
    { initial: "b", final: "o", tones: [createTone("bō", 1, "波", "波浪", "bō làng"), createTone("bó", 2, "伯", "大伯", "dà bó"), createTone("bǒ", 3, "跛", "跛脚", "bǒ jiǎo")] },
    { initial: "p", final: "o", tones: [createTone("pō", 1, "坡", "山坡", "shān pō"), createTone("pó", 2, "婆", "老婆", "lǎo po"), createTone("pǒ", 3, "叵", "叵测", "pǒ cè")] },
    { initial: "m", final: "o", tones: [createTone("mō", 1, "摸", "摸摸", "mō mō"), createTone("mó", 2, "模", "模范", "mó fàn"), createTone("mǒ", 3, "抹", "抹墙", "mǒ qiáng"), createTone("mò", 4, "墨", "墨水", "mò shuǐ")] },
    { initial: "f", final: "o", tones: [createTone("fó", 2, "佛", "佛像", "fó xiàng")] },
  ],
  e: [
    { initial: "m", final: "e", tones: [createTone("me", 5, "么", "什么", "shén me")] },
  ],
  ai: [
    { initial: "b", final: "ai", tones: [createTone("bāi", 1, "掰", "掰开", "bāi kāi"), createTone("bái", 2, "白", "白色", "bái sè"), createTone("bǎi", 3, "百", "一百", "yī bǎi"), createTone("bài", 4, "败", "失败", "shī bài")] },
    { initial: "p", final: "ai", tones: [createTone("pāi", 1, "拍", "拍手", "pāi shǒu"), createTone("pái", 2, "排", "排队", "pái duì")] },
    { initial: "m", final: "ai", tones: [createTone("mái", 2, "埋", "埋藏", "mái cáng"), createTone("mǎi", 3, "买", "买卖", "mǎi mai"), createTone("mài", 4, "卖", "卖菜", "mài cài")] },
  ],
  ei: [
    { initial: "b", final: "ei", tones: [createTone("bēi", 1, "杯", "杯子", "bēi zi"), createTone("bèi", 4, "背", "后背", "hòu bèi")] },
    { initial: "p", final: "ei", tones: [createTone("péi", 2, "陪", "陪同", "péi tóng")] },
    { initial: "m", final: "ei", tones: [createTone("méi", 2, "眉", "眉毛", "méi mao"), createTone("mèi", 4, "妹", "姐妹", "jiě mèi")] },
    { initial: "f", final: "ei", tones: [createTone("fēi", 1, "飞", "飞行", "fēi xíng")] },
  ],
  ao: [
    { initial: "b", final: "ao", tones: [createTone("bāo", 1, "包", "书包", "shū bāo"), createTone("báo", 2, "薄", "薄饼", "báo bǐng"), createTone("bǎo", 3, "保", "保护", "bǎo hù"), createTone("bào", 4, "抱", "拥抱", "yōng bào")] },
    { initial: "p", final: "ao", tones: [createTone("pāo", 1, "抛", "抛弃", "pāo qì"), createTone("páo", 2, "袍", "旗袍", "qí páo"), createTone("pǎo", 3, "跑", "跑步", "pǎo bù")] },
    { initial: "m", final: "ao", tones: [createTone("máo", 2, "毛", "羽毛", "yǔ máo"), createTone("mǎo", 3, "卯", "卯时", "mǎo shí")] },
  ],
  ou: [
    { initial: "p", final: "ou", tones: [createTone("pōu", 1, "剖", "解剖", "jiě pōu"), createTone("póu", 2, "裒", "裒集", "póu jí")] },
    { initial: "m", final: "ou", tones: [createTone("mōu", 1, "眸", "眼眸", "yǎn móu"), createTone("móu", 2, "谋", "计谋", "jì móu")] },
    { initial: "f", final: "ou", tones: [createTone("fǒu", 3, "否", "否定", "fǒu dìng")] },
  ],
  an: [
    { initial: "b", final: "an", tones: [createTone("bān", 1, "班", "班级", "bān jí"), createTone("bǎn", 3, "板", "黑板", "hēi bǎn"), createTone("bàn", 4, "半", "一半", "yī bàn")] },
    { initial: "p", final: "an", tones: [createTone("pān", 1, "攀", "攀登", "pān dēng"), createTone("pán", 2, "盘", "盘子", "pán zi")] },
    { initial: "m", final: "an", tones: [createTone("mán", 2, "蛮", "野蛮", "yě mán")] },
    { initial: "f", final: "an", tones: [createTone("fān", 1, "翻", "翻书", "fān shū"), createTone("fán", 2, "烦", "麻烦", "má fan"), createTone("fǎn", 3, "反", "反正", "fǎn zheng")] },
  ],
  en: [
    { initial: "b", final: "en", tones: [createTone("bēn", 1, "奔", "奔跑", "bēn pǎo"), createTone("bèn", 4, "笨", "笨蛋", "bèn dàn")] },
    { initial: "p", final: "en", tones: [createTone("pēn", 1, "喷", "喷水", "pēn shuǐ"), createTone("pén", 2, "盆", "花盆", "huā pén")] },
    { initial: "m", final: "en", tones: [createTone("mén", 2, "门", "门口", "mén kǒu"), createTone("mèn", 4, "闷", "闷热", "mēn rè")] },
    { initial: "f", final: "en", tones: [createTone("fèn", 4, "分", "十分", "shí fēn")] },
  ],
  ang: [
    { initial: "b", final: "ang", tones: [createTone("bāng", 1, "帮", "帮忙", "bāng máng"), createTone("bǎng", 3, "榜", "榜样", "bǎng yàng"), createTone("bàng", 4, "蚌", "蚌壳", "bàng ké")] },
    { initial: "p", final: "ang", tones: [createTone("pāng", 1, "乓", "乒乓", "pīng pāng"), createTone("páng", 2, "旁", "旁边", "páng biān")] },
    { initial: "m", final: "ang", tones: [createTone("máng", 2, "忙", "忙碌", "máng lù")] },
    { initial: "f", final: "ang", tones: [createTone("fāng", 1, "方", "方法", "fāng fǎ"), createTone("fáng", 2, "房", "房子", "fáng zi"), createTone("fǎng", 3, "访", "访问", "fǎng wèn")] },
  ],
  eng: [
    { initial: "b", final: "eng", tones: [createTone("bēng", 1, "崩", "崩溃", "bēng kuì"), createTone("béng", 2, "甭", "甭提", "béng tí")] },
    { initial: "p", final: "eng", tones: [createTone("péng", 2, "朋", "朋友", "péng you")] },
    { initial: "m", final: "eng", tones: [createTone("méng", 2, "萌", "萌芽", "méng yá")] },
    { initial: "f", final: "eng", tones: [createTone("fēng", 1, "风", "大风", "dà fēng"), createTone("féng", 2, "缝", "缝补", "féng bǔ"), createTone("fèng", 4, "缝", "门缝", "mén fèng")] },
  ],
  ong: [],  // 唇音 + ong 无效
  er: [],   // er 不与声母组合

  // 齐齿呼韵母
  i: [
    { initial: "b", final: "i", tones: [createTone("bī", 1, "逼", "逼迫", "bī pò"), createTone("bí", 2, "鼻", "鼻子", "bí zi"), createTone("bǐ", 3, "比", "比较", "bǐ jiào"), createTone("bì", 4, "必", "必须", "bì xū")] },
    { initial: "p", final: "i", tones: [createTone("pī", 1, "批", "一批", "yī pī"), createTone("pí", 2, "皮", "牛皮", "niú pí"), createTone("pǐ", 3, "匹", "马匹", "mǎ pǐ"), createTone("pì", 4, "屁", "屁股", "pì gu")] },
    { initial: "m", final: "i", tones: [createTone("mī", 1, "眯", "眯眼", "mī yǎn"), createTone("mí", 2, "迷", "迷路", "mí lù"), createTone("mǐ", 3, "米", "大米", "dà mǐ"), createTone("mì", 4, "密", "秘密", "mì mì")] },
  ],
  ia: [],  // 唇音 + ia 无效
  ie: [
    { initial: "b", final: "ie", tones: [createTone("biē", 1, "憋", "憋气", "biē qì"), createTone("bié", 2, "别", "别的", "bié de"), createTone("biè", 4, "别", "别扭", "biè niu")] },
    { initial: "p", final: "ie", tones: [createTone("piē", 1, "撇", "撇开", "piē kāi"), createTone("piě", 3, "撇", "撇嘴", "piě zuǐ")] },
    { initial: "m", final: "ie", tones: [createTone("miè", 4, "灭", "消灭", "xiāo miè")] },
  ],
  iao: [
    { initial: "b", final: "iao", tones: [createTone("biāo", 1, "标", "标准", "biāo zhǔn"), createTone("biǎo", 3, "表", "手表", "shǒu biǎo")] },
    { initial: "p", final: "iao", tones: [createTone("piāo", 1, "飘", "飘浮", "piāo fú"), createTone("piáo", 2, "瓢", "瓢泼", "piáo pō"), createTone("piào", 4, "票", "车票", "chē piào")] },
    { initial: "m", final: "iao", tones: [createTone("miáo", 2, "苗", "禾苗", "hé miáo"), createTone("miǎo", 3, "秒", "一分", "yī miǎo"), createTone("miào", 4, "妙", "奇妙", "qí miào")] },
  ],
  iu: [],  // 唇音 + iu 无效
  ian: [
    { initial: "b", final: "ian", tones: [createTone("biān", 1, "边", "旁边", "páng biān"), createTone("biǎn", 3, "扁", "扁平", "biǎn píng"), createTone("biàn", 4, "变", "变化", "biàn huà")] },
    { initial: "p", final: "ian", tones: [createTone("piān", 1, "偏", "偏爱", "piān ài"), createTone("piàn", 4, "骗", "骗子", "piàn zi")] },
    { initial: "m", final: "ian", tones: [createTone("mián", 2, "棉", "棉花", "mián hua"), createTone("miǎn", 3, "勉", "勉励", "miǎn lì")] },
  ],
  in: [
    { initial: "b", final: "in", tones: [createTone("bīn", 1, "宾", "宾客", "bīn kè"), createTone("bǐn", 3, "槟", "槟榔", "bīn lang"), createTone("bìn", 4, "殡", "殡葬", "bìn zàng")] },
    { initial: "p", final: "in", tones: [createTone("pīn", 1, "拼", "拼命", "pīn mìng"), createTone("pǐn", 3, "品", "品质", "pǐn zhì"), createTone("pìn", 4, "聘", "聘请", "pìn qǐng")] },
    { initial: "m", final: "in", tones: [createTone("mín", 2, "民", "人民", "rén mín"), createTone("mǐn", 3, "敏感", "gǎn mǐn")] },
  ],
  iang: [],  // 唇音 + iang 无效
  ing: [
    { initial: "b", final: "ing", tones: [createTone("bīng", 1, "冰", "冰块", "bīng kuài"), createTone("bǐng", 3, "丙", "丙等", "bǐng děng"), createTone("bìng", 4, "病", "生病", "shēng bìng")] },
    { initial: "p", final: "ing", tones: [createTone("pīng", 1, "乒", "乒乓", "pīng pāng"), createTone("píng", 2, "平", "平安", "píng ān")] },
    { initial: "m", final: "ing", tones: [createTone("míng", 2, "名", "名字", "míng zi"), createTone("mǐng", 3, "铭", "铭记", "míng jì")] },
  ],
  iong: [],  // 唇音 + iong 无效

  // 合口呼韵母
  u: [
    { initial: "b", final: "u", tones: [createTone("bū", 1, "逋", "逋逃", "bū táo"), createTone("bú", 2, "醭", "醭面", "bú miàn"), createTone("bǔ", 3, "补", "补丁", "bǔ ding"), createTone("bù", 4, "不", "不是", "bú shì")] },
    { initial: "p", final: "u", tones: [createTone("pū", 1, "铺", "铺床", "pū chuáng"), createTone("pú", 2, "仆", "仆人", "pú rén"), createTone("pǔ", 3, "普", "普通", "pǔ tōng"), createTone("pù", 4, "铺", "店铺", "diàn pù")] },
    { initial: "m", final: "u", tones: [createTone("mǔ", 3, "拇", "拇指", "mǔ zhǐ"), createTone("mú", 2, "模", "模子", "mú zi"), createTone("mǔ", 3, "母", "母子", "mǔ zǐ"), createTone("mù", 4, "木", "木头", "mù tou")] },
    { initial: "f", final: "u", tones: [createTone("fū", 1, "夫", "丈夫", "zhàng fu"), createTone("fú", 2, "扶", "扶手", "fú shou"), createTone("fǔ", 3, "府", "政府", "zhèng fǔ"), createTone("fù", 4, "父", "父亲", "fù qin")] },
  ],
  ua: [],   // 唇音 + ua 无效(实际是a韵母)
  uo: [],   // 唇音 + uo 无效(实际是o韵母)
  uai: [],  // 唇音 + uai 无效
  ui: [],   // 唇音 + ui 无效
  uan: [],  // 唇音 + uan 无效(实际是an韵母)
  un: [],   // 唇音 + un 无效
  uang: [], // 唇音 + uang 无效(实际是ang韵母)

  // 撮口呼韵母
  ü: [], üe: [], üan: [], ün: [],  // 唇音 + 撮口呼 无效
};
